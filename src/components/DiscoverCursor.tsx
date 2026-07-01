"use client";

import { useCallback, useState } from "react";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";

/**
 * useDiscoverCursor — the site-wide "Discover →" custom cursor.
 *
 * Hovering a tagged element hides the system cursor and shows a pill that
 * follows the pointer. Used on the Asset Classes cards, the projects grid,
 * the homepage "Explore our projects" cards and the "The Story" CTA image.
 *
 * Usage:
 *   const { bind, hoverClass, cursor } = useDiscoverCursor();  // or ("Discover the story")
 *   return (<>
 *     <Link {...bind} className={`… ${hoverClass}`} href="…">…</Link>
 *     {cursor}                            // render once, anywhere in the tree
 *   </>);
 */
export const DISCOVER_HOVER_CLASS = "[@media(pointer:fine)]:cursor-none";

export function useDiscoverCursor(label: string = "Discover") {
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    },
    [x, y],
  );

  // Only enable the custom cursor where a real (fine) pointer exists — on touch
  // devices there is no cursor to replace. `hoverClass` (below) hides the
  // system cursor; merge it into each target's own className to avoid a
  // spread-collision on `className`.
  const bind = {
    onPointerMove,
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setHovering(true);
    },
    onPointerLeave: () => setHovering(false),
  };

  const cursor = (
    <AnimatePresence>
      {hovering && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          style={{ x, y }}
          className="pointer-events-none fixed left-0 top-0 z-[100] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap bg-white/95 px-4 py-2 font-sans text-base text-black shadow-lg backdrop-blur-sm"
        >
          {label}
          <svg viewBox="0 0 14 10" aria-hidden className="h-2.5 w-3.5">
            <path
              d="M1 5h12M9 1l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return { hovering, setHovering, bind, hoverClass: DISCOVER_HOVER_CLASS, cursor };
}
