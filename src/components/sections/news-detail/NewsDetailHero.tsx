import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import type { NewsArticle } from "@/data/news";
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
      className="relative flex min-h-[640px] flex-col justify-between overflow-hidden bg-brand-black px-6 pb-10 pt-28 text-brand-white md:min-h-screen md:px-16 md:pb-16 md:pt-40"
    >
      {/* Dark window-light backdrop (dark variant, from the project folder).
          Rendered at full strength so the light streaks actually read; only
          the bottom fades into the black content section below. */}
      <GrowReveal axis="width" className="pointer-events-none absolute inset-0">
        <Image
          src="/images/bg-dark.webp"
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          className="select-none object-cover"
        />
      </GrowReveal>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-brand-black"
      />

      {/* Big headline, right-anchored on desktop to match the Figma layout. */}
      <Reveal className="relative z-10 flex justify-end pt-6 md:pt-0">
        <p className="max-w-[868px] font-serif font-light uppercase leading-[1.1] tracking-[-0.02em] text-brand-white [font-size:clamp(1.75rem,4.3vw,3.875rem)]">
          {detail.headline}
        </p>
      </Reveal>

      {/* Scroll indicator + 2-column intro, at the bottom of the hero. Extra
          breathing room on mobile between the serif headline and this block. */}
      <Reveal
        delay={0.1}
        className="relative z-10 mt-16 flex flex-col items-start gap-8 md:mt-0 md:flex-row md:items-start md:justify-between"
      >
        <div className="flex shrink-0 items-center gap-3">
          <span className="size-3 shrink-0 rounded-full border border-brand-white/40" />
          <p className="font-sans text-base text-brand-white">Scroll</p>
        </div>
        <div className="grid gap-8 font-sans text-base leading-[1.4] text-brand-white md:max-w-[868px] md:grid-cols-2 md:gap-16">
          <p>{detail.intro[0]}</p>
          <p>{detail.intro[1]}</p>
        </div>
      </Reveal>

      {/* Screen-reader-only date for reference from the listing. */}
      <span className="sr-only">Published {article.date}</span>
    </section>
  );
}
