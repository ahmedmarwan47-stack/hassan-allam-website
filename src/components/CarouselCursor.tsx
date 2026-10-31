"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
  type Transition,
} from "framer-motion";

/**
 * useCarouselCursor — elastic "Drag" cursor + drag-to-slide for carousels.
 *
 * Over the carousel a frosted white rectangle (80% white, blurring what's
 * behind) sits just right of the system arrow pointer: top-aligned with the
 * arrow's tip, 2px clear of the arrow, so the two never overlap.
 * It trails the pointer on a spring and stretches/skews with its velocity,
 * like jelly. Over the middle of a card's image (an `a` / `button` card) or
 * over its name it reads "Discover →"; over the image's outer EDGE_ZONE on
 * either side, the gaps, and for the whole of a drag it reads "← Drag →".
 *
 * Dragging (mouse or touch) moves the track 1:1 via `dragX` (with rubber-band
 * resistance only past the first/last slide, per `canPrev` / `canNext`);
 * releasing past the threshold calls `onPrev` / `onNext`. A horizontal
 * trackpad swipe does the same, one slide per gesture. On a slide change
 * `dragX` eases home with `settle` — pass the track's own transition so the
 * two motions add up to one smooth glide instead of a snap-back. The click
 * that ends a drag is swallowed so cards don't navigate.
 *
 * Usage:
 *   const { bind, viewportClass, dragX, cursor } = useCarouselCursor({ onPrev, onNext, settle });
 *   <div {...bind} className={`overflow-hidden … ${viewportClass}`}>  // the viewport
 *     <motion.div style={{ x: dragX }}>…track…</motion.div>
 *   </div>
 *   {cursor}
 */

const DRAG_START_PX = 6; // movement before a press counts as a drag
const SWIPE_PX = 50; // drag distance that changes slide
const EDGE_RUBBER = 0.3; // past the first/last slide the track follows at this fraction
const WHEEL_PX = 80; // trackpad swipe distance that changes slide
const WHEEL_IDLE_MS = 160; // quiet time that ends a trackpad gesture (incl. momentum)
const DRAG_W = 112; // rectangle widths per label (px)
const DISCOVER_W = 140;
const ARROW_W = 12; // width of the system arrow cursor from its tip (px)
const EDGE_ZONE = 0.2; // outer fraction of a card image, each side → "Drag"

type Mode = "drag" | "discover";

