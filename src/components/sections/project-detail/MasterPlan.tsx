"use client";

import Image from "@/components/ProgressiveImage";
import { useEffect, useState } from "react";
import type { MasterPlanItem } from "@/data/projectDetail";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import NeighborhoodDrawer from "./NeighborhoodDrawer";
import { OPEN_NEIGHBORHOOD } from "./ProjectActions";
import { neighborhoodHref } from "@/data/neighborhoods";
import { useT } from "@/i18n/LocaleProvider";

const CYCLE_MS = 2600;

/**
 * Master Plan — the neighborhood list beside the plan, one numbered pin per
 * list item. Pins breathe with a soft pulse so they read as clickable;
 * hovering a pin or its list row highlights both and shows the pin's name
 * label. Touch screens have no hover, so there the labels take turns on
 * their own, in a loop. Clicking a pin or row opens the neighborhood's side
 * drawer (image + short description).
 */
export default function MasterPlan({
  id,
  projectId,
  items,
  mapImage,
  aspect,
  projectName,
}: {
  id?: string;
  projectId: string;
  items: MasterPlanItem[];
  mapImage: string;
  /** Master plan image width / height. */
  aspect: number;
  projectName: string;
}) {
  // Pins sit at each item's position (% of the image) — from the live
  // site's GPS for the neighborhoods.
  const t = useT();
  const pins = items.filter((it) => it.left !== undefined && it.top !== undefined);
  const [hovered, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null); // index into items
  // While the drawer is open its neighborhood's pin stays highlighted, and
  // follows the drawer's prev/next.
  const active = open !== null ? items[open].number : hovered;
  const openNumber = (n: number) => setOpen(items.findIndex((it) => it.number === n));

  // Phones/tablets (the stacked layout) and touch screens: step through the
  // pins' labels in a loop, since there's no hover. Paused while the drawer
  // is open; follows the breakpoint if the window is resized.
  const [autoCycle, setAutoCycle] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (max-width: 1023px)");
    const apply = () => setAutoCycle(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  useEffect(() => {
    if (!autoCycle || open !== null) return;
    const order = pins.map((p) => p.number).sort((a, b) => a - b);
    let i = -1;
    const step = () => {
      i = (i + 1) % order.length;
      setActive(order[i]);
    };
    const first = setTimeout(step, 600);
    const loop = setInterval(step, CYCLE_MS);
    return () => {
      clearTimeout(first);
      clearInterval(loop);
      setActive(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- pins follow items
  }, [autoCycle, open]);

  // Neighborhood names elsewhere on the page (the intro) open their drawer.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const i = items.findIndex((it) => it.name === (e as CustomEvent<string>).detail);
      if (i >= 0) setOpen(i);
    };
    window.addEventListener(OPEN_NEIGHBORHOOD, onOpen);
    return () => window.removeEventListener(OPEN_NEIGHBORHOOD, onOpen);
  }, [items]);

  return (
    <section
      id={id}
      data-nav-theme="light"
      className="flex flex-col-reverse gap-8 bg-brand-white px-6 py-16 text-brand-black md:px-16 md:py-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10"
    >
      {/* List keeps its Figma share of the grid (333/1312) so the map can
          hold the 868 column at any width. */}
      <div className="flex w-full flex-col gap-8 lg:w-[25.38%] lg:shrink-0">
        <ul className="flex w-full flex-col">
          {items.map((item, i) => {
            const isActive = active === item.number;
            return (
              <li key={item.number}>
                <Reveal delay={i * 0.04} y={16}>
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    onMouseEnter={() => setActive(item.number)}
                    onMouseLeave={() => setActive(null)}
                    className={`group flex w-full items-center justify-between border-b border-brand-black/10 px-2 py-3 text-start transition-colors duration-300 ${
                      isActive ? "bg-warm-100" : "hover:bg-warm-50"
                    }`}
                  >
                    <span className="flex items-center gap-9 font-sans text-base font-medium text-brand-black">
                      <span className="w-5 tabular-nums">{item.number}</span>
                      <span>{t(item.name)}</span>
                    </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className={`shrink-0 text-brand-black transition-transform duration-300 rtl:-scale-x-100 ${
                        isActive ? "translate-x-1 rtl:-translate-x-1" : "group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
                      }`}
                    >
                      <path
                        d="M4 12h16m0 0-6-6m6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Map — the "exceeding photo" column: 66.16% of the content width,
          right-anchored. `data-no-fx` keeps the site-wide parallax off it,
          so the artwork never drifts out from under its pins. On phones the
          frame is taller (3:4) so the plan and its pins read bigger: the
          plan layer keeps the artwork's own ratio at the full height and is
          cropped at the sides, with the pins positioned inside it. */}
      <div
        data-no-fx=""
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] md:aspect-[var(--plan-aspect)] lg:ms-auto lg:w-[66.16%]"
        style={{ "--plan-aspect": aspect } as React.CSSProperties}
      >
        <div className="absolute inset-y-0 left-1/2 h-full -translate-x-1/2" style={{ aspectRatio: aspect }}>
          <GrowReveal axis="width" className="absolute inset-0">
            <Image
              src={mapImage}
              alt={t("{name} master plan", { name: t(projectName) })}
              fill
              sizes="(min-width: 768px) 62vw, 135vw"
              quality={95}
              className="object-cover"
            />
          </GrowReveal>
          {pins.map((item, i) => {
            const pin = { left: item.left!, top: item.top!, number: item.number };
            const isActive = active === pin.number;
            return (
              <button
                type="button"
                key={pin.number}
                onClick={() => openNumber(pin.number)}
                onMouseEnter={() => setActive(pin.number)}
                onMouseLeave={() => setActive(null)}
                aria-label={t("{name} — view details", { name: t(item.name) })}
                // Anchored at the stem's foot: the ground dot sits on the spot.
                className="group absolute flex -translate-x-1/2 -translate-y-full flex-col items-center"
                style={{ left: `${pin.left}%`, top: `${pin.top}%`, zIndex: isActive ? 20 : 10 }}
              >
                {/* Name label — a sans pill, shown while the pin (or its row)
                    is active. Pins near the plan's sides anchor it inward, so
                    it never runs off the (side-cropped) phone frame. */}
                <span
                  className={`pointer-events-none absolute bottom-full mb-2 flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-white py-1 ps-1 pe-3.5 font-sans text-xs font-medium text-brand-black shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-[opacity,translate,scale] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] md:text-[13px] ${
                    pin.left < 30 ? "left-0 origin-bottom-left" : pin.left > 70 ? "right-0 origin-bottom-right" : "origin-bottom"
                  } ${isActive ? "translate-y-0 scale-100 opacity-100" : "translate-y-1 scale-95 opacity-0"}`}
                >
                  <span className="flex size-5 items-center justify-center rounded-full bg-brand-black text-[10px] tabular-nums text-brand-white">
                    {pin.number}
                  </span>
                  {t(item.name)}
                </span>
                {/* Marker: a small numbered head on a hairline stem, standing
                    on a ground dot that breathes with a soft pulse. */}
                <span
                  className={`relative flex size-[18px] items-center justify-center rounded-full font-sans text-[9px] font-semibold tabular-nums shadow-[0_2px_8px_rgba(0,0,0,0.3)] ring-[1.5px] transition-[background-color,color,scale] duration-300 md:size-5 md:text-[10px] ${
                    isActive ? "scale-110 bg-brand-white text-brand-black ring-brand-black" : "bg-brand-black text-brand-white ring-brand-white"
                  }`}
                >
                  {pin.number}
                </span>
                <span aria-hidden className={`h-2.5 w-[1.5px] transition-colors duration-300 md:h-3 ${isActive ? "bg-brand-black" : "bg-brand-white"}`} />
                <span aria-hidden className="relative size-1.5">
                  <span
                    className="absolute -inset-1 animate-[plan-pulse_2.4s_cubic-bezier(0.22,1,0.36,1)_infinite] rounded-full bg-brand-white/70"
                    style={{ animationDelay: `${(i % 5) * 0.35}s` }}
                  />
                  <span className="absolute inset-0 rounded-full bg-brand-black ring-1 ring-brand-white" />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <NeighborhoodDrawer
        items={items}
        index={open}
        onClose={() => setOpen(null)}
        onIndex={setOpen}
        discoverHref={(number) => neighborhoodHref(projectId, number)}
      />
    </section>
  );
}
