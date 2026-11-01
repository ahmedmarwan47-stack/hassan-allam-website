import Image from "@/components/ProgressiveImage";
import { Reveal } from "@/components/Reveal";
import { formatNewsDate, type NewsArticle } from "@/data/news";
import type { NewsDetail } from "@/data/newsDetail";

export default function NewsDetailHero({
  article,
  detail,
}: {
  article: NewsArticle;
  detail: NewsDetail;
}) {
  return (
    <section
      data-nav-theme="dark"
      className="relative flex min-h-[720px] flex-col justify-between overflow-hidden bg-brand-black px-6 pb-10 pt-32 text-brand-white md:min-h-screen md:px-16 md:pb-16 md:pt-40"
    >
      {/* Dark window-light backdrop (dark variant, from the project folder).
          Rendered at full strength so the light streaks actually read; only
          the bottom fades into the black content section below. */}
      <Image
        src="/images/bg-dark.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-brand-black"
      />

      {/* Category + date, then the big headline — on the shared right text
          column (66.16%), as in Figma. */}
      <Reveal className="relative z-10 flex justify-end pt-6 md:pt-0">
        <div className="flex flex-col gap-6 md:w-[66.16%] md:gap-8">
          <p className="flex items-center gap-3 font-sans text-sm font-medium uppercase tracking-[0.12em] text-white/60 md:text-base">
            <span className="rounded-full border border-white/30 px-3 py-1 text-white">{article.category}</span>
            <time dateTime={article.date.split(".").reverse().join("-")}>{formatNewsDate(article.date)}</time>
          </p>
          <h1 className="font-serif font-light leading-[1.1] tracking-[-0.02em] text-brand-white [font-size:clamp(1.75rem,4.3vw,3.875rem)]">
            {detail.headline}
          </h1>
        </div>
      </Reveal>

      {/* 2-column intro on the right-hand column, at the bottom of the hero.
          Extra breathing room on mobile between the headline and this block. */}
      <Reveal
        delay={0.1}
        className="relative z-10 mt-28 flex flex-col items-start gap-8 md:mt-0 md:flex-row md:items-start md:justify-end"
      >
        <div className="grid gap-8 font-sans text-base leading-[1.4] text-brand-white md:w-[66.16%] md:grid-cols-2 md:gap-16">
          <p>{detail.intro[0]}</p>
          <p>{detail.intro[1]}</p>
        </div>
      </Reveal>

    </section>
  );
}
