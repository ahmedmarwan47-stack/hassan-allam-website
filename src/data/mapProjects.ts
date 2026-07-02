// Shared pin data for the interactive Egypt map — used by both the homepage
// "Discover our projects" section (DiscoverProjects) and the Projects page
// hero (ProjectsHero). Keeping it in one place means the pins, the sidebar
// content and the filter list stay in sync across both maps.

// Tooltip / sidebar preview images.
const SLW = "/images/map/slw.webp";
const SLG = "/images/map/slg.webp";
const SEASONS = "/images/map/seasons.webp";
const SLK10 = "/images/map/slk10.webp";
const SLO19 = "/images/map/slo19.webp";

export type Category =
  | "Residential"
  | "Office Space"
  | "Retail"
  | "Hospitality & Leisure"
  | "Sports & Wellness";

export type FilterValue = "all" | Category;

export interface MapProject {
  id: string;
  name: string;
  category: Category;
  description: string;
  /**
   * Pin top-left as % of section dimensions, derived from the 1440×1440px
   * Figma frame: leftPct = (684 + groupX) / 1440, topPct = (826 + groupY) / 1440
   */
  leftPct: number;
  topPct: number;
  size: "sm" | "lg";
  /** Photos shown in the pin tooltip and the sidebar carousel. */
  images: [string, string, string];
}

export const MAP_PROJECTS: MapProject[] = [
  {
    id: "swanlake-west",
    name: "Swanlake West",
    category: "Residential",
    description:
      "A serene residential enclave on Cairo's western edge, Swanlake West pairs generous green landscapes with contemporary architecture — a calm retreat only minutes from the city's key destinations.",
    leftPct: ((684 + 72.05) / 1440) * 100,
    topPct: ((826 + 189.54) / 1440) * 100,
    size: "lg",
    images: [SLW, SLG, SEASONS],
  },
  {
    id: "al-maqsad",
    name: "Al Maqsad",
    category: "Residential",
    description:
      "Set within the New Administrative Capital's most sought-after district, Al Maqsad offers refined homes wrapped in open parkland, where modern living meets timeless design.",
    leftPct: ((684 + 0) / 1440) * 100,
    topPct: ((826 + 144) / 1440) * 100,
    size: "sm",
    images: [SLW, SLG, SLO19],
  },
  {
    id: "swanlake-katameya",
    name: "Swanlake Katameya",
    category: "Residential",
    description:
      "An intimate gated community in Katameya, Swanlake Katameya brings together elegant residences, walkable greenery and a family-first sense of belonging.",
    leftPct: ((684 + 210) / 1440) * 100,
    topPct: ((826 + 0) / 1440) * 100,
    size: "sm",
    images: [SLW, SLG, SEASONS],
  },
  {
    id: "seasons",
    name: "Seasons",
    category: "Residential",
    description:
      "Seasons Residences is a boutique neighborhood designed around light, space and privacy — a considered address for those who value understated luxury.",
    leftPct: ((684 + 218) / 1440) * 100,
    topPct: ((826 + 77) / 1440) * 100,
    size: "sm",
    images: [SLW, SEASONS, SLG],
  },
  {
    id: "kai",
    name: "Kai",
    category: "Hospitality & Leisure",
    description:
      "Kai is a waterfront leisure destination blending relaxed hospitality with curated dining and retail, crafted for unhurried days by the water.",
    leftPct: ((684 + 295) / 1440) * 100,
    topPct: ((826 + 95) / 1440) * 100,
    size: "sm",
    images: [SLW, SLG, SLK10],
  },
  {
    id: "parkview",
    name: "Parkview",
    category: "Residential",
    description:
      "Overlooking landscaped parkland, Parkview offers bright, thoughtfully planned homes where community amenities and nature sit moments from your door.",
    leftPct: ((684 + 301) / 1440) * 100,
    topPct: ((826 + 19) / 1440) * 100,
    size: "sm",
    images: [SLW, SLG, SLK10],
  },
  {
    id: "hyde-park",
    name: "Hyde Park",
    category: "Retail",
    description:
      "A vibrant retail and lifestyle hub, Hyde Park gathers boutique storefronts, cafés and open plazas into one effortlessly connected destination.",
    leftPct: ((684 + 385) / 1440) * 100,
    topPct: ((826 + 70) / 1440) * 100,
    size: "sm",
    images: [SLG, SLW, SEASONS],
  },
  {
    id: "hassan-allam-tower",
    name: "Hassan Allam Tower",
    category: "Office Space",
    description:
      "A landmark commercial address, Hassan Allam Tower delivers premium grade-A office space with panoramic city views and best-in-class building services.",
    leftPct: ((684 + 424) / 1440) * 100,
    topPct: ((826 + 12) / 1440) * 100,
    size: "sm",
    images: [SEASONS, SLW, SLG],
  },
];

export const MAP_FILTERS: { label: string; value: FilterValue }[] = [
  { label: "All projects (11)", value: "all" },
  { label: "Residential", value: "Residential" },
  { label: "Office Space", value: "Office Space" },
  { label: "Retail", value: "Retail" },
  { label: "Hospitality & Leisure", value: "Hospitality & Leisure" },
  { label: "Sports & Wellness", value: "Sports & Wellness" },
];
