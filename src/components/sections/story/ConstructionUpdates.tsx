"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import SliderArrow from "@/components/SliderArrow";

/**
 * "Construction Updates" slider — Figma component set 17149:2642, placed on
 * the Our Story page (17148:3407). Images slide, captions fade + rise, the
 * timeline fills as you advance; arrows, year labels and a 5s autoplay drive it.
 * Steps 5–6 are placeholder copy until the client supplies the real milestones.
 */
const STEPS = [
  {
    year: "1936",
    eyebrow: "First Generation",
    title: "The Birth of Hassan Allam Construction in Egypt",
    body: "Hassan Allam lays the first stone of a family construction business in Cairo — the start of a legacy that would grow across three generations.",
    image: "/images/image 386.jpg",
  },
  {
    year: "1961",
    eyebrow: "First Generation",
    title: "Nationalization of Hassan Allam Construction",
    body: "The company is nationalized alongside much of Egypt’s private industry, pausing the family’s work in construction for over a decade.",
    image: "/images/image 387.jpg",
  },
  {
    year: "1972",
    eyebrow: "Second Generation",
    title: "The Re-Birth of Hassan Allam Sons for Construction",
    body: "Hassan Allam Sons is re-established, rebuilding the business around the same values of quality, integrity and craftsmanship.",
    image: "/images/image 388.jpg",
  },
  {
    year: "2000",
    eyebrow: "Third Generation",
    title: "The Debut of Hassan Allam Properties by Mohamed M. Allam",
    body: "Mohamed M. Allam launches Hassan Allam Properties, the group’s boutique developer focused on intimate, family-first communities.",
    image: "/images/image 383.jpg",
  },
  {
    year: "2015",
    eyebrow: "Third Generation",
    title: "A Move Toward the Coast",
    body: "The portfolio expands beyond the capital to the Red Sea and North Coast, bringing HAP’s family-first ethos to seaside living.",
    image: "/images/image 384.jpg",
  },
  {
    year: "Today",
    eyebrow: "Third Generation",
    title: "Building for the Next Generation",
    body: "Three generations in, Hassan Allam Properties keeps crafting communities where families come first — now and for decades to come.",
    image: "/images/image 385.jpg",
  },
];

const N = STEPS.length;
const AUTOPLAY_MS = 5000;
const EASE = [0.65, 0, 0.35, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export default function ConstructionUpdates() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback((i: number) => setIndex(Math.max(0, Math.min(N - 1, i))), []);

  // Autoplay loops back to the first step; any interaction restarts the timer
  // because `index` changes. Paused while hovered and under reduced motion.
  useEffect(() => {
    if (paused || reduceMotion) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % N), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduceMotion]);

  const step = STEPS[index];

  return (
    <section
      data-nav-theme="light"
      aria-roledescription="carousel"
      aria-label="Construction updates"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="bg-brand-white px-6 py-16 text-brand-black md:px-16 md:py-20"
    >
      <div className="mx-auto flex max-w-[1312px] flex-col gap-10 md:gap-14">
        {/* Header: count | title | arrows */}
        <Reveal className="flex flex-col gap-6 md:grid md:grid-cols-[200px_1fr_200px] md:items-center md:gap-6">
          <h2 className="order-first font-serif font-light uppercase leading-[1.16] tracking-[-0.02em] [font-size:clamp(2.25rem,4.3vw,3.875rem)] md:order-none md:col-start-2 md:text-center">
            Construction Updates
          </h2>
          <div className="flex items-center justify-between md:contents">
            <span className="inline-flex w-fit items-center rounded-[2px] border border-brand-black/20 p-4 font-sans text-xl font-medium leading-[1.1] md:col-start-1 md:row-start-1">
              {pad(index + 1)} / {pad(N)}
            </span>
            <div className="flex gap-2.5 md:col-start-3 md:row-start-1 md:justify-end">
              <SliderArrow direction="prev" onClick={() => goTo(index - 1)} disabled={index === 0} label="Previous update" />
              <SliderArrow direction="next" onClick={() => goTo(index + 1)} disabled={index === N - 1} label="Next update" />
            </div>
          </div>
        </Reveal>

        {/* Body: sliding image strip + captions */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-20">
          <div className="relative aspect-[868/560] w-full shrink-0 overflow-hidden rounded-[2px] md:w-[66%]">
            <motion.div
              className="flex h-full"
              style={{ width: `${N * 100}%` }}
              animate={{ x: `-${(index / N) * 100}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
            >
              {STEPS.map((s, i) => (
                <div key={s.year} className="relative h-full" style={{ width: `${100 / N}%` }}>
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 60vw, 100vw"
                    quality={90}
                    priority={i === 0}
                    className="object-cover"
                  />
                </div>
              ))}
            </motion.div>
            <span className="absolute right-4 top-4 bg-brand-white px-3 py-[9px] font-sans text-sm font-medium leading-[1.4] md:text-base">
              {step.year}
            </span>
          </div>

          <div className="relative min-h-[300px] flex-1" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: reduceMotion ? 0 : 0.35, ease: EASE }}
                className="flex flex-col gap-6"
              >
                <p className="font-sans text-base font-medium uppercase leading-[1.4] tracking-[0.04em] text-grey-500">
                  {step.eyebrow}
                </p>
                <p className="font-serif font-light leading-none tracking-[-0.02em] [font-size:clamp(2.5rem,4.3vw,3.875rem)]">
                  {step.year}
                </p>
                <h3 className="font-serif text-[1.75rem] font-light uppercase leading-[1.15] tracking-[-0.02em] md:text-4xl">
                  {step.title}
                </h3>
                <p className="font-sans text-base leading-[1.5] text-brand-black/80">{step.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Timeline: year labels + filling track */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-6">
            {STEPS.map((s, i) => (
              <button
                key={s.year}
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === index ? "step" : undefined}
                className={`py-1 text-left font-sans text-[11px] font-medium uppercase leading-[1.4] tracking-[0.04em] transition-colors duration-300 md:text-sm ${
                  i <= index ? "text-brand-black" : "text-grey-500 hover:text-brand-black"
                }`}
              >
                {s.year}
              </button>
            ))}
          </div>
          <div className="relative h-0.5 w-full bg-brand-black/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-brand-black"
              animate={{ width: `${((index + 1) / N) * 100}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
