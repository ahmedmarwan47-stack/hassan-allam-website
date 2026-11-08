"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "@/components/ProgressiveImage";
import RollText from "@/components/RollText";
import ActionButton from "@/components/ActionButton";
import type { MasterPlanItem } from "@/data/projectDetail";
import { PREFILL_INTEREST } from "./ProjectActions";
import { useRtl, useT } from "@/i18n/LocaleProvider";

/**
 * NeighborhoodDrawer — the master plan's side drawer, in the same black
 * language as the team profile drawer: the page dims and blurs, a white
 * curtain edge leads the panel in, the image unveils upward and the text
 * follows. Prev/next on a white footer; Escape and the arrow keys work.
 * "Discover more" opens the neighborhood's own page; "Request interest"
 * opens that page at its interest form (or, without a page, pre-fills this
 * page's form with the neighborhood and glides to it).
 *
 * On desktop the drawer comes in from the right and stays narrow, with the
 * dim fading out towards the left — so most of the plan, and its
 * highlighted pin, stays in view while stepping through neighborhoods.
 */
const EASE = [0.76, 0, 0.24, 1] as const;
const SOFT = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export default function NeighborhoodDrawer({
  items,
  index,
  onClose,
  onIndex,
  discoverHref,
}: {
  items: MasterPlanItem[];
  /** Open item, or null when closed. */
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
  /** The neighborhood page for a list number, when there is one. */
  discoverHref?: (number: number) => string | undefined;
}) {
  const reduce = useReducedMotion();
  const t = useT();
  const rtl = useRtl();
  // Comes in from the end side: the right in English, the left on /ar.
  const off = rtl ? "-100%" : "100%";
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
      // "Next" sits on the reading end: right in English, left on /ar.
      const fwd = rtl ? "ArrowLeft" : "ArrowRight";
      const back = rtl ? "ArrowRight" : "ArrowLeft";
      if (e.key === fwd) onIndex(((index ?? 0) + 1) % n);
      if (e.key === back) onIndex(((index ?? 0) - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    const timer = setTimeout(() => closeRef.current?.focus(), 500);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, [open, index, n, onClose, onIndex, rtl]);

  const dur = (s: number) => (reduce ? 0 : s);

  const requestInterest = () => {
    onClose();
    if (item) {
      window.dispatchEvent(
        new CustomEvent(PREFILL_INTEREST, { detail: t("I’m interested in {name}.", { name: t(item.name) }) }),
      );
    }
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
            className="absolute inset-0 bg-black/55 md:bg-transparent md:bg-gradient-to-l md:rtl:bg-gradient-to-r md:from-black/60 md:via-black/25 md:to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: dur(0.5), ease: SOFT } }}
            exit={{ opacity: 0, transition: { duration: dur(0.45), ease: EASE, delay: dur(0.15) } }}
            onClick={onClose}
          />
          <motion.div
            aria-hidden
            className="absolute inset-y-0 end-0 w-full bg-brand-white md:w-[min(620px,40vw)]"
            initial={{ x: off }}
            animate={{ x: "0%", transition: { duration: dur(0.8), ease: EASE } }}
            exit={{ x: off, transition: { duration: dur(0.7), ease: EASE, delay: dur(0.1) } }}
          />

          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={t(item.name)}
            className="absolute inset-y-0 end-0 flex w-full flex-col overflow-hidden bg-[#0b0b0b] text-brand-white md:w-[min(620px,40vw)]"
            initial={{ x: off }}
            animate={{ x: "0%", transition: { duration: dur(0.8), ease: EASE, delay: dur(0.08) } }}
            exit={{ x: off, transition: { duration: dur(0.7), ease: EASE } }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t("Close")}
              className="absolute end-5 top-4 z-10 flex size-8 items-center justify-center text-white/70 transition-[color,rotate] duration-300 hover:rotate-90 hover:text-white"
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
                  <div className="flex flex-col gap-5 px-6 pb-6 pt-14">
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
                          <Image src={item.image} alt={t(item.name)} fill sizes="(min-width: 768px) 40vw, 100vw" quality={90} className="object-cover" />
                        </motion.div>
                      </motion.div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <motion.span
                        className="font-sans text-xs font-medium uppercase tracking-[0.14em] text-white/50 md:text-sm"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: dur(0.6), ease: SOFT, delay: dur(0.55) } }}
                      >
                        {t("Neighborhood {n}", { n: pad(item.number) })}
                      </motion.span>
                      <h3 className="overflow-hidden pb-[0.08em] font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(2rem,3vw,3.25rem)]">
                        <motion.span
                          className="block"
                          initial={{ y: reduce ? 0 : "105%" }}
                          animate={{ y: "0%", transition: { duration: dur(0.9), ease: SOFT, delay: dur(0.5) } }}
                        >
                          {t(item.name)}
                        </motion.span>
                      </h3>
                    </div>

                    <motion.div
                      aria-hidden
                      className="h-px w-full origin-left bg-white/20 rtl:origin-right"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1, transition: { duration: dur(1), ease: EASE, delay: dur(0.65) } }}
                    />

                    <motion.p
                      className="font-sans text-sm leading-[1.55] text-white/85 md:text-base"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: dur(0.7), ease: SOFT, delay: dur(0.75) } }}
                    >
                      {t(item.blurb)}
                    </motion.p>

                    <motion.div
                      className="flex flex-wrap gap-2.5"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0, transition: { duration: dur(0.6), ease: SOFT, delay: dur(0.85) } }}
                    >
                      {discoverHref?.(item.number) && (
                        <ActionButton label="Discover more" tone="light" variant="solid" size="sm" href={discoverHref(item.number)} />
                      )}
                      {/* To the neighborhood's own interest form when it has a
                          page; otherwise the project's form on this page. */}
                      {discoverHref?.(item.number) ? (
                        <ActionButton
                          label="Request interest"
                          tone="light"
                          size="sm"
                          href={`${discoverHref(item.number)}#request-interest`}
                        />
                      ) : (
                        <ActionButton label="Request interest" tone="light" size="sm" onClick={requestInterest} />
                      )}
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
                    width="8"
                    height="16"
                    viewBox="0 0 12 24"
                    fill="none"
                    aria-hidden
                    className={`shrink-0 self-center text-black/40 transition-[color,transform] duration-300 group-hover:text-black rtl:-scale-x-100 ${
                      step < 0
                        ? "group-hover:-translate-x-1 rtl:group-hover:translate-x-1"
                        : "group-hover:translate-x-1 rtl:group-hover:-translate-x-1"
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
                    className={`group flex min-w-0 items-center gap-2.5 px-6 py-3 transition-colors duration-300 hover:bg-black/[0.03] ${
                      step > 0 ? "justify-end border-s border-black/10 text-end" : "text-start"
                    }`}
                  >
                    {step < 0 && chevron}
                    <span className="flex min-w-0 flex-col gap-0.5">
                      <span className="font-sans text-[9px] font-medium uppercase tracking-[0.14em] text-black/45">
                        {step < 0 ? t("Previous") : t("Next")}
                      </span>
                      <span className="truncate font-sans text-[11px] font-medium uppercase tracking-[0.06em] text-black/70 transition-colors duration-300 group-hover:text-black">
                        <RollText>{t(items[target].name)}</RollText>
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
