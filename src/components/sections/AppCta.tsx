import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import GrowReveal from "@/components/GrowReveal";

const KEY_BENEFITS = [
  "Effortlessly explore your community",
  "Instantly request home services with ease",
  "Pay your utility bills anytime, anywhere",
];

function StoreBadges() {
  return (
    <div className="flex items-center gap-[11px]">
      <a
        href="#"
        className="flex h-[47px] items-center gap-2 bg-white px-4 transition-opacity duration-300 hover:opacity-80"
      >
        <svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.94 11.66C14.96 9.94 15.84 8.33 17.28 7.38C16.36 6.08 14.88 5.26 13.32 5.18C11.68 5.01 10.09 6.15 9.25 6.15C8.4 6.15 7.09 5.2 5.71 5.23C3.88 5.29 2.22 6.31 1.34 7.9C-0.52 11.16 0.87 16.01 2.64 18.65C3.53 19.95 4.57 21.39 5.94 21.34C7.29 21.28 7.8 20.47 9.42 20.47C11.03 20.47 11.51 21.34 12.92 21.31C14.37 21.28 15.27 19.99 16.13 18.68C16.78 17.75 17.27 16.72 17.6 15.63C15.87 14.9 14.94 13.32 14.94 11.66Z" fill="black"/>
          <path d="M12.27 3.52C13.04 2.59 13.42 1.41 13.35 0.21C12.18 0.33 11.1 0.89 10.32 1.78C9.56 2.65 9.16 3.79 9.22 4.95C10.39 4.96 11.5 4.44 12.27 3.52Z" fill="black"/>
        </svg>
        <div className="flex flex-col">
          <span className="font-sans text-[8px] font-medium leading-none text-black">Download on the</span>
          <span className="font-sans text-[16px] font-semibold leading-tight text-black">App Store</span>
        </div>
      </a>
      <a
        href="#"
        className="flex h-[47px] items-center gap-2 bg-white px-4 transition-opacity duration-300 hover:opacity-80"
      >
        <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.22 0.447L11.35 5.92L8.53 8.87L0.57 0.657C0.73 0.477 0.96 0.417 1.22 0.447Z" fill="#00C853"/>
          <path d="M0.12 1.14C0.04 1.38 0 1.65 0 1.95V20.05C0 20.35 0.04 20.62 0.12 20.86L8.01 12.97L0.12 1.14Z" fill="#2196F3"/>
          <path d="M1.22 21.55C0.96 21.58 0.73 21.52 0.57 21.34L8.53 13.13L11.35 16.08L1.22 21.55Z" fill="#F44336"/>
          <path d="M18.4 10.04L14.73 7.97L11.62 11L14.73 14.03L18.4 11.96C19.12 11.56 19.12 10.44 18.4 10.04Z" fill="#FFC107"/>
        </svg>
        <div className="flex flex-col">
          <span className="font-sans text-[8px] font-medium uppercase leading-none tracking-wider text-black">Get it on</span>
          <span className="font-sans text-[16px] font-semibold leading-tight text-black">Google Play</span>
        </div>
      </a>
    </div>
  );
}

function KeyBenefits() {
  return (
    <div className="flex w-full flex-col gap-5">
      <p className="font-sans text-[1.25rem] font-medium uppercase leading-[1.1] text-brand-black">
        Key Benefits
      </p>
      <div className="h-px w-full bg-black/10" />
      {KEY_BENEFITS.map((benefit) => (
        <div key={benefit} className="flex flex-col gap-5">
          <p className="font-sans text-[1.25rem] font-medium leading-[1.1] text-brand-black">
            {benefit}
          </p>
          <div className="h-px w-full bg-black/10" />
        </div>
      ))}
    </div>
  );
}

export default function AppCta() {
  return (
    <section id="app" data-nav-theme="light" className="relative bg-warm-50">
      {/* ── Mobile layout: all text stacked on warm-50, phone mockup LAST so it
           never sits under the copy. The photo's white drapery blends into the
           warm-50 background above it. ── */}
      <div className="md:hidden">
        <div className="flex flex-col gap-8 px-6 pb-10 pt-16">
          <Reveal>
            <h2 className="font-serif text-[2.5rem] font-light uppercase leading-[1.1] tracking-[-0.02em] text-brand-black">
              Manage your home anytime with HAP Family App
            </h2>
          </Reveal>
          <StoreBadges />
          <Reveal delay={0.1}>
            <p className="font-serif text-[1.375rem] font-medium capitalize leading-[1.2] tracking-[-0.02em] text-brand-black">
              <span>HAP Family App </span>
              <strong className="font-bold">enables homeowners</strong>
              <span> to seamlessly manage their properties from their phones.</span>
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <KeyBenefits />
          </Reveal>
        </div>
        <GrowReveal axis="height" className="relative h-[600px] w-full overflow-hidden">
          <Image
            src="/images/app-bg.webp"
            alt="Hand holding phone with the HAP Family App"
            fill
            className="object-cover"
            style={{ objectPosition: "53% 58%" }}
            sizes="100vw"
          />
        </GrowReveal>
      </div>

      {/* ── Desktop layout: viewport-ratio composition ── */}
      <div className="relative hidden aspect-[1440/1632] overflow-hidden md:block">
        {/* Background image */}
        <GrowReveal axis="width" className="absolute inset-0">
          <Image
            src="/images/app-bg.webp"
            alt="Hand holding phone with HAP Family App"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </GrowReveal>

        {/* Heading + badges — right side */}
        <Reveal
          className="absolute flex flex-col items-start gap-[38px]"
          style={{ left: "50.7%", top: "17.95%", width: "35.35%" }}
        >
          <h2 className="font-serif font-light uppercase leading-[1.1] tracking-[-0.02em] text-brand-black [font-size:clamp(2rem,4.3vw,3.875rem)]">
            Manage your home anytime with HAP Family App
          </h2>
          <StoreBadges />
        </Reveal>

        {/* Description — left side */}
        <Reveal
          delay={0.1}
          className="absolute"
          style={{ left: "4.44%", top: "38.73%", width: "27.85%" }}
        >
          <p className="font-serif text-[1.625rem] font-medium capitalize leading-[1.2] tracking-[-0.02em] text-brand-black">
            <span>HAP Family App </span>
            <strong className="font-bold">enables homeowners</strong>
            <span> to seamlessly manage their properties from their phones.</span>
          </p>
        </Reveal>

        {/* Key benefits — bottom left */}
        <Reveal
          delay={0.15}
          className="absolute"
          style={{ left: "4.44%", top: "79.23%", width: "30.9%" }}
        >
          <KeyBenefits />
        </Reveal>
      </div>
    </section>
  );
}
