"use client";

/**
 * Prev/next slider button — Figma "Slider arrow" (17145:2112).
 * Light theme sits on light sections, Dark on black/photo sections.
 * Hover fills the square; Disabled fades to 30%.
 */
export default function SliderArrow({
  direction,
  theme = "light",
  disabled,
  emphasis,
  size = "md",
  onClick,
  label,
}: {
  direction: "prev" | "next";
  theme?: "light" | "dark";
  disabled?: boolean;
  /** Stronger resting border, for sliders that need to read at a glance. */
  emphasis?: boolean;
  /** "sm" is a 40px square for tight spots like the project sidebar. */
  size?: "md" | "sm";
  onClick: () => void;
  label?: string;
}) {
  const colors =
    theme === "dark"
      ? `${emphasis ? "border-white/60" : "border-white/20"} text-brand-white enabled:hover:border-brand-white enabled:hover:bg-brand-white enabled:hover:text-brand-black`
      : `${emphasis ? "border-brand-black/60" : "border-brand-black/20"} text-brand-black enabled:hover:border-brand-black enabled:hover:bg-brand-black enabled:hover:text-brand-white`;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label ?? (direction === "prev" ? "Previous" : "Next")}
      className={`flex shrink-0 items-center justify-center rounded-[2px] border transition-[background-color,border-color,color,opacity] duration-300 ease-out disabled:cursor-default disabled:opacity-30 ${size === "sm" ? "size-10" : "size-12 md:size-[54px]"} ${colors}`}
    >
      <svg width={size === "sm" ? 20 : 24} height={size === "sm" ? 20 : 24} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d={direction === "prev" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
