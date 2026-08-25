import { personalInfo } from "@/lib/data";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const builtWith = ["Next.js", "Tailwind CSS", "Framer Motion", "Three.js", "TypeScript"];

export default function Footer() {
  return (
    <footer className="border-t border-dark-surface bg-dark px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr] md:items-start">
          <div>
            <a href="#" className="inline-flex rounded-sm text-xl font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red" aria-label="Back to top">
              <span className="text-accent-red">&lt;</span>J<span className="text-accent-red">/</span>
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-muted">Full-stack developer building useful systems with thoughtful interfaces.</p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-text-muted md:justify-center">
              {navLinks.map((link) => (
                <li key={link.href}><a href={link.href} className="rounded-sm transition-colors hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red">{link.label}</a></li>
              ))}
              <li><a href="/resume.pdf" download className="rounded-sm transition-colors hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red">Resume ↧</a></li>
            </ul>
          </nav>

          <div className="flex gap-3 md:justify-end">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="footer-social">GH</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social">in</a>
            <a href={`mailto:${personalInfo.email}`} aria-label="Email" className="footer-social">@</a>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-dark-surface pt-6 text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2" aria-label="Built with">
            <span className="mr-1 font-mono text-accent-red">Built with</span>
            {builtWith.map((technology) => <span key={technology} className="rounded-full border border-dark-mid/40 px-2.5 py-1">{technology}</span>)}
          </div>
          <p>© {new Date().getFullYear()} {personalInfo.name}</p>
        </div>
        <p className="mt-5 text-center font-mono text-xs text-text-muted/70">Designed &amp; built by me. No templates were harmed.</p>
      </div>
    </footer>
  );
}
