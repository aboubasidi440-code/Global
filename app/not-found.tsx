import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--forest-deep)',
        color: 'var(--sand)',
        padding: '2rem',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 520, display: 'grid', gap: '1.2rem', justifyItems: 'center' }}>
        <span className="eyebrow">404</span>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}>Page introuvable</h1>
        <p style={{ color: 'rgba(247, 242, 232, 0.72)' }}>
          Cette page n’existe pas ou a été déplacée. Retournez à l’accueil ou écrivez-nous.
        </p>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/fr" className="btn btn-light">
            Accueil
          </Link>
          <Link href="/en" className="btn btn-outline-light">
            English
          </Link>
          <Link href="/fr/contact" className="btn btn-outline-light">
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}
