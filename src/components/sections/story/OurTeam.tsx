"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Image from "@/components/ProgressiveImage";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import RollText from "@/components/RollText";
import SliderArrow from "@/components/SliderArrow";
import SectionEyebrow from "@/components/SectionEyebrow";
import { useCarouselCursor } from "@/components/CarouselCursor";
import TeamDrawer from "./TeamDrawer";
import { TEAM } from "@/data/team";

const VISIBLE = 3.4; // cards in view on desktop — the 4th peeks in at the edge
const GAP = 20; // px between cards

/**
 * "The People Behind HAP" — the leadership team from hap.com.eg. Desktop is
 * a draggable slider (three cards in view, the fourth peeking in at the
 * right edge); mobile stacks two-up. Each card opens the member's profile
 * in the black side drawer.
 */
export default function OurTeam({ id }: { id?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, Math.ceil(TEAM.length - VISIBLE));
  const cardW = `(100% - ${Math.floor(VISIBLE) * GAP}px) / ${VISIBLE}`;

  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const goNext = useCallback(() => setIndex((i) => Math.min(maxIndex, i + 1)), [maxIndex]);
  const { bind, viewportClass, dragX, cursor } = useCarouselCursor({
    onPrev: goPrev,
    onNext: goNext,
    discoverLabel: "View bio",
    canPrev: index > 0,
    canNext: index < maxIndex,
    // Same timing as the track's CSS transition, so a drag glides on.
    settle: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
  });

  return (
    <section
      id={id}
      data-nav-theme="light"
      className="flex flex-col gap-14 bg-brand-white px-6 pb-20 pt-16 text-brand-black md:gap-16 md:px-16 md:pb-24 md:pt-24"
    >
      <SectionEyebrow>People Behind HAP</SectionEyebrow>

      {/* Title on the eyebrow's left edge; the intro stacked on the right. */}
      <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
        <Reveal>
          <h2 className="text-left font-serif font-light uppercase leading-none tracking-[-0.02em] text-brand-black [font-size:clamp(4rem,9.2vw,8.25rem)]">
            Our Team
          </h2>
        </Reveal>
        <div className="flex flex-col gap-5 font-sans text-base leading-[1.5] text-brand-black/80 md:w-[33.08%] md:pb-2">
          <Reveal delay={0.1}>
            <p>
              Behind every HAP development is a dedicated team of experts;
              architects, planners, creatives, and visionaries, driven by a
              shared passion for excellence.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p>
              Together, they bring our communities to life with purpose and
              precision, crafting lasting spaces that reflect our values, enrich
              lives, and carry forward the legacy we&rsquo;ve built over
              generations.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:gap-8">
        {/* Desktop slider */}
        <div {...bind} className={`hidden overflow-hidden md:-mr-16 md:block ${viewportClass}`}>
          <motion.div style={{ x: dragX }}>
            <div
              style={{ "--team-x": `calc(${-index} * (${cardW} + ${GAP}px))` } as React.CSSProperties}
              className="flex gap-5 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] [transform:translateX(var(--team-x))]"
            >
              {TEAM.map((member, i) => (
                <MemberCard
                  key={member.slug}
                  index={i}
                  onOpen={() => setOpen(i)}
                  className="shrink-0"
                  style={{ width: `calc(${cardW})` }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mobile grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:hidden">
          {TEAM.map((member, i) => (
            <MemberCard key={member.slug} index={i} onOpen={() => setOpen(i)} />
          ))}
        </div>

        {/* Track + arrows (desktop) */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="relative h-[3px] flex-1 overflow-hidden bg-black/15">
            <div
              className="absolute inset-y-0 bg-brand-black transition-[left] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
              style={{
                width: `${(VISIBLE / TEAM.length) * 100}%`,
                left: `${(maxIndex ? index / maxIndex : 0) * (1 - VISIBLE / TEAM.length) * 100}%`,
              }}
            />
          </div>
          <div className="flex items-center gap-2.5">
            <SliderArrow direction="prev" onClick={goPrev} disabled={index === 0} emphasis label="Previous team members" />
            <SliderArrow direction="next" onClick={goNext} disabled={index === maxIndex} emphasis label="Next team members" />
          </div>
        </div>
      </div>

      <TeamDrawer members={TEAM} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      {cursor}
    </section>
  );
}

function MemberCard({
  index,
  onOpen,
  className = "",
  style,
}: {
  index: number;
  onOpen: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const member = TEAM[index];
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${member.name}, ${member.role} — view bio`}
      style={style}
      className={`group flex flex-col gap-4 text-left md:gap-5 ${className}`}
    >
      <GrowReveal
        axis="height"
        delay={(index % 3) * 0.08}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px] bg-grey-100"
      >
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]">
          <Image
            src={member.image}
            alt={member.name}
            fill
            sizes="(min-width: 768px) 32vw, 50vw"
            quality={85}
            className="object-cover object-top grayscale"
          />
        </div>
        {/* "View bio" tag */}
        <span className="absolute bottom-4 right-4 flex items-center gap-3 bg-brand-white px-4 py-2.5 font-sans text-xs font-medium uppercase tracking-[0.12em] text-brand-black md:text-sm">
          <RollText>View bio</RollText>
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden className="transition-transform duration-500 group-hover:rotate-90">
            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </GrowReveal>
      <div className="flex flex-col gap-1.5">
        <p className="font-serif text-xl uppercase leading-none tracking-[-0.02em] text-brand-black md:text-2xl">
          {member.name}
        </p>
        <p className="font-sans text-sm font-medium leading-snug text-brand-black/60 md:text-base">
          {member.role}
        </p>
      </div>
    </button>
  );
}
