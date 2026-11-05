'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useArticle } from '@/lib/data';
import { bilingual, href, isLocale, translator } from '@/lib/i18n';
import { formatDate, paragraphs } from '@/lib/format';
import { ArrowRight } from '@/components/Icon';

export default function ArticlePage() {
  const params = useParams<{ locale: string; id: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const t = translator(locale);
  const { data: article, loading } = useArticle(params?.id ?? '');

  if (loading) {
    return (
      <section className="section">
        <div className="shell">
          <p className="loading-line">{t('common.loading')}</p>
        </div>
      </section>
    );
  }

  if (!article) {
    return (
      <section className="section">
        <div className="shell">
          <h1>{t('news.not_found')}</h1>
          <p style={{ marginTop: '1.5rem' }}>
            <Link href={href(locale, '/actualites')} className="link-arrow">
              {t('cta.back')} <ArrowRight />
            </Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <p style={{ fontSize: '0.85rem' }}>
            <Link href={href(locale, '/actualites')} className="link-arrow">
              {t('nav.news')}
            </Link>
          </p>
          <h1 style={{ maxWidth: '28ch' }}>{bilingual(article, 'title', locale)}</h1>
          <p className="project-meta" style={{ marginTop: '0.8rem' }}>
            <span>{formatDate(article.created_at, locale)}</span>
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell" style={{ maxWidth: '72ch' }}>
          <div className="prose">
            {paragraphs(bilingual(article, 'body', locale)).map((block, index) => (
              <p key={index}>{block}</p>
            ))}
          </div>
          <p style={{ marginTop: '2.5rem' }}>
            <Link href={href(locale, '/actualites')} className="link-arrow">
              {t('cta.all_news')} <ArrowRight />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
