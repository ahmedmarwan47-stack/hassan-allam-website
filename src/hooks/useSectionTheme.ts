"use client";

import { useEffect, useState } from "react";

export type NavTheme = "dark" | "light";

/**
 * Tracks the background theme of whichever section is currently sitting
 * underneath the fixed navbar, so the navbar can swap its own colours to stay
 * legible. Any element tagged `data-nav-theme="dark" | "light"` participates.
 *
 * `anchor` is the y-offset (px from the top of the viewport) used as the
 * detection line — roughly the vertical centre of the navbar.
 */
export function useSectionTheme(anchor = 40): NavTheme {
  const [theme, setTheme] = useState<NavTheme>("light");

  useEffect(() => {
    let frame = 0;

    const compute = () => {
      frame = 0;
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-nav-theme]"),
      );
      if (sections.length === 0) return;

      let next: NavTheme | null = null;
      for (const el of sections) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= anchor && rect.bottom > anchor) {
          next = (el.dataset.navTheme as NavTheme) ?? "light";
        }
      }

      // Above the first section (e.g. scrolled to the very top): inherit it.
      if (!next) {
        const first = sections[0].getBoundingClientRect();
        next = first.top > anchor
          ? ((sections[0].dataset.navTheme as NavTheme) ?? "light")
          : ((sections[sections.length - 1].dataset.navTheme as NavTheme) ?? "light");
      }

      setTheme((prev) => (prev === next ? prev : (next as NavTheme)));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [anchor]);

  return theme;
}
