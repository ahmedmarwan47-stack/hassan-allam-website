import Image from "next/image";
import GrowReveal from "@/components/GrowReveal";
import FeatureGrid from "./FeatureGrid";
import type { FeatureItem } from "@/data/projectDetail";

export default function ProductsSection({
  images,
  heading,
  items,
}: {
  images: { half: string; wide: string };
  heading: string;
  items: FeatureItem[];
}) {
  return (
    <section
      data-nav-theme="light"
      className="flex flex-col gap-10 bg-brand-white px-6 py-16 text-brand-black md:px-16 md:py-16"
    >
      {/* Figma Frame 1135: narrow image bottom-aligned against the tall one. */}
      <div className="flex flex-col gap-5 md:flex-row md:items-end">
        <GrowReveal
          axis="height"
          className="relative aspect-[4/3] w-full overflow-hidden rounded-[2px] md:aspect-[424/540] md:w-[32.24%]"
        >
          <Image
            src={images.half}
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
          className="relative aspect-[4/3] w-full flex-1 overflow-hidden rounded-[2px] md:aspect-[868/1030]"
        >
          <Image
            src={images.wide}
            alt=""
            fill
            sizes="(min-width: 768px) 60vw, 100vw"
            quality={90}
            className="object-cover"
          />
        </GrowReveal>
      </div>

      <FeatureGrid heading={[heading]} items={items} />
    </section>
  );
}
