import Link from "next/link";
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
      <div className="mx-auto flex max-w-[1312px] flex-col items-center gap-8">
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

        <Link
          href="/news"
          className="group relative flex items-center gap-2.5 overflow-hidden border border-brand-black px-6 py-5 font-serif text-[1.625rem] uppercase leading-none tracking-[-0.02em] text-brand-black transition-colors duration-500 hover:text-brand-white"
        >
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full bg-brand-black transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0"
          />
          <span className="relative z-10">Read all</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden className="relative z-10">
            <path d="M6 18 18 6M18 6H8M18 6V16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
