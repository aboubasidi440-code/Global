'use client';

import { useParams } from 'next/navigation';
import CollectionState from '@/components/CollectionState';
import { TeamCard } from '@/components/cards';
import { useTeam } from '@/lib/data';
import { isLocale, translator } from '@/lib/i18n';

export default function TeamPage() {
  const params = useParams<{ locale: string }>();
  const locale = isLocale(params?.locale) ? params.locale : 'fr';
  const t = translator(locale);
  const { data: team, loading, error, reload } = useTeam();

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
          <CollectionState
            locale={locale}
            loading={loading}
            error={error}
            onRetry={reload}
            empty={!team.length}
            emptyMessage={t('team.empty')}
          >
            <div className="team-grid">
              {team.map((member) => (
                <TeamCard key={member.id} member={member} locale={locale} />
              ))}
            </div>
          </CollectionState>
        </div>
      </section>
    </>
  );
}
