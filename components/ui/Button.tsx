import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type SharedProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonAsAnchor = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsAnchor | ButtonAsButton;

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 " +
  "font-body text-sm font-medium shadow-sm transition duration-200 ease-out " +
  "cursor-pointer hover:scale-[1.02] hover:shadow-lg " +
  // Plain outline, not a Tailwind ring (box-shadow-based): rings composite via
  // --tw-ring-shadow into the same box-shadow property that shadow-sm/hover:shadow-lg
  // already occupy, and lost that composition in testing — outline is a separate
  // property, so it always paints regardless of the shadow utilities above.
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent " +
  "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-sm";

const variantClasses: Record<ButtonVariant, string> = {
  // text-background (not text-white): the accent token's luminance differs enough
  // between themes that a single fixed text color can't clear WCAG AA 4.5:1 in
  // both — --background is near-white in light mode / near-black in dark mode,
  // which happens to be exactly the contrast each theme's accent needs.
  primary: "bg-accent text-background",
  secondary: "bg-transparent border border-border text-foreground",
};

export default function Button({
  variant = "primary",
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = [baseClasses, variantClasses[variant], className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
