'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { CollectionDef, FieldDef } from '@/lib/admin/collections';
import { mediaUrl, useSignedUrls } from '@/lib/media';
import { formatDate } from '@/lib/format';
import Modal from './Modal';
import MediaField from './MediaField';

type Row = Record<string, unknown> & { id: string };

function Thumb({ path }: { path: string }) {
  const urls = useSignedUrls([path]);
  const url = mediaUrl(urls, path);
  if (!url) return <span className="badge">…</span>;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="thumb" src={url} alt="" />;
}

function emptyForm(fields: FieldDef[]): Record<string, unknown> {
  const base: Record<string, unknown> = { published: false };
  fields.forEach((field) => {
    base[field.name] =
      field.kind === 'images' ? [] : field.kind === 'boolean' ? false : field.kind === 'number' ? 0 : '';
  });
  return base;
}

export default function CollectionManager({ collection }: { collection: CollectionDef }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error: queryError } = await supabase
      .from(collection.table)
      .select('*')
      .order(collection.orderBy.column, { ascending: collection.orderBy.ascending });
    if (queryError) setError(queryError.message);
    else {
      setError(null);
      setRows((data ?? []) as Row[]);
    }
    setLoading(false);
  }, [collection]);

  useEffect(() => {
    load();
  }, [load]);

  const editingId = form?.id as string | undefined;
  const title = editingId ? `Modifier ${collection.singular}` : `Nouveau ${collection.singular}`;

  function startCreate() {
    setNotice(null);
    setForm(emptyForm(collection.fields));
  }

  function startEdit(row: Row) {
    setNotice(null);
    const next: Record<string, unknown> = { ...emptyForm(collection.fields), ...row };
    collection.fields.forEach((field) => {
      if (field.kind === 'images') next[field.name] = (row[field.name] as string[] | null) ?? [];
    });
    setForm(next);
  }

  async function save() {
    if (!form) return;
    setSaving(true);
    setError(null);
    const payload: Record<string, unknown> = { published: Boolean(form.published) };
    collection.fields.forEach((field) => {
      const value = form[field.name];
      if (field.kind === 'number') payload[field.name] = value === '' || value === null ? null : Number(value);
      else if (field.kind === 'images') payload[field.name] = Array.isArray(value) ? value : [];
      else if (field.kind === 'image' || field.kind === 'file') payload[field.name] = value || null;
      else payload[field.name] = typeof value === 'string' ? value.trim() : value ?? null;
    });

    const { error: writeError } = editingId
      ? await supabase.from(collection.table).update(payload).eq('id', editingId)
      : await supabase.from(collection.table).insert(payload);

    setSaving(false);
    if (writeError) {
      setError(writeError.message);
      return;
    }
    setNotice(editingId ? 'Modifications enregistrées.' : `${collection.singular} créé.`);
    setForm(null);
    load();
  }

  async function togglePublish(row: Row) {
    const { error: writeError } = await supabase
      .from(collection.table)
      .update({ published: !row.published })
      .eq('id', row.id);
    if (writeError) setError(writeError.message);
    else load();
  }

  async function remove(row: Row) {
    if (!window.confirm(`Supprimer « ${String(row[collection.titleField] ?? 'cet élément')} » ?`)) return;
    const { error: writeError } = await supabase.from(collection.table).delete().eq('id', row.id);
    if (writeError) setError(writeError.message);
    else {
      setNotice('Supprimé.');
      load();
    }
  }

  const imageColumns = useMemo(
    () => collection.columns.filter((column) => column.kind === 'image'),
    [collection.columns],
  );

  return (
    <>
      <div className="admin-head">
        <div>
          <h1>{collection.title}</h1>
          <p>{collection.description}</p>
        </div>
        <div className="actions">
          <button type="button" className="btn btn-sm btn-ghost" onClick={load}>
            Actualiser
          </button>
          <button type="button" className="btn btn-sm" onClick={startCreate}>
            + Ajouter
          </button>
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

      <div className="card table-wrap">
        <table className="data">
          <thead>
            <tr>
              {collection.columns.map((column) => (
                <th key={column.name}>{column.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={collection.columns.length + 1}>Chargement…</td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={collection.columns.length + 1}>Aucun élément pour le moment.</td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  {collection.columns.map((column) => {
                    const value = row[column.name];
                    if (column.kind === 'boolean') {
                      return (
                        <td key={column.name}>
                          <span className="badge" data-tone={value ? 'ok' : 'warn'}>
                            {value ? 'Publié' : 'Brouillon'}
                          </span>
                        </td>
                      );
                    }
                    if (column.kind === 'image' && typeof value === 'string' && value) {
                      return (
                        <td key={column.name}>
                          <Thumb path={value} />
                        </td>
                      );
                    }
                    if (column.kind === 'date' && typeof value === 'string') {
                      return <td key={column.name}>{formatDate(value, 'fr')}</td>;
                    }
                    return (
                      <td key={column.name}>
                        {column.name === collection.titleField ? <strong>{String(value ?? '—')}</strong> : String(value ?? '—')}
                      </td>
                    );
                  })}
                  <td>
                    <div className="actions">
                      <button type="button" className="btn btn-sm btn-ghost" onClick={() => startEdit(row)}>
                        Modifier
                      </button>
                      <button type="button" className="btn btn-sm btn-ghost" onClick={() => togglePublish(row)}>
                        {row.published ? 'Dépublier' : 'Publier'}
                      </button>
                      <button type="button" className="btn btn-sm btn-ghost" onClick={() => remove(row)}>
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {imageColumns.length ? null : null}

      {form ? (
        <Modal
          title={title}
          onClose={() => setForm(null)}
          footer={
            <>
              <button type="button" className="btn btn-ghost" onClick={() => setForm(null)}>
                Annuler
              </button>
              <button type="button" className="btn" onClick={save} disabled={saving}>
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </>
          }
        >
          <div className="admin-form">
            <label className="field-check">
              <input
                type="checkbox"
                checked={Boolean(form.published)}
                onChange={(event) => setForm({ ...form, published: event.target.checked })}
              />
              Publier sur le site
            </label>

            <div className="form-grid">
              {collection.fields.map((field) => {
                const value = form[field.name];
                const full = field.full || field.kind === 'textarea' || field.kind === 'images';
                if (field.kind === 'image' || field.kind === 'images' || field.kind === 'file') {
                  return (
                    <div key={field.name} className={full ? 'field-full' : undefined}>
                      <MediaField
                        field={field}
                        folder={collection.table}
                        value={(value as string | string[] | null) ?? null}
                        onChange={(next) => setForm({ ...form, [field.name]: next })}
                      />
                    </div>
                  );
                }
                if (field.kind === 'textarea') {
                  return (
                    <div key={field.name} className="field field-full">
                      <label htmlFor={field.name}>{field.label}</label>
                      <textarea
                        id={field.name}
                        rows={5}
                        maxLength={field.maxLength}
                        value={String(value ?? '')}
                        onChange={(event) => setForm({ ...form, [field.name]: event.target.value })}
                      />
                    </div>
                  );
                }
                return (
                  <div key={field.name} className={full ? 'field field-full' : 'field'}>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                      id={field.name}
                      type={field.kind === 'number' ? 'number' : 'text'}
                      maxLength={field.maxLength}
                      placeholder={field.placeholder}
                      value={String(value ?? '')}
                      onChange={(event) => setForm({ ...form, [field.name]: event.target.value })}
                    />
                    {field.hint ? <span className="hint">{field.hint}</span> : null}
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
