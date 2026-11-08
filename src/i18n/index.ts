/**
 * i18n — English is the source language; Arabic lives at /ar.
 *
 * Every visible English string is passed through `t()` (via `useT()` in
 * components). The Arabic dictionary is keyed by the exact English text, so
 * data from src/data/* (project copy, news, bios…) translates the same way
 * as UI labels. Anything missing falls back to English. `{name}` style
 * placeholders are filled from `vars`.
 *
 * The Arabic copy is a first draft for client review.
 */
import AR from "./ar";

export type Locale = "en" | "ar";
export type TVars = Record<string, string | number>;

const fill = (s: string, vars?: TVars) =>
  vars ? s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m)) : s;

export function translate(locale: Locale, en: string, vars?: TVars): string {
  if (locale === "ar") {
    const ar = AR[en] ?? AR[en.trim()];
    if (ar) return fill(ar, vars);
  }
  return fill(en, vars);
}

/** Prefix an internal path for the locale ("/projects" → "/ar/projects"). */
export function localizeHref(locale: Locale, href: string): string {
  if (locale !== "ar" || !href.startsWith("/") || href.startsWith("//")) return href;
  if (href === "/ar" || href.startsWith("/ar/") || href.startsWith("/ar#") || href.startsWith("/ar?")) return href;
  return href === "/" ? "/ar" : `/ar${href}`;
}

/** The other language's path for the current page. */
export function switchHref(locale: Locale, pathname: string): string {
  if (locale === "ar") {
    const rest = pathname.replace(/^\/ar(?=\/|$)/, "");
    return rest || "/";
  }
  return pathname === "/" ? "/ar" : `/ar${pathname}`;
}
