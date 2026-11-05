import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const english = locale === 'en';
  return {
    title: english ? 'News' : 'Actualités',
    description: english ? 'Sites, studies and news from Global Solutions.' : "Chantiers, études et vie de l'entreprise Global Solutions.",
    alternates: {
      canonical: `/${locale}/actualites`,
      languages: { fr: `/fr/actualites`, en: `/en/actualites` },
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
