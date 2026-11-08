"use client";

import { Children, useCallback, useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import SliderArrow from "@/components/SliderArrow";
import { useT } from "@/i18n/LocaleProvider";

/**
 * MobileCarousel — the phone version of the site's sliders. A native
 * swipe track with snap points; each slide is narrower than the screen so
 * the next one peeks in at the edge, making it obvious there's more. Under
 * it, the same progress bar + square arrows row as the desktop sliders.
 *
 * Place it inside a section with the usual 24px (px-6) page margin: the
 * track bleeds to both screen edges while the first slide lines up with
 * the margin.
 */
export type MobileCarouselHandle = { goTo: (i: number) => void };

export default function MobileCarousel({
  children,
  onIndexChange,
  ref,
  theme = "light",
  label = "items",
  slideClassName = "w-[82%]",
  className = "",
}: {
  children: React.ReactNode;
  theme?: "light" | "dark";
  /** Used in the arrows' labels ("Next {label}"). */
  label?: string;
  /** Slide width — keep it under 100% so the next slide peeks in. */
  slideClassName?: string;
  className?: string;
  /** Reports the slide at the left margin as it changes. */
  onIndexChange?: (i: number) => void;
  /** Lets the parent jump to a slide (e.g. from a timeline). */
  ref?: Ref<MobileCarouselHandle>;
}) {
  const t = useT();
  const slides = Children.toArray(children);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(slides.length - 1);

  // Index of the slide nearest the left margin; the last reachable one is
  // where the track can't scroll any further.
  const sync = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
    const max = Math.max(0, Math.ceil((track.scrollWidth - track.clientWidth) / step - 0.05));
    setMaxIndex(max);
    // In RTL scrollLeft runs from 0 to negative; its magnitude is the
    // distance from the start edge either way.
    const scrolled = Math.abs(track.scrollLeft);
    const atEnd = scrolled >= track.scrollWidth - track.clientWidth - 2;
    setIndex(atEnd ? max : Math.round(scrolled / step));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    sync();
    track.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      track.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  useEffect(() => {
    onIndexChange?.(index);
  }, [index, onIndexChange]);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0");
    const rtl = getComputedStyle(track).direction === "rtl";
    track.scrollTo({ left: (rtl ? -1 : 1) * i * step, behavior: "smooth" });
  };

  useImperativeHandle(ref, () => ({ goTo }));

  const dark = theme === "dark";
  const visible = slides.length - maxIndex;

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <div
        ref={trackRef}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div key={i} className={`shrink-0 snap-start ${slideClassName}`}>
            {slide}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="flex items-center gap-6">
          <div className={`relative h-[2px] flex-1 ${dark ? "bg-white/15" : "bg-black/15"}`}>
            <div
              className={`absolute inset-y-0 transition-[inset-inline-start] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${dark ? "bg-brand-white" : "bg-brand-black"}`}
              style={{ width: `${(visible / slides.length) * 100}%`, insetInlineStart: `${(index / slides.length) * 100}%` }}
            />
          </div>
          <div className="flex shrink-0 gap-2.5">
            <SliderArrow
              direction="prev"
              theme={theme}
              size="sm"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              label={t("Previous {label}", { label: t(label) })}
            />
            <SliderArrow
              direction="next"
              theme={theme}
              size="sm"
              onClick={() => goTo(index + 1)}
              disabled={index >= maxIndex}
              label={t("Next {label}", { label: t(label) })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
