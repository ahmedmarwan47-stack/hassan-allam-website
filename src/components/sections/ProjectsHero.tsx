"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MAP_PROJECTS,
  MAP_FILTERS,
  type FilterValue,
} from "@/data/mapProjects";
import MapPin from "@/components/MapPin";
import ProjectSidebar from "@/components/ProjectSidebar";
import MapFilterBarMobile from "@/components/MapFilterBarMobile";
import GrowReveal from "@/components/GrowReveal";

export default function ProjectsHero({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: FilterValue;
  onFilterChange: (v: FilterValue) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const mobileMapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = mobileMapRef.current;
    if (!el) return;
    el.scrollLeft = (el.scrollWidth - el.clientWidth) * 0.62;
  }, []);

  // Lock body scroll while the sidebar is open.
  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedId]);

  const hoveredProject = MAP_PROJECTS.find((p) => p.id === hoveredId) ?? null;
  const selectedProject = MAP_PROJECTS.find((p) => p.id === selectedId) ?? null;
  const selectedIndex = selectedProject
    ? MAP_PROJECTS.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const visibleIds = new Set(
    MAP_PROJECTS.filter(
      (p) => activeFilter === "all" || p.category === activeFilter,
    ).map((p) => p.id),
  );

  return (
    <section id="projects-hero" data-nav-theme="dark" className="relative">
      {/* ── Mobile layout ── */}
      <div className="relative h-[600px] overflow-hidden md:hidden">
        <div
          ref={mobileMapRef}
          className="h-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          <div className="relative h-full w-[711px]">
            <GrowReveal axis="width" className="absolute inset-0">
              <Image
                src="/images/map/egypt-map.webp"
                alt="Aerial map of Egypt showing Hassan Allam project locations"
                fill
                className="object-cover"
                sizes="711px"
                priority
              />
            </GrowReveal>
            {MAP_PROJECTS.map((project) => (
              <MapPin
                key={project.id}
                project={project}
                visible={visibleIds.has(project.id)}
                isHovered={hoveredId === project.id}
                onEnter={() => setHoveredId(project.id)}
                onLeave={() => {}}
                onClick={() => setSelectedId(project.id)}
              />
            ))}
          </div>
        </div>

        <span className="pointer-events-none absolute right-6 top-1/2 font-sans text-xs font-medium text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
          Drag to navigate →
        </span>

        <div className="pointer-events-none absolute inset-x-6 bottom-16 min-h-[44px]">
          <AnimatePresence mode="wait">
            {hoveredProject && (
              <motion.div
                key={hoveredProject.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                <p className="font-sans text-lg font-medium leading-tight text-brand-black">
                  {hoveredProject.name}
                </p>
                <p className="font-sans text-sm font-medium leading-tight text-brand-black">
                  {hoveredProject.category}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <MapFilterBarMobile
          activeFilter={activeFilter}
          onFilterChange={onFilterChange}
        />
      </div>

      {/* ── Desktop layout — full viewport, no overflow ── */}
      <div className="relative hidden h-screen w-full overflow-hidden md:block">
        <GrowReveal axis="width" className="absolute inset-0">
          <Image
            src="/images/map/egypt-map.webp"
            alt="Aerial map of Egypt showing Hassan Allam project locations"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </GrowReveal>

        {MAP_PROJECTS.map((project) => (
          <MapPin
            key={project.id}
            project={project}
            visible={visibleIds.has(project.id)}
            isHovered={hoveredId === project.id}
            onEnter={() => setHoveredId(project.id)}
            onLeave={() => setHoveredId(null)}
            onClick={() => setSelectedId(project.id)}
          />
        ))}

        {/* Bottom bar */}
        <div className="absolute bottom-16 left-16 right-16 flex flex-col gap-6">
          <div className="flex items-end justify-between">
            <div className="min-h-[56px]">
              <AnimatePresence mode="wait">
                {hoveredProject && (
                  <motion.div
                    key={hoveredProject.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <p className="font-sans text-[1.625rem] font-medium leading-[1.3] text-brand-black">
                      {hoveredProject.name}
                    </p>
                    <p className="font-sans text-[1.25rem] font-medium leading-[1.1] text-brand-black">
                      {hoveredProject.category}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="font-sans text-[1.25rem] font-medium leading-[1.1] text-brand-black">
              Click a pin to explore
            </p>
          </div>

          <div className="flex h-12 items-center justify-between bg-brand-white px-16">
            <span className="whitespace-nowrap font-sans text-base font-medium text-brand-black">
              Filters
            </span>
            <div className="flex h-full items-center gap-[3.5vw]">
              {MAP_FILTERS.map(({ label, value }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onFilterChange(value)}
                  className={[
                    "relative h-full whitespace-nowrap font-sans text-sm font-medium transition-colors duration-200",
                    activeFilter === value
                      ? "text-brand-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-brand-black"
                      : "text-grey-500 hover:text-brand-black",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sidebar (shared with the homepage map) ── */}
      <ProjectSidebar
        project={selectedProject}
        index={selectedIndex}
        total={MAP_PROJECTS.length}
        onClose={() => setSelectedId(null)}
        onPrev={() => {
          if (selectedIndex < 0) return;
          const next =
            (selectedIndex - 1 + MAP_PROJECTS.length) % MAP_PROJECTS.length;
          setSelectedId(MAP_PROJECTS[next].id);
        }}
        onNext={() => {
          if (selectedIndex < 0) return;
          const next = (selectedIndex + 1) % MAP_PROJECTS.length;
          setSelectedId(MAP_PROJECTS[next].id);
        }}
      />
    </section>
  );
}
