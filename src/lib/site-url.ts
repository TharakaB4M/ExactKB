export function getSiteUrl(): string | undefined {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return undefined;

  let url: URL;
  try {
    url = new URL(configured);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
  }

  const localHost = url.hostname === "localhost" || url.hostname === "127.0.0.1";
  if (url.protocol !== "https:" && !(localHost && url.protocol === "http:")) {
    throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS, except for localhost development.");
  }
  if (url.username || url.password || url.search || url.hash || (url.pathname !== "/" && url.pathname !== "")) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an origin only, such as https://example.com.");
  }
  return url.origin;
}
