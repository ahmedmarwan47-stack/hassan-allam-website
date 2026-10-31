import type { FeatureIconName } from "@/components/sections/project-detail/icons";

export interface RichSegment {
  text: string;
  /** Rendered as an underlined grey link (matches the Figma neighborhood callouts). */
  link?: boolean;
}

export interface FeatureItem {
  icon: FeatureIconName;
  title: string;
  description: string;
}

export interface MasterPlanItem {
  number: number;
  name: string;
  /** Short description for the neighborhood drawer (placeholder copy). */
  blurb: string;
  image: string;
}

export interface ConstructionPhase {
  title: string;
  /** e.g. "Q1 2023 — Q3 2023" */
  period: string;
  status: "Completed" | "In progress" | "Upcoming";
  text: string;
  image: string;
}

export interface ConstructionUpdates {
  updated: string;
  phases: ConstructionPhase[];
}

export interface ProjectDetailData {
  id: string;
  /** Two lines, rendered large in the hero. */
  name: [string, string];
  badgeMain: string;
  badgeScript: string;

  scrollLabel: string;
  introParagraphs: [string, string];
  /** [narrow, wide] — matches the Figma 423px/869px split. */
  introImages: [string, string];

  tag: string;
  tagline: string;
  communityLabel: string;
  communityHeading: RichSegment[];
  brochureLabel: string;

  masterPlan?: {
    items: MasterPlanItem[];
    mapImage: string;
  };

  showcase: {
    full: string;
    half: string;
    wide: string;
  };

  amenitiesHeading: [string, string];
  amenities: FeatureItem[];

  storyImages: [string, string];
  storyHeading: string;
  storyParagraphs: string[];

  productsImages: {
    half: string;
    wide: string;
  };
  productsHeading: string;
  products: FeatureItem[];

  construction: ConstructionUpdates;

  ctaHeading: string;
  ctaParagraph: string;
  ctaButtonLabel: string;
}

const SLR_AMENITIES: FeatureItem[] = [
  { icon: "office", title: "Office Park", description: "A welcoming hub for meeting and unwinding." },
  { icon: "retail", title: "Retail Hub", description: "Boutique storefronts for everyday errands and leisure shopping." },
  { icon: "dining", title: "Entertainment", description: "A refined table offering a varied, elevated cuisine." },
  { icon: "hospitality", title: "Hospitality", description: "A poolside bar perfect for cocktails in the sun." },
  { icon: "leisure", title: "Leisure Component", description: "A high-end culinary experience in an elegant setting." },
  { icon: "fitness", title: "Fitness Facility", description: "A fully equipped gym to keep residents in shape." },
];

const SLR_PRODUCTS: FeatureItem[] = [
  { icon: "office", title: "Office Park", description: "A welcoming hub for meeting and unwinding." },
  { icon: "retail", title: "Retail Hub", description: "Boutique storefronts for everyday errands and leisure shopping." },
  { icon: "healthcare", title: "Healthcare Facility", description: "A dedicated clinic offering peace of mind close to home." },
  { icon: "hospitality", title: "Hospitality", description: "A poolside bar perfect for cocktails in the sun." },
  { icon: "dining", title: "Entertainment", description: "A refined table offering a varied, elevated cuisine." },
  { icon: "fitness", title: "Fitness Facility", description: "A fully equipped gym to keep residents in shape." },
  { icon: "leisure", title: "Leisure Component", description: "A high-end culinary experience in an elegant setting." },
];

// Placeholder construction timeline (dummy dates and images) until
// real site updates are available.
const SAMPLE_CONSTRUCTION: ConstructionUpdates = {
  updated: "October 2026",
  phases: [
    {
      title: "Groundbreaking & Site Preparation",
      period: "Q1 2023 — Q3 2023",
      status: "Completed",
      text: "Site clearing, levelling and the main access roads, laying out the masterplan's first neighborhoods.",
      image: "/images/image 386.jpg",
    },
    {
      title: "Infrastructure & Utilities",
      period: "Q3 2023 — Q2 2024",
      status: "Completed",
      text: "Water, power and drainage networks across the site, with the central landscape spine taking shape.",
      image: "/images/image 402.jpg",
    },
    {
      title: "Structural Works",
      period: "Q2 2024 — Q1 2026",
      status: "In progress",
      text: "Concrete frames are complete in The Selina and The Giselle, with The Scarlet's buildings rising floor by floor.",
      image: "/images/image 388.jpg",
    },
    {
      title: "Facades & Finishing",
      period: "Q4 2025 — Q4 2026",
      status: "In progress",
      text: "Stone facades, glazing and interior finishing are under way in the first delivered buildings.",
      image: "/images/image 384.jpg",
    },
    {
      title: "Landscaping & Handover",
      period: "Q3 2026 — Q2 2027",
      status: "Upcoming",
      text: "Gardens, pools and amenities are completed ahead of the first handovers to homeowners.",
      image: "/images/image 385.jpg",
    },
  ],
};

