import FeatureGrid from "./FeatureGrid";
import type { FeatureItem } from "@/data/projectDetail";

export default function AmenitiesSection({
  id,
  heading,
  intro,
  items,
}: {
  id?: string;
  heading: string[];
  intro?: string;
  items: FeatureItem[];
}) {
  return (
    <section
      id={id}
      data-nav-theme="light"
      className="flex bg-brand-white px-6 py-16 text-brand-black md:px-16 md:py-16"
    >
      <FeatureGrid heading={heading} intro={intro} items={items} />
    </section>
  );
}
