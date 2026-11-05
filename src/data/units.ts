import type { FeatureIconName } from "@/components/sections/project-detail/icons";

/**
 * Unit types — the homes on offer, listed on each project and neighborhood
 * page and each with its own page (/projects/<project>/units/<unit>).
 *
 * PLACEHOLDER content (names, sizes, copy, images) until HAP supplies the
 * real unit schedule; every project currently shares this one set.
 */
export type UnitCategory = "Apartment" | "Duplex" | "Penthouse" | "Townhouse" | "Twin House" | "Villa";

export const UNIT_CATEGORY_ICON: Record<UnitCategory, FeatureIconName> = {
  Apartment: "apartment",
  Duplex: "duplex",
  Penthouse: "penthouse",
  Townhouse: "townhouse",
  "Twin House": "twinhouse",
  Villa: "villa",
};

export interface UnitType {
  slug: string;
  name: string;
  category: UnitCategory;
  bedrooms: number;
  bathrooms: number;
  /** Total built-up area, m². */
  area: number;
  /** Plot size for houses, m². */
  land?: number;
  /** One line under the name on the unit page. */
  summary: string;
  description: string;
  features: string[];
  image: string;
  gallery: string[];
}

export const UNIT_TYPES: UnitType[] = [
  {
    slug: "garden-apartment",
    name: "Garden Apartment",
    category: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 145,
    summary: "A ground-floor home that opens straight onto its own private garden.",
    description:
      "Living and dining flow out to a landscaped garden through full-height glazing, with two bedroom suites tucked away on the quiet side of the plan.",
    features: ["Private garden", "Open-plan living and dining", "Two en-suite bedrooms", "Floor-to-ceiling glazing", "Covered parking"],
    image: "/images/image 384.jpg",
    gallery: ["/images/image 384.jpg", "/images/image 385.jpg", "/images/image 388.jpg"],
  },
  {
    slug: "signature-apartment",
    name: "Signature Apartment",
    category: "Apartment",
    bedrooms: 3,
    bathrooms: 3,
    area: 185,
    summary: "A generous three-bedroom home with long views over the landscaped spine.",
    description:
      "A corner layout brings light in from two sides, with a wide terrace off the living room and a master suite with its own dressing area.",
    features: ["Wraparound terrace", "Master suite with dressing area", "Separate family room", "Maid's room", "Covered parking"],
    image: "/images/image 388.jpg",
    gallery: ["/images/image 388.jpg", "/images/image 386.jpg", "/images/image 387.jpg"],
  },
  {
    slug: "terrace-duplex",
    name: "Terrace Duplex",
    category: "Duplex",
    bedrooms: 3,
    bathrooms: 3,
    area: 240,
    summary: "Two levels of living, with the bedrooms upstairs and a double-height salon.",
    description:
      "Entertaining spaces on the lower level open to a broad terrace, while a sculpted stair leads to three bedrooms and a family lounge above.",
    features: ["Double-height living room", "Private terrace", "Upper-floor family lounge", "Three en-suite bedrooms", "Two parking spaces"],
    image: "/images/image 387.jpg",
    gallery: ["/images/image 387.jpg", "/images/image 383.jpg", "/images/image 402.jpg"],
  },
  {
    slug: "sky-penthouse",
    name: "Sky Penthouse",
    category: "Penthouse",
    bedrooms: 4,
    bathrooms: 4,
    area: 290,
    summary: "A top-floor home crowned by a private roof terrace.",
    description:
      "The full top floor of its building, with a roof terrace for outdoor dining and sunset views across the community.",
    features: ["Private roof terrace", "Panoramic views", "Four en-suite bedrooms", "Outdoor kitchen provision", "Two parking spaces"],
    image: "/images/image 383.jpg",
    gallery: ["/images/image 383.jpg", "/images/image 384.jpg", "/images/image 386.jpg"],
  },
  {
    slug: "park-townhouse",
    name: "Park Townhouse",
    category: "Townhouse",
    bedrooms: 3,
    bathrooms: 4,
    area: 260,
    land: 210,
    summary: "A garden-fronted family house on a quiet, tree-lined street.",
    description:
      "Three floors of family living, with a front garden, a private back garden off the kitchen and a roof terrace above.",
    features: ["Front and back gardens", "Roof terrace", "Family kitchen", "Three en-suite bedrooms", "Private parking"],
    image: "/images/image 390.jpg",
    gallery: ["/images/image 390.jpg", "/images/image 391.jpg", "/images/image 398.jpg"],
  },
  {
    slug: "twin-house",
    name: "Twin House",
    category: "Twin House",
    bedrooms: 4,
    bathrooms: 4,
    area: 320,
    land: 300,
    summary: "A semi-detached villa pairing privacy with a shared green setting.",
    description:
      "Wide living spaces open to a garden on three sides, with four bedrooms upstairs and room for a pool.",
    features: ["Garden on three sides", "Pool-ready plot", "Four en-suite bedrooms", "Guest suite", "Two parking spaces"],
    image: "/images/image 391.jpg",
    gallery: ["/images/image 391.jpg", "/images/image 392.jpg", "/images/image 390.jpg"],
  },
  {
    slug: "standalone-villa",
    name: "Standalone Villa",
    category: "Villa",
    bedrooms: 5,
    bathrooms: 5,
    area: 450,
    land: 600,
    summary: "A detached villa on a generous plot, with its own garden and pool.",
    description:
      "Set back from the street behind its own landscaping, with formal and family living, a private pool and five bedroom suites.",
    features: ["Private pool", "Landscaped garden", "Five en-suite bedrooms", "Formal and family living", "Garage for two cars"],
    image: "/images/image 398.jpg",
    gallery: ["/images/image 398.jpg", "/images/image 392.jpg", "/images/image 401.jpg"],
  },
];

export function getUnit(slug: string): UnitType | undefined {
  return UNIT_TYPES.find((u) => u.slug === slug);
}

export const unitHref = (projectId: string, unitSlug: string) => `/projects/${projectId}/units/${unitSlug}`;
