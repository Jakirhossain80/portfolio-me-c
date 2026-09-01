import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import { skills } from "@/lib/data";
import type { SkillCategory } from "@/lib/types";

const skillsByCategory = skills.reduce<Record<string, string[]>>((groups, skill) => {
  (groups[skill.category] ??= []).push(skill.name);
  return groups;
}, {});

const categories = Object.keys(skillsByCategory) as SkillCategory[];

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="Skills" title="Technologies I work with" />
      </Reveal>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <Reveal key={category} delay={index * 90}>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.06em] text-accent">
                {category}
              </span>
              <div className="flex flex-wrap gap-2">
                {skillsByCategory[category].map((name) => (
                  <Badge key={name}>{name}</Badge>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
