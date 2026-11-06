'use client';

import { useEffect, useState } from 'react';
import { SERVICES } from '@/lib/content';
import { translator, type Locale } from '@/lib/i18n';
import { FUNCTIONS_URL, SUPABASE_ANON_KEY } from '@/lib/supabase';

type Status = { tone: 'error' | 'success'; message: string } | null;

export default function ContactForm({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [sent, setSent] = useState(false);
  const [service, setService] = useState('');

  // Préselection depuis les cartes d'expertise (?service=hydraulique), sans useSearchParams
  // afin de ne pas imposer de frontière Suspense au prerender de la page.
  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('service');
    if (value && SERVICES.some((item) => item.value === value)) setService(value);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const required = ['name', 'email', 'service', 'message'];
    if (required.some((field) => !String(data.get(field) || '').trim())) {
      setStatus({ tone: 'error', message: t('contact.form.error_required') });
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus({ tone: 'error', message: t('contact.form.error_required') });
      return;
    }

    const attachment = data.get('attachment');
    if (attachment instanceof File && attachment.size > 5 * 1024 * 1024) {
      setStatus({ tone: 'error', message: t('contact.form.error_size') });
      return;
    }

    setSending(true);
    setStatus(null);
    try {
      const response = await fetch(`${FUNCTIONS_URL}/contact-submit`, {
        method: 'POST',
        headers: { apikey: SUPABASE_ANON_KEY },
        body: data,
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setStatus({ tone: 'error', message: payload.error || t('contact.form.error_generic') });
        return;
      }
      form.reset();
      setService('');
      setSent(true);
    } catch {
      setStatus({ tone: 'error', message: t('contact.form.error_generic') });
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="form-card form-success" role="status">
        <span className="tag">{t('contact.form.success.title')}</span>
        <h2>{t('contact.form.success.title')}</h2>
        <p className="lead">{t('contact.form.success.text')}</p>
        <div className="form-actions">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => {
              setSent(false);
              setStatus(null);
            }}
          >
            {t('contact.form.again')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={handleSubmit} noValidate aria-busy={sending}>
      <h2>{t('contact.form.title')}</h2>
      <p className="form-note form-intro">{t('contact.form.required')} *</p>

      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">{t('contact.form.name')} *</label>
          <input id="name" name="name" type="text" maxLength={150} required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="organisation">
            {t('contact.form.organisation')} <span className="hint">({t('contact.form.optional')})</span>
          </label>
          <input id="organisation" name="organisation" type="text" maxLength={200} autoComplete="organization" />
        </div>
        <div className="field">
          <label htmlFor="email">{t('contact.form.email')} *</label>
          <input id="email" name="email" type="email" maxLength={254} required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="phone">
            {t('contact.form.phone')} <span className="hint">({t('contact.form.optional')})</span>
          </label>
          <input id="phone" name="phone" type="tel" maxLength={40} autoComplete="tel" />
        </div>
        <div className="field field-full">
          <label htmlFor="service">{t('contact.form.service')} *</label>
          <select
            id="service"
            name="service"
            value={service}
            onChange={(event) => setService(event.target.value)}
            required
          >
            <option value="" disabled>
              {t('contact.form.service_placeholder')}
            </option>
            {SERVICES.map((item) => (
              <option key={item.value} value={item.value}>
                {locale === 'en' ? item.en : item.fr}
              </option>
            ))}
          </select>
        </div>
        <div className="field field-full">
          <label htmlFor="message">{t('contact.form.message')} *</label>
          <textarea id="message" name="message" maxLength={5000} required rows={6} />
        </div>
        <div className="field field-full">
          <label htmlFor="attachment">{t('contact.form.attachment')}</label>
          <input id="attachment" name="attachment" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp" />
          <span className="hint">{t('contact.form.optional')}</span>
        </div>
        <div className="field" aria-hidden="true" hidden>
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status ? (
        <p className="form-status" data-tone={status.tone} role={status.tone === 'error' ? 'alert' : 'status'}>
          {status.message}
        </p>
      ) : null}

      <div className="form-actions">
        <button type="submit" className="btn" disabled={sending}>
          {sending ? t('cta.sending') : t('cta.send')}
        </button>
        <span className="form-note">{t('contact.form.required')} *</span>
      </div>
    </form>
  );
}
