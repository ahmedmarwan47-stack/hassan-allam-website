"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { MapProject, Setting } from "@/data/mapProjects";

// Figma "Pin" component set (17132:2257): a disc with a white ring and a small
// white pointer below, drawn at 40px to suit the full-Egypt map. Colour marks
// the setting — green "In the City", blue "By the Sea" — and each pin glows,
// pulses and gently bobs so it reads as clickable.
const FULL_W = 40;
const FULL_H = 45;

export const PIN_COLORS: Record<Setting, string> = {
  city: "var(--color-success-soft)",
  sea: "var(--color-info)",
};

export default function MapPin({
  project,
  visible,
  isHovered,
  onEnter,
  onLeave,
  onClick,
  compact = false,
}: {
  project: MapProject;
  visible: boolean;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
  /** Phones: a smaller pin and label. */
  compact?: boolean;
}) {
  const reduce = useReducedMotion();
  const PIN_W = compact ? 30 : FULL_W;
  const PIN_H = compact ? 34 : FULL_H;
  const color = PIN_COLORS[project.setting];
  // Stagger the bob per pin so they don't move in lockstep.
  const phase = (project.mapX * 7 + project.mapY * 3) % 1.6;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        // Tip of the pin on its map position.
        left: `${project.mapX}%`,
        top: `${project.mapY}%`,
        marginLeft: -PIN_W / 2,
        marginTop: -PIN_H,
        width: PIN_W,
        height: PIN_H,
        zIndex: isHovered ? 30 : 10,
      }}
      animate={
        visible
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.6, pointerEvents: "none" }
      }
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Hover variant: white name label floating above the pin. */}
      <AnimatePresence>
        {isHovered && <PinLabel name={project.name} bottom={PIN_H + (compact ? 6 : 10)} compact={compact} />}
      </AnimatePresence>

      {/* Idle bob — paused while hovered so the hover lift reads cleanly. */}
      <motion.div
        animate={reduce || isHovered ? { y: 0 } : { y: [0, -7, 0] }}
        transition={
          reduce || isHovered
            ? { duration: 0.3 }
            : { duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: phase }
        }
        className="relative"
      >
        {/* Pulse — a ring in the pin colour expanding out from the disc. */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute rounded-full"
            style={{ left: 1, top: 1, width: PIN_W - 2, height: PIN_W - 2, border: `2px solid ${color}` }}
            animate={{ scale: [1, 1.75], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay: phase }}
          />
        )}

        {/* Pin — grows and lifts slightly on hover (Figma smart-animate). */}
        <motion.svg
          width={PIN_W}
          height={PIN_H}
          viewBox="0 0 58 65"
          role="img"
          aria-label={project.name}
          animate={{ scale: isHovered ? 1.08 : 1, y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
          style={{
            display: "block",
            overflow: "visible",
            transformOrigin: "50% 100%",
            // Soft glow in the pin colour.
            filter: `drop-shadow(0 0 ${isHovered ? 18 : 10}px ${color})`,
            transition: "filter 0.3s ease-out",
          }}
        >
          <path d="M21.5 54h15L29 64.5Z" fill="#fff" />
          <circle cx="29" cy="29" r="28" fill={color} stroke="#fff" strokeWidth="2" />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}

/**
 * The name label floating above a pin. Inside a `[data-map-frame]` (the
 * phone map) it nudges sideways when it would run past the frame's edge, so
 * it's never cropped.
 */
function PinLabel({ name, bottom, compact }: { name: string; bottom: number; compact: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);

  useLayoutEffect(() => {
    const el = ref.current;
    const frame = el?.closest("[data-map-frame]");
    if (!el || !frame) return;
    const f = frame.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    // Measured centred (shift 0): the label's natural left/right edges.
    const left = r.left + r.width / 2 - el.offsetWidth / 2;
    const right = left + el.offsetWidth;
    const pad = 12;
    setShift(left < f.left + pad ? f.left + pad - left : right > f.right - pad ? f.right - pad - right : 0);
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 6, x: "-50%" }}
      animate={{ opacity: 1, y: 0, x: "-50%" }}
      exit={{ opacity: 0, y: 6, x: "-50%" }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      className={`pointer-events-none absolute left-1/2 whitespace-nowrap bg-brand-white font-serif uppercase leading-none tracking-[-0.02em] text-brand-black ${
        compact ? "px-2 py-1 text-xs" : "px-3 py-1.5 text-lg"
      }`}
      style={{ bottom, marginLeft: shift }}
    >
      {name}
    </motion.div>
  );
}
