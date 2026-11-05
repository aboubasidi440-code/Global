import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const english = locale === 'en';
  return {
    title: english ? 'Team' : 'Équipe',
    description: english ? 'Global Solutions leadership and managers in Niamey.' : 'La direction et les responsables de Global Solutions à Niamey.',
    alternates: {
      canonical: `/${locale}/equipe`,
      languages: { fr: `/fr/equipe`, en: `/en/equipe` },
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
