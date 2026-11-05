import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Global Solutions — Génie civil, hydraulique et énergie au Niger',
    template: '%s · Global Solutions',
  },
  description:
    'Global Solutions conçoit et réalise des projets de génie civil, d’hydraulique et d’énergie au Niger. Études, travaux et maîtrise d’œuvre depuis 2017.',
  metadataBase: new URL('https://globalsolutions.one'),
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
