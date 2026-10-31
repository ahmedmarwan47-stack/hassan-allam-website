import Image from "@/components/ProgressiveImage";
import ActionButton from "@/components/ActionButton";
import { Reveal } from "@/components/Reveal";

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
            Hassan Allam Properties offers an exceptional portfolio of 25 projects
            located in strategic locations, both in the heart of dynamic urban
            centers and along the coastline.
          </p>
        </Reveal>
        <ActionButton
          label="Let's work together"
          href="/contact"
          tone="light"
          variant="solid"
          className="mt-10 md:mt-14"
        />
      </div>
    </section>
  );
}
