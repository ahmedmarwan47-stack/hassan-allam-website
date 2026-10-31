import ActionButton from "@/components/ActionButton";
import { Reveal } from "@/components/Reveal";
import NewsCard from "@/components/sections/news/NewsCard";
import { NEWS } from "@/data/news";

/**
 * Homepage "HAP Media Center" teaser — Figma 17127:2334. The three latest
 * articles in third-width cards (the Figma placeholder headlines are swapped
 * for the real NEWS entries, same as the /news page), then "Read all".
 */
export default function HomeMediaCenter() {
  const latest = NEWS.slice(0, 3).map((a) => ({ ...a, span: "third" as const }));

  return (
    <section
      data-nav-theme="light"
      className="bg-grey-100 px-6 py-16 text-brand-black md:p-16"
    >
      <div className="flex flex-col items-center gap-8">
        <Reveal>
          <h2 className="text-center font-serif font-light uppercase leading-[1.16] tracking-[-0.02em] [font-size:clamp(2.5rem,4.3vw,3.875rem)]">
            HAP Media Center
          </h2>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-3">
          {latest.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>

        <ActionButton label="Read more" href="/news" look="plain" />
      </div>
    </section>
  );
}
