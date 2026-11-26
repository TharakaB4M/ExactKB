import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
