import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const english = locale === 'en';
  return {
    title: english ? 'Documents' : 'Documents',
    description: english ? 'Brochures and technical documents from Global Solutions.' : 'Brochures et documents techniques de Global Solutions.',
    alternates: {
      canonical: `/${locale}/documents`,
      languages: { fr: `/fr/documents`, en: `/en/documents` },
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
