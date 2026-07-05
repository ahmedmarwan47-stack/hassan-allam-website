import Image from "next/image";
import GrowReveal from "@/components/GrowReveal";

/**
 * A two-image row matching the Figma 423/869 split (20px gutter) with equal
 * 541-height images. The first grows open in height, the second in width —
 * the site-wide GrowReveal entrance.
 */
export default function GrowImagePair({
  narrow,
  wide,
}: {
  narrow: string;
  wide: string;
}) {
  // 541/1312 of the content width keeps the Figma height at every viewport.
  const pairHeight = "md:h-[calc((100vw-128px)*0.4124)] md:max-h-[541px]";

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-stretch md:justify-between md:gap-0">
      <GrowReveal
        axis="height"
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-[2px] md:aspect-auto md:w-[32.24%] ${pairHeight}`}
      >
        <Image
          src={narrow}
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
        className={`relative aspect-[4/3] w-full overflow-hidden rounded-[2px] md:aspect-auto md:w-[66.16%] ${pairHeight}`}
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
  );
}
