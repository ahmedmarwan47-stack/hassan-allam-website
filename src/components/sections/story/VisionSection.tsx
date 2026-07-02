import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";

export default function VisionSection() {
  return (
    <section
      data-nav-theme="dark"
      className="flex flex-col items-center gap-16 bg-brand-black px-6 py-16 text-brand-white md:gap-20 md:px-16 md:py-[180px]"
    >
      <Reveal className="flex max-w-[1144px] flex-col items-center gap-8 text-center md:gap-10">
        <p className="font-serif text-3xl leading-[1.1] tracking-[-0.02em] text-brand-white md:text-[3.875rem]">
          Driven by a community-centric vision and a passion for individuality
        </p>
        <p className="max-w-[644px] font-sans text-base leading-[1.4] text-brand-white/80">
          The company boasts a wide diversified portfolio of first-class
          residential communities and vacation homes catering to families in
          search of exclusive experiences and private seaside getaways
          throughout prime locations in Egypt.
        </p>
      </Reveal>

      <div className="flex w-full flex-col items-start gap-5 md:flex-row md:justify-between">
        <div className="flex w-full flex-col gap-5 md:w-[32%] md:justify-center">
          <GrowReveal
            axis="height"
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] md:aspect-auto md:h-[30vw] md:max-h-[520px]"
          >
            <Image
              src="/images/story-vision-1.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 32vw, 100vw"
              quality={90}
              className="object-cover"
            />
          </GrowReveal>
          <p className="max-w-[372px] font-sans text-base leading-[1.4] text-brand-white">
            First-class residential communities set across Egypt&apos;s most
            desirable addresses.
          </p>
        </div>
        <div className="flex w-full flex-1 flex-col gap-5">
          <GrowReveal
            axis="width"
            delay={0.12}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] md:aspect-auto md:h-[30vw] md:max-h-[520px]"
          >
            <Image
              src="/images/story-vision-2.webp"
              alt=""
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              quality={90}
              className="object-cover"
            />
          </GrowReveal>
          <p className="max-w-[424px] font-sans text-base leading-[1.4] text-brand-white">
            Vacation homes and seaside getaways built for exclusive,
            everyday living.
          </p>
        </div>
      </div>
    </section>
  );
}
