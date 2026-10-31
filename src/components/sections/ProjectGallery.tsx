"use client";

import Image from "@/components/ProgressiveImage";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projectHref } from "@/data/projectDetail";
import { useCarouselCursor } from "@/components/CarouselCursor";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import SliderArrow from "@/components/SliderArrow";

const FILTERS = ["In The City", "By The Sea"] as const;

// Active-tab colour per group: green for the city, blue for the sea.
const FILTER_ACCENT: Record<(typeof FILTERS)[number], string> = {
  "In The City": "text-success-soft after:bg-success-soft",
  "By The Sea": "text-info after:bg-info",
};

type GalleryProject = { id: string; name: string; src: string };

// The two tabs now drive the content, matching the heading. The first card in
// each group links to a real project-detail page; the rest follow the site
// convention of dead links until their pages are built.
const GROUPS: Record<(typeof FILTERS)[number], GalleryProject[]> = {
  "In The City": [
    { id: "swanlake-residences", name: "Swanlake Residences", src: "/images/map/slg.jpg" },
    { id: "swanlake-west", name: "Swanlake West", src: "/images/image 398.jpg" },
    { id: "parkview", name: "Parkview", src: "/images/image 399.jpg" },
    { id: "swanlake-katameya", name: "Swanlake Katameya", src: "/images/image 400.jpg" },
    { id: "seasons-city", name: "Seasons Residences", src: "/images/image 401.jpg" },
  ],
  // Matches the live site (hap.com.eg) — covers from its media library.
  "By The Sea": [
    { id: "swanlake-residences-sea", name: "SwanLake El Gouna", src: "/images/by-the-sea/swanlake-el-gouna.jpg" },
    { id: "swanlake-north-coast", name: "SwanLake North Coast", src: "/images/by-the-sea/swanlake-north-coast.jpg" },
    { id: "little-venice-ain-sokhna", name: "Little Venice Ain Sokhna", src: "/images/by-the-sea/little-venice-ain-sokhna.jpg" },
    { id: "encore-swanlake-el-gouna", name: "Encore SwanLake El Gouna", src: "/images/by-the-sea/encore-swanlake-el-gouna.jpg" },
  ],
};

export default function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [index, setIndex] = useState(0);
  // Cards shown per view: 1 on mobile, 3 on desktop.
  const [visible, setVisible] = useState(3);

  const projects = GROUPS[FILTERS[activeFilter]];

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setVisible(mq.matches ? 3 : 1);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const maxIndex = Math.max(0, projects.length - visible);

  // Clamp index when `visible` or the active group changes.
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(
    () => setIndex((i) => Math.min(maxIndex, i + 1)),
    [maxIndex],
  );

  const { bind, viewportClass, dragX, cursor } = useCarouselCursor({
    onPrev: goPrev,
    onNext: goNext,
    canPrev: index > 0,
    canNext: index < maxIndex,
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
            All (11)
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
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex min-h-0 flex-1 flex-col gap-8 md:gap-10">
          {/* Heading */}
          <Reveal>
            <h2 className="max-w-[467px] font-serif text-[2rem] font-light uppercase leading-none tracking-[-0.02em] md:text-[2.625rem]">
              Explore our {FILTERS[activeFilter]} projects
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
              animate={{ x: `-${(index / projects.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 140, damping: 24 }}
              className="flex md:h-full"
              // Each card carries its 20px gap as right padding, so a slot is
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
                    className="group flex flex-col gap-5 pr-5 md:h-full"
                    style={{ width: `${100 / projects.length}%` }}
                  >
                    <GrowReveal
                      axis="height"
                      className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] md:aspect-auto md:min-h-0 md:flex-1"
                    >
                      <Image
                        src={project.src}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 768px) 90vw, 33vw"
                      />
                    </GrowReveal>
                    <Reveal delay={0.1} className="shrink-0">
                      <p className="font-sans text-base leading-[1.4] text-brand-white">
                        {project.name}
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
                animate={{ left: `${(index / projects.length) * 100}%` }}
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

      {cursor}
    </section>
  );
}
