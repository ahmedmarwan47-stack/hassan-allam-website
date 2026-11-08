"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MAP_PROJECTS,
  MAP_FILTERS,
  type FilterValue,
} from "@/data/mapProjects";
import { PIN_COLORS } from "@/components/MapPin";
import MapStage from "@/components/MapStage";
import MobileProjectMap from "@/components/MobileProjectMap";
import ProjectSidebar from "@/components/ProjectSidebar";
import MapFilterBarMobile from "@/components/MapFilterBarMobile";
import { useT } from "@/i18n/LocaleProvider";
import RiseWords from "@/components/RiseWords";

// Homepage "Discover our projects in Egypt" — the interactive map. Shares its
// pins, sidebar and mobile filter bar with the Projects page hero.
export default function DiscoverProjects() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const t = useT();
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

  // Lock body scroll while the sidebar is open.
  useEffect(() => {
    document.body.style.overflow = selectedId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedId]);

  const selectedProject = MAP_PROJECTS.find((p) => p.id === selectedId) ?? null;
  const selectedIndex = selectedProject
    ? MAP_PROJECTS.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const visibleIds = new Set(
    MAP_PROJECTS.filter(
      (p) => activeFilter === "all" || p.categories.includes(activeFilter),
    ).map((p) => p.id),
  );

  return (
    <section id="discover-projects" data-nav-theme="dark" className="relative">
      {/* ── Mobile layout: heading on a black band, then the immersive map
           (scroll/drag to navigate) left clear for the pins ── */}
      <div className="bg-brand-black px-6 pb-8 pt-20 text-white md:hidden">
        <h2 data-no-fx="" className="font-serif text-[2rem] font-light uppercase leading-[1.05] tracking-[-0.02em]">
          <RiseWords text={t("Discover our projects in Egypt")} />
        </h2>
        <p data-no-fx="" className="mt-4 font-sans text-sm leading-[1.5] text-white/70">
          <RiseWords
            text={t("Choose between In The City and By The Sea to discover current and upcoming projects tailored to your preferences.")}
            delay={350}
            stagger={18}
            duration={800}
          />
        </p>
      </div>
      <div className="relative h-[560px] overflow-hidden md:hidden">
        <MobileProjectMap
          visibleIds={visibleIds}
          onSelect={setSelectedId}
          paused={!!selectedId}
        />

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
            // The open project's pin stays highlighted (and follows prev/next).
            hoveredId={selectedId ?? hoveredId}
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
        <h2
          data-no-fx=""
          className="font-serif font-light uppercase leading-[1.1] tracking-[-0.02em] text-white"
          style={{ fontSize: "clamp(2rem, 4.3vw, 3.875rem)" }}
        >
          <RiseWords text={t("Discover our projects in Egypt")} stagger={60} duration={1000} />
        </h2>
        </motion.div>

        {/* Subtitle — scrolls up over the map faster than the page. */}
        <motion.div
          className="pointer-events-none absolute z-20"
          style={{ left: "4rem", top: "28%", width: "26%", y: paragraphY }}
        >
        <p
          data-no-fx=""
          className="font-serif font-medium uppercase leading-[1.15] tracking-[-0.02em] text-white"
          style={{ fontSize: "clamp(0.875rem, 1.5vw, 1.375rem)" }}
        >
          <RiseWords
            text={t("Choose between In The City and By The Sea to discover current and upcoming projects tailored to your preferences using two intuitive filters.")}
            delay={400}
            stagger={22}
            duration={850}
          />
        </p>
        </motion.div>

        {/* Bottom bar */}
        <div className="absolute bottom-16 left-16 right-16 flex flex-col gap-6">
          {/* Filter bar */}
          <div className="flex h-12 items-center justify-between bg-brand-white px-16">
            <div className="flex items-center gap-8">
              <span className="whitespace-nowrap font-sans text-base font-medium text-brand-black">
                {t("Filters")}
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
                    {setting === "city" ? t("In the City") : t("By the Sea")}
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
                  {value === "all"
                    ? t("All projects ({count})", { count: MAP_PROJECTS.length })
                    : t(label)}
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
