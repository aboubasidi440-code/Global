'use client';

import { useEffect } from 'react';
import type { Locale } from '@/lib/i18n';

/** Aligne l'attribut lang du document sur la langue de l'URL. */
export default function LocaleLang({ locale }: { locale: Locale }) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
