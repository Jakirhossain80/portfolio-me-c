import type { Metadata, Viewport } from "next";
import { Manrope, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/data";
import { getSiteUrl } from "@/lib/seo";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const titleDefault = `${profile.name} | ${profile.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: titleDefault,
    template: `%s | ${profile.name}`,
  },
  description: profile.summary,
  keywords: [
    "MERN stack developer",
    "React developer",
    "Node.js developer",
    "Next.js developer",
    "TypeScript developer",
    "MongoDB",
    "Express.js",
    "Full-stack web developer",
    profile.name,
  ],
  openGraph: {
    title: titleDefault,
    description: profile.summary,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description: profile.summary,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F8FA" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F14" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  url: getSiteUrl(),
  image: `${getSiteUrl()}${profile.photoUrl}`,
  sameAs: [profile.githubUrl, profile.linkedinUrl],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
