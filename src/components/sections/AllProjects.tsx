"use client";

import Image from "@/components/ProgressiveImage";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectHref } from "@/data/projectDetail";
import { useDiscoverCursor } from "@/components/DiscoverCursor";
import GrowReveal from "@/components/GrowReveal";
import { CATEGORY_LABEL, type Category } from "@/data/mapProjects";

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

// Card-tag wording lives with the categories (shared with the project hero).
const TAG_LABEL = CATEGORY_LABEL;

// Tag mix per project mirrors the Figma grid + list variants.
const PROJECTS: ProjectCard[] = [
  // In The City — 6 projects (3 thirds + 2 halves + 1 full)
  { id: "swanlake-west", name: "Swanlake West", tags: ["Residential", "Sports & Wellness"], image: "/images/map/slw.jpg", span: "third", group: "city" },
  { id: "parkview", name: "Parkview", tags: ["Residential"], image: "/images/projects/parkview.jpg", span: "third", group: "city" },
  { id: "swanlake-katameya", name: "Swanlake Katameya", tags: ["Residential", "Retail", "Sports & Wellness"], image: "/images/map/slk10.jpg", span: "third", group: "city" },
  { id: "seasons-city", name: "Seasons Residences", tags: ["Residential", "Hospitality & Leisure"], image: "/images/map/seasons.jpg", span: "half", group: "city" },
  { id: "swanlake-residences", name: "Swanlake Residences", tags: ["Residential", "Hospitality & Leisure", "Retail", "Office Space", "Sports & Wellness"], image: "/images/projects/swanlake-residences.jpg", span: "half", group: "city" },
  { id: "swanlake-october", name: "Swanlake October", tags: ["Residential", "Office Space"], image: "/images/projects/swanlake-october.jpg", span: "full", group: "city" },

  // By The Sea — 3 projects (2 halves + 1 full)
  { id: "swanlake-residences-sea", name: "Swanlake El Gouna", tags: ["Residential", "Hospitality & Leisure"], image: "/images/map/slg.jpg", span: "half", group: "sea" },
  { id: "swanlake-northcoast", name: "Swanlake Northcoast", tags: ["Residential", "Hospitality & Leisure", "Sports & Wellness"], image: "/images/projects/swanlake-northcoast.jpg", span: "half", group: "sea" },
  { id: "little-venice", name: "Little Venice", tags: ["Residential"], image: "/images/projects/little-venice.jpg", span: "full", group: "sea" },
];

/** Grey tag row with hairline dividers — Figma "Frame 2147227667". Each
 *  divider sits just left of its tag; the list is pulled 8px left and
 *  clipped, so a tag that wraps to the start of a line loses its divider. */
