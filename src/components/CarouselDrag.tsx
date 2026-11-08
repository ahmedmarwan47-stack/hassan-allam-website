"use client";

import { useCallback, useEffect, useRef } from "react";
import { animate, useMotionValue, type Transition } from "framer-motion";

/**
 * useCarouselDrag — drag-to-slide for the desktop carousels (the pointer
 * stays the normal system cursor; there's no custom cursor).
 *
 * Dragging (mouse or touch) moves the track 1:1 via `dragX` (with rubber-band
 * resistance only past the first/last slide, per `canPrev` / `canNext`).
 * With `stepPx` (one card's width + gap) the drag is free: on release it
 * snaps to the nearest card, carrying on by the flick's momentum — so a long
 * or fast drag passes several cards in one smooth move (the arrows still
 * step one by one). Without it, releasing past a threshold moves one slide.
 * Either way it calls `onPrev` / `onNext`, once per card. A horizontal
 * trackpad swipe does the same, one slide per gesture. On a slide change
 * `dragX` eases home with `settle` — pass the track's own transition so the
 * two motions add up to one smooth glide instead of a snap-back. The click
 * that ends a drag is swallowed so cards don't navigate.
 *
 * Usage:
 *   const { bind, viewportClass, dragX } = useCarouselDrag({ onPrev, onNext, settle });
 *   <div {...bind} className={`overflow-hidden … ${viewportClass}`}>  // the viewport
 *     <motion.div style={{ x: dragX }}>…track…</motion.div>
 *   </div>
 *
 * Right-to-left: `dragX` stays a physical offset (follow the finger), but the
 * prev/next meaning of a drag flips with the viewport's `direction` — on the
 * Arabic site the next card sits to the left, so dragging right moves on.
 * The consumer's track transform must mirror too (+index × step in RTL).
 */

const DRAG_START_PX = 6; // movement before a press counts as a drag
const SWIPE_PX = 50; // drag distance that changes slide
const EDGE_RUBBER = 0.3; // past the first/last slide the track follows at this fraction
const MOMENTUM_MS = 220; // how far a flick carries: release velocity × this
const MAX_STEPS = 6; // most cards one drag can pass
const WHEEL_PX = 80; // trackpad swipe distance that changes slide
const WHEEL_IDLE_MS = 160; // quiet time that ends a trackpad gesture (incl. momentum)

export function useCarouselDrag({
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
  settle = { type: "spring", stiffness: 260, damping: 26 },
  stepPx,
}: {
  onPrev: () => void;
  onNext: () => void;
  /** False at the first / last slide: dragging that way meets resistance. */
  canPrev?: boolean;
  canNext?: boolean;
  /** How `dragX` returns home after a slide change — match the track's transition. */
  settle?: Transition;
  /** One card's width + gap (px), measured from the viewport element —
   *  turns on free drag with snapping. */
  stepPx?: (viewport: HTMLElement) => number;
}) {
  /* ─── Drag-to-slide state ─── */
  const dragX = useMotionValue(0);
  const drag = useRef({ down: false, startX: 0, moved: false, id: -1 });
  // Recent pointer samples, for the release velocity (px/ms).
  const samples = useRef<{ x: number; t: number }[]>([]);

  // Latest props for the native wheel listener (attached once).
  const latest = useRef({ onPrev, onNext, canPrev, canNext, settle, stepPx });
  useEffect(() => {
    latest.current = { onPrev, onNext, canPrev, canNext, settle, stepPx };
  });

  // +1 in LTR, −1 in RTL: turns a physical drag distance into a logical one
  // (positive = towards the previous slide).
  const dirSign = () =>
    viewportRef.current && getComputedStyle(viewportRef.current).direction === "rtl" ? -1 : 1;
  // 1:1 follow, with resistance only where there's no slide to go to.
  const follow = (dx: number) => {
    const { canPrev: p, canNext: n } = latest.current;
    const ldx = dx * dirSign();
    return (ldx > 0 && !p) || (ldx < 0 && !n) ? dx * EDGE_RUBBER : dx;
  };
  // Commit a slide change (or not) and bring dragX home.
  const release = (physicalDx: number, threshold: number, physicalVelocity = 0) => {
    const l = latest.current;
    const sign = dirSign();
    const dx = physicalDx * sign;
    const velocity = physicalVelocity * sign;
    let changed = false;
    const step = l.stepPx && viewportRef.current ? l.stepPx(viewportRef.current) : 0;
    if (step && threshold === SWIPE_PX) {
      // Free drag: land on the card nearest where the flick would carry it.
      const n = Math.max(-MAX_STEPS, Math.min(MAX_STEPS, Math.round(-(dx + velocity * MOMENTUM_MS) / step)));
      for (let i = 0; i < Math.abs(n); i++) (n > 0 ? l.onNext : l.onPrev)();
      changed = n !== 0;
    } else if (dx <= -threshold && l.canNext) {
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

  const onPointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (e.button !== 0) return;
    drag.current = { down: true, startX: e.clientX, moved: false, id: e.pointerId };
    samples.current = [{ x: e.clientX, t: e.timeStamp }];
  };

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d.down) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > DRAG_START_PX) {
      d.moved = true;
      // Capture only once it's a real drag — capturing on press would
      // retarget the click to the viewport and break plain clicks on cards.
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        // Pointer already gone (e.g. released mid-move) — the drag still works.
      }
    }
    if (d.moved) dragX.set(follow(dx));
    samples.current.push({ x: e.clientX, t: e.timeStamp });
    if (samples.current.length > 6) samples.current.shift();
  };

  const endDrag = (e: React.PointerEvent<HTMLElement>) => {
    const d = drag.current;
    if (!d.down) return;
    d.down = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    // Velocity over the last ~100ms of the drag.
    const recent = samples.current.filter((p) => e.timeStamp - p.t < 100);
    const first = recent[0];
    const v = first && e.timeStamp > first.t ? (e.clientX - first.x) / (e.timeStamp - first.t) : 0;
    release(d.moved ? e.clientX - d.startX : 0, SWIPE_PX, d.moved ? v : 0);
  };

  const bind = {
    ref: setViewport,
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
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
  const viewportClass = "touch-pan-y select-none";

  return { bind, viewportClass, dragX };
}
