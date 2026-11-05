import ParallaxImage from "@/components/ParallaxImage";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";
import SectionEyebrow from "@/components/SectionEyebrow";
import { LIVE_STORY } from "@/data/hapLive";

/**
 * Story overview — laid out as on hap.com.eg/the-story: one small square
 * photo on the left, level with the middle of the two big serif statements
 * on the right. Copy and photo from the live site (src/data/hapLive.ts).
 */
export default function StoryIntro({ id }: { id?: string }) {
  const image = LIVE_STORY.introImage ?? "/images/image 398.jpg";
  return (
    <section
      id={id}
      data-nav-theme="light"
      className="relative flex flex-col gap-16 bg-brand-white px-6 py-16 text-brand-black md:gap-20 md:px-16 md:py-24"
    >
      {/* Starts where the statements start (the 868/1312 text column). */}
      <SectionEyebrow className="md:ml-auto md:w-[66.16%]">Overview</SectionEyebrow>

      <div className="flex flex-col items-start gap-10 md:flex-row md:items-center md:justify-between md:gap-0">
        <div className="w-[62%] shrink-0 md:w-[26.5%]">
          <GrowReveal axis="height" className="relative aspect-square w-full overflow-hidden rounded-[2px] bg-grey-100">
            <ParallaxImage
              src={image}
              alt="Hassan Allam Properties — our story"
              sizes="(min-width: 768px) 27vw, 62vw"
              quality={90}
              strength={10}
            />
          </GrowReveal>
        </div>

        <div className="flex w-full flex-col gap-10 font-serif font-light leading-[1.1] tracking-[-0.02em] text-brand-black [font-size:clamp(1.5rem,4.3vw,3.875rem)] md:w-[66.16%] md:gap-14">
          {LIVE_STORY.intro.map((text, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
