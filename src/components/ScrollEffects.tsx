"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollEffects — site-wide motion layer, mounted once in the root layout.
 * It fills in for anything a section hasn't animated itself:
 *
 * 1. Text entrance — headings, paragraphs, list items and quotes below the
 *    fold start hidden (a little low, blurred) and rise into place when they
 *    scroll in; siblings arriving together are staggered.
 * 2. Block entrance — images not already inside a Reveal/GrowReveal unveil
 *    upward with a clip as they arrive.
 * 3. Parallax — every cover image sitting in a clipping frame drifts inside
 *    it as the page scrolls (the image is oversized by PX_STRENGTH top and
 *    bottom so its edges never show).
 *
 * Opt out with `data-no-fx` on any ancestor. Elements already driven by
 * framer (Reveal's `data-reveal`, inline opacity/transform styles), fixed
 * chrome (header, nav, dialogs) and ParallaxImage (`data-parallax`) are left
 * alone. Content already on screen at load is never hidden, so nothing
 * flashes. Everything is skipped under prefers-reduced-motion.
 *
 * The hidden/shown states and transitions live in globals.css ([data-fx]);
 * the attributes are removed once an entrance finishes so the element's own
 * transitions (hover colours etc.) work as before.
 */

const TEXT = "h1, h2, h3, h4, h5, h6, p, li, blockquote, dt, dd, figcaption";
const SKIP =
  "[data-no-fx], [data-reveal], [data-parallax], header, nav, [role='dialog'], [aria-hidden='true'], .sr-only";
const PX_STRENGTH = 8; // parallax travel, % of the frame height each way
const STAGGER_MS = 60;
const MAX_STAGGER = 5;

export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* ─── Entrances ─── */
    const pending = new Set<HTMLElement>();
    const play = (targets: HTMLElement[]) => {
      targets
        .sort((a, b) => {
          const ra = a.getBoundingClientRect();
          const rb = b.getBoundingClientRect();
          return ra.top - rb.top || ra.left - rb.left;
        })
        .forEach((el, i) => {
          if (!pending.delete(el)) return;
          enter.unobserve(el);
          const delay = Math.min(i, MAX_STAGGER) * STAGGER_MS;
          el.style.transitionDelay = `${delay}ms`;
          el.setAttribute("data-fx-in", "");
          // Hand the element back once the entrance has played.
          window.setTimeout(() => {
            el.removeAttribute("data-fx");
            el.removeAttribute("data-fx-in");
            el.style.transitionDelay = "";
          }, delay + 1100);
        });
    };
    const enter = new IntersectionObserver(
      (entries) => play(entries.filter((e) => e.isIntersecting).map((e) => e.target as HTMLElement)),
      // Horizontal margin: cards parked off-screen in a carousel still count.
      { threshold: 0, rootMargin: "0px 100% -8% 100%" },
    );
    const queue = (el: HTMLElement, kind: string) => {
      el.setAttribute("data-fx", kind);
      pending.add(el);
      enter.observe(el);
    };
    // Backup for observer misses (fast scrolls, clipped targets): anything
    // pending whose top has come into view plays on the next scroll frame.
    const sweep = () => {
      const vh = window.innerHeight;
      const due = [...pending].filter((el) => {
        const r = el.getBoundingClientRect();
        return r.top < vh * 0.92 && r.bottom > 0;
      });
      if (due.length) play(due);
    };

    const belowFold = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.95;
    // Inside something framer drives (inline opacity/transform/clip styles)?
    const insideAnimated = (el: Element) =>
      !!el.closest("[style*='opacity'], [style*='transform'], [style*='clip-path']");
    // Text that animates its own letters/words (WritingText, scroll-lit lines).
    const animatesItself = (el: Element) => !!el.querySelector("[style*='opacity']");

    const scanText = () => {
      document.querySelectorAll<HTMLElement>(TEXT).forEach((el) => {
        if (el.hasAttribute("data-fx-seen")) return;
        el.setAttribute("data-fx-seen", "");
        if (el.closest(SKIP) || el.closest("[data-fx]") || insideAnimated(el) || animatesItself(el)) return;
        if (!el.textContent?.trim() || !belowFold(el)) return;
        if (getComputedStyle(el).translate !== "none") return; // has its own offset
        queue(el, el.matches("h1, h2, h3") ? "heading" : "text");
      });
    };

    /* ─── Images: unveil + parallax ─── */
    const frames = new Map<HTMLElement, HTMLElement>(); // layer → clipping frame
    const visible = new Set<HTMLElement>();
    const watch = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const layer = (e.target as HTMLElement & { __pxLayer?: HTMLElement }).__pxLayer;
          if (!layer) continue;
          if (e.isIntersecting) visible.add(layer);
          else visible.delete(layer);
        }
        schedule();
      },
      { rootMargin: "20% 0px" },
    );

    // The nearest ancestor that clips its content — the parallax frame.
    const clippingFrame = (el: HTMLElement) => {
      let node = el.parentElement;
      for (let depth = 0; node && depth < 6; depth++, node = node.parentElement) {
        const o = getComputedStyle(node).overflow;
        if (o.includes("hidden") || o.includes("clip")) return node;
      }
      return null;
    };

    const scanImages = () => {
      document.querySelectorAll<HTMLImageElement>("img[data-nimg='fill']").forEach((img) => {
        if (img.hasAttribute("data-fx-seen")) return;
        img.setAttribute("data-fx-seen", "");
        if (img.closest("[data-no-fx], header, nav, [role='dialog']")) return;
        if (getComputedStyle(img).objectFit === "contain") return;
        // ProgressiveImage wraps the photo in a positioned layer; move that,
        // so the image's own hover transforms stay untouched.
        const layer = img.parentElement;
        if (!layer || layer.tagName !== "SPAN") return;
        // The frame must clip exactly the image box, or the oversized layer
        // would spill past it (e.g. a card inside a clipping carousel).
        const frame = clippingFrame(layer);
        const box = layer.offsetParent as HTMLElement | null;
        if (!frame || !box) return;
        const r = frame.getBoundingClientRect();
        const b = box.getBoundingClientRect();
        if (r.width < 160 || r.height < 160) return;
        if (Math.abs(r.top - b.top) > 2 || Math.abs(r.height - b.height) > 2) return;

        // Block entrance — only for a plain image frame (no text inside, not
        // a whole section with a background photo) that no Reveal/GrowReveal
        // already animates.
        if (
          !img.closest("[data-reveal]") &&
          !insideAnimated(frame) &&
          !frame.querySelector(TEXT) &&
          r.height < window.innerHeight &&
          belowFold(frame)
        ) {
          queue(frame, "media");
        }

        if (img.closest("[data-parallax]")) return;
        layer.style.inset = `-${PX_STRENGTH}% 0`;
        layer.style.willChange = "translate";
        frames.set(layer, frame);
        (frame as HTMLElement & { __pxLayer?: HTMLElement }).__pxLayer = layer;
        watch.observe(frame);
      });
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      sweep();
      const vh = window.innerHeight;
      // Travel as % of the (oversized) layer = PX_STRENGTH % of the frame.
      const travel = (PX_STRENGTH / (100 + 2 * PX_STRENGTH)) * 100;
      visible.forEach((layer) => {
        const box = frames.get(layer);
        if (!box || !box.isConnected) {
          visible.delete(layer);
          return;
        }
        const r = box.getBoundingClientRect();
        // -1 when the frame's top meets the viewport bottom, 1 when its
        // bottom meets the viewport top; the image lags behind the page.
        const p = Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / ((vh + r.height) / 2)));
        layer.style.translate = `0 ${(p * travel).toFixed(2)}%`;
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const scan = () => {
      scanText();
      scanImages();
      schedule();
    };

    // Scan now, after late layout (fonts, images), and whenever content
    // changes (route content streaming in, filters, carousels).
    const first = window.setTimeout(scan, 120);
    let rescan = 0;
    const mo = new MutationObserver(() => {
      window.clearTimeout(rescan);
      rescan = window.setTimeout(scan, 200);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.clearTimeout(first);
      window.clearTimeout(rescan);
      mo.disconnect();
      enter.disconnect();
      watch.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      // Show anything still waiting (e.g. when leaving the page).
      document.querySelectorAll("[data-fx]").forEach((el) => {
        el.removeAttribute("data-fx");
        el.removeAttribute("data-fx-in");
      });
    };
  }, [pathname]);

  return null;
}
