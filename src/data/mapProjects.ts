// Shared pin data for the interactive Egypt map — used by both the homepage
// "Discover our projects" section (DiscoverProjects) and the Projects page
// hero (ProjectsHero). Keeping it in one place means the pins, the sidebar
// content and the filter list stay in sync across both maps.

// Tooltip / sidebar preview images.
const SLW = "/images/map/slw.jpg";
const SLG = "/images/map/slg.jpg";
const SEASONS = "/images/map/seasons.jpg";
const SLK10 = "/images/map/slk10.jpg";
const SLO19 = "/images/map/slo19.jpg";
const SL_NORTH_COAST = "/images/by-the-sea/swanlake-north-coast.jpg";
const LITTLE_VENICE = "/images/by-the-sea/little-venice-ain-sokhna.jpg";
const SL_EL_GOUNA = "/images/by-the-sea/swanlake-el-gouna.jpg";
const ENCORE_EL_GOUNA = "/images/by-the-sea/encore-swanlake-el-gouna.jpg";

export type Category =
  | "Residential"
  | "Office Space"
  | "Retail"
  | "Hospitality & Leisure"
  | "Sports & Wellness";

export type FilterValue = "all" | Category;

/** "In the City" (green pin) or "By the Sea" (blue pin). */
export type Setting = "city" | "sea";

export interface MapProject {
  id: string;
  name: string;
  category: Category;
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

export const MAP_PROJECTS: MapProject[] = [
  {
    id: "swanlake-west",
    name: "Swanlake West",
    category: "Residential",
    setting: "city",
    description:
      "A serene residential enclave on Cairo's western edge, Swanlake West pairs generous green landscapes with contemporary architecture — a calm retreat only minutes from the city's key destinations.",
    mapX: 47.0,
    mapY: 44.8,
    size: "lg",
    images: [SLW, SLG, SEASONS],
  },
  {
    id: "al-maqsad",
    name: "Al Maqsad",
    category: "Residential",
    setting: "city",
    description:
      "Set within the New Administrative Capital's most sought-after district, Al Maqsad offers refined homes wrapped in open parkland, where modern living meets timeless design.",
    mapX: 53.5,
    mapY: 42.0,
    size: "sm",
    images: [SLW, SLG, SLO19],
  },
  {
    id: "swanlake-katameya",
    name: "Swanlake Katameya",
    category: "Residential",
    setting: "city",
    description:
      "An intimate gated community in Katameya, Swanlake Katameya brings together elegant residences, walkable greenery and a family-first sense of belonging.",
    mapX: 50.7,
    mapY: 45.2,
    size: "sm",
    images: [SLW, SLG, SEASONS],
  },
  {
    id: "seasons",
    name: "Seasons",
    category: "Residential",
    setting: "city",
    description:
      "Seasons Residences is a boutique neighborhood designed around light, space and privacy — a considered address for those who value understated luxury.",
    mapX: 51.2,
    mapY: 42.5,
    size: "sm",
    images: [SLW, SEASONS, SLG],
  },
  {
    id: "kai",
    name: "Kai",
    category: "Hospitality & Leisure",
    setting: "city",
    description:
      "Kai is a waterfront leisure destination blending relaxed hospitality with curated dining and retail, crafted for unhurried days by the water.",
    mapX: 46.8,
    mapY: 41.8,
    size: "sm",
    images: [SLW, SLG, SLK10],
  },
  {
    id: "parkview",
    name: "Parkview",
    category: "Residential",
    setting: "city",
    description:
      "Overlooking landscaped parkland, Parkview offers bright, thoughtfully planned homes where community amenities and nature sit moments from your door.",
    mapX: 49.3,
    mapY: 43.2,
    size: "sm",
    images: [SLW, SLG, SLK10],
  },
  {
    id: "hyde-park",
    name: "Hyde Park",
    category: "Retail",
    setting: "city",
    description:
      "A vibrant retail and lifestyle hub, Hyde Park gathers boutique storefronts, cafés and open plazas into one effortlessly connected destination.",
    mapX: 52.8,
    mapY: 44.8,
    size: "sm",
    images: [SLG, SLW, SEASONS],
  },
  {
    id: "hassan-allam-tower",
    name: "Hassan Allam Tower",
    category: "Office Space",
    setting: "city",
    description:
      "A landmark commercial address, Hassan Allam Tower delivers premium grade-A office space with panoramic city views and best-in-class building services.",
    mapX: 49.7,
    mapY: 40.5,
    size: "sm",
    images: [SEASONS, SLW, SLG],
  },
  // By the Sea: the North Coast, Ain Sokhna on the Gulf of Suez, and the two
  // El Gouna projects on the Red Sea.
  {
    id: "swanlake-north-coast",
    name: "SwanLake North Coast",
    category: "Residential",
    setting: "sea",
    description:
      "A Mediterranean escape on Egypt's North Coast, SwanLake North Coast pairs turquoise lagoons with relaxed coastal homes made for long summers by the sea.",
    mapX: 29.0,
    mapY: 38.3,
    size: "sm",
    images: [SL_NORTH_COAST, SL_EL_GOUNA, LITTLE_VENICE],
  },
  {
    id: "little-venice-ain-sokhna",
    name: "Little Venice Ain Sokhna",
    category: "Residential",
    setting: "sea",
    description:
      "An hour from Cairo on the Gulf of Suez, Little Venice Ain Sokhna threads waterfront homes along canals and lagoons for easy weekends by the Red Sea.",
    mapX: 57.0,
    mapY: 47.0,
    size: "sm",
    images: [LITTLE_VENICE, SL_NORTH_COAST, SL_EL_GOUNA],
  },
  {
    // Same id as its project page, so the sidebar links straight to it.
    id: "swanlake-residences-sea",
    name: "SwanLake El Gouna",
    category: "Residential",
    setting: "sea",
    description:
      "Nestled on the Red Sea's shoreline, SwanLake El Gouna evokes a laid-back waterfront lifestyle, moments from the marina and the lagoon's turquoise water.",
    mapX: 62,
    mapY: 62,
    size: "sm",
    images: [SL_EL_GOUNA, ENCORE_EL_GOUNA, LITTLE_VENICE],
  },
  {
    id: "encore-swanlake-el-gouna",
    name: "Encore SwanLake El Gouna",
    category: "Residential",
    setting: "sea",
    description:
      "The next chapter of SwanLake El Gouna — new waterfront homes around swimmable crystal lagoons, steps from El Gouna's marina and beaches.",
    mapX: 62.8,
    mapY: 64.5,
    size: "sm",
    images: [ENCORE_EL_GOUNA, SL_EL_GOUNA, SL_NORTH_COAST],
  },
];

export const MAP_FILTERS: { label: string; value: FilterValue }[] = [
  { label: `All projects (${MAP_PROJECTS.length})`, value: "all" },
  { label: "Residential", value: "Residential" },
  { label: "Office Space", value: "Office Space" },
  { label: "Retail", value: "Retail" },
  { label: "Hospitality & Leisure", value: "Hospitality & Leisure" },
  { label: "Sports & Wellness", value: "Sports & Wellness" },
];
