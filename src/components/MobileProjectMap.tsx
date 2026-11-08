"use client";

import { useEffect, useRef, useState } from "react";
import { MAP_PROJECTS } from "@/data/mapProjects";
import MapStage, { MOBILE_MAP_FOCUS, MOBILE_MAP_ZOOM } from "@/components/MapStage";
import { useT } from "@/i18n/LocaleProvider";

const CYCLE_MS = 2600;
const MAX_SCALE = 4;
// The Cairo cluster — where the first zoom-in heads.
const CAIRO = { x: 50.2, y: 43.2 };

type Point = { x: number; y: number };

/**
 * MobileProjectMap — the phone version of the project map (homepage
 * "Discover our projects" and the Projects hero). The whole map is framed
 * to fit on screen. Phones have no hover, so the pins' name labels take
 * turns on their own, in a loop; a label near the frame's edge shifts inward
 * so it's never cropped. Tapping a pin opens it.
 *
 * Zoom (+/− buttons or pinch) spreads the pins apart — the first step in
 * heads for the Cairo cluster — and while zoomed in the map can be dragged
 * around; the label loop pauses meanwhile.
 */
export default function MobileProjectMap({
  visibleIds,
  onSelect,
  paused = false,
  priority = false,
}: {
  visibleIds: Set<string>;
  onSelect: (id: string) => void;
  /** Stop cycling (e.g. while the project sidebar is open). */
  paused?: boolean;
  priority?: boolean;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [focus, setFocus] = useState<Point>(MOBILE_MAP_FOCUS);
  const [dragging, setDragging] = useState(false);
  const key = MAP_PROJECTS.filter((p) => visibleIds.has(p.id))
    .map((p) => p.id)
    .join(",");

  // Step through the visible projects in a loop (only at the overview).
  useEffect(() => {
    if (paused || !key || scale > 1) return;
    const list = key.split(",");
    let i = -1;
    const step = () => {
      i = (i + 1) % list.length;
      setActiveId(list[i]);
    };
    const first = setTimeout(step, 600);
    const loop = setInterval(step, CYCLE_MS);
    return () => {
      clearTimeout(first);
      clearInterval(loop);
    };
  }, [key, paused, scale]);

  /** Keep the map covering the frame: focus can't come closer to an edge
   *  than half the frame (in % of the map). */
  const clamp = (f: Point, s: number): Point => {
    const frame = frameRef.current;
    if (!frame || s <= 1) return MOBILE_MAP_FOCUS;
    const layer = (frame.clientWidth * MOBILE_MAP_ZOOM * s) / 100;
    const hx = (frame.clientWidth / 2 / layer) * 100;
    const hy = (frame.clientHeight / 2 / layer) * 100;
    return {
      x: Math.min(100 - hx, Math.max(hx, f.x)),
      y: Math.min(100 - hy, Math.max(hy, f.y)),
    };
  };

  const zoomTo = (next: number, toward?: Point) => {
    const s = Math.min(MAX_SCALE, Math.max(1, next));
    setScale(s);
    setFocus((f) => clamp(toward ?? f, s));
    if (s > 1) setActiveId(null);
  };

  // Drag to pan + two-finger pinch, with pointer events.
  const pointers = useRef(new Map<number, Point>());
  const gesture = useRef<{ dist: number; scale: number; moved: boolean } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];
    gesture.current = {
      dist: pts.length === 2 ? Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y) : 0,
      scale,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    const g = gesture.current;
    const frame = frameRef.current;
    if (!prev || !g || !frame) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const pts = [...pointers.current.values()];

    if (pts.length === 2 && g.dist) {
      const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      g.moved = true;
      setDragging(true);
      zoomTo(g.scale * (d / g.dist), scale === 1 ? CAIRO : undefined);
      return;
    }
    if (scale <= 1) return;
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    if (!g.moved && Math.hypot(dx, dy) < 4) return;
    g.moved = true;
    setDragging(true);
    const layer = (frame.clientWidth * MOBILE_MAP_ZOOM * scale) / 100;
    setFocus((f) => clamp({ x: f.x - (dx / layer) * 100, y: f.y - (dy / layer) * 100 }, scale));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size === 0) setDragging(false);
  };

  return (
    <div
      ref={frameRef}
      data-map-frame=""
      className={`absolute inset-0 overflow-hidden ${scale > 1 ? "touch-none" : "touch-pan-y"}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      // A drag or pinch shouldn't count as a tap on the pin under it.
      onClickCapture={(e) => {
        if (gesture.current?.moved) {
          e.stopPropagation();
          gesture.current.moved = false;
        }
      }}
    >
      <MapStage
        zoom={MOBILE_MAP_ZOOM * scale}
        focus={focus}
        visibleIds={visibleIds}
        hoveredId={activeId}
        onHover={(id) => id && setActiveId(id)}
        onSelect={onSelect}
        priority={priority}
        compact
        smooth={!dragging}
      />

      {/* Zoom controls — above the filter bar, bottom start corner (left in
          English — open water — right on the Arabic site). */}
      <div className="absolute bottom-[72px] start-4 z-40 flex flex-col overflow-hidden rounded-[2px] bg-brand-white shadow-[0_6px_20px_rgba(0,0,0,0.18)]">
        <ZoomButton
          label="Zoom in"
          disabled={scale >= MAX_SCALE}
          onClick={() => zoomTo(scale === 1 ? 2 : scale + 1, scale === 1 ? CAIRO : undefined)}
        >
          <path d="M8 3v10M3 8h10" />
        </ZoomButton>
        <span aria-hidden className="h-px bg-brand-black/10" />
        <ZoomButton label="Zoom out" disabled={scale <= 1} onClick={() => zoomTo(scale <= 2 ? 1 : scale - 1)}>
          <path d="M3 8h10" />
        </ZoomButton>
      </div>
    </div>
  );
}

function ZoomButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  const t = useT();
  return (
    <button
      type="button"
      aria-label={t(label)}
      disabled={disabled}
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      className="flex size-8 items-center justify-center text-brand-black transition-opacity duration-200 disabled:opacity-30"
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden>
        {children}
      </svg>
    </button>
  );
}