export const PROJECT_DETAILS: Record<string, ProjectDetailData> = {
  // ─── In The City — full template, including the Master Plan section ──────
  "swanlake-residences": {
    id: "swanlake-residences",
    name: ["SwanLake", "Residences New Cairo"],
    badgeMain: "SWANLAKE",
    badgeScript: "residences.",

    scrollLabel: "Scroll",
    introParagraphs: [
      "Situated in Cairo's prestigious East side, SwanLake Residences New Cairo (SLR) evokes an ultra-premium lifestyle in close proximity to the capital's prime destinations. Far from the city's noise and crowds, SLR features niche",
      "settings that spread across lush landscapes and select luxuries. Sprawling over 454 feddans, SLR is home to 12 exclusively gated projects which come together in a high-end centerpoint to ultimately revive Cairo's East side.",
    ],
    introImages: ["/images/image 384.jpg", "/images/image 383.jpg"],

    tag: "SLR",
    tagline: "Step into the exclusivity of our 12 residential neighborhoods, designed for an ultra-refined lifestyle.",
    communityLabel: "In The City",
    communityHeading: [
      { text: "The destination has already achieved remarkable success with its launched neighborhoods " },
      { text: "The Iris", link: true },
      { text: ", " },
      { text: "The Scarlet", link: true },
      { text: ", " },
      { text: "The Giselle", link: true },
      { text: ", and " },
      { text: "The Selina", link: true },
      { text: " each designed to offer a refined lifestyle where residents can truly experience the essence of elegant living." },
    ],
    brochureLabel: "Download our brochure",

    masterPlan: {
      mapImage: "/images/masterplan-slr-clean.jpg",
      items: [
        { number: 1, name: "The Selina", image: "/images/image 385.jpg", blurb: "Low-rise residences wrapped around landscaped courtyards, where every home opens onto green and the walk to the central park takes minutes." },
        { number: 2, name: "The Giselle", image: "/images/image 388.jpg", blurb: "Contemporary apartments with generous terraces, set along quiet tree-lined promenades close to the retail hub." },
        { number: 3, name: "The Scarlet", image: "/images/image 387.jpg", blurb: "A boutique collection of homes around a private pool garden, designed for families who value calm and privacy." },
        { number: 4, name: "The Amaia", image: "/images/image 386.jpg", blurb: "Elegant duplexes and penthouses with open views across SLR's landscaped spine." },
        { number: 5, name: "The Phoenix", image: "/images/image 384.jpg", blurb: "Refined residences with stone facades and double-height lobbies, a short stroll from the clubhouse." },
        { number: 6, name: "The Iris", image: "/images/image 383.jpg", blurb: "Resort-style living around a sunlit pool deck, with shaded cabanas and gardens between every building." },
        { number: 7, name: "Am:pm", image: "/images/image 402.jpg", blurb: "SLR's lifestyle centre — cafés, dining and boutiques that keep the community lively from morning to night." },
        { number: 8, name: "Villas Residence", image: "/images/image 398.jpg", blurb: "Standalone villas on generous plots, each with a private garden and pool." },
        { number: 9, name: "Villas Residence", image: "/images/image 390.jpg", blurb: "Standalone villas on generous plots, each with a private garden and pool." },
        { number: 10, name: "Villas Residence", image: "/images/image 391.jpg", blurb: "Twin and town villas facing the green corridors, made for growing families." },
        { number: 11, name: "Villas Residence", image: "/images/image 392.jpg", blurb: "Twin and town villas facing the green corridors, made for growing families." },
        { number: 12, name: "Villas Residence", image: "/images/image 398.jpg", blurb: "Signature villas at the edge of the masterplan, with the most private settings in SLR." },
        { number: 13, name: "Villas Residence", image: "/images/image 390.jpg", blurb: "Signature villas at the edge of the masterplan, with the most private settings in SLR." },
        { number: 14, name: "Sports Club", image: "/images/image 401.jpg", blurb: "A full sports club with courts, a fitness centre and family pools, at the heart of community life." },
      ],
    },

    showcase: {
      full: "/images/image 385.jpg",
      half: "/images/image 386.jpg",
      wide: "/images/image 387.jpg",
    },

    amenitiesHeading: ["Exceptional Amenities for", "a Unique Living Experience"],
    amenities: SLR_AMENITIES,

    storyImages: ["/images/image 388.jpg", "/images/image 390.jpg"],
    storyHeading: "A Dream-like Reality Of Infinite Blue Horizons",
    storyParagraphs: [
      "SwanLake El Gouna 30-acres boast 314 finished Nero waterfront condos are not only admired from up close but also from afar. With beautiful stone facades blending perfectly with a white contemporary feel, sleek wooden linings and roof-tops; a Modern Greek paradise nestles in the heart of the Red Sea, stimulating impeccable finishing quality and furnishing sophistication.",
      "We collaborated with celebrated names in the architectural and landscaping world to devote an unspoiled vacation for its residents. All condos are encompassed with soothing 360-degree swimmable crystal lagoons.",
    ],

    productsImages: {
      half: "/images/image 392.jpg",
      wide: "/images/image 391.jpg",
    },
    productsHeading: "Types of Products Offered In Our Project",
    products: SLR_PRODUCTS,

    construction: SAMPLE_CONSTRUCTION,

    ctaHeading: "A HAP Resale Expert Can Help You",
    ctaParagraph: "Hassan Allam Properties offers an exceptional portfolio of 25 projects located in strategic locations, both in the heart of dynamic urban centers and along the coastline.",
    ctaButtonLabel: "Let's work together",
  },

  // ─── By The Sea — same template, no Master Plan section ───────────────────
  "swanlake-residences-sea": {
    id: "swanlake-residences-sea",
    name: ["SwanLake", "Residences El Gouna"],
    badgeMain: "SWANLAKE",
    badgeScript: "residences.",

    scrollLabel: "Scroll",
    introParagraphs: [
      "Nestled on the Red Sea's shoreline, SwanLake Residences El Gouna evokes a laid-back waterfront lifestyle, moments from the marina and the lagoon's turquoise water. Far from the noise and crowds, it features niche",
      "settings that spread across sun-soaked landscapes and select luxuries. Set across the coastline, it brings together a handful of exclusively gated neighborhoods around a high-end centerpoint overlooking the sea.",
    ],
    introImages: ["/images/image 384.jpg", "/images/image 383.jpg"],

    tag: "SLG",
    tagline: "Step into the exclusivity of our coastal neighborhoods, designed for an ultra-refined lifestyle.",
    communityLabel: "By The Sea",
    communityHeading: [
      { text: "The destination has already achieved remarkable success with its launched neighborhoods " },
      { text: "The Lagoon", link: true },
      { text: ", " },
      { text: "The Marina", link: true },
      { text: ", and " },
      { text: "The Cove", link: true },
      { text: " each designed to offer a refined lifestyle where residents can truly experience the essence of coastal living." },
    ],
    brochureLabel: "Download our brochure",

    // No `masterPlan` — this template omits the section entirely.

    showcase: {
      full: "/images/image 385.jpg",
      half: "/images/image 386.jpg",
      wide: "/images/image 387.jpg",
    },

    amenitiesHeading: ["Exceptional Amenities for", "a Unique Coastal Experience"],
    amenities: SLR_AMENITIES,

    storyImages: ["/images/image 388.jpg", "/images/image 390.jpg"],
    storyHeading: "A Dream-like Reality Of Infinite Blue Horizons",
    storyParagraphs: [
      "SwanLake El Gouna's 30 acres boast 314 finished Nero waterfront condos, admired from up close and from afar. With beautiful stone facades blending perfectly with a white contemporary feel, sleek wooden linings and roof-tops, a Modern Greek paradise nestles in the heart of the Red Sea, stimulating impeccable finishing quality and furnishing sophistication.",
      "We collaborated with celebrated names in the architectural and landscaping world to devote an unspoiled vacation for its residents. All condos are encompassed with soothing 360-degree swimmable crystal lagoons.",
    ],

    productsImages: {
      half: "/images/image 392.jpg",
      wide: "/images/image 391.jpg",
    },
    productsHeading: "Types of Products Offered In Our Project",
    products: SLR_PRODUCTS,

    construction: SAMPLE_CONSTRUCTION,

    ctaHeading: "A HAP Resale Expert Can Help You",
    ctaParagraph: "Hassan Allam Properties offers an exceptional portfolio of 25 projects located in strategic locations, both in the heart of dynamic urban centers and along the coastline.",
    ctaButtonLabel: "Let's work together",
  },
};

export function getProjectDetail(slug: string): ProjectDetailData | undefined {
  return PROJECT_DETAILS[slug];
}

/** Project page every project links to until its own page is built. */
export const DEFAULT_PROJECT_SLUG = "swanlake-residences";

/** Link to a project's page — its own if built, otherwise the shared one. */
export function projectHref(id: string): string {
  return `/projects/${PROJECT_DETAILS[id] ? id : DEFAULT_PROJECT_SLUG}`;
}
