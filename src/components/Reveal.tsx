"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Delay in seconds — use to stagger sibling reveals. */
  delay?: number;
  /** Travel distance in px before settling. */
  y?: number;
  /** Starting blur radius in px — set to 0 to disable. */
  blur?: number;
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children" | "initial" | "whileInView" | "viewport" | "transition">;

/**
 * Reveal — fades + rises + blurs-in its children once, when they scroll into
 * view. Under `prefers-reduced-motion` the rise is dropped (no translation),
 * but opacity + blur still play so users who ask for reduced motion still
 * see a gentle reveal instead of silent pop-ins. `data-reveal` marks the
 * element for the no-hydration CSS failsafe in globals.css.
 */
export function Reveal({ children, delay = 0, y = 28, blur = 12, className, ...rest }: RevealProps) {
  const reduce = useReducedMotion();

  const hidden = reduce
    ? { opacity: 0, filter: `blur(${blur}px)` }
    : { opacity: 0, y, filter: `blur(${blur}px)` };
  const shown = reduce
    ? { opacity: 1, filter: "blur(0px)" }
    : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
