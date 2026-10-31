"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import ParallaxImage from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import SectionEyebrow from "@/components/SectionEyebrow";

/** One image per statement; the pinned frame switches as each arrives. */
const SLIDES = [
  {
    src: "/images/image 385.jpg",
    alt: "Families walking through a landscaped HAP community",
    text: (
      <>
        Since its inception in the 1990&rsquo;s, Hassan Allam Properties
        [HAP] has carved an enviable niche for itself as an exclusive boutique
        developer, building intimate communities where families always come
        first.
      </>
    ),
  },
  {
    src: "/images/image 398.jpg",
    alt: "A HAP villa with a private pool",
    text: (
      <>
        Originating as a trusted family-run business passed down through three
        generations, HAP draws on decades of development expertise to master
        the equation of private luxury and inviting hospitality — going beyond
        just building homes.
      </>
    ),
  },
];

const EASE = [0.76, 0, 0.24, 1] as const;

export default function StoryIntro({ id }: { id?: string }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  // 0 → 1 as the statements column scrolls through the middle of the screen;
  // each statement owns an equal share of that run.
  const { scrollYProgress } = useScroll({ target: textRef, offset: ["start 0.55", "end 0.55"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(SLIDES.length - 1, Math.floor(v * SLIDES.length)));
  });

  return (
    <section
      id={id}
      data-nav-theme="light"
      className="relative flex flex-col gap-16 bg-brand-white px-6 py-16 text-brand-black md:gap-20 md:px-16 md:py-24"
    >
      {/* Starts where the statements start (the 868/1312 text column). */}
      <SectionEyebrow className="md:ml-auto md:w-[66.16%]">Overview</SectionEyebrow>

      {/* Image + big serif statements. The image (on the shared 424/1312
          column) stays pinned while the statements scroll past; each new
          statement wipes its own image up over the last one. */}
      <div className="flex flex-col items-start gap-10 md:flex-row md:justify-between md:gap-0">
        <div className="w-full shrink-0 md:sticky md:top-28 md:w-[32.24%]">
          <GrowReveal
            axis="height"
            className="relative aspect-[9/10] w-full overflow-hidden rounded-[2px] bg-grey-100"
          >
            {SLIDES.map((slide, i) => (
              <motion.div
                key={slide.src}
                className="absolute inset-0"
                initial={false}
                animate={{
                  clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                  scale: i <= active ? 1 : 1.12,
                }}
                transition={reduce ? { duration: 0 } : { duration: 0.75, ease: EASE }}
              >
                <ParallaxImage
                  src={slide.src}
                  alt={slide.alt}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  quality={90}
                  strength={10}
                />
              </motion.div>
            ))}
          </GrowReveal>
        </div>

        {/* Statements spaced well apart so they scroll past the pinned
            image one at a time, each fading in as it arrives. */}
        <div
          ref={textRef}
          className="flex w-full flex-col gap-16 font-serif font-light leading-[1.1] tracking-[-0.02em] text-brand-black [font-size:clamp(1.75rem,4.3vw,3.875rem)] md:w-[66.16%] md:gap-[22vh] md:pb-[25vh]"
        >
          {SLIDES.map((slide, i) => (
            <Reveal key={slide.src} delay={i === 0 ? 0.05 : 0}>
              <p>{slide.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
