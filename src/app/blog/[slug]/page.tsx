import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Editorial from "@/components/Editorial";
import { articles } from "@/lib/articles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return article ? { title: article.title, description: article.summary } : {};
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    author: { "@type": "Organization", name: "PrepKit" },
    publisher: { "@type": "Organization", name: "PrepKit" },
  };

  return (
    <Editorial eyebrow={article.category.toUpperCase()} title={article.title} lead={article.intro}>
      <div className="article-content">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          </section>
        ))}
        <p><Link href="/#tools">Explore PrepKit&apos;s free tools →</Link></p>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema).replace(/</g, "\\u003c") }} />
    </Editorial>
  );
}
