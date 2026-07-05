"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PROJECT_DETAILS } from "@/data/projectDetail";
import { useDiscoverCursor } from "@/components/DiscoverCursor";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";

const FILTERS = ["In The City", "By The Sea"] as const;

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
  "By The Sea": [
    { id: "swanlake-residences-sea", name: "Swanlake Residences El Gouna", src: "/images/map/slg.jpg" },
    { id: "seasons-sea", name: "Seasons Residences", src: "/images/image 402.jpg" },
    { id: "swanlake-october-sea", name: "Swanlake October", src: "/images/hospitality.jpg" },
  ],
};

export default function ProjectGallery() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [index, setIndex] = useState(0);
  // Cards shown per view: 1 on mobile, 3 on desktop.
  const [visible, setVisible] = useState(3);

  const { bind, hoverClass, cursor } = useDiscoverCursor();

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
                    ? "text-success-soft after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-success-soft"
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
          {/* Heading + arrows */}
          <div className="flex items-end justify-between gap-4">
            <Reveal>
              <h2 className="max-w-[467px] font-serif text-[2rem] font-light uppercase leading-none tracking-[-0.02em] md:text-[2.625rem]">
                Explore our {FILTERS[activeFilter]} projects
              </h2>
            </Reveal>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={goPrev}
                disabled={index === 0}
                aria-label="Previous projects"
                className="flex size-12 items-center justify-center rounded-[2px] border border-white/20 font-sans text-xl text-brand-white transition-opacity disabled:opacity-25 md:size-[54px]"
              >
                ←
              </button>
              <button
                type="button"
                onClick={goNext}
                disabled={index === maxIndex}
                aria-label="Next projects"
                className="flex size-12 items-center justify-center rounded-[2px] border border-white/20 font-sans text-xl text-brand-white transition-opacity disabled:opacity-25 md:size-[54px]"
              >
                →
              </button>
            </div>
          </div>

          {/* Cards carousel */}
          <div className="relative overflow-hidden md:min-h-0 md:flex-1">
            <motion.div
              key={activeFilter}
              animate={{ x: `-${(index / projects.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 140, damping: 24 }}
              className="flex gap-5 md:h-full"
              style={{ width: `${(projects.length / visible) * 100}%` }}
            >
              {projects.map((project) => {
                const href = PROJECT_DETAILS[project.id]
                  ? `/projects/${project.id}`
                  : "#";
                return (
                  <Link
                    key={project.id}
                    href={href}
                    {...bind}
                    className={`group flex flex-col gap-5 md:h-full ${hoverClass}`}
                    style={{ width: `${100 / projects.length}%` }}
                  >
                    <GrowReveal
                      axis="height"
                      className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-grey-300 md:aspect-auto md:min-h-0 md:flex-1"
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
          </div>

          {/* Progress bar */}
          <div className="relative h-[2px] w-full shrink-0 bg-white/15">
            <motion.div
              animate={{ left: `${(index / projects.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 140, damping: 24 }}
              style={{ width: `${(visible / projects.length) * 100}%` }}
              className="absolute inset-y-0 bg-brand-white"
            />
          </div>
        </div>
      </div>

      {cursor}
    </section>
  );
}
