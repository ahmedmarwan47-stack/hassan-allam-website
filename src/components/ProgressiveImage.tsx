"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { BLUR_PLACEHOLDERS } from "@/data/blurPlaceholders";

/**
 * Drop-in replacement for next/image that loads progressively: a tiny
 * blurred preview of the photo paints instantly (no grey box), then the full
 * image fades in and sharpens over it once it has downloaded.
 *
 * Previews come from src/data/blurPlaceholders.ts (`npm run blur`). Images
 * without one (SVGs, remote URLs) render exactly like plain next/image.
 *
 * `fill` images get the full blur-up: the preview sits behind, and the image
 * is wrapped in a layer that fades + un-blurs on load (a wrapper, so the
 * image's own transitions — e.g. hover zoom — stay untouched). Sized images
 * use next/image's built-in blur placeholder.
 */
export default function ProgressiveImage({ alt, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const blur = placeholderFor(props.src);

  if (!blur) return <Image {...props} alt={alt} onLoad={onLoad} />;

  if (!props.fill) {
    return <Image {...props} alt={alt} placeholder="blur" blurDataURL={blur} onLoad={onLoad} />;
  }

  // The layers take over the image's z-index class (e.g. `-z-10` on section
  // backgrounds): the wrapper is what's stacked now, and its filter would
  // otherwise trap the image's own z-index inside it.
  const z = props.className?.match(/(?:^|\s)(-?z-\S+)/)?.[1] ?? "";

  return (
    <>
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 scale-110 bg-cover bg-center blur-xl transition-opacity duration-700 ${z}`}
        style={{ backgroundImage: `url("${blur}")`, opacity: loaded ? 0 : 1 }}
      />
      <span
        className={`absolute inset-0 transition-[opacity,filter] duration-700 ease-out ${z}`}
        // `none` once loaded, so no lingering filter/stacking context.
        style={{ opacity: loaded ? 1 : 0, filter: loaded ? "none" : "blur(12px)" }}
      >
        <Image
          {...props}
          alt={alt}
          onLoad={(e) => {
            setLoaded(true);
            onLoad?.(e);
          }}
        />
      </span>
    </>
  );
}

function placeholderFor(src: ImageProps["src"]): string | undefined {
  if (typeof src !== "string") return undefined;
  // Strip the GitHub Pages basePath (see lib/basePath) before looking up.
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const path = base && src.startsWith(base) ? src.slice(base.length) : src;
  return BLUR_PLACEHOLDERS[path];
}
