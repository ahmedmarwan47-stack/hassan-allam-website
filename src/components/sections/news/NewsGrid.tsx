import NewsCard from "./NewsCard";
import { NEWS } from "@/data/news";

// No hero — the "Media Center" title sits in the same section as the cards,
// ~60px above the grid. Top padding clears the fixed navbar. Title is 180px
// on desktop, centered.
export default function NewsGrid() {
  return (
    <section
      data-nav-theme="light"
      className="bg-brand-white px-6 pb-16 pt-28 md:px-16 md:pb-24 md:pt-36"
    >
      <h1 className="text-center font-serif font-light uppercase leading-none tracking-[-0.02em] text-brand-black [font-size:clamp(3rem,12.5vw,11.25rem)]">
        Media Center
      </h1>
      <div className="mt-[60px] grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-y-16">
        {NEWS.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
