import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export default function ResaleCta({
  heading,
  paragraph,
  buttonLabel,
}: {
  heading: string;
  paragraph: string;
  buttonLabel: string;
}) {
  return (
    <section
      data-nav-theme="dark"
      className="relative isolate flex min-h-[600px] items-center justify-center overflow-hidden md:min-h-[958px]"
    >
      <Image
        src="/images/section-bg.webp"
        alt=""
        fill
        className="-z-10 object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-black/50" />

      <Reveal className="flex w-full max-w-[718px] flex-col items-center gap-10 px-6 text-center text-white md:gap-14">
        <h2 className="font-serif uppercase leading-none tracking-[-0.02em] [font-size:clamp(2rem,6vw,3.875rem)]">
          {heading}
        </h2>
        <p className="max-w-[546px] font-sans text-lg leading-[1.1] text-white/90 md:text-xl">
          {paragraph}
        </p>
        <Link
          href="/contact"
          className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden border border-white px-8 py-4 font-serif text-lg uppercase tracking-[0.02em] text-white transition-colors duration-500 hover:text-black md:w-auto md:text-2xl"
        >
          {/* Premium sweep — white fill glides up from the bottom edge. */}
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0"
          />
          <span className="relative z-10">{buttonLabel}</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
            <path
              d="M3 11L11 3M11 3H4M11 3V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </Reveal>
    </section>
  );
}
