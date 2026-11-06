'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signOut, useStaffSession } from '@/lib/auth';
import Logo from '@/components/Logo';

const NAV = [
  { href: '/admin', label: 'Tableau de bord' },
  { href: '/admin/projets', label: 'Projets' },
  { href: '/admin/equipe', label: 'Équipe' },
  { href: '/admin/articles', label: 'Actualités' },
  { href: '/admin/documents', label: 'Documents' },
  { href: '/admin/messages', label: 'Messages' },
  { href: '/admin/reglages', label: 'Réglages du site' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const router = useRouter();
  const { loading, user, role, roleError } = useStaffSession();

  useEffect(() => {
    if (!loading && !user) router.replace('/admin/login');
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="login-wrap">
        <p style={{ color: 'var(--muted)' }}>Chargement de l’espace d’administration…</p>
      </div>
    );
  }

  if (!user) return null;

  if (!role) {
    return (
      <div className="login-wrap">
        <div className="login-card">
          <h1>Accès refusé</h1>
          <p>
            Ce compte n’a pas de rôle éditeur ou administrateur.
            {roleError ? ` (${roleError})` : ''}
          </p>
          <button type="button" className="btn" onClick={() => signOut()}>
            Se déconnecter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="brand">
          <Logo size={36} />
          <span>
            <span className="brand-name">Global Solutions</span>
            <span className="brand-sub">Administration</span>
          </span>
        </Link>

        <nav className="admin-nav">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="admin-nav">
          <Link href="/fr" target="_blank">
            Voir le site ↗
          </Link>
          <button
            type="button"
            className="btn btn-sm btn-outline-light"
            onClick={async () => {
              await signOut();
              router.replace('/admin/login');
            }}
          >
            Se déconnecter
          </button>
        </div>

        <div className="admin-user">
          <span>{user.email}</span>
          <span className="badge" data-tone="ok">
            {role}
          </span>
        </div>
      </aside>

      <main className="admin-main">{children}</main>
    </div>
  );
}
