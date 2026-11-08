"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ActionButton from "@/components/ActionButton";
import { useT } from "@/i18n/LocaleProvider";

/**
 * CareerStickyBar — phones only (desktop keeps the sidebar sticky). Once
 * the page's own "Apply now" (the element with `targetId`) has scrolled
 * past the top, a compact bar slides down from under the navbar holding
 * the role and its Apply button, so applying is always one tap away. It
 * sits just under the navbar and steps aside again when the footer arrives.
 */
export default function CareerStickyBar({
  title,
  applyHref,
  targetId,
}: {
  title: string;
  applyHref: string;
  targetId: string;
}) {
  const t = useT();
  const reduce = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const target = document.getElementById(targetId);
      const footer = document.querySelector("footer");
      // "Passed" = scrolled up behind the 80px navbar.
      const passed = !!target && target.getBoundingClientRect().bottom < 80;
      const atFooter = !!footer && footer.getBoundingClientRect().top < window.innerHeight * 0.6;
      const phone = window.matchMedia("(max-width: 767px)").matches;
      const next = phone && passed && !atFooter;
      setShow(next);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-0 top-[var(--nav-h,80px)] z-[45] border-b md:hidden border-black/[0.08] bg-white/90 backdrop-blur-xl"
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "-100%" }}
          transition={reduce ? { duration: 0 } : { duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
        >
          <div className="flex items-center justify-between gap-4 px-6 py-2.5">
            <p className="line-clamp-2 min-w-0 font-serif text-base font-light uppercase leading-[1.05] tracking-[-0.02em] text-brand-black">
              {title}
            </p>
            <ActionButton label={t("Apply now")} href={applyHref} variant="solid" size="sm" className="shrink-0" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
