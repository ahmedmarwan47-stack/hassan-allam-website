"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";

/**
 * "Our Legacy" — the three-generations statement from hap.com.eg/the-story.
 * The statement lights up word by word as you scroll through it (like the
 * homepage portfolio statement); the supporting paragraph sits on the
 * shared right-hand text column beneath a hairline rule.
 */
const STATEMENT =
  "For three generations, the Hassan Allam Properties family has nurtured a proud legacy of shaping exclusive communities where families come together to celebrate life’s most meaningful moments, from lasting unions to new beginnings.";

const DIM = 0.16;

export default function LegacySection({ id }: { id?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = STATEMENT.split(" ");

  return (
    <section
      id={id}
      data-nav-theme="dark"
      className="flex scroll-mt-0 flex-col gap-16 bg-brand-black px-6 pb-24 pt-16 text-brand-white md:gap-24 md:px-16 md:pb-36 md:pt-24"
    >
      <SectionEyebrow>Our Legacy</SectionEyebrow>

      <h2
        ref={ref}
        aria-label={STATEMENT}
        className="max-w-[1480px] text-left font-serif font-light uppercase leading-[1.08] tracking-[-0.01em] [font-size:clamp(1.75rem,3.7vw,4.25rem)]"
      >
        {words.map((word, i) => (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
            {word}
          </Word>
        ))}
      </h2>

      <Reveal delay={0.1} className="md:ml-auto md:w-[41.35%]">
        <p className="font-sans text-lg leading-[1.6] text-white/85 md:text-xl">
          Our communities are thoughtfully built in prime locations, bringing
          together like-minded neighbors who naturally grow into lifelong
          friends. These meaningful connections and effortless lifestyles add
          lasting value, not just to the homes, but to daily life itself.
          Welcome to Hassan Allam Properties&rsquo; circle of trust, where
          charm, harmony, and a sense of belonging shape everyday living.
        </p>
      </Reveal>
    </section>
  );
}

function Word({
  children,
  progress,
  range: [from, to],
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Function form: keeps framer from handing this to a native ScrollTimeline.
  const opacity = useTransform(progress, (v) =>
    DIM + (1 - DIM) * Math.min(1, Math.max(0, (v - from) / (to - from))),
  );
  return (
    <>
      <motion.span aria-hidden style={{ opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}
