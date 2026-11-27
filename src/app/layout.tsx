import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();
const defaultTitle = "Free Image & PDF Tools | PrepKit";
const defaultDescription =
  "Free, private image and PDF tools that work right in your browser. Compress, convert, resize, and prepare files without uploading them.";
const websiteSchema = siteUrl
  ? {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "PrepKit",
      alternateName: "PrepKit image and PDF tools",
      url: siteUrl,
    }
  : undefined;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: defaultTitle,
    template: "%s | PrepKit",
  },
  description: defaultDescription,
  applicationName: "PrepKit",
  robots: { index: true, follow: true },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    siteName: "PrepKit",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8046244432202885"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {websiteSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c"),
            }}
          />
        )}
        {children}
      </body>
    </html>
  );
}
