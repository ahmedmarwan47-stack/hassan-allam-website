"use client";

import { useSyncExternalStore } from "react";
import Link from "@/components/LocaleLink";
import { useT } from "@/i18n/LocaleProvider";

export interface BackTarget {
  label: string;
  href: string;
}

const noop = () => () => {};
const readFrom = () => new URLSearchParams(window.location.search).get("from") ?? "";

/**
 * "‹ Back to …" above a unit's name: the project by default, or the
 * neighborhood the visitor came from (its unit cards add `?from=<slug>`).
 * The pages are static, so the choice is made in the browser.
 */
export default function UnitBackLink({
  project,
  neighborhoods,
}: {
  project: BackTarget;
  /** Neighborhoods offering this unit, keyed by their slug. */
  neighborhoods: Record<string, BackTarget>;
}) {
  const t = useT();
  const from = useSyncExternalStore(noop, readFrom, () => "");
  const target = neighborhoods[from] ?? project;
  return (
    <Link
      href={target.href}
      className="flex items-center gap-2 self-start font-sans text-sm font-medium uppercase tracking-[0.12em] text-white/60 transition-colors duration-300 hover:text-white"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden className="rtl:-scale-x-100">
        <path d="M9 2.5 4.5 7 9 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {t("Back to {name}", { name: t(target.label) })}
    </Link>
  );
}
