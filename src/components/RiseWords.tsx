"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useSeenOnce } from "@/hooks/useSeenOnce";

/**
 * RiseWords — a text entrance: each word rises into place from behind its
 * own line mask, one after another, with a soft fade. Plays once when the
 * text comes into view. Put it inside the heading/paragraph that styles it;
 * screen readers get the plain text once.
 */
export default function RiseWords({
  text,
  delay = 0,
  stagger = 45,
  duration = 900,
}: {
  text: string;
  /** Before the first word starts (ms). */
  delay?: number;
  /** Between one word's start and the next (ms). */
  stagger?: number;
  /** Each word's rise (ms). */
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useSeenOnce(ref);
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span ref={ref} aria-label={text} role="text">
      {words.map((word, i) => (
        <span key={i} aria-hidden>
          {/* Mask with room for ascenders/descenders and italic overhang
              (cancelled by margins). */}
          <span className="-mx-[0.1em] -my-[0.25em] inline-block overflow-hidden px-[0.1em] py-[0.25em] align-top">
            <span
              className="inline-block will-change-transform"
              style={{
                transform: seen || reduce ? "translateY(0)" : "translateY(110%)",
                opacity: seen || reduce ? 1 : 0,
                transition: reduce
                  ? "none"
                  : `transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay + i * stagger}ms, opacity ${duration}ms ease-out ${delay + i * stagger}ms`,
              }}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}
