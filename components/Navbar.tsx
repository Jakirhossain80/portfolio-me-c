"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Tooltip from "@/components/ui/Tooltip";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  { href: profile.githubUrl, label: "GitHub", Icon: GithubIcon },
  { href: profile.linkedinUrl, label: "LinkedIn", Icon: LinkedinIcon },
];

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex cursor-pointer items-center rounded-sm py-1 font-body text-sm transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
        active ? "text-accent" : "text-foreground hover:text-accent"
      }`}
    >
      {label}
      <span
        className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-200 ease-out ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </a>
  );
}

export default function Navbar() {
  const headerRef = useRef<HTMLElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Measure the sticky Navbar's real rendered height and expose it as both
  // state (for the IntersectionObserver rootMargin below) and a CSS custom
  // property (for each section's scroll-margin-top in globals.css) — so a
  // clicked anchor link never scrolls a section's top edge underneath the
  // header, and stays correct if the header's height ever changes.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeight = () => {
      const height = header.offsetHeight;
      setNavbarHeight(height);
      document.documentElement.style.setProperty("--navbar-height", `${height}px`);
    };

    updateHeight();
    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(header);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (navbarHeight === 0) return;

    const sections = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    // Keep every section's latest intersection ratio (IntersectionObserver
    // only reports entries whose status changed, not the full set each
    // time) so that when a fast anchor-link jump makes two adjacent
    // sections intersect within the same callback batch, we pick whichever
    // is actually more visible instead of whichever happens to be last in
    // the batch.
    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        if (bestId) setActiveId(bestId);
      },
      {
        // Exclude the area behind the sticky Navbar entirely, and treat a
        // section as "active" based on which one dominates the upper part
        // of the remaining viewport.
        rootMargin: `-${navbarHeight}px 0px -60% 0px`,
        threshold: Array.from({ length: 11 }, (_, i) => i / 10),
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navbarHeight]);

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-out ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#hero"
          className="cursor-pointer rounded-sm font-heading text-lg text-foreground transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {profile.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              active={activeId === link.href.slice(1)}
            />
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {socialLinks.map(({ href, label, Icon }) => (
            <Tooltip key={label} id={`tooltip-navbar-${label}`} label={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                aria-describedby={`tooltip-navbar-${label}`}
                className="cursor-pointer rounded-sm text-muted transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <Icon className="h-5 w-5" />
              </a>
            </Tooltip>
          ))}
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="inline-flex cursor-pointer items-center justify-center rounded-sm text-foreground transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={activeId === link.href.slice(1)}
                onClick={() => setMobileOpen(false)}
              />
            ))}
          </nav>
          <div className="flex items-center gap-4 border-t border-border px-6 py-4">
            {socialLinks.map(({ href, label, Icon }) => (
              <Tooltip key={label} id={`tooltip-navbar-mobile-${label}`} label={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  aria-describedby={`tooltip-navbar-mobile-${label}`}
                  className="cursor-pointer rounded-sm text-muted transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </Tooltip>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
