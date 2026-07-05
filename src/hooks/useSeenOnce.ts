"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True once the element has been seen (entered the viewport or been
 * scrolled past). Belt and suspenders on purpose:
 *
 * 1. IntersectionObserver with a sliver threshold and a huge top rootMargin
 *    (anything already above the viewport counts as seen), and
 * 2. a debounced scroll-idle geometry check — WebKit batches observer
 *    callbacks and demonstrably drops them during fast continuous scrolling,
 *    so the rect check guarantees the trigger the moment scrolling settles.
 *
 * Both listeners detach as soon as the element is seen.
 */
export function useSeenOnce(ref: RefObject<Element | null>): boolean {
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (seen) return;
    const el = ref.current;
    if (!el) return;

    const check = () => {
      const r = el.getBoundingClientRect();
      const vertOk = r.top < window.innerHeight * 0.9 && r.height > 0;
      const horizOk = r.left < window.innerWidth && r.right > 0;
      if (vertOk && horizOk) setSeen(true);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) setSeen(true);
      },
      { threshold: 0.1, rootMargin: "100000px 0px 0px 0px" },
    );
    io.observe(el);

    let t: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(check, 150);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    check();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, [ref, seen]);

  return seen;
}
