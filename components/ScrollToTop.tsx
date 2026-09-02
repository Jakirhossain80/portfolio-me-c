"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Button from "@/components/ui/Button";

const SHOW_THRESHOLD_PX = 400;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  // Same scroll-detection pattern as Navbar's scroll-blur effect: a passive
  // scroll listener toggling boolean state past a threshold.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_THRESHOLD_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleClick() {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  }

  return (
    <Button
      type="button"
      variant="primary"
      onClick={handleClick}
      aria-label="Scroll to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed right-6 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-40 !h-12 !w-12 !p-0 transition-[opacity,scale] duration-300 ease-out ${
        visible ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
