import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70svh] max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.06em] text-accent">
          404
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="text-3xl text-foreground">This page wandered off</h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="text-muted">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s
          get you back on track.
        </p>
      </Reveal>
      <Reveal delay={240}>
        <Button href="/" variant="primary">
          Back to homepage
        </Button>
      </Reveal>
    </main>
  );
}
