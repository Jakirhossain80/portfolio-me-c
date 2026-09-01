import { profile } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "@/components/icons/SocialIcons";

const socialLinks = [
  { href: profile.githubUrl, label: "GitHub", Icon: GithubIcon },
  { href: profile.linkedinUrl, label: "LinkedIn", Icon: LinkedinIcon },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted">
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted">Built with Next.js &amp; Tailwind CSS</p>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="cursor-pointer text-muted transition-colors duration-200 hover:text-accent"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
