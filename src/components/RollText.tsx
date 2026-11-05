import type { ReactNode } from "react";

/**
 * RollText — the label inside nav links and CTAs. It used to roll letter by
 * letter on hover; per client feedback hover is now quiet — the label stays
 * put and the surrounding link/button handles the change (an opacity lift
 * on links, the fill sweep + colour swap on buttons). Kept as a component
 * so every label stays in one place if the treatment changes again.
 */
export default function RollText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={className}>{children}</span>;
}
