"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";

const MILESTONES = [
  {
    year: "1936",
    title: "The Founding of Hassan Allam",
    description:
      "Hassan Allam Group is founded in Cairo, laying the first stone of a family legacy that would grow across three generations.",
    image: "/images/image 383.webp",
  },
  {
    year: "1990s",
    title: "A Dedicated Real Estate Arm",
    description:
      "Hassan Allam Properties emerges as the group's boutique real estate developer, focused on intimate, family-first communities.",
    image: "/images/image 384.webp",
  },
  {
    year: "2006",
    title: "The First Gated Community",
    description:
      "HAP delivers its first fully gated neighborhood in New Cairo, setting the standard for the exclusive communities that would follow.",
    image: "/images/image 385.webp",
  },
  {
    year: "2015",
    title: "A Move Toward the Coast",
    description:
      "The portfolio expands beyond the capital to the Red Sea and North Coast, bringing HAP's family-first ethos to seaside living.",
    image: "/images/image 386.webp",
  },
  {
    year: "2020",
    title: "A Nationwide Portfolio",
    description:
      "With 30+ active developments across 10 governorates, HAP solidifies its place among Egypt's most trusted developers.",
    image: "/images/image 387.webp",
  },
  {
    year: "Today",
    title: "Building for the Next Generation",
    description:
      "Three generations in, Hassan Allam Properties keeps crafting communities where families come first — now and for decades to come.",
    image: "/images/image 388.webp",
  },
];

const N = MILESTONES.length;

export default function HistoryTimeline() {
  const ref = useRef<HTMLElement>(null);
  // Pinned stage: vertical scroll through the tall section drives the
  // horizontal pan from the first milestone to the last.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${((N - 1) / N) * 100}%`]);
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      data-nav-theme="light"
      className="relative bg-brand-white"
      style={{ height: `${N * 80}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-24 md:pt-28">
        {/* Header */}
        <div className="shrink-0 px-6 md:px-16">
          <Reveal>
            <p className="font-sans text-sm font-medium uppercase tracking-[0.08em] text-grey-500">
              Our Journey
            </p>
          </Reveal>
        </div>

        {/* Horizontal track */}
        <motion.div
          style={{ x, width: `${N * 100}%` }}
          className="flex min-h-0 flex-1"
        >
          {MILESTONES.map((m) => (
            <Panel key={m.year} milestone={m} />
          ))}
        </motion.div>

        {/* Progress bar + year markers */}
        <div className="shrink-0 px-6 pb-10 md:px-16">
          <div className="mb-3 flex justify-between">
            {MILESTONES.map((m) => (
              <span
                key={m.year}
                className="font-sans text-xs font-medium text-brand-black md:text-sm"
              >
                {m.year}
              </span>
            ))}
          </div>
          <div className="relative h-[2px] w-full bg-brand-black/15">
            <motion.div
              style={{ width: barWidth }}
              className="absolute inset-y-0 left-0 bg-brand-black"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Panel({ milestone }: { milestone: (typeof MILESTONES)[number] }) {
  return (
    <div
      className="flex h-full shrink-0 items-center px-6 md:px-16"
      style={{ width: `${100 / N}%` }}
    >
      <div className="flex w-full flex-col items-center gap-6 md:flex-row md:gap-14">
        {/* Desktop height is viewport-capped so the photo never overlaps the
            progress bar at the bottom of the pinned stage. */}
        <GrowReveal
          axis="height"
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] md:aspect-auto md:h-[min(calc(100vh-260px),620px)] md:w-[42%]"
        >
          <Image
            src={milestone.image}
            alt={milestone.title}
            fill
            sizes="(min-width: 768px) 42vw, 90vw"
            quality={90}
            className="object-cover"
          />
        </GrowReveal>

        {/* Content slides in horizontally with the panel as the pinned stage
            pans — that horizontal motion is the timeline's animation. */}
        <Reveal delay={0.1} className="flex flex-1 flex-col gap-6 md:gap-10">
          <p className="font-serif font-light leading-[0.9] tracking-[-0.02em] text-brand-black [font-size:clamp(3.5rem,8vw,7rem)]">
            {milestone.year}
          </p>
          <div className="flex flex-col gap-4">
            <p className="max-w-[560px] font-serif font-medium capitalize leading-[1.1] tracking-[-0.01em] text-brand-black [font-size:clamp(1.5rem,2.6vw,2.25rem)]">
              {milestone.title}
            </p>
            <p className="max-w-[520px] font-sans text-base leading-[1.4] text-brand-black">
              {milestone.description}
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
