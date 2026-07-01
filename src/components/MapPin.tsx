"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { MapProject } from "@/data/mapProjects";
import { withBasePath } from "@/lib/basePath";

// SVG viewBox 81×90. Small pin renders at 59×66 (Figma 58.467 circle),
// large pin at 81×90 (Figma 80.365 circle).
const PIN_SIZES = {
  sm: { w: 59, h: 66, img: 57 },
  lg: { w: 81, h: 90, img: 78 },
} as const;

// Three fanned preview images above each pin — offsets from container center.
const FAN = {
  sm: [
    { dx: -42, dy: 0, rotate: -10 },
    { dx: 0, dy: -10, rotate: 0 },
    { dx: 42, dy: 0, rotate: 10 },
  ],
  lg: [
    { dx: -58, dy: 0, rotate: -10 },
    { dx: 0, dy: -14, rotate: 0 },
    { dx: 58, dy: 0, rotate: 10 },
  ],
} as const;

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
  const { w, h, img } = PIN_SIZES[project.size];
  const fan = FAN[project.size];

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${project.leftPct}%`,
        top: `${project.topPct}%`,
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
      {/* Tooltip: 3 fanned photos above the pin */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="pointer-events-none absolute"
            style={{ bottom: h + 16, left: w / 2, width: 0, height: img }}
          >
            {project.images.map((src, i) => (
              <div
                key={i}
                className="absolute overflow-hidden rounded-[2px] shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
                style={{
                  width: img,
                  height: img,
                  left: fan[i].dx - img / 2,
                  top: fan[i].dy,
                  transform: `rotate(${fan[i].rotate}deg)`,
                  zIndex: i === 1 ? 3 : 1,
                }}
              >
                <Image src={src} alt="" fill className="object-cover" sizes={`${img}px`} />
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pin icon */}
      <motion.img
        src={withBasePath("/images/Pin.svg")}
        alt={project.name}
        width={w}
        height={h}
        animate={{ scale: isHovered ? 1.15 : 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        draggable={false}
        style={{ display: "block", userSelect: "none" }}
      />
    </motion.div>
  );
}
