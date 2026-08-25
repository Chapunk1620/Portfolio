"use client";

import { motion, useReducedMotion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import BentoGrid from "./BentoGrid";
import Skeleton from "./Skeleton";
import SkeletonWrapper from "./SkeletonWrapper";

export default function About() {
  const initials = personalInfo.name.split(" ").map((name) => name[0]).join("");
  const prefersReducedMotion = useReducedMotion();
  const reveal = (hidden: { opacity: number; x?: number; y?: number }, transition: { duration: number; delay?: number }) => ({
    initial: prefersReducedMotion ? false : hidden,
    whileInView: prefersReducedMotion ? undefined : { opacity: 1, x: 0, y: 0 },
    viewport: { once: true },
    transition: prefersReducedMotion ? { duration: 0 } : transition,
  });

  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:py-24">
      <motion.div
        {...reveal({ opacity: 0, y: 20 }, { duration: 0.5 })}
      >
        <p className="mb-2 font-mono text-sm uppercase tracking-widest text-accent-red">About</p>
        <h2 className="mb-8 text-3xl font-bold md:text-4xl">Who I Am</h2>
      </motion.div>

      <SkeletonWrapper
        skeleton={
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(260px,0.8fr)_1.4fr]">
            <Skeleton className="h-80 rounded-card" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Skeleton className="h-48 rounded-card" />
              <Skeleton className="h-48 rounded-card" />
            </div>
          </div>
        }
      >
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(260px,0.8fr)_1.4fr]">
          <motion.article
            {...reveal({ opacity: 0, x: -20 }, { duration: 0.5, delay: 0.1 })}
            className="rounded-card border border-white/10 bg-dark-surface/60 p-8 shadow-xl backdrop-blur-md"
          >
            <div className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-accent-red/10 ring-1 ring-accent-red/30">
              <span className="text-3xl font-bold text-accent-red">{initials}</span>
            </div>
            <h3 className="text-xl font-semibold">{personalInfo.name}</h3>
            <p className="mt-1 text-sm text-accent-red">{personalInfo.title}</p>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">Currently building at M.A Technology · Philippines</p>
            <p className="mt-5 border-l-2 border-accent-red/60 pl-3 text-sm leading-relaxed text-text-muted">
              <span className="font-medium text-text-primary">What I&apos;m working on:</span> {personalInfo.currentFocus}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="rounded-sm text-text-muted transition-colors hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red">GitHub</a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-sm text-text-muted transition-colors hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red">LinkedIn</a>
              <a href={`mailto:${personalInfo.email}`} className="rounded-sm text-text-muted transition-colors hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red">Email</a>
            </div>
          </motion.article>

          <div>
            <motion.div
              {...reveal({ opacity: 0, x: 20 }, { duration: 0.5, delay: 0.15 })}
              className="mb-6 max-w-2xl"
            >
              <p className="leading-relaxed text-text-muted">
                I&apos;m a results-driven full-stack developer with experience building scalable web applications. I specialize in JavaScript and TypeScript ecosystems — React, Next.js, and Node.js — with strong backend skills in Laravel, Django, and database design.
              </p>
              <p className="mt-4 leading-relaxed text-text-muted">
                I&apos;m passionate about solving real-world problems through clean, efficient code and have shipped production systems for employee workflows, asset management, POS, and bill of materials tracking.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/resume.pdf" download className="inline-flex items-center gap-2 rounded-button bg-accent-red px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-red/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-dark">Download Resume</a>
                <a href={`mailto:${personalInfo.email}`} className="inline-flex items-center gap-2 rounded-button border border-text-muted/30 px-5 py-2.5 text-sm font-medium text-text-primary transition-all duration-300 hover:border-accent-red hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-dark">Hire Me</a>
              </div>
            </motion.div>
            <BentoGrid />
          </div>
        </div>
      </SkeletonWrapper>
    </section>
  );
}
