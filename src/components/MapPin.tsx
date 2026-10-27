"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { MapProject } from "@/data/mapProjects";

// Figma "Pin" component set (17132:2257): a 58px info-blue disc with a white
// ring and a small white pointer below. Every pin is the same size.
const PIN_W = 58;
const PIN_H = 65;

export default function MapPin({
  project,
  visible,
  isHovered,
  onEnter,
  onLeave,
  onClick,
}: {
  project: MapProject;
  visible: boolean;
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${project.leftPct}%`,
        top: `${project.topPct}%`,
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
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 6, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 6, x: "-50%" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="pointer-events-none absolute left-1/2 whitespace-nowrap bg-brand-white px-4 py-2 font-serif text-[22px] uppercase leading-none tracking-[-0.02em] text-brand-black"
            style={{ bottom: PIN_H + 13 }}
          >
            {project.name}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pin — grows and lifts slightly on hover (Figma smart-animate). */}
      <motion.svg
        width={PIN_W}
        height={PIN_H}
        viewBox="0 0 58 65"
        role="img"
        aria-label={project.name}
        animate={{ scale: isHovered ? 1.08 : 1, y: isHovered ? -5 : 0 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        style={{ display: "block", overflow: "visible", transformOrigin: "50% 100%" }}
      >
        <path d="M21.5 54h15L29 64.5Z" fill="#fff" />
        <circle cx="29" cy="29" r="28" fill="var(--color-info)" stroke="#fff" strokeWidth="2" />
      </motion.svg>
    </motion.div>
  );
}
