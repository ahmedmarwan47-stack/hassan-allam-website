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

export function translate(locale: Locale, en: string, vars?: TVars, page?: string): string {
  if (locale === "ar") {
    // Most specific first: this exact page ("Text@/projects/keys-52", from
    // the client's per-page SEO copy), then a component context passed as
    // `_ctx` ("The Story@home"), then the site-wide Arabic.
    // `_noPage` opts out of page wording (e.g. a form's option list that
    // must read the same everywhere); a context can also be page-specific
    // ("Text@unit-h1@/projects/x/units/y").
    const usePage = page && !vars?._noPage;
    const ctxOnPage = usePage && vars?._ctx ? AR[`${en}@${vars._ctx}@${page}`] : undefined;
    const onPage = usePage ? AR[`${en}@${page}`] : undefined;
    const ctx = vars?._ctx ? AR[`${en}@${vars._ctx}`] : undefined;
    const ar = ctxOnPage ?? onPage ?? ctx ?? AR[en] ?? AR[en.trim()];
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

/** The page a pathname belongs to, for page-scoped Arabic: "/ar/projects/x/" → "/projects/x". */
export function pageKey(pathname: string): string {
  const p = pathname.replace(/^\/ar(?=\/|$)/, "").replace(/\/+$/, "");
  return p || "/";
}

/** Page-scoped lookup outside React (page titles and descriptions). */
export function arOnPage(key: string, page: string): string | undefined {
  return AR[`${key}@${page}`];
}

/** The other language's path for the current page. */
export function switchHref(locale: Locale, pathname: string): string {
  if (locale === "ar") {
    const rest = pathname.replace(/^\/ar(?=\/|$)/, "");
    return rest || "/";
  }
  return pathname === "/" ? "/ar" : `/ar${pathname}`;
}
