"use client";

import { motion } from "framer-motion";
import { useTilt } from "./useTilt";
import type { ProjectCaseStudy } from "@/lib/data";
import ProjectImage from "./ProjectImage";

interface ProjectCardProps {
  project: ProjectCaseStudy;
  projectIndex: number;
  onOpen: (projectIndex: number) => void;
}

function GitHubIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function ProjectCard({ project, projectIndex, onOpen }: ProjectCardProps) {
  const tilt = useTilt(8);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: projectIndex * 0.1 }}
      className="group relative overflow-hidden rounded-card border border-transparent bg-dark-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent-red/30 hover:shadow-[0_0_30px_rgba(233,69,96,0.15)]"
      style={{ transition: "transform 0.15s ease-out" }}
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <button
          type="button"
          onClick={() => onOpen(projectIndex)}
          className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent-red"
          aria-label={`Open case study for ${project.title}`}
        >
          <ProjectImage
            src={project.screenshot}
            alt={`${project.title} project preview`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-dark-surface via-dark-surface/10 to-transparent" />
        <span className="pointer-events-none absolute left-4 top-4 z-20 rounded-full border border-white/20 bg-dark/75 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {project.role}
        </span>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="absolute right-4 top-4 z-20 rounded-full border border-white/20 bg-dark/75 p-2 text-white backdrop-blur-sm transition-colors hover:bg-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red"
            aria-label={`View ${project.title} on GitHub`}
          >
            <GitHubIcon />
          </a>
        )}
      </div>

      <div className="p-6">
        <button
          type="button"
          onClick={() => onOpen(projectIndex)}
          className="block w-full rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-4 focus-visible:ring-offset-dark-surface"
          aria-label={`Open case study for ${project.title}`}
        >
          <div className="mb-3 flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold transition-colors group-hover:text-accent-red">
              {project.title}
            </h3>
            <span className="shrink-0 font-mono text-sm text-accent-red">0{projectIndex + 1}</span>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-text-muted">{project.description}</p>
          <p className="mb-4 border-l-2 border-accent-red pl-3 text-sm font-medium text-text-primary">
            {project.impact}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((technology) => (
              <span
                key={technology}
                className="rounded-full bg-accent-red/10 px-3 py-1 font-mono text-xs text-accent-red"
              >
                {technology}
              </span>
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent-red">
            Explore case study <span aria-hidden="true">→</span>
          </span>
        </button>
      </div>
    </motion.article>
  );
}
