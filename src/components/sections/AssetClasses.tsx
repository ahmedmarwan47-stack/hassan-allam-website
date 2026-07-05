"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useDiscoverCursor } from "@/components/DiscoverCursor";
import { withBasePath } from "@/lib/basePath";

/**
 * AssetClasses — Figma node 16988-1390.
 *
 * Desktop: two states bridged by scroll — a 4-line heading + 5 thumbnails
 * expand into a 2-line heading + 2 large cards you page through with arrows.
 * Mobile: a plain fixed-height carousel with arrows (no scroll-driven motion).
 *
 * Each card links to the Projects page pre-filtered by its asset class, and
 * hovering a card shows the shared "Discover →" cursor.
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

// Desktop: show 2 cards per viewport when expanded, so the cards container
// stretches to 2.5x viewport width and each card takes 1/5 of that.
const VISIBLE_CARDS = 2;
const TOTAL_CARDS = CARDS.length;
const MAX_INDEX = TOTAL_CARDS - VISIBLE_CARDS; // 3 → positions 0..3

export default function AssetClasses() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const { bind, hoverClass, cursor } = useDiscoverCursor();

  /* ─── Desktop heading: size + width animate so it flows 4 → 2 lines ─── */
  const headingPxNum = useTransform(scrollYProgress, [0.1, 0.6], [62, 42]);
  const headingLhNum = useTransform(scrollYProgress, [0.1, 0.6], [68, 46]);
  const headingWNum = useTransform(scrollYProgress, [0.1, 0.6], [425, 605]);
  const headingPx = useMotionTemplate`${headingPxNum}px`;
  const headingLh = useMotionTemplate`${headingLhNum}px`;
  const headingW = useMotionTemplate`${headingWNum}px`;

  /* ─── Desktop cards: container width grows 100% → 250% so 5 → 2 fit ─── */
  const cardsScaleNum = useTransform(scrollYProgress, [0.15, 0.65], [100, 250]);
  const cardsWidth = useMotionTemplate`${cardsScaleNum}%`;
  const labelPxNum = useTransform(scrollYProgress, [0.15, 0.65], [14, 26]);
  const labelPx = useMotionTemplate`${labelPxNum}px`;
  const railOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  /* ─── Carousel index (shared by desktop expanded state + mobile) ─── */
  const [index, setIndex] = useState(0);
  const stepPercent = 100 / TOTAL_CARDS;

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(
    () => setIndex((i) => Math.min(MAX_INDEX, i + 1)),
    [],
  );

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
        <h2 className="relative z-10 font-serif text-[1.875rem] font-light uppercase leading-[1.1] tracking-[-0.02em] text-black">
          Asset Classes Designed for Future Lifestyles
        </h2>

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
                <div className="relative min-h-0 flex-1 overflow-hidden rounded-[2px] bg-grey-300">
                  <Image src={card.src} alt={card.label} fill sizes="90vw" className="object-cover" />
                </div>
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
      <div className="sticky top-0 hidden h-screen flex-col overflow-hidden px-6 py-14 md:flex md:px-12 md:py-20 lg:px-16">
        <Image
          src={withBasePath("/images/section-bg.jpg")}
          alt=""
          aria-hidden
          fill
          unoptimized
          priority={false}
          className="pointer-events-none -z-10 select-none object-cover"
        />

        {/* Heading top-right, wrapping 4 → 2 lines. */}
        <div className="relative z-10 flex justify-end">
          <motion.h2
            style={{ fontSize: headingPx, lineHeight: headingLh, width: headingW }}
            className="origin-top-right text-right font-serif font-light uppercase tracking-[-0.02em] text-black"
          >
            Asset Classes Designed for Future Lifestyles
          </motion.h2>
        </div>

        <div className="relative z-10 mt-6 flex min-h-0 flex-1 flex-col md:mt-10">
          <div className="relative flex-1 min-h-0 overflow-hidden">
            <motion.div
              style={{ width: cardsWidth }}
              animate={{ x: `-${index * stepPercent}%` }}
              transition={{ type: "spring", stiffness: 140, damping: 24 }}
              className="flex h-full gap-3 md:gap-5"
            >
              {CARDS.map((card) => (
                <Link
                  key={card.label}
                  href={projectsHref(card.filter)}
                  {...bind}
                  className={`group flex h-full min-w-0 flex-1 flex-col ${hoverClass}`}
                >
                  <div className="relative w-full flex-1 min-h-0 overflow-hidden rounded-[2px] bg-grey-300">
                    <Image
                      src={card.src}
                      alt={card.label}
                      fill
                      sizes="(max-width: 768px) 40vw, 50vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <motion.figcaption
                    style={{ fontSize: labelPx }}
                    className="mt-3 origin-left font-sans font-medium leading-[1.3] text-black md:mt-4"
                  >
                    {card.label}
                  </motion.figcaption>
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Track + arrows */}
          <motion.div style={{ opacity: railOpacity }} className="mt-6 flex items-center gap-6 md:mt-8">
            <div className="relative h-[2px] flex-1 overflow-hidden bg-black/15">
              <motion.div
                animate={{
                  left: `${(index / MAX_INDEX) * (100 - (VISIBLE_CARDS / TOTAL_CARDS) * 100)}%`,
                }}
                transition={{ type: "spring", stiffness: 140, damping: 24 }}
                style={{ width: `${(VISIBLE_CARDS / TOTAL_CARDS) * 100}%` }}
                className="absolute inset-y-0 bg-black"
              />
            </div>
            <div className="flex items-center gap-5">
              <button
                type="button"
                onClick={goPrev}
                disabled={index === 0}
                aria-label="Previous asset classes"
                className="font-sans text-2xl text-black transition-opacity duration-300 disabled:opacity-25"
              >
                &#8592;
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={index === MAX_INDEX}
                aria-label="Next asset classes"
                className="font-sans text-2xl text-black transition-opacity duration-300 disabled:opacity-25"
              >
                &#8594;
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {cursor}
    </section>
  );
}
