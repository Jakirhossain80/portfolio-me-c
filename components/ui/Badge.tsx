import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  const classes = [
    "inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
}
