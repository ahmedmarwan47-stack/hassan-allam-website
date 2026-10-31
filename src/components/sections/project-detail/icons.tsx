export type FeatureIconName =
  | "office"
  | "retail"
  | "dining"
  | "hospitality"
  | "leisure"
  | "fitness"
  | "healthcare"
  // Home types (products)
  | "apartment"
  | "duplex"
  | "penthouse"
  | "townhouse"
  | "twinhouse"
  | "villa";

/** Thin line icons for the amenities and home-type (products) grids. */
export function FeatureIcon({ name }: { name: FeatureIconName }) {
  const common = {
    width: 27,
    height: 27,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
  };

  switch (name) {
    case "office":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 21V5a1 1 0 0 1 1-1h6v17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M11 21V9h8a1 1 0 0 1 1 1v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 21h20M7 8h1M7 12h1M7 16h1M14 13h1M14 17h1M18 13h1M18 17h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "retail":
      return (
        <svg {...common} aria-hidden>
          <path d="M5 8h14l1 12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1L5 8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8 8V6a4 4 0 0 1 8 0v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "dining":
      return (
        <svg {...common} aria-hidden>
          <path d="M7 2v8M5 2v5a2 2 0 0 0 4 0V2M7 10v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M17 2c-1.66 0-3 2.24-3 5s1.34 5 3 5v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "hospitality":
      return (
        <svg {...common} aria-hidden>
          <path d="M5 3h14l-7 8-7-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 11v8M8 21h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "leisure":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 20V9M12 9c0-3.5 2-6 5-6-1 3-2 5-5 6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 20h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "fitness":
      return (
        <svg {...common} aria-hidden>
          <path d="M2 12h2M20 12h2M5 8v8M19 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="5" y="9" width="2" height="6" rx="0.5" fill="currentColor" />
          <rect x="17" y="9" width="2" height="6" rx="0.5" fill="currentColor" />
        </svg>
      );
    case "healthcare":
      return (
        <svg {...common} aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 7v10M7 12h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "apartment":
      return (
        <svg {...common} aria-hidden>
          <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10.5 21v-3h3v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "duplex":
      return (
        <svg {...common} aria-hidden>
          <rect x="4" y="6" width="16" height="15" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 13.5h16M8 9.5h2M14 9.5h2M10 21v-4h4v4M16 13.5l-2 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "penthouse":
      return (
        <svg {...common} aria-hidden>
          <path d="M8 8V4h8v4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <rect x="4" y="8" width="16" height="13" rx="1" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 8h18M8 12h1M15 12h1M8 16h1M15 16h1M11 6h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "townhouse":
      return (
        <svg {...common} aria-hidden>
          <path d="M2 21V11l5-4 5 4 5-4 5 4v10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 11v10M1 21h22M6 21v-4h2v4M16 21v-4h2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "twinhouse":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 21V10l9-6 9 6v11" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M12 4v17M2 21h20M6.5 13h2M15.5 13h2M6.5 21v-4h2v4M15.5 21v-4h2v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "villa":
      return (
        <svg {...common} aria-hidden>
          <path d="M3 10.5 12 4l9 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 9v12h14V9M10 21v-5h4v5M2 21h20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12h2M14 12h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
  }
}
