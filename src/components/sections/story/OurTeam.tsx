"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  image?: string;
  bio: string;
}

const TEAM: TeamMember[] = [
  {
    name: "Mohamed Allam",
    role: "CEO",
    image: "/images/team-mohamed-allam.jpg",
    bio: "As CEO, Mohamed Allam leads Hassan Allam Properties with a family-first philosophy carried across three generations. He has steered the group's evolution into one of Egypt's most trusted boutique developers, championing intimate communities where design, quality and hospitality come together.",
  },
  {
    name: "Amr Gad",
    role: "Operations Director",
    bio: "Amr Gad oversees day-to-day operations across Hassan Allam Properties' nationwide portfolio, ensuring every community is delivered to the group's exacting standards of quality, timing and craftsmanship.",
  },
  {
    name: "Ayten Anwar",
    role: "Investment & Strategy Director",
    bio: "Ayten Anwar leads investment and strategy, shaping the long-term direction of the portfolio and identifying the opportunities that keep Hassan Allam Properties at the forefront of Egyptian real estate.",
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

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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
              className="fixed left-1/2 top-1/2 z-[90] w-[90vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-[2px] bg-brand-white p-8 md:p-10"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-col gap-1">
                  <p className="font-serif text-3xl uppercase leading-none tracking-[-0.02em] text-brand-black">
                    {selected.name}
                  </p>
                  <p className="font-sans text-lg font-medium text-grey-500">
                    {selected.role}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="shrink-0 text-brand-black transition-opacity duration-200 hover:opacity-60"
                >
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                    <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
              <p className="mt-6 font-sans text-base leading-[1.5] text-brand-black">
                {selected.bio}
              </p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
