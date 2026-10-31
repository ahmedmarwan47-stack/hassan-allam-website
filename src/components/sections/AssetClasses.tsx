"use client";

import Image from "@/components/ProgressiveImage";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  type MotionStyle,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCarouselCursor } from "@/components/CarouselCursor";
import { withBasePath } from "@/lib/basePath";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import SliderArrow from "@/components/SliderArrow";

/**
 * AssetClasses — Figma node 16988-1390.
 *
 * Desktop: two states bridged by scroll — 5 thumbnails expand into 2 large
 * cards you page through with arrows. The heading and labels keep a fixed
 * size; the cards keep their top edge and grow downward to a 3:2 shape (or
 * taller, to fill the screen). When that outgrows the screen, the whole stage
 * slides up so the cards' bottom edge stays in view.
 * Mobile: a plain fixed-height carousel with arrows (no scroll-driven motion).
 *
 * Each card links to the Projects page pre-filtered by its asset class. The
 * desktop slider uses the shared elastic Drag / Discover cursor and can be
 * dragged as well as stepped with the arrows.
 */

const CARDS = [
  { label: "Residential", src: "/images/residential.jpg", filter: "Residential" },
  { label: "Office Spaces", src: "/images/office.jpg", filter: "Office Space" },
  { label: "Hospitality & Leisure", src: "/images/hospitality.jpg", filter: "Hospitality & Leisure" },
  { label: "Sports & Wellness", src: "/images/sports.jpg", filter: "Sports & Wellness" },
  { label: "Retail", src: "/images/retail.jpg", filter: "Retail" },
];

const projectsHref = (filter: string) =>
  `/projects?filter=${encodeURIComponent(filter)}`;

// Desktop: show 2 cards per viewport when expanded plus a peek of the third,
// so it reads as a slider; one set of cards stretches to TOTAL/VISIBLE x the
// viewport width and each card takes 1/5 of that.
// A second (cloned) set trails the first so the slider loops seamlessly:
// index TOTAL_CARDS looks identical to index 0.
const TOTAL_CARDS = CARDS.length;
const VISIBLE_CARDS = 2.25;
const LOOP_CARDS = [...CARDS, ...CARDS];
const STEP_PERCENT = 100 / LOOP_CARDS.length;
const SLIDE_SPRING = { type: "spring", stiffness: 140, damping: 24 } as const;
const CARD_GAP = 20;
const CARD_RATIO = 3 / 2;
const GROW_RANGE = [0.15, 0.65] as const;

const growProgress = (v: number) =>
  Math.min(1, Math.max(0, (v - GROW_RANGE[0]) / (GROW_RANGE[1] - GROW_RANGE[0])));

