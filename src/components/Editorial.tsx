import { PageFrame } from "@/components/SiteShell";

export default function Editorial({
  eyebrow = "THE PREPKIT NOTEBOOK",
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <PageFrame>
      <article className="content-page">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        <div className="content-body">{children}</div>
      </article>
    </PageFrame>
  );
}
