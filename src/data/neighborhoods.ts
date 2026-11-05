import { PROJECT_DETAILS, type FeatureItem, type MasterPlanItem, type ProjectDetailData } from "./projectDetail";
import { UNIT_TYPES, type UnitType } from "./units";

/**
 * Neighborhoods (villages) — one page per master plan entry, at
 * /projects/<project>/neighborhoods/<slug>: its own amenities, unit types
 * and construction updates. Built from the project's master plan, so the
 * list, the pins and the pages never drift apart.
 *
 * Amenities and unit mix are PLACEHOLDER content until HAP supplies the
 * real details per neighborhood.
 */

export interface Neighborhood {
  slug: string;
  item: MasterPlanItem;
  project: ProjectDetailData;
  amenities: FeatureItem[];
  units: UnitType[];
}

const COURTYARD_AMENITIES: FeatureItem[] = [
  { icon: "leisure", title: "Landscaped Courtyards", description: "Shaded gardens between the buildings, steps from every front door." },
  { icon: "hospitality", title: "Residents' Pool", description: "A pool deck with cabanas, reserved for the neighborhood." },
  { icon: "fitness", title: "Fitness Studio", description: "A fully equipped gym with studio classes through the week." },
  { icon: "retail", title: "Daily Essentials", description: "A grocer and pharmacy within a short walk." },
];

const VILLA_AMENITIES: FeatureItem[] = [
  { icon: "leisure", title: "Green Corridors", description: "Walking and cycling paths threading the villas to the central park." },
  { icon: "hospitality", title: "Clubhouse", description: "A private clubhouse with a lounge, café and family pool." },
  { icon: "fitness", title: "Sports Courts", description: "Padel and tennis courts a short walk from home." },
  { icon: "healthcare", title: "Gated Security", description: "Controlled entrances and round-the-clock security." },
];

const CLUB_AMENITIES: FeatureItem[] = [
  { icon: "fitness", title: "Fitness Centre", description: "Cardio, strength and studio spaces with personal training." },
  { icon: "hospitality", title: "Family Pools", description: "Lap, leisure and children's pools with a sun deck." },
  { icon: "leisure", title: "Courts & Track", description: "Padel, tennis and a running track around the sports field." },
  { icon: "dining", title: "Clubhouse Café", description: "All-day dining overlooking the courts." },
];

const APARTMENT_UNITS = ["garden-apartment", "signature-apartment", "terrace-duplex", "sky-penthouse"];
const VILLA_UNITS = ["park-townhouse", "twin-house", "standalone-villa"];

const byName = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function build(project: ProjectDetailData): Neighborhood[] {
  const items = project.masterPlan?.items ?? [];
  return items.map((item) => {
    // The live site's slug when we have it; otherwise from the name (repeats
    // carry their number).
    const repeated = items.filter((it) => it.name === item.name).length > 1;
    const slug = item.slug ?? (repeated ? `${byName(item.name)}-${item.number}` : byName(item.name));
    const isClub = /club/i.test(item.name);
    const isVillas = /villa/i.test(item.name);
    const unitSlugs = isClub ? [] : isVillas ? VILLA_UNITS : APARTMENT_UNITS;
    return {
      slug,
      item,
      project,
      amenities: isClub ? CLUB_AMENITIES : isVillas ? VILLA_AMENITIES : COURTYARD_AMENITIES,
      units: UNIT_TYPES.filter((u) => unitSlugs.includes(u.slug)),
    };
  });
}

export const NEIGHBORHOODS: Neighborhood[] = Object.values(PROJECT_DETAILS).flatMap(build);

export function getNeighborhood(projectId: string, slug: string): Neighborhood | undefined {
  return NEIGHBORHOODS.find((n) => n.project.id === projectId && n.slug === slug);
}

/** Page for a master plan entry (by its list number). */
export function neighborhoodHref(projectId: string, number: number): string | undefined {
  const n = NEIGHBORHOODS.find((x) => x.project.id === projectId && x.item.number === number);
  return n && `/projects/${projectId}/neighborhoods/${n.slug}`;
}