export default function AssetClasses() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* ─── Desktop cards: one set's width grows 100% → ~222% so 5 → 2¼ fit
     (doubled for the cloned set) ─── */
  const cardsScaleNum = useTransform(
    scrollYProgress,
    [...GROW_RANGE],
    [200, (2 * TOTAL_CARDS * 100) / VISIBLE_CARDS],
  );
  // +40px: two sets' worth of the trailing card padding (see below).
  const cardsWidth = useMotionTemplate`calc(${cardsScaleNum}% + ${2 * CARD_GAP}px)`;

  /* ─── Desktop card height (px), measured from the layout: it ends at the
     expanded card width / CARD_RATIO, or tall enough to fill the screen,
     and starts at 75% of that (capped so the start state fits on screen).
     `fixedH` is everything in the stage except the card image. ─── */
  const stageRef = useRef<HTMLDivElement>(null);
  const rowBoxRef = useRef<HTMLDivElement>(null);
  const startH = useMotionValue(320);
  const endH = useMotionValue(430);
  const viewportH = useMotionValue(0);
  const fixedH = useMotionValue(0);

  useEffect(() => {
    const stage = stageRef.current;
    const rowBox = rowBoxRef.current;
    if (!stage || !rowBox) return;
    let lastKey = "";
    const measure = () => {
      // Content width only — the box's padding is the full-bleed overhang.
      const cs = getComputedStyle(rowBox);
      const rowW =
        rowBox.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const vh = window.innerHeight;
      // The first card's image frame (the Link's first child).
      const frame = rowBox.querySelector("a")?.firstElementChild as HTMLElement | null;
      if (!rowW || !frame || `${rowW}x${vh}` === lastKey) return;
      lastKey = `${rowW}x${vh}`;
      const fixed = stage.offsetHeight - frame.offsetHeight;
      const fill = vh - fixed;
      const expandedW = (rowW + CARD_GAP) / VISIBLE_CARDS - CARD_GAP;
      const end = Math.max(expandedW / CARD_RATIO, fill);
      fixedH.set(fixed);
      viewportH.set(vh);
      endH.set(end);
      startH.set(Math.min(end * 0.75, fill));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rowBox);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [startH, endH, viewportH, fixedH]);

  const cardH = useTransform(
    [scrollYProgress, startH, endH],
    ([v, s, e]: number[]) => s + (e - s) * growProgress(v),
  );
  const cardHpx = useMotionTemplate`${cardH}px`;
  // Slide the stage up only by however much it overflows the screen.
  const stageY = useTransform(
    [cardH, viewportH, fixedH],
    ([h, vh, f]: number[]) => (vh ? Math.min(0, vh - f - h) : 0),
  );
  // Function form on purpose: the [input, output] form lets framer hand
  // opacity to a native ViewTimeline, which maps this section's offsets
  // wrong and left the rail at ~20% opacity even at the end of the scroll.
  const railOpacity = useTransform(scrollYProgress, (v) =>
    Math.min(1, Math.max(0, (v - 0.4) / 0.2)),
  );

  /* ─── Desktop looping slider: index runs 0..TOTAL_CARDS. Crossing the
     wrap point jumps the track by exactly one set (invisible, even
     mid-animation) before springing to the next card. ─── */
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const trackX = useMotionValue(0);
  const trackXPct = useMotionTemplate`${trackX}%`;

  const slide = useCallback(
    (dir: 1 | -1) => {
      let i = indexRef.current;
      if (dir === 1 && i === TOTAL_CARDS) {
        trackX.jump(trackX.get() + TOTAL_CARDS * STEP_PERCENT);
        i = 0;
      } else if (dir === -1 && i === 0) {
        trackX.jump(trackX.get() - TOTAL_CARDS * STEP_PERCENT);
        i = TOTAL_CARDS;
      }
      i += dir;
      indexRef.current = i;
      setIndex(i);
      animate(trackX, -i * STEP_PERCENT, SLIDE_SPRING);
    },
    [trackX],
  );
  const goPrev = useCallback(() => slide(-1), [slide]);
  const goNext = useCallback(() => slide(1), [slide]);
  const { bind, viewportClass, dragX, cursor } = useCarouselCursor({
    onPrev: goPrev,
    onNext: goNext,
  });
  const activeCard = index % TOTAL_CARDS;

  /* ─── Mobile carousel (1 card per view, arrow-driven, fixed height) ─── */
  const [mIndex, setMIndex] = useState(0);
  const mMax = TOTAL_CARDS - 1;
  const mPrev = useCallback(() => setMIndex((i) => Math.max(0, i - 1)), []);
  const mNext = useCallback(() => setMIndex((i) => Math.min(mMax, i + 1)), [mMax]);

  return (
    <section ref={ref} id="asset-classes" data-nav-theme="light" className="relative md:h-[220vh]">
      {/* ── Mobile layout: fixed-height carousel with arrows ── */}
      <div className="relative flex flex-col overflow-hidden px-6 py-24 md:hidden">
        <Image
          src={withBasePath("/images/section-bg.jpg")}
          alt=""
          aria-hidden
          fill
          unoptimized
          className="pointer-events-none -z-10 select-none object-cover"
        />
        <Reveal className="relative z-10">
          <h2 className="font-serif text-[1.875rem] font-light uppercase leading-[1.1] tracking-[-0.02em] text-black">
            Asset Classes Designed for Future Lifestyles
          </h2>
        </Reveal>

        <div className="relative z-10 mt-8 h-[440px] overflow-hidden">
          <motion.div
            className="flex h-full"
            style={{ width: `${TOTAL_CARDS * 100}%` }}
            animate={{ x: `-${(mIndex / TOTAL_CARDS) * 100}%` }}
            transition={{ type: "spring", stiffness: 140, damping: 24 }}
          >
            {CARDS.map((card) => (
              <Link
                key={card.label}
                href={projectsHref(card.filter)}
                className="flex h-full flex-col"
                style={{ width: `${100 / TOTAL_CARDS}%` }}
              >
                <GrowReveal axis="height" className="relative min-h-0 flex-1 overflow-hidden rounded-[2px]">
                  <Image src={card.src} alt={card.label} fill sizes="90vw" className="object-cover" />
                </GrowReveal>
                <figcaption className="mt-3 shrink-0 font-sans text-base font-medium leading-[1.3] text-black">
                  {card.label}
                </figcaption>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Track + arrows */}
        <div className="relative z-10 mt-6 flex items-center gap-6">
          <div className="relative h-[2px] flex-1 overflow-hidden bg-black/15">
            <motion.div
              className="absolute inset-y-0 bg-black"
              style={{ width: `${100 / TOTAL_CARDS}%` }}
              animate={{ left: `${(mIndex / mMax) * (100 - 100 / TOTAL_CARDS)}%` }}
              transition={{ type: "spring", stiffness: 140, damping: 24 }}
            />
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={mPrev}
              disabled={mIndex === 0}
              aria-label="Previous asset class"
              className="font-sans text-2xl text-black transition-opacity duration-300 disabled:opacity-25"
            >
              &#8592;
            </button>
            <button
              type="button"
              onClick={mNext}
              disabled={mIndex === mMax}
              aria-label="Next asset class"
              className="font-sans text-2xl text-black transition-opacity duration-300 disabled:opacity-25"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>

      {/* ── Desktop layout: scroll-driven expanding carousel ── */}
      <div className="sticky top-0 hidden h-screen overflow-hidden md:block">
        <Image
          src={withBasePath("/images/section-bg.jpg")}
          alt=""
          aria-hidden
          fill
          unoptimized
          priority={false}
          className="pointer-events-none -z-10 select-none object-cover"
        />

        <motion.div
          ref={stageRef}
          style={{ y: stageY }}
          className="relative flex flex-col px-12 pb-10 pt-20 lg:px-16"
        >
          {/* Heading top-right, fixed at 4 lines. */}
          <Reveal className="relative z-10 flex justify-end">
            <h2 className="w-[425px] text-right font-serif text-[62px] font-light uppercase leading-[68px] tracking-[-0.02em] text-black">
              Asset Classes Designed for Future Lifestyles
            </h2>
          </Reveal>

          <div className="relative z-10 mt-10 flex flex-col">
            {/* Full bleed: the negative margin + matching padding lets cards run
                off both screen edges while the first card still lines up with
                the page margin (percent widths resolve against the content box). */}
            <div
              {...bind}
              ref={(el) => {
                rowBoxRef.current = el;
                bind.ref(el);
              }}
              className={`relative -mx-12 overflow-hidden px-12 lg:-mx-16 lg:px-16 ${viewportClass}`}
            >
              <motion.div style={{ x: dragX }}>
              <motion.div
                style={{ width: cardsWidth, x: trackXPct, "--card-h": cardHpx } as MotionStyle}
                className="flex"
              >
                {/* Each card carries its gap as right padding so every slot is
                    exactly STEP_PERCENT wide — the loop jump stays pixel-exact. */}
                {LOOP_CARDS.map((card, i) => {
                  const isClone = i >= TOTAL_CARDS;
                  const image = (
                    <Image
                      src={card.src}
                      alt={isClone ? "" : card.label}
                      fill
                      sizes="(max-width: 768px) 40vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  );
                  const frame = "relative h-[var(--card-h)] w-full shrink-0 overflow-hidden rounded-[2px]";
                  return (
                    <Link
                      key={i}
                      href={projectsHref(card.filter)}
                      aria-hidden={isClone || undefined}
                      tabIndex={isClone ? -1 : undefined}
                      className="group flex min-w-0 flex-1 flex-col pr-5"
                    >
                      {/* Clones skip the entrance reveal: they only scroll into
                          view mid-loop, where a reveal would flash. */}
                      {isClone ? (
                        <div className={frame}>{image}</div>
                      ) : (
                        <GrowReveal axis="height" className={frame}>
                          {image}
                        </GrowReveal>
                      )}
                      <figcaption className="mt-4 font-sans text-[14px] font-medium leading-[1.3] text-black">
                        {card.label}
                      </figcaption>
                    </Link>
                  );
                })}
              </motion.div>
              </motion.div>
            </div>

            {/* Track + arrows */}
            <motion.div style={{ opacity: railOpacity }} className="mt-6 flex items-center gap-6">
              <div className="relative h-[3px] flex-1 overflow-hidden bg-black/20">
                <motion.div
                  animate={{ left: `${(activeCard / TOTAL_CARDS) * 100}%` }}
                  transition={SLIDE_SPRING}
                  style={{ width: `${100 / TOTAL_CARDS}%` }}
                  className="absolute inset-y-0 bg-black"
                />
              </div>
              <div className="flex items-center gap-2.5">
                <SliderArrow direction="prev" onClick={goPrev} emphasis label="Previous asset classes" />
                <SliderArrow direction="next" onClick={goNext} emphasis label="Next asset classes" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {cursor}
    </section>
  );
}
