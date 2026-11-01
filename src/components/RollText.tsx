import type { ReactNode } from "react";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";
/** Gap between neighbouring letters' starts (seconds). */
const LETTER_STEP = 0.012;

/**
 * RollText — masked hover roll for nav links and CTAs: on hover each letter
 * slides up out of its line while an identical copy rises in from below.
 * Letters are staggered right-to-left (the last letter leaves a touch before
 * the first), so the word swipes with a slight wave.
 *
 * The mask has 0.2em of extra room above and below (cancelled by negative
 * margins, so layout is unchanged) so long descenders like a J aren't cut
 * off, and letters travel 160% so no tail lingers in view mid-roll.
 *
 * Driven by the nearest `group` ancestor (hover or keyboard focus), so put it
 * inside the link/button and give that element the `group` class. Screen
 * readers get the plain label once. Non-string children roll as one block.
 */
export default function RollText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  if (typeof children !== "string") {
    return (
      <span className={`relative -my-[0.2em] inline-flex overflow-hidden py-[0.2em] ${className ?? ""}`}>
        <Roll>{children}</Roll>
      </span>
    );
  }

  const letters = [...children];
  const n = letters.length;
  return (
    <span className={`relative -my-[0.2em] inline-flex overflow-hidden py-[0.2em] ${className ?? ""}`}>
      <span className="sr-only">{children}</span>
      <span aria-hidden className="inline-flex">
        {letters.map((ch, i) => (
          <Roll key={i} delay={(n - 1 - i) * LETTER_STEP}>
            {ch === " " ? " " : ch}
          </Roll>
        ))}
      </span>
    </span>
  );
}

/** One rolling cell: the visible copy leaves upward, the copy below enters. */
function Roll({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const style = delay ? { transitionDelay: `${delay}s` } : undefined;
  return (
    <span className="relative inline-block">
      <span
        className={`block transition-transform duration-500 ${EASE} group-hover:-translate-y-[160%] group-focus-visible:-translate-y-[160%]`}
        style={style}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={`absolute inset-0 block translate-y-[160%] transition-transform duration-500 ${EASE} group-hover:translate-y-0 group-focus-visible:translate-y-0`}
        style={style}
      >
        {children}
      </span>
    </span>
  );
}
