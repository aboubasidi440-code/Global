import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const english = locale === 'en';
  return {
    title: english ? 'Projects' : 'Projets',
    description: english ? 'Global Solutions projects in civil engineering, water and energy in Niger.' : 'Réalisations de Global Solutions en génie civil, hydraulique et énergie au Niger.',
    alternates: {
      canonical: `/${locale}/projets`,
      languages: { fr: `/fr/projets`, en: `/en/projets` },
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