function TagList({ tags }: { tags: Category[] }) {
  return (
    <ul className="-ml-2 flex flex-wrap items-center gap-y-0.5 overflow-hidden font-sans text-[11px] leading-[1.4] text-grey-500 md:text-xs">
      {tags.map((tag) => (
        <li
          key={tag}
          className="relative whitespace-nowrap pl-2 pr-[7px] before:absolute before:-left-px before:top-1/2 before:h-3.5 before:w-px before:-translate-y-1/2 before:bg-grey-300"
        >
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
  const [activeGroup, setActiveGroup] = useState<"city" | "sea">("city");
  const seaRef = useRef<HTMLDivElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);

  // The sticky bar switches to "By The Sea" once the sea group's top edge
  // crosses the middle of the viewport — early enough that the short list
  // view (where the page ends before the group reaches the bar) still flips.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = seaRef.current;
      setActiveGroup(el && el.getBoundingClientRect().top <= window.innerHeight * 0.5 ? "sea" : "city");
      // While the communities bar owns the top edge, hide the navbar (it
      // reads data-nav-hidden). Released once the groups scroll past.
      const g = groupsRef.current?.getBoundingClientRect();
      const stuck = !!g && g.top <= 80 && g.bottom > 160;
      document.documentElement.toggleAttribute("data-nav-hidden", stuck);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      document.documentElement.removeAttribute("data-nav-hidden");
    };
  }, []);

  const cityProjects = PROJECTS.filter(
    (p) => p.group === "city" && (activeFilter === "all" || p.tags.includes(activeFilter)),
  );
  const seaProjects = PROJECTS.filter(
    (p) => p.group === "sea" && (activeFilter === "all" || p.tags.includes(activeFilter)),
  );

  const filterLabel = activeFilter === "all" ? "All projects" : activeFilter;

  return (
    <section
      id="all-projects"
      data-nav-theme="light"
      className="relative bg-brand-white text-brand-black"
    >
      {/* ── Intro ── */}
      <div className="px-6 pb-12 pt-16 md:px-16 md:pb-20 md:pt-20">
        <p className="font-sans text-xl font-medium leading-[1.3] text-brand-black md:text-[1.625rem]">
          {filterLabel}
        </p>
        <p className="mt-10 max-w-[857px] font-serif font-light uppercase leading-[1.2] tracking-[-0.02em] [font-size:clamp(1.5rem,3vw,2.625rem)] md:mt-14">
          Our refined expertise lies in the art of designing and transforming
          living spaces, from elegant residences to exclusive coastal
          destinations, from visionary neighborhoods to established communities.
        </p>
      </div>

      {/* ── Communities — one sticky bar shared by both groups (Figma
          17043:545): the subtitle and count follow whichever group is under
          the bar, so "In The City" hands over to "By The Sea" while scrolling. ── */}
      {(cityProjects.length > 0 || seaProjects.length > 0) && (
        <div ref={groupsRef} className="relative">
          <CommunitiesBar
            count={(activeGroup === "sea" ? seaProjects : cityProjects).length || seaProjects.length}
            subtitle={
              cityProjects.length === 0 || activeGroup === "sea" ? "By The Sea" : "In The City"
            }
            view={view}
            onViewChange={setView}
          />

          {/* In The City — cards reveal by growing in HEIGHT on scroll */}
          {cityProjects.length > 0 && (
            <CommunityBody
              revealAxis="height"
              accent="var(--color-success-soft)"
              view={view}
              projects={cityProjects}
              bind={bind}
              hoverClass={hoverClass}
            />
          )}

          {/* By The Sea — titled where the group starts, then the cards
              reveal by growing in WIDTH on scroll. */}
          {seaProjects.length > 0 && (
            <div ref={seaRef}>
              {cityProjects.length > 0 && (
                <div
                  // List view already has row hairlines — no full-width rule there.
                  className={`flex items-center gap-3 px-6 pt-10 md:gap-6 md:px-16 md:pt-16 ${
                    view === "grid" ? "border-t border-grey-300" : ""
                  }`}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-[2px] border border-brand-black/15 font-sans text-sm font-medium text-brand-black md:size-[54px] md:text-xl">
                    {String(seaProjects.length).padStart(2, "0")}
                  </span>
                  <h3 className="font-sans text-base font-normal leading-none text-brand-black md:[font-size:clamp(1.25rem,2.8vw,2.5rem)]">
                    Our Communities
                    <span className="block pb-[0.1em]">By The Sea</span>
                  </h3>
                </div>
              )}
              <CommunityBody
                revealAxis="width"
                accent="var(--color-info)"
                view={view}
                projects={seaProjects}
                bind={bind}
                hoverClass={hoverClass}
              />
            </div>
          )}
        </div>
      )}

      {cursor}
    </section>
  );
}

/** Bar pinned to the top edge while either group scrolls by — the navbar
 *  slides away meanwhile (see data-nav-hidden in AllProjects). */
