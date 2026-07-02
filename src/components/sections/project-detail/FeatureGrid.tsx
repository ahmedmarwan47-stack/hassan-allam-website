import { Reveal } from "@/components/Reveal";
import { FeatureIcon } from "./icons";
import type { FeatureItem } from "@/data/projectDetail";

export default function FeatureGrid({
  heading,
  items,
}: {
  heading: string[];
  items: FeatureItem[];
}) {
  return (
    <div className="flex w-full flex-col items-start gap-10 md:ml-auto md:max-w-[867px] md:gap-10">
      <Reveal>
        <h2 className="max-w-[606px] font-sans font-medium leading-none text-brand-black [font-size:clamp(1.75rem,4vw,3rem)]">
          {heading.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>
      </Reveal>
      <div className="grid w-full grid-cols-1 gap-x-[70px] gap-y-0 sm:grid-cols-2">
        {items.map((item, i) => (
          <Reveal
            key={item.title}
            delay={(i % 2) * 0.05}
            className="flex gap-6 border-t border-brand-black/10 px-2 py-10 md:gap-[60px]"
          >
            <FeatureIcon name={item.icon} />
            <div className="flex flex-col gap-3 text-brand-black">
              <p className="font-serif font-light uppercase leading-none tracking-[-0.02em] text-2xl">
                {item.title}
              </p>
              <p className="font-sans text-base leading-[1.4]">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
