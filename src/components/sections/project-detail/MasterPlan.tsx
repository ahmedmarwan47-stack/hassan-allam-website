"use client";

import Image from "@/components/ProgressiveImage";
import { useState } from "react";
import type { MasterPlanItem } from "@/data/projectDetail";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import NeighborhoodDrawer from "./NeighborhoodDrawer";
import { RequestInterest } from "@/components/ActionButton";

// Pin centres as % of the map box (measured from Figma frame 17043-49871 on
// the clean artwork, masterplan-slr-clean.jpg), keyed to the list's numbers.
const PINS: { left: number; top: number; number: number }[] = [
  { left: 54.85, top: 25.49, number: 7 },
  { left: 35.05, top: 35.62, number: 6 },
  { left: 57.1, top: 46.06, number: 3 },
  { left: 33.54, top: 61.47, number: 1 },
  { left: 57.1, top: 71.05, number: 2 },
];

/**
 * Master Plan — the neighborhood list beside the plan. Each pin wears a
 * small white name label and breathes with a soft pulse so it reads as
 * clickable; hovering a pin or its list row highlights both. Clicking either
 * opens the neighborhood's side drawer (image + short description).
 */
export default function MasterPlan({
  items,
  mapImage,
}: {
  items: MasterPlanItem[];
  mapImage: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null); // index into items
  const openNumber = (n: number) => setOpen(items.findIndex((it) => it.number === n));

  return (
    <section
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
        <Reveal>
          <RequestInterest />
        </Reveal>
      </div>

      {/* Map — the "exceeding photo" column: 66.16% of the content width,
          right-anchored. `data-no-fx` keeps the site-wide parallax off it,
          so the artwork never drifts out from under its pins. */}
      <div
        data-no-fx=""
        className="relative aspect-[866/824] w-full overflow-hidden rounded-[2px] lg:ml-auto lg:w-[66.16%]"
      >
        <GrowReveal axis="width" className="absolute inset-0">
          <Image
            src={mapImage}
            alt="SwanLake Residences New Cairo master plan"
            fill
            sizes="(min-width: 768px) 62vw, 100vw"
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
              style={{ left: `${pin.left}%`, top: `${pin.top}%` }}
            >
              {/* Name label, floating above the pin. */}
              <span
                className={`absolute bottom-full mb-3 whitespace-nowrap rounded-[2px] bg-brand-white px-3 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-brand-black shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-[translate,background-color,color] duration-300 md:text-xs ${
                  isActive ? "-translate-y-1 bg-brand-black text-brand-white" : ""
                }`}
              >
                {item.name}
              </span>
              {/* Pin: black core in a white ring, with a breathing pulse. */}
              <span className="relative flex size-6 items-center justify-center md:size-7">
                <span
                  aria-hidden
                  className="absolute inset-0 animate-[plan-pulse_2.4s_cubic-bezier(0.22,1,0.36,1)_infinite] rounded-full bg-brand-white/70"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
                <span
                  className={`relative rounded-full border-2 border-brand-white bg-brand-black shadow-[0_2px_10px_rgba(0,0,0,0.35)] transition-[width,height] duration-300 ${
                    isActive ? "size-6 md:size-7" : "size-4 md:size-[18px]"
                  }`}
                />
              </span>
            </button>
          );
        })}
      </div>

      <NeighborhoodDrawer items={items} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}
