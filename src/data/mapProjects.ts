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
  "Hospitality & Leisure": "Hospitality & Leisure",
  Retail: "Curated Retail & Dining",
  "Office Space": "Office Space",
  "Sports & Wellness": "Sports & Wellness",
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
  // Names and order as on hap.com.eg.
  { label: CATEGORY_LABEL.Residential, value: "Residential" },
  { label: CATEGORY_LABEL["Hospitality & Leisure"], value: "Hospitality & Leisure" },
  { label: CATEGORY_LABEL.Retail, value: "Retail" },
  { label: CATEGORY_LABEL["Sports & Wellness"], value: "Sports & Wellness" },
  { label: CATEGORY_LABEL["Office Space"], value: "Office Space" },
];

/** The Projects page intro as on hap.com.eg. It always shows; picking an
 *  asset class adds that class's paragraph below it, as the live page does. */
export const PROJECTS_INTRO =
  "At Hassan Allam Properties, we go beyond developments, we craft destinations. Our mixed-use communities blend homes, workspaces, retail, hospitality, sports, and leisure into vibrant hubs designed for modern living. With a legacy of excellence and a future-driven vision, we offer uncompromised exclusivity rooted in quality, crafted with purpose, and built to last.";

export const CATEGORY_INTRO: Record<Category, string> = {
  Residential:
    "At Hassan Allam Properties, we craft more than homes, we build communities where families thrive. Blending timeless design with green open spaces, our developments offer privacy, security, and a true sense of belonging. From prime suburban locations to serene coastal escapes, every home reflects our commitment to comfort, connection, and lasting value.",
  "Hospitality & Leisure":
    "Our hospitality and leisure destinations go beyond accommodation, delivering immersive experiences that celebrate refined living. From luxury boutique hotels and resort-style escapes to distinguished fine dining and vibrant social venues, every space is thoughtfully designed to inspire relaxation, connection, and cultural discovery, redefining modern hospitality with elegance, authenticity, and exceptional service.",
  Retail:
    "Our retail and dining spaces are more than amenities, they’re destinations. Thoughtfully curated with a handpicked mix of premium brands, signature restaurants, fine diners and local favorites, they offer convenience wrapped in experience. Designed to bring life, flavor, and style together, these vibrant hubs elevate everyday living and foster meaningful connections within our communities.",
  "Sports & Wellness":
    "At Hassan Allam Properties, wellbeing is not an add-on, it’s at the heart of our communities. Through world-class sports clubs, wellness amenities, and expansive green spaces, we create environments designed to enrich body, mind, and soul. Every detail is thoughtfully curated to inspire movement, connection, and a lifestyle rooted in vitality and balance.",
  "Office Space":
    "Hassan Allam Properties delivers dynamic, professional environments that empower productivity and inspire success. From corporate headquarters to creative campuses and flexible workspaces, our office destinations are designed with accessibility, sustainability, and innovation in mind. We provide the infrastructure businesses need to grow and lead with confidence in today’s fast-paced, ever-evolving economic landscape.",
};
