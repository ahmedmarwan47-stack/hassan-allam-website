import { Reveal } from "@/components/Reveal";

export default function PortfolioStatement() {
  return (
    <section
      id="portfolio-statement"
      data-nav-theme="dark"
      className="flex min-h-screen items-center justify-center bg-brand-black px-6 py-24 text-brand-white md:py-16"
    >
      <div className="flex flex-col items-center gap-16 text-center md:gap-28 lg:gap-32">
        <Reveal>
          <h2 className="max-w-[800px] font-serif font-light uppercase leading-none tracking-[-0.02em] [font-size:clamp(3rem,6.4vw,5.75rem)]">
            Nationwide Portfolio of Developments
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="max-w-[465px] font-serif font-light uppercase leading-[1.2] tracking-[-0.02em] [font-size:clamp(0.9rem,1.5vw,1.375rem)]">
            Hassan Allam Properties offers an exceptional portfolio of 11
            projects located in strategic locations, both in the heart of
            dynamic urban centers and along the coastline.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
