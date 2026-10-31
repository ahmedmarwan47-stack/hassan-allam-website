"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "@/components/ProgressiveImage";
import RollText from "@/components/RollText";
import type { TeamMember } from "@/data/team";

/**
 * TeamDrawer — the black side drawer that opens a team member's profile.
 *
 * Entrance: the page blurs and dims, a white sliver sweeps in from the right
 * a beat ahead of the black panel (a "curtain" edge), then the portrait
 * unveils upward from a soft zoom while the name rises word by word and the
 * bio follows. Prev/next swaps members in place with a crossfade.
 * Closes on the button, Escape or a click outside; page scroll is locked.
 */
const EASE = [0.76, 0, 0.24, 1] as const;
const SOFT = [0.22, 1, 0.36, 1] as const;

export default function TeamDrawer({
  members,
  index,
  onClose,
  onIndex,
}: {
  members: TeamMember[];
  /** Open member, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const reduce = useReducedMotion();
  const open = index !== null;
  const member = open ? members[index] : null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = members.length;

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onIndex(((index ?? 0) + 1) % n);
      if (e.key === "ArrowLeft") onIndex(((index ?? 0) - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => closeRef.current?.focus(), 500);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, index, n, onClose, onIndex]);

  const dur = (s: number) => (reduce ? 0 : s);

  return (
    <AnimatePresence>
      {open && member && (
        <div className="fixed inset-0 z-[90]" key="team-drawer">
          {/* Backdrop — dims and blurs the page. */}
          <motion.div
            className="absolute inset-0 bg-black/55 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: dur(0.6), ease: SOFT } }}
            exit={{ opacity: 0, transition: { duration: dur(0.5), ease: EASE, delay: dur(0.2) } }}
            onClick={onClose}
          />

          {/* White curtain edge, a beat ahead of the panel. */}
          <motion.div
            aria-hidden
            className="absolute inset-y-0 right-0 w-full bg-brand-white md:w-[min(1040px,72vw)]"
            initial={{ x: "100%" }}
            animate={{ x: "0%", transition: { duration: dur(0.9), ease: EASE } }}
            exit={{ x: "100%", transition: { duration: dur(0.8), ease: EASE, delay: dur(0.12) } }}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={`${member.name}, ${member.role}`}
            className="absolute inset-y-0 right-0 flex w-full flex-col overflow-hidden bg-[#0b0b0b] text-brand-white md:w-[min(1040px,72vw)]"
            initial={{ x: "100%" }}
            animate={{ x: "0%", transition: { duration: dur(0.9), ease: EASE, delay: dur(0.1) } }}
            exit={{ x: "100%", transition: { duration: dur(0.8), ease: EASE } }}
          >
            {/* Close — a bare X, level with the top of the portrait. */}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-6 z-10 flex size-8 items-center justify-center text-white/70 transition-[color,transform] duration-300 hover:rotate-90 hover:text-white md:right-10 md:top-12"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            {/* Body — swaps in place when browsing members. */}
            <div className="relative min-h-0 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={member.slug}
                  className="absolute inset-0 overflow-y-auto"
                  exit={{ opacity: 0, transition: { duration: dur(0.3), ease: SOFT } }}
                >
                  <div className="flex flex-col gap-8 px-6 pb-12 pt-6 md:flex-row md:items-start md:gap-12 md:px-12 md:pb-16 md:pt-12">
                    {/* Portrait — same 3:4 as the cards; stays put while the
                        bio scrolls. Unveils upward from a soft zoom. */}
                    <div className="relative aspect-[3/4] w-[70%] max-w-[320px] shrink-0 overflow-hidden rounded-[2px] md:sticky md:top-12 md:w-[38%] md:max-w-none">
                      <motion.div
                        className="absolute inset-0"
                        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: dur(1.1), ease: EASE, delay: dur(0.45) } }}
                      >
                        <motion.div
                          className="absolute inset-0"
                          initial={{ scale: reduce ? 1 : 1.18 }}
                          animate={{ scale: 1, transition: { duration: dur(1.8), ease: SOFT, delay: dur(0.45) } }}
                        >
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="(min-width: 768px) 28vw, 70vw"
                            quality={90}
                            className="object-cover object-top grayscale"
                          />
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Text — name on one line, title under it, bio below,
                        all on one left edge. Right padding clears the X. */}
                    <div className="flex min-w-0 flex-1 flex-col gap-8 md:pr-12">
                      <div className="flex flex-col gap-3">
                        <h3 className="whitespace-nowrap font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(1.75rem,2.4vw,2.75rem)]">
                          {member.name.split(" ").map((word, w) => (
                            <span key={w} className="inline-block overflow-hidden pb-[0.08em] align-top">
                              <motion.span
                                className="inline-block"
                                initial={{ y: reduce ? 0 : "105%" }}
                                animate={{ y: "0%", transition: { duration: dur(1), ease: SOFT, delay: dur(0.6 + w * 0.08) } }}
                              >
                                {word}
                                {w < member.name.split(" ").length - 1 && "\u00a0"}
                              </motion.span>
                            </span>
                          ))}
                        </h3>
                        <motion.span
                          className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-white/50 md:text-sm"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0, transition: { duration: dur(0.7), ease: SOFT, delay: dur(0.75) } }}
                        >
                          {member.role}
                        </motion.span>
                      </div>

                      <motion.div
                        aria-hidden
                        className="h-px w-full origin-left bg-white/20"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1, transition: { duration: dur(1.1), ease: EASE, delay: dur(0.8) } }}
                      />

                      <motion.p
                        className="font-serif text-xl leading-[1.35] text-white md:text-2xl"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: dur(0.8), ease: SOFT, delay: dur(0.9) } }}
                      >
                        {member.intro}
                      </motion.p>

                      <div className="flex flex-col gap-5">
                        {member.body.map((para, p) => (
                          <motion.p
                            key={p}
                            className="font-sans text-base leading-[1.65] text-white/70"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0, transition: { duration: dur(0.7), ease: SOFT, delay: dur(1 + p * 0.08) } }}
                          >
                            {para}
                          </motion.p>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer: previous / next member, on white, each with a slim
                chevron centred on its label + name. */}
            <div className="grid grid-cols-2 bg-brand-white text-brand-black">
              {[-1, 1].map((step) => {
                const target = (((index ?? 0) + step) % n + n) % n;
                const chevron = (
                  <svg
                    width="8"
                    height="16"
                    viewBox="0 0 12 24"
                    fill="none"
                    aria-hidden
                    className={`shrink-0 self-center text-black/40 transition-[color,transform] duration-300 group-hover:text-black ${
                      step < 0 ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
                    }`}
                  >
                    <path
                      d={step < 0 ? "M10.5 2L1.5 12l9 10" : "M1.5 2l9 10-9 10"}
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                );
                return (
                  <button
                    key={step}
                    type="button"
                    onClick={() => onIndex(target)}
                    className={`group flex items-stretch gap-3 px-6 py-3 transition-colors duration-300 hover:bg-black/[0.03] md:px-12 ${
                      step > 0 ? "justify-end border-l border-black/10 text-right" : "text-left"
                    }`}
                  >
                    {step < 0 && chevron}
                    <span className="flex flex-col gap-0.5">
                      <span className="font-sans text-[10px] font-medium uppercase tracking-[0.14em] text-black/45">
                        {step < 0 ? "Previous" : "Next"}
                      </span>
                      <span className="font-serif text-sm uppercase text-black/70 transition-colors duration-300 group-hover:text-black md:text-base">
                        <RollText>{members[target].name}</RollText>
                      </span>
                    </span>
                    {step > 0 && chevron}
                  </button>
                );
              })}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
