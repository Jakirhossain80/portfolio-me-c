import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/types";

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="flex h-full flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition duration-200 ease-out hover:-translate-y-1 hover:border-accent hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg text-foreground">{project.name}</h3>
        <div className="flex shrink-0 items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} live site`}
              className="cursor-pointer text-muted transition-colors duration-200 hover:text-accent"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.name} repository`}
            className="cursor-pointer text-muted transition-colors duration-200 hover:text-accent"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
        </div>
      </div>

      <p className="text-sm text-muted">{project.description}</p>

      <ul className="flex flex-col gap-2">
        {project.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2 text-sm text-muted">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-2 pt-2">
        {project.stack.map((item) => (
          <Badge key={item}>{item}</Badge>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-20">
      <Reveal>
        <SectionHeading eyebrow="Projects" title="Things I've built" />
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 90} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
