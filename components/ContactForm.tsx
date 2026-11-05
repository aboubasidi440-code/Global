'use client';

import { useState } from 'react';
import { SERVICES } from '@/lib/content';
import { translator, type Locale } from '@/lib/i18n';
import { FUNCTIONS_URL, SUPABASE_ANON_KEY } from '@/lib/supabase';

type Status = { tone: 'error' | 'success'; message: string } | null;

export default function ContactForm({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<Status>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const required = ['name', 'email', 'service', 'message'];
    if (required.some((field) => !String(data.get(field) || '').trim())) {
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
      setSent(true);
    } catch {
      setStatus({ tone: 'error', message: t('contact.form.error_generic') });
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="form-card">
        <span className="tag">{t('contact.form.success.title')}</span>
        <h2 style={{ margin: '1rem 0 0.8rem', fontSize: '1.7rem' }}>{t('contact.form.success.title')}</h2>
        <p style={{ color: 'var(--ink-soft)' }}>{t('contact.form.success.text')}</p>
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
    <form className="form-card" onSubmit={handleSubmit} noValidate>
      <h2 style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>{t('contact.form.title')}</h2>
      <p className="form-note" style={{ marginBottom: '1.4rem' }}>
        {t('contact.form.required')} *
      </p>

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
          <select id="service" name="service" defaultValue="" required>
            <option value="" disabled>
              {t('contact.form.service_placeholder')}
            </option>
            {SERVICES.map((service) => (
              <option key={service.value} value={service.value}>
                {locale === 'en' ? service.en : service.fr}
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
        <div className="field" aria-hidden="true" style={{ display: 'none' }}>
          <label htmlFor="website">Website</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      {status ? (
        <p className="form-status" data-tone={status.tone}>
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
