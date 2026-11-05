// Shared pin data for the interactive Egypt map — used by both the homepage
// "Discover our projects" section (DiscoverProjects) and the Projects page
// hero (ProjectsHero). Keeping it in one place means the pins, the sidebar
// content and the filter list stay in sync across both maps.

import { LIVE_PROJECTS } from "./hapLive";

export type Category =
  | "Residential"
  | "Office Space"
  | "Retail"
  | "Hospitality & Leisure"
  | "Sports & Wellness";

export type FilterValue = "all" | Category;

/** Longer, card-style wording for each category (Figma Asset classes
 *  17043:545) — used on the project cards and the project page hero. */
export const CATEGORY_LABEL: Record<Category, string> = {
  Residential: "Residential",
  "Hospitality & Leisure": "Hospitality and Leisure",
  Retail: "Curated Retail & Dining",
  "Office Space": "Office Space",
  "Sports & Wellness": "Sports and Wellness",
};

/** "In the City" (green pin) or "By the Sea" (blue pin). */
export type Setting = "city" | "sea";

export interface MapProject {
  id: string;
  name: string;
  /** Lead asset class (shown in the sidebar); filters use `categories`. */
  category: Category;
  categories: Category[];
  setting: Setting;
  description: string;
  /**
   * Where the pin's tip sits, as % of the map image (egypt-map-full.webp,
   * the live site's map texture): mapX across, mapY down. City pins are
   * spread a little around Cairo so they don't stack on one spot.
   */
  mapX: number;
  mapY: number;
  size: "sm" | "lg";
  /** Photos shown in the pin tooltip and the sidebar carousel. */
  images: [string, string, string];
}

// Pin placement follows the live site's map: its per-project coordinates
// mapped onto our map image by a linear fit (calibrated on the four seaside
// pins). XCHANGE has no coordinates on the live site, so it sits with the
// other Mostakbal City projects.
const toMapX = (lng: number) => 5.3837 * lng - 118.9714;
const toMapY = (lat: number) => -6.6711 * lat + 242.7813;
const FALLBACK_COORDS: Record<string, { lat: number; lng: number }> = {
  "xchange-mostakbal-city": { lat: 29.78, lng: 32.2 },
};

export const MAP_PROJECTS: MapProject[] = LIVE_PROJECTS.map((p) => {
  const c = p.coordinates ?? FALLBACK_COORDS[p.slug] ?? { lat: 30, lng: 31.4 };
  const imgs = [...p.galleries.flat(), p.cover, p.thumbnail].filter((x): x is string => !!x);
  const pick = (i: number) => imgs[i % Math.max(imgs.length, 1)] ?? "/images/image 385.jpg";
  return {
    id: p.slug,
    name: p.name,
    category: p.types[0] ?? "Residential",
    categories: p.types,
    setting: p.group,
    description: p.intro[0] ?? p.overview[0] ?? "",
    mapX: Math.round(toMapX(c.lng) * 10) / 10,
    mapY: Math.round(toMapY(c.lat) * 10) / 10,
    size: "lg",
    images: [pick(0), pick(1), pick(2)],
  };
});

export const MAP_FILTERS: { label: string; value: FilterValue }[] = [
  { label: `All projects (${MAP_PROJECTS.length})`, value: "all" },
  { label: "Residential", value: "Residential" },
  { label: "Office Space", value: "Office Space" },
  { label: "Retail", value: "Retail" },
  { label: "Hospitality & Leisure", value: "Hospitality & Leisure" },
  { label: "Sports & Wellness", value: "Sports & Wellness" },
];
