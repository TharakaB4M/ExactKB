import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";
import { getSiteUrl } from "@/lib/site-url";
import { sizeLandingPages, tools } from "@/lib/tools";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const pages = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/blog",
    ...tools.map((tool) => `/tools/${tool.id}`),
    ...sizeLandingPages.map((page) => `/tools/${page.slug}`),
    ...articles.map((article) => `/blog/${article.slug}`),
  ];
  return pages.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path.startsWith("/tools/") ? 0.8 : 0.6,
  }));
}
