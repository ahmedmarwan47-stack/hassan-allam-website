"use client";

import Image from "@/components/ProgressiveImage";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SliderArrow from "@/components/SliderArrow";
import { useCarouselDrag } from "@/components/CarouselDrag";
import SectionEyebrow from "@/components/SectionEyebrow";

/**
 * "Construction Updates" slider — Figma component set 17149:2642, placed on
 * the Our Story page (17148:3407). Images cross-fade, captions fade + rise, the
 * timeline fills as you advance; arrows, year labels and a 5s autoplay drive it.
 */
// 1936–2000: the live site's milestones (hap.com.eg/the-story), titles as
// published. 2010–2026: generated from the live project content (PLACEHOLDER
// years and copy, to be confirmed by HAP). Bodies are short supporting copy.
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
    year: "2010",
    eyebrow: "Third Generation",
    title: "Gated Communities Across East and West Cairo",
    body: "SwanLake Katameya, Parkview and Seasons Residence set HAP’s signature of intimate, landscaped gated communities on both sides of the capital.",
    image: "/images/hap/projects/swanlake-katameya/swanlake-katameya-hero-cover.jpg",
  },
  {
    year: "2015",
    eyebrow: "Third Generation",
    title: "A Move Toward the Coast",
    body: "SwanLake El Gouna and SwanLake North Coast bring HAP’s family-first living to the Red Sea and the Mediterranean, around swimmable crystal lagoons.",
    image: "/images/hap/projects/swanlake-el-gouna/swanlake-el-gouna-hero-cover.jpg",
  },
  {
    year: "2020",
    eyebrow: "Third Generation",
    title: "SwanLake Residences New Cairo",
    body: "Across 460 acres, twelve gated neighborhoods come together around KODE sports club and am:pm, East Cairo’s retail and commercial promenade.",
    image: "/images/hap/projects/swanlake-residences-new-cairo/swanlake-residences-new-cairo-hero-cover.jpg",
  },
  {
    year: "2026",
    eyebrow: "Third Generation",
    title: "Mostakbal City and the Next Chapter",
    body: "With HAPTOWN, The Valleys and the launch of Park Central — unveiled to more than 4,000 partners — HAP shapes its next generation of communities in Mostakbal City.",
    image: "/images/hap/projects/park-central-mostakbal-city/park-central-mostakbal-city-hero-cover.jpg",
  },
];

const N = STEPS.length;
const AUTOPLAY_MS = 5000;
const EASE = [0.65, 0, 0.35, 1] as const;
const WIPE_EASE = [0.76, 0, 0.24, 1] as const;
/** Left edge of milestone i along the timeline (one column per step). */
const nodePct = (i: number) => (i / N) * 100;