function CommunitiesBar({
  count,
  subtitle,
  view,
  onViewChange,
}: {
  count: number;
  subtitle: string;
  view: View;
  onViewChange: (v: View) => void;
}) {
  const swap = {
    initial: { opacity: 0, y: "0.6em" },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: "-0.6em" },
    transition: { duration: 0.35, ease: [0.65, 0, 0.35, 1] as const },
  };
  return (
    <div className="sticky top-0 z-20 border-b border-brand-black/10 bg-brand-white px-6 py-3 md:border-0 md:px-16 md:py-5">
      <div className="flex items-center justify-between gap-3 md:gap-6">
        <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[2px] border border-brand-black/15 font-sans text-sm font-medium text-brand-black md:size-[54px] md:text-xl">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={count} {...swap}>
              {String(count).padStart(2, "0")}
            </motion.span>
          </AnimatePresence>
        </span>

        <h3 className="min-w-0 flex-1 font-sans font-normal leading-none text-brand-black text-base md:flex-none md:[font-size:clamp(1.25rem,2.8vw,2.5rem)]">
          Our Communities
          <span className="block overflow-hidden pb-[0.1em]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={subtitle} className="block" {...swap}>
                {subtitle}
              </motion.span>
            </AnimatePresence>
          </span>
        </h3>

        <ViewToggle view={view} onChange={onViewChange} />
      </div>
    </div>
  );
}

function CommunityBody({
  revealAxis,
  accent,
  view,
  projects,
  bind,
  hoverClass,
}: {
  revealAxis: "height" | "width";
  /** List-row hover fill — green in the city, blue by the sea. */
  accent: string;
  view: View;
  projects: ProjectCard[];
  bind: Record<string, unknown>;
  hoverClass: string;
}) {
  return (
    <div className="px-6 py-8 md:px-16 md:py-16">
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
            <ListView projects={projects} accent={accent} />
          </motion.div>
        )}
      </AnimatePresence>
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
  const word = (v: View) =>
    [
      "relative hidden font-sans text-lg transition-colors duration-200 focus:outline-none focus-visible:underline md:block md:text-2xl",
      view === v
        ? "font-bold text-success-dark after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-px after:bg-success-dark"
        : "font-medium text-brand-black hover:text-success-dark",
    ].join(" ");
  // Phones: two compact icon buttons instead of the words.
  const icon = (v: View) =>
    `flex size-9 items-center justify-center rounded-[2px] border transition-colors duration-200 focus:outline-none md:hidden ${
      view === v ? "border-brand-black bg-brand-black text-brand-white" : "border-brand-black/15 text-brand-black"
    }`;
  return (
    <div className="flex items-center gap-1.5 md:gap-10">
      {(["grid", "list"] as const).map((v) => (
        <button key={v} type="button" onClick={() => onChange(v)} aria-pressed={view === v} aria-label={`${v} view`} className={icon(v)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            {v === "grid" ? (
              <path d="M2.5 2.5h4.5v4.5H2.5zM9 2.5h4.5v4.5H9zM2.5 9h4.5v4.5H2.5zM9 9h4.5v4.5H9z" stroke="currentColor" strokeWidth="1.2" />
            ) : (
              <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            )}
          </svg>
        </button>
      ))}
      <button type="button" onClick={() => onChange("grid")} className={word("grid")}>
        Grid
      </button>
      <button type="button" onClick={() => onChange("list")} className={word("list")}>
        List
      </button>
    </div>
  );
}

