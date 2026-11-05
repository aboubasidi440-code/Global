'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight } from '@/components/Icon';
import { ProjectCard } from '@/components/cards';
import { useProject, usePublishedProjects } from '@/lib/data';
import { bilingual, href, isLocale, translator } from '@/lib/i18n';
import { mediaUrl, useSignedUrls } from '@/lib/media';
import { paragraphs } from '@/lib/format';

export default function ProjectDetailPage() {
  const params = useParams<{ locale: string; id: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const t = translator(locale);
  const id = params?.id ?? '';

  const { data: project, loading } = useProject(id);
  const { data: all } = usePublishedProjects();
  const images = project?.image_urls ?? [];
  const urls = useSignedUrls(images);
  const cover = images.length ? mediaUrl(urls, images[0]) : null;

  const others = all.filter((item) => item.id !== id).slice(0, 3);

  if (loading) {
    return (
      <section className="section">
        <div className="shell">
          <p className="loading-line">{t('common.loading')}</p>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="section">
        <div className="shell">
          <h1>{t('projects.not_found')}</h1>
          <p style={{ marginTop: '1.5rem' }}>
            <Link href={href(locale, '/projets')} className="link-arrow">
              {t('cta.back')} <ArrowRight />
            </Link>
          </p>
        </div>
      </section>
    );
  }

  const title = bilingual(project, 'title', locale);
  const category = bilingual(project, 'category', locale);
  const description = bilingual(project, 'description', locale);

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <p style={{ fontSize: '0.85rem' }}>
            <Link href={href(locale, '/projets')} className="link-arrow">
              {t('nav.projects')}
            </Link>
          </p>
          <h1>{title}</h1>
          <div className="project-meta" style={{ marginTop: '0.8rem' }}>
            {category ? <span>{category}</span> : null}
            {project.location ? <span>{project.location}</span> : null}
            {project.year ? <span>{project.year}</span> : null}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell detail-grid">
          <div>
            {cover ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={cover}
                alt={title}
                style={{ width: '100%', borderRadius: 'var(--radius)', border: '1px solid var(--line)' }}
              />
            ) : null}

            <div className="prose" style={{ marginTop: '2rem' }}>
              {paragraphs(description).map((block, index) => (
                <p key={index}>{block}</p>
              ))}
            </div>

            {images.length > 1 ? (
              <>
                <h3 style={{ marginTop: '2.5rem' }}>{t('projects.meta.images')}</h3>
                <div className="gallery">
                  {images.slice(1).map((path) => {
                    const url = mediaUrl(urls, path);
                    return url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img key={path} src={url} alt={title} loading="lazy" />
                    ) : null;
                  })}
                </div>
              </>
            ) : null}
          </div>

          <aside className="detail-aside">
            <h3 style={{ fontSize: '1rem' }}>{t('projects.title')}</h3>
            <dl>
              {category ? (
                <div>
                  <dt>{t('projects.meta.category')}</dt>
                  <dd>{category}</dd>
                </div>
              ) : null}
              {project.location ? (
                <div>
                  <dt>{t('projects.meta.location')}</dt>
                  <dd>{project.location}</dd>
                </div>
              ) : null}
              {project.year ? (
                <div>
                  <dt>{t('projects.meta.year')}</dt>
                  <dd>{project.year}</dd>
                </div>
              ) : null}
              {project.client ? (
                <div>
                  <dt>{t('projects.meta.client')}</dt>
                  <dd>{project.client}</dd>
                </div>
              ) : null}
              {project.status ? (
                <div>
                  <dt>{t('projects.meta.status')}</dt>
                  <dd>{project.status}</dd>
                </div>
              ) : null}
            </dl>
            <Link href={href(locale, '/contact')} className="btn btn-sm">
              {t('cta.contact')} <ArrowRight />
            </Link>
          </aside>
        </div>
      </section>

      {others.length ? (
        <section className="section-tight" style={{ background: 'var(--paper)', borderTop: '1px solid var(--line)' }}>
          <div className="shell">
            <h2 style={{ marginBottom: '1.6rem', fontSize: '1.8rem' }}>{t('projects.others')}</h2>
            <div className="projects-grid">
              {others.map((item) => (
                <ProjectCard key={item.id} project={item} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
