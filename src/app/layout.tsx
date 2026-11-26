import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: "PrepKit — Free Image & PDF Tools",
    template: "%s",
  },
  description: "Free, private image and PDF tools that work right in your browser. Compress, convert, resize, and prepare files without uploading them.",
  applicationName: "PrepKit",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
