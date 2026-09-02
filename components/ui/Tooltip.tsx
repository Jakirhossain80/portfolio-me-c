"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

type TooltipProps = {
  /** Unique id for the tooltip bubble. Pass this same string as
   * `aria-describedby` on the trigger element yourself — Tooltip can't wire
   * that up automatically because it renders `children` opaquely (see note
   * below), so the caller owns the trigger's own attributes. */
  id: string;
  label: string;
  children: ReactNode;
};

const SHOW_DELAY_MS = 350;
const VIEWPORT_MARGIN_PX = 8;

/** Wraps an icon-only trigger with a small hover/focus tooltip.
 *
 * Renders `children` opaquely rather than cloning it to inject event
 * handlers — `cloneElement`/`isValidElement` are unreliable on children that
 * crossed a Server-to-Client Component boundary (a real Next.js/React RSC
 * constraint: such children are treated as opaque pre-rendered nodes, and
 * behave inconsistently between the initial server render and the client's
 * hydration pass), which breaks for any Server Component caller. Instead,
 * hover/focus handlers live on this component's own wrapper `<span>` and
 * rely on React's synthetic mouseenter/focus events bubbling up from the
 * trigger — which works from both Server and Client Component callers.
 *
 * Shows on mouse hover and keyboard focus (not hover-only), dismisses on
 * Escape, blur, and mouse-leave, and measures itself against the viewport
 * to flip above/below and nudge horizontally so it never clips at an edge —
 * e.g. the scroll-to-top button pinned to the bottom-right corner. */
export default function Tooltip({ id, label, children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState<"top" | "bottom">("top");
  const [align, setAlign] = useState<"start" | "center" | "end">("center");
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  // A plain state value (not a ref) for the pending-show timer id — kept
  // out of any ref so React's ref-safety lint has nothing to flag around
  // these handlers running during render.
  const [, setShowTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

  const clearShowTimeout = useCallback(() => {
    setShowTimeoutId((current) => {
      if (current) clearTimeout(current);
      return null;
    });
  }, []);

  const scheduleShow = useCallback(() => {
    clearShowTimeout();
    setShowTimeoutId(setTimeout(() => setVisible(true), SHOW_DELAY_MS));
  }, [clearShowTimeout]);

  const hide = useCallback(() => {
    clearShowTimeout();
    setVisible(false);
  }, [clearShowTimeout]);

  useEffect(() => clearShowTimeout, [clearShowTimeout]);

  useEffect(() => {
    if (!visible) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") hide();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [visible, hide]);

  // Re-measure against the viewport every time the bubble becomes visible —
  // content and viewport size can both change between shows.
  useEffect(() => {
    if (!visible) return;
    const trigger = wrapperRef.current;
    const bubble = bubbleRef.current;
    if (!trigger || !bubble) return;

    const triggerRect = trigger.getBoundingClientRect();
    const bubbleRect = bubble.getBoundingClientRect();

    setPlacement(
      triggerRect.top - bubbleRect.height - VIEWPORT_MARGIN_PX < 0 ? "bottom" : "top"
    );

    const centeredLeft = triggerRect.left + triggerRect.width / 2 - bubbleRect.width / 2;
    if (centeredLeft < VIEWPORT_MARGIN_PX) {
      setAlign("start");
    } else if (centeredLeft + bubbleRect.width > window.innerWidth - VIEWPORT_MARGIN_PX) {
      setAlign("end");
    } else {
      setAlign("center");
    }
  }, [visible, label]);

  const positionStyle: CSSProperties =
    align === "start"
      ? { left: 0 }
      : align === "end"
        ? { right: 0 }
        : { left: "50%", transform: "translateX(-50%)" };

  const placementClasses = placement === "top" ? "bottom-full mb-2" : "top-full mt-2";
  const hiddenSlideClass = placement === "top" ? "translate-y-1" : "-translate-y-1";

  return (
    <span
      ref={wrapperRef}
      className="relative inline-flex"
      onMouseEnter={scheduleShow}
      onMouseLeave={hide}
      onFocus={scheduleShow}
      onBlur={hide}
    >
      {children}
      <span
        ref={bubbleRef}
        id={id}
        role="tooltip"
        style={positionStyle}
        className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-md border border-border bg-surface px-2.5 py-1.5 font-body text-xs text-foreground shadow-sm transition-[opacity,translate] duration-200 ease-out ${placementClasses} ${
          visible ? "translate-y-0 opacity-100" : `${hiddenSlideClass} opacity-0`
        }`}
      >
        {label}
      </span>
    </span>
  );
}
