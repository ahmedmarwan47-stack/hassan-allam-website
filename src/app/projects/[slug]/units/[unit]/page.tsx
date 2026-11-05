import type { Metadata } from "next";
import { notFound } from "next/navigation";
import UnitTemplate from "@/components/sections/unit/UnitTemplate";
import { getProjectDetail, PROJECT_DETAILS } from "@/data/projectDetail";
import { getUnit, UNIT_TYPES } from "@/data/units";

export function generateStaticParams() {
  return Object.keys(PROJECT_DETAILS).flatMap((slug) => UNIT_TYPES.map((u) => ({ slug, unit: u.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; unit: string }>;
}): Promise<Metadata> {
  const { slug, unit } = await params;
  const u = getUnit(unit);
  const project = getProjectDetail(slug);
  return u && project
    ? { title: `${u.name} — ${project.name.join(" ")} — Hassan Allam Properties`, description: u.summary }
    : {};
}

export default async function UnitPage({
  params,
}: {
  params: Promise<{ slug: string; unit: string }>;
}) {
  const { slug, unit } = await params;
  const u = getUnit(unit);
  const project = getProjectDetail(slug);
  if (!u || !project) notFound();
  return <UnitTemplate unit={u} project={project} />;
}
