// Stroke icons used on the careers pages — same line weight as the Figma
// icon set (briefcase-01, location-01, clock-01, calendar-03, mortarboard-01).

type IconProps = { size?: number; className?: string };

function Svg({ size = 20, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`shrink-0 ${className ?? ""}`}
    >
      {children}
    </svg>
  );
}

export function BriefcaseIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" />
      <rect x="2.5" y="6" width="19" height="14" rx="2" />
      <path d="M2.5 11.5c6 2.5 13 2.5 19 0" />
      <path d="M12 12v2" />
    </Svg>
  );
}

export function LocationIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </Svg>
  );
}

export function ClockIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 7.5V12l3 2" />
    </Svg>
  );
}

export function CalendarIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2" />
      <path d="M8 2.5v4M16 2.5v4M3 9.5h18" />
    </Svg>
  );
}

export function MortarboardIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M2 9.5 12 5l10 4.5-10 4.5L2 9.5Z" />
      <path d="M6 11.5V16c2 2 10 2 12 0v-4.5" />
      <path d="M22 9.5V14" />
    </Svg>
  );
}

export function ArrowUpRightIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M7 17 17 7M8 7h9v9" />
    </Svg>
  );
}

export function ArrowLeftIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M15 18l-6-6 6-6" />
    </Svg>
  );
}
