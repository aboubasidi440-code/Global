import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const english = locale === 'en';
  return {
    title: english ? 'Our expertise' : 'Nos expertises',
    description: english
      ? 'The 14 areas of expertise of Global Solutions: building, civil engineering, water, solar energy and more in Niger.'
      : 'Les 14 domaines d’expertise de Global Solutions : bâtiment, génie civil, hydraulique, énergie solaire et plus, au Niger.',
    alternates: {
      canonical: `/${locale}/expertises`,
      languages: { fr: `/fr/expertises`, en: `/en/expertises` },
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
