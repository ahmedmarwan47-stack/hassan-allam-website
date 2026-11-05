import type { FeatureIconName } from "@/components/sections/project-detail/icons";
import { CATEGORY_LABEL, type Category } from "./mapProjects";
import { LIVE_PROJECTS, type LiveProject } from "./hapLive";

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
  /** Live site slug (its neighborhood page uses it). */
  slug?: string;
  /** Pin position, % of the master plan image. */
  left?: number;
  top?: number;
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
  /** Asset classes shown under the hero headline (same as the project card). */
  tags: Category[];

  scrollLabel: string;
  introParagraphs: [string, string];
  /** [narrow, wide] — matches the Figma 423px/869px split. */
  introImages: [string, string];

  tag: string;
  tagline: string;
  communityLabel: string;
  communityHeading: RichSegment[];
  brochureLabel: string;
  /** The live brochure file (hap.com.eg CDN), when there is one. */
  brochureUrl?: string;
  /** The live fly-through video (hap.com.eg CDN), when there is one. */
  videoUrl?: string;

  masterPlan?: {
    items: MasterPlanItem[];
    mapImage: string;
    /** Master plan image width / height. */
    aspect: number;
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

// Home types on offer, shared by every project page (placeholder copy) —
// distinct from the amenities.
const HOME_TYPES: FeatureItem[] = [
  { icon: "apartment", title: "Apartments", description: "Light-filled one to three-bedroom homes overlooking the landscaped gardens." },
  { icon: "duplex", title: "Duplexes", description: "Two levels of living with private terraces and generous family space." },
  { icon: "penthouse", title: "Penthouses", description: "Top-floor homes with roof terraces and open views across the community." },
  { icon: "townhouse", title: "Townhouses", description: "Garden-fronted homes on quiet streets, made for growing families." },
  { icon: "twinhouse", title: "Twin Houses", description: "Semi-detached villas pairing privacy with a shared, green setting." },
  { icon: "villa", title: "Standalone Villas", description: "Detached villas on generous plots, each with a private garden and pool." },
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

// Drawer copy for the master plan's neighborhoods (placeholder — the live
// site has none yet), by name.
const NEIGHBORHOOD_BLURBS: Record<string, string> = {
  "The Selina": "Low-rise residences wrapped around landscaped courtyards, where every home opens onto green and the walk to the central park takes minutes.",
  "The Giselle": "Contemporary apartments with generous terraces, set along quiet tree-lined promenades close to the retail hub.",
  "The Scarlet": "A boutique collection of homes around a private pool garden, designed for families who value calm and privacy.",
  "The Amaia": "Elegant duplexes and penthouses with open views across SLR's landscaped spine.",
  "The Phoenix": "Refined residences with stone facades and double-height lobbies, a short stroll from the clubhouse.",
  "The Iris": "Resort-style living around a sunlit pool deck, with shaded cabanas and gardens between every building.",
  "Villas Residences": "Villas on generous plots facing the green corridors, each with a private garden.",
  "Apartments Residences": "Light-filled apartments set among the masterplan's landscaped courtyards.",
  "Kode Sports Club": "KODE, a state-of-the-art sports club with courts, a fitness centre and family pools, at the heart of community life.",
};

/** Two display lines: the first word, then the rest (e.g. SwanLake / West). */
function nameLines(name: string): [string, string] {
  const [first, ...rest] = name.split(" ");
  return [first, rest.join(" ")];
}

/** A heading split into two balanced lines at the word nearest the middle. */
function halves(title: string): [string, string] {
  const words = title.split(" ");
  let best = 1;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ").length;
    const b = words.slice(0, best).join(" ").length;
    if (Math.abs(a - title.length / 2) < Math.abs(b - title.length / 2)) best = i;
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

// Existing renders that top up a project's photos when the live site has
// fewer than a page needs (PLACEHOLDER — to be replaced with the project's
// own photography).
const FILLER_IMAGES = [
  "/images/image 383.jpg", "/images/image 384.jpg", "/images/image 385.jpg", "/images/image 386.jpg",
  "/images/image 387.jpg", "/images/image 388.jpg", "/images/image 390.jpg", "/images/image 391.jpg",
  "/images/image 392.jpg", "/images/image 398.jpg", "/images/image 399.jpg", "/images/image 400.jpg",
  "/images/image 401.jpg", "/images/image 402.jpg",
];

// Generated amenities, by asset class, for projects the live site lists none
// for (PLACEHOLDER copy).
const AMENITIES_BY_TYPE: Record<Category, FeatureItem> = {
  Residential: { icon: "leisure", title: "Landscaped Parks", description: "Green open spaces and walking trails between the neighborhoods." },
  "Office Space": { icon: "office", title: "Business Park", description: "Grade-A offices with flexible floor plates and on-site services." },
  Retail: { icon: "retail", title: "Curated Retail", description: "Hand-picked brands and everyday essentials along a walkable promenade." },
  "Hospitality & Leisure": { icon: "hospitality", title: "Hospitality", description: "Cafés, restaurants and hospitality spaces for every time of day." },
  "Sports & Wellness": { icon: "fitness", title: "Sports & Wellness", description: "A sports club with courts, a fitness centre and family pools." },
};

/**
 * A project page from the live site's content (src/data/hapLive.ts, generated
 * from hap.com.eg): real name, asset classes, intro, overview, galleries,
 * amenities, story block, brochure, fly-through and — for SwanLake Residences
 * — the master plan with its neighborhoods at their real positions. The
 * construction timeline and unit types are still placeholder content.
 */
function fromLive(p: LiveProject): ProjectDetailData {
  // The project's own photos first (galleries, amenity photos, cover, card),
  // topped up with existing renders so no photo repeats on the page.
  const own = [
    ...p.galleries.flat(),
    ...p.lists.flatMap((l) => l.items.map((i) => i.thumbnail)),
    p.cover,
    p.thumbnail,
  ].filter((x): x is string => !!x);
  const imgs = [...new Set([...own, ...FILLER_IMAGES])];
  const pick = (i: number) => imgs[i % imgs.length];
  const list = p.lists[0];
  const group = p.group === "sea" ? "By The Sea" : "In The City";
  const plan = p.masterplan;
  return {
    id: p.slug,
    name: nameLines(p.name),
    badgeMain: p.abbreviation ?? p.name,
    badgeScript: "",
    tags: p.types,

    scrollLabel: "Scroll",
    introParagraphs: [p.intro[0] ?? p.overview[0] ?? "", p.intro.slice(1).join(" ")],
    introImages: [pick(0), pick(1)],

    tag: p.abbreviation ?? p.name,
    tagline: p.types.map((t) => CATEGORY_LABEL[t]).join(" · "),
    communityLabel: group,
    communityHeading: [{ text: (p.overview.length ? p.overview : p.intro).join(" ") }],
    brochureLabel: p.brochure?.label ?? "Download our brochure",
    brochureUrl: p.brochure?.url,
    videoUrl: p.video ?? undefined,

    masterPlan: plan
      ? {
          mapImage: plan.map,
          aspect: plan.width / plan.height,
          items: plan.items.map((it, i) => ({
            number: i + 1,
            name: it.parcel ? `${it.name} · Parcel ${it.parcel}` : it.name,
            slug: it.slug.replace(`-${p.slug}`, ""),
            left: it.left,
            top: it.top,
            blurb: NEIGHBORHOOD_BLURBS[it.name] ?? `A neighborhood within ${p.name}.`,
            image: pick(i + 2),
          })),
        }
      : undefined,

    showcase: { full: pick(2), half: pick(3), wide: pick(4) },

    amenitiesHeading: list?.title ? halves(list.title) : ["Exceptional Amenities for", "a Unique Living Experience"],
    amenities: list?.items.length
      ? list.items.map((i) => ({ icon: i.icon, title: i.label, description: i.description }))
      : p.types.length
        ? [...p.types.map((t) => AMENITIES_BY_TYPE[t]), AMENITIES_BY_TYPE.Residential].filter(
            (a, i, all) => all.indexOf(a) === i,
          )
        : SLR_AMENITIES,

    storyImages: [pick(5), pick(6)],
    storyHeading: p.diptych?.title || `Life at ${p.name}`,
    // Generated when the live site has no story block (PLACEHOLDER copy).
    storyParagraphs: p.diptych?.text.length
      ? p.diptych.text
      : [
          `${p.name} brings together ${p.types.map((t) => CATEGORY_LABEL[t].toLowerCase()).join(", ")} in one ${
            p.group === "sea" ? "coastal destination" : "connected city address"
          }, designed around the way people live, work and gather.`,
          "Every space is shaped with the same care for quality, privacy and enduring value that defines Hassan Allam Properties' communities.",
        ],

    productsImages: { half: pick(7), wide: pick(8) },
    productsHeading: "Homes to Choose From",
    products: HOME_TYPES,

    construction: SAMPLE_CONSTRUCTION,

    ctaHeading: "A HAP Resale Expert Can Help You",
    ctaParagraph:
      "Hassan Allam Properties offers an exceptional portfolio of 25 projects located in strategic locations, both in the heart of dynamic urban centers and along the coastline.",
    ctaButtonLabel: "Let's work together",
  };
}

/** Every live project, keyed by its hap.com.eg slug. */
export const PROJECT_DETAILS: Record<string, ProjectDetailData> = Object.fromEntries(
  LIVE_PROJECTS.map((p) => [p.slug, fromLive(p)]),
);

export function getProjectDetail(slug: string): ProjectDetailData | undefined {
  return PROJECT_DETAILS[slug];
}

/** Project page every project links to until its own page is built. */
export const DEFAULT_PROJECT_SLUG = "swanlake-residences-new-cairo";

/** Link to a project's page — its own if built, otherwise the shared one. */
export function projectHref(id: string): string {
  return `/projects/${PROJECT_DETAILS[id] ? id : DEFAULT_PROJECT_SLUG}`;
}
