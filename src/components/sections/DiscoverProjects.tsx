"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
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
import { Reveal } from "@/components/Reveal";

// Homepage "Discover our projects in Egypt" — the interactive map. Shares its
// pins, sidebar and mobile filter bar with the Projects page hero.
export default function DiscoverProjects() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Desktop parallax: the map (with its pins, so they stay on their spots)
  // drifts slowly while the paragraph scrolls up over it much faster.
  // Function-form transforms on purpose — the array form can be handed to a
  // native ScrollTimeline, which mis-maps element offsets.
  const desktopRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: desktopRef,
    offset: ["start end", "end start"],
  });
  const mapY = useTransform(scrollYProgress, (v) => `${(v - 0.5) * 11}%`);
  const headingY = useTransform(scrollYProgress, (v) => (v - 0.5) * -160);
  const paragraphY = useTransform(scrollYProgress, (v) => (v - 0.5) * -1200);

  // Centre the (wider-than-viewport) mobile map on the project cluster on mount.
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
    <section id="discover-projects" data-nav-theme="dark" className="relative">
      {/* ── Mobile layout: immersive map (scroll/drag to navigate) ── */}
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
            />
          </div>
        </div>

        {/* Heading + subtitle over the blue sky area */}
        <div className="pointer-events-none absolute inset-x-0 top-0 px-6 pt-20">
          <Reveal>
            <h2 className="font-serif text-[1.875rem] font-light uppercase leading-[1.05] tracking-[-0.02em] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
              Discover our projects in Egypt
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-3 max-w-[260px] font-serif text-[0.8rem] font-medium uppercase leading-tight tracking-[-0.02em] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.35)]">
              Choose between In The City and By The Sea to discover current and
              upcoming projects tailored to your preferences.
            </p>
          </Reveal>
        </div>

        {/* Drag hint */}
        <span className="pointer-events-none absolute right-6 top-1/2 font-sans text-xs font-medium text-white/80 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
          Drag to navigate →
        </span>

        {/* Hovered project label */}
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
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* ── Desktop layout: interactive aspect-ratio map ── */}
      <div ref={desktopRef} className="relative hidden aspect-[1440/1214] overflow-hidden md:block">
        {/* Map, clouds + pins — one parallax layer, scaled up so its edges
            never show while it drifts. */}
        <motion.div className="absolute inset-0 scale-[1.12]" style={{ y: mapY }}>
          <MapStage
            zoom={125}
            // Coast sits below the heading and paragraph, El Gouna still in view.
            focus={{ x: 50, y: 41 }}
            visibleIds={visibleIds}
            hoveredId={hoveredId}
            onHover={setHoveredId}
            onSelect={setSelectedId}
            priority
          />
        </motion.div>

        {/* Heading — top right, over the blue sky area */}
        <motion.div
          className="pointer-events-none absolute"
          style={{ left: "50.4%", top: "14.3%", width: "32%", y: headingY }}
        >
        <Reveal>
          <h2
            className="font-serif font-light uppercase leading-[1.1] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(2rem, 4.3vw, 3.875rem)" }}
          >
            Discover our projects in Egypt
          </h2>
        </Reveal>
        </motion.div>

        {/* Subtitle — scrolls up over the map faster than the page. */}
        <motion.div
          className="pointer-events-none absolute z-20"
          style={{ left: "4rem", top: "28%", width: "26%", y: paragraphY }}
        >
        <Reveal delay={0.12}>
          <p
            className="font-serif font-medium uppercase leading-none tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.375rem)" }}
          >
            Choose between In The City and By The Sea to discover current and
            upcoming projects tailored to your preferences using two intuitive
            filters.
          </p>
        </Reveal>
        </motion.div>

        {/* Bottom bar */}
        <div className="absolute bottom-16 left-16 right-16 flex flex-col gap-6">
          {/* Filter bar */}
          <div className="flex h-12 items-center justify-between bg-brand-white px-16">
            <div className="flex items-center gap-8">
              <span className="whitespace-nowrap font-sans text-base font-medium text-brand-black">
                Filters
              </span>
              {/* Pin colour legend */}
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
                  onClick={() => setActiveFilter(value)}
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

      {/* ── Sidebar (shared with the Projects page map) ── */}
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
