import { Reveal } from "@/components/Reveal";
import RiseWords from "@/components/RiseWords";

/**
 * "Our Legacy" — the three-generations statement from hap.com.eg/the-story.
 * On entering the section the statement rises into place word by word, each
 * from behind its own line mask, in one smooth eased wave; the supporting
 * paragraph follows on the shared right-hand text column. The pair sits
 * centred in a screen-tall black section.
 */
const STATEMENT =
  "For three generations, the Hassan Allam Properties family has nurtured a proud legacy of shaping exclusive communities where families come together to celebrate life’s most meaningful moments, from lasting unions to new beginnings.";

export default function LegacySection({ id }: { id?: string }) {
  return (
    <section
      id={id}
      data-nav-theme="dark"
      className="flex scroll-mt-0 flex-col gap-12 bg-brand-black px-6 py-16 text-brand-white md:min-h-[calc(100svh-var(--nav-h,80px))] md:justify-center md:gap-14 md:px-16 md:py-20"
    >
      <h2 className="text-left font-serif font-light uppercase leading-[1.08] tracking-[-0.01em] [font-size:clamp(1.5rem,3.7vw,4.25rem)]">
        <RiseWords text={STATEMENT} delay={100} stagger={30} duration={1300} />
      </h2>

      <Reveal delay={0.5} className="md:ml-auto md:w-[41.35%]">
        <p className="font-sans text-base leading-[1.6] text-white/80 md:text-lg">
          Our communities are thoughtfully built in prime locations, bringing
          together like-minded neighbors who naturally grow into lifelong
          friends. These meaningful connections and effortless lifestyles add
          lasting value, not just to the homes, but to daily life itself.
          Welcome to Hassan Allam Properties&rsquo; circle of trust, where
          charm, harmony, and a sense of belonging shape everyday living.
        </p>
      </Reveal>
    </section>
  );
}
