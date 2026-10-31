"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import WritingText from "@/components/WritingText";

const HEADING = "25 Strategic Mixed Use Developments with a Nationwide Footprint.";
const BODY =
  "Hassan Allam Properties offers an exceptional portfolio of 25 projects located in strategic locations, both in the heart of dynamic urban centers and along the coastline.";

const DIM = 0.18; // unlit word opacity

/**
 * Portfolio statement — the heading lights up word by word as you scroll
 * through the section; the paragraph then "writes" itself in, letter by
 * letter, once it comes into view.
 */
export default function PortfolioStatement() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  // 0 when the heading's top is at 85% of the viewport, 1 once its centre
  // reaches 45% — fully lit while it's still comfortably on screen.
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.85", "center 0.45"],
  });
  const words = HEADING.split(" ");

  return (
    <section
      id="portfolio-statement"
      data-nav-theme="dark"
      className="flex min-h-screen items-center justify-center bg-brand-black px-6 py-24 text-brand-white md:py-16"
    >
      <div className="flex flex-col items-center gap-16 text-center md:gap-28 lg:gap-32">
        <h2
          ref={headingRef}
          aria-label={HEADING}
          className="max-w-[1100px] font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(3rem,6.4vw,5.75rem)]"
        >
          {words.map((word, i) => (
            <FillWord
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            />
          ))}
        </h2>
        <WritingText
          text={BODY}
          className="max-w-[465px] font-serif font-light uppercase leading-[1.2] tracking-[-0.02em] [font-size:clamp(0.9rem,1.5vw,1.375rem)]"
        />
      </div>
    </section>
  );
}

function FillWord({
  word,
  progress,
  range: [from, to],
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Function form on purpose: the [input, output] form can be handed to a
  // native ScrollTimeline, which mis-maps element offsets (see AssetClasses).
  const opacity = useTransform(progress, (v) =>
    DIM + (1 - DIM) * Math.min(1, Math.max(0, (v - from) / (to - from))),
  );
  return (
    <>
      <motion.span aria-hidden style={{ opacity }}>
        {word}
      </motion.span>{" "}
    </>
  );
}
