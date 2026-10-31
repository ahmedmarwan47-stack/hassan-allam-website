"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "@/components/ProgressiveImage";

/**
 * ParallaxImage — a fill image that drifts inside its frame as the frame
 * scrolls through the viewport (it rises slower than the page). Place it in
 * a positioned, overflow-hidden frame. The image is oversized by `strength`
 * top and bottom so its edges never show.
 */
export default function ParallaxImage({
  src,
  alt = "",
  sizes,
  strength = 12,
  quality,
}: {
  src: string;
  alt?: string;
  sizes: string;
  /** Travel in % of the frame height, each direction. */
  strength?: number;
  quality?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Function form on purpose — keeps framer from handing this to a native
  // ScrollTimeline, which mis-maps element offsets on this site.
  // `y` % is of the oversized layer (100 + 2×strength % of the frame), so
  // scale the travel down to exactly `strength` % of the frame.
  const travel = (strength / (100 + 2 * strength)) * 100;
  const y = useTransform(scrollYProgress, (v) => (reduce ? "0%" : `${(v - 0.5) * 2 * travel}%`));

  return (
    <div ref={ref} data-parallax="" className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-x-0"
        style={{ top: `-${strength}%`, bottom: `-${strength}%`, y }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} quality={quality} className="object-cover" />
      </motion.div>
    </div>
  );
}
