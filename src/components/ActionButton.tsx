import Link from "next/link";
import RollText from "@/components/RollText";

/**
 * ActionButton — the one call-to-action style for the project pages (from
 * the Figma brochure button): a thin outlined bar holding a dark square
 * icon well and the label. On hover a fill sweeps up from the bottom, the
 * colours invert and the label rolls.
 *
 * `tone="light"` is for dark backgrounds (white outline, white well).
 * `variant="solid"` is the primary action (Request interest): a filled bar
 * (black, or white on dark backgrounds) whose hover sweep inverts it.
 * Renders a link when given `href` (hash links scroll smoothly via the
 * global scroll-behavior), otherwise a button.
 */
type Icon = "arrow" | "download" | "send";

const PATHS: Record<Icon, string> = {
  arrow: "M3 11 11 3M11 3H4M11 3v7",
  download: "M7 1v8m0 0L3.5 5.5M7 9l3.5-3.5M2 12.5h10",
  send: "M2 7h10m0 0L8 3m4 4-4 4",
};

export default function ActionButton({
  label,
  icon = "arrow",
  tone = "dark",
  href,
  onClick,
  type = "button",
  variant = "outline",
  className = "",
}: {
  label: string;
  icon?: Icon;
  tone?: "dark" | "light";
  variant?: "outline" | "solid";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  const dark = tone === "dark";
  const solid = variant === "solid";
  // Solid = the outline style already "inverted": filled bar, inverse well;
  // its hover sweep brings it back to the outline look.
  const ink = solid ? !dark : dark; // true → dark text on light fill
  const classes = `group relative inline-flex items-center gap-3 overflow-hidden rounded-[4px] border p-2 pr-5 transition-colors duration-500 ${
    dark
      ? `border-brand-black ${solid ? "bg-brand-black" : "border-brand-black/30 hover:border-brand-black"}`
      : `border-white ${solid ? "bg-white" : "border-white/50 hover:border-white"}`
  } ${className}`;

  const inner = (
    <>
      {/* Fill sweeps up from the bottom edge. */}
      <span
        aria-hidden
        className={`absolute inset-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0 ${
          ink ? "bg-brand-black" : "bg-white"
        }`}
      />
      <span
        className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-[2px] transition-colors duration-500 ${
          ink
            ? "bg-brand-black text-brand-white group-hover:bg-brand-white group-hover:text-brand-black"
            : "bg-white text-brand-black group-hover:bg-brand-black group-hover:text-white"
        }`}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
          className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        >
          <path d={PATHS[icon]} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span
        className={`relative z-10 whitespace-nowrap font-sans text-base font-medium transition-colors duration-500 md:text-lg ${
          ink ? "text-brand-black group-hover:text-brand-white" : "text-white group-hover:text-brand-black"
        }`}
      >
        <RollText>{label}</RollText>
      </span>
    </>
  );

  if (href) {
    return href.startsWith("#") ? (
      <a href={href} className={classes}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {inner}
    </button>
  );
}

/** "Request interest" — the primary action; jumps to the interest form. */
export function RequestInterest({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <ActionButton
      label="Request interest"
      href="#request-interest"
      tone={tone}
      variant="solid"
      className={className}
    />
  );
}
