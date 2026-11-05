import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NeighborhoodTemplate from "@/components/sections/neighborhood/NeighborhoodTemplate";
import { getNeighborhood, NEIGHBORHOODS } from "@/data/neighborhoods";

export function generateStaticParams() {
  return NEIGHBORHOODS.map((n) => ({ slug: n.project.id, neighborhood: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; neighborhood: string }>;
}): Promise<Metadata> {
  const { slug, neighborhood } = await params;
  const n = getNeighborhood(slug, neighborhood);
  return n
    ? { title: `${n.item.name} — ${n.project.name.join(" ")} — Hassan Allam Properties`, description: n.item.blurb }
    : {};
}

export default async function NeighborhoodPage({
  params,
}: {
  params: Promise<{ slug: string; neighborhood: string }>;
}) {
  const { slug, neighborhood } = await params;
  const n = getNeighborhood(slug, neighborhood);
  if (!n) notFound();
  return <NeighborhoodTemplate n={n} />;
}
