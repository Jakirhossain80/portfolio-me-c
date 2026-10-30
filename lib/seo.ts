const DEV_FALLBACK_URL = "http://localhost:3000";

/** Canonical origin shared by metadata, structured data, robots and sitemap.
 * Production builds must never silently publish development URLs. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const isDevelopment = process.env.NODE_ENV === "development";

  if (!raw) {
    if (isDevelopment) return DEV_FALLBACK_URL;
    throw new Error("NEXT_PUBLIC_SITE_URL is required outside development.");
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an absolute HTTP(S) origin.");
  }

  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    url.pathname !== "/"
  ) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTP(S) origin without credentials, a path, query or fragment.");
  }

  const hostname = url.hostname.replace(/\.$/, "");
  const isLocalhost =
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname === "[::1]" ||
    hostname === "0.0.0.0" ||
    hostname.startsWith("127.");

  if (!isDevelopment && (url.protocol !== "https:" || isLocalhost)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must use HTTPS and a non-localhost domain outside development.");
  }

  return url.origin;
}

/** Monogram initials from a full name, e.g. "Md. Jakir Hossain" -> "JH". */
export function getInitials(name: string): string {
  const words = name.replace(/\./g, "").trim().split(/\s+/);
  return words
    .slice(-2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();
}
