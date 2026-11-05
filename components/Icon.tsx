type IconName = 'compass' | 'building' | 'water' | 'drill' | 'solar' | 'site';

const paths: Record<IconName, React.ReactNode> = {
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </>
  ),
  building: (
    <>
      <path d="M4 20V6l8-3v17" />
      <path d="M12 20h8V10l-8-4" />
      <path d="M7 9h1M7 13h1M7 17h1M15 12h2M15 16h2" />
    </>
  ),
  water: (
    <>
      <path d="M12 3s5 5.4 5 9a5 5 0 0 1-10 0c0-3.6 5-9 5-9z" />
      <path d="M9.5 13.5a2.5 2.5 0 0 0 2.5 2.5" />
    </>
  ),
  drill: (
    <>
      <path d="M12 3v7" />
      <path d="M8 10h8l-2 6h-4z" />
      <path d="M6 20h12" />
      <path d="M10 16h4v4h-4z" />
    </>
  ),
  solar: (
    <>
      <path d="M4 15l2-8h12l2 8z" />
      <path d="M12 7v8M6 11h12" />
      <path d="M12 18v3M9 21h6" />
    </>
  ),
  site: (
    <>
      <path d="M4 21V9l8-5 8 5v12" />
      <path d="M9 21v-6h6v6" />
      <path d="M4 21h16" />
    </>
  ),
};

export default function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
