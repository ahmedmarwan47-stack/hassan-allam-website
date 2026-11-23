"use client";

import { useState } from "react";
import Image from "@/components/ProgressiveImage";
import GrowReveal from "@/components/GrowReveal";
import { useT } from "@/i18n/LocaleProvider";

/**
 * The project's fly-through film from hap.com.eg. It rests as a still with a
 * play button and only loads the video when clicked (the files are large),
 * then plays with sound and the browser's own controls.
 */
export default function ProjectVideo({ id, src, poster }: { id?: string; src: string; poster: string }) {
  const t = useT();
  const [playing, setPlaying] = useState(false);
  // Top padding only: the gallery below brings its own, so the gap between
  // the two stays single.
  return (
    <section id={id} data-nav-theme="light" className="bg-brand-white px-6 pt-16 md:px-16">
      <GrowReveal axis="width" className="relative aspect-video w-full overflow-hidden rounded-[2px] bg-brand-black">
        {playing ? (
          <video src={src} controls autoPlay playsInline className="absolute inset-0 size-full object-contain" />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={t("Play the fly-through video")}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-white"
          >
            <Image src={poster} alt="" fill sizes="100vw" quality={85} className="object-cover" />
            <span aria-hidden className="absolute inset-0 bg-black/35 transition-colors duration-500 group-hover:bg-black/25" />
            <span className="relative flex size-16 items-center justify-center rounded-full bg-white text-brand-black transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110 md:size-20">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden className="ms-1">
                <path d="M5 3.5v13l11-6.5z" />
              </svg>
            </span>
            <span className="relative font-sans text-sm font-medium uppercase leading-5 tracking-[0.12em]">
              {t("Watch the fly-through")}
            </span>
          </button>
        )}
      </GrowReveal>
    </section>
  );
}