export default function ConstructionUpdates({ id }: { id?: string }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(N - 1, i));
      if (next === index) return;
      setIndex(next);
    },
    [index],
  );
  const { bind, viewportClass, dragX } = useCarouselDrag({
    onPrev: () => goTo(index - 1),
    onNext: () => goTo(index + 1),
    canPrev: index > 0,
    canNext: index < N - 1,
  });

  // Autoplay loops back to the first step; any interaction restarts the timer
  // because `index` changes. Paused while hovered and under reduced motion.
  const autoplay = !paused && !reduceMotion;
  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % N);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, autoplay]);

  const step = STEPS[index];
  const fade = reduceMotion ? { duration: 0 } : { duration: 0.9, ease: [0.45, 0, 0.55, 1] as const };

  // Milestone timeline: generations above (desktop), nodes on the line,
  // years below. The solid line reaches the current milestone; a fainter
  // fill creeps toward the next one as the autoplay timer runs. Phones get a
  // compact copy right under the image (no generation row).
  const renderTimeline = (compact: boolean) => (
          <div className={compact ? "flex flex-col md:hidden" : "hidden flex-col md:flex"}>
            {!compact && (
            <div className="grid pb-3" style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}>
              {STEPS.map((s, i) => (
                <span
                  key={s.year}
                  className="font-sans text-[10px] font-medium uppercase tracking-[0.08em] text-grey-500 md:text-xs"
                >
                  {i === 0 || STEPS[i - 1].eyebrow !== s.eyebrow ? s.eyebrow : ""}
                </span>
              ))}
            </div>
            )}

            <div className="relative h-4">
              <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-brand-black/15" />
              <motion.div
                className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-brand-black"
                animate={{ width: `${nodePct(index)}%` }}
                transition={{ duration: reduceMotion ? 0 : 0.9, ease: WIPE_EASE }}
              />
              {autoplay && index < N - 1 && (
                <motion.div
                  key={`timer-${index}`}
                  className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-brand-black/35"
                  style={{ left: `${nodePct(index)}%` }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${100 / N}%` }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              )}
              {STEPS.map((s, i) => {
                const state = i < index ? "past" : i === index ? "current" : "future";
                return (
                  <button
                    key={s.year}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`${s.year}: ${s.title}`}
                    aria-current={state === "current" ? "step" : undefined}
                    className="group absolute top-1/2 flex size-6 -translate-x-[3px] -translate-y-1/2 items-center justify-start"
                    style={{ left: `${nodePct(i)}%` }}
                  >
                    {state === "current" && !reduceMotion && (
                      <motion.span
                        aria-hidden
                        className="absolute left-0 top-1/2 size-3 -translate-y-1/2 rounded-full border border-brand-black"
                        animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                    <motion.span
                      aria-hidden
                      className="relative block rounded-full border border-brand-black"
                      animate={{
                        width: state === "current" ? 12 : 8,
                        height: state === "current" ? 12 : 8,
                        backgroundColor: state === "future" ? "rgb(255,255,255)" : "rgb(0,0,0)",
                      }}
                      transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE }}
                    />
                  </button>
                );
              })}
            </div>

            <div
              className={`grid ${compact ? "pt-2" : "pt-3"}`}
              style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}
            >
              {STEPS.map((s, i) => (
                <button
                  key={s.year}
                  type="button"
                  onClick={() => goTo(i)}
                  tabIndex={-1}
                  className={`py-1 text-left font-sans text-[11px] font-medium uppercase leading-[1.4] tracking-[0.04em] transition-colors duration-300 md:text-sm ${
                    i <= index ? "text-brand-black" : "text-grey-500 hover:text-brand-black"
                  }`}
                >
                  {s.year}
                </button>
              ))}
            </div>
          </div>
  );

  return (
    <section
      id={id}
      data-nav-theme="light"
      aria-roledescription="carousel"
      aria-label="Our history"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="bg-brand-white px-6 py-16 text-brand-black md:px-16 md:pb-20 md:pt-24"
    >
      <SectionEyebrow className="mb-10">Our History</SectionEyebrow>
      {/* Full width between the page margins — lines up with the eyebrow on
          the left and the navbar CTA on the right. */}
      <div className="flex flex-col gap-10">
        {/* Body: year | wipe-reveal image | caption + arrows */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,0.9fr)_minmax(0,2.2fr)_minmax(0,1fr)] md:gap-10 lg:gap-14">
          {/* Year column — the year as a large display numeral, top-aligned
              with the image, rolling digit by digit. */}
          <div className="flex items-end justify-between gap-4 md:flex-col md:items-start md:justify-start">
            <p
              className="-mt-[0.12em] whitespace-nowrap font-serif font-light leading-none tracking-[-0.04em] [font-size:clamp(3.25rem,15vw,4.5rem)] md:[font-size:clamp(5rem,9.4vw,9rem)]"
            >
              <YearWheels value={step.year} />
            </p>
            {/* Phones: arrows beside the year, so they sit right above the
                image they change. */}
            <div className="flex gap-2 md:hidden">
              <SliderArrow direction="prev" size="sm" onClick={() => goTo(index - 1)} disabled={index === 0} label="Previous update" />
              <SliderArrow direction="next" size="sm" onClick={() => goTo(index + 1)} disabled={index === N - 1} label="Next update" />
            </div>
          </div>

          <div
            {...bind}
            className={`relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-brand-black ${viewportClass}`}
          >
            <motion.div style={{ x: dragX }} className="absolute inset-0">
              {/* Milestones cross-fade — the new image fades in over the
                  last one, which fades out underneath. */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={fade}
                >
                  <Image
                    src={step.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 45vw, 100vw"
                    quality={90}
                    priority={index === 0}
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Warm the cache for every milestone so wipes never wait. */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-0">
              {STEPS.map((s) => (
                <Image key={s.year} src={s.image} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" quality={90} />
              ))}
            </div>
          </div>

          {renderTimeline(true)}

          {/* Caption column, with the slider arrows beside the image. */}
          <div className="flex flex-col justify-between gap-8">
            <div className="relative md:min-h-[260px]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  className="flex flex-col gap-4 md:gap-6"
                  exit={{ opacity: 0, y: -16, transition: { duration: reduceMotion ? 0 : 0.25, ease: EASE } }}
                >
                  {/* Phones drop the timeline's generation row — show it here. */}
                  <span className="-mb-2 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-grey-500 md:hidden">
                    {step.eyebrow}
                  </span>
                  <h3 className="font-serif text-[1.5rem] font-light uppercase leading-[1.15] tracking-[-0.02em] md:text-[2rem]">
                    {step.title.split(" ").map((word, w) => (
                      <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-top">
                        <motion.span
                          className="inline-block"
                          initial={reduceMotion ? false : { y: "105%" }}
                          animate={{ y: "0%" }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 + w * 0.045 }}
                        >
                          {word}&nbsp;
                        </motion.span>
                      </span>
                    ))}
                  </h3>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.6, ease: EASE, delay: reduceMotion ? 0 : 0.35 }}
                    className="font-sans text-base leading-[1.5] text-brand-black/80"
                  >
                    {step.body}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="hidden gap-2.5 md:flex">
              <SliderArrow direction="prev" onClick={() => goTo(index - 1)} disabled={index === 0} label="Previous update" />
              <SliderArrow direction="next" onClick={() => goTo(index + 1)} disabled={index === N - 1} label="Next update" />
            </div>
          </div>
        </div>

        {renderTimeline(false)}
      </div>

    </section>
  );
}

/**
 * YearWheels — the year as four digit wheels, like a mechanical counter.
 * Only digits that change turn (1961 → 1972 turns the last two; the "19"
 * stays put), each wheel rolling through the digits between old and new and
 * settling with a soft ease, the wheels a beat apart from left to right.
 * The wheel window fades at its top and bottom like a drum, and is tall
 * enough that old-style numerals (descending 3, 4, 5, 7, 9) are never cut.
 * Tabular figures keep every wheel the same width.
 */
const ROW = 1.4; // em — one digit's slot on the wheel (glyph + clear space)

function YearWheels({ value }: { value: string }) {
  return (
    <span aria-label={value} className="inline-flex [font-feature-settings:'tnum']">
      {value.split("").map((d, i) => (
        <DigitWheel key={i} digit={Number(d)} index={i} />
      ))}
    </span>
  );
}

function DigitWheel({ digit, index }: { digit: number; index: number }) {
  const reduce = useReducedMotion();
  return (
    <span
      aria-hidden
      className="relative -my-[0.2em] inline-block overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]"
      style={{ height: `${ROW}em` }}
    >
      <motion.span
        className="flex flex-col items-center"
        initial={false}
        animate={{ y: `${-digit * ROW}em` }}
        transition={reduce ? { duration: 0 } : { duration: 1, ease: [0.65, 0, 0.35, 1], delay: index * 0.06 }}
      >
        {Array.from({ length: 10 }, (_, n) => (
          <span key={n} className="flex items-center justify-center" style={{ height: `${ROW}em` }}>
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
