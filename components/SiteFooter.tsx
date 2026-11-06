'use client';

import Link from 'next/link';
import Logo from './Logo';
import { href, translator, type Locale } from '@/lib/i18n';
import { useSettings } from '@/lib/data';
import { whatsappLink } from '@/lib/format';

type ContactSettings = {
  address?: string;
  postal?: string;
  email_primary?: string;
  phone_primary?: string;
  phone_secondary?: string;
  whatsapp?: string;
};

export default function SiteFooter({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const { data } = useSettings();
  const contact = (data?.contact ?? {}) as ContactSettings;
  const year = new Date().getFullYear();
  const wa = whatsappLink(contact.whatsapp);
  const hasContact = Boolean(contact.address || contact.phone_primary || contact.email_primary || wa);

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
          </div>

          <div>
            <h4>{t('footer.navigation')}</h4>
            <ul>
              <li>
                <Link href={href(locale, '/a-propos')}>{t('nav.about')}</Link>
              </li>
              <li>
                <Link href={href(locale, '/projets')}>{t('nav.projects')}</Link>
              </li>
              <li>
                <Link href={href(locale, '/equipe')}>{t('nav.team')}</Link>
              </li>
              <li>
                <Link href={href(locale, '/actualites')}>{t('nav.news')}</Link>
              </li>
              <li>
                <Link href={href(locale, '/documents')}>{t('nav.documents')}</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>{t('footer.contact')}</h4>
            <ul>
              {contact.address ? (
                <li>
                  {contact.address}
                  {contact.postal ? ` — ${contact.postal}` : ''}
                </li>
              ) : null}
              {contact.phone_primary ? (
                <li>
                  <a href={`tel:${contact.phone_primary.replace(/\s/g, '')}`}>{contact.phone_primary}</a>
                </li>
              ) : null}
              {contact.email_primary ? (
                <li>
                  <a href={`mailto:${contact.email_primary}`}>{contact.email_primary}</a>
                </li>
              ) : null}
              {wa ? (
                <li>
                  <a href={wa} target="_blank" rel="noreferrer">
                    {t('contact.whatsapp')}
                  </a>
                </li>
              ) : null}
              {!hasContact ? (
                <li>
                  <Link href={href(locale, '/contact')}>{t('cta.contact')}</Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {t('brand.name')} — {t('footer.rights')}
          </span>
          <span className="footer-bottom-links">
            <a href="#contenu">{t('footer.top')}</a>
            <Link href="/admin">{t('footer.admin')}</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
