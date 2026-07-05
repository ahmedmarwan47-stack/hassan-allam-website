"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

type FaqItem = { question: string; answer: string };
type FaqGroup = { title: string; items: FaqItem[] };

const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "General",
    items: [
      {
        question: "What types of properties does Hassan Allam Properties offer?",
        answer:
          "Our portfolio spans residential communities, office spaces, retail, hospitality & leisure and sports & wellness — 30+ developments across 10 governorates. Residential offerings range from apartments and townhouses to standalone villas, both in the city and by the sea.",
      },
      {
        question: "Where are HAP projects located?",
        answer:
          "Our communities are split between two collections: In The City — New Cairo, Mostakbal City and West Cairo — and By The Sea, with destinations on the North Coast, El Gouna and the Red Sea. Explore them all on the interactive map on our Projects page.",
      },
      {
        question: "How is Hassan Allam Properties related to Hassan Allam Holding?",
        answer:
          "Hassan Allam Properties is the boutique real-estate arm of Hassan Allam Holding, one of Egypt's oldest engineering and construction groups, with roots reaching back to 1936. Three generations of building expertise stand behind every community we deliver.",
      },
    ],
  },
  {
    title: "Buying & Payment",
    items: [
      {
        question: "How do I reserve a unit?",
        answer:
          "Get in touch through the Contact page, call us on 19172, or visit our head office on Road 90, New Cairo. Our property consultants will walk you through availability, floor plans and pricing, and a unit can be reserved with a down payment.",
      },
      {
        question: "What payment plans are available?",
        answer:
          "We offer flexible installment plans that vary by project and unit type, typically spanning several years with a down payment. Your consultant will tailor a schedule to your budget during the reservation process.",
      },
      {
        question: "Can I buy a HAP property while living abroad?",
        answer:
          "Yes. Many of our homeowners are Egyptians living abroad and international buyers. Reservations, contracts and payments can all be arranged remotely, and our team will guide you through every step.",
      },
    ],
  },
  {
    title: "Handover & Living",
    items: [
      {
        question: "When will my unit be delivered?",
        answer:
          "Delivery dates are specific to each project and phase and are stated clearly in your contract. Your consultant and our customer-care team will keep you updated on construction milestones until handover day.",
      },
      {
        question: "What is the HAP Family App?",
        answer:
          "The HAP Family App lets homeowners manage their property from their phone — explore the community, request home services and pay utility bills anytime, anywhere. It's available on the App Store and Google Play.",
      },
      {
        question: "Does HAP help with resales?",
        answer:
          "Yes — our resale experts can help you list, value and sell your HAP property, or find a resale unit in a sold-out community. Reach out through the Contact page and a resale specialist will get back to you.",
      },
    ],
  },
];

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
        {/* Plus rotates to × when open — same affordance as the team cards. */}
        <span
          className={`mt-1 flex size-[42px] shrink-0 items-center justify-center border border-brand-black/15 text-brand-black transition-transform duration-300 ease-out md:mt-0 ${
            open ? "rotate-45" : ""
          }`}
          aria-hidden
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
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

export default function FaqsList() {
  return (
    <section
      data-nav-theme="light"
      className="bg-brand-white px-6 pb-16 pt-28 text-brand-black md:px-16 md:pb-24 md:pt-36"
    >
      <Reveal>
        <h1 className="text-center font-serif font-light uppercase leading-none tracking-[-0.02em] text-brand-black [font-size:clamp(3rem,12.5vw,11.25rem)]">
          FAQs
        </h1>
      </Reveal>
      <Reveal delay={0.12}>
        <p className="mx-auto mt-8 max-w-[543px] text-center font-serif font-light uppercase leading-[1.2] tracking-[-0.02em] [font-size:clamp(0.875rem,1.5vw,1.375rem)]">
          Everything you need to know about finding, buying and living in a
          Hassan Allam Properties community.
        </p>
      </Reveal>

      <div className="mx-auto mt-16 flex max-w-[868px] flex-col gap-16 md:mt-24 md:gap-20">
        {FAQ_GROUPS.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <Reveal>
              <h2 className="pb-4 font-sans text-sm font-medium uppercase tracking-[0.08em] text-grey-500">
                {group.title}
              </h2>
            </Reveal>
            <div className="flex flex-col border-t border-brand-black/10">
              {group.items.map((item, i) => (
                <FaqRow key={item.question} item={item} delay={i * 0.06} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
