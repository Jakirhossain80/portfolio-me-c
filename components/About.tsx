import { MapPin } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { profile } from "@/lib/data";

export default function About() {
  const [firstParagraph, ...rest] = profile.summary.split(". ");
  const secondParagraph = rest.join(". ");

  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="About Me" title="A bit about my background" />
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-[1.6fr_1fr]">
        <Reveal delay={0} className="max-w-[65ch]">
          <div className="flex flex-col gap-4 text-muted">
            <p>{firstParagraph}.</p>
            {secondParagraph && <p>{secondParagraph}</p>}
          </div>
        </Reveal>

        <Reveal delay={90}>
          <aside className="flex flex-col gap-5 rounded-xl border border-border bg-surface p-6">
            <div className="flex items-center gap-2 text-sm text-foreground">
              <MapPin className="h-4 w-4 text-accent" />
              <span>{profile.location}</span>
            </div>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.06em] text-accent">
                Focus Areas
              </span>
              <ul className="flex flex-col gap-2">
                {profile.focusAreas.map((area) => (
                  <li key={area} className="text-sm text-muted">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
