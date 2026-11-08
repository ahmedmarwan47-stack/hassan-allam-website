"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useSeenOnce } from "@/hooks/useSeenOnce";
import { useT } from "@/i18n/LocaleProvider";

export const WRITE_MS = 1000; // a paragraph finishes writing in about this long
const MAX_CHAR_MS = 16; // …and short lines never write slower than this per letter

/**
 * Letters fade and un-blur in sequence, like the line is being written,
 * once the paragraph comes into view. Every letter is laid out from the
 * start (just invisible), so the paragraph never reflows while it writes.
 * Words stay unbreakable mid-write. The pace scales with length, so any
 * paragraph completes in about WRITE_MS. `delay` (ms) holds the first letter
 * back, e.g. to start a second paragraph a beat after the first.
 *
 * Arabic is written word by word instead: splitting a word into per-letter
 * inline-blocks would break the joining between its letters.
 */
const ARABIC = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

const reveal = (seen: boolean, reduce: boolean | null, at: number): React.CSSProperties => ({
  opacity: seen ? 1 : 0,
  filter: seen ? "blur(0px)" : "blur(6px)",
  transform: seen ? "none" : "translateY(0.25em)",
  transition: reduce
    ? "none"
    : `opacity 0.4s ease-out ${at}ms, filter 0.4s ease-out ${at}ms, transform 0.4s cubic-bezier(0.22,1,0.36,1) ${at}ms`,
});

export default function WritingText({
  text: textEn,
  className,
  delay = 250,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const t = useT();
  const text = t(textEn);
  const perWord = ARABIC.test(text);
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
          {perWord ? (
            // The whole word is one unit, timed by where it starts.
            <span className="inline-block whitespace-nowrap" style={reveal(seen, reduce, delay + starts[w] * step)}>
              {word}
            </span>
          ) : (
            <span className="inline-block whitespace-nowrap">
              {[...word].map((ch, c) => (
                <span key={c} className="inline-block" style={reveal(seen, reduce, delay + (starts[w] + c) * step)}>
                  {ch}
                </span>
              ))}
            </span>
          )}{" "}
        </span>
      ))}
    </p>
  );
}
