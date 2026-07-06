"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

type FaqItem = { question: string; answer: string; category: Category };
type Category = "General" | "Buying & Payment" | "Handover & Living";

const CATEGORIES: Category[] = ["General", "Buying & Payment", "Handover & Living"];

const FAQS: FaqItem[] = [
  {
    category: "General",
    question: "What types of properties does Hassan Allam Properties offer?",
    answer:
      "Our portfolio spans residential communities, office spaces, retail, hospitality & leisure and sports & wellness — 30+ developments across 10 governorates. Residential offerings range from apartments and townhouses to standalone villas, both in the city and by the sea.",
  },
  {
    category: "General",
    question: "Where are HAP projects located?",
    answer:
      "Our communities are split between two collections: In The City — New Cairo, Mostakbal City and West Cairo — and By The Sea, with destinations on the North Coast, El Gouna and the Red Sea. Explore them all on the interactive map on our Projects page.",
  },
  {
    category: "General",
    question: "How is Hassan Allam Properties related to Hassan Allam Holding?",
    answer:
      "Hassan Allam Properties is the boutique real-estate arm of Hassan Allam Holding, one of Egypt's oldest engineering and construction groups, with roots reaching back to 1936. Three generations of building expertise stand behind every community we deliver.",
  },
  {
    category: "Buying & Payment",
    question: "How do I reserve a unit?",
    answer:
      "Get in touch through the Contact page, call us on 19172, or visit our head office on Road 90, New Cairo. Our property consultants will walk you through availability, floor plans and pricing, and a unit can be reserved with a down payment.",
  },
  {
    category: "Buying & Payment",
    question: "What payment plans are available?",
    answer:
      "We offer flexible installment plans that vary by project and unit type, typically spanning several years with a down payment. Your consultant will tailor a schedule to your budget during the reservation process.",
  },
  {
    category: "Buying & Payment",
    question: "Can I buy a HAP property while living abroad?",
    answer:
      "Yes. Many of our homeowners are Egyptians living abroad and international buyers. Reservations, contracts and payments can all be arranged remotely, and our team will guide you through every step.",
  },
  {
    category: "Handover & Living",
    question: "When will my unit be delivered?",
    answer:
      "Delivery dates are specific to each project and phase and are stated clearly in your contract. Your consultant and our customer-care team will keep you updated on construction milestones until handover day.",
  },
  {
    category: "Handover & Living",
    question: "What is the HAP Family App?",
    answer:
      "The HAP Family App lets homeowners manage their property from their phone — explore the community, request home services and pay utility bills anytime, anywhere. It's available on the App Store and Google Play.",
  },
  {
    category: "Handover & Living",
    question: "Does HAP help with resales?",
    answer:
      "Yes — our resale experts can help you list, value and sell your HAP property, or find a resale unit in a sold-out community. Reach out through the Contact page and a resale specialist will get back to you.",
  },
];

type FilterValue = "all" | Category;

/**
 * Plus / minus icon for the accordion. Crossfades the two paths and rotates
 * both during the transition — so opening spins the icon and settles on a
 * minus, closing spins back and settles on a plus.
 */
function AccordionIcon({ open }: { open: boolean }) {
  return (
    <div className="relative size-5">
      {/* Plus — visible when closed */}
      <svg
        aria-hidden
        className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-out ${
          open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
        }`}
        viewBox="0 0 20 20"
        fill="none"
      >
        <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {/* Minus — visible when open */}
      <svg
        aria-hidden
        className={`absolute inset-0 transition-[opacity,transform] duration-300 ease-out ${
          open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
        }`}
        viewBox="0 0 20 20"
        fill="none"
      >
        <path d="M3 10h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
}

function FaqRow({ item, delay }: { item: FaqItem; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <Reveal delay={delay} y={16} className="border-b border-brand-black/10">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-6 py-6 text-left md:items-center md:py-7"
      >
        <span className="font-serif text-xl font-medium leading-[1.2] tracking-[-0.01em] text-brand-black md:text-[1.75rem]">
          {item.question}
        </span>
        {/* Container flips to dark when the row is open; icon crossfades
            plus ↔ minus. Container itself never rotates. */}
        <span
          className={`mt-1 flex size-[42px] shrink-0 items-center justify-center border transition-[background-color,border-color,color] duration-300 ease-out md:mt-0 ${
            open
              ? "border-brand-black bg-brand-black text-brand-white"
              : "border-brand-black/15 bg-transparent text-brand-black"
          }`}
        >
          <AccordionIcon open={open} />
        </span>
      </button>
      <div
        className={`grid transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "grid-rows-[1fr] pb-7 opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-[720px] font-sans text-base leading-[1.5] text-brand-black/80">
            {item.answer}
          </p>
        </div>
      </div>
    </Reveal>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  // Secondary buttons — the site's default: white background, thin border,
  // brand-black hover; when active they invert to black/white. Same shape
  // vocabulary as the SLR tag pill in ProjectIntro.
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`h-[46px] shrink-0 whitespace-nowrap rounded-[2px] border px-5 font-sans text-sm font-medium transition-[background-color,border-color,color] duration-300 ease-out md:h-[54px] md:px-6 md:text-base ${
        active
          ? "border-brand-black bg-brand-black text-brand-white"
          : "border-brand-black/20 bg-transparent text-brand-black hover:border-brand-black"
      }`}
    >
      {label}
    </button>
  );
}

export default function FaqsList() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const visible = filter === "all" ? FAQS : FAQS.filter((f) => f.category === filter);

  return (
    <section
      data-nav-theme="light"
      className="bg-brand-white px-6 pb-16 pt-16 text-brand-black md:px-16 md:pb-24 md:pt-20"
    >
      <div className="mx-auto flex max-w-[868px] flex-col gap-10 md:gap-14">
        {/* Filter bar — horizontally scrollable on mobile so all pills fit. */}
        <Reveal>
          <div className="flex gap-3 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:gap-4 md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none]">
            <FilterButton label="All FAQs" active={filter === "all"} onClick={() => setFilter("all")} />
            {CATEGORIES.map((cat) => (
              <FilterButton
                key={cat}
                label={cat}
                active={filter === cat}
                onClick={() => setFilter(cat)}
              />
            ))}
          </div>
        </Reveal>

        {/* Flat list — keyed on the filter so the stagger replays when
            switching filters, and the border-top redraws cleanly. */}
        <div key={filter} className="flex flex-col border-t border-brand-black/10">
          {visible.map((item, i) => (
            <FaqRow key={item.question} item={item} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
