'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import { href, switchLocalePath, translator, type Locale } from '@/lib/i18n';

const NAV = [
  { key: 'nav.home', path: '' },
  { key: 'nav.about', path: '/a-propos' },
  { key: 'nav.projects', path: '/projets' },
  { key: 'nav.team', path: '/equipe' },
  { key: 'nav.news', path: '/actualites' },
  { key: 'nav.contact', path: '/contact' },
];

export default function SiteHeader({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const currentPath = pathname.replace(/^\/(fr|en)(?=\/|$)/, '') || '';

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const isActive = (path: string) =>
    path === '' ? currentPath === '' : currentPath === path || currentPath.startsWith(`${path}/`);

  const links = NAV.map((item) => (
    <Link
      key={item.key}
      href={href(locale, item.path)}
      data-active={isActive(item.path)}
      aria-current={isActive(item.path) ? 'page' : undefined}
      onClick={() => setOpen(false)}
    >
      {t(item.key)}
    </Link>
  ));

  return (
    <header className="site-header" data-open={open} ref={headerRef}>
      <div className="shell site-header-inner">
        <Link href={href(locale)} className="brand" onClick={() => setOpen(false)} aria-label={t('brand.name')}>
          <Logo />
          <span>
            <span className="brand-name">{t('brand.name')}</span>
            <span className="brand-sub">{t('brand.tagline')}</span>
          </span>
        </Link>

        <nav className="nav nav-desktop" aria-label={t('footer.navigation')}>
          {links}
        </nav>

        <div className="header-actions">
          <div className="lang-switch" aria-label={t('common.language')}>
            <Link
              href={switchLocalePath(pathname, 'fr')}
              hrefLang="fr"
              lang="fr"
              data-active={locale === 'fr'}
              aria-current={locale === 'fr' ? 'true' : undefined}
              aria-label="Français"
            >
              FR
            </Link>
            <Link
              href={switchLocalePath(pathname, 'en')}
              hrefLang="en"
              lang="en"
              data-active={locale === 'en'}
              aria-current={locale === 'en' ? 'true' : undefined}
              aria-label="English"
            >
              EN
            </Link>
          </div>
          <Link href={href(locale, '/contact')} className="btn btn-sm header-cta">
            {t('cta.contact')}
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? t('nav.close') : t('nav.menu')}
            onClick={() => setOpen((value) => !value)}
            ref={toggleRef}
          >
            <span className="menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="menu-label">{open ? t('nav.close') : t('nav.menu')}</span>
          </button>
        </div>
      </div>

      <nav id="mobile-navigation" className="nav-mobile" hidden={!open} aria-label={t('footer.navigation')}>
        {links}
        <Link href={href(locale, '/contact')} className="btn btn-sm" onClick={() => setOpen(false)}>
          {t('cta.contact')}
        </Link>
      </nav>
    </header>
  );
}
