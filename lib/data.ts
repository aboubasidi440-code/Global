'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase } from './supabase';

export type Project = {
  id: string;
  title: string;
  title_en: string | null;
  category: string | null;
  category_en: string | null;
  location: string | null;
  year: number | null;
  client: string | null;
  description: string | null;
  description_en: string | null;
  status: string | null;
  image_urls: string[] | null;
  featured: boolean;
  sort_order: number;
  published: boolean;
  created_at: string;
};

export type TeamMember = {
  id: string;
  name: string;
  position: string | null;
  position_en: string | null;
  bio: string | null;
  bio_en: string | null;
  photo_url: string | null;
  sort_order: number;
  published: boolean;
};

export type Article = {
  id: string;
  title: string;
  title_en: string | null;
  body: string | null;
  body_en: string | null;
  published: boolean;
  created_at: string;
};

export type SiteDocument = {
  id: string;
  title: string;
  title_en: string | null;
  file_url: string | null;
  published: boolean;
  created_at: string;
};

export type ContactRequest = {
  id: string;
  name: string;
  organisation: string | null;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: string;
  created_at: string;
  attachment_path: string | null;
  attachment_name: string | null;
  notification_status: string | null;
  notification_error: string | null;
};

export type Settings = Record<string, unknown>;

type QueryState<T> = { data: T; loading: boolean; error: string | null; reload: () => void };

export function useQuery<T>(
  initial: T,
  run: (client: typeof supabase) => Promise<{ data: T | null; error: { message: string } | null }>,
  deps: unknown[] = [],
): QueryState<T> {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  useEffect(() => {
    let active = true;
    setLoading(true);
    run(supabase)
      .then(({ data: result, error: queryError }) => {
        if (!active) return;
        if (queryError) setError(queryError.message);
        else {
          setError(null);
          if (result !== null) setData(result);
        }
      })
      .catch((err: unknown) => {
        if (active) setError(err instanceof Error ? err.message : 'Erreur inconnue');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, nonce]);

  return { data, loading, error, reload };
}

export function usePublishedProjects(limit?: number) {
  return useQuery<Project[]>(
    [],
    (client) => {
      let query = client
        .from('projects')
        .select('*')
        .eq('published', true)
        .order('sort_order', { ascending: true })
        .order('year', { ascending: false, nullsFirst: false });
      if (limit) query = query.limit(limit);
      return query as unknown as Promise<{ data: Project[] | null; error: { message: string } | null }>;
    },
    [limit],
  );
}

export function useProject(id: string) {
  return useQuery<Project | null>(
    null,
    (client) =>
      client
        .from('projects')
        .select('*')
        .eq('id', id)
        .maybeSingle() as unknown as Promise<{ data: Project | null; error: { message: string } | null }>,
    [id],
  );
}

export function useTeam(publishedOnly = true) {
  return useQuery<TeamMember[]>(
    [],
    (client) => {
      let query = client.from('team').select('*').order('sort_order', { ascending: true });
      if (publishedOnly) query = query.eq('published', true);
      return query as unknown as Promise<{ data: TeamMember[] | null; error: { message: string } | null }>;
    },
    [publishedOnly],
  );
}

export function useArticles(limit?: number) {
  return useQuery<Article[]>(
    [],
    (client) => {
      let query = client
        .from('articles')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });
      if (limit) query = query.limit(limit);
      return query as unknown as Promise<{ data: Article[] | null; error: { message: string } | null }>;
    },
    [limit],
  );
}

export function useArticle(id: string) {
  return useQuery<Article | null>(
    null,
    (client) =>
      client
        .from('articles')
        .select('*')
        .eq('id', id)
        .maybeSingle() as unknown as Promise<{ data: Article | null; error: { message: string } | null }>,
    [id],
  );
}

export function useDocuments() {
  return useQuery<SiteDocument[]>(
    [],
    (client) =>
      client
        .from('documents')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false }) as unknown as Promise<{
        data: SiteDocument[] | null;
        error: { message: string } | null;
      }>,
    [],
  );
}

export function useSettings() {
  return useQuery<Record<string, Settings>>(
    {},
    (client) =>
      client
        .from('site_settings')
        .select('key,value,published')
        .eq('published', true) as unknown as Promise<{
        data: Record<string, Settings> | null;
        error: { message: string } | null;
      }>,
    [],
  );
}