export function useCarouselCursor({
  onPrev,
  onNext,
  discoverLabel = "Discover",
  canPrev = true,
  canNext = true,
  settle = { type: "spring", stiffness: 260, damping: 26 },
}: {
  onPrev: () => void;
  onNext: () => void;
  /** Label shown when resting on a card; `null` keeps the Drag cursor. */
  discoverLabel?: string | null;
  /** False at the first / last slide: dragging that way meets resistance. */
  canPrev?: boolean;
  canNext?: boolean;
  /** How `dragX` returns home after a slide change — match the track's transition. */
  settle?: Transition;
}) {
  const [hovering, setHovering] = useState(false);
  const [mode, setMode] = useState<Mode>("drag");
  const [pressed, setPressed] = useState(false);
  // Portal mounts on first mouse hover (client-only, so no SSR mismatch) and
  // then stays, fading in and out with `hovering`.
  const [mounted, setMounted] = useState(false);

  /* ─── Pointer position, sprung for the elastic rectangle ─── */
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 380, damping: 30, mass: 0.6 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  const vx = useVelocity(sx);
  const vy = useVelocity(sy);
  // Jelly: stretch along each axis of travel, squash across it, and lean
  // (skew) into horizontal motion.
  const stretchOf = (v: number) => Math.min(Math.abs(v) / 3200, 0.22);
  const scaleX = useTransform([vx, vy], ([a, b]: number[]) =>
    1 + stretchOf(a) - stretchOf(b) * 0.5,
  );
  const scaleY = useTransform([vx, vy], ([a, b]: number[]) =>
    1 + stretchOf(b) - stretchOf(a) * 0.5,
  );
  const skewX = useTransform(vx, (a) => Math.max(-10, Math.min(10, -a / 160)));

  /* ─── Drag-to-slide state ─── */
  const dragX = useMotionValue(0);
  const drag = useRef({ down: false, startX: 0, moved: false, id: -1 });

  // Latest props for the native wheel listener (attached once).
  const latest = useRef({ onPrev, onNext, canPrev, canNext, settle });
  useEffect(() => {
    latest.current = { onPrev, onNext, canPrev, canNext, settle };
  });

  // 1:1 follow, with resistance only where there's no slide to go to.
  const follow = (dx: number) => {
    const { canPrev: p, canNext: n } = latest.current;
    return (dx > 0 && !p) || (dx < 0 && !n) ? dx * EDGE_RUBBER : dx;
  };
  // Commit a slide change (or not) and bring dragX home.
  const release = (dx: number, threshold: number) => {
    const l = latest.current;
    let changed = false;
    if (dx <= -threshold && l.canNext) {
      l.onNext();
      changed = true;
    } else if (dx >= threshold && l.canPrev) {
      l.onPrev();
      changed = true;
    }
    animate(dragX, 0, changed ? l.settle : { type: "spring", stiffness: 300, damping: 30 });
    return changed;
  };

  /* ─── Trackpad: horizontal wheel swipes ─── */
  const wheel = useRef({ acc: 0, locked: false, timer: 0 as ReturnType<typeof setTimeout> | 0 });
  const viewportRef = useRef<HTMLElement | null>(null);
  const setViewport = useCallback((el: HTMLElement | null) => {
    viewportRef.current = el;
  }, []);
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      // Vertical scrolling stays the page's.
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const w = wheel.current;
      if (w.timer) clearTimeout(w.timer);
      // Gesture over (fingers lifted and momentum spent): reset.
      w.timer = setTimeout(() => {
        if (!w.locked) animate(dragX, 0, { type: "spring", stiffness: 300, damping: 30 });
        w.acc = 0;
        w.locked = false;
        w.timer = 0;
      }, WHEEL_IDLE_MS);
      if (w.locked) return; // one slide per swipe
      w.acc -= e.deltaX;
      dragX.set(follow(w.acc));
      if (Math.abs(w.acc) >= WHEEL_PX && release(w.acc, WHEEL_PX)) w.locked = true;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // "Discover" on the middle of a card's image or on its name; "Drag" on the
  // image's far sides, anywhere else, and for the whole of a drag.
  const updateMode = useCallback(
    (target: EventTarget | null, clientX: number) => {
      const card = target instanceof Element ? target.closest("a, button") : null;
      if (!discoverLabel || !card || (drag.current.down && drag.current.moved)) {
        setMode("drag");
        return;
      }
      // Text (the name) → always Discover. The image itself, its frame, or
      // the card's own padding → Discover only in the middle band.
      const onMedia =
        target instanceof Element &&
        (target.tagName === "IMG" || !!target.querySelector("img"));
      const img = card.querySelector("img");
      if (!onMedia || !img) {
        setMode("discover");
        return;
      }
      const r = img.getBoundingClientRect();
      const t = (clientX - r.left) / r.width;
      setMode(t > EDGE_ZONE && t < 1 - EDGE_ZONE ? "discover" : "drag");
    },
    [discoverLabel],
  );

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.button !== 0) return;
    drag.current = { down: true, startX: e.clientX, moved: false, id: e.pointerId };
    if (e.pointerType === "mouse") {
      setPressed(true);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === "mouse") {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    const d = drag.current;
    if (d.down) {
      const dx = e.clientX - d.startX;
      if (!d.moved && Math.abs(dx) > DRAG_START_PX) {
        d.moved = true;
        // Capture only once it's a real drag — capturing on press would
        // retarget the click to the viewport and break plain clicks on cards.
        e.currentTarget.setPointerCapture(e.pointerId);
      }
      if (d.moved) dragX.set(follow(dx));
    }
    if (e.pointerType === "mouse") updateMode(e.target, e.clientX);
  };

  const endDrag = (e: React.PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    setPressed(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    release(d.moved ? e.clientX - d.startX : 0, SWIPE_PX);
    // Pointer was captured, so look up what's actually under it now.
    if (e.pointerType === "mouse") {
      updateMode(document.elementFromPoint(e.clientX, e.clientY), e.clientX);
    }
  };

  const bind = {
    ref: setViewport,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.jump(e.clientX);
      y.jump(e.clientY);
      sx.jump(e.clientX);
      sy.jump(e.clientY);
      setMounted(true);
      setHovering(true);
      updateMode(e.target, e.clientX);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      setHovering(false);
      setMode("drag");
    },
    // Swallow the click that ends a drag so the card under it doesn't open.
    onClickCapture: (e: React.MouseEvent) => {
      if (drag.current.moved) {
        e.preventDefault();
        e.stopPropagation();
        drag.current.moved = false;
      }
    },
    // Stop the browser's native link/image ghost-drag.
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
  };
  // Merge into the viewport's own className (avoids a spread collision):
  // vertical page scroll stays native on touch, horizontal comes to us.
  // The system cursor stays visible beside the rectangle — forced to the
  // plain arrow (links would show a hand) so the 2px spacing holds.
  const viewportClass = "touch-pan-y select-none cursor-default [&_*]:cursor-default";

  const discover = mode === "discover" && !!discoverLabel;
  const ease = [0.22, 0.61, 0.21, 1] as const;

  const cursor =
    mounted &&
    createPortal(
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        initial={false}
        animate={{ opacity: hovering ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Right of the pointer: ARROW_W (the system arrow) + 2px gap. */}
        <motion.div style={{ x: sx, y: sy }} className="absolute left-0 top-0">
          <motion.div
            initial={false}
            animate={{
              width: discover ? DISCOVER_W : DRAG_W,
              scale: pressed ? 0.92 : 1,
            }}
            transition={{ duration: 0.32, ease }}
            style={{ marginLeft: ARROW_W + 2 }}
            className="relative flex h-11 origin-top-left items-center justify-center"
          >
            {/* Frosted white — 80% white, blurring what's behind. */}
            <motion.span
              style={{ scaleX, scaleY, skewX }}
              className="absolute inset-0 origin-left rounded-[3px] border border-white/60 bg-white/80 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-md"
            />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={discover ? "discover" : "drag"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease }}
                className="relative flex items-center gap-1.5 whitespace-nowrap font-sans text-sm font-medium text-brand-black"
              >
                {discover ? (
                  <>
                    {discoverLabel}
                    <svg viewBox="0 0 14 10" aria-hidden className="ml-0.5 h-2.5 w-3.5">
                      <path d="M1 5h12M9 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 6 10" aria-hidden className="h-2 w-1.5">
                      <path d="M5 1L1 5l4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Drag
                    <svg viewBox="0 0 6 10" aria-hidden className="h-2 w-1.5">
                      <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>,
      document.body,
    );

  return { bind, viewportClass, dragX, cursor };
}
