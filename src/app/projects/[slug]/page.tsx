import { notFound } from "next/navigation";
import ProjectDetailTemplate from "@/components/sections/project-detail/ProjectDetailTemplate";
import { getProjectDetail, PROJECT_DETAILS } from "@/data/projectDetail";

export function generateStaticParams() {
  return Object.keys(PROJECT_DETAILS).map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getProjectDetail(slug);
  if (!data) notFound();

  return <ProjectDetailTemplate data={data} />;
}
