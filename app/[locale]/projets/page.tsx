'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import CollectionState from '@/components/CollectionState';
import { ProjectCard } from '@/components/cards';
import { usePublishedProjects } from '@/lib/data';
import { bilingual, isLocale, translator } from '@/lib/i18n';

export default function ProjectsPage() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const t = translator(locale);
  const { data: projects, loading, error, reload } = usePublishedProjects();
  const [filter, setFilter] = useState<string>('*');

  useEffect(() => setFilter('*'), [locale]);

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    projects.forEach((project) => {
      const value = bilingual(project, 'category', locale).trim();
      if (value && !map.has(value)) map.set(value, value);
    });
    return Array.from(map.keys());
  }, [projects, locale]);

  const visible =
    filter === '*' ? projects : projects.filter((p) => bilingual(p, 'category', locale) === filter);

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <span className="eyebrow">{t('nav.projects')}</span>
          <h1>{t('projects.title')}</h1>
          <p className="lead">{t('projects.lead')}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          {categories.length > 1 ? (
            <div className="chips" role="group" aria-label={t('projects.meta.category')}>
              <button
                type="button"
                className="chip"
                data-active={filter === '*'}
                aria-pressed={filter === '*'}
                onClick={() => setFilter('*')}
              >
                {t('projects.filter.all')}
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className="chip"
                  data-active={filter === category}
                  aria-pressed={filter === category}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          ) : null}

          <CollectionState
            locale={locale}
            loading={loading}
            error={error}
            onRetry={reload}
            empty={!visible.length}
            emptyMessage={t('projects.empty')}
          >
            <div className="projects-grid projects-grid--wide">
              {visible.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </div>
          </CollectionState>
        </div>
      </section>
    </>
  );
}
