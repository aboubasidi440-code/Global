'use client';

import Link from 'next/link';
import Logo from './Logo';
import Icon from './Icon';
import { href, translator, type Locale } from '@/lib/i18n';
import { useSettings } from '@/lib/data';
import { EXPERTISE } from '@/lib/content';
import { whatsappLink } from '@/lib/format';

type ContactSettings = {
  address?: string;
  postal?: string;
  email_primary?: string;
  phone_primary?: string;
  phone_secondary?: string;
  whatsapp?: string;
};

function SocialIcon({ name }: { name: 'linkedin' | 'facebook' | 'youtube' }) {
  const common = {
    width: 16,
    height: 16,
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

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const { data } = useSettings();
  const contact = (data?.contact ?? {}) as ContactSettings;
  const year = new Date().getFullYear();
  const wa = whatsappLink(contact.whatsapp);

  const navLinks = [
    { key: 'nav.home', path: '' },
    { key: 'nav.about', path: '/a-propos' },
    { key: 'nav.expertises', path: '/expertises' },
    { key: 'nav.projects', path: '/projets' },
    { key: 'nav.team', path: '/equipe' },
    { key: 'nav.news', path: '/actualites' },
    { key: 'nav.contact', path: '/contact' },
  ];

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <span className="brand">
              <Logo size={40} />
              <span>
                <span className="brand-name">{t('brand.name')}</span>
                <span className="brand-sub">{t('brand.tagline')}</span>
              </span>
            </span>
            <p className="footer-about">{t('footer.about')}</p>
            <div className="footer-socials">
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

          <div>
            <h4>{t('footer.navigation')}</h4>
            <ul>
              {navLinks.map((item) => (
                <li key={item.key}>
                  <Link href={href(locale, item.path)}>{t(item.key)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t('footer.expertises')}</h4>
            <ul>
              {EXPERTISE.map((item) => (
                <li key={item.slug}>
                  <Link href={href(locale, '/expertises')}>
                    {locale === 'en' ? item.titleEn : item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>{t('footer.contact')}</h4>
            <ul>
              <li>Quartier Koira Kano, Niamey, Niger</li>
              {contact.phone_primary ? (
                <li>
                  <a href={`tel:${contact.phone_primary.replace(/\s/g, '')}`}>{contact.phone_primary}</a>
                </li>
              ) : null}
              {contact.phone_secondary ? (
                <li>
                  <a href={`tel:${contact.phone_secondary.replace(/\s/g, '')}`}>{contact.phone_secondary}</a>
                </li>
              ) : null}
              <li>
                <a href={`mailto:${contact.email_primary || 'info@globalsolutions.one'}`}>
                  {contact.email_primary || 'info@globalsolutions.one'}
                </a>
              </li>
              {wa ? (
                <li>
                  <a href={wa} target="_blank" rel="noreferrer">
                    {t('contact.whatsapp')}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {t('brand.name')} SARL — {t('footer.rights')}
          </span>
          <span>
            <Link href="/admin">{t('footer.admin')}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
