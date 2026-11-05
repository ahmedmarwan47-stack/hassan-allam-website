"use client";

import { useEffect, useState } from "react";
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

export default function ProjectsHero({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: FilterValue;
  onFilterChange: (v: FilterValue) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
    <section id="projects-hero" data-nav-theme="dark" className="relative">
      {/* ── Mobile layout ── */}
      <div className="relative h-[600px] overflow-hidden md:hidden">
        <MobileProjectMap
          visibleIds={visibleIds}
          onSelect={setSelectedId}
          paused={!!selectedId}
          priority
        />

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
          // The open project's pin stays highlighted (and follows prev/next).
            hoveredId={selectedId ?? hoveredId}
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
