const DEV_FALLBACK_URL = "http://localhost:3000";

/** Base URL for absolute links (sitemap, robots, metadataBase). Set
 * NEXT_PUBLIC_SITE_URL in Vercel once the production domain is known. */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL || DEV_FALLBACK_URL;
  return raw.replace(/\/+$/, "");
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
