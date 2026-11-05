'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type Values = Record<string, string>;
type SettingsRow = { key: string; value: Values; published: boolean };

const HOMEPAGE_FIELDS: { name: string; label: string; long?: boolean; hint?: string }[] = [
  { name: 'headline_first', label: 'Titre — 1re ligne (FR)' },
  { name: 'headline_second', label: 'Titre — 2e ligne (FR)' },
  { name: 'subtitle', label: 'Accroche (FR)', long: true },
  { name: 'headline_first_en', label: 'Titre — 1re ligne (EN)' },
  { name: 'headline_second_en', label: 'Titre — 2e ligne (EN)' },
  { name: 'subtitle_en', label: 'Accroche (EN)', long: true },
  { name: 'year', label: 'Année de création' },
  { name: 'team_size', label: 'Effectif affiché', hint: 'Ex. ~10' },
  { name: 'expertise_count', label: 'Nombre de domaines' },
  { name: 'location', label: 'Pays' },
];

const CONTACT_FIELDS: { name: string; label: string; long?: boolean; hint?: string }[] = [
  { name: 'address', label: 'Adresse' },
  { name: 'postal', label: 'Boîte postale' },
  { name: 'phone_primary', label: 'Téléphone principal' },
  { name: 'phone_secondary', label: 'Téléphone secondaire' },
  { name: 'email_primary', label: 'E-mail affiché sur le site' },
  { name: 'email_secondary', label: 'E-mail secondaire' },
  { name: 'whatsapp', label: 'WhatsApp', hint: 'Indicatif + numéro, ex. 22790393132' },
  { name: 'facebook', label: 'Facebook (URL)' },
  { name: 'linkedin', label: 'LinkedIn (URL)' },
  { name: 'youtube', label: 'YouTube (URL)' },
  {
    name: 'notification_email',
    label: 'Adresse qui reçoit les messages du formulaire',
    hint: 'Notification e-mail des demandes de contact',
  },
  {
    name: 'notification_from',
    label: 'Expéditeur des notifications',
    hint:
      'Format « Global Solutions <adresse@domaine> ». Tant que le domaine n’est pas vérifié chez Resend, seul ' +
      'l’expéditeur onboarding@resend.dev fonctionne — et uniquement vers l’adresse du compte Resend.',
  },
];

export default function AdminSettingsPage() {
  const [homepage, setHomepage] = useState<Values>({});
  const [contact, setContact] = useState<Values>({});
  const [published, setPublished] = useState<Record<string, boolean>>({ homepage: true, contact: true });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error: queryError } = await supabase.from('site_settings').select('key,value,published');
      if (queryError) setError(queryError.message);
      else {
        const rows = (data ?? []) as SettingsRow[];
        const home = rows.find((row) => row.key === 'homepage');
        const cont = rows.find((row) => row.key === 'contact');
        setHomepage((home?.value ?? {}) as Values);
        setContact((cont?.value ?? {}) as Values);
        setPublished({ homepage: home?.published ?? true, contact: cont?.published ?? true });
      }
      setLoading(false);
    })();
  }, []);

  async function save(key: 'homepage' | 'contact') {
    setSaving(key);
    setError(null);
    setNotice(null);
    const value = key === 'homepage' ? homepage : contact;
    const { error: writeError } = await supabase
      .from('site_settings')
      .upsert({ key, value, published: published[key] ?? true }, { onConflict: 'key' });
    setSaving(null);
    if (writeError) setError(writeError.message);
    else setNotice(key === 'homepage' ? 'Page d’accueil enregistrée.' : 'Coordonnées enregistrées.');
  }

  if (loading) {
    return <p className="loading-line">Chargement des réglages…</p>;
  }

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Réglages du site</h1>
          <p>Contenus de la page d’accueil et coordonnées affichées sur le site.</p>
        </div>
      </div>

      {notice ? (
        <p className="form-status" data-tone="success" style={{ marginBottom: '1rem' }}>
          {notice}
        </p>
      ) : null}
      {error ? (
        <p className="form-status" data-tone="error" style={{ marginBottom: '1rem' }}>
          {error}
        </p>
      ) : null}

      <div className="card card-pad" style={{ marginBottom: '1.4rem' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>Page d’accueil</h2>
        <p className="form-note" style={{ marginBottom: '1.2rem' }}>
          Titre principal, accroche et chiffres clés affichés en haut du site.
        </p>
        <div className="admin-form">
          <div className="form-grid">
            {HOMEPAGE_FIELDS.map((field) => (
              <div key={field.name} className={field.long ? 'field field-full' : 'field'}>
                <label htmlFor={`home-${field.name}`}>{field.label}</label>
                {field.long ? (
                  <textarea
                    id={`home-${field.name}`}
                    rows={3}
                    value={homepage[field.name] ?? ''}
                    onChange={(event) => setHomepage({ ...homepage, [field.name]: event.target.value })}
                  />
                ) : (
                  <input
                    id={`home-${field.name}`}
                    type="text"
                    value={homepage[field.name] ?? ''}
                    onChange={(event) => setHomepage({ ...homepage, [field.name]: event.target.value })}
                  />
                )}
                {field.hint ? <span className="hint">{field.hint}</span> : null}
              </div>
            ))}
          </div>
          <div className="actions">
            <button type="button" className="btn btn-sm" disabled={saving === 'homepage'} onClick={() => save('homepage')}>
              {saving === 'homepage' ? 'Enregistrement…' : 'Enregistrer la page d’accueil'}
            </button>
          </div>
        </div>
      </div>

      <div className="card card-pad" id="contact">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>Coordonnées & messages</h2>
        <p className="form-note" style={{ marginBottom: '1.2rem' }}>
          L’adresse « messages » reçoit les notifications du formulaire de contact ; l’e-mail principal est celui
          affiché sur le site.
        </p>
        <div className="admin-form">
          <div className="form-grid">
            {CONTACT_FIELDS.map((field) => (
              <div key={field.name} className={field.long ? 'field field-full' : 'field'}>
                <label htmlFor={`contact-${field.name}`}>{field.label}</label>
                <input
                  id={`contact-${field.name}`}
                  type={field.name.startsWith('email') || field.name === 'notification_email' ? 'email' : 'text'}
                  value={contact[field.name] ?? ''}
                  onChange={(event) => setContact({ ...contact, [field.name]: event.target.value })}
                />
                {field.hint ? <span className="hint">{field.hint}</span> : null}
              </div>
            ))}
          </div>
          <div className="actions">
            <button type="button" className="btn btn-sm" disabled={saving === 'contact'} onClick={() => save('contact')}>
              {saving === 'contact' ? 'Enregistrement…' : 'Enregistrer les coordonnées'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
