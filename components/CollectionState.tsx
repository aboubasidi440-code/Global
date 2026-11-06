import type { ReactNode } from 'react';
import { translator, type Locale } from '@/lib/i18n';

type Props = {
  locale: Locale;
  loading: boolean;
  error?: string | null;
  empty?: boolean;
  emptyMessage?: string;
  onRetry?: () => void;
  children: ReactNode;
};

/** États homogènes (chargement, erreur, vide) pour les listes de contenu public. */
export default function CollectionState({
  locale,
  loading,
  error,
  empty,
  emptyMessage,
  onRetry,
  children,
}: Props) {
  const t = translator(locale);

  if (loading) {
    return (
      <div className="skeleton-grid" role="status" aria-label={t('common.loading')}>
        {[0, 1, 2].map((item) => (
          <div className="skeleton-card" key={item} aria-hidden="true">
            <span className="skeleton-media" />
            <span className="skeleton-line" />
            <span className="skeleton-line short" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state" role="alert">
        <p>{t('common.error')}</p>
        {onRetry ? (
          <button type="button" className="btn btn-ghost btn-sm" onClick={onRetry}>
            {t('common.retry')}
          </button>
        ) : null}
      </div>
    );
  }

  if (empty) return <div className="empty-state">{emptyMessage ?? t('common.error')}</div>;

  return <>{children}</>;
}
