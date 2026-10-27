"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/lib/basePath";
import { Reveal } from "@/components/Reveal";

/**
 * Full-screen showreel player — the background loop plays muted with no
 * controls, so this gives visitors the reel with sound. Esc or the close
 * button dismisses it; page scroll is locked while open.
 */
function ShowreelModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Showreel"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 md:p-16"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close showreel"
        className="absolute right-4 top-4 flex size-11 items-center justify-center text-white transition-opacity duration-300 hover:opacity-70 md:right-8 md:top-8"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </button>
      <video
        className="max-h-full w-full max-w-[1312px] bg-black"
        src={withBasePath("/videos/videocutHAP3.mp4")}
        autoPlay
        controls
        playsInline
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

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
  const [reelOpen, setReelOpen] = useState(false);

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

      {/* Bottom row — matches Figma 16988:1094: headline left, showreel
          trigger (17127:2139) right, both sitting on the same baseline. */}
      <div className="relative z-10 flex h-full w-full flex-col">
        <div className="mt-auto flex w-full flex-col items-start gap-6 px-6 pb-12 md:flex-row md:items-end md:justify-between md:px-12 md:pb-16 lg:px-16">
          <Reveal delay={0.3}>
            <h1 className="max-w-[20ch] font-serif text-[clamp(2rem,3.5vw,2.625rem)] font-normal uppercase leading-none tracking-[-0.02em] text-white">
              From Our
              <br />
              Family, to Yours.
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <button
              type="button"
              onClick={() => setReelOpen(true)}
              className="group flex items-center gap-2 font-sans text-base font-medium uppercase text-white"
            >
              <span className="flex size-[26px] items-center justify-center rounded-[2px] bg-white pl-px text-black transition-transform duration-300 ease-out group-hover:scale-110">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
                  <path d="M1.5 0.8v8.4L9 5 1.5 0.8Z" />
                </svg>
              </span>
              <span className="transition-opacity duration-300 group-hover:opacity-80">See the Showreel</span>
            </button>
          </Reveal>
        </div>
      </div>

      {reelOpen && <ShowreelModal onClose={() => setReelOpen(false)} />}
    </section>
  );
}
