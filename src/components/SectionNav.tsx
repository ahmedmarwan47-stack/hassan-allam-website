"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * SectionNav — in-page navigation bar for long pages (the Story page).
 *
 * A full-width white, frosted bar rises from the bottom edge once the
 * visitor scrolls past the hero and sinks away again when the footer
 * arrives. It lists the page's sections, evenly spaced; an underline glides
 * to the one currently in view, and clicking an item smooth-scrolls to it.
 * On narrow screens the bar scrolls sideways and keeps the active item in
 * view.
 */
export default function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(items[0]?.id);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const vh = window.innerHeight;
      const first = document.getElementById(items[0].id);
      const footer = document.querySelector("footer");
      const started = first ? first.getBoundingClientRect().top < vh * 0.6 : window.scrollY > vh * 0.5;
      const atFooter = footer ? footer.getBoundingClientRect().top < vh * 0.9 : false;
      setVisible(started && !atFooter);

      // Active = the last section whose top has passed 40% of the viewport.
      let current = items[0].id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= vh * 0.4) current = id;
      }
      setActive(current);
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
  }, [items]);

  // Keep the active item in view when the bar overflows (mobile).
  useEffect(() => {
    const list = listRef.current;
    const btn = list?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!list || !btn || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({ left: btn.offsetLeft - list.clientWidth / 2 + btn.offsetWidth / 2, behavior: "smooth" });
  }, [active]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="On this page"
          className="fixed inset-x-0 bottom-0 z-40"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30, mass: 0.9 }}
        >
          <div
            ref={listRef}
            className="flex items-center overflow-x-auto border-t border-black/[0.08] bg-white/90 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl [-ms-overflow-style:none] [scrollbar-width:none] md:justify-evenly md:px-6"
          >
            {items.map(({ id, label }) => {
              const isActive = id === active;
              return (
                <button
                  key={id}
                  type="button"
                  data-id={id}
                  onClick={() => go(id)}
                  aria-current={isActive ? "location" : undefined}
                  className={`shrink-0 whitespace-nowrap px-4 py-3 font-sans text-[11px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 md:px-3 md:text-xs ${
                    isActive ? "text-brand-black" : "text-brand-black/50 hover:text-brand-black"
                  }`}
                >
                  <span className="relative block">
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="section-nav-marker"
                        aria-hidden
                        className="absolute inset-x-0 -bottom-1 h-px bg-brand-black"
                        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
