'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight } from '@/components/Icon';
import Icon from '@/components/Icon';
import { EXPERTISE_FULL } from '@/lib/content';
import { href, isLocale, translator } from '@/lib/i18n';

export default function ExpertisesPage() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const t = translator(locale);
  const en = locale === 'en';

  return (
    <>
      {/* bannière intérieure */}
      <section
        className="page-head page-head--banner"
        style={{ ['--banner-img' as string]: "url('/images/expertise-geniecivil.jpg')" }}
      >
        <div className="shell">
          <nav className="breadcrumb" aria-label="breadcrumb">
            <Link href={href(locale)}>{t('nav.home')}</Link>
            <span aria-hidden="true">›</span>
            <span>{t('nav.expertises')}</span>
          </nav>
          <span className="eyebrow">{t('nav.expertises')}</span>
          <h1>{t('home.expertise.title')}</h1>
          <p className="lead">{t('home.expertise.subtitle')}</p>
        </div>
      </section>

      {/* catalogue des domaines */}
      <section className="section-tight" style={{ background: 'var(--bg-soft)' }}>
        <div className="shell">
          <div className="expertise-grid expertise-grid--wide">
            {EXPERTISE_FULL.map((item, index) => (
              <article className="exp-card reveal" key={item.slug} id={item.slug}>
                <span className="exp-num">{String(index + 1).padStart(2, '0')}</span>
                <div className="exp-card-media" aria-hidden="true">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt="" loading="lazy" />
                </div>
                <div className="exp-body">
                  <span style={{ display: 'inline-flex', color: 'var(--orange)' }} aria-hidden="true">
                    <Icon name={item.icon} size={22} />
                  </span>
                  <h3>{en ? item.titleEn : item.title}</h3>
                  <p>{en ? item.textEn : item.text}</p>
                  <ul
                    style={{
                      margin: '0.2rem 0 0',
                      padding: 0,
                      listStyle: 'none',
                      display: 'grid',
                      gap: '0.25rem',
                      fontSize: '0.82rem',
                      color: 'rgba(255,255,255,0.75)',
                    }}
                  >
                    {(en ? item.servicesEn : item.services).map((service) => (
                      <li key={service} style={{ display: 'flex', gap: '0.45rem', alignItems: 'center' }}>
                        <span style={{ color: 'var(--orange)' }} aria-hidden="true">
                          —
                        </span>
                        {service}
                      </li>
                    ))}
                  </ul>
                  <Link href={href(locale, '/contact')} className="link-arrow">
                    {t('cta.quote')} <ArrowRight />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* appel à l'action */}
      <section className="cta-photo">
        <div className="cta-photo-media" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-chantier.jpg" alt="" loading="lazy" />
        </div>
        <div className="shell cta-photo-inner">
          <div>
            <h2>{t('home.cta.title')}</h2>
            <p>{t('home.contact.subtitle')}</p>
          </div>
          <Link href={href(locale, '/contact')} className="btn btn-primary">
            {t('cta.talk_project')} <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
