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
import MobileCarousel, { type MobileCarouselHandle } from "@/components/MobileCarousel";
import { RequestInterest } from "@/components/ActionButton";
import type { ConstructionUpdates } from "@/data/projectDetail";

const pad = (n: number) => String(n).padStart(2, "0");
// Dates only once a phase is done — planned ones keep just their number.
const phaseDates = (p: { status: string; period: string }) => (p.status === "Completed" ? ` · ${p.period}` : "");

/**
 * Construction Updates — a scroll-driven timeline: the phase list runs down
 * the right with a line that draws itself as you scroll, each phase's node
 * filling as it's reached, while the pinned image on the left cross-fades
 * (settling from a slight zoom) to the current phase's photo. Milestones
 * read newest first. Phones get them as a swipe carousel under a
 * chronological progress timeline.
 */
export default function ConstructionTimeline({ data }: { data: ConstructionUpdates }) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = data.phases.length;
  // Newest first, each keeping its chronological phase number.
  const phases = data.phases.map((p, i) => ({ ...p, num: i + 1 })).reverse();
  // Phones: the card in view, and a handle to jump the carousel.
  const [viewed, setViewed] = useState(0);
  const carouselRef = useRef<MobileCarouselHandle>(null);

  // Desktop: the timeline pins in view and scrolling steps through the
  // phases — 0 → 1 across the tall track it's pinned inside.
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const lineScale = useTransform(scrollYProgress, (v) => Math.min(1, Math.max(0, v)));
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  return (
    <section
      id="construction-updates"
      data-nav-theme="light"
      className="flex flex-col gap-8 bg-brand-white px-6 py-16 text-brand-black md:gap-16 md:px-16 md:py-24"
    >
      <SectionEyebrow>Construction Updates</SectionEyebrow>

      {/* Heading + last update */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
        <Reveal>
          <h2 className="max-w-[12em] font-serif font-light leading-[1.05] tracking-[-0.02em] [font-size:clamp(2rem,4.4vw,4.5rem)]">
            Watch it take shape, phase by phase
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="font-sans text-sm font-medium uppercase tracking-[0.12em] text-brand-black/50">
            Last updated {data.updated}
          </span>
        </Reveal>
      </div>

      {/* Phones: horizontal progress timeline, then one card per phase. */}
      {/* The timeline stays chronological; the cards run newest first. */}
      <PhaseProgress
        phases={data.phases}
        viewed={n - 1 - viewed}
        onPick={(i) => carouselRef.current?.goTo(n - 1 - i)}
      />
      <MobileCarousel ref={carouselRef} onIndexChange={setViewed} label="phases" className="-mt-2 md:hidden">
        {phases.map((phase) => (
          <article key={phase.title} className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] bg-grey-100">
              <Image src={phase.image} alt={phase.title} fill sizes="82vw" quality={85} className="object-cover" />
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.12em] text-brand-black/50">
                Phase {pad(phase.num)}{phaseDates(phase)}
              </span>
              <StatusChip status={phase.status} />
            </div>
            <h3 className="font-serif text-[1.375rem] font-light uppercase leading-[1.05] tracking-[-0.02em]">{phase.title}</h3>
            <p className="font-sans text-sm leading-[1.5] text-brand-black/75">{phase.text}</p>
          </article>
        ))}
      </MobileCarousel>

      {/* Desktop timeline: image | phases — the image runs exactly the
          height of the phase list. The block pins under the header (centred
          in the space below it) while the page scrolls through the phases,
          then moves on. */}
      <div ref={trackRef} className="hidden md:block" style={{ height: `calc(100svh + ${n * 28}svh)` }}>
      <div className="sticky top-[var(--nav-h,80px)] flex h-[calc(100svh-var(--nav-h,80px))] flex-col justify-center gap-12">
      <div className="flex flex-row items-stretch justify-between">
        <div className="relative w-full overflow-hidden rounded-[2px] bg-grey-100 md:w-[44%]">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.title}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.06 }}
              transition={reduce ? { duration: 0 } : { duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image src={phase.image} alt={phase.title} fill sizes="(min-width: 768px) 44vw, 100vw" quality={85} className="object-cover" />
            </motion.div>
          ))}
          {/* Current phase caption over the image */}
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4 rounded-[2px] bg-brand-white/90 px-4 py-3 backdrop-blur-md md:inset-x-5 md:bottom-5">
            <span className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-brand-black/50">
              Phase {pad(phases[active].num)} / {pad(n)}
            </span>
            <span className="truncate font-sans text-sm font-medium text-brand-black">
              {phases[active].title}
            </span>
          </div>
        </div>

        <ol className="relative flex w-full flex-col md:w-[53%]">
          {/* Track + scroll-drawn fill, through the node centres. */}
          <span aria-hidden className="absolute bottom-6 left-[7px] top-6 w-px bg-brand-black/10" />
          <motion.span
            aria-hidden
            className="absolute bottom-6 left-[7px] top-6 w-px origin-top bg-brand-black"
            style={{ scaleY: lineScale }}
          />
          {phases.map((phase, i) => {
            const reached = i <= active;
            return (
              <li key={phase.title} className="relative flex gap-8 pb-6 last:pb-0">
                <span
                  aria-hidden
                  className={`relative z-10 mt-[17px] size-[15px] shrink-0 rounded-full border transition-colors duration-500 ${
                    reached ? "border-brand-black bg-brand-black" : "border-brand-black/25 bg-brand-white"
                  }`}
                >
                  {i === active && (
                    <span className="absolute -inset-2 animate-[plan-pulse_2.4s_cubic-bezier(0.22,1,0.36,1)_infinite] rounded-full bg-brand-black/15" />
                  )}
                </span>
                <div
                  className={`flex flex-1 flex-col gap-2 border-t pt-4 transition-[opacity,border-color] duration-500 ${
                    i === active ? "border-brand-black opacity-100" : "border-brand-black/10 opacity-55"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-sans text-xs font-medium uppercase tracking-[0.12em] text-brand-black/50">
                      Phase {pad(phase.num)}{phaseDates(phase)}
                    </span>
                    <StatusChip status={phase.status} />
                  </div>
                  <h3 className="mt-1 font-serif text-xl font-light uppercase leading-none tracking-[-0.02em] md:text-[1.5rem]">
                    {phase.title}
                  </h3>
                  <p className="max-w-[520px] font-sans text-sm leading-[1.5] text-brand-black/75">{phase.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="ml-auto w-[53%] pl-[47px]">
        <RequestInterest />
      </div>
      </div>
      </div>

      <Reveal className="flex justify-center md:hidden">
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

/**
 * Phones: the build's progress as a horizontal timeline — a node per phase
 * on a track that's filled up to the phase in progress (which pulses). The
 * phase whose card is in view is highlighted; tapping a node jumps to it.
 */
function PhaseProgress({
  phases,
  viewed,
  onPick,
}: {
  phases: ConstructionUpdates["phases"];
  viewed: number;
  onPick: (i: number) => void;
}) {
  const n = phases.length;
  const done = phases.filter((p) => p.status === "Completed").length;
  const current = phases.findIndex((p) => p.status === "In progress");
  // Fill reaches the in-progress node (or the last completed one).
  const reach = current >= 0 ? current : Math.max(0, done - 1);
  const pct = n > 1 ? (reach / (n - 1)) * 100 : 0;

  return (
    <Reveal className="md:hidden">
      <div className="flex items-center justify-between pb-3 font-sans text-[11px] font-medium uppercase tracking-[0.12em]">
        <span className="text-brand-black/50">Progress</span>
        <span className="text-brand-black">
          {done} of {n} phases complete
        </span>
      </div>
      {/* Track + fill run through the node centres (half a node in from each end). */}
      <div className="relative">
        <div className="absolute inset-x-[10px] top-[9px] h-[2px] bg-brand-black/10" />
        <div
          className="absolute left-[10px] top-[9px] h-[2px] bg-brand-black transition-[width] duration-700"
          style={{ width: `calc((100% - 20px) * ${pct / 100})` }}
        />
        <ol className="relative flex justify-between">
          {phases.map((phase, i) => {
            const isViewed = i === viewed;
            const state =
              phase.status === "Completed"
                ? "border-brand-black bg-brand-black"
                : phase.status === "In progress"
                  ? "border-brand-black bg-brand-white"
                  : "border-brand-black/20 bg-brand-white";
            return (
              <li key={phase.title}>
                <button
                  type="button"
                  onClick={() => onPick(i)}
                  aria-label={`Phase ${pad(i + 1)}: ${phase.title} (${phase.status})`}
                  aria-current={isViewed ? "step" : undefined}
                  className="flex w-5 flex-col items-center gap-2"
                >
                  <span
                    className={`relative flex size-5 items-center justify-center rounded-full border-2 transition-transform duration-300 ${state} ${
                      isViewed ? "scale-110" : "scale-90"
                    }`}
                  >
                    {phase.status === "In progress" && (
                      <>
                        <span className="absolute -inset-1.5 animate-[plan-pulse_2.4s_cubic-bezier(0.22,1,0.36,1)_infinite] rounded-full bg-brand-black/15" />
                        <span className="size-1.5 rounded-full bg-brand-black" />
                      </>
                    )}
                    {phase.status === "Completed" && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                        <path d="M2 5.2 4.1 7.3 8 3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <span
                    className={`font-sans text-[10px] font-medium tabular-nums tracking-[0.08em] transition-colors duration-300 ${
                      isViewed ? "text-brand-black" : "text-brand-black/40"
                    }`}
                  >
                    {pad(i + 1)}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </Reveal>
  );
}
