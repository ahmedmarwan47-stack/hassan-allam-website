"use client";

import Image from "@/components/ProgressiveImage";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SliderArrow from "@/components/SliderArrow";
import { useCarouselCursor } from "@/components/CarouselCursor";
import SectionEyebrow from "@/components/SectionEyebrow";

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
    year: "2026",
    eyebrow: "Third Generation",
    title: "Building for the Next Generation",
    body: "Three generations in, Hassan Allam Properties keeps crafting communities where families come first — now and for decades to come.",
    image: "/images/image 385.jpg",
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
  // +1 forward, -1 back — picks the side the next image wipes in from.
  const [dir, setDir] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  const goTo = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(N - 1, i));
      if (next === index) return;
      setDir(next > index ? 1 : -1);
      setIndex(next);
    },
    [index],
  );
  // Images aren't links, so the cursor stays on "Drag" (no Discover state).
  const { bind, viewportClass, dragX, cursor } = useCarouselCursor({
    onPrev: () => goTo(index - 1),
    onNext: () => goTo(index + 1),
    discoverLabel: null,
    canPrev: index > 0,
    canNext: index < N - 1,
  });

  // Autoplay loops back to the first step; any interaction restarts the timer
  // because `index` changes. Paused while hovered and under reduced motion.
  const autoplay = !paused && !reduceMotion;
  useEffect(() => {
    if (!autoplay) return;
    const t = setTimeout(() => {
      setDir(1);
      setIndex((i) => (i + 1) % N);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, autoplay]);

  const step = STEPS[index];
  const wipe = reduceMotion ? { duration: 0 } : { duration: 1.1, ease: WIPE_EASE };

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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,2.2fr)_minmax(0,1fr)] md:gap-10 lg:gap-14">
          {/* Year column — the year as a large display numeral, top-aligned
              with the image, rolling digit by digit. */}
          <div className="flex flex-col justify-start">
            <p
              className="-mt-[0.12em] whitespace-nowrap font-serif font-light leading-none tracking-[-0.04em] [font-size:clamp(5rem,9.4vw,9rem)]"
            >
              <Odometer value={step.year} dir={dir} />
            </p>
          </div>

          <div
            {...bind}
            className={`relative aspect-[5/4] w-full md:aspect-[16/10] overflow-hidden rounded-[2px] bg-brand-black ${viewportClass}`}
          >
            <motion.div style={{ x: dragX }} className="absolute inset-0">
              {/* Each new milestone wipes in over the last one (from the right
                  going forward, the left going back) while slowly settling
                  from a zoom; the outgoing image drifts away underneath. */}
              <AnimatePresence initial={false} custom={dir}>
                <motion.div
                  key={index}
                  custom={dir}
                  className="absolute inset-0 overflow-hidden"
                  variants={{
                    enter: (d: 1 | -1) => ({
                      clipPath: d > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
                      zIndex: 2,
                    }),
                    center: { clipPath: "inset(0% 0% 0% 0%)", zIndex: 2, x: "0%" },
                    exit: (d: 1 | -1) => ({ zIndex: 1, x: d > 0 ? "-14%" : "14%" }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={wipe}
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={reduceMotion ? false : { scale: 1.18 }}
                    animate={{ scale: 1 }}
                    transition={reduceMotion ? { duration: 0 } : { duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
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

          {/* Caption column, with the slider arrows beside the image. */}
          <div className="flex flex-col justify-between gap-8">
            <div className="relative min-h-[260px]" aria-live="polite">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={index}
                  className="flex flex-col gap-6"
                  exit={{ opacity: 0, y: -16, transition: { duration: reduceMotion ? 0 : 0.25, ease: EASE } }}
                >
                  <h3 className="font-serif text-[1.75rem] font-light uppercase leading-[1.15] tracking-[-0.02em] md:text-[2rem]">
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
            <div className="flex gap-2.5">
              <SliderArrow direction="prev" onClick={() => goTo(index - 1)} disabled={index === 0} label="Previous update" />
              <SliderArrow direction="next" onClick={() => goTo(index + 1)} disabled={index === N - 1} label="Next update" />
            </div>
          </div>
        </div>

        {/* Milestone timeline: generations above, nodes on the line, years
            below. The solid line reaches the current milestone; a fainter
            fill creeps toward the next one as the autoplay timer runs. */}
        <div className="flex flex-col">
          <div className="grid grid-cols-6 pb-3">
            {STEPS.map((s, i) => (
              <span
                key={s.year}
                className="font-sans text-[10px] font-medium uppercase tracking-[0.08em] text-grey-500 md:text-xs"
              >
                {i === 0 || STEPS[i - 1].eyebrow !== s.eyebrow ? s.eyebrow : ""}
              </span>
            ))}
          </div>

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

          <div className="grid grid-cols-6 pt-3">
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
      </div>

      {cursor}
    </section>
  );
}

/**
 * Odometer — the number rolls vertically to its new value (up going
 * forward, down going back): the old number slides out as one piece while
 * the new one's digits ripple in left to right. Both share one grid cell, so
 * they overlap in place and nothing reflows mid-roll even when digit widths
 * differ (a 1 is far narrower than a 9). The cell clips only top and bottom,
 * so wide glyphs overhanging their tight tracking are never sliced at the
 * sides.
 */
function Odometer({ value, dir }: { value: string; dir: 1 | -1 }) {
  const reduce = useReducedMotion();
  const OUT = 110; // % of the line box — clears the old-style descenders
  const ease = [0.65, 0, 0.35, 1] as const;
  const timing = (delay = 0) => (reduce ? { duration: 0 } : { duration: 0.7, ease, delay });
  return (
    <span
      aria-label={value}
      className="relative -my-[0.25em] inline-grid py-[0.25em] [clip-path:inset(0_-30%)]"
    >
      {/* `custom` here reaches the exiting number too, so it always leaves
          in the current direction. */}
      <AnimatePresence initial={false} custom={dir}>
        <motion.span
          key={value}
          aria-hidden
          className="col-start-1 row-start-1 inline-flex"
          custom={dir}
          variants={{
            enter: {},
            center: {},
            exit: (d: 1 | -1) => ({ y: `${d > 0 ? -OUT : OUT}%`, opacity: 0, transition: timing() }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {[...value].map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                enter: { y: `${dir > 0 ? OUT : -OUT}%`, opacity: 0 },
                center: { y: "0%", opacity: 1, transition: timing(0.08 + i * 0.05) },
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
