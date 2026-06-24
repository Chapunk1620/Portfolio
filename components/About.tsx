"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import Skeleton from "./Skeleton";
import SkeletonWrapper from "./SkeletonWrapper";

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-6 max-w-4xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-accent-red font-mono text-sm mb-2 tracking-widest uppercase">
          About
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          A Bit About Me
        </h2>
      </motion.div>

      <SkeletonWrapper
        skeleton={
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <Skeleton variant="text" />
              <div className="flex gap-3 mt-6">
                <Skeleton className="h-11 w-36 rounded-button" />
                <Skeleton className="h-11 w-24 rounded-button" />
              </div>
            </div>
            <div>
              <Skeleton className="h-64 rounded-card" />
            </div>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-text-muted leading-relaxed mb-4">
              I&apos;m a results-driven full-stack developer with experience building
              scalable web applications. I specialize in JavaScript/TypeScript
              ecosystems — React, Next.js, Node.js — and have strong backend
              skills in Laravel, Django, and database design.
            </p>
            <p className="text-text-muted leading-relaxed mb-6">
              I&apos;m passionate about solving real-world problems through clean,
              efficient code and have shipped production systems for employee
              workflows, asset management, POS, and bill of materials tracking.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-red text-white rounded-button font-medium hover:bg-accent-red/90 transition-all duration-300 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Resume
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-text-muted/30 text-text-primary rounded-button font-medium hover:border-accent-red hover:text-accent-red transition-all duration-300 text-sm"
              >
                Hire Me
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-dark-surface rounded-card p-8 text-center"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-accent-red/10 flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-accent-red">
                {personalInfo.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <h3 className="font-semibold text-lg">{personalInfo.name}</h3>
            <p className="text-text-muted text-sm mb-4">{personalInfo.title}</p>
            <div className="flex justify-center gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent-red transition-colors"
              >
                GitHub
              </a>
              <span className="text-text-muted">·</span>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-accent-red transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </SkeletonWrapper>
    </section>
  );
}
