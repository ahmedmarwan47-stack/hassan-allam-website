"use client";

import Image from "@/components/ProgressiveImage";
import Link from "@/components/LocaleLink";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projectHref } from "@/data/projectDetail";
import { LIVE_PROJECTS } from "@/data/hapLive";
import { useCarouselDrag } from "@/components/CarouselDrag";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import SliderArrow from "@/components/SliderArrow";
import { useRtl, useT } from "@/i18n/LocaleProvider";

const FILTERS = ["In The City", "By The Sea"] as const;

// Active-tab colour per group: green for the city, blue for the sea.
const FILTER_ACCENT: Record<(typeof FILTERS)[number], string> = {
  "In The City": "text-success-soft after:bg-success-soft",
  "By The Sea": "text-info after:bg-info",
};

type GalleryProject = { id: string; name: string; src: string };

// The two tabs drive the content: the live projects of each group
// (src/data/hapLive.ts), with their real hero photos.
const GROUPS: Record<(typeof FILTERS)[number], GalleryProject[]> = {
  "In The City": LIVE_PROJECTS.filter((p) => p.group === "city").map((p) => ({
    id: p.slug,
    name: p.name,
    src: p.cover ?? p.thumbnail ?? "/images/image 385.jpg",
  })),
  "By The Sea": LIVE_PROJECTS.filter((p) => p.group === "sea").map((p) => ({
    id: p.slug,
    name: p.name,
    src: p.cover ?? p.thumbnail ?? "/images/image 385.jpg",
  })),
};

export default function ProjectGallery() {
  const t = useT();
  const rtl = useRtl();
  const [activeFilter, setActiveFilter] = useState(0);
  const [index, setIndex] = useState(0);
  // Cards shown per view: 3 on desktop; on phones one card plus the start
  // of the next, so it reads as a carousel.
  const [visible, setVisible] = useState(3);

  const projects = GROUPS[FILTERS[activeFilter]];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setVisible(mq.matches ? 3 : 1.18);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const maxIndex = Math.max(0, Math.ceil(projects.length - visible));
  // The last step lands flush with the end instead of overshooting.
  const offset = Math.min(index, Math.max(0, projects.length - visible));

  // Clamp index when `visible` or the active group changes.
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(
    () => setIndex((i) => Math.min(maxIndex, i + 1)),
    [maxIndex],
  );

  const { bind, viewportClass, dragX } = useCarouselDrag({
    onPrev: goPrev,
    onNext: goNext,
    canPrev: index > 0,
    canNext: index < maxIndex,
    // Free drag: each card carries its 20px gap as padding.
    stepPx: (vp) => vp.querySelector("a")?.offsetWidth ?? 0,
  });

  const handleFilter = (i: number) => {
    setActiveFilter(i);
    setIndex(0);
  };

  return (
    <section
      id="project-gallery"
      data-nav-theme="dark"
      className="flex flex-col bg-brand-black text-brand-white md:h-screen"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-8 px-6 py-20 md:gap-10 md:px-12 md:py-20 lg:px-16">
        {/* Filter bar — single line on every breakpoint */}
        <div className="flex items-center justify-between gap-3 border-b border-white/20">
          <p className="whitespace-nowrap font-sans text-sm font-medium md:text-2xl">
            {t("All Projects")}
          </p>
          <div className="flex items-center gap-5 md:gap-16">
            {FILTERS.map((filter, i) => (
              <button
                key={filter}
                type="button"
                onClick={() => handleFilter(i)}
                className={[
                  "relative whitespace-nowrap py-4 font-sans text-sm font-medium transition-colors duration-200 sm:py-7 md:text-2xl",
                  activeFilter === i
                    ? `after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 ${FILTER_ACCENT[filter]}`
                    : "text-brand-white",
                ].join(" ")}
              >
                {t(filter)}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex min-h-0 flex-1 flex-col gap-8 md:gap-10">
          {/* Heading */}
          <Reveal>
            <h2 className="max-w-[467px] font-serif text-[2rem] font-light uppercase leading-none tracking-[-0.02em] md:text-[2.625rem]">
              {t("Explore our {group} projects", { group: t(FILTERS[activeFilter]) })}
            </h2>
          </Reveal>

          {/* Cards carousel — full bleed: the negative margin + matching
              padding lets cards run off both screen edges while the first
              card still lines up with the page margin (percent widths
              resolve against the content box). */}
          <div
            {...bind}
            className={`relative -mx-6 overflow-hidden px-6 md:-mx-12 md:min-h-0 md:flex-1 md:px-12 lg:-mx-16 lg:px-16 ${viewportClass}`}
          >
            <motion.div style={{ x: dragX }} className="md:h-full">
            <motion.div
              key={activeFilter}
              // RTL: the row starts at the right edge, so it slides rightward.
              animate={{ x: `${rtl ? "" : "-"}${(offset / projects.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 140, damping: 24 }}
              className="flex md:h-full"
              // Each card carries its 20px gap as end padding, so a slot is
              // exactly 1/n of the track and each step lands on the margin.
              style={{
                width: `calc(${(projects.length / visible) * 100}% + ${(projects.length / visible) * 20}px)`,
              }}
            >
              {projects.map((project) => {
                const href = projectHref(project.id);
                return (
                  <Link
                    key={project.id}
                    href={href}
                    className="group flex flex-col gap-5 pe-5 md:h-full"
                    style={{ width: `${100 / projects.length}%` }}
                  >
                    <GrowReveal
                      axis="height"
                      className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] md:aspect-auto md:min-h-0 md:flex-1"
                    >
                      <Image
                        src={project.src}
                        alt={t(project.name)}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 90vw, 33vw"
                      />
                    </GrowReveal>
                    <Reveal delay={0.1} className="shrink-0">
                      <p className="font-sans text-base leading-[1.4] text-brand-white">
                        {t(project.name)}
                      </p>
                    </Reveal>
                  </Link>
                );
              })}
            </motion.div>
            </motion.div>
          </div>

          {/* Progress bar + arrows — same row layout as Asset Classes. */}
          <div className="flex shrink-0 items-center gap-6">
            <div className="relative h-[2px] flex-1 bg-white/15">
              <motion.div
                animate={rtl ? { right: `${(offset / projects.length) * 100}%` } : { left: `${(offset / projects.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 140, damping: 24 }}
                style={{ width: `${(visible / projects.length) * 100}%` }}
                className="absolute inset-y-0 bg-brand-white"
              />
            </div>
            <div className="flex shrink-0 gap-2.5">
              <SliderArrow direction="prev" theme="dark" onClick={goPrev} disabled={index === 0} label="Previous projects" />
              <SliderArrow direction="next" theme="dark" onClick={goNext} disabled={index === maxIndex} label="Next projects" />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
