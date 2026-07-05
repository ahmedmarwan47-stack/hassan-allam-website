"use client";

import { useRef } from "react";
import { useSeenOnce } from "@/hooks/useSeenOnce";

/**
 * GrowReveal — the site-wide card/image entrance.
 *
 * The content grows open from a clipped sliver (height-wise or width-wise)
 * while a blur settles into focus. Triggered once, slightly *after* the
 * element enters the viewport, on desktop and mobile alike.
 *
 * Gotcha this design works around: a fully clip-path'ed element has zero
 * visible area, so IntersectionObserver never reports it as intersecting —
 * observing the clipped node itself deadlocks the reveal. So the OUTER
 * wrapper (unclipped, keeps the aspect/size classes) is observed, and the
 * clip + blur animate on an inner absolute layer.
 */
export default function GrowReveal({
  axis = "height",
  delay = 0,
  className,
  children,
}: {
  /** "height" grows open top→bottom, "width" grows open left→right. */
  axis?: "height" | "width";
  /** Extra stagger on top of the base delay (seconds). */
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // useSeenOnce (not framer's useInView): observer callbacks get dropped by
  // WebKit during fast continuous scrolling, which left cards permanently
  // clipped. The hook pairs the observer with a scroll-idle geometry check.
  const inView = useSeenOnce(ref);

  const hidden =
    axis === "height" ? "inset(0% 0% 100% 0%)" : "inset(0% 100% 0% 0%)";
  const ease = "cubic-bezier(0.22, 0.61, 0.21, 1)";
  const t = `1.4s ${ease} ${0.25 + delay}s`;

  return (
    <div ref={ref} className={className}>
      <div
        data-reveal=""
        className="absolute inset-0"
        style={{
          clipPath: inView ? "inset(0% 0% 0% 0%)" : hidden,
          filter: inView ? "blur(0px)" : "blur(14px)",
          opacity: inView ? 1 : 0.4,
          transition: `clip-path ${t}, filter ${t}, opacity ${t}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
