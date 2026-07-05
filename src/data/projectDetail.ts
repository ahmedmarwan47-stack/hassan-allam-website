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
        { number: 1, name: "The Selina" },
        { number: 2, name: "The Giselle" },
        { number: 3, name: "The Scarlet" },
        { number: 4, name: "The Amaia" },
        { number: 5, name: "The Phoenix" },
        { number: 6, name: "The Iris" },
        { number: 7, name: "Am:pm" },
        { number: 8, name: "Villas Residence" },
        { number: 9, name: "Villas Residence" },
        { number: 10, name: "Villas Residence" },
        { number: 11, name: "Villas Residence" },
        { number: 12, name: "Villas Residence" },
        { number: 13, name: "Villas Residence" },
        { number: 14, name: "Sports Club" },
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

    ctaHeading: "A HAP Resale Expert Can Help You",
    ctaParagraph: "Hassan Allam Properties offers an exceptional portfolio of 11 projects located in strategic locations, both in the heart of dynamic urban centers and along the coastline.",
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

    ctaHeading: "A HAP Resale Expert Can Help You",
    ctaParagraph: "Hassan Allam Properties offers an exceptional portfolio of 11 projects located in strategic locations, both in the heart of dynamic urban centers and along the coastline.",
    ctaButtonLabel: "Let's work together",
  },
};

export function getProjectDetail(slug: string): ProjectDetailData | undefined {
  return PROJECT_DETAILS[slug];
}
