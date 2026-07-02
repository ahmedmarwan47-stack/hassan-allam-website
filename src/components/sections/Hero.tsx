"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { withBasePath } from "@/lib/basePath";

/**
 * Hero — Figma node 16988-1082 ("videocutHAP3 1").
 * Full-bleed autoplay video background. Navbar above sits in its on-dark
 * (white) state because the footage is dark/colourful, so the section is
 * tagged data-nav-theme="dark".
 *
 * Drop the brand reel at `public/videos/hero.mp4` (and an optional `.webm`)
 * to replace the still poster fallback.
 */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);

  // Mobile browsers (esp. iOS Safari) block autoplay unless `muted` is set as a
  // *property* — React only sets the attribute — and they often need an explicit
  // play() call. Force both, and retry once the first frame is decoded.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const tryPlay = () => {
      video.play().catch(() => {});
    };
    tryPlay();
    video.addEventListener("loadeddata", tryPlay);
    return () => video.removeEventListener("loadeddata", tryPlay);
  }, []);

  return (
    <section
      id="top"
      data-nav-theme="dark"
      className="relative h-screen min-h-[680px] w-full overflow-hidden bg-black text-white"
    >
      {/* Video background. Autoplays muted + inline so mobile browsers allow it.
          If the file isn't there yet, the poster image stays visible. */}
      <video
        ref={videoRef}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${canPlay ? "opacity-100" : "opacity-0"}`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={withBasePath("/images/residential.jpg")}
        onCanPlay={() => setCanPlay(true)}
        aria-hidden
      >
        <source src={withBasePath("/videos/videocutHAP3.mp4")} type="video/mp4" />
      </video>

      {/* Poster fallback — shown until the video starts (or if it's missing). */}
      <Image
        src="/images/residential.jpg"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className={`absolute inset-0 object-cover transition-opacity duration-700 ${canPlay ? "opacity-0" : "opacity-100"}`}
      />

      {/* Subtle bottom scrim so the headline + showreel link stay legible. */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/45"
      />

      {/* Bottom row — matches Figma 16988:1094. The "See the Showreel" link was
          removed because the hero footage already autoplays. */}
      <div className="relative z-10 flex h-full w-full flex-col">
        <div className="mt-auto flex w-full flex-col items-start px-6 pb-12 md:px-12 md:pb-16 lg:px-16">
          <Reveal>
            <h1 className="max-w-[20ch] font-serif text-[clamp(2rem,3.5vw,2.625rem)] font-normal uppercase leading-none tracking-[-0.02em] text-white">
              From Our
              <br />
              Family, to Yours.
            </h1>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
