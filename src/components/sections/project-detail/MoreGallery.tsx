import Image from "@/components/ProgressiveImage";
import GrowReveal from "@/components/GrowReveal";
import ImageShowcase from "./ImageShowcase";
import GrowImagePair from "./GrowImagePair";

/**
 * The live gallery's remaining photos, after the story: three use the same
 * showcase as the first gallery block, two a pair, one a full-width photo.
 */
export default function MoreGallery({ images }: { images: string[] }) {
  if (images.length >= 3) return <ImageShowcase full={images[0]} half={images[1]} wide={images[2]} />;
  return (
    <section data-nav-theme="light" className="bg-brand-white px-6 py-16 md:px-16">
      {images.length === 2 ? (
        <GrowImagePair narrow={images[0]} wide={images[1]} />
      ) : (
        <GrowReveal axis="width" className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] md:aspect-[1312/820]">
          <Image src={images[0]} alt="" fill sizes="100vw" quality={90} className="object-cover" />
        </GrowReveal>
      )}
    </section>
  );
}
