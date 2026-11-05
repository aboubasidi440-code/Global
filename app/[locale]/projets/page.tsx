'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProjectCard } from '@/components/cards';
import { usePublishedProjects } from '@/lib/data';
import { bilingual, isLocale, translator } from '@/lib/i18n';

export default function ProjectsPage() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const t = translator(locale);
  const { data: projects, loading, error } = usePublishedProjects();
  const [filter, setFilter] = useState<string>('*');

  const categories = useMemo(() => {
    const map = new Map<string, string>();
    projects.forEach((project) => {
      const value = bilingual(project, 'category', locale).trim();
      if (value && !map.has(value)) map.set(value, value);
    });
    return Array.from(map.keys());
  }, [projects, locale]);

  const visible = filter === '*' ? projects : projects.filter((p) => bilingual(p, 'category', locale) === filter);

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
            <div className="chips">
              <button type="button" className="chip" data-active={filter === '*'} onClick={() => setFilter('*')}>
                {t('projects.filter.all')}
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className="chip"
                  data-active={filter === category}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          ) : null}

          {loading ? (
            <p className="loading-line">{t('common.loading')}</p>
          ) : error ? (
            <p className="form-status" data-tone="error">
              {t('common.error')} ({error})
            </p>
          ) : visible.length ? (
            <div className="projects-grid">
              {visible.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="empty-state">{t('projects.empty')}</div>
          )}
        </div>
      </section>
    </>
  );
}
