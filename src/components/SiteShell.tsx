import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="PrepKit home">
          <span className="brand-mark"><Sparkles size={18} strokeWidth={2.2} /></span>
          <span>prepkit<span className="brand-dot">.</span></span>
        </Link>
        <nav className="main-nav" aria-label="Main navigation">
          <Link href="/#tools">All tools</Link>
          <Link href="/blog">The journal</Link>
          <Link href="/about">About</Link>
        </nav>
        <Link className="header-cta" href="/tools/compress-image">Try a tool <ArrowUpRight size={15} /></Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link className="brand" href="/"><span className="brand-mark"><Sparkles size={17} /></span><span>prepkit<span className="brand-dot">.</span></span></Link>
          <p>Little file-prep jobs,<br />made a lot simpler.</p>
        </div>
        <div className="footer-links">
          <div><strong>Explore</strong><Link href="/#tools">All tools</Link><Link href="/blog">The journal</Link><Link href="/about">About us</Link></div>
          <div><strong>Say hello</strong><Link href="/contact">Contact</Link><Link href="/privacy-policy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </div>
      <div className="footer-bottom"><span>© PrepKit · Designed &amp; developed by <a href="https://github.com/TharakaB4M" target="_blank" rel="noopener noreferrer">Pahan Tharaka</a></span><span>Private by design · Files stay on your device</span></div>
    </footer>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <><SiteHeader /><main className="page-main" id="main-content">{children}</main><SiteFooter /></>;
}
