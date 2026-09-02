"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[70svh] max-w-xl flex-col items-center justify-center gap-4 px-6 text-center">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.06em] text-accent">
          Error
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="text-3xl text-foreground">Something went wrong</h1>
      </Reveal>
      <Reveal delay={160}>
        <p className="text-muted">
          An unexpected error occurred while loading this page. You can try again, or head
          back to the homepage.
        </p>
      </Reveal>
      <Reveal delay={240}>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button type="button" variant="primary" onClick={reset}>
            Try again
          </Button>
          <Button href="/" variant="secondary">
            Back to homepage
          </Button>
        </div>
      </Reveal>
    </main>
  );
}
