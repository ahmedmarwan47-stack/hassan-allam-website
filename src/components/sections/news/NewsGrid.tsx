"use client";

import { useState } from "react";
import NewsCard from "./NewsCard";
import { NEWS, NEWS_CATEGORIES, type NewsCategory } from "@/data/news";
import { Reveal } from "@/components/Reveal";
import FilterButton from "@/components/FilterButton";
import { useT } from "@/i18n/LocaleProvider";

// Filter labels (plural for the pills) per category.
const LABELS: Record<NewsCategory, string> = { News: "News", Event: "Events", Blog: "Blog" };
type Filter = "All" | NewsCategory;

// No hero — the "Media Center" title sits in the same section as the cards,
// with the shared category filter between them. Top padding clears the fixed
// navbar. The first story of the current filter leads as a wide featured
// card on the left (two columns, same image height as its neighbour);
// everything after it is the standard one-column card.
export default function NewsGrid() {
  const t = useT();
  const [filter, setFilter] = useState<Filter>("All");
  const visible = filter === "All" ? NEWS : NEWS.filter((a) => a.category === filter);

  return (
    <section
      data-nav-theme="light"
      className="bg-brand-white px-6 pb-16 pt-28 md:px-16 md:pb-24 md:pt-36"
    >
      <Reveal>
        <h1 className="text-center font-serif font-light uppercase leading-none tracking-[-0.02em] text-brand-black [font-size:clamp(3rem,12.5vw,11.25rem)]">
          {t("Media Center")}
        </h1>
      </Reveal>

      {/* Filter bar — the site's shared filter buttons (as on FAQs and
          Careers); scrolls sideways on mobile so every option fits. */}
      <Reveal delay={0.08} className="mt-8 md:mt-10">
        <div className="flex gap-3 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:gap-4 md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none]">
          {(["All", ...NEWS_CATEGORIES] as Filter[]).map((f) => (
            <FilterButton
              key={f}
              label={t(f === "All" ? "All" : LABELS[f])}
              active={filter === f}
              onClick={() => setFilter(f)}
            />
          ))}
        </div>
      </Reveal>

      {/* Keyed on the filter so the cards replay their entrance on switch. */}
      <div key={filter} className="@container mt-10 grid grid-cols-1 gap-x-5 gap-y-10 md:mt-14 md:grid-cols-3 md:gap-y-16">
        {visible.map((article, i) => (
          <NewsCard
            key={article.id}
            article={{ ...article, span: i === 0 ? "two-thirds" : "third" }}
          />
        ))}
      </div>
    </section>
  );
}
