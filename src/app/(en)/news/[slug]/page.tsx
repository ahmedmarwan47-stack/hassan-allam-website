import { notFound } from "next/navigation";
import NewsDetailTemplate from "@/components/sections/news-detail/NewsDetailTemplate";
import { getNewsArticle, NEWS_DETAILS } from "@/data/newsDetail";

export function generateStaticParams() {
  return Object.keys(NEWS_DETAILS).map((slug) => ({ slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = getNewsArticle(slug);
  if (!found) notFound();

  return <NewsDetailTemplate article={found.article} detail={found.detail} />;
}
