import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const english = locale === 'en';
  return {
    title: english ? 'Contact' : 'Contact',
    description: english ? 'Get in touch with Global Solutions — Niamey, Niger.' : 'Écrivez à Global Solutions : Niamey, Niger.',
    alternates: {
      canonical: `/${locale}/contact`,
      languages: { fr: `/fr/contact`, en: `/en/contact` },
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
