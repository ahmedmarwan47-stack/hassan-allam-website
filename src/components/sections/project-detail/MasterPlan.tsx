"use client";

import Image from "@/components/ProgressiveImage";
import { useEffect, useState } from "react";
import type { MasterPlanItem } from "@/data/projectDetail";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import NeighborhoodDrawer from "./NeighborhoodDrawer";
import { OPEN_NEIGHBORHOOD } from "./ProjectActions";

// Pin centres as % of the map box, keyed to the list's numbers — one per
// list item. 1, 2, 3 and 6 are measured from Figma frame 17043-49871 on
// the clean artwork (masterplan-slr-clean.jpg); the rest are placed by eye
// on the matching parts of the plan (apartment clusters, villa areas, the
// running track) until official positions are supplied.
const PINS: { left: number; top: number; number: number }[] = [
  { left: 35.05, top: 35.62, number: 6 },
  { left: 57.1, top: 46.06, number: 3 },
  { left: 33.54, top: 61.47, number: 1 },
  { left: 57.1, top: 71.05, number: 2 },
  { left: 70.68, top: 38.24, number: 4 },
  { left: 78.86, top: 70.78, number: 5 },
  { left: 21.96, top: 44.38, number: 7 },
  { left: 21.0, top: 65.3, number: 8 },
  { left: 42.06, top: 49.29, number: 9 },
  { left: 61.92, top: 59.12, number: 10 },
  { left: 46.73, top: 77.53, number: 11 },
  { left: 70.09, top: 77.53, number: 12 },
  { left: 34.46, top: 73.85, number: 13 },
];
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
  items,
  mapImage,
}: {
  id?: string;
  items: MasterPlanItem[];
  mapImage: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null); // index into items
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
    const order = PINS.map((p) => p.number).sort((a, b) => a - b);
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
                    className={`group flex w-full items-center justify-between border-b border-brand-black/10 px-2 py-3 text-left transition-colors duration-300 ${
                      isActive ? "bg-warm-100" : "hover:bg-warm-50"
                    }`}
                  >
                    <span className="flex items-center gap-9 font-sans text-base font-medium text-brand-black">
                      <span className="w-5 tabular-nums">{item.number}</span>
                      <span>{item.name}</span>
                    </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                      className={`shrink-0 text-brand-black transition-transform duration-300 ${
                        isActive ? "translate-x-1" : "group-hover:translate-x-1"
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
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] md:aspect-[866/824] lg:ml-auto lg:w-[66.16%]"
      >
        <div className="absolute inset-y-0 left-1/2 aspect-[866/824] h-full -translate-x-1/2">
          <GrowReveal axis="width" className="absolute inset-0">
            <Image
              src={mapImage}
              alt="SwanLake Residences New Cairo master plan"
              fill
              sizes="(min-width: 768px) 62vw, 135vw"
              quality={95}
              className="object-cover"
            />
          </GrowReveal>
          {PINS.map((pin, i) => {
            const item = items.find((it) => it.number === pin.number);
            if (!item) return null;
            const isActive = active === pin.number;
            return (
              <button
                type="button"
                key={pin.number}
                onClick={() => openNumber(pin.number)}
                onMouseEnter={() => setActive(pin.number)}
                onMouseLeave={() => setActive(null)}
                aria-label={`${item.name} — view details`}
                className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                style={{ left: `${pin.left}%`, top: `${pin.top}%`, zIndex: isActive ? 20 : 10 }}
              >
                {/* Name label — shown while the pin (or its row) is active. */}
                {/* Pins near the plan's sides anchor their label inward, so
                    it never runs off the (side-cropped) phone frame. */}
                <span
                  className={`pointer-events-none absolute bottom-full mb-2.5 whitespace-nowrap ${
                    pin.left < 30 ? "left-0" : pin.left > 70 ? "right-0" : ""
                  } rounded-[2px] bg-brand-black px-3 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-brand-white shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-[opacity,translate] duration-300 md:text-xs ${
                    isActive ? "-translate-y-0.5 opacity-100" : "translate-y-1 opacity-0"
                  }`}
                >
                  {item.name}
                </span>
                {/* Pin: the list number in a black disc with a white ring,
                    with a breathing pulse. */}
                <span className="relative flex size-7 items-center justify-center md:size-8">
                  <span
                    aria-hidden
                    className="absolute inset-0 animate-[plan-pulse_2.4s_cubic-bezier(0.22,1,0.36,1)_infinite] rounded-full bg-brand-white/70"
                    style={{ animationDelay: `${(i % 5) * 0.35}s` }}
                  />
                  <span
                    className={`relative flex items-center justify-center rounded-full border-2 border-brand-white font-sans text-[10px] font-semibold tabular-nums text-brand-white shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-[width,height,background-color] duration-300 md:text-[11px] ${
                      isActive ? "size-7 bg-brand-black md:size-8" : "size-[22px] bg-brand-black/85 md:size-6"
                    }`}
                  >
                    {pin.number}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <NeighborhoodDrawer items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}
