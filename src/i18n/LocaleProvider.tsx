"use client";

import { createContext, useCallback, useContext, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { translate, localizeHref, pageKey, type Locale, type TVars } from "./index";

const LocaleContext = createContext<Locale>("en");

/** Set once in each root layout: (en) → "en", ar → "ar". */
export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);

/** `const t = useT(); t("Request interest")` — Arabic on /ar, else English. */
export function useT() {
  const locale = useLocale();
  // The current page, so page-specific Arabic ("Text@/projects/keys-52") wins.
  const page = pageKey(usePathname() || "/");
  return useCallback((en: string, vars?: TVars) => translate(locale, en, vars, page), [locale, page]);
}

/** Localized internal href (adds /ar on the Arabic site). */
export function useHref() {
  const locale = useLocale();
  return useCallback((href: string) => localizeHref(locale, href), [locale]);
}

/** true on the Arabic (right-to-left) site. */
export const useRtl = () => useLocale() === "ar";
