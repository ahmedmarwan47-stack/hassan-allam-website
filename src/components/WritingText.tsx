"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useSeenOnce } from "@/hooks/useSeenOnce";

export const WRITE_MS = 1000; // a paragraph finishes writing in about this long
const MAX_CHAR_MS = 16; // …and short lines never write slower than this per letter

/**
 * Letters fade and un-blur in sequence, like the line is being written,
 * once the paragraph comes into view. Every letter is laid out from the
 * start (just invisible), so the paragraph never reflows while it writes.
 * Words stay unbreakable mid-write. The pace scales with length, so any
 * paragraph completes in about WRITE_MS. `delay` (ms) holds the first letter
 * back, e.g. to start a second paragraph a beat after the first.
 */
export default function WritingText({
  text,
  className,
  delay = 250,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const seen = useSeenOnce(ref);
  const reduce = useReducedMotion();
  const words = text.split(" ");
  // Index of each word's first letter in the sentence (spaces count as a beat).
  const starts = words.map((_, w) =>
    words.slice(0, w).reduce((n, prev) => n + prev.length + 1, 0),
  );
  const step = Math.min(MAX_CHAR_MS, WRITE_MS / Math.max(1, text.length));

  return (
    <p ref={ref} aria-label={text} className={className}>
      {words.map((word, w) => (
        <span key={w} aria-hidden>
          <span className="inline-block whitespace-nowrap">
            {[...word].map((ch, c) => {
              const at = delay + (starts[w] + c) * step;
              return (
                <span
                  key={c}
                  className="inline-block"
                  style={{
                    opacity: seen ? 1 : 0,
                    filter: seen ? "blur(0px)" : "blur(6px)",
                    transform: seen ? "none" : "translateY(0.25em)",
                    transition: reduce
                      ? "none"
                      : `opacity 0.4s ease-out ${at}ms, filter 0.4s ease-out ${at}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${at}ms`,
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>{" "}
        </span>
      ))}
    </p>
  );
}
