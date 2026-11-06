'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import CollectionState from '@/components/CollectionState';
import { useArticles } from '@/lib/data';
import { bilingual, href, isLocale, translator } from '@/lib/i18n';
import { excerpt, formatDate } from '@/lib/format';
import { ArrowRight } from '@/components/Icon';

export default function NewsPage() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const t = translator(locale);
  const { data: articles, loading, error, reload } = useArticles();

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <span className="eyebrow">{t('nav.news')}</span>
          <h1>{t('news.title')}</h1>
          <p className="lead">{t('news.lead')}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          <CollectionState
            locale={locale}
            loading={loading}
            error={error}
            onRetry={reload}
            empty={!articles.length}
            emptyMessage={t('news.empty')}
          >
            <div className="rows">
              {articles.map((article) => (
                <Link key={article.id} href={href(locale, `/actualites/${article.id}`)} className="row-item">
                  <span className="date">{formatDate(article.created_at, locale)}</span>
                  <div>
                    <h3>{bilingual(article, 'title', locale)}</h3>
                    <p>{excerpt(bilingual(article, 'body', locale), 200)}</p>
                  </div>
                  <span className="link-arrow">
                    {t('cta.read')} <ArrowRight />
                  </span>
                </Link>
              ))}
            </div>
          </CollectionState>
        </div>
      </section>
    </>
  );
}
