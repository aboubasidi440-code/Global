'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight } from '@/components/Icon';
import { ProjectCard, TeamCard } from '@/components/cards';
import { APPROACH, DOMAIN_IMAGES, EXPERTISE } from '@/lib/content';
import { usePublishedProjects, useSettings, useTeam } from '@/lib/data';
import { href, isLocale, translator } from '@/lib/i18n';

type Homepage = {
  year?: string;
  location?: string;
  team_size?: string;
  expertise_count?: string;
  headline_first?: string;
  headline_second?: string;
  headline_first_en?: string;
  headline_second_en?: string;
  subtitle?: string;
  subtitle_en?: string;
};

const ACTIVITY_IMAGES = [
  '/images/projet-batiment.jpg',
  '/images/projet-hydraulique.jpg',
  '/images/projet-solaire.jpg',
  '/images/hero-clair.jpg',
];

export default function HomePage() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const t = translator(locale);

  const { data: settings } = useSettings();
  const homepage = (settings?.homepage ?? {}) as Homepage;
  const { data: projects, loading: loadingProjects } = usePublishedProjects(3);
  const { data: team, loading: loadingTeam } = useTeam();

  const text = (field: keyof Homepage, fallback: string) => {
    if (!homepage) return fallback;
    const localized = locale === 'en' ? homepage[`${field}_en` as keyof Homepage] : undefined;
    const base = homepage[field];
    return (typeof localized === 'string' && localized.trim()) || (typeof base === 'string' && base.trim()) || fallback;
  };

  const year = homepage.year || '2017';
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const list = (featured.length ? featured : projects).slice(0, 3);
  const teamPreview = team.slice(0, 4);
  const activities = EXPERTISE.slice(0, 4);

  return (
    <>
      {/* ---------------- déclaration ---------------- */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">{t('home.eyebrow', { year })}</span>
            <h1>
              <span className="line">{text('headline_first', 'Construire aujourd’hui.')}</span>
              <span className="highlight">{text('headline_second', 'Servir demain.')}</span>
            </h1>
          </div>

          <div className="hero-side">
            <p className="lead">
              {text(
                'subtitle',
                'À vos côtés pour concevoir et réaliser des projets durables en génie civil, hydraulique et énergie.',
              )}
            </p>
            <div className="hero-actions">
              <Link href={href(locale, '/projets')} className="link-arrow">
                {t('cta.discover')} <ArrowRight />
              </Link>
              <Link href={href(locale, '/contact')} className="btn btn-ghost">
                {t('cta.contact')}
              </Link>
            </div>
            <div className="hero-meta">
              <span>{t('home.meta.1')}</span>
              <span>{t('home.meta.2')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- image d'ouverture ---------------- */}
      <figure className="feature reveal" style={{ margin: 0 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/hero-chantier.jpg" alt={t('home.feature.caption_title')} />
        <figcaption className="feature-caption">
          <strong>{t('home.feature.caption_title')}</strong>
          <span>{t('home.feature.caption_text')}</span>
        </figcaption>
      </figure>

      {/* ---------------- chiffres ---------------- */}
      <section className="stats" style={{ marginTop: 'clamp(3rem, 5vw, 4.5rem)' }}>
        <div className="shell stats-grid">
          <div className="stat">
            <strong>{year}</strong>
            <span>{locale === 'en' ? 'Founded in Niamey' : 'Créée à Niamey'}</span>
          </div>
          <div className="stat">
            <strong>{homepage.team_size || '~10'}</strong>
            <span>{t('stats.team')}</span>
          </div>
          <div className="stat">
            <strong>{homepage.expertise_count || '6'}</strong>
            <span>{t('stats.expertise')}</span>
          </div>
          <div className="stat">
            <strong>{homepage.location || 'Niger'}</strong>
            <span>{t('stats.location')}</span>
          </div>
        </div>
      </section>

      {/* ---------------- activités ---------------- */}
      <section className="activities" id="expertises">
        <div className="shell">
          <div className="activities-head">
            <div>
              <span className="eyebrow">{t('home.activities.label')}</span>
              <h2 style={{ marginTop: '0.9rem' }}>{t('home.expertise.heading')}</h2>
            </div>
            <Link href={href(locale, '/projets')} className="link-arrow">
              {t('cta.all_projects')} <ArrowRight />
            </Link>
          </div>

          <div className="activities-grid">
            {activities.map((item, index) => (
              <article className="activity reveal" key={item.slug}>
                <div className="activity-media">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ACTIVITY_IMAGES[index] ?? '/images/hero-chantier.jpg'}
                    alt={locale === 'en' ? item.titleEn : item.title}
                    loading="lazy"
                  />
                </div>
                <span className="index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{locale === 'en' ? item.titleEn : item.title}</h3>
                <p>{locale === 'en' ? item.textEn : item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- réalisations ---------------- */}
      <section className="projects-section" style={{ borderTop: '1px solid var(--line)' }}>
        <div className="shell">
          <div className="activities-head">
            <div>
              <span className="eyebrow">{t('home.projects.title')}</span>
              <h2 style={{ marginTop: '0.9rem' }}>{t('home.projects.heading')}</h2>
              <p className="lead" style={{ marginTop: '0.9rem', maxWidth: '46ch' }}>
                {t('home.projects.subtitle')}
              </p>
            </div>
            <Link href={href(locale, '/projets')} className="link-arrow">
              {t('cta.all_projects')} <ArrowRight />
            </Link>
          </div>

          {loadingProjects ? (
            <p className="loading-line">{t('common.loading')}</p>
          ) : list.length ? (
            <div className="projects-grid">
              {list.map((project) => (
                <ProjectCard key={project.id} project={project} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="domains-mosaic">
              {DOMAIN_IMAGES.map((domain) => (
                <figure className="domain-tile reveal" key={domain.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={domain.src} alt={locale === 'en' ? domain.en : domain.fr} loading="lazy" />
                  <figcaption>{locale === 'en' ? domain.en : domain.fr}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------------- approche ---------------- */}
      <section className="approach" style={{ borderTop: '1px solid var(--line)', padding: 'clamp(4rem, 7vw, 6rem) 0' }}>
        <div className="shell">
          <div className="activities-head">
            <div>
              <span className="eyebrow">{t('home.approach.title')}</span>
              <h2 style={{ marginTop: '0.9rem' }}>{t('home.approach.heading')}</h2>
            </div>
            <p className="lead" style={{ maxWidth: '34ch' }}>
              {t('home.approach.subtitle')}
            </p>
          </div>
          <div className="approach-grid">
            {APPROACH.map((item, index) => (
              <div className="approach-item" key={item.key}>
                <span className="num">{String(index + 1).padStart(2, '0')}</span>
                <h3>{t(`${item.key}.title`)}</h3>
                <p>{t(`${item.key}.text`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- équipe ---------------- */}
      <section className="team-section" style={{ padding: 'clamp(4rem, 7vw, 6rem) 0', borderTop: '1px solid var(--line)' }}>
        <div className="shell">
          <div className="activities-head">
            <div>
              <span className="eyebrow">{t('home.team.title')}</span>
              <h2 style={{ marginTop: '0.9rem' }}>{t('home.team.heading')}</h2>
              <p className="lead" style={{ marginTop: '0.9rem', maxWidth: '44ch' }}>
                {t('home.team.subtitle')}
              </p>
            </div>
            <Link href={href(locale, '/equipe')} className="link-arrow">
              {t('home.team.link')} <ArrowRight />
            </Link>
          </div>

          {loadingTeam ? (
            <p className="loading-line">{t('common.loading')}</p>
          ) : teamPreview.length ? (
            <div className="team-grid">
              {teamPreview.map((member) => (
                <TeamCard key={member.id} member={member} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="empty-state">{t('team.empty')}</div>
          )}
        </div>
      </section>

      {/* ---------------- appel à l'action ---------------- */}
      <section className="cta-photo">
        <div className="shell cta-photo-inner">
          <div>
            <h2>{t('home.contact.title')}</h2>
            <p>{t('home.contact.subtitle')}</p>
          </div>
          <Link href={href(locale, '/contact')} className="btn btn-light">
            {t('cta.contact')} <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
