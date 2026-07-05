import Image from "next/image";
import GrowReveal from "@/components/GrowReveal";

export default function ImageShowcase({
  full,
  half,
  wide,
}: {
  full: string;
  half: string;
  wide: string;
}) {
  return (
    <section
      data-nav-theme="light"
      className="flex flex-col gap-5 bg-brand-white px-6 py-16 md:px-16 md:py-16"
    >
      <GrowReveal
        axis="width"
        className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] md:aspect-[1312/820]"
      >
        <Image src={full} alt="" fill sizes="100vw" quality={90} className="object-cover" />
      </GrowReveal>
      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-0">
        <GrowReveal
          axis="height"
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] md:aspect-[424/540] md:w-[32.24%]"
        >
          <Image
            src={half}
            alt=""
            fill
            sizes="(min-width: 768px) 32vw, 100vw"
            quality={90}
            className="object-cover"
          />
        </GrowReveal>
        <GrowReveal
          axis="width"
          delay={0.12}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] md:aspect-[868/1030] md:w-[66.16%]"
        >
          <Image
            src={wide}
            alt=""
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            quality={90}
            className="object-cover"
          />
        </GrowReveal>
      </div>
    </section>
  );
}
