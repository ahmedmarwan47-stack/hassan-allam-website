"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECT_DETAILS } from "@/data/projectDetail";
import { useDiscoverCursor } from "@/components/DiscoverCursor";
import GrowReveal from "@/components/GrowReveal";
import type { Category } from "@/data/mapProjects";

interface ProjectCard {
  id: string;
  name: string;
  /** Asset classes shown under the card / beside the list row. */
  tags: Category[];
  image: string;
  /** Grid span. */
  span: "third" | "half" | "full";
  /** Which community group it belongs to. */
  group: "city" | "sea";
}

// Card-tag wording from Figma (Asset classes 17043:545) — longer than the
// map filter labels.
const TAG_LABEL: Record<Category, string> = {
  Residential: "Residential",
  "Hospitality & Leisure": "Hospitality and Leisure",
  Retail: "Curated Retail & Dining",
  "Office Space": "Office Space",
  "Sports & Wellness": "Sports and Wellness",
};

// Tag mix per project mirrors the Figma grid + list variants.
const PROJECTS: ProjectCard[] = [
  // In The City — 6 projects (3 thirds + 2 halves + 1 full)
  { id: "swanlake-west", name: "Swanlake West", tags: ["Residential", "Sports & Wellness"], image: "/images/map/slw.jpg", span: "third", group: "city" },
  { id: "parkview", name: "Parkview", tags: ["Residential"], image: "/images/map/slo19.jpg", span: "third", group: "city" },
  { id: "swanlake-katameya", name: "Swanlake Katameya", tags: ["Residential", "Retail", "Sports & Wellness"], image: "/images/map/slk10.jpg", span: "third", group: "city" },
  { id: "seasons-city", name: "Seasons Residences", tags: ["Residential", "Hospitality & Leisure"], image: "/images/map/seasons.jpg", span: "half", group: "city" },
  { id: "swanlake-residences", name: "Swanlake Residences", tags: ["Residential", "Hospitality & Leisure", "Retail", "Office Space", "Sports & Wellness"], image: "/images/map/slg.jpg", span: "half", group: "city" },
  { id: "swanlake-october", name: "Swanlake October", tags: ["Residential", "Office Space"], image: "/images/residential.jpg", span: "full", group: "city" },

  // By The Sea — 3 projects (2 halves + 1 full)
  { id: "swanlake-residences-sea", name: "Swanlake El Gouna", tags: ["Residential", "Hospitality & Leisure"], image: "/images/map/slg.jpg", span: "half", group: "sea" },
  { id: "swanlake-northcoast", name: "Swanlake Northcoast", tags: ["Residential", "Hospitality & Leisure", "Sports & Wellness"], image: "/images/hospitality.jpg", span: "half", group: "sea" },
  { id: "little-venice", name: "Little Venice", tags: ["Residential"], image: "/images/sports.jpg", span: "full", group: "sea" },
];

