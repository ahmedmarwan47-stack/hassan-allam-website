"use client";

import Image from "@/components/ProgressiveImage";
import MapPin from "@/components/MapPin";
import { MAP_PROJECTS } from "@/data/mapProjects";
import { withBasePath } from "@/lib/basePath";

/**
 * MapStage — the full-Egypt map (the live site's map texture) with drifting
 * clouds and the project pins, shared by the homepage "Discover our projects"
 * section and the Projects page hero, desktop and mobile.
 *
 * The map is a square layer sized relative to its container: `zoom` is its
 * width as % of the container, and `focus` is the point of the map (in % of
 * the map) that sits at the container's centre. Pins and clouds live inside
 * the layer, so they stay locked to the map at any zoom or parallax offset.
 * The container must be `relative` (and usually `overflow-hidden`).
 */

// Three cloud masks split from the live site's packed cloud texture
// (scripts/split-clouds.mjs), placed over the Mediterranean near the Delta,
// over Sinai, and as haze over the Western Desert. Each drifts on its own
// slow loop (see .map-cloud-drift-* in globals.css).
const CLOUDS = [
  { src: "/images/map/cloud-a.webp", x: 30, y: 17, w: 42, opacity: 0.65, drift: "a" },
  { src: "/images/map/cloud-b.webp", x: 58, y: 27, w: 46, opacity: 0.45, drift: "b" },
  { src: "/images/map/cloud-c.webp", x: 4, y: 33, w: 40, opacity: 0.35, drift: "c" },
] as const;

/**
 * Mobile map: a 1100px-wide strip the visitor scrolls/drags sideways, with the
 * map zoomed so the North Coast, Cairo and El Gouna all fit inside it.
 */
export const MOBILE_MAP_W_CLASS = "w-[1100px]";
export const MOBILE_MAP_ZOOM = 170;
export const MOBILE_MAP_FOCUS = { x: 48, y: 46 };

/** Scroll the mobile strip so Cairo (the city cluster) starts centred. */
export function centerMobileMapOnCairo(el: HTMLElement) {
  const CAIRO_X = 50; // % of the map
  const layerW = (el.scrollWidth * MOBILE_MAP_ZOOM) / 100;
  const cairo = el.scrollWidth / 2 + ((CAIRO_X - MOBILE_MAP_FOCUS.x) / 100) * layerW;
  el.scrollLeft = cairo - el.clientWidth / 2;
}

export default function MapStage({
  zoom,
  focus,
  visibleIds,
  hoveredId,
  onHover,
  onSelect,
  priority = false,
}: {
  zoom: number;
  focus: { x: number; y: number };
  visibleIds: Set<string>;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  priority?: boolean;
}) {
  return (
    <div
      data-no-fx=""
      className="absolute aspect-square"
      style={{
        width: `${zoom}%`,
        left: "50%",
        top: "50%",
        // Own-size translate puts `focus` on the container's centre.
        transform: `translate(${-focus.x}%, ${-focus.y}%)`,
      }}
    >
      <Image
        src="/images/map/egypt-map-full.webp"
        alt="Aerial map of Egypt showing Hassan Allam project locations"
        fill
        className="object-cover"
        priority={priority}
        sizes={`${zoom}vw`}
      />
      {/* Light wash so pins and white text hold contrast over the map. */}
      <div aria-hidden className="absolute inset-0 bg-black/20" />

      {CLOUDS.map((c) => (
        <div
          key={c.src}
          aria-hidden
          className={`map-cloud-drift-${c.drift} pointer-events-none absolute aspect-[2/1]`}
          style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}%`, opacity: c.opacity }}
        >
          {/* Plain img: decorative, transparent, no blur-up placeholder. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={withBasePath(c.src)} alt="" className="h-full w-full select-none" draggable={false} />
        </div>
      ))}

      {MAP_PROJECTS.map((project) => (
        <MapPin
          key={project.id}
          project={project}
          visible={visibleIds.has(project.id)}
          isHovered={hoveredId === project.id}
          onEnter={() => onHover(project.id)}
          onLeave={() => onHover(null)}
          onClick={() => onSelect(project.id)}
        />
      ))}
    </div>
  );
}
