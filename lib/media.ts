'use client';

import { useEffect, useMemo, useState } from 'react';
import { MEDIA_BUCKET, supabase } from './supabase';

const cache = new Map<string, { url: string; expires: number }>();

/** Transforme un chemin du bucket privé `site-media` en URL signée temporaire. */
export async function resolveMedia(path: string | null | undefined, seconds = 3600): Promise<string | null> {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  const cached = cache.get(path);
  if (cached && cached.expires > Date.now() + 60_000) return cached.url;
  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).createSignedUrl(path, seconds);
  if (error || !data?.signedUrl) return null;
  cache.set(path, { url: data.signedUrl, expires: Date.now() + seconds * 1000 });
  return data.signedUrl;
}

/** Signe un lot de chemins d'un coup (photos, galeries, documents). */
export function useSignedUrls(paths: (string | null | undefined)[]): Record<string, string> {
  const key = JSON.stringify(paths);
  const [urls, setUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;
    const unique = Array.from(new Set(paths.filter((p): p is string => Boolean(p) && !/^https?:\/\//i.test(p as string))));
    if (!unique.length) {
      setUrls({});
      return;
    }
    (async () => {
      const entries = await Promise.all(
        unique.map(async (path) => [path, await resolveMedia(path)] as const),
      );
      if (!active) return;
      setUrls(Object.fromEntries(entries.filter(([, url]) => Boolean(url)) as [string, string][]));
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return useMemo(() => urls, [urls]);
}

export function mediaUrl(urls: Record<string, string>, path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return urls[path] ?? null;
}

/** Envoi d'un fichier dans le bucket média (réservé au personnel par la RLS). */
export async function uploadMedia(file: File, folder = 'uploads'): Promise<string> {
  const ext = (file.name.split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '');
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw new Error(error.message);
  return path;
}
