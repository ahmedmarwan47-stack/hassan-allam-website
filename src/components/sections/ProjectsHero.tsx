"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MAP_PROJECTS,
  MAP_FILTERS,
  type FilterValue,
} from "@/data/mapProjects";
import { PIN_COLORS } from "@/components/MapPin";
import MapStage, {
  centerMobileMapOnCairo,
  MOBILE_MAP_FOCUS,
  MOBILE_MAP_W_CLASS,
  MOBILE_MAP_ZOOM,
} from "@/components/MapStage";
import ProjectSidebar from "@/components/ProjectSidebar";
import MapFilterBarMobile from "@/components/MapFilterBarMobile";

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
    centerMobileMapOnCairo(el);
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
          <div className={`relative h-full ${MOBILE_MAP_W_CLASS} overflow-hidden`}>
            <MapStage
              zoom={MOBILE_MAP_ZOOM}
              focus={MOBILE_MAP_FOCUS}
              visibleIds={visibleIds}
              hoveredId={hoveredId}
              onHover={(id) => id && setHoveredId(id)}
              onSelect={setSelectedId}
              priority
            />
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
        <MapStage
          zoom={120}
          focus={{ x: 48, y: 50 }}
          visibleIds={visibleIds}
          hoveredId={hoveredId}
          onHover={setHoveredId}
          onSelect={setSelectedId}
          priority
        />

        {/* Bottom bar */}
        <div className="absolute bottom-16 left-16 right-16 flex flex-col gap-6">
          <div className="flex h-12 items-center justify-between bg-brand-white px-16">
            <div className="flex items-center gap-8">
              <span className="whitespace-nowrap font-sans text-base font-medium text-brand-black">
                Filters
              </span>
              {/* Pin colour legend — same as the homepage map. */}
              <div className="flex items-center gap-5 font-sans text-sm font-medium text-grey-500">
                {(["city", "sea"] as const).map((setting) => (
                  <span key={setting} className="flex items-center gap-2 whitespace-nowrap">
                    <span
                      aria-hidden
                      className="size-2.5 rounded-full"
                      style={{ background: PIN_COLORS[setting], boxShadow: `0 0 6px ${PIN_COLORS[setting]}` }}
                    />
                    {setting === "city" ? "In the City" : "By the Sea"}
                  </span>
                ))}
              </div>
            </div>
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
