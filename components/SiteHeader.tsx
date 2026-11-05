'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Logo from './Logo';
import { href, translator, type Locale } from '@/lib/i18n';
import { useSettings } from '@/lib/data';

const NAV = [
  { key: 'nav.home', path: '' },
  { key: 'nav.about', path: '/a-propos' },
  { key: 'nav.projects', path: '/projets' },
  { key: 'nav.team', path: '/equipe' },
  { key: 'nav.news', path: '/actualites' },
  { key: 'nav.contact', path: '/contact' },
];

const FALLBACK = {
  email: 'info@globalsolutions.one',
  phone: '00227 99 54 83 49',
  city: 'Niamey, Niger',
};

function otherLocalePath(pathname: string, locale: Locale) {
  const target = locale === 'fr' ? 'en' : 'fr';
  const parts = pathname.split('/');
  parts[1] = target;
  return parts.join('/') || `/${target}`;
}

type ContactSettings = {
  email_primary?: string;
  phone_primary?: string;
};

export default function SiteHeader({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const pathname = usePathname() || '';
  const [open, setOpen] = useState(false);
  const currentPath = pathname.replace(`/${locale}`, '') || '';
  const { data } = useSettings();
  const contact = (data?.contact ?? {}) as ContactSettings;

  const email = contact.email_primary || FALLBACK.email;
  const phone = contact.phone_primary || FALLBACK.phone;

  return (
    <>
      <div className="topbar">
        <div className="shell topbar-inner">
          <div className="topbar-contacts">
            <a href={`mailto:${email}`}>{email}</a>
            <span className="divider" aria-hidden="true" />
            <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a>
          </div>
          <div className="topbar-contacts">
            <span>{FALLBACK.city}</span>
            <span className="divider" aria-hidden="true" />
            <span>{locale === 'en' ? 'Mon–Fri · 8am–5pm' : 'Lun–Ven · 8h–17h'}</span>
          </div>
        </div>
      </div>

      <header className="site-header" data-open={open}>
        <div className="shell site-header-inner">
          <Link href={href(locale)} className="brand" onClick={() => setOpen(false)}>
            <Logo />
            <span>
              <span className="brand-name">{t('brand.name')}</span>
              <span className="brand-sub">BTP · Hydraulique · Énergie</span>
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
                onClick={() => setOpen(false)}
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
            <Link href={href(locale, '/contact')} className="btn btn-accent btn-sm">
              {t('cta.quote')}
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
    </>
  );
}
