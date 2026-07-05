import { FactRow } from "@/components/sections/FactsFigures";
import { Reveal } from "@/components/Reveal";

// Reuses the homepage Facts & Figures hover/scroll photo-reveal effect.
const FACTS = [
  {
    label: "Developments &\nSub-Developments",
    value: "25",
    image: "/images/commercial-real-estate.jpg",
  },
  {
    label: "Land Plots Under\nDevelopment",
    value: "23",
    image: "/images/map/slw.jpg",
  },
  { label: "Employees", value: "320", image: "/images/story-hands.jpg" },
  {
    label: "Residential Units\nDelivered",
    value: "8,240",
    image: "/images/map/slg.jpg",
  },
  {
    label: "Governorates",
    value: "10",
    image: "/images/hospitality.jpg",
  },
];

export default function FactsList() {
  return (
    <section
      data-nav-theme="light"
      className="flex flex-col items-start gap-10 bg-brand-white px-6 py-20 text-brand-black md:items-center md:gap-[70px] md:px-16 md:py-24"
    >
      <Reveal className="w-full">
        <h2 className="w-full text-left font-serif font-light uppercase leading-none tracking-[-0.02em] text-brand-black [font-size:clamp(4rem,9.2vw,8.25rem)] md:text-center">
          Facts and Figures
        </h2>
      </Reveal>

      <div className="flex w-full flex-col">
        {FACTS.map((fact) => (
          <FactRow key={fact.label} {...fact} />
        ))}
        <div className="h-px w-full bg-grey-300" />
      </div>
    </section>
  );
}
