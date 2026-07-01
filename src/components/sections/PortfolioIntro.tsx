import Image from "next/image";

export default function PortfolioIntro() {
  return (
    <section
      id="portfolio"
      data-nav-theme="dark"
      className="relative overflow-hidden bg-black text-white"
    >
      <Image
        src="/images/retail.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-32 md:px-12 md:py-44 lg:px-16">
        <p className="font-sans text-sm font-medium uppercase tracking-[0.28em] text-white/55">
          Who we are
        </p>
        <h2 className="mt-6 max-w-[18ch] font-serif text-[clamp(2.5rem,5.6vw,4.75rem)] font-light uppercase leading-[0.98] tracking-tight">
          Nationwide portfolio of developments
        </h2>
        <p className="mt-8 max-w-[58ch] font-sans text-lg leading-relaxed text-white/70">
          From the New Administrative Capital to the North Coast, Hassan Allam
          Properties builds integrated communities that bring residential,
          commercial and leisure living together — engineered to endure and
          designed to feel like home.
        </p>

        <div className="mt-16 grid max-w-3xl grid-cols-2 gap-y-10 sm:grid-cols-3">
          {[
            { value: "1936", label: "Founded" },
            { value: "30+", label: "Active developments" },
            { value: "10", label: "Governorates" },
          ].map((item) => (
            <div key={item.label}>
              <p className="font-serif text-5xl font-light tracking-tight md:text-6xl">
                {item.value}
              </p>
              <p className="mt-2 font-sans text-sm uppercase tracking-[0.16em] text-white/55">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
