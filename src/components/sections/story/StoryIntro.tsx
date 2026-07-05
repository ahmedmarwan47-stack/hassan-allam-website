import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";

export default function StoryIntro() {
  return (
    <section
      data-nav-theme="light"
      className="relative flex flex-col gap-16 bg-brand-white px-6 py-16 text-brand-black md:gap-20 md:px-16 md:py-24"
    >
      {/* Scroll label + description */}
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-start md:justify-between">
        <div className="flex shrink-0 items-center gap-3">
          <span className="size-3 shrink-0 rounded-full border border-brand-black/40" />
          <p className="font-sans text-base text-brand-black">Scroll</p>
        </div>
        {/* Paragraphs sit in the 868 "exceeding" column (66.16% of content),
            same split as ProjectIntro — keeps the story page on the shared
            3-column grid at any viewport width. */}
        <div className="grid gap-8 font-sans text-base leading-[1.4] text-brand-black md:ml-auto md:w-[66.16%] md:grid-cols-[372fr_424fr] md:gap-x-[72px]">
          <p>
            Hassan Allam Properties is the boutique real-estate arm of Hassan
            Allam Holding — one of Egypt&apos;s oldest and most respected
            engineering and construction groups, with roots reaching back to
            1936.
          </p>
          <p>
            Across three generations, the family has grown from a single
            construction firm into a nationwide developer, building intimate,
            thoughtfully designed communities where families always come first.
          </p>
        </div>
      </div>

      {/* Image + big serif statements */}
      <div className="flex flex-col items-start gap-10 md:flex-row md:justify-between md:gap-10">
        <GrowReveal
          axis="height"
          className="relative aspect-square w-full shrink-0 overflow-hidden rounded-[2px] md:w-[313px]"
        >
          <Image
            src="/images/story-intro-square.jpg"
            alt=""
            fill
            sizes="(min-width: 768px) 313px, 100vw"
            quality={90}
            className="object-cover"
          />
        </GrowReveal>

        <Reveal
          delay={0.05}
          className="flex w-full flex-col gap-16 font-serif font-light leading-[1.1] tracking-[-0.02em] text-brand-black [font-size:clamp(1.75rem,4.3vw,3.875rem)] md:w-[66.16%]"
        >
          <p>
            Since its inception in the 1990&rsquo;s, Hassan Allam Properties
            [HAP] has carved an enviable niche for itself as an exclusive
            boutique developer, building intimate communities where families
            always come first.
          </p>
          <p>
            Originating as a trusted family-run business passed down through
            three generations, HAP draws on decades of development expertise
            to master the equation of private luxury and inviting
            hospitality — going beyond just building homes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
