export type NewsSpan = "third" | "two-thirds" | "full";

export interface NewsArticle {
  id: string;
  date: string;
  title: string;
  image: string;
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
    date: "09.03.2025",
    title:
      "Eden Facility Management has been awarded the facility management works for the Embassy of Denmark in Egypt.",
    image: "/images/office.jpg",
    span: "third",
  },
  {
    id: "new-cairo-mixed-use",
    date: "15.02.2025",
    title:
      "Hassan Allam Group unveils a new integrated mixed-use community in New Cairo, blending residential, retail and office space across 240 feddans.",
    image: "/images/image 385.jpg",
    span: "two-thirds",
  },
  {
    id: "acwa-hau-financial-close",
    date: "02.02.2025",
    title: "ACWA Power and HAU Energy achieve financial close on 200 MW solar project.",
    image: "/images/image 388.jpg",
    span: "third",
  },
  {
    id: "swanlake-el-gouna-handover",
    date: "20.01.2025",
    title: "Swanlake Residences El Gouna welcomes its first wave of homeowners.",
    image: "/images/map/slg.jpg",
    span: "third",
  },
  {
    id: "cityscape-awards",
    date: "10.12.2024",
    title:
      "Hassan Allam Properties recognized among Egypt's top developers at Cityscape 2024.",
    image: "/images/commercial-real-estate.jpg",
    span: "third",
  },
  {
    id: "park-central-mostakbal",
    date: "01.12.2024",
    title: "Hassan Allam Properties launches Park Central at Mostakbal City.",
    image: "/images/image 391.jpg",
    span: "full",
  },
];
