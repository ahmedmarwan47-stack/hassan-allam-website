"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useHref } from "@/i18n/LocaleProvider";

/**
 * next/link that keeps visitors in their language: internal hrefs get the
 * /ar prefix on the Arabic site. Drop-in for `import Link from "next/link"`.
 */
export default function LocaleLink({ href, ...props }: ComponentProps<typeof Link>) {
  const localize = useHref();
  const to = typeof href === "string" ? localize(href) : href;
  return <Link href={to} {...props} />;
}
