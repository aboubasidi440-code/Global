'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase, CONTACT_ATTACHMENTS_BUCKET } from '@/lib/supabase';
import type { ContactRequest } from '@/lib/data';
import { serviceLabel } from '@/lib/content';
import { formatDate } from '@/lib/format';
import Modal from '@/components/admin/Modal';

const STATUSES = [
  { value: 'nouveau', label: 'Nouveau' },
  { value: 'en_cours', label: 'En cours' },
  { value: 'traite', label: 'Traité' },
  { value: 'archive', label: 'Archivé' },
];

function statusBadge(status: string) {
  const tone = status === 'nouveau' ? 'warn' : status === 'traite' ? 'ok' : undefined;
  return (
    <span className="badge" data-tone={tone}>
      {STATUSES.find((item) => item.value === status)?.label ?? status}
    </span>
  );
}

export default function AdminMessagesPage() {
  const [rows, setRows] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<ContactRequest | null>(null);
  const [attachmentUrl, setAttachmentUrl] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: queryError } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false });
    if (queryError) setError(queryError.message);
    else {
      setError(null);
      setRows((data ?? []) as ContactRequest[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    let active = true;
    setAttachmentUrl(null);
    if (!selected?.attachment_path) return;
    supabase.storage
      .from(CONTACT_ATTACHMENTS_BUCKET)
      .createSignedUrl(selected.attachment_path, 3600, { download: selected.attachment_name ?? true })
      .then(({ data }) => {
        if (active) setAttachmentUrl(data?.signedUrl ?? null);
      });
    return () => {
      active = false;
    };
  }, [selected]);

  async function updateStatus(row: ContactRequest, status: string) {
    const { error: writeError } = await supabase.from('contact_requests').update({ status }).eq('id', row.id);
    if (writeError) setError(writeError.message);
    else {
      setRows((current) => current.map((item) => (item.id === row.id ? { ...item, status } : item)));
      setSelected((current) => (current && current.id === row.id ? { ...current, status } : current));
    }
  }

  async function remove(row: ContactRequest) {
    if (!window.confirm('Supprimer définitivement ce message ?')) return;
    const { error: writeError } = await supabase.from('contact_requests').delete().eq('id', row.id);
    if (writeError) setError(writeError.message);
    else {
      setSelected(null);
      load();
    }
  }

  const newCount = rows.filter((row) => row.status === 'nouveau').length;

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>Messages</h1>
          <p>
            {rows.length} demande(s) reçue(s){newCount ? ` — ${newCount} à traiter` : ''}. Les notifications sont
            envoyées à l’adresse définie dans les réglages.
          </p>
        </div>
        <div className="actions">
          <button type="button" className="btn btn-sm btn-ghost" onClick={load}>
            Actualiser
          </button>
        </div>
      </div>

      {error ? (
        <p className="form-status" data-tone="error" style={{ marginBottom: '1rem' }}>
          {error}
        </p>
      ) : null}

      <div className="card table-wrap">
        <table className="data">
          <thead>
            <tr>
              <th>Date</th>
              <th>Nom</th>
              <th>E-mail</th>
              <th>Domaine</th>
              <th>Statut</th>
              <th>E-mail envoyé</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7}>Chargement…</td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7}>Aucun message pour le moment.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>{formatDate(row.created_at, 'fr')}</td>
                  <td>
                    <strong>{row.name}</strong>
                    {row.organisation ? <div style={{ fontSize: '0.8rem' }}>{row.organisation}</div> : null}
                  </td>
                  <td>
                    <a href={`mailto:${row.email}`}>{row.email}</a>
                  </td>
                  <td>{row.service ? serviceLabel(row.service, 'fr') : '—'}</td>
                  <td>{statusBadge(row.status)}</td>
                  <td>
                    <span
                      className="badge"
                      data-tone={row.notification_status === 'sent' ? 'ok' : row.notification_status === 'failed' ? 'danger' : undefined}
                    >
                      {row.notification_status === 'sent' ? 'envoyé' : row.notification_status === 'failed' ? 'échec' : 'en attente'}
                    </span>
                  </td>
                  <td>
                    <button type="button" className="btn btn-sm btn-ghost" onClick={() => setSelected(row)}>
                      Ouvrir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selected ? (
        <Modal
          title={`Message de ${selected.name}`}
          onClose={() => setSelected(null)}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={() => remove(selected)}>
                Supprimer
              </button>
              <a className="btn" href={`mailto:${selected.email}`}>
                Répondre par e-mail
              </a>
            </>
          }
        >
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div className="actions" style={{ flexWrap: 'wrap', gap: '0.8rem' }}>
              <span className="badge">{formatDate(selected.created_at, 'fr')}</span>
              <span className="badge">{selected.service ? serviceLabel(selected.service, 'fr') : '—'}</span>
              {selected.phone ? <span className="badge">{selected.phone}</span> : null}
              <span
                className="badge"
                data-tone={selected.notification_status === 'sent' ? 'ok' : selected.notification_status === 'failed' ? 'danger' : undefined}
              >
                e-mail : {selected.notification_status ?? 'inconnu'}
              </span>
            </div>

            {selected.notification_error ? (
              <p className="form-status" data-tone="error">
                {selected.notification_error}
              </p>
            ) : null}

            <div className="card card-pad" style={{ whiteSpace: 'pre-wrap', fontSize: '0.92rem' }}>
              {selected.message}
            </div>

            {selected.attachment_path ? (
              <p>
                {attachmentUrl ? (
                  <a className="btn btn-sm btn-ghost" href={attachmentUrl} target="_blank" rel="noreferrer">
                    Télécharger {selected.attachment_name ?? 'la pièce jointe'}
                  </a>
                ) : (
                  <span className="loading-line">Préparation de la pièce jointe…</span>
                )}
              </p>
            ) : null}

            <div className="field" style={{ maxWidth: 260 }}>
              <label htmlFor="status">Statut de traitement</label>
              <select
                id="status"
                value={selected.status}
                onChange={(event) => updateStatus(selected, event.target.value)}
              >
                {STATUSES.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
