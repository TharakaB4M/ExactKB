import type { Metadata } from "next";
import Link from "next/link";
import Editorial from "@/components/Editorial";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "The PrepKit Journal",
  description: "Practical guides to image sizes, file formats, privacy, and getting documents ready to share.",
};

export default function BlogPage() {
  return (
    <Editorial eyebrow="NOTES FOR THE EVERYDAY FILE JOB" title="The PrepKit journal." lead="Straightforward guides to image sizes, file formats, and getting a document ready for wherever it needs to go.">
      <div className="article-list">
        {articles.map((article) => (
          <Link className="article-card" href={`/blog/${article.slug}`} key={article.slug}>
            <span>{article.category}</span><h2>{article.title}</h2><p>{article.summary}</p>
          </Link>
        ))}
      </div>
    </Editorial>
  );
}
