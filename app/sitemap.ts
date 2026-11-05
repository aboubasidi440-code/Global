import type { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://globalsolutions.one';

const PATHS = ['', '/projets', '/equipe', '/actualites', '/documents', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ['fr', 'en'].flatMap((locale) =>
    PATHS.map((path) => ({
      url: `${BASE}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1 : 0.7,
    })),
  );
}
