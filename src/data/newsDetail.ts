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

/** Every listed article has a detail page. Copy for all but the first two is
 *  placeholder, written to match each headline until real releases arrive. */
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

  "acwa-hau-financial-close": {
    id: "acwa-hau-financial-close",
    headline:
      "ACWA Power and HAU Energy reach financial close on a 200 MW solar project, adding clean capacity to Egypt's grid.",
    intro: [
      "ACWA Power and HAU Energy, part of the Hassan Allam Group, have reached financial close on a 200 MW solar photovoltaic plant in Egypt, clearing the way for construction to begin.",
      "The project supports Egypt's target of generating a growing share of its electricity from renewable sources, and marks another step in the group's energy partnership.",
    ],
    heroImage: "/images/image 388.jpg",
    bigIntroParagraph:
      "Once operational, the plant will supply clean power to the national grid — enough for tens of thousands of homes — and offset a significant volume of carbon emissions every year.",
    body: [
      "Construction is expected to start in the coming months, drawing on the group's engineering and delivery expertise across large-scale infrastructure.",
      "The financing brings together regional and international lenders, reflecting continued confidence in Egypt's renewable energy programme.",
    ],
    bodyImages: ["/images/commercial-real-estate.jpg", "/images/image 402.jpg"],
  },

  "swanlake-el-gouna-handover": {
    id: "swanlake-el-gouna-handover",
    headline:
      "SwanLake Residences El Gouna welcomes its first wave of homeowners to its lagoon-side condos on the Red Sea.",
    intro: [
      "Hassan Allam Properties has begun handing over homes at SwanLake Residences El Gouna, with the first homeowners now settling into their finished waterfront condos.",
      "The handover follows the completion of the community's first phase, including its swimmable crystal lagoons, landscaped promenades and resident amenities.",
    ],
    heroImage: "/images/map/slg.jpg",
    bigIntroParagraph:
      "Set around 360-degree swimmable lagoons in the heart of El Gouna, the community's Modern Greek architecture and fully finished homes are now home to their first residents.",
    body: [
      "Each home is delivered fully finished, with stone facades, wooden linings and private outdoor space designed for relaxed coastal living.",
      "Further phases will be handed over in stages through the coming year, alongside the opening of additional amenities across the community.",
    ],
    bodyImages: ["/images/SLG-18 1.jpg", "/images/SLG-08 3.jpg"],
  },

  "cityscape-awards": {
    id: "cityscape-awards",
    headline:
      "Hassan Allam Properties is recognised among Egypt's top developers at the Cityscape 2024 awards.",
    intro: [
      "Hassan Allam Properties has been named among Egypt's leading real estate developers at Cityscape 2024, recognising the quality and delivery record of its communities.",
      "The recognition reflects HAP's focus on family-centric destinations, design quality and on-time delivery across its city and coastal portfolio.",
    ],
    heroImage: "/images/commercial-real-estate.jpg",
    bigIntroParagraph:
      "Judged on design, delivery and customer experience, the award places HAP among the country's most trusted developers, three generations after the family business began.",
    body: [
      "The award was accepted on behalf of the teams across HAP's projects, from planning and design to construction and community management.",
      "HAP continues to expand its portfolio with new launches in New Cairo, Mostakbal City and along Egypt's coastlines.",
    ],
    bodyImages: ["/images/image 387.jpg", "/images/image 398.jpg"],
  },

  "park-central-mostakbal": {
    id: "park-central-mostakbal",
    headline:
      "Hassan Allam Properties launches Park Central, a new park-side community at the heart of Mostakbal City.",
    intro: [
      "Hassan Allam Properties has launched Park Central, a new residential community in Mostakbal City built around a central park and a network of green walkways.",
      "The community offers apartments, duplexes and townhouses designed for families, with schools, retail and leisure within walking distance.",
    ],
    heroImage: "/images/image 391.jpg",
    bigIntroParagraph:
      "Park Central brings HAP's community-first approach to Mostakbal City: homes set around open green space, with everyday essentials a short walk away.",
    body: [
      "The first phase is now open for reservations, with flexible payment plans and delivery scheduled in stages.",
      "Park Central joins HAP's growing presence in Mostakbal City alongside Haptown and The Valleys.",
    ],
    bodyImages: ["/images/image 390.jpg", "/images/image 385.jpg"],
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
