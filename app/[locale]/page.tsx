'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Icon, { ArrowRight } from '@/components/Icon';
import { ProjectCard } from '@/components/cards';
import { EXPERTISE } from '@/lib/content';
import { useArticles, usePublishedProjects, useSettings } from '@/lib/data';
import { href, isLocale, translator } from '@/lib/i18n';

type Homepage = {
  year?: string;
  team_size?: string;
  expertise_count?: string;
  headline_first?: string;
  headline_first_en?: string;
  subtitle?: string;
  subtitle_en?: string;
};

const COPY = {
  fr: {
    tag: 'BTP · Hydraulique · Énergie — Niger',
    title: ['Construire aujourd’hui.', 'Bâtir le Niger de demain.'],
    text:
      'Depuis 2017, Global Solutions accompagne les institutions, les entreprises et les particuliers dans la réalisation de leurs projets de bâtiment, de travaux publics, d’hydraulique et d’énergie à travers tout le Niger.',
    quote: 'Demander un devis',
    projects: 'Nos réalisations',
    aside: [
      { value: '2017', label: 'Création à Niamey' },
      { value: '10', label: 'Collaborateurs' },
      { value: '6', label: 'Domaines d’expertise' },
    ],
    pillars: [
      {
        icon: 'site' as const,
        title: 'Équipe expérimentée',
        text: 'Des ingénieurs, techniciens et ouvriers qualifiés, mobilisés du premier relevé à la réception des travaux.',
      },
      {
        icon: 'drill' as const,
        title: 'Matériel adapté',
        text: 'Un parc d’équipements entretenu pour tenir les cadences, y compris sur les terrains les plus difficiles.',
      },
      {
        icon: 'compass' as const,
        title: 'Méthodes rigoureuses',
        text: 'Planification, contrôle qualité et sécurité sur chaque chantier, sans exception.',
      },
    ],
    aboutLabel: 'Qui sommes-nous',
    aboutTitle: 'Une référence du BTP au Niger',
    aboutP1:
      'Créée en 2017 à Niamey, Global Solutions est une entreprise nigérienne spécialisée dans le bâtiment, les travaux publics, les ouvrages hydrauliques et les solutions énergétiques.',
    aboutP2:
      'Nous intervenons pour des institutions, des collectivités, des organisations de développement et des entreprises privées, avec une même exigence : des ouvrages conformes, livrés dans les délais, et des équipes présentes sur le terrain.',
    aboutPoints: [
      { icon: 'compass' as const, title: 'Expertise', text: 'Études, exécution et maîtrise d’œuvre réunies sous un même toit.' },
      { icon: 'building' as const, title: 'Fiabilité', text: 'Des ouvrages livrés conformes aux normes, dans les délais annoncés.' },
    ],
    aboutCta: 'En savoir plus sur nous',
    bandTitle: 'Construisons ensemble vos futurs projets.',
    bandText: 'Un partenaire fiable pour vos projets publics, privés et industriels.',
    bandCta: 'Nous contacter',
    expLabel: 'Nos domaines d’expertise',
    expTitle: 'Construire. Aménager. Réaliser.',
    expText:
      'Six expertises complémentaires, mobilisées ensemble sur chaque projet — de l’étude de faisabilité à la réception des ouvrages.',
    chips: [
      'Bâtiment',
      'Génie civil',
      'Travaux publics',
      'Hydraulique',
      'Forages',
      'Énergie solaire',
      'Voirie & assainissement',
      'Études & suivi',
    ],
    whyLabel: 'Pourquoi nous choisir',
    whyTitle: 'Ce qui fait la différence sur le terrain',
    whyText:
      'La même exigence s’applique à un forage villageois, à un bâtiment administratif ou à une centrale solaire : des moyens propres, un planning tenu et des ouvrages qui durent.',
    why: [
      { title: 'Expertise reconnue', text: 'Une équipe pluridisciplinaire capable de porter un projet de l’étude à la livraison.' },
      { title: 'Respect des délais', text: 'Un planning tenu grâce à des moyens propres et une logistique maîtrisée.' },
      { title: 'Qualité garantie', text: 'Des matériaux sélectionnés et un contrôle qualité à chaque étape du chantier.' },
      { title: 'Sécurité des chantiers', text: 'Des chantiers encadrés, des équipes formées et des règles appliquées partout.' },
    ],
    galleryLabel: 'Nos chantiers',
    galleryTitle: 'Des réalisations à la hauteur de nos ambitions',
    galleryCta: 'Voir tous les projets',
    projectsLabel: 'Réalisations récentes',
    projectsTitle: 'Des ouvrages conçus pour durer',
    projectsText:
      'Quelques projets conduits pour des institutions, des collectivités et des entreprises. Les fiches détaillées seront publiées prochainement.',
    partnersLabel: 'Ils nous font confiance',
    partnersTitle: 'Des clients exigeants, des ouvrages durables',
    partnersText:
      'Institutions publiques, collectivités, organisations de développement et entreprises privées nous confient leurs projets.',
    partnerTypes: ['Ministères & agences', 'Collectivités', 'ONG & bailleurs', 'Entreprises privées', 'Particuliers'],
    newsLabel: 'Actualités',
    newsTitle: 'Dernières actualités & articles',
    newsCta: 'Toutes les actualités',
    finalTitle: 'Un projet à étudier, un chantier à conduire ?',
    finalText:
      'Décrivez-nous votre besoin : nous revenons vers vous avec une première lecture technique et un budget indicatif.',
  },
  en: {
    tag: 'Construction · Water · Energy — Niger',
    title: ['Building today.', 'Shaping tomorrow’s Niger.'],
    text:
      'Since 2017, Global Solutions has supported institutions, companies and individuals in delivering building, public works, water and energy projects across Niger.',
    quote: 'Request a quote',
    projects: 'Our work',
    aside: [
      { value: '2017', label: 'Founded in Niamey' },
      { value: '10', label: 'Team members' },
      { value: '6', label: 'Areas of expertise' },
    ],
    pillars: [
      {
        icon: 'site' as const,
        title: 'Experienced team',
        text: 'Qualified engineers, technicians and site workers, involved from first survey to handover.',
      },
      {
        icon: 'drill' as const,
        title: 'Right equipment',
        text: 'A maintained equipment fleet that keeps pace, even on the toughest ground.',
      },
      {
        icon: 'compass' as const,
        title: 'Rigorous methods',
        text: 'Planning, quality control and safety on every single site, without exception.',
      },
    ],
    aboutLabel: 'Who we are',
    aboutTitle: 'A construction reference in Niger',
    aboutP1:
      'Founded in Niamey in 2017, Global Solutions is a Nigerian company specialising in buildings, public works, water infrastructure and energy solutions.',
    aboutP2:
      'We work for institutions, local authorities, development organisations and private companies, with the same standard: compliant structures, delivered on time, and teams present on site.',
    aboutPoints: [
      { icon: 'compass' as const, title: 'Expertise', text: 'Design, execution and construction management under one roof.' },
      { icon: 'building' as const, title: 'Reliability', text: 'Structures delivered to standard, within the agreed schedule.' },
    ],
    aboutCta: 'More about us',
    bandTitle: 'Let’s build your next project together.',
    bandText: 'A reliable partner for public, private and industrial projects.',
    bandCta: 'Contact us',
    expLabel: 'Our areas of expertise',
    expTitle: 'Build. Develop. Deliver.',
    expText:
      'Six complementary disciplines, combined on every project — from feasibility study to handover.',
    chips: [
      'Buildings',
      'Civil engineering',
      'Public works',
      'Water supply',
      'Boreholes',
      'Solar energy',
      'Roads & drainage',
      'Design & supervision',
    ],
    whyLabel: 'Why choose us',
    whyTitle: 'What makes the difference on site',
    whyText:
      'The same standard applies to a village borehole, a public building or a solar plant: our own equipment, a schedule that holds and structures that last.',
    why: [
      { title: 'Proven expertise', text: 'A multidisciplinary team able to carry a project from study to delivery.' },
      { title: 'On-time delivery', text: 'Schedules held thanks to our own equipment and controlled logistics.' },
      { title: 'Guaranteed quality', text: 'Selected materials and quality control at every stage of the works.' },
      { title: 'Site safety', text: 'Supervised sites, trained teams and rules applied everywhere.' },
    ],
    galleryLabel: 'Our sites',
    galleryTitle: 'Work that matches our ambitions',
    galleryCta: 'See all projects',
    projectsLabel: 'Recent work',
    projectsTitle: 'Structures built to last',
    projectsText:
      'Projects delivered for institutions, local authorities and businesses. Detailed case studies will be published shortly.',
    partnersLabel: 'Trusted by',
    partnersTitle: 'Demanding clients, lasting structures',
    partnersText:
      'Public institutions, local authorities, development organisations and private companies trust us with their projects.',
    partnerTypes: ['Ministries & agencies', 'Local authorities', 'NGOs & donors', 'Private companies', 'Individuals'],
    newsLabel: 'News',
    newsTitle: 'Latest news & articles',
    newsCta: 'All news',
    finalTitle: 'A project to study, a site to deliver?',
    finalText: 'Tell us what you need: we come back with a first technical reading and an indicative budget.',
  },
};

