"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import CaseStudyOverlay from "./CaseStudyOverlay";
import { projects } from "@/lib/data";
import Skeleton from "./Skeleton";
import SkeletonWrapper from "./SkeletonWrapper";

export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="mb-2 font-mono text-sm uppercase tracking-widest text-accent-red">Projects</p>
        <h2 className="mb-12 text-3xl font-bold md:text-4xl">Things I&apos;ve Built</h2>
      </motion.div>

      <SkeletonWrapper
        skeleton={
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => <Skeleton key={item} variant="card" />)}
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              projectIndex={index}
              onOpen={setSelectedIndex}
            />
          ))}
        </div>
      </SkeletonWrapper>

      <CaseStudyOverlay
        projects={projects}
        selectedIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelect={setSelectedIndex}
      />
    </section>
  );
}
