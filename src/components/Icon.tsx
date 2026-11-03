import type { IconName } from "@/lib/site";

const PATHS: Record<IconName, React.ReactNode> = {
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" fill="currentColor" stroke="none" />,
  snow: (
    <>
      <path d="M12 2v20M4.5 6.5l15 11M19.5 6.5l-15 11" />
      <path d="M9 3.5 12 6l3-2.5M9 20.5 12 18l3 2.5M3 10l3.5 1L5.5 7.5M21 14l-3.5-1 1 3.5M21 10l-3.5 1 1-3.5M3 14l3.5-1-1 3.5" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5l8-3v19M12 8h8v13M2 21h20" />
      <path d="M7 7h2M7 11h2M7 15h2M15 12h2M15 16h2" />
    </>
  ),
  house: (
    <>
      <path d="M3 11 12 3l9 8" />
      <path d="M5 9.5V21h14V9.5M10 21v-6h4v6" />
    </>
  ),
  wrench: <path d="M14.7 6.3a4 4 0 0 0 5 5L22 13.6l-.1.1a6 6 0 0 1-7.9 2L7 22.7a2.1 2.1 0 0 1-3-3l7-7a6 6 0 0 1 2-7.9l.1-.1 2.3 2.3a4 4 0 0 0-.7 1.3z" />,
  pin: (
    <>
      <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3z" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  clock: (
    <>
      <circle cx="13" cy="12" r="8" />
      <path d="M13 8v4l3 2M2 9h3M1 13h4M2 17h3" />
    </>
  ),
  phone: (
    <path
      d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1l-2.2 2.2z"
      fill="currentColor"
      stroke="none"
    />
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </>
  ),
  arrow: <path d="M4 12h15M13 6l6 6-6 6" />,
  check: <path d="m4 12.5 5 5L20 6.5" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  calendar: (
    <>
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
    </>
  ),
  hand: (
    <>
      <path d="m11 17 2 2a1.4 1.4 0 0 0 2-2M14 14l2.5 2.5a1.4 1.4 0 0 0 2-2l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1.4 1.4 0 0 1-2-2l2.8-2.8a5 5 0 0 1 6 -.8l.5.3a3 3 0 0 0 2 .4H21M21 4l1 11h-2" />
      <path d="M3 4 2 15l6.5 6.5a1.4 1.4 0 0 0 2-2M3 5h8" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21.5h4" />
      <path d="M12 2.5a6.5 6.5 0 0 0-4 11.6c.6.5 1 1.3 1 2.1V17h6v-.8c0-.8.4-1.6 1-2.1a6.5 6.5 0 0 0-4-11.6z" />
      <path d="m10.5 9.5 1.5 2.5 1.5-2.5" />
    </>
  ),
  users: (
    <>
      <circle cx="12" cy="7.5" r="3.5" />
      <path d="M5 21v-1.5a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5V21" />
      <circle cx="4.5" cy="9.5" r="2.3" />
      <circle cx="19.5" cy="9.5" r="2.3" />
      <path d="M1 18v-.8A3.3 3.3 0 0 1 4.3 14M23 18v-.8a3.3 3.3 0 0 0-3.3-3.2" />
    </>
  ),
  helmet: (
    <>
      <path d="M4 14a8 8 0 0 1 16 0" />
      <path d="M2.5 14h19v2.5h-19zM10 6.5V10M14 6.5V10" />
      <path d="M7 19.5a5 5 0 0 0 10 0" />
    </>
  ),
  doc: (
    <>
      <path d="M14 2.5H6.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V8z" />
      <path d="M14 2.5V8h5.5M8.5 13h7M8.5 17h7M8.5 9h3" />
    </>
  ),
  question: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M9.3 9a2.8 2.8 0 0 1 5.4 1c0 1.9-2.7 2.5-2.7 4.2" />
      <circle cx="12" cy="17.5" r=".6" fill="currentColor" />
    </>
  ),
  send: <path d="M21.5 2.5 2.5 10l7.5 3 3 7.5 8.5-18zM10 13l11.5-10.5" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r=".8" fill="currentColor" />
    </>
  ),
  map: (
    <>
      <path d="m9 4-6 2.5v14L9 18l6 2.5 6-2.5V4l-6 2.5L9 4z" />
      <path d="M9 4v14M15 6.5v14" />
    </>
  ),
  menu: <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />,
  close: <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />,
  up: <path d="m6 15 6-6 6 6" />,
};

export default function Icon({ name, size = 24, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
