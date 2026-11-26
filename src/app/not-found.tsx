import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageFrame } from "@/components/SiteShell";

export default function NotFound() {
  return (
    <PageFrame>
      <section className="not-found">
        <span className="eyebrow">A SMALL DETOUR</span>
        <h1>That page went<br /><span>somewhere else.</span></h1>
        <p>We couldn&apos;t find that address. The tools and useful things are still right here.</p>
        <div className="not-found-actions">
          <Link className="text-link" href="/"><ArrowLeft size={15} /> Back home</Link>
          <Link className="button button-primary" href="/#tools">Explore the tools <ArrowRight size={15} /></Link>
        </div>
      </section>
    </PageFrame>
  );
}
