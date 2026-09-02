"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type KeyboardEvent,
} from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import Tooltip from "@/components/ui/Tooltip";

type ThemeOption = "light" | "dark" | "system";

const options: { value: ThemeOption; label: string; Icon: typeof Sun }[] = [
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
  { value: "system", label: "System", Icon: Monitor },
];

function subscribeNoop() {
  return () => {};
}

// next-themes only knows the real preference after hydration (it reads
// localStorage client-side); useSyncExternalStore — rather than a
// useState+useEffect "mounted" flag — is React's recommended way to read
// "has this component hydrated yet" without tripping the set-state-in-effect
// lint rule or causing a hydration mismatch.
function useHasMounted() {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );
}

const iconButtonClasses =
  "inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted " +
  "transition-colors duration-200 hover:text-accent focus-visible:outline-2 " +
  "focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const mounted = useHasMounted();
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // ThemeToggle renders twice (desktop + mobile nav rows, both present in
  // the DOM at once), so the tooltip id can't be a fixed string — useId()
  // gives each instance its own stable, unique id.
  const tooltipId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitemradio"]')?.focus();
  }, [open]);

  if (!mounted) {
    return <div className={iconButtonClasses} aria-hidden="true" />;
  }

  const current = options.find((option) => option.value === theme) ?? options[2];
  const CurrentIcon = current.Icon;

  function handleMenuKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? []
    );
    const currentIndex = items.indexOf(document.activeElement as HTMLButtonElement);

    if (event.key === "ArrowDown") {
      event.preventDefault();
      items[(currentIndex + 1) % items.length]?.focus();
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      items[(currentIndex - 1 + items.length) % items.length]?.focus();
    } else if (event.key === "Home") {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === "End") {
      event.preventDefault();
      items[items.length - 1]?.focus();
    }
  }

  function selectTheme(value: ThemeOption) {
    setTheme(value);
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <div ref={containerRef} className="relative">
      <Tooltip id={tooltipId} label={`Theme: ${current.label}`}>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={`Theme: ${current.label}. Activate to change theme`}
          aria-describedby={tooltipId}
          className={iconButtonClasses}
        >
          <CurrentIcon className="h-5 w-5" />
        </button>
      </Tooltip>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Theme"
          onKeyDown={handleMenuKeyDown}
          className="absolute right-0 top-full z-50 mt-2 w-36 overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-lg"
        >
          {options.map(({ value, label, Icon }) => {
            const selected = theme === value;
            return (
              <button
                key={value}
                type="button"
                role="menuitemradio"
                aria-checked={selected}
                onClick={() => selectTheme(value)}
                className={`flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${
                  selected ? "text-accent" : "text-foreground hover:bg-background hover:text-accent"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
