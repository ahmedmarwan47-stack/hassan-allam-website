import Footer from "@/components/Footer";
import type { NewsArticle } from "@/data/news";
import type { NewsDetail } from "@/data/newsDetail";
import NewsDetailHero from "./NewsDetailHero";
import NewsDetailContent from "./NewsDetailContent";

export default function NewsDetailTemplate({
  article,
  detail,
}: {
  article: NewsArticle;
  detail: NewsDetail;
}) {
  return (
    <main>
      <NewsDetailHero article={article} detail={detail} />
      <NewsDetailContent detail={detail} />
      <Footer />
    </main>
  );
}
