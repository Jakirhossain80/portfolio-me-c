import type { Metadata, Viewport } from "next";
import { Manrope, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { profile } from "@/lib/data";
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
  // TODO: replace with the production Vercel domain once it exists
  metadataBase: new URL("https://example.com"),
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
    images: [{ url: "/og-image.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description: profile.summary,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F7F8FA" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F14" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${ibmPlexSans.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
