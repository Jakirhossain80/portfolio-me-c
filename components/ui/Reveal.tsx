"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    // Server HTML stays visible. Animation is an enhancement, never a
    // prerequisite for reading content when hydration or browser APIs fail.
    if (!node || !window.IntersectionObserver || !node.animate) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    let animation: Animation | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.disconnect();
          if (!reducedMotion.matches) {
            animation = node.animate(
              [
                { opacity: 0, transform: "translateY(16px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 550, delay, easing: "ease-out", fill: "backwards" }
            );
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        observer.disconnect();
        animation?.cancel();
      }
    };
    reducedMotion.addEventListener("change", onMotionChange);
    return () => {
      observer.disconnect();
      animation?.cancel();
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, [delay]);

  const classes = [
    "transition duration-[550ms] ease-out",
    "opacity-100 translate-y-0",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