/** Grey tag row with hairline dividers — Figma "Frame 2147227667". */
function TagList({ tags }: { tags: Category[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-[7px] gap-y-0.5 font-sans text-[11px] leading-[1.4] text-grey-500 md:text-xs">
      {tags.map((tag, i) => (
        <li key={tag} className="flex items-center gap-[7px]">
          {i > 0 && <span aria-hidden className="h-3.5 w-px bg-grey-300" />}
          {TAG_LABEL[tag]}
        </li>
      ))}
    </ul>
  );
}

type View = "grid" | "list";

export default function AllProjects({
  activeFilter = "all",
}: {
  activeFilter?: "all" | Category;
}) {
  const [view, setView] = useState<View>("grid");
  const { bind, hoverClass, cursor } = useDiscoverCursor();

  const cityProjects = PROJECTS.filter(
    (p) => p.group === "city" && (activeFilter === "all" || p.tags.includes(activeFilter)),
  );
  const seaProjects = PROJECTS.filter(
    (p) => p.group === "sea" && (activeFilter === "all" || p.tags.includes(activeFilter)),
  );

  const filterLabel = activeFilter === "all" ? "All Projects" : activeFilter;

  return (
    <section
      id="all-projects"
      data-nav-theme="light"
      className="relative bg-brand-white text-brand-black"
    >
      {/* ── Intro ── */}
      <div className="px-6 pb-12 pt-16 md:px-16 md:pb-20 md:pt-20">
        <p className="font-sans text-sm font-medium uppercase leading-none tracking-[0.04em] text-brand-black md:text-base">
          {filterLabel}
        </p>
        <p className="mt-10 max-w-[857px] font-serif font-light uppercase leading-[1.2] tracking-[-0.02em] [font-size:clamp(1.5rem,3vw,2.625rem)] md:mt-14">
          Our refined expertise lies in the art of designing and transforming
          living spaces, from elegant residences to exclusive coastal
          destinations, from visionary neighborhoods to established communities.
        </p>
      </div>

      {/* ── In The City — cards reveal by growing in HEIGHT on scroll ── */}
      {cityProjects.length > 0 && (
        <CommunitySection
          number="01"
          title="Our Communities"
          subtitle="In The City"
          revealAxis="height"
          view={view}
          onViewChange={setView}
          projects={cityProjects}
          bind={bind}
          hoverClass={hoverClass}
        />
      )}

      {cityProjects.length > 0 && seaProjects.length > 0 && (
        <hr className="m-0 h-px w-full border-0 bg-grey-300" />
      )}

      {/* ── By The Sea — cards reveal by growing in WIDTH on scroll ── */}
      {seaProjects.length > 0 && (
        <CommunitySection
          number="02"
          title="Our Communities"
          subtitle="By The Sea"
          revealAxis="width"
          view={view}
          onViewChange={setView}
          projects={seaProjects}
          bind={bind}
          hoverClass={hoverClass}
        />
      )}

      {cursor}
    </section>
  );
}

function CommunitySection({
  number,
  title,
  subtitle,
  revealAxis,
  view,
  onViewChange,
  projects,
  bind,
  hoverClass,
}: {
  number: string;
  title: string;
  subtitle: string;
  revealAxis: "height" | "width";
  view: View;
  onViewChange: (v: View) => void;
  projects: ProjectCard[];
  bind: Record<string, unknown>;
  hoverClass: string;
}) {
  const count = projects.length;

  return (
    <div className="px-6 py-16 md:px-16 md:py-20">
      {/* Section header */}
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between md:gap-6">
        <span className="flex size-[54px] items-center justify-center rounded-[2px] border border-brand-black/15 font-sans text-base font-medium text-brand-black">
          {String(count).padStart(2, "0")}
        </span>

        <h3 className="font-sans font-medium uppercase leading-[1.1] tracking-[0.01em] text-brand-black [font-size:clamp(1.5rem,2.6vw,2rem)] md:text-center">
          {title}
          <br />
          {subtitle}
        </h3>

        <ViewToggle view={view} onChange={onViewChange} />
      </div>

      {/* Body */}
      <div className="mt-12 md:mt-16">
        <AnimatePresence mode="wait">
          {view === "grid" ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <GridView
                projects={projects}
                revealAxis={revealAxis}
                bind={bind}
                hoverClass={hoverClass}
              />
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <ListView projects={projects} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ViewToggle({
  view,
  onChange,
}: {
  view: View;
  onChange: (v: View) => void;
}) {
  return (
    <div className="flex items-center gap-8 md:gap-10">
      <button
        type="button"
        onClick={() => onChange("grid")}
        className={[
          "relative font-sans text-base font-medium uppercase tracking-[0.02em] transition-colors duration-200 md:text-lg",
          view === "grid"
            ? "text-brand-black after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-px after:bg-brand-black"
            : "text-grey-500 hover:text-brand-black",
        ].join(" ")}
      >
        Grid
      </button>
      <button
        type="button"
        onClick={() => onChange("list")}
        className={[
          "relative font-sans text-base font-medium uppercase tracking-[0.02em] transition-colors duration-200 md:text-lg",
          view === "list"
            ? "text-brand-black after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-px after:bg-brand-black"
            : "text-grey-500 hover:text-brand-black",
        ].join(" ")}
      >
        List
      </button>
    </div>
  );
}

// ─── Grid view ───────────────────────────────────────────────────────────────
// Mobile shows 2 cards per row; desktop keeps the asymmetric 6-col layout.
function GridView({
  projects,
  revealAxis,
  bind,
  hoverClass,
}: {
  projects: ProjectCard[];
  revealAxis: "height" | "width";
  bind: Record<string, unknown>;
  hoverClass: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-6 md:gap-x-5 md:gap-y-12">
      {projects.map((p, i) => {
        const colSpan =
          p.span === "third"
            ? "md:col-span-2"
            : p.span === "half"
              ? "md:col-span-3"
              : "col-span-2 md:col-span-6";
        // Slightly shorter than before so the cards stop overshooting the viewport.
        const aspect =
          p.span === "third"
            ? "aspect-[3/4] md:aspect-[424/500]"
            : p.span === "half"
              ? "aspect-[3/4] md:aspect-[646/740]"
              : "aspect-[4/3] md:aspect-[1312/720]";
        const sizes =
          p.span === "third"
            ? "(min-width: 768px) 33vw, 50vw"
            : p.span === "half"
              ? "(min-width: 768px) 50vw, 50vw"
              : "100vw";
        const href = PROJECT_DETAILS[p.id] ? `/projects/${p.id}` : "#";
        return (
          <Link key={p.id} href={href} className={`group flex flex-col ${colSpan}`}>
            <GrowReveal
              axis={revealAxis}
              delay={(i % 3) * 0.12}
              className={`relative w-full overflow-hidden rounded-[2px] ${aspect}`}
            >
              <div {...bind} className={`absolute inset-0 ${hoverClass}`}>
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes={sizes}
                  quality={95}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
            </GrowReveal>
            <div className="mt-4 flex flex-col gap-1 md:mt-6">
              <p className="font-serif font-light uppercase leading-[1.1] tracking-[-0.02em] text-brand-black [font-size:clamp(1rem,1.8vw,1.625rem)]">
                {p.name}
              </p>
              <TagList tags={p.tags} />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

// ─── List view ───────────────────────────────────────────────────────────────
function ListView({ projects }: { projects: ProjectCard[] }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <ul className="relative flex flex-col">
      {projects.map((p, i) => {
        const isHovered = hoveredId === p.id;
        const href = PROJECT_DETAILS[p.id] ? `/projects/${p.id}` : "#";
        return (
          <li
            key={p.id}
            onMouseEnter={() => setHoveredId(p.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="relative"
            style={{ zIndex: isHovered ? 30 : 0 }}
          >
            {i === 0 && <div className="h-px w-full bg-brand-black/15" />}

            <Link href={href} className="block">
              <motion.div
                animate={{
                  backgroundColor: isHovered
                    ? "var(--color-success-soft)"
                    : "rgba(255,255,255,0)",
                  paddingLeft: isHovered ? 64 : 0,
                  paddingRight: isHovered ? 64 : 0,
                }}
                transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                className="relative flex items-center justify-between gap-6 py-8 md:py-10"
              >
                <motion.span
                  animate={{ color: isHovered ? "#ffffff" : "#000000" }}
                  transition={{ duration: 0.35 }}
                  className="font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(1.25rem,2.2vw,2rem)]"
                >
                  {p.name}
                </motion.span>
                <motion.span
                  animate={{ color: isHovered ? "#ffffff" : "#000000" }}
                  transition={{ duration: 0.35 }}
                  className="whitespace-pre-wrap text-right font-sans text-sm font-medium md:text-base"
                >
                  {p.tags.map((t) => TAG_LABEL[t]).join("  |  ")}
                </motion.span>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      key="row-photo"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
                      className="pointer-events-none absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2"
                    >
                      <div className="relative h-[400px] w-[320px] overflow-hidden shadow-2xl">
                        <Image
                          src={p.image}
                          alt={p.name}
                          fill
                          sizes="320px"
                          quality={95}
                          className="object-cover"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>

            <div className="h-px w-full bg-brand-black/15" />
          </li>
        );
      })}
    </ul>
  );
}
