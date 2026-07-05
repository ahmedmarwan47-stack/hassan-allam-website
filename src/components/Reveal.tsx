"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useSeenOnce } from "@/hooks/useSeenOnce";

type RevealProps = {
  children: ReactNode;
  /** Delay in seconds — use to stagger sibling reveals. */
  delay?: number;
  /** Travel distance in px before settling. */
  y?: number;
  /** Starting blur radius in px — set to 0 to disable. */
  blur?: number;
  className?: string;
} & Omit<
  HTMLMotionProps<"div">,
  "children" | "initial" | "animate" | "whileInView" | "viewport" | "transition"
>;

/**
 * Reveal — fades + rises + blurs-in its children once, when they scroll into
 * view. Under `prefers-reduced-motion` the rise is dropped (no translation),
 * but opacity + blur still play so users who ask for reduced motion still
 * see a gentle reveal instead of silent pop-ins. `data-reveal` marks the
 * element for the no-hydration CSS failsafe in globals.css.
 *
 * Triggered by useSeenOnce (observer + scroll-idle geometry check) rather
 * than framer's whileInView — WebKit drops observer callbacks during fast
 * continuous scrolling, which left text permanently invisible.
 */
export function Reveal({ children, delay = 0, y = 28, blur = 12, className, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeenOnce(ref);

  const hidden = reduce
    ? { opacity: 0, filter: `blur(${blur}px)` }
    : { opacity: 0, y, filter: `blur(${blur}px)` };
  const shown = reduce
    ? { opacity: 1, filter: "blur(0px)" }
    : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      ref={ref}
      data-reveal=""
      className={className}
      initial={hidden}
      animate={seen ? shown : hidden}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 + delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
