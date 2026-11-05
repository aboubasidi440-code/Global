'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowRight } from '@/components/Icon';
import { TeamCard } from '@/components/cards';
import { useTeam } from '@/lib/data';
import { href, isLocale } from '@/lib/i18n';

const COPY = {
  fr: {
    eyebrow: 'À propos',
    title: 'Un cabinet nigérien d’ingénierie, ancré sur le terrain.',
    lead:
      'Global Solutions conçoit, réalise et supervise des ouvrages de génie civil, d’hydraulique et d’énergie au Niger depuis 2017.',
    story1:
      'Global Solutions est née à Niamey d’un constat simple : les projets d’infrastructure réussissent lorsqu’ils sont pensés par des équipes qui connaissent le terrain, les matériaux disponibles et les contraintes d’exploitation locales.',
    story2:
      'Nous intervenons de l’étude de faisabilité à la réception des ouvrages : dimensionnement, dossiers d’exécution, conduite de chantier, contrôle qualité et accompagnement à la mise en service. Nos missions couvrent l’adduction d’eau potable, les forages, le bâtiment, la voirie et l’électrification solaire.',
    story3:
      'Notre taille est un choix. Une équipe resserrée permet un suivi direct par les associés, des décisions rapides et une présence réelle sur les chantiers — pas seulement sur les plans.',
    valuesTitle: 'Ce qui nous distingue',
    values: [
      {
        title: 'La connaissance du terrain',
        text: 'Sols, climat, logistique, disponibilité des matériaux : nos choix techniques sont validés sur site, pas seulement en bureau.',
      },
      {
        title: 'La rigueur des livrables',
        text: 'Notes de calcul, plans d’exécution, spécifications et rapports de suivi : chaque étape laisse une trace vérifiable.',
      },
      {
        title: 'Des ouvrages exploitables',
        text: 'Nous concevons pour l’exploitation et la maintenance locales, avec les équipes qui seront sur place après nous.',
      },
      {
        title: 'La transparence budgétaire',
        text: 'Quantitatifs détaillés, prix justifiés, avenants documentés : les arbitrages se font à découvert avec le maître d’ouvrage.',
      },
    ],
    factsLabels: ['à Niamey', 'collaborateurs', 'domaines d’expertise'],
    teamTitle: 'L’équipe',
    teamLink: 'Toutes les coordonnées',
    cta: 'Parlons de votre projet',
  },
  en: {
    eyebrow: 'About',
    title: 'A Nigerien engineering firm, rooted in the field.',
    lead:
      'Since 2017 Global Solutions has designed, built and supervised civil engineering, water and energy infrastructure in Niger.',
    story1:
      'Global Solutions was founded in Niamey on a simple observation: infrastructure projects succeed when they are designed by teams who know the ground, the available materials and the local operating constraints.',
    story2:
      'We work from feasibility study to handover: sizing, execution drawings, site management, quality control and commissioning support. Our assignments cover drinking water supply, boreholes, buildings, roads and solar electrification.',
    story3:
      'Our size is a deliberate choice. A compact team means direct oversight by the partners, fast decisions and a real presence on site — not only on drawings.',
    valuesTitle: 'What sets us apart',
    values: [
      {
        title: 'Field knowledge',
        text: 'Soils, climate, logistics, material availability: our technical choices are validated on site, not only at a desk.',
      },
      {
        title: 'Rigorous deliverables',
        text: 'Design notes, execution drawings, specifications and supervision reports: every step leaves a verifiable record.',
      },
      {
        title: 'Infrastructure that lasts',
        text: 'We design for local operation and maintenance, with the teams who will stay on site after us.',
      },
      {
        title: 'Budget transparency',
        text: 'Detailed quantities, justified rates, documented variations: trade-offs are made openly with the client.',
      },
    ],
    factsLabels: ['in Niamey', 'team members', 'areas of expertise'],
    teamTitle: 'The team',
    teamLink: 'All contact details',
    cta: 'Let’s talk about your project',
  },
} as const;

export default function AboutPage() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const copy = COPY[locale];
  const { data: team, loading } = useTeam();

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <span className="eyebrow">{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p className="lead">{copy.lead}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell split">
          <div className="story reveal">
            <p>{copy.story1}</p>
            <p>{copy.story2}</p>
            <p>{copy.story3}</p>
          </div>
          <div className="split-media reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-clair.jpg" alt={locale === 'en' ? 'Our engineers on site' : 'Nos ingénieurs sur le chantier'} />
          </div>
        </div>

        <div className="shell" style={{ marginTop: 'clamp(2.5rem, 4vw, 4rem)' }}>
          <div className="facts">
            <div>
              <strong>2017</strong>
              <span>{copy.factsLabels[0]}</span>
            </div>
            <div>
              <strong>~10</strong>
              <span>{copy.factsLabels[1]}</span>
            </div>
            <div>
              <strong>6</strong>
              <span>{copy.factsLabels[2]}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg-soft)' }}>
        <div className="shell">
          <div className="activities-head">
            <div>
              <span className="eyebrow">{copy.valuesTitle}</span>
              <h2 style={{ marginTop: '0.8rem', maxWidth: '26ch' }}>{copy.valuesTitle}</h2>
            </div>
          </div>
          <div className="editorial-list">
            {copy.values.map((value, index) => (
              <div key={value.title}>
                <span className="index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="activities-head">
            <div>
              <span className="eyebrow">{copy.teamTitle}</span>
              <h2 style={{ marginTop: '0.8rem' }}>{copy.teamTitle}</h2>
            </div>
            <Link href={href(locale, '/contact')} className="link-arrow">
              {copy.teamLink} <ArrowRight />
            </Link>
          </div>

          {loading ? (
            <p className="loading-line">…</p>
          ) : (
            <div className="team-grid">
              {team.map((member) => (
                <TeamCard key={member.id} member={member} locale={locale} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="cta-photo">
        <div className="shell cta-photo-inner">
          <div>
            <h2>{copy.cta}</h2>
            <p>{locale === 'en' ? 'Tell us what you need — we reply within two business days.' : 'Décrivez-nous votre besoin — nous répondons sous deux jours ouvrés.'}</p>
          </div>
          <Link href={href(locale, '/contact')} className="btn btn-light">
            {locale === 'en' ? 'Get in touch' : 'Nous contacter'} <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}
