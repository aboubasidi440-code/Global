'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useDocuments } from '@/lib/data';
import { bilingual, isLocale, translator } from '@/lib/i18n';
import { formatDate } from '@/lib/format';
import { MEDIA_BUCKET, supabase } from '@/lib/supabase';

export default function DocumentsPage() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const t = translator(locale);
  const { data: documents, loading } = useDocuments();
  const [links, setLinks] = useState<Record<string, string>>({});

  useEffect(() => {
    let active = true;
    const paths = documents.map((doc) => doc.file_url).filter((path): path is string => Boolean(path));
    if (!paths.length) return;
    (async () => {
      const entries = await Promise.all(
        paths.map(async (path) => {
          if (/^https?:\/\//i.test(path)) return [path, path] as const;
          const { data } = await supabase.storage.from(MEDIA_BUCKET).createSignedUrl(path, 60 * 60 * 6, {
            download: true,
          });
          return [path, data?.signedUrl ?? ''] as const;
        }),
      );
      if (active) setLinks(Object.fromEntries(entries.filter(([, url]) => Boolean(url))));
    })();
    return () => {
      active = false;
    };
  }, [documents]);

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <span className="eyebrow">{t('nav.documents')}</span>
          <h1>{t('documents.title')}</h1>
          <p className="lead">{t('documents.lead')}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          {loading ? (
            <p className="loading-line">{t('common.loading')}</p>
          ) : documents.length ? (
            <div className="doc-list">
              {documents.map((doc) => {
                const url = doc.file_url ? links[doc.file_url] : undefined;
                return (
                  <div className="doc-item" key={doc.id}>
                    <div>
                      <strong>{bilingual(doc, 'title', locale)}</strong>
                      <span>{formatDate(doc.created_at, locale)}</span>
                    </div>
                    {url ? (
                      <a className="btn btn-ghost btn-sm" href={url} target="_blank" rel="noreferrer">
                        {t('cta.download')}
                      </a>
                    ) : (
                      <span className="loading-line">{t('common.loading')}</span>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">{t('documents.empty')}</div>
          )}
        </div>
      </section>
    </>
  );
}
