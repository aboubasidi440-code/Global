'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Icon from './Icon';
import Logo from './Logo';
import { href, translator, type Locale } from '@/lib/i18n';
import { useSettings } from '@/lib/data';

const NAV = [
  { key: 'nav.home', path: '' },
  { key: 'nav.about', path: '/a-propos' },
  { key: 'nav.expertises', path: '/expertises' },
  { key: 'nav.projects', path: '/projets' },
  { key: 'nav.team', path: '/equipe' },
  { key: 'nav.news', path: '/actualites' },
  { key: 'nav.contact', path: '/contact' },
];

type ContactSettings = {
  address?: string;
  email_primary?: string;
  phone_primary?: string;
  phone_secondary?: string;
};

function SocialIcon({ name }: { name: 'linkedin' | 'facebook' | 'youtube' }) {
  const common = {
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': true as const,
  };
  if (name === 'linkedin')
    return (
      <svg {...common}>
        <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.5c0-1.3-.02-3-1.83-3-1.83 0-2.1 1.43-2.1 2.9V21H9z" />
      </svg>
    );
  if (name === 'facebook')
    return (
      <svg {...common}>
        <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3-.04-1.3-.13-2.45-.13-2.4 0-4.05 1.47-4.05 4.17v2.33H7.5V13h2.7v8z" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M22 12s0-3.3-.42-4.8a2.5 2.5 0 0 0-1.76-1.77C18.3 5 12 5 12 5s-6.3 0-7.82.43A2.5 2.5 0 0 0 2.42 7.2C2 8.7 2 12 2 12s0 3.3.42 4.8a2.5 2.5 0 0 0 1.76 1.77C5.7 19 12 19 12 19s6.3 0 7.82-.43a2.5 2.5 0 0 0 1.76-1.77C22 15.3 22 12 22 12zM10 15V9l5.2 3z" />
    </svg>
  );
}

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
  const currentPath = pathname.replace(`/${locale}`, '') || '';
  const { data } = useSettings();
  const contact = (data?.contact ?? {}) as ContactSettings;

  const email = contact.email_primary || 'info@globalsolutions.one';
  const phone1 = contact.phone_primary || '+227 99 54 83 49';
  const phone2 = contact.phone_secondary || '+227 98 33 61 91';

  return (
    <>
      {/* barre de contact */}
      <div className="topbar">
        <div className="shell topbar-inner">
          <div className="topbar-contacts">
            <span>
              <Icon name="pin" size={13} />
              <span className="loc-label">Niamey, Niger</span>
            </span>
            <a href={`mailto:${email}`} className="email-link">
              <Icon name="mail" size={13} /> {email}
            </a>
            <a href={`tel:${phone1.replace(/\s/g, '')}`}>
              <Icon name="phone" size={13} /> {phone1}
            </a>
            <a href={`tel:${phone2.replace(/\s/g, '')}`}>{phone2}</a>
          </div>
          <div className="topbar-socials">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <SocialIcon name="linkedin" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
              <SocialIcon name="facebook" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
              <SocialIcon name="youtube" />
            </a>
          </div>
        </div>
      </div>

      <header className="site-header" data-open={open}>
        <div className="shell site-header-inner">
          <Link href={href(locale)} className="brand" onClick={() => setOpen(false)}>
            <Logo />
            <span>
              <span className="brand-name">{t('brand.name')}</span>
              <span className="brand-sub">{t('brand.tagline')}</span>
            </span>
          </Link>

          <nav className="nav" aria-label={t('nav.menu')}>
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
            <Link href={href(locale, '/contact')} className="btn btn-primary btn-sm">
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
