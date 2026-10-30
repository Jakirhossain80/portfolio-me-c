import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { profile } from "@/lib/data";
import { getSiteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: getSiteUrl() },
  openGraph: {
    title: `${profile.name} | ${profile.title}`,
    description: profile.summary,
    type: "website",
    url: getSiteUrl(),
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
