'use client';

import { useParams } from 'next/navigation';
import { TeamCard } from '@/components/cards';
import { useTeam } from '@/lib/data';
import { isLocale, translator } from '@/lib/i18n';

export default function TeamPage() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const t = translator(locale);
  const { data: team, loading } = useTeam();

  return (
    <>
      <section className="page-head">
        <div className="shell">
          <span className="eyebrow">{t('nav.team')}</span>
          <h1>{t('team.title')}</h1>
          <p className="lead">{t('team.lead')}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="shell">
          {loading ? (
            <p className="loading-line">{t('common.loading')}</p>
          ) : team.length ? (
            <div className="team-grid">
              {team.map((member) => (
                <TeamCard key={member.id} member={member} locale={locale} />
              ))}
            </div>
          ) : (
            <div className="empty-state">{t('team.empty')}</div>
          )}
        </div>
      </section>
    </>
  );
}
