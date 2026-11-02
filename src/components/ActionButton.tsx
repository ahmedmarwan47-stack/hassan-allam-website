import Link from "next/link";
import RollText from "@/components/RollText";

/**
 * ActionButton — the site's one call-to-action style: a bar with the label
 * (and, by default, a ↗ after it). On hover a fill sweeps up from the
 * bottom, the colours invert and the label rolls.
 *
 * `tone="light"` is for dark backgrounds (white outline, white well).
 * `variant="solid"` is the primary action (Request interest): a filled bar
 * (black, or white on dark backgrounds) whose hover sweep inverts it.
 * `size="sm"` is the compact version for tight spots (the navbar).
 * `look` sets the icon treatment:
 *   - "arrow" (default): a ↗ after the label that turns to → on hover;
 *   - "download": a download icon before the label that drops away on hover
 *     while a fresh one slides in from above;
 *   - "plain": label only.
 * Renders a link when given `href` (hash links scroll smoothly via the
 * global scroll-behavior), otherwise a button.
 */
const PATHS = {
  arrow: "M3 11 11 3M11 3H4M11 3v7",
  download: "M7 1v8m0 0L3.5 5.5M7 9l3.5-3.5M2 12.5h10",
};

export default function ActionButton({
  label,
  tone = "dark",
  href,
  onClick,
  type = "button",
  variant = "outline",
  size = "md",
  look = "arrow",
  className = "",
}: {
  label: string;
  tone?: "dark" | "light";
  variant?: "outline" | "solid";
  size?: "md" | "sm";
  look?: "arrow" | "download" | "plain";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}) {
  const dark = tone === "dark";
  const solid = variant === "solid";
  // Solid = the outline style already "inverted": a filled bar whose hover
  // sweep brings it back to the outline look.
  const ink = solid ? !dark : dark; // true → dark text on light fill
  const sm = size === "sm";
  const pad = sm ? "gap-2 px-4 py-2.5" : "gap-3 px-6 py-[15px]";
  const fg = ink ? "text-brand-black group-hover:text-brand-white" : "text-white group-hover:text-brand-black";
  const ease = "duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]";
  const classes = `group relative inline-flex items-center overflow-hidden rounded-[4px] border transition-colors duration-500 ${pad} ${
    dark
      ? `border-brand-black ${solid ? "bg-brand-black" : "border-brand-black/30 hover:border-brand-black"}`
      : // Solid on dark: the border darkens with the hover fill, so no white
        // ring is left around the black button.
        `border-white ${solid ? "bg-white hover:border-brand-black" : "border-white/50 hover:border-white"}`
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
      {look === "download" && (
        // Two icons stacked in a clip: on hover the first drops out of view
        // while the second slides in from above.
        <span aria-hidden className={`relative z-10 block size-4 overflow-hidden transition-colors duration-500 ${fg}`}>
          {[0, 1].map((n) => (
            <svg
              key={n}
              width="16"
              height="16"
              viewBox="0 0 14 14"
              fill="none"
              className={`absolute inset-0 transition-transform ${ease} ${
                n === 0 ? "group-hover:translate-y-full" : "-translate-y-full group-hover:translate-y-0"
              }`}
            >
              <path d={PATHS.download} stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ))}
        </span>
      )}
      <span
        className={`relative z-10 whitespace-nowrap font-sans font-medium transition-colors duration-500 ${sm ? "text-sm md:text-base" : "text-base md:text-lg"} ${fg}`}
      >
        <RollText>{label}</RollText>
      </span>
      {look === "arrow" && (
        // ↗ that turns a quarter-of-a-turn to → on hover.
        <svg
          width={sm ? 12 : 14}
          height={sm ? 12 : 14}
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
          className={`relative z-10 shrink-0 transition-[transform,color] ${ease} group-hover:rotate-45 ${fg}`}
        >
          <path d={PATHS.arrow} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
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
      look="arrow"
      className={className}
    />
  );
}
