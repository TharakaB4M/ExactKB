import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import ToolWorkspace, { ToolInstructions } from "@/components/ToolWorkspace";
import { PageFrame } from "@/components/SiteShell";
import { getTool, sizeLandingPages, tools } from "@/lib/tools";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [
    ...tools.map((tool) => ({ slug: tool.id })),
    ...sizeLandingPages.map((page) => ({ slug: page.slug })),
  ];
}

function getPage(slug: string) {
  const sizePage = sizeLandingPages.find((page) => page.slug === slug);
  if (sizePage) {
    const baseTool = getTool("compress-image");
    if (!baseTool) return undefined;
    return {
      tool: {
        ...baseTool,
        title: `Compress image to ${sizePage.kb} KB`,
        shortTitle: `${sizePage.kb} KB image compressor`,
        description: `Make an image smaller than ${sizePage.kb} KB for an application or upload.`,
        detail: `Reduce a photo to a maximum of ${sizePage.kb} KB in your browser. The tool adjusts image quality first and dimensions only when needed. Your image is never uploaded.`,
      },
      targetKb: sizePage.kb,
    };
  }
  const tool = getTool(slug);
  return tool ? { tool, targetKb: undefined } : undefined;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) return {};
  return {
    title: `${page.tool.title} — Free, Private Online Tool | PrepKit`,
    description: page.tool.description,
  };
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params;
  const page = getPage(slug);
  if (!page) notFound();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <PageFrame>
      <div className="breadcrumb"><Link href="/">Home</Link><ChevronRight size={14} /><Link href="/#tools">Tools</Link><ChevronRight size={14} /><span>{page.tool.shortTitle}</span></div>
      <div className="tool-page-layout">
        <ToolWorkspace tool={page.tool} initialTargetKb={page.targetKb} />
        <aside className="tool-aside">
          <div className="aside-card"><span className="aside-icon">✳</span><strong>Made for the little file jobs.</strong><p>Free to use, works in your browser, and private from the first click.</p></div>
          <span className="aside-label">MORE TOOLS</span>
          {tools.filter((tool) => tool.id !== page.tool.id).slice(0, 4).map((tool) => <Link className="aside-tool-link" href={`/tools/${tool.id}`} key={tool.id}>{tool.shortTitle}<ChevronRight size={15} /></Link>)}
        </aside>
      </div>
      <ToolInstructions tool={page.tool} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
    </PageFrame>
  );
}