const EXPERTISE_IMAGES: Record<string, string> = {
  etudes: '/images/equipe-chantier.jpg',
  'genie-civil': '/images/projet-batiment.jpg',
  hydraulique: '/images/chateau-eau.jpg',
  hydrogeologie: '/images/chantier-forage.jpg',
  energie: '/images/projet-solaire.jpg',
  suivi: '/images/chantier-voirie.jpg',
};

const GALLERY = [
  { src: '/images/hero-chantier.jpg', alt: { fr: 'Chantier de bâtiment à Niamey', en: 'Building site in Niamey' } },
  { src: '/images/projet-batiment.jpg', alt: { fr: 'Immeuble en construction', en: 'Building under construction' } },
  { src: '/images/chateau-eau.jpg', alt: { fr: 'Château d’eau en béton armé', en: 'Reinforced concrete water tower' } },
  { src: '/images/chantier-forage.jpg', alt: { fr: 'Forage d’eau', en: 'Water borehole' } },
  { src: '/images/projet-solaire.jpg', alt: { fr: 'Centrale solaire', en: 'Solar plant' } },
  { src: '/images/chantier-voirie.jpg', alt: { fr: 'Travaux de voirie', en: 'Road works' } },
  { src: '/images/projet-hydraulique.jpg', alt: { fr: 'Ouvrage hydraulique', en: 'Water infrastructure' } },
  { src: '/images/equipe-chantier.jpg', alt: { fr: 'Équipe sur chantier', en: 'Team on site' } },
];

