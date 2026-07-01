import Image from "next/image";
import GrowReveal from "@/components/GrowReveal";

export default function ProjectStory({
  images,
  heading,
  paragraphs,
}: {
  images: [string, string];
  heading: string;
  paragraphs: string[];
}) {
  return (
    <section
      data-nav-theme="light"
      className="flex flex-col gap-10 bg-brand-white px-6 py-16 text-brand-black md:gap-14 md:px-16 md:py-16"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center">
        <GrowReveal
          axis="height"
          className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-[2px] md:aspect-[646/812]"
        >
          <Image
            src={images[0]}
            alt=""
            fill
            sizes="(min-width: 768px) 46vw, 100vw"
            quality={90}
            className="object-cover"
          />
        </GrowReveal>
        <GrowReveal
          axis="width"
          delay={0.12}
          className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-[2px] md:aspect-[646/812]"
        >
          <Image
            src={images[1]}
            alt=""
            fill
            sizes="(min-width: 768px) 46vw, 100vw"
            quality={90}
            className="object-cover"
          />
        </GrowReveal>
      </div>

      {/* Text row — body column starts at the half-grid point (x=666 of 1312,
          Figma Frame 1131). */}
      <div className="flex flex-col gap-8 md:flex-row">
        <p className="font-serif font-light leading-[1.1] tracking-[-0.02em] text-brand-black [font-size:clamp(1.75rem,4.3vw,3.875rem)] md:w-[50.76%] md:max-w-none">
          <span className="block max-w-[400px]">{heading}</span>
        </p>
        <div className="flex max-w-[445px] flex-1 flex-col gap-4 font-sans text-base leading-[1.4] text-brand-black">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
