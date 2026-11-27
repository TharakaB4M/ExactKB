import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ArrowDown,
  FileCheck2,
  FileImage,
  FileText,
  Images,
  MonitorSmartphone,
  ScanLine,
  ShieldCheck,
  Shrink,
  Sparkles,
} from "lucide-react";
import { PageFrame } from "@/components/SiteShell";
import { getPageMetadata } from "@/lib/site-url";
import { tools } from "@/lib/tools";

const icons = [Shrink, ScanLine, Images, FileText, FileImage, Sparkles];

export const metadata = getPageMetadata(
  "/",
  "Free Image & PDF Tools | PrepKit",
  "Free, private image and PDF tools that work right in your browser. Compress, convert, resize, and prepare files without uploading them.",
);

export default function Home() {
  return (
    <PageFrame>
      <section className="hero">
        <div className="hero-copy">
          <div className="hero-kicker"><span className="status-dot" /> SIX LITTLE TOOLS. ZERO UPLOADS.</div>
          <h1>Files ready<br />for <span>what&apos;s next.</span></h1>
          <p>Resize, compress, convert, and tidy up your images and PDFs. Free tools that work right here in your browser.</p>
          <div className="hero-actions">
            <Link href="/tools/compress-image" className="button button-primary">Start with a tool <ArrowRight size={17} /></Link>
            <a href="#tools" className="text-link">Explore all tools <ArrowDownRight size={16} /></a>
          </div>
          <div className="hero-proof"><span><span className="proof-check">✓</span> Your files stay on your device</span><span><span className="proof-check">✓</span> No sign-up, no watermarks</span></div>
        </div>
        <div className="hero-art" aria-label="Illustration of image files being prepared">
          <div className="art-glow" />
          <div className="paper paper-back"><span>PNG</span><i /></div>
          <div className="paper paper-front"><span className="paper-art"><span /><i /></span><strong>weekend.jpg</strong><small>Before&nbsp; 2.4 MB</small></div>
          <div className="art-arrow"><ArrowRight size={19} /></div>
          <div className="result-tile"><div className="result-spark"><Sparkles size={16} /></div><strong>50 KB</strong><small>Ready to go</small></div>
          <div className="floating-badge"><span>✦</span> crisp, not complicated</div>
        </div>
        <div className="hero-index"><span>01 — 06</span><span>THE EVERYDAY FILE TOOLKIT</span></div>
      </section>

      <section className="tools-section" id="tools">
        <div className="section-heading">
          <div><span className="eyebrow">YOUR FILE TOOLKIT</span><h2>Small task?<br /><span>We&apos;ve got a tool.</span></h2></div>
          <p>Useful little utilities for applications, work, and everything you&apos;re putting online. No software to install.</p>
        </div>
        <div className="tool-grid">
          {tools.map((tool, index) => {
            const Icon = icons[index];
            return (
              <Link className={`tool-card tool-card-${index + 1}`} href={`/tools/${tool.id}`} key={tool.id}>
                <div className="tool-card-top"><span className="tool-icon"><Icon size={20} strokeWidth={1.8} /></span><span className="tool-category">{tool.category}</span><ArrowUpRight className="card-arrow" size={18} /></div>
                <h3>{tool.title}</h3>
                <p>{tool.description}</p>
                <span className="tool-card-link">Open tool <ArrowRight size={14} /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="privacy-section">
        <div className="privacy-visual" aria-label="Your files are processed securely on your device">
          <div className="privacy-orbit orbit-one" />
          <div className="privacy-orbit orbit-two" />
          <span className="orbit-tag tag-one"><MonitorSmartphone size={13} /> your device</span>
          <span className="orbit-tag tag-two"><FileCheck2 size={13} /> your files</span>
          <div className="privacy-device">
            <div className="device-camera" />
            <div className="device-content">
              <span className="device-file"><FileImage size={17} /></span>
              <span className="device-lines"><i /><i /><i /></span>
              <span className="device-transfer"><ArrowDown size={13} /></span>
              <span className="device-shield"><ShieldCheck size={21} /></span>
            </div>
            <span className="device-home" />
          </div>
          <span className="privacy-spark spark-one">✳</span>
          <span className="privacy-spark spark-two">✦</span>
        </div>
        <div className="privacy-copy"><span className="eyebrow">A BETTER KIND OF SIMPLE</span><h2>Your files are<br /><span>yours. Always.</span></h2><p>PrepKit processes everything right inside your browser. Your photos and documents aren&apos;t uploaded, stored, or seen by us. Close the tab and the work stays yours.</p><Link className="text-link" href="/privacy-policy">Read our privacy promise <ArrowRight size={15} /></Link></div>
      </section>

      <section className="guide-cta">
        <div><span className="eyebrow">A LITTLE HELP, TOO</span><h2>Better prepared<br />than before.</h2><p>Practical guides for image formats, file sizes, and getting application photos print-ready.</p><Link href="/blog" className="button button-light">Read the journal <ArrowRight size={16} /></Link></div>
        <div className="guide-stamp"><span>THE<br />PREPKIT<br />JOURNAL</span><i>✳</i></div>
      </section>

      <section className="home-faq">
        <div><span className="eyebrow">GOOD QUESTIONS</span><h2>Before you<br />get started.</h2></div>
        <div className="faq-list">
          <details><summary>Are these tools really free?</summary><p>Yes. The tools are free to use and don&apos;t require an account.</p></details>
          <details><summary>Do you upload or store my files?</summary><p>No. Image and PDF work is done in your browser. Your files stay on your device.</p></details>
          <details><summary>Will every file work?</summary><p>PrepKit supports common JPG, PNG, WebP, and PDF files. Very large, damaged, encrypted, or unusual files may not be supported by your browser.</p></details>
        </div>
      </section>
    </PageFrame>
  );
}
