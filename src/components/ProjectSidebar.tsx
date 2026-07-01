"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MapProject } from "@/data/mapProjects";
import { PROJECT_DETAILS } from "@/data/projectDetail";

/**
 * ProjectSidebar — the slide-in panel that opens when a map pin is clicked.
 * Shared by the Projects page hero and the homepage "Discover our projects"
 * map, so any change here lands in both. Works full-width on mobile.
 */
export default function ProjectSidebar({
  project,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  project: MapProject | null;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const progress = total > 0 && index >= 0 ? ((index + 1) / total) * 100 : 0;

  // Link to the built detail page when it exists, otherwise fall back to the
  // projects listing filtered by this project's category (never a dead link).
  const detailHref = project
    ? PROJECT_DETAILS[project.id]
      ? `/projects/${project.id}`
      : `/projects?filter=${encodeURIComponent(project.category)}`
    : "#";

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={onClose}
          />
          <motion.aside
            key="project-sidebar"
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-[500px] flex-col bg-brand-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Close row — just the X icon, on the left. */}
            <div className="flex items-center px-[30px] pt-[30px]">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-brand-black transition-opacity duration-200 hover:opacity-60"
              >
                <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            {/* Divider above the photo, per Figma. */}
            <div className="mx-[30px] mt-[20px] h-px bg-grey-300" />

            {/* Scrollable middle: photo carousel + name + category + description.
                Children are absolutely stacked + crossfaded so prev/next swaps
                with no exit-enter "jump". */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false}>
                <motion.div
                  key={project.id}
                  className="absolute inset-0 flex flex-col overflow-y-auto px-[30px] pb-[30px] pt-[30px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                >
                  <SidebarCarousel images={project.images} name={project.name} />
                  <div className="mt-6">
                    <h3 className="font-serif text-[2.75rem] font-light leading-[1.1] tracking-[-0.02em] text-brand-black">
                      {project.name}
                    </h3>
                    <p className="mt-1 font-sans text-base font-medium text-brand-black">
                      {project.category}
                    </p>
                  </div>
                  <p className="mt-12 font-sans text-base font-medium leading-[1.4] text-brand-black">
                    {project.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer: Discover link + progress + arrows. */}
            <div className="flex flex-col gap-4 px-[30px] pb-[30px] pt-4">
              <Link
                href={detailHref}
                className="inline-flex items-center gap-2 self-start font-sans text-lg font-medium text-brand-black transition-opacity duration-200 hover:opacity-60"
              >
                Discover
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 11L11 3M11 3H4M11 3V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <div className="flex items-center gap-6">
                <div className="relative h-px flex-1 bg-grey-300">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-brand-black"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onPrev}
                    aria-label="Previous project"
                    className="font-sans text-xl leading-none text-brand-black transition-opacity duration-200 hover:opacity-60"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    aria-label="Next project"
                    className="font-sans text-xl leading-none text-brand-black transition-opacity duration-200 hover:opacity-60"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * A smooth photo carousel for the sidebar hero — crossfades between the
 * project's photos, auto-advances, and supports dot navigation + swipe.
 */
function SidebarCarousel({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  const go = (n: number) => setI((v) => (v + n + images.length) % images.length);

  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % images.length), 4500);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div className="relative aspect-[440/390] w-full overflow-hidden rounded-[2px] bg-grey-100">
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(1);
            else if (info.offset.x > 60) go(-1);
          }}
        >
          <Image
            src={images[i]}
            alt={name}
            fill
            sizes="500px"
            quality={95}
            className="pointer-events-none select-none object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, d) => (
          <button
            key={d}
            type="button"
            onClick={() => setI(d)}
            aria-label={`Show photo ${d + 1}`}
            className={`h-1.5 rounded-full bg-white shadow transition-all duration-300 ${
              d === i ? "w-5" : "w-1.5 opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
