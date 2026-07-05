"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Reveal } from "@/components/Reveal";

const MILESTONES = [
  {
    year: "1936",
    title: "The Founding of Hassan Allam",
    description:
      "Hassan Allam Group is founded in Cairo, laying the first stone of a family legacy that would grow across three generations.",
    image: "/images/image 383.jpg",
  },
  {
    year: "1990s",
    title: "A Dedicated Real Estate Arm",
    description:
      "Hassan Allam Properties emerges as the group's boutique real estate developer, focused on intimate, family-first communities.",
    image: "/images/image 384.jpg",
  },
  {
    year: "2006",
    title: "The First Gated Community",
    description:
      "HAP delivers its first fully gated neighborhood in New Cairo, setting the standard for the exclusive communities that would follow.",
    image: "/images/image 385.jpg",
  },
  {
    year: "2015",
    title: "A Move Toward the Coast",
    description:
      "The portfolio expands beyond the capital to the Red Sea and North Coast, bringing HAP's family-first ethos to seaside living.",
    image: "/images/image 386.jpg",
  },
  {
    year: "2020",
    title: "A Nationwide Portfolio",
    description:
      "With 30+ active developments across 10 governorates, HAP solidifies its place among Egypt's most trusted developers.",
    image: "/images/image 387.jpg",
  },
  {
    year: "Today",
    title: "Building for the Next Generation",
    description:
      "Three generations in, Hassan Allam Properties keeps crafting communities where families come first — now and for decades to come.",
    image: "/images/image 388.jpg",
  },
];

const N = MILESTONES.length;
// Panel i is centered in the stage when scrollYProgress = i * STEP.
const STEP = 1 / (N - 1);

/**
 * One stacked layer of the stationary photo frame (markwoodland-style swap):
 * as the scroll approaches milestone `index`, the incoming photo slides up
 * over the previous one, with a counter-parallax on the image inside so the
 * swap reads as a curtain reveal. Scroll-scrubbed, so it plays in reverse too.
 */
function SwapImage({
  progress,
  index,
  src,
  alt,
}: {
  progress: MotionValue<number>;
  index: number;
  src: string;
  alt: string;
}) {
  // Swap window: between the previous panel and this one (never at rest).
  const start = (index - 0.75) * STEP;
  const end = (index - 0.25) * STEP;
  const y = useTransform(progress, [start, end], ["100%", "0%"]);
  // Counter-parallax: the incoming photo drifts down into place while its
  // wrapper slides up. The 1.15 scale over-covers the wrapper so the shift
  // never exposes a gap (max shift 10% < 7.5% margin × 2).
  const innerY = useTransform(progress, [start, end], ["-10%", "0%"]);
  const innerScale = useTransform(progress, [start, end], [1.15, 1]);

  if (index === 0) {
    return (
      <div className="absolute inset-0">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 42vw, 90vw" quality={90} className="object-cover" />
      </div>
    );
  }

  return (
    <motion.div style={{ y }} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y: innerY, scale: innerScale }} className="absolute inset-0">
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 42vw, 90vw" quality={90} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

/**
 * One milestone's text. It rides the panning track, but its opacity is a
 * strict gate: fully faded out by +0.3·STEP after its centre, and the next
 * panel only starts fading in at −0.3·STEP before its own centre — so the
 * windows never overlap (photo swap happens in the dark gap between them).
 * The keyframes clamp naturally for the first/last panels.
 */
function TextPanel({
  milestone,
  index,
  progress,
}: {
  milestone: (typeof MILESTONES)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  // Function-based transform on purpose: keyframe-array transforms on
  // opacity get lowered to a native scroll-linked WAAPI animation whose
  // clamping/offset semantics broke this gating (stale implicit keyframes,
  // out-of-range offsets throwing). A function can't be serialised to
  // keyframes, so framer keeps it on the JS path — same path the photo-swap
  // transforms use, which behaves correctly.
  const center = index * STEP;
  const opacity = useTransform(progress, (p) => {
    const d = (p - center) / STEP; // distance from this panel's centre, in segments
    // Before the first / after the last panel there's nothing to hand over to.
    if (index === 0 && d < 0) return 1;
    if (index === N - 1 && d > 0) return 1;
    const a = Math.abs(d);
    if (a <= 0.12) return 1; // fully visible around centre
    if (a >= 0.3) return 0; // fully hidden — neighbour's window never overlaps
    return (0.3 - a) / 0.18; // linear fade between the two
  });

  return (
    <motion.div
      style={{ width: `${100 / N}%`, opacity }}
      className="flex h-full shrink-0 flex-col justify-center gap-4 md:gap-10"
    >
      <p className="font-serif font-light leading-[0.9] tracking-[-0.02em] text-brand-black [font-size:clamp(2.75rem,8vw,7rem)]">
        {milestone.year}
      </p>
      <div className="flex flex-col gap-3 md:gap-4">
        <p className="max-w-[560px] font-serif font-medium capitalize leading-[1.1] tracking-[-0.01em] text-brand-black [font-size:clamp(1.375rem,2.6vw,2.25rem)]">
          {milestone.title}
        </p>
        <p className="max-w-[520px] font-sans text-base leading-[1.4] text-brand-black">
          {milestone.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function HistoryTimeline() {
  const ref = useRef<HTMLElement>(null);
  // Pinned stage: vertical scroll through the tall section drives both the
  // horizontal text pan and the photo swaps in the stationary frame.
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
          <Reveal y={12}>
            <p className="font-sans text-sm font-medium uppercase tracking-[0.08em] text-grey-500">
              Our Journey
            </p>
          </Reveal>
        </div>

        {/* Stage: stationary photo frame + horizontally panning text.
            min-h-0 + max-h clamps keep the frame inside this row so it can
            never overlap the progress bar below. */}
        <div className="flex min-h-0 flex-1 flex-col gap-6 px-6 py-6 md:flex-row md:items-center md:gap-14 md:px-16">
          <div className="relative min-h-0 w-full shrink-0 overflow-hidden rounded-[2px] max-md:aspect-[4/3] max-md:max-h-[38vh] md:h-full md:max-h-[calc((100vw-128px)*0.42*1.159)] md:w-[42%]">
            {MILESTONES.map((m, i) => (
              <SwapImage
                key={m.year}
                progress={scrollYProgress}
                index={i}
                src={m.image}
                alt={m.title}
              />
            ))}
          </div>

          {/* Text track — panels slide horizontally through this clipped
              column while the photo swaps in place. Each panel's opacity is
              gated so the outgoing milestone is fully gone before the next
              appears — you never see two milestones at once mid-scroll. */}
          <div className="relative min-h-0 flex-1 self-stretch overflow-hidden">
            <motion.div style={{ x, width: `${N * 100}%` }} className="flex h-full">
              {MILESTONES.map((m, i) => (
                <TextPanel key={m.year} milestone={m} index={i} progress={scrollYProgress} />
              ))}
            </motion.div>
          </div>
        </div>

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