const PARTNER_ICONS = ['building', 'site', 'water', 'solar', 'drill'] as const;

export default function HomePage() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const t = translator(locale);
  const c = COPY[locale];

  const { data: settings } = useSettings();
  const homepage = (settings?.homepage ?? {}) as Homepage;
  const { data: projects, loading: loadingProjects } = usePublishedProjects(3);
  const { data: articles } = useArticles(3);

  const heroTitle = [
    locale === 'en' ? homepage.headline_first_en || homepage.headline_first : homepage.headline_first,
    null,
  ];
  const year = homepage.year || c.aside[0].value;
  const aside = [{ ...c.aside[0], value: year }, ...c.aside.slice(1)];
  const featured = projects.filter((project) => project.featured).slice(0, 3);
  const list = (featured.length ? featured : projects).slice(0, 3);

  return (
    <>
      {/* ---------------- hero ---------------- */}
      <section className="hero">
        <div className="hero-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero-chantier.jpg" alt="" />
        </div>

        <div className="hero-inner">
          <div>
            <span className="hero-tag">{c.tag}</span>
            <h1>
              {heroTitle[0] || c.title[0]}
              <span>{c.title[1]}</span>
            </h1>
            <p className="hero-text">{homepage.subtitle || c.text}</p>
            <div className="hero-actions">
              <Link href={href(locale, '/contact')} className="btn btn-accent">
                {c.quote} <ArrowRight />
              </Link>
              <Link href={href(locale, '/projets')} className="btn btn-outline-light">
                {c.projects}
              </Link>
            </div>
          </div>

          <div className="hero-aside">
            {aside.map((item) => (
              <div className="hero-aside-item" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- piliers ---------------- */}
      <section className="pillars">
        <div className="shell">
          <div className="pillars-grid">
            {c.pillars.map((pillar) => (
              <article className="pillar" key={pillar.title}>
                <span className="pillar-icon">
                  <Icon name={pillar.icon} size={22} />
                </span>
                <h3>{pillar.title}</h3>
                <p>{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- à propos ---------------- */}
      <section className="section-block">
        <div className="shell about-grid">
          <div className="about-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/equipe-chantier.jpg" alt={c.aboutTitle} loading="lazy" />
            <div className="about-badge">
              <strong>{year}</strong>
              <span>{locale === 'en' ? 'Building in Niger since' : 'Au Niger depuis'}</span>
            </div>
          </div>

          <div className="about-copy">
            <span className="eyebrow">{c.aboutLabel}</span>
            <h2>{c.aboutTitle}</h2>
            <p>{c.aboutP1}</p>
            <p>{c.aboutP2}</p>

            <div className="about-points">
              {c.aboutPoints.map((point) => (
                <div className="about-point" key={point.title}>
                  <span className="dot">
                    <Icon name={point.icon} size={18} />
                  </span>
                  <div>
                    <strong>{point.title}</strong>
                    <span>{point.text}</span>
                  </div>
                </div>
              ))}
            </div>

            <Link href={href(locale, '/a-propos')} className="link-arrow">
              {c.aboutCta} <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------------- bandeau ---------------- */}
      <section className="cta-band">
        <div className="shell cta-band-inner">
          <div>
            <h2>{c.bandTitle}</h2>
            <p>{c.bandText}</p>
          </div>
          <Link href={href(locale, '/contact')} className="btn">
            {c.bandCta} <ArrowRight />
          </Link>
        </div>
      </section>

      {/* ---------------- expertises ---------------- */}
      <section className="section-block section-block--soft">
        <div className="shell">
          <div className="section-head">
            <span className="eyebrow">{c.expLabel}</span>
            <h2>{c.expTitle}</h2>
            <p>{c.expText}</p>
          </div>

          <div className="expertise-chips">
            {c.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>

          <div className="expertise-grid">
            {EXPERTISE.map((item, index) => (
              <article className="exp-card reveal" key={item.slug}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={EXPERTISE_IMAGES[item.slug] ?? '/images/hero-chantier.jpg'}
                  alt={locale === 'en' ? item.titleEn : item.title}
                  loading="lazy"
                />
                <span className="exp-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="exp-body">
                  <h3>{locale === 'en' ? item.titleEn : item.title}</h3>
                  <p>{locale === 'en' ? item.textEn : item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- compteurs ---------------- */}
      <section className="counters">
        <div className="shell counters-grid">
          <div className="counter">
            <strong>{year}</strong>
            <span>{locale === 'en' ? 'Founded in Niamey' : 'Créée à Niamey'}</span>
          </div>
          <div className="counter">
            <strong>{homepage.team_size || '10'}</strong>
            <span>{t('stats.team')}</span>
          </div>
          <div className="counter">
            <strong>{homepage.expertise_count || '6'}</strong>
            <span>{t('stats.expertise')}</span>
          </div>
          <div className="counter">
            <strong>
              Niger<em>.</em>
            </strong>
            <span>{locale === 'en' ? 'Nationwide coverage' : 'Couverture nationale'}</span>
          </div>
        </div>
      </section>

      {/* ---------------- pourquoi nous ---------------- */}
      <section className="section-block">
        <div className="shell why-grid">
          <div className="why-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/chateau-eau.jpg" alt={c.whyTitle} loading="lazy" />
          </div>

          <div>
            <span className="eyebrow">{c.whyLabel}</span>
            <h2 style={{ marginTop: '0.9rem', fontSize: 'clamp(1.7rem, 3.1vw, 2.5rem)', letterSpacing: '-0.035em' }}>
              {c.whyTitle}
            </h2>
            <p style={{ marginTop: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.7 }}>{c.whyText}</p>

            <div className="why-list">
              {c.why.map((item) => (
                <div className="why-item" key={item.title}>
                  <span className="tick">
                    <Icon name="site" size={16} />
                  </span>
                  <div>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- galerie ---------------- */}
      <section className="section-block section-block--soft">
        <div className="shell">
          <div className="section-head section-head--row">
            <div>
              <span className="eyebrow">{c.galleryLabel}</span>
              <h2>{c.galleryTitle}</h2>
            </div>
            <Link href={href(locale, '/projets')} className="link-arrow">
              {c.galleryCta} <ArrowRight />
            </Link>
          </div>

          <div className="gallery-grid">
            {GALLERY.map((image) => (
              <figure key={image.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image.src} alt={image.alt[locale]} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- réalisations ---------------- */}
      <section className="section-block">
        <div className="shell">
          <div className="section-head section-head--row">
            <div>
              <span className="eyebrow">{c.projectsLabel}</span>
              <h2>{c.projectsTitle}</h2>
              <p>{c.projectsText}</p>
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
            <div className="projects-grid">
              {[
                { src: '/images/projet-batiment.jpg', fr: 'Bâtiment administratif', en: 'Public building' },
                { src: '/images/projet-hydraulique.jpg', fr: 'Ouvrage hydraulique', en: 'Water infrastructure' },
                { src: '/images/projet-solaire.jpg', fr: 'Centrale solaire', en: 'Solar plant' },
              ].map((tile) => (
                <article className="project-card reveal" key={tile.src}>
                  <div className="project-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tile.src} alt={locale === 'en' ? tile.en : tile.fr} loading="lazy" />
                  </div>
                  <div className="project-body">
                    <div className="project-meta">
                      <span>{locale === 'en' ? 'Niger' : 'Niger'}</span>
                      <span>{locale === 'en' ? 'Case study soon' : 'Fiche à venir'}</span>
                    </div>
                    <h3>{locale === 'en' ? tile.en : tile.fr}</h3>
                    <p>
                      {locale === 'en'
                        ? 'Illustration of our trades — detailed case study coming soon.'
                        : 'Illustration de nos métiers — la fiche détaillée arrive prochainement.'}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------------- confiance ---------------- */}
      <section className="section-block" style={{ paddingTop: 0 }}>
        <div className="shell">
          <div className="section-head section-head--row">
            <div>
              <span className="eyebrow">{c.partnersLabel}</span>
              <h2>{c.partnersTitle}</h2>
              <p>{c.partnersText}</p>
            </div>
          </div>

          <div className="partners-grid">
            {c.partnerTypes.map((type, index) => (
              <div className="partner-tile" key={type}>
                <Icon name={PARTNER_ICONS[index] ?? 'site'} size={24} />
                {type}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- actualités ---------------- */}
      {articles.length ? (
        <section className="section-block section-block--soft">
          <div className="shell">
            <div className="section-head section-head--row">
              <div>
                <span className="eyebrow">{c.newsLabel}</span>
                <h2>{c.newsTitle}</h2>
              </div>
              <Link href={href(locale, '/actualites')} className="link-arrow">
                {c.newsCta} <ArrowRight />
              </Link>
            </div>

            <div className="news-grid">
              {articles.slice(0, 3).map((article) => (
                <Link href={href(locale, `/actualites/${article.id}`)} className="news-card" key={article.id}>
                  <h3>{locale === 'en' ? article.title_en || article.title : article.title}</h3>
                  <time>{article.created_at?.slice(0, 10)}</time>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ---------------- appel final ---------------- */}
      <section className="final-cta">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/chantier-voirie.jpg" alt="" loading="lazy" />
        <div className="shell final-cta-inner">
          <div>
            <h2>{c.finalTitle}</h2>
            <p>{c.finalText}</p>
          </div>
          <Link href={href(locale, '/contact')} className="btn btn-accent">
            {c.quote} <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
