import Image from "@/components/ProgressiveImage";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import RollText from "@/components/RollText";

export default function ProjectsCta() {
  return (
    <section
      id="projects-cta"
      data-nav-theme="dark"
      className="relative isolate flex min-h-[600px] items-center justify-center overflow-hidden md:min-h-[958px]"
    >
      <Image
        src="/images/section-bg.jpg"
        alt=""
        fill
        priority={false}
        className="-z-10 object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-black/55" />

      <div className="flex w-full max-w-[718px] flex-col items-center px-6 text-center text-white">
        <Reveal>
          <h2 className="font-serif text-[3rem] font-normal uppercase leading-none tracking-[-0.02em] md:text-[3.875rem]">
            Want to work<br />with us?
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 max-w-[546px] font-sans text-base leading-[1.1] text-white/90 md:text-xl md:mt-10">
            Hassan Allam Properties offers an exceptional portfolio of 11 projects
            located in strategic locations, both in the heart of dynamic urban
            centers and along the coastline.
          </p>
        </Reveal>
        <Link
          href="/contact"
          className="group relative mt-10 inline-flex w-full items-center justify-center gap-3 overflow-hidden border border-white px-8 py-4 font-serif text-lg uppercase tracking-[0.02em] text-white transition-colors duration-500 hover:text-black md:mt-14 md:w-auto md:text-2xl"
        >
          {/* Premium sweep — white fill glides up from the bottom edge. */}
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0"
          />
          <RollText className="relative z-10">Let&apos;s work together</RollText>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1">
            <path
              d="M3 11L11 3M11 3H4M11 3V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
