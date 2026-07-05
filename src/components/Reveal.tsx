"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Delay in seconds — use to stagger sibling reveals. */
  delay?: number;
  /** Travel distance in px before settling. */
  y?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView" | "viewport" | "transition">;

/**
 * Reveal — fades + rises its children once, when they scroll into view.
 * Under `prefers-reduced-motion` it still plays, but as an opacity-only
 * crossfade (no movement) — skipping entirely made every text reveal
 * silently vanish for users with Reduce Motion enabled on their phone.
 * `data-reveal` marks the element for the no-hydration CSS failsafe in
 * globals.css.
 */
export function Reveal({ children, delay = 0, y = 28, className, ...rest }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
