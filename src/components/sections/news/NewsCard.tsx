import Image from "next/image";
import Link from "next/link";
import GrowReveal from "@/components/GrowReveal";
import { Reveal } from "@/components/Reveal";
import type { NewsArticle } from "@/data/news";
import { NEWS_DETAILS } from "@/data/newsDetail";

// Desktop grid span → column span + image aspect ratio. Mobile always stacks
// full width at 3:4 for visual consistency, so the desktop aspect only kicks
// in from `md:` up.
const SPAN_CLASSES: Record<NewsArticle["span"], string> = {
  third: "md:col-span-1",
  "two-thirds": "md:col-span-2",
  full: "md:col-span-3",
};

const ASPECT_CLASSES: Record<NewsArticle["span"], string> = {
  third: "aspect-[3/4] md:aspect-[424/540]",
  "two-thirds": "aspect-[3/4] md:aspect-[868/900]",
  full: "aspect-[3/4] md:aspect-[1312/720]",
};

const SIZES: Record<NewsArticle["span"], string> = {
  third: "(min-width: 768px) 33vw, 100vw",
  "two-thirds": "(min-width: 768px) 67vw, 100vw",
  full: "100vw",
};

// Narrow cards grow open in height, wide ones in width — same GrowReveal
// language as the projects grid.
const AXIS: Record<NewsArticle["span"], "height" | "width"> = {
  third: "height",
  "two-thirds": "width",
  full: "width",
};

// The big cards' labels should fill their wider container (≈2 lines), not wrap
// to 4 lines like the narrow third-span cards.
const TITLE_MAX: Record<NewsArticle["span"], string> = {
  third: "max-w-[424px]",
  "two-thirds": "max-w-[720px]",
  full: "max-w-[1100px]",
};

function ArrowUpRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 18 18 6M18 6H8M18 6V16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NewsCard({ article }: { article: NewsArticle }) {
  const href = NEWS_DETAILS[article.id] ? `/news/${article.id}` : "#";
  return (
    <div className={`group flex flex-col gap-5 ${SPAN_CLASSES[article.span]}`}>
      <Link
        href={href}
        aria-label={`Read: ${article.title}`}
        className={`relative block w-full overflow-hidden rounded-[2px] ${ASPECT_CLASSES[article.span]}`}
      >
        <GrowReveal axis={AXIS[article.span]} className="absolute inset-0">
          <Image
            src={article.image}
            alt=""
            fill
            sizes={SIZES[article.span]}
            quality={90}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />

          {/* Date pill — top right */}
          <span className="absolute right-4 top-4 inline-flex items-center bg-brand-white px-3 py-[9px] font-sans text-sm font-medium text-brand-black md:text-base">
            {article.date}
          </span>

          {/* Arrow button — bottom right */}
          <span className="absolute bottom-4 right-4 flex size-[42px] items-center justify-center bg-brand-white text-brand-black transition-colors duration-300 group-hover:bg-brand-black group-hover:text-brand-white">
            <ArrowUpRight />
          </span>
        </GrowReveal>
      </Link>

      <Reveal>
        <p className={`${TITLE_MAX[article.span]} font-sans text-lg font-medium leading-[1.3] text-brand-black md:text-2xl`}>
          {article.title}
        </p>
      </Reveal>
    </div>
  );
}
