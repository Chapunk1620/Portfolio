"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ProjectCaseStudy } from "@/lib/data";
import ProjectImage from "./ProjectImage";

export type CaseStudyOverlayProps = {
  projects: ProjectCaseStudy[];
  selectedIndex: number | null;
  onClose: () => void;
  onSelect: (index: number) => void;
};

function GitHubIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function CaseStudyOverlay({ projects, selectedIndex, onClose, onSelect }: CaseStudyOverlayProps) {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const project = selectedIndex === null ? null : projects[selectedIndex];

  useEffect(() => {
    if (!project) return;
    previousActiveElement.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable?.length) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }
      }
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        onSelect((selectedIndex! - 1 + projects.length) % projects.length);
      }
      if (event.key === "ArrowRight") {
        onSelect((selectedIndex! + 1) % projects.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousActiveElement.current?.focus();
    };
  }, [onClose, onSelect, project, projects.length, selectedIndex]);

  useEffect(() => setGalleryIndex(0), [selectedIndex]);

  const screenshots = project?.screenshots?.length ? project.screenshots : project ? [project.screenshot] : [];
  const moveProject = (direction: -1 | 1) => {
    if (selectedIndex === null) return;
    onSelect((selectedIndex + direction + projects.length) % projects.length);
  };

  return (
    <AnimatePresence>
      {project && selectedIndex !== null && (
        <motion.div
          key="case-study-backdrop"
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/80 px-4 py-6 backdrop-blur-sm md:px-8 md:py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
            className="mx-auto min-h-full max-w-6xl overflow-hidden rounded-card bg-dark-surface shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
          >
            <div className="relative aspect-[16/7] min-h-56 overflow-hidden">
              <ProjectImage
                src={project.screenshot}
                alt={`${project.title} case study hero preview`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-dark/30 to-transparent" />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="absolute right-4 top-4 rounded-full bg-dark/75 px-4 py-2 text-sm text-white backdrop-blur transition-colors hover:bg-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red"
                aria-label="Close case study"
              >
                <span aria-hidden="true">✕</span>
              </button>
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
                <span className="mb-3 inline-flex rounded-full border border-accent-red/40 bg-dark/70 px-3 py-1 text-xs font-medium text-accent-red backdrop-blur">
                  {project.role}
                </span>
                <h2 id="case-study-title" className="max-w-3xl text-3xl font-bold text-white md:text-5xl">{project.title}</h2>
                <p className="mt-3 max-w-2xl text-sm text-white/80 md:text-base">{project.impact}</p>
              </div>
            </div>

            <div className="space-y-12 p-6 md:p-10">
              <div className="grid gap-6 md:grid-cols-2">
                <section>
                  <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-red">01 / Problem</p>
                  <p className="leading-relaxed text-text-muted">{project.problem}</p>
                </section>
                <section>
                  <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent-red">02 / Approach</p>
                  <p className="leading-relaxed text-text-muted">{project.approach}</p>
                </section>
              </div>

              <section>
                <p className="mb-5 font-mono text-xs uppercase tracking-widest text-accent-red">03 / Architecture</p>
                <div className="overflow-x-auto pb-3">
                  <div className="flex min-w-max items-center gap-3">
                    {project.architecture.nodes.map((node, index) => (
                      <div key={node} className="flex items-center gap-3">
                        <div className="rounded-xl border border-accent-red/30 bg-accent-red/10 px-5 py-4 text-center text-sm font-medium text-text-primary">
                          {node}
                        </div>
                        {index < project.architecture.nodes.length - 1 && <span className="text-xl text-accent-red" aria-hidden="true">→</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section>
                <p className="mb-5 font-mono text-xs uppercase tracking-widest text-accent-red">04 / Features</p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {project.features.map((feature) => (
                    <article key={feature.title} className="rounded-xl border border-text-primary/10 bg-dark/20 p-5">
                      <span className="text-2xl" aria-hidden="true">{feature.icon}</span>
                      <h3 className="mt-4 font-semibold">{feature.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-muted">{feature.description}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section>
                <p className="mb-5 font-mono text-xs uppercase tracking-widest text-accent-red">05 / Results</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="rounded-xl border border-accent-red/20 bg-accent-red/5 p-5">
                      <p className="text-2xl font-bold text-accent-red">{metric.value}</p>
                      <p className="mt-1 text-sm text-text-muted">{metric.label}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-accent-red">06 / Screenshots</p>
                    <h3 className="mt-2 text-xl font-semibold">Inside the build</h3>
                  </div>
                  {screenshots.length > 1 && <span className="text-sm text-text-muted">{galleryIndex + 1} / {screenshots.length}</span>}
                </div>
                <div className="relative overflow-hidden rounded-xl border border-text-primary/10">
                  <ProjectImage
                    src={screenshots[galleryIndex]}
                    alt={`${project.title} screenshot ${galleryIndex + 1} of ${screenshots.length}`}
                    width={1400}
                    height={850}
                    className="h-auto max-h-[32rem] w-full object-cover"
                  />
                </div>
                {screenshots.length > 1 && (
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                    {screenshots.map((screenshot, index) => (
                      <button
                        type="button"
                        key={screenshot}
                        onClick={() => setGalleryIndex(index)}
                        className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${index === galleryIndex ? "border-accent-red" : "border-transparent"} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red`}
                        aria-label={`Show screenshot ${index + 1}`}
                        aria-pressed={index === galleryIndex}
                      >
                        <ProjectImage
                          src={screenshot}
                          alt={`${project.title} screenshot thumbnail ${index + 1} of ${screenshots.length}`}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </section>

              <div className="flex flex-wrap items-center gap-3 border-t border-text-primary/10 pt-8">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-accent-red px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-red/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red">
                    <GitHubIcon /> View source
                  </a>
                )}
                {project.liveDemo && (
                  <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="rounded-full border border-text-primary/20 px-5 py-3 text-sm font-medium transition-colors hover:border-accent-red hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red">View live demo</a>
                )}
                <div className="ml-auto flex items-center gap-2">
                  <button type="button" onClick={() => moveProject(-1)} className="rounded-full border border-text-primary/20 px-4 py-2 text-sm transition-colors hover:border-accent-red hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red" aria-label="Previous case study">← Previous</button>
                  <button type="button" onClick={() => moveProject(1)} className="rounded-full border border-text-primary/20 px-4 py-2 text-sm transition-colors hover:border-accent-red hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red" aria-label="Next case study">Next →</button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
