'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useStaffSession } from '@/lib/auth';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const router = useRouter();
  const { user, role, loading } = useStaffSession();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user && role) router.replace('/admin');
  }, [loading, user, role, router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (signInError) {
      setError('Identifiants incorrects ou compte non confirmé.');
      return;
    }
    router.replace('/admin');
  }

  return (
    <div className="login-wrap">
      <form className="login-card" onSubmit={handleSubmit}>
        <span className="brand">
          <Logo size={40} />
          <span>
            <span className="brand-name">Global Solutions</span>
            <span className="brand-sub">Administration</span>
          </span>
        </span>
        <div>
          <h1>Connexion</h1>
          <p>Espace réservé à l’équipe : gestion des projets, de l’équipe et des messages reçus.</p>
        </div>

        <div className="field">
          <label htmlFor="email">Adresse e-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {error ? (
          <p className="form-status" data-tone="error">
            {error}
          </p>
        ) : null}

        <button type="submit" className="btn" disabled={busy}>
          {busy ? 'Connexion…' : 'Se connecter'}
        </button>

        <p className="form-note">
          <Link href="/fr" className="link-arrow">
            Retour au site
          </Link>
        </p>
      </form>
    </div>
  );
}
