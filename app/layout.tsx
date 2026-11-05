import type { Metadata } from 'next';
import '@fontsource-variable/inter';
import '@fontsource-variable/manrope';
import './globals.css';
import './site.css';

export const metadata: Metadata = {
  title: {
    default: 'Global Solutions — Génie civil, hydraulique et énergie au Niger',
    template: '%s · Global Solutions',
  },
  description:
    'Global Solutions conçoit et réalise des projets de génie civil, d’hydraulique et d’énergie au Niger. Études, travaux et maîtrise d’œuvre depuis 2017.',
  metadataBase: new URL('https://globalsolutions.one'),
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/favicon.ico', sizes: 'any' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    title: 'Global Solutions — Génie civil, hydraulique et énergie',
    description:
      'Construire aujourd’hui. Servir demain. Projets durables en génie civil, hydraulique et énergie au Niger.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
