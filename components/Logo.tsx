export default function Logo({ size = 44 }: { size?: number }) {
  return (
    <svg
      className="brand-mark"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <polygon
        points="24,3.5 41.5,13.6 41.5,34.4 24,44.5 6.5,34.4 6.5,13.6"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <circle cx="24" cy="24" r="10" fill="#2b83b5" />
      <ellipse cx="24" cy="24" rx="4.6" ry="10" stroke="#dcecfa" strokeWidth="1" opacity="0.85" />
      <path d="M14 24h20M15.5 18.5h17M15.5 29.5h17" stroke="#dcecfa" strokeWidth="0.9" opacity="0.7" />
      <g fill="currentColor">
        <rect x="20.6" y="0.6" width="6.8" height="4" rx="1" />
        <rect x="38.2" y="11.4" width="6.8" height="4" rx="1" transform="rotate(90 41.6 13.4)" />
        <rect x="38.2" y="32.6" width="6.8" height="4" rx="1" transform="rotate(90 41.6 34.6)" />
        <rect x="20.6" y="43.4" width="6.8" height="4" rx="1" />
        <rect x="3" y="32.6" width="6.8" height="4" rx="1" transform="rotate(90 6.4 34.6)" />
        <rect x="3" y="11.4" width="6.8" height="4" rx="1" transform="rotate(90 6.4 13.4)" />
      </g>
    </svg>
  );
}
