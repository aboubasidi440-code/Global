'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CollectionState from '@/components/CollectionState';
import Icon, { ArrowRight } from '@/components/Icon';
import { ProjectCard, TeamCard } from '@/components/cards';
import { APPROACH, DOMAIN_IMAGES, EXPERTISE } from '@/lib/content';
import { usePublishedProjects, useSettings, useTeam } from '@/lib/data';
import { href, isLocale, translator } from '@/lib/i18n';
import heroImage from '@/public/images/hero-chantier.jpg';
import fieldImage from '@/public/images/hero-clair.jpg';

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

export default function HomePage() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const t = translator(locale);

  const { data: settings } = useSettings();
  const homepage = (settings?.homepage ?? {}) as Homepage;
  const {
    data: projects,
    loading: loadingProjects,
    error: projectsError,
    reload: reloadProjects,
  } = usePublishedProjects();
  const { data: team, loading: loadingTeam, error: teamError, reload: reloadTeam } = useTeam();

  const text = (field: keyof Homepage, fallback: string) => {
    const localized = locale === 'en' ? homepage[`${field}_en` as keyof Homepage] : undefined;
    const base = homepage[field];
    return (
      (typeof localized === 'string' && localized.trim()) ||
      (typeof base === 'string' && base.trim()) ||
      fallback
    );
  };

  const year = homepage.year || '2017';
  const featured = projects.filter((project) => project.featured);
  const list = (featured.length ? featured : projects).slice(0, 3);
  const teamPreview = team.slice(0, 4);
  const showTeam = loadingTeam || teamPreview.length > 0 || Boolean(teamError);

  return (
    <>
      <section className="hero">
        <div className="shell hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">{t('home.eyebrow', { year })}</span>
            <h1>
              <span className="line">{text('headline_first', 'Construire aujourd’hui.')}</span>
              <span className="highlight">{text('headline_second', 'Servir demain.')}</span>
            </h1>
            <p className="lead">
              {text(
                'subtitle',
                'À vos côtés pour concevoir et réaliser des projets durables en génie civil, hydraulique et énergie.',
              )}
            </p>
            <div className="hero-actions">
              <Link href={href(locale, '/projets')} className="btn btn-primary">
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

          <figure className="hero-media">
            <Image
              src={heroImage}
              alt={t('home.feature.caption_title')}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              className="hero-photo"
            />
            <span className="hero-badge">{t('home.meta.2')}</span>
            <figcaption className="hero-caption">
              <strong>{t('home.feature.caption_title')}</strong>
              <span>{t('home.feature.caption_text')}</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="stats" aria-label={locale === 'en' ? 'Key figures' : 'Chiffres clés'}>
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

      <section className="activities section" id="expertises">
        <div className="shell">
          <div className="activities-head">
            <div className="section-intro">
              <span className="eyebrow">{t('home.activities.label')}</span>
              <h2>{t('home.expertise.title')}</h2>
            </div>
            <p className="lead">{t('home.expertise.subtitle')}</p>
          </div>

          <div className="activities-grid">
            {EXPERTISE.map((item, index) => (
              <Link
                href={href(locale, `/contact?service=${item.slug}`)}
                className="activity"
                key={item.slug}
              >
                <div className="activity-top">
                  <span className="activity-icon">
                    <Icon name={item.icon} size={24} />
                  </span>
                  <span className="index">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3>{locale === 'en' ? item.titleEn : item.title}</h3>
                <p>{locale === 'en' ? item.textEn : item.text}</p>
                <span className="link-arrow">
                  {t('home.expertise.cta')} <ArrowRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="projects-section section">
        <div className="shell">
          <div className="activities-head">
            <div className="section-intro">
              <span className="eyebrow">{t('home.projects.label')}</span>
              <h2>{list.length || loadingProjects ? t('home.projects.title') : t('home.gallery.title')}</h2>
              <p className="lead">
                {list.length || loadingProjects ? t('home.projects.subtitle') : t('home.gallery.subtitle')}
              </p>
            </div>
            <Link href={href(locale, '/projets')} className="link-arrow">
              {t('cta.all_projects')} <ArrowRight />
            </Link>
          </div>

          <CollectionState
            locale={locale}
            loading={loadingProjects}
            error={projectsError}
            onRetry={reloadProjects}
          >
            {list.length ? (
              <div className="projects-grid">
                {list.map((project) => (
                  <ProjectCard key={project.id} project={project} locale={locale} />
                ))}
              </div>
            ) : (
              <div className="domains-mosaic">
                {DOMAIN_IMAGES.map((domain) => (
                  <figure className="domain-tile" key={domain.src}>
                    <Image
                      src={domain.src}
                      alt={locale === 'en' ? domain.en : domain.fr}
                      width={800}
                      height={600}
                      sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                    <figcaption>{locale === 'en' ? domain.en : domain.fr}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </CollectionState>
        </div>
      </section>

      <section className="approach section">
        <div className="shell approach-layout">
          <div className="approach-intro">
            <span className="eyebrow on-dark">{t('home.approach.title')}</span>
            <h2>{t('home.approach.heading')}</h2>
            <p className="lead">{t('home.approach.subtitle')}</p>
            <figure className="approach-photo">
              <Image
                src={fieldImage}
                alt={t('home.approach.image')}
                fill
                sizes="(max-width: 900px) 100vw, 40vw"
                loading="lazy"
              />
            </figure>
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

      {showTeam ? (
        <section className="team-section section">
          <div className="shell">
            <div className="activities-head">
              <div className="section-intro">
                <span className="eyebrow">{t('home.team.title')}</span>
                <h2>{t('home.team.heading')}</h2>
              </div>
              <Link href={href(locale, '/equipe')} className="link-arrow">
                {t('home.team.link')} <ArrowRight />
              </Link>
            </div>

            <CollectionState locale={locale} loading={loadingTeam} error={teamError} onRetry={reloadTeam}>
              <div className="team-grid">
                {teamPreview.map((member) => (
                  <TeamCard key={member.id} member={member} locale={locale} />
                ))}
              </div>
            </CollectionState>
          </div>
        </section>
      ) : null}

      <section className="cta-photo">
        <div className="shell cta-photo-inner">
          <div>
            <span className="eyebrow on-dark">{t('nav.contact')}</span>
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
