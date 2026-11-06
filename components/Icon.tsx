export type IconName =
  | 'compass'
  | 'building'
  | 'water'
  | 'drill'
  | 'solar'
  | 'site'
  | 'pipe'
  | 'leaf'
  | 'layers'
  | 'gear'
  | 'factory'
  | 'truck'
  | 'pin'
  | 'phone'
  | 'mail'
  | 'chat';

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
  pipe: (
    <>
      <path d="M4 9h9a4 4 0 0 1 4 4v7" />
      <path d="M4 13h9" />
      <path d="M14 17h6M17 14v6" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C5 9 12 4 20 4c0 9-5 15-13 15" />
      <path d="M5 19c3-5 7-8 11-10" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3l9 5-9 5-9-5z" />
      <path d="M3 13l9 5 9-5" />
      <path d="M3 17l9 5 9-5" opacity="0.45" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.5 5.5l2.1 2.1M16.4 16.4l2.1 2.1M18.5 5.5l-2.1 2.1M7.6 16.4l-2.1 2.1" />
    </>
  ),
  factory: (
    <>
      <path d="M3 21V10l6 4v-4l6 4v-4l6 4v7z" />
      <path d="M3 21h18" />
      <path d="M7 17h2M12 17h2M17 17h2" />
    </>
  ),
  truck: (
    <>
      <path d="M2 6h12v10H2z" />
      <path d="M14 10h4l4 4v2h-8" />
      <circle cx="6.5" cy="18" r="1.8" />
      <circle cx="17.5" cy="18" r="1.8" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s-6.5-5.6-6.5-10.2A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.8C18.5 15.4 12 21 12 21z" />
      <circle cx="12" cy="10.8" r="2.3" />
    </>
  ),
  phone: (
    <>
      <path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  chat: (
    <>
      <path d="M21 12a8 8 0 0 1-8 8H4l2-3.2A8 8 0 1 1 21 12z" />
      <path d="M8.5 11h7M8.5 14h4" />
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
