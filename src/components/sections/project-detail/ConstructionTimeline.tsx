"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "@/components/ProgressiveImage";
import { Reveal } from "@/components/Reveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import { RequestInterest } from "@/components/ActionButton";
import type { ConstructionUpdates } from "@/data/projectDetail";

const EASE = [0.76, 0, 0.24, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Construction Updates — a scroll-driven timeline: the phase list runs down
 * the right with a line that draws itself as you scroll, each phase's node
 * filling as it's reached, while the pinned image on the left wipes to the
 * current phase's photo.
 */
export default function ConstructionTimeline({ data }: { data: ConstructionUpdates }) {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const n = data.phases.length;

  // 0 → 1 as the phase list passes the middle of the screen.
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.55", "end 0.55"] });
  const lineScale = useTransform(scrollYProgress, (v) => Math.min(1, Math.max(0, v)));
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  return (
    <section
      id="construction-updates"
      data-nav-theme="light"
      className="flex flex-col gap-12 bg-brand-white px-6 py-16 text-brand-black md:gap-16 md:px-16 md:py-24"
    >
      <SectionEyebrow>Construction Updates</SectionEyebrow>

      {/* Heading + last update */}
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <h2 className="max-w-[12em] font-serif font-light leading-[1.05] tracking-[-0.02em] [font-size:clamp(2.25rem,4.4vw,4.5rem)]">
            Watch it take shape, phase by phase
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="font-sans text-sm font-medium uppercase tracking-[0.12em] text-brand-black/50">
            Last updated {data.updated}
          </span>
        </Reveal>
      </div>

      {/* Timeline: pinned image | phases */}
      <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-0">
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] bg-grey-100 md:sticky md:top-24 md:w-[44%]">
          {data.phases.map((phase, i) => (
            <motion.div
              key={phase.title}
              className="absolute inset-0"
              initial={false}
              animate={{ clipPath: i <= active ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)" }}
              transition={reduce ? { duration: 0 } : { duration: 0.8, ease: EASE }}
            >
              <Image src={phase.image} alt={phase.title} fill sizes="(min-width: 768px) 44vw, 100vw" quality={85} className="object-cover" />
            </motion.div>
          ))}
          {/* Current phase caption over the image */}
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-[2px] bg-brand-white/90 px-4 py-3 backdrop-blur-md md:inset-x-5 md:bottom-5">
            <span className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-brand-black/50">
              Phase {pad(active + 1)} / {pad(n)}
            </span>
            <span className="truncate font-sans text-sm font-medium text-brand-black">
              {data.phases[active].title}
            </span>
          </div>
        </div>

        <ol ref={listRef} className="relative flex w-full flex-col md:w-[48%]">
          {/* Track + scroll-drawn fill, through the node centres. */}
          <span aria-hidden className="absolute bottom-6 left-[7px] top-6 w-px bg-brand-black/10" />
          <motion.span
            aria-hidden
            className="absolute bottom-6 left-[7px] top-6 w-px origin-top bg-brand-black"
            style={{ scaleY: lineScale }}
          />
          {data.phases.map((phase, i) => {
            const reached = i <= active;
            return (
              <li key={phase.title} className="relative flex gap-8 pb-14 last:pb-0 md:pb-20">
                <span
                  aria-hidden
                  className={`relative z-10 mt-6 size-[15px] shrink-0 rounded-full border transition-colors duration-500 ${
                    reached ? "border-brand-black bg-brand-black" : "border-brand-black/25 bg-brand-white"
                  }`}
                >
                  {i === active && (
                    <span className="absolute -inset-2 animate-[plan-pulse_2.4s_cubic-bezier(0.22,1,0.36,1)_infinite] rounded-full bg-brand-black/15" />
                  )}
                </span>
                <div
                  className={`flex flex-1 flex-col gap-4 border-t pt-5 transition-[opacity,border-color] duration-500 ${
                    i === active ? "border-brand-black opacity-100" : "border-brand-black/10 opacity-55"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-brand-black/50">
                      Phase {pad(i + 1)} · {phase.period}
                    </span>
                    <StatusChip status={phase.status} />
                  </div>
                  <h3 className="font-serif text-2xl font-light uppercase leading-none tracking-[-0.02em] md:text-[2rem]">
                    {phase.title}
                  </h3>
                  <p className="max-w-[520px] font-sans text-base leading-[1.5] text-brand-black/75">{phase.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <Reveal className="md:ml-auto md:w-[48%] md:pl-[47px]">
        <RequestInterest />
      </Reveal>
    </section>
  );
}

function StatusChip({ status }: { status: "Completed" | "In progress" | "Upcoming" }) {
  const style =
    status === "Completed"
      ? "bg-brand-black text-brand-white"
      : status === "In progress"
        ? "border border-brand-black text-brand-black"
        : "border border-brand-black/20 text-brand-black/50";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-medium ${style}`}>
      {status === "In progress" && <span className="size-1.5 animate-pulse rounded-full bg-brand-black" />}
      {status}
    </span>
  );
}
