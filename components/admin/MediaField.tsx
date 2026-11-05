'use client';

import { useRef, useState } from 'react';
import { mediaUrl, uploadMedia, useSignedUrls } from '@/lib/media';
import type { FieldDef } from '@/lib/admin/collections';

type Props = {
  field: FieldDef;
  folder: string;
  value: string | string[] | null;
  onChange: (value: string | string[] | null) => void;
};

export default function MediaField({ field, folder, value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isList = field.kind === 'images';
  const paths = isList ? ((value as string[]) ?? []) : value ? [value as string] : [];
  const urls = useSignedUrls(paths);
  const accept = field.kind === 'file' ? '.pdf,.jpg,.jpeg,.png,.webp' : 'image/*';

  async function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;
    setBusy(true);
    setError(null);
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        uploaded.push(await uploadMedia(file, field.folder ?? folder));
      }
      if (isList) onChange([...((value as string[]) ?? []), ...uploaded]);
      else onChange(uploaded[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec de l’envoi');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  return (
    <div className="field">
      <label>{field.label}</label>
      <div className="actions" style={{ alignItems: 'center' }}>
        {isList
          ? ((value as string[]) ?? []).map((path) => (
              <span key={path} style={{ position: 'relative', display: 'inline-block' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="thumb" src={mediaUrl(urls, path) ?? ''} alt="" />
                <button
                  type="button"
                  className="btn btn-sm btn-ghost"
                  style={{ padding: '0.1rem 0.35rem', fontSize: '0.7rem', marginTop: '0.2rem' }}
                  onClick={() => onChange(((value as string[]) ?? []).filter((item) => item !== path))}
                >
                  Retirer
                </button>
              </span>
            ))
          : value ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
                {field.kind === 'file' ? (
                  <span className="badge">{(value as string).split('/').pop()}</span>
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="thumb" src={mediaUrl(urls, value as string) ?? ''} alt="" />
                )}
                <button type="button" className="btn btn-sm btn-ghost" onClick={() => onChange(null)}>
                  Retirer
                </button>
              </span>
            ) : (
              <span className="loading-line">Aucun fichier</span>
            )}

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={isList}
          style={{ display: 'none' }}
          onChange={(event) => handleFiles(event.target.files)}
        />
        <button type="button" className="btn btn-sm btn-ghost" disabled={busy} onClick={() => inputRef.current?.click()}>
          {busy ? 'Envoi…' : isList ? 'Ajouter des photos' : 'Choisir un fichier'}
        </button>
      </div>
      {field.hint ? <span className="hint">{field.hint}</span> : null}
      {error ? (
        <span className="hint" style={{ color: 'var(--danger)' }}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
