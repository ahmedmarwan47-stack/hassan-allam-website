"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useDiscoverCursor } from "@/components/DiscoverCursor";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";

const FACTS = [
  {
    label: "Developments &\nSub-Developments",
    value: "25",
    image: "/images/commercial-real-estate.jpg",
  },
  {
    label: "Employees",
    value: "320",
    image: "/images/story-hands.jpg",
  },
  {
    label: "Commercial\nReal Estate",
    value: "19,521",
    image: "/images/commercial-real-estate.jpg",
  },
];

function StoryCta() {
  // Same custom "Discover" cursor used on the Asset Classes / projects cards.
  const { bind, hoverClass, cursor } = useDiscoverCursor("Discover the story");

  return (
    <Link
      href="/story"
      {...bind}
      className={`group relative block aspect-square w-full max-w-[454px] overflow-hidden ${hoverClass}`}
    >
      <GrowReveal axis="height" className="absolute inset-0">
        <Image
          src="/images/story-hands.jpg"
          alt="Hands joining together"
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 90vw, 454px"
        />
        <div className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/30" />
      </GrowReveal>
      {/* Static label for touch / mobile — no cursor to follow there. */}
      <span className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 font-sans text-lg font-medium text-white md:hidden">
        Discover the story
        <svg width="6" height="7" viewBox="0 0 6 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.65 3.5L0.35 6.56V0.44L5.65 3.5Z" fill="white" />
        </svg>
      </span>
      {cursor}
    </Link>
  );
}

export function FactRow({
  label,
  value,
  image,
}: {
  label: string;
  value: string;
  image: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  // `compact` = mobile. On mobile there's no hover, so the expanded state is
  // triggered by the row scrolling into the centre of the viewport.
  const [compact, setCompact] = useState(false);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setCompact(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const active = compact ? inView : hovered;
  // Desktop keeps the inverted-black slide-in treatment; mobile stays on the
  // default (white) variant and just reveals a centred photo overlay.
  const invert = active && !compact;

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative w-full cursor-pointer overflow-hidden transition-colors duration-500 md:cursor-default"
      style={{ backgroundColor: invert ? "#000" : "#fff" }}
    >
      <div className="h-px w-full bg-grey-300" />

      <div
        className={`flex w-full items-center justify-between transition-[padding] duration-500 md:py-0 ${
          compact && active ? "py-10" : "py-5"
        }`}
      >
        {/* Left side: desktop image (slides in) + label */}
        <div className="flex items-center">
          {/* Desktop image — slides in from the left */}
          <div
            className="relative hidden shrink-0 overflow-hidden transition-all duration-500 ease-in-out md:block"
            style={{
              width: invert ? 200 : 0,
              height: 200,
              opacity: invert ? 1 : 0,
            }}
          >
            <Image src={image} alt={label} fill className="object-cover" sizes="200px" />
          </div>

          <div
            className="transition-all duration-500 ease-in-out"
            style={{ paddingLeft: invert ? 60 : 0 }}
          >
            <p
              className="w-[120px] whitespace-pre-line font-sans text-base font-medium leading-[1.1] transition-colors duration-500 md:w-[184px] md:text-[1.25rem]"
              style={{ color: invert ? "#fff" : "#000" }}
            >
              {label}
            </p>
          </div>
        </div>

        {/* Right side: value */}
        <div className="flex flex-col justify-center transition-all duration-500 md:h-[112px] md:w-[645px]">
          <p
            className="font-serif text-[2.75rem] font-light leading-none tracking-[-0.02em] transition-colors duration-500 md:text-[7rem]"
            style={{ color: invert ? "#fff" : "#000" }}
          >
            {value}
          </p>
        </div>
      </div>

      {/* Mobile: photo appears as a centred overlay (same idea as the Projects
          list-view rows) — the row keeps its default look underneath. */}
      <AnimatePresence>
        {compact && active && (
          <motion.div
            key="fact-photo"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 md:hidden"
          >
            <div className="relative h-[210px] w-[165px] overflow-hidden shadow-2xl">
              <Image src={image} alt={label} fill sizes="165px" className="object-cover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FactsFigures() {
  return (
    <section
      id="facts"
      data-nav-theme="light"
      className="bg-brand-white text-brand-black"
    >
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-28 px-6 py-24 md:gap-[200px] md:px-16 md:py-[180px]">
        {/* ── CEO Quote ── */}
        <div className="flex max-w-[1110px] flex-col items-center gap-[58px] text-center">
          <Reveal>
            <p className="font-serif font-light uppercase leading-[1.1] tracking-[-0.02em] [font-size:clamp(2rem,4.3vw,3.875rem)]">
              &ldquo;There is no greater pleasure than crafting{" "}
              <em className="italic">family-centric</em> communities where
              harmony and <em className="italic">exclusivity</em> translate into
              everyday life.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-base font-medium leading-[1.4]">
              Mohamed Allam — CEO
            </p>
          </Reveal>
        </div>

        {/* ── The Story ── */}
        <div className="flex max-w-[1211px] flex-col items-center gap-14">
          <div className="flex flex-col items-center gap-5">
            <Reveal>
              <h2 className="font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(5rem,14vw,12.625rem)]">
                The Story
              </h2>
            </Reveal>

            <StoryCta />
          </div>

          <Reveal delay={0.1}>
            <p className="max-w-[543px] text-center font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(0.875rem,1.5vw,1.375rem)]">
              Since its inception in the 1990&apos;s, Hassan Allam Properties has
              carved an enviable niche for itself as an exclusive boutique
              developer, building intimate communities where families always come
              first.
            </p>
          </Reveal>
        </div>

        {/* ── Facts and Figures ── */}
        <div className="flex w-full flex-col items-start gap-10 md:items-center md:gap-[70px]">
          <Reveal className="w-full">
            <h2 className="w-full text-left font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(4rem,9.2vw,8.25rem)] md:text-center">
              Facts and Figures
            </h2>
          </Reveal>

          <div className="flex w-full flex-col">
            {FACTS.map((fact, i) => (
              <FactRow key={i} {...fact} />
            ))}
            <div className="h-px w-full bg-grey-300" />
          </div>
        </div>
      </div>
    </section>
  );
}
