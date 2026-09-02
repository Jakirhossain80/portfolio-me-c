"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import Button from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";

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

  // The fixed positioning lives on this wrapper, not the Button itself —
  // Tooltip's own wrapper needs its trigger to stay in normal flow so its
  // `relative` positioning context sizes correctly around it (a `fixed`
  // element takes itself out of flow entirely, which would collapse
  // Tooltip's wrapper to zero size and misplace the tooltip bubble).
  return (
    <div className="fixed right-6 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-40">
      <Tooltip id="tooltip-scroll-to-top" label="Scroll to top">
        <Button
          type="button"
          variant="primary"
          onClick={handleClick}
          aria-label="Scroll to top"
          aria-describedby="tooltip-scroll-to-top"
          aria-hidden={!visible}
          tabIndex={visible ? 0 : -1}
          className={`!h-12 !w-12 !p-0 transition-[opacity,scale] duration-300 ease-out ${
            visible ? "scale-100 opacity-100" : "pointer-events-none scale-90 opacity-0"
          }`}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      </Tooltip>
    </div>
  );
}
