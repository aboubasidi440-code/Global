import { notFound } from 'next/navigation';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import LocaleLang from '@/components/LocaleLang';
import { LOCALES, isLocale } from '@/lib/i18n';

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <LocaleLang locale={locale} />
      <SiteHeader locale={locale} />
      <main id="contenu">{children}</main>
      <SiteFooter locale={locale} />
    </>
  );
}
