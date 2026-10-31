"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "@/components/ProgressiveImage";
import RollText from "@/components/RollText";
import ActionButton from "@/components/ActionButton";
import type { MasterPlanItem } from "@/data/projectDetail";

/**
 * NeighborhoodDrawer — the master plan's side drawer, in the same black
 * language as the team profile drawer: the page dims and blurs, a white
 * curtain edge leads the panel in, the image unveils upward and the text
 * follows. Prev/next on a white footer; Escape and the arrow keys work.
 * "Request interest" closes the drawer and glides to the interest form.
 */
const EASE = [0.76, 0, 0.24, 1] as const;
const SOFT = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export default function NeighborhoodDrawer({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: MasterPlanItem[];
  /** Open item, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const reduce = useReducedMotion();
  const open = index !== null;
  const item = open ? items[index] : null;
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = items.length;

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

  const requestInterest = () => {
    onClose();
    // Wait for the page to unlock before gliding to the form.
    setTimeout(() => {
      document.getElementById("request-interest")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    }, 350);
  };

  return (
    <AnimatePresence>
      {open && item && (
        <div className="fixed inset-0 z-[90]" key="neighborhood-drawer">
          <motion.div
            className="absolute inset-0 bg-black/55 backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: dur(0.5), ease: SOFT } }}
            exit={{ opacity: 0, transition: { duration: dur(0.45), ease: EASE, delay: dur(0.15) } }}
            onClick={onClose}
          />
          <motion.div
            aria-hidden
            className="absolute inset-y-0 right-0 w-full bg-brand-white md:w-[min(720px,52vw)]"
            initial={{ x: "100%" }}
            animate={{ x: "0%", transition: { duration: dur(0.8), ease: EASE } }}
            exit={{ x: "100%", transition: { duration: dur(0.7), ease: EASE, delay: dur(0.1) } }}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={item.name}
            className="absolute inset-y-0 right-0 flex w-full flex-col overflow-hidden bg-[#0b0b0b] text-brand-white md:w-[min(720px,52vw)]"
            initial={{ x: "100%" }}
            animate={{ x: "0%", transition: { duration: dur(0.8), ease: EASE, delay: dur(0.08) } }}
            exit={{ x: "100%", transition: { duration: dur(0.7), ease: EASE } }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-6 z-10 flex size-8 items-center justify-center text-white/70 transition-[color,transform] duration-300 hover:rotate-90 hover:text-white md:right-10 md:top-10"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M3 3l14 14M17 3L3 17" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>

            <div className="relative min-h-0 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={item.number}
                  className="absolute inset-0 overflow-y-auto"
                  exit={{ opacity: 0, transition: { duration: dur(0.25), ease: SOFT } }}
                >
                  <div className="flex flex-col gap-8 px-6 pb-12 pt-20 md:px-10 md:pb-14 md:pt-24">
                    {/* Image — unveils upward from a soft zoom. */}
                    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-[2px]">
                      <motion.div
                        className="absolute inset-0"
                        initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                        animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: dur(1), ease: EASE, delay: dur(0.35) } }}
                      >
                        <motion.div
                          className="absolute inset-0"
                          initial={{ scale: reduce ? 1 : 1.15 }}
                          animate={{ scale: 1, transition: { duration: dur(1.6), ease: SOFT, delay: dur(0.35) } }}
                        >
                          <Image src={item.image} alt={item.name} fill sizes="(min-width: 768px) 46vw, 100vw" quality={90} className="object-cover" />
                        </motion.div>
                      </motion.div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <motion.span
                        className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-white/50 md:text-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: dur(0.6), ease: SOFT, delay: dur(0.55) } }}
                      >
                        Neighborhood {pad(item.number)}
                      </motion.span>
                      <h3 className="overflow-hidden pb-[0.08em] font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(2rem,3vw,3.25rem)]">
                        <motion.span
                          className="block"
                          initial={{ y: reduce ? 0 : "105%" }}
                          animate={{ y: "0%", transition: { duration: dur(0.9), ease: SOFT, delay: dur(0.5) } }}
                        >
                          {item.name}
                        </motion.span>
                      </h3>
                    </div>

                    <motion.div
                      aria-hidden
                      className="h-px w-full origin-left bg-white/20"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1, transition: { duration: dur(1), ease: EASE, delay: dur(0.65) } }}
                    />

                    <motion.p
                      className="font-serif text-xl leading-[1.4] text-white md:text-2xl"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: dur(0.7), ease: SOFT, delay: dur(0.75) } }}
                    >
                      {item.blurb}
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: dur(0.6), ease: SOFT, delay: dur(0.85) } }}
                    >
                      <ActionButton label="Request interest" tone="light" variant="solid" onClick={requestInterest} />
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer: previous / next neighborhood, on white. */}
            <div className="grid grid-cols-2 bg-brand-white text-brand-black">
              {[-1, 1].map((step) => {
                const target = (((index ?? 0) + step) % n + n) % n;
                const chevron = (
                  <svg
                    width="12"
                    height="24"
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
                    />
                  </svg>
                );
                return (
                  <button
                    key={step}
                    type="button"
                    onClick={() => onIndex(target)}
                    className={`group flex items-stretch gap-4 px-6 py-5 transition-colors duration-300 hover:bg-black/[0.03] md:px-10 ${
                      step > 0 ? "justify-end border-l border-black/10 text-right" : "text-left"
                    }`}
                  >
                    {step < 0 && chevron}
                    <span className="flex flex-col gap-1">
                      <span className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-black/45 md:text-xs">
                        {step < 0 ? "Previous" : "Next"}
                      </span>
                      <span className="font-serif text-lg uppercase text-black/70 transition-colors duration-300 group-hover:text-black md:text-xl">
                        <RollText>{items[target].name}</RollText>
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
