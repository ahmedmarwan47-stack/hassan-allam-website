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
 * Reveal — fades + rises its children once, when they scroll into view,
 * while a blur settles into focus (the site-wide text entrance, matching
 * GrowReveal's blur language). A small base delay keeps the reveal from
 * firing the instant the element crosses the viewport edge.
 * Respects `prefers-reduced-motion`. Reusable scroll-in primitive for the site.
 */
const BASE_DELAY = 0.15;

export function Reveal({ children, delay = 0, y = 28, className, ...rest }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: BASE_DELAY + delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
