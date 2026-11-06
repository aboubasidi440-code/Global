'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import ContactForm from '@/components/ContactForm';
import Icon from '@/components/Icon';
import { useSettings } from '@/lib/data';
import { href, isLocale, translator } from '@/lib/i18n';
import { whatsappLink } from '@/lib/format';

type ContactSettings = {
  address?: string;
  postal?: string;
  email_primary?: string;
  email_secondary?: string;
  phone_primary?: string;
  phone_secondary?: string;
  whatsapp?: string;
};

export default function ContactPage() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const t = translator(locale);
  const { data } = useSettings();
  const contact = (data?.contact ?? {}) as ContactSettings;
  const wa = whatsappLink(contact.whatsapp);

  const email = contact.email_primary || 'info@globalsolutions.one';
  const phone1 = contact.phone_primary || '+227 99 54 83 49';
  const phone2 = contact.phone_secondary || '+227 98 33 61 91';

  return (
    <>
      {/* bandeau */}
      <section
        className="page-head page-head--banner"
        style={{ ['--banner-img' as string]: "url('/images/banner-contact.jpg')" }}
      >
        <div className="shell">
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href={href(locale)}>{t('nav.home')}</Link>
            <span aria-hidden="true">›</span>
            <span>{t('nav.contact')}</span>
          </nav>
          <span className="eyebrow">{t('nav.contact')}</span>
          <h1>{t('contact.banner.title')}</h1>
          <p className="lead">{t('contact.banner.lead')}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell contact-grid">
          {/* formulaire */}
          <div className="reveal">
            <ContactForm locale={locale} />
          </div>

          {/* coordonnées + accès rapides + carte */}
          <aside className="contact-details">
            <div className="contact-card reveal">
              <h3>{t('contact.details')}</h3>
              <dl>
                <div>
                  <dt>{t('contact.address')}</dt>
                  <dd>
                    GLOBAL SOLUTIONS SARL
                    <br />
                    {contact.address || 'Quartier Koira Kano'}
                    {contact.postal ? (
                      <>
                        <br />
                        {contact.postal}
                      </>
                    ) : null}
                    <br />
                    Niamey, Niger
                  </dd>
                </div>
                <div>
                  <dt>{t('contact.phone')}</dt>
                  <dd>
                    <a href={`tel:${phone1.replace(/\s/g, '')}`}>{phone1}</a>
                    <br />
                    <a href={`tel:${phone2.replace(/\s/g, '')}`}>{phone2}</a>
                  </dd>
                </div>
                <div>
                  <dt>{t('contact.email')}</dt>
                  <dd>
                    <a href={`mailto:${email}`}>{email}</a>
                  </dd>
                </div>
                <div>
                  <dt>{t('contact.hours')}</dt>
                  <dd>{t('contact.hours.value')}</dd>
                </div>
              </dl>
            </div>

            <div className="quick-actions reveal">
              <a href={`tel:${phone1.replace(/\s/g, '')}`}>
                <Icon name="phone" size={20} />
                {t('contact.quick.call')}
              </a>
              {wa ? (
                <a href={wa} target="_blank" rel="noreferrer">
                  <Icon name="chat" size={20} />
                  {t('contact.quick.whatsapp')}
                </a>
              ) : (
                <a href={`tel:${phone2.replace(/\s/g, '')}`}>
                  <Icon name="chat" size={20} />
                  {t('contact.quick.whatsapp')}
                </a>
              )}
              <a href={`mailto:${email}`}>
                <Icon name="mail" size={20} />
                {t('contact.quick.email')}
              </a>
            </div>

            <div className="reveal">
              <h3 style={{ marginBottom: '0.8rem' }}>{t('contact.map')}</h3>
              <div className="map-embed">
                <iframe
                  title={t('contact.map')}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=2.0600%2C13.4700%2C2.1600%2C13.5600&layer=mapnik&marker=13.5137%2C2.1098"
                  loading="lazy"
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
