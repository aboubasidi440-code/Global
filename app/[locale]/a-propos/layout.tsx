import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const english = locale === 'en';
  return {
    title: english ? 'About' : 'À propos',
    description: english
      ? 'Global Solutions: a Nigerien engineering, water and energy firm founded in Niamey in 2017.'
      : 'Global Solutions : cabinet nigérien d’ingénierie, d’hydraulique et d’énergie créé à Niamey en 2017.',
    alternates: {
      canonical: `/${locale}/a-propos`,
      languages: { fr: '/fr/a-propos', en: '/en/a-propos' },
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