// ─── Grid view ───────────────────────────────────────────────────────────────
// Phones: an even two-up grid (an odd last card takes the full row);
// desktop keeps the asymmetric 6-col layout.
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
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-6 md:gap-x-5 md:gap-y-12">
      {projects.map((p, i) => {
        const wideOnPhone = projects.length % 2 === 1 && i === projects.length - 1;
        const colSpan = `${wideOnPhone ? "col-span-2" : ""} ${
          p.span === "third" ? "md:col-span-2" : p.span === "half" ? "md:col-span-3" : "md:col-span-6"
        }`;
        const desktopAspect =
          p.span === "third"
            ? "md:aspect-[424/500]"
            : p.span === "half"
              ? "md:aspect-[646/740]"
              : "md:aspect-[1312/720]";
        const aspect = `${wideOnPhone ? "aspect-[16/10]" : "aspect-[4/5]"} ${desktopAspect}`;
        const sizes =
          p.span === "third"
            ? "(min-width: 768px) 33vw, 50vw"
            : p.span === "half"
              ? "(min-width: 768px) 50vw, 50vw"
              : "(min-width: 768px) 100vw, 50vw";
        const href = projectHref(p.id);
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
            <div className="mt-3 flex flex-col gap-1 md:mt-6">
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
// Desktop hover: the row's accent colour wipes up from its bottom edge while
// the name and tags ease inward; one floating photo glides between rows and
// cross-fades to the hovered project (instead of a new photo per row).
const LIST_EASE = "cubic-bezier(0.65,0,0.35,1)";

function ListView({ projects, accent }: { projects: ProjectCard[]; accent: string }) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // Centre (px from the list's top) of the row the photo sits on.
  const [photoY, setPhotoY] = useState(0);
  const hovered = projects.find((p) => p.id === hoveredId);

  const enter = (id: string, row: HTMLElement) => {
    // Taps fire mouseenter too — only real hover pointers get the effect.
    if (!window.matchMedia("(hover: hover)").matches) return;
    setPhotoY(row.offsetTop + row.offsetHeight / 2);
    setHoveredId(id);
  };

  return (
    <ul className="relative flex flex-col" onMouseLeave={() => setHoveredId(null)}>
      {projects.map((p, i) => {
        const isHovered = hoveredId === p.id;
        const href = projectHref(p.id);
        const ink = `transition-colors duration-500 ${isHovered ? "text-white" : "text-black"}`;
        return (
          <li key={p.id} onMouseEnter={(e) => enter(p.id, e.currentTarget)} className="relative">
            {i === 0 && <div className="h-px w-full bg-brand-black/15" />}

            {/* Phones: small photo on the left, name + tags beside it. */}
            <Link href={href} className="flex items-center gap-4 py-4 md:hidden">
              <div className="relative h-[84px] w-[68px] shrink-0 overflow-hidden rounded-[2px] bg-grey-100">
                <Image src={p.image} alt="" fill sizes="68px" className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <span className="font-serif text-lg font-light uppercase leading-[1.05] tracking-[-0.02em] text-brand-black">
                  {p.name}
                </span>
                <TagList tags={p.tags} />
              </div>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="shrink-0 text-brand-black/50">
                <path d="M3 11 11 3M11 3H4M11 3v7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <Link href={href} className="relative hidden overflow-hidden md:block">
              {/* Accent fill — wipes up from the row's bottom edge. */}
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  backgroundColor: accent,
                  clipPath: isHovered ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                  transition: `clip-path 0.6s ${LIST_EASE}`,
                }}
              />
              <div
                className="relative flex items-center justify-between gap-6 py-10"
                style={{
                  transform: `translateX(${isHovered ? 64 : 0}px)`,
                  width: isHovered ? "calc(100% - 128px)" : "100%",
                  transition: `transform 0.6s ${LIST_EASE}, width 0.6s ${LIST_EASE}`,
                }}
              >
                <span className={`font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(1.25rem,2.2vw,2rem)] ${ink}`}>
                  {p.name}
                </span>
                <span className={`w-[31.4%] max-w-[414px] whitespace-pre-wrap text-right font-sans text-sm font-medium leading-[1.3] ${ink}`}>
                  {p.tags.map((t) => TAG_LABEL[t]).join("  |  ")}
                </span>
              </div>
            </Link>

            <div className="h-px w-full bg-brand-black/15" />
          </li>
        );
      })}

      {/* The floating photo — glides to the hovered row, cross-fading. */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-40 hidden h-[333px] w-[261px] overflow-hidden shadow-2xl md:block"
        initial={false}
        animate={{
          y: photoY - 333 / 2,
          x: "-50%",
          opacity: hovered ? 1 : 0,
          scale: hovered ? 1 : 0.94,
        }}
        transition={{
          y: { type: "spring", stiffness: 170, damping: 26 },
          opacity: { duration: 0.35, ease: "easeOut" },
          scale: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
        }}
      >
        <AnimatePresence initial={false}>
          {hovered && (
            <motion.div
              key={hovered.id}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={hovered.image} alt="" fill sizes="261px" quality={95} className="object-cover" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </ul>
  );
}
