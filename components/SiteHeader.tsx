'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { href, translator, type Locale } from '@/lib/i18n';

const NAV = [
  { key: 'nav.home', path: '' },
  { key: 'nav.projects', path: '/projets' },
  { key: 'nav.team', path: '/equipe' },
  { key: 'nav.news', path: '/actualites' },
  { key: 'nav.documents', path: '/documents' },
  { key: 'nav.contact', path: '/contact' },
];

function otherLocalePath(pathname: string, locale: Locale) {
  const target = locale === 'fr' ? 'en' : 'fr';
  const parts = pathname.split('/');
  parts[1] = target;
  return parts.join('/') || `/${target}`;
}

export default function SiteHeader({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const currentPath = pathname.replace(`/${locale}`, '') || '';

  return (
    <header className="site-header" data-open={open} data-scrolled={scrolled}>
      <div className="shell site-header-inner">
        <Link href={href(locale)} className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">GS</span>
          <span>
            {t('brand.name')}
            <small>{t('brand.tagline')}</small>
          </span>
        </Link>

        <nav className="nav">
          {NAV.map((item) => (
            <Link
              key={item.key}
              href={href(locale, item.path)}
              data-active={
                item.path === '' ? currentPath === '' : currentPath.startsWith(item.path) ? 'true' : 'false'
              }
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <div className="lang-switch" aria-label={t('common.language')}>
            <Link href={otherLocalePath(pathname, locale)} data-active={locale === 'fr' ? 'true' : 'false'}>
              FR
            </Link>
            <Link href={otherLocalePath(pathname, locale)} data-active={locale === 'en' ? 'true' : 'false'}>
              EN
            </Link>
          </div>
          <Link href={href(locale, '/contact')} className="btn btn-sm">
            {t('cta.contact')}
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-label={open ? t('nav.close') : t('nav.menu')}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? t('nav.close') : t('nav.menu')}
          </button>
        </div>
      </div>
    </header>
  );
}
