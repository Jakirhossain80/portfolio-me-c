type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  className?: string;
};

export default function SectionHeading({ eyebrow, title, className }: SectionHeadingProps) {
  return (
    <div className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}>
      <span className="font-mono text-xs uppercase tracking-[0.06em] text-accent">
        {eyebrow}
      </span>
      <h2 className="text-3xl text-foreground">{title}</h2>
    </div>
  );
}
