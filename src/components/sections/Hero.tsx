"use client";

import Image from "@/components/ProgressiveImage";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { withBasePath } from "@/lib/basePath";
import { Reveal } from "@/components/Reveal";
import RollText from "@/components/RollText";

/**
 * Full-screen showreel player — the background loop plays muted with no
 * controls, so this gives visitors the reel with sound. Esc or the close
 * button dismisses it; page scroll is locked while open.
 */
/**
 * Showreel overlay — rendered into <body> (so no ancestor transform can
 * confine it). The backdrop and the film fade in together while the film
 * scales up quickly into place; playback starts as it settles. Closing
 * reverses it. Escape or a click outside closes.
 */
const REEL_EASE = [0.76, 0, 0.24, 1] as const;

function ShowreelModal({ onClose }: { onClose: () => void }) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

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

  // Sound is allowed thanks to the click that opened the reel; if a browser
  // still refuses, play muted.
  const start = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      v.muted = true;
      v.play().catch(() => {});
    });
  }, []);

  // Start as the entrance settles (straight away under reduced motion).
  useEffect(() => {
    const t = setTimeout(start, reduce ? 0 : 250);
    return () => clearTimeout(t);
  }, [reduce, start]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Showreel"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-16"
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.3, ease: REEL_EASE, delay: reduce ? 0 : 0.05 } }}
      />
      <motion.button
        type="button"
        onClick={onClose}
        aria-label="Close showreel"
        className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center text-white transition-[opacity,transform] duration-300 hover:rotate-90 hover:opacity-70 md:right-8 md:top-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3, delay: reduce ? 0 : 0.25 } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
          <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </motion.button>
      <motion.div
        className="relative w-full max-w-[1312px] overflow-hidden bg-black"
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? false : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: reduce ? 0 : 0.3, ease: REEL_EASE } }}
      >
        <video
          ref={videoRef}
          className="block max-h-[calc(100svh-2rem)] w-full bg-black md:max-h-[calc(100svh-8rem)]"
          src={withBasePath("/videos/videocutHAP3.mp4")}
          controls
          playsInline
          preload="auto"
        />
      </motion.div>
    </motion.div>
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
  const [reelMounted, setReelMounted] = useState(false);
  // The 7 MB background film waits until the page has finished loading, so
  // it doesn't compete with the images; the poster shows until then.
  const [loadVideo, setLoadVideo] = useState(false);
  useEffect(() => {
    const go = () => setLoadVideo(true);
    if (document.readyState === "complete") {
      const t = setTimeout(go, 0);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", go, { once: true });
    return () => window.removeEventListener("load", go);
  }, []);

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
  }, [loadVideo]);

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
        src={loadVideo ? withBasePath("/videos/videocutHAP3.mp4") : undefined}
        onCanPlay={() => setCanPlay(true)}
        aria-hidden
      />

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
              onClick={() => {
                setReelMounted(true);
                setReelOpen(true);
              }}
              className="group flex items-center gap-2 font-sans text-base font-medium uppercase text-white"
            >
              {/* Play icon: on hover it slides out to the right while a
                  second one enters from the left. */}
              <span className="relative flex size-[26px] items-center justify-center overflow-hidden rounded-[2px] bg-white pl-px text-black">
                {[0, 1].map((n) => (
                  <svg
                    key={n}
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="currentColor"
                    aria-hidden
                    className={`absolute transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      n === 0 ? "group-hover:translate-x-[26px]" : "-translate-x-[26px] group-hover:translate-x-0"
                    }`}
                  >
                    <path d="M1.5 0.8v8.4L9 5 1.5 0.8Z" />
                  </svg>
                ))}
              </span>
              <RollText>See the Showreel</RollText>
            </button>
          </Reveal>
        </div>
      </div>

      {/* Portal mounts on first open (client-only), then stays so the
          overlay can animate out. */}
      {reelMounted &&
        createPortal(
          <AnimatePresence>
            {reelOpen && <ShowreelModal key="reel" onClose={() => setReelOpen(false)} />}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
}
