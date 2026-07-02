"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import type { MasterPlanItem } from "@/data/projectDetail";

// Circle geometry measured from Figma frame 17043-49871: the map renders at
// 866×824 with 39px resting circles and a 64px active circle. The artwork
// itself (masterplan-slr-clean.png) is the clean source — no baked markers —
// so these overlays are the only circles. Centres as % of the map box:
const PINS: { left: number; top: number; number: number }[] = [
  { left: 54.85, top: 25.49, number: 7 },
  { left: 35.05, top: 35.62, number: 6 },
  { left: 57.1, top: 46.06, number: 3 },
  { left: 33.54, top: 61.47, number: 1 },
  { left: 57.1, top: 71.05, number: 2 },
];

const REST_PCT = (39 / 866) * 100; // ≈ 4.5%
const ACTIVE_PCT = (64 / 866) * 100; // ≈ 7.4%

export default function MasterPlan({
  items,
  mapImage,
}: {
  items: MasterPlanItem[];
  mapImage: string;
}) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      data-nav-theme="light"
      className="flex flex-col-reverse gap-8 bg-brand-white px-6 py-16 text-brand-black md:min-h-screen md:flex-row md:items-center md:justify-between md:gap-10 md:px-16 md:py-16"
    >
      <Reveal className="w-full md:w-[333px] md:shrink-0">
      <ul className="flex w-full flex-col">
        {items.map((item) => {
          const isActive = active === item.number;
          return (
            <li key={item.number}>
              <a
                href="#"
                onMouseEnter={() => setActive(item.number)}
                onMouseLeave={() => setActive(null)}
                className={`group flex items-center justify-between border-b border-brand-black/10 px-2 py-3 transition-colors duration-300 ${
                  isActive ? "bg-warm-100" : "hover:bg-warm-50"
                }`}
              >
                <span className="flex items-center gap-9 font-sans text-base font-medium text-brand-black">
                  <span className="w-5">{item.number}</span>
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
              </a>
            </li>
          );
        })}
      </ul>
      </Reveal>

      {/* Map — Figma renders it at 866/1312 of the content width (right
          anchored). Width takes the Figma share, capped via min() so the
          aspect-locked height still fits the viewport. */}
      <div className="relative aspect-[866/824] w-full overflow-hidden rounded-[2px] md:ml-auto md:w-[min(66%,calc((100vh-176px)*0.9199))]">
        <GrowReveal axis="width" className="absolute inset-0">
          <Image
            src={mapImage}
            alt="SwanLake Residences New Cairo master plan"
            fill
            sizes="(min-width: 768px) 62vw, 100vw"
            quality={95}
            className="object-cover"
          />
          {PINS.map((pin) => {
            const isActive = active === pin.number;
            return (
              <motion.button
                type="button"
                key={pin.number}
                onMouseEnter={() => setActive(pin.number)}
                onMouseLeave={() => setActive(null)}
                aria-label={`Neighborhood ${pin.number}`}
                className="absolute flex items-center justify-center rounded-full bg-brand-black text-brand-white"
                style={{
                  left: `${pin.left}%`,
                  top: `${pin.top}%`,
                  transform: "translate(-50%, -50%)",
                  aspectRatio: "1",
                }}
                initial={false}
                animate={{ width: isActive ? `${ACTIVE_PCT}%` : `${REST_PCT}%` }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
              >
                {isActive && (
                  <motion.span
                    className="font-serif leading-none [font-size:clamp(0.9rem,1.6vw,1.375rem)]"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {pin.number}
                  </motion.span>
                )}
              </motion.button>
            );
          })}
        </GrowReveal>
      </div>
    </section>
  );
}
