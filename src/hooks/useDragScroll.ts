"use client";

import { useRef } from "react";

/**
 * Drag-to-scroll for a horizontally overflowing container. Touch devices get
 * this natively via `overflow-x-auto`; this adds click-and-drag with a mouse
 * (and exposes `wasDragged()` so consumers can swallow the click that would
 * otherwise fire on the element you dragged over).
 */
export function useDragScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const state = useRef({ down: false, startX: 0, scroll: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    state.current = {
      down: true,
      startX: e.clientX,
      scroll: el.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || !state.current.down) return;
    const dx = e.clientX - state.current.startX;
    if (Math.abs(dx) > 4) state.current.moved = true;
    el.scrollLeft = state.current.scroll - dx;
  };

  const end = () => {
    state.current.down = false;
  };

  return {
    ref,
    dragProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp: end,
      onPointerLeave: end,
    },
    /** True if the last pointer interaction was a drag, not a tap. */
    wasDragged: () => state.current.moved,
  };
}
