import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import CareerDetail from "@/components/sections/careers/CareerDetail";
import { getJob, JOBS } from "@/data/careers";

export function generateStaticParams() {
  return JOBS.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  return job
    ? { title: `${job.title} — Careers — Hassan Allam Properties`, description: job.lead }
    : {};
}

export default async function CareerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  return (
    <main>
      <CareerDetail job={job} />
      <Footer />
    </main>
  );
}
