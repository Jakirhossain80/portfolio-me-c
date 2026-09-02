import Button from "@/components/ui/Button";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import TracedButton from "@/components/ui/TracedButton";
import { profile } from "@/lib/data";

export default function Hero() {
  return (
    <section
      id="hero"
      className="mx-auto flex min-h-[85svh] max-w-3xl flex-col items-center justify-center gap-6 px-6 py-20 text-center"
    >
      <div className="hero-reveal hero-reveal-1 flex flex-col items-center gap-4">
        <ImageWithFallback
          src={profile.photoUrl}
          alt={profile.name}
          width={128}
          height={128}
          priority
          className="h-32 w-32 rounded-full border border-border object-cover"
        />
        <span className="font-mono text-xs uppercase tracking-[0.06em] text-accent">
          Hi, I&apos;m
        </span>
      </div>

      <h1 className="hero-reveal hero-reveal-2 text-4xl text-foreground">{profile.name}</h1>

      <div className="hero-reveal hero-reveal-3 flex flex-col items-center gap-4">
        <h2 className="text-xl text-accent">{profile.title}</h2>
        <p className="text-muted">{profile.summary}</p>
      </div>

      <div className="hero-reveal hero-reveal-4 flex flex-wrap items-center justify-center gap-4">
        <Button href="#projects" variant="primary">
          View my work
        </Button>
        <Button href="#contact" variant="secondary">
          Get in touch
        </Button>
        <TracedButton
          href={profile.resumeUrl}
          className="!px-4 !py-2 !text-xs !text-muted hover:!text-accent hover:!shadow-none"
        >
          Resume
        </TracedButton>
      </div>
    </section>
  );
}
