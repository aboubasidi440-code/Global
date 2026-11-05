'use client';

import { useParams } from 'next/navigation';
import ContactForm from '@/components/ContactForm';
import { useSettings } from '@/lib/data';
import { isLocale, translator } from '@/lib/i18n';
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

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <span className="eyebrow">{t('nav.contact')}</span>
          <h1>{t('contact.title')}</h1>
          <p className="lead">{t('contact.lead')}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell contact-grid">
          <ContactForm locale={locale} />

          <aside className="contact-details">
            <h3>{t('contact.details')}</h3>
            <dl>
              {contact.address ? (
                <div>
                  <dt>{t('contact.address')}</dt>
                  <dd>
                    {contact.address}
                    {contact.postal ? (
                      <>
                        <br />
                        {contact.postal}
                      </>
                    ) : null}
                  </dd>
                </div>
              ) : null}
              {contact.phone_primary ? (
                <div>
                  <dt>{t('contact.phone')}</dt>
                  <dd>
                    <a href={`tel:${contact.phone_primary.replace(/\s/g, '')}`}>{contact.phone_primary}</a>
                    {contact.phone_secondary ? (
                      <>
                        <br />
                        <a href={`tel:${contact.phone_secondary.replace(/\s/g, '')}`}>{contact.phone_secondary}</a>
                      </>
                    ) : null}
                  </dd>
                </div>
              ) : null}
              {contact.email_primary ? (
                <div>
                  <dt>{t('contact.email')}</dt>
                  <dd>
                    <a href={`mailto:${contact.email_primary}`}>{contact.email_primary}</a>
                    {contact.email_secondary ? (
                      <>
                        <br />
                        <a href={`mailto:${contact.email_secondary}`}>{contact.email_secondary}</a>
                      </>
                    ) : null}
                  </dd>
                </div>
              ) : null}
              {wa ? (
                <div>
                  <dt>{t('contact.whatsapp')}</dt>
                  <dd>
                    <a href={wa} target="_blank" rel="noreferrer">
                      {contact.whatsapp}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>{t('contact.hours')}</dt>
                <dd>{t('contact.hours.value')}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}
