"use client";

import { useEffect } from "react";

/**
 * Marks <html> once React has actually hydrated. The `data-reveal` failsafe
 * in globals.css only applies while this class is absent — so if the JS
 * bundle ever fails to boot (stale cached HTML pointing at replaced chunks,
 * blocked scripts, network failure), reveal-wrapped content still fades in
 * instead of staying stuck at its hidden SSR state.
 */
export default function HydrationMark() {
  useEffect(() => {
    document.documentElement.classList.add("hydrated");
  }, []);
  return null;
}
