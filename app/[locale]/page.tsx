'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Icon, { ArrowRight } from '@/components/Icon';
import { ProjectCard, TeamCard } from '@/components/cards';
import { APPROACH, DOMAIN_IMAGES, EXPERTISE, SERVICES_BAND } from '@/lib/content';
import { usePublishedProjects, useSettings, useTeam } from '@/lib/data';
import { href, isLocale, translator } from '@/lib/i18n';
import { whatsappLink } from '@/lib/format';

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

type Contact = {
  phone_primary?: string;
  phone_secondary?: string;
  email_primary?: string;
  address?: string;
  postal?: string;
  whatsapp?: string;
};

export default function HomePage() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const t = translator(locale);

  const { data: settings } = useSettings();
  const homepage = (settings?.homepage ?? {}) as Homepage;
  const contact = (settings?.contact ?? {}) as Contact;
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
  const wa = whatsappLink(contact.whatsapp);

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="hero">
        <div className="hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-chantier.jpg" alt="" aria-hidden="true" />
        </div>
        <span className="hero-rail">{t('brand.name')} — {t('brand.tagline')}</span>

        <div className="hero-inner">
          <div className="hero-copy">
            <span className="eyebrow on-dark">{t('home.eyebrow', { year })}</span>
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
              <Link href={href(locale, '/projets')} className="btn">
                {t('cta.discover')} <ArrowRight />
              </Link>
              <Link href={href(locale, '/contact')} className="btn btn-outline-light">
                {t('cta.contact')}
              </Link>
            </div>
          </div>

          <aside className="hero-card">
            <h3>{t('home.card.title')}</h3>
            <dl>
              {contact.phone_primary ? (
                <div>
                  <dt>{t('contact.phone')}</dt>
                  <dd>
                    <a href={`tel:${contact.phone_primary.replace(/\s/g, '')}`}>{contact.phone_primary}</a>
                    {contact.phone_secondary ? (
                      <>
                        <br />
                        <a href={`tel:${contact.phone_secondary.replace(/\s/g, '')}`}>{contact.phone_secondary}</a>
                      </>
                    ) : null}
                  </dd>
                </div>
              ) : null}
              {contact.email_primary ? (
                <div>
                  <dt>{t('contact.email')}</dt>
                  <dd>
                    <a href={`mailto:${contact.email_primary}`}>{contact.email_primary}</a>
                  </dd>
                </div>
              ) : null}
              {contact.address ? (
                <div>
                  <dt>{t('contact.address')}</dt>
                  <dd>
                    {contact.address}
                    {contact.postal ? (
                      <>
                        <br />
                        {contact.postal}
                      </>
                    ) : null}
                  </dd>
                </div>
              ) : null}
            </dl>
            <div className="card-foot">
              <span>{homepage.location || 'Niamey, Niger'}</span>
              {wa ? (
                <a className="link-arrow" href={wa} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              ) : (
                <Link className="link-arrow" href={href(locale, '/contact')}>
                  {t('home.card.write')}
                </Link>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* ---------------- bandeau services ---------------- */}
      <div className="services-band">
        <div className="shell services-band-inner">
          <span className="services-label">{t('services.label')}</span>
          <div className="services-list">
            {SERVICES_BAND.map((service) => (
              <span key={service.fr}>{locale === 'en' ? service.en : service.fr}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- chiffres ---------------- */}
      <section className="stats">
        <div className="shell stats-grid">
          <div className="stat">
            <strong>{year}</strong>
            <span>{locale === 'en' ? 'founded in Niamey' : 'créée à Niamey'}</span>
          </div>
          <div className="stat">
            <strong>{homepage.team_size || '~10'}</strong>
            <span>{t('stats.team')}</span>
          </div>
          <div className="stat">
            <strong>
              {homepage.expertise_count || '6'}
              <em>.</em>
            </strong>
            <span>{t('stats.expertise')}</span>
          </div>
          <div className="stat">
            <strong>{homepage.location || 'Niger'}</strong>
            <span>{t('stats.location')}</span>
          </div>
        </div>
      </section>

      {/* ---------------- expertise ---------------- */}
      <section className="section expertise" id="expertises">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">{locale === 'en' ? 'Expertise' : 'Expertise'}</span>
            <h2>{t('home.expertise.title')}</h2>
            <p className="lead">{t('home.expertise.subtitle')}</p>
          </div>
          <div className="expertise-grid">
            {EXPERTISE.map((item, index) => (
              <article className="expertise-card" key={item.slug}>
                <span className="expertise-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="expertise-icon">
                  <Icon name={item.icon} size={22} />
                </span>
                <h3>{locale === 'en' ? item.titleEn : item.title}</h3>
                <p>{locale === 'en' ? item.textEn : item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- réalisations ---------------- */}
      <section className="section projects-section">
        <div className="shell">
          <div
            className="section-head"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 'none', gap: '2rem' }}
          >
            <div>
              <span className="eyebrow">{t('home.projects.title')}</span>
              <h2 style={{ marginTop: '0.7rem' }}>{t('home.projects.title')}</h2>
              <p className="lead" style={{ marginTop: '0.9rem' }}>
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
            <>
              <p className="lead" style={{ marginBottom: '1.6rem', maxWidth: '62ch' }}>
                {t('home.gallery.subtitle')}
              </p>
              <div className="domains-mosaic">
                {DOMAIN_IMAGES.map((domain) => (
                  <figure className="domain-tile" key={domain.src} style={{ margin: 0 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={domain.src} alt={locale === 'en' ? domain.en : domain.fr} loading="lazy" />
                    <figcaption>{locale === 'en' ? domain.en : domain.fr}</figcaption>
                  </figure>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ---------------- approche ---------------- */}
      <section className="section approach">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow on-dark">{t('home.approach.title')}</span>
            <h2>{t('home.approach.title')}</h2>
            <p className="lead">{t('home.approach.subtitle')}</p>
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
      <section className="section team-section">
        <div className="shell">
          <div
            className="section-head"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 'none', gap: '2rem' }}
          >
            <div>
              <span className="eyebrow">{t('home.team.title')}</span>
              <h2 style={{ marginTop: '0.7rem' }}>{t('home.team.title')}</h2>
              <p className="lead" style={{ marginTop: '0.9rem' }}>
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
        <div className="cta-photo-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/projet-batiment.jpg" alt="" aria-hidden="true" />
        </div>
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
