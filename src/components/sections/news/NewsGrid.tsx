import NewsCard from "./NewsCard";
import { Reveal } from "@/components/Reveal";
import { NEWS } from "@/data/news";

// No hero — the "HAP NEWS" title sits in the same section as the cards, ~60px
// above the grid (per Figma 17043-52719). Top padding clears the fixed navbar.
export default function NewsGrid() {
  return (
    <section
      data-nav-theme="light"
      className="bg-brand-white px-6 pb-16 pt-28 md:px-16 md:pb-24 md:pt-36"
    >
      <Reveal>
        <h1 className="font-serif font-light uppercase leading-none tracking-[-0.02em] text-brand-black [font-size:clamp(3rem,9vw,7.5rem)]">
          HAP News
        </h1>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 md:mt-[60px] md:grid-cols-3 md:gap-y-16">
        {NEWS.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
