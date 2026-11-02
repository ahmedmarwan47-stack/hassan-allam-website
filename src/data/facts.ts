/**
 * Facts and Figures — wording and values as on hap.com.eg. Shared by the
 * homepage and Our Story so the two never drift apart. (The live Story page
 * shows 980,000 Sqm for the commercial figure; we follow the live homepage.)
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
