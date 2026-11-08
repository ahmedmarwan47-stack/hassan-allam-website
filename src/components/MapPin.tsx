"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { MapProject, Setting } from "@/data/mapProjects";
import { useT } from "@/i18n/LocaleProvider";

// Solid teardrop in the setting colour — green "In the City", blue "By the
// Sea" — with a thin white edge and a softly rounded tip, as on hap.com.eg.
// The tip sits on the project's map position. Each pin glows, pulses and
// gently bobs so it reads as clickable; hover lifts it and shows the name
// as a sans pill.
//
// Smoothness: the glow is its own blurred layer (not a filter on the moving
// pin, which repaints every frame and flickers), the pulse is a soft filled
// disc rather than a scaled hairline border, and the moving layers are
// promoted to the GPU.
const SIZES = {
  full: { w: 26, h: 34 },
  compact: { w: 20, h: 26 },
};

// 26 × 34 teardrop: round head (r 12) curving into a rounded tip.
const PIN_PATH =
  "M11.9 32.1Q13 33.6 14.1 32.1C16.6 28.2 25 20.4 25 13A12 12 0 0 0 1 13C1 20.4 9.4 28.2 11.9 32.1Z";

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
  const t = useT();
  const reduce = useReducedMotion();
  const { w, h } = SIZES[compact ? "compact" : "full"];
  const head = (w * 24) / 26; // head diameter at this size
  const color = PIN_COLORS[project.setting];
  // Stagger the bob/pulse per pin so they don't move in lockstep.
  const phase = (project.mapX * 7 + project.mapY * 3) % 1.6;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        // Tip of the pin on its map position — physical left/top on both
        // sites, since the map image itself is never mirrored.
        left: `${project.mapX}%`,
        top: `${project.mapY}%`,
        marginLeft: -w / 2,
        marginTop: -h,
        width: w,
        height: h,
        zIndex: isHovered ? 30 : 10,
        pointerEvents: visible ? "auto" : "none",
      }}
      initial={false}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <AnimatePresence>
        {isHovered && <PinLabel name={t(project.name)} color={color} bottom={h + (compact ? 6 : 10)} compact={compact} />}
      </AnimatePresence>

      {/* Idle bob (a subtle 2px) — paused while hovered so the hover lift
          reads cleanly. */}
      <motion.div
        animate={reduce || isHovered ? { y: 0 } : { y: [0, -2, 0] }}
        transition={
          reduce || isHovered
            ? { duration: 0.3 }
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: phase }
        }
        className="relative will-change-transform"
        style={{ width: w, height: h }}
      >
        {/* Glow — a soft blurred disc behind the head (static layer). */}
        <span
          aria-hidden
          className="pointer-events-none absolute rounded-full blur-[7px] transition-opacity duration-300"
          style={{
            left: (w - head) / 2 - 2,
            top: (w - head) / 2 - 2,
            width: head + 4,
            height: head + 4,
            backgroundColor: color,
            opacity: isHovered ? 0.85 : 0.5,
          }}
        />

        {/* Pulse — a soft disc in the pin colour expanding from the head. */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute rounded-full will-change-transform"
            style={{ left: (w - head) / 2, top: (w - head) / 2, width: head, height: head, backgroundColor: color }}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: [1, 1.9], opacity: [0.45, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: phase }}
          />
        )}

        {/* Pin — grows and lifts slightly on hover. */}
        <motion.svg
          width={w}
          height={h}
          viewBox="0 0 26 34"
          role="img"
          aria-label={t(project.name)}
          className="relative will-change-transform"
          animate={{ scale: isHovered ? 1.1 : 1, y: isHovered ? -3 : 0 }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          style={{ display: "block", overflow: "visible", transformOrigin: "50% 100%" }}
        >
          <path d={PIN_PATH} fill={color} stroke="#fff" strokeWidth="1.3" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>
    </motion.div>
  );
}

/**
 * The name label floating above a pin — a white sans pill with the
 * setting's colour dot. Inside a `[data-map-frame]` (the
 * phone map) it nudges sideways when it would run past the frame's edge, so
 * it's never cropped.
 */
function PinLabel({ name, color, bottom, compact }: { name: string; color: string; bottom: number; compact: boolean }) {
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
      className={`pointer-events-none absolute left-1/2 flex items-center gap-2 whitespace-nowrap rounded-full bg-brand-white font-sans font-medium leading-none text-brand-black shadow-[0_8px_24px_rgba(0,0,0,0.22)] ${
        compact ? "px-2.5 py-1.5 text-[11px]" : "px-3.5 py-2 text-sm"
      }`}
      style={{ bottom, marginLeft: shift }}
    >
      {/* Setting colour, as on the pin. */}
      <span aria-hidden className="size-2 shrink-0 rounded-full" style={{ backgroundColor: color }} />
      {name}
    </motion.div>
  );
}
