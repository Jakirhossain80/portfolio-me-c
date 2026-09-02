"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

type TracedButtonProps = {
  href: string;
  children: string;
  className?: string;
};

/** A secondary Button with its normal resting border (via Button's own
 * `border-border` + `shadow-sm`), plus an accent-colored SVG rect that
 * "draws" itself around the pill on top of that on hover/focus
 * (stroke-dasharray/stroke-dashoffset). The corner radius is measured from
 * the rendered button rather than hardcoded — same ResizeObserver approach
 * Navbar.tsx uses for its own render-dependent measurement — so the traced
 * border always matches the actual pill shape instead of guessing its
 * height. */
export default function TracedButton({ href, children, className }: TracedButtonProps) {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const [radius, setRadius] = useState(999);

  useLayoutEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;

    const updateRadius = () => setRadius(node.offsetHeight / 2);
    updateRadius();

    const resizeObserver = new ResizeObserver(updateRadius);
    resizeObserver.observe(node);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <span ref={wrapperRef} className="inline-block">
      <Button
        href={href}
        variant="secondary"
        target="_blank"
        rel="noopener noreferrer"
        className={["group relative", className].filter(Boolean).join(" ")}
      >
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx={radius}
            ry={radius}
            fill="none"
            strokeWidth={1.5}
            pathLength={100}
            className="stroke-accent [stroke-dasharray:100] [stroke-dashoffset:100] transition-[stroke-dashoffset] duration-[450ms] ease-out group-hover:[stroke-dashoffset:0] group-focus-visible:[stroke-dashoffset:0]"
          />
        </svg>
        <span className="relative z-10">{children}</span>
      </Button>
    </span>
  );
}
