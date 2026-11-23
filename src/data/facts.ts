/**
 * Facts and Figures — wording and values as on hap.com.eg. Shared by the
 * homepage and Our Story. hap.com.eg itself gives two values for the
 * commercial figure: 1,000,000 Sqm on its homepage and 980,000 Sqm on its
 * Story page. Each page follows its live counterpart (STORY_FACTS below)
 * until HAP confirms which one is right.
 */
export interface Fact {
  label: string;
  value: string;
  unit?: string;
  image: string;
}

export const FACTS: Fact[] = [
  {
    label: "Nationwide mixed-use flagship developments",
    value: "25",
    image: "/images/commercial-real-estate.jpg",
  },
  {
    label: "Commercial and Hospitality asset classes",
    value: "1,000,000",
    unit: "Sqm",
    image: "/images/hospitality.jpg",
  },
  { label: "Citizens", value: "24,000", image: "/images/story-hands.jpg" },
  {
    label: "Crystal Lagoons",
    value: "100,000",
    unit: "Sqm",
    image: "/images/SLG-17 1.jpg",
  },
];

/** Our Story: the live Story page's figures (980,000 Sqm commercial). */
export const STORY_FACTS: Fact[] = FACTS.map((f) =>
  f.label === "Commercial and Hospitality asset classes" ? { ...f, value: "980,000" } : f,
);
