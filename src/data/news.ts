export type NewsSpan = "third" | "two-thirds" | "full";

export const NEWS_CATEGORIES = ["News", "Event", "Blog"] as const;
export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export interface NewsArticle {
  id: string;
  date: string;
  title: string;
  image: string;
  category: NewsCategory;
  /** Grid span for desktop layout only — mobile always stacks full-width. */
  span: NewsSpan;
}

/**
 * The Figma frame uses "Exceptional Amenities for a Unique Living Experience"
 * as placeholder headline for most cards — replaced with plausible HAP news
 * stories consistent with the group's actual business lines (facility
 * management, energy JV, master-planned communities, coastal resorts, industry
 * awards). Images reuse existing renders already in public/images/.
 */
export const NEWS: NewsArticle[] = [
  {
    id: "eden-embassy-of-denmark",
    category: "News",
    date: "09.03.2025",
    title:
      "Eden Facility Management has been awarded the facility management works for the Embassy of Denmark in Egypt.",
    image: "/images/office.jpg",
    span: "third",
  },
  {
    id: "new-cairo-mixed-use",
    category: "News",
    date: "15.02.2025",
    title:
      "Hassan Allam Group unveils a new integrated mixed-use community in New Cairo, blending residential, retail and office space across 240 feddans.",
    image: "/images/image 385.jpg",
    span: "two-thirds",
  },
  {
    id: "acwa-hau-financial-close",
    category: "News",
    date: "02.02.2025",
    title: "ACWA Power and HAU Energy achieve financial close on 200 MW solar project.",
    image: "/images/image 388.jpg",
    span: "third",
  },
  {
    id: "swanlake-el-gouna-handover",
    category: "Event",
    date: "20.01.2025",
    title: "Swanlake Residences El Gouna welcomes its first wave of homeowners.",
    image: "/images/map/slg.jpg",
    span: "third",
  },
  {
    id: "cityscape-awards",
    category: "Event",
    date: "10.12.2024",
    title:
      "Hassan Allam Properties recognized among Egypt's top developers at Cityscape 2024.",
    image: "/images/commercial-real-estate.jpg",
    span: "third",
  },
  {
    id: "park-central-mostakbal",
    category: "Blog",
    date: "01.12.2024",
    title: "Hassan Allam Properties launches Park Central at Mostakbal City.",
    image: "/images/image 391.jpg",
    span: "full",
  },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "09.03.2025" → "9 March 2025". */
export function formatNewsDate(date: string): string {
  const [d, m, y] = date.split(".").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
