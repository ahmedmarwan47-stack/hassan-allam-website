import { NEWS, type NewsArticle } from "./news";

export interface NewsDetail {
  id: string;
  /** Display headline in the hero — usually longer/differently framed than the
   *  short listing title. */
  headline: string;
  intro: [string, string];
  heroImage: string;
  bigIntroParagraph: string;
  body: [string, string];
  bodyImages: [string, string];
}

/** Only a couple of the six listed articles have real detail pages built —
 *  the rest keep their `#` link on the news grid, same convention used for
 *  project detail pages ([[project-detail-template]]). */
export const NEWS_DETAILS: Record<string, NewsDetail> = {
  "eden-embassy-of-denmark": {
    id: "eden-embassy-of-denmark",
    headline:
      "Eden Facility Management has been awarded the facility management works for the Embassy of Denmark in Egypt.",
    intro: [
      "Eden Facility Management, part of the Hassan Allam Group, has been selected to deliver full facility management services for the Embassy of Denmark in Egypt. The contract covers day-to-day operations across the Embassy's Cairo premises.",
      "The award reinforces Eden's growing portfolio of high-profile diplomatic and corporate clients across the region, and reflects the group's continued investment in specialised facility management capabilities.",
    ],
    heroImage: "/images/office.jpg",
    bigIntroParagraph:
      "Spanning day-to-day operations across the Embassy's Cairo premises, Eden Facility Management's scope covers technical, soft services, and sustainability-led maintenance — consistent with the standards the Danish mission upholds at home and abroad.",
    body: [
      "Eden's contract with the Embassy of Denmark builds on more than a decade of specialist facility management experience across Egypt, spanning residential communities, commercial towers, and mixed-use destinations.",
      "The team on the ground will be led out of Eden's Cairo hub and will draw on the broader group's engineering, MEP and sustainability expertise to deliver a service tailored to the Embassy's operational needs.",
    ],
    bodyImages: [
      "/images/commercial-real-estate.jpg",
      "/images/image 388.jpg",
    ],
  },

  "new-cairo-mixed-use": {
    id: "new-cairo-mixed-use",
    headline:
      "Hassan Allam Group unveils a new integrated mixed-use community in New Cairo — 240 feddans of residential, retail, and office space at the city's edge.",
    intro: [
      "Hassan Allam Properties has unveiled a new fully-integrated mixed-use community in the heart of New Cairo. The 240-feddan destination brings together premium residential neighbourhoods, curated retail and grade-A office space in a single walkable master plan.",
      "Designed for long-term liveability, the community continues HAP's approach to placemaking: gated privacy, generous landscaping, and destinations that draw both residents and neighbours.",
    ],
    heroImage: "/images/image 385.jpg",
    bigIntroParagraph:
      "Spanning 240 feddans at the heart of New Cairo, the new destination brings together premium residential, curated retail and grade-A office space in a single walkable master plan — centred on a landscaped public realm.",
    body: [
      "The scheme is anchored by a central park and a retail spine that connects residents to daily-life essentials — from grocery to fitness, culture and dining — without leaving the community.",
      "Handover of the first residential phase is planned for 2027, with retail and office components opening in staged waves alongside it. Full delivery is set for 2029.",
    ],
    bodyImages: ["/images/image 391.jpg", "/images/map/slg.jpg"],
  },
};

export function getNewsArticle(slug: string):
  | { article: NewsArticle; detail: NewsDetail }
  | undefined {
  const detail = NEWS_DETAILS[slug];
  const article = NEWS.find((a) => a.id === slug);
  if (!detail || !article) return undefined;
  return { article, detail };
}
