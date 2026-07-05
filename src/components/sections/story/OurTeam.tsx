"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  /** Large 26px lead paragraph in the bio pop-up (Figma 17043-51814). */
  intro: string;
  /** Two-column 16px body copy in the bio pop-up. */
  body: [string, string];
}

const TEAM: TeamMember[] = [
  {
    name: "Mohamed Allam",
    role: "CEO",
    image: "/images/team-mohamed-allam.jpg",
    intro:
      "As CEO, Mohamed Allam leads Hassan Allam Properties with a family-first philosophy carried across three generations, championing intimate communities where design, quality and hospitality come together.",
    body: [
      "Under his leadership, HAP has grown from a boutique family operation into one of Egypt's most trusted developers — 30+ developments across 10 governorates — while keeping the intimacy and craftsmanship that defined its earliest neighborhoods.",
      "He has steered the group's expansion from Cairo's east side to the Red Sea and the North Coast, pairing three generations of engineering heritage with a genuine care for the families who call each project home.",
    ],
  },
  {
    name: "Amr Gad",
    role: "Operations Director",
    intro:
      "Amr Gad oversees day-to-day operations across Hassan Allam Properties' nationwide portfolio, ensuring every community is delivered to the group's exacting standards.",
    body: [
      "From groundwork to handover, he coordinates the engineering, construction and delivery teams behind every HAP neighborhood, keeping quality, timing and craftsmanship aligned across 10 governorates.",
      "His operational discipline is what lets a boutique developer run at a nationwide scale — every project, city or coast, held to the same family standard.",
    ],
  },
  {
    name: "Ayten Anwar",
    role: "Investment & Strategy Director",
    intro:
      "Ayten Anwar leads investment and strategy, shaping the long-term direction of the portfolio that keeps Hassan Allam Properties at the forefront of Egyptian real estate.",
    body: [
      "She identifies the land, partnerships and market opportunities behind the group's growth — from prime addresses in New Cairo and Mostakbal City to seaside destinations on the Red Sea and North Coast.",
      "Her strategic lens balances heritage with ambition: protecting the exclusivity HAP is known for while opening the doors to its next generation of communities.",
    ],
  },
];

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function OurTeam() {
  const [selected, setSelected] = useState<TeamMember | null>(null);
  // Below md the pop-up becomes a bottom sheet (slides up, drag to dismiss).
  const [isMobile, setIsMobile] = useState(false);
  // Sheet drags only from the grab handle so the bio content can scroll.
  const dragControls = useDragControls();

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    if (selected) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <section
      data-nav-theme="light"
      className="flex flex-col gap-14 bg-brand-white px-6 py-20 text-brand-black md:gap-16 md:px-16 md:py-24"
    >
      <div className="flex flex-col gap-16 md:gap-20">
        {/* Title matches the Facts & Figures heading above it. */}
        <h2 className="w-full text-left font-serif font-light uppercase leading-none tracking-[-0.02em] text-brand-black [font-size:clamp(4rem,9.2vw,8.25rem)] md:text-center">
          Our Team
        </h2>
        <div className="grid gap-8 font-sans text-base leading-[1.4] text-brand-black md:grid-cols-2 md:gap-16">
          <p>
            Behind every Hassan Allam Properties community is a team that treats
            development as a craft — pairing three generations of engineering
            heritage with a genuine care for the families who will call each
            project home.
          </p>
          <p>
            Led from the top by the Allam family, our directors bring together
            decades of operational, financial and design expertise to keep the
            group at the forefront of Egyptian real estate.
          </p>
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
        {TEAM.map((member) => (
          <button
            key={member.name}
            type="button"
            onClick={() => setSelected(member)}
            className="group flex flex-col gap-5 text-left"
          >
            <div className="relative aspect-[424/454] w-full overflow-hidden rounded-[2px]">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 768px) 32vw, 100vw"
                  quality={90}
                  className="object-cover"
                />
              ) : (
                // No portrait available — a branded monogram instead of an
                // empty rectangle.
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-warm-100 to-grey-300">
                  <span className="font-serif text-7xl font-light tracking-[0.02em] text-brand-black/35">
                    {initials(member.name)}
                  </span>
                </div>
              )}
              <span className="absolute bottom-4 right-4 flex size-[42px] items-center justify-center bg-brand-white text-brand-black transition-transform duration-300 ease-out group-hover:rotate-45">
                <PlusIcon />
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-serif text-2xl uppercase leading-none tracking-[-0.02em] text-brand-black">
                {member.name}
              </p>
              <p className="font-sans text-xl font-medium text-brand-black">
                {member.role}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Bio pop-up */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div
              className="fixed inset-0 z-[80] bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelected(null)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${selected.name} biography`}
              className="fixed inset-x-0 bottom-0 z-[90] flex max-h-[88vh] w-full flex-col rounded-t-[4px] bg-brand-black p-6 pb-10 pt-3 text-brand-white md:inset-x-auto md:bottom-auto md:left-1/2 md:top-1/2 md:w-[calc(100vw-128px)] md:max-w-[1312px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-[4px] md:p-16"
              initial={isMobile ? { y: "100%" } : { opacity: 0, y: 20, scale: 0.98 }}
              animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
              exit={isMobile ? { y: "100%" } : { opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: isMobile ? 0.45 : 0.3, ease: [0.32, 0.72, 0, 1] }}
              drag={isMobile ? "y" : false}
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (isMobile && (info.offset.y > 120 || info.velocity.y > 600)) {
                  setSelected(null);
                }
              }}
            >
              {/* Grab handle — bottom sheet affordance + drag trigger, mobile only */}
              <div
                onPointerDown={(e) => isMobile && dragControls.start(e)}
                className="flex shrink-0 cursor-grab touch-none justify-center pb-4 pt-1 active:cursor-grabbing md:hidden"
              >
                <div aria-hidden className="h-1 w-10 rounded-full bg-white/30" />
              </div>

              <div className="flex min-h-0 flex-col gap-8 overflow-y-auto md:flex-row md:items-start md:gap-[100px]">
              {/* Portrait — 314×400 per Figma; monogram fallback for members
                  without a real photo, dark variant. */}
              <div className="relative aspect-[314/400] w-full shrink-0 md:w-[314px]">
                {selected.image ? (
                  <Image
                    src={selected.image}
                    alt={selected.name}
                    fill
                    sizes="314px"
                    quality={90}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/15 to-white/5">
                    <span className="font-serif text-7xl font-light tracking-[0.02em] text-brand-white/35">
                      {initials(selected.name)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-10 md:gap-20">
                <div className="flex flex-col gap-6 md:gap-10">
                  <div className="flex items-start justify-between gap-6">
                    <p className="font-serif font-light leading-none text-brand-white [font-size:clamp(2.75rem,6.94vw,6.25rem)]">
                      {selected.name.split(" ").map((word) => (
                        <span key={word} className="block">
                          {word}
                        </span>
                      ))}
                    </p>
                    {/* Mobile bottom sheet closes via drag/backdrop/Escape —
                        no X there, per feedback. */}
                    <button
                      type="button"
                      onClick={() => setSelected(null)}
                      aria-label="Close"
                      className="hidden shrink-0 text-brand-white transition-opacity duration-200 hover:opacity-60 md:block"
                    >
                      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
                        <path d="M9 9l22 22M31 9L9 31" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                  <p className="font-sans text-lg leading-[1.3] text-brand-white md:text-[1.625rem]">
                    {selected.intro}
                  </p>
                </div>

                <div className="grid gap-6 font-sans text-base leading-[1.4] text-brand-white md:grid-cols-2">
                  <p>{selected.body[0]}</p>
                  <p>{selected.body[1]}</p>
                </div>
              </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
