import Image from "next/image";
import Link from "next/link";

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

      <div className="flex w-full max-w-[441px] flex-col items-center px-6 text-center text-white">
        <h2 className="font-serif text-[3rem] font-light uppercase leading-[1.05] tracking-[-0.02em] md:text-[5rem]">
          Want to work with us?
        </h2>
        <p className="mt-8 max-w-[420px] font-sans text-base font-medium leading-[1.4] text-white/90 md:mt-10">
          Hassan Allam Properties offers an exceptional portfolio of 11 projects
          located in strategic locations, both in the heart of dynamic urban
          centers and along the coastline.
        </p>
        <Link
          href="/contact"
          className="group relative mt-10 inline-flex w-full items-center justify-center gap-3 overflow-hidden border border-white px-8 py-4 font-serif text-lg uppercase tracking-[0.02em] text-white transition-colors duration-500 hover:text-black md:mt-14 md:w-auto md:text-2xl"
        >
          {/* Premium sweep — white fill glides up from the bottom edge. */}
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full bg-white transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0"
          />
          <span className="relative z-10">Let&apos;s work together</span>
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
