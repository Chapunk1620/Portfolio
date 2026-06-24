"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects } from "@/lib/data";
import Skeleton from "./Skeleton";
import SkeletonWrapper from "./SkeletonWrapper";

export default function Projects() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="projects" className="py-16 md:py-24 px-6 max-w-6xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-accent-red font-mono text-sm mb-2 tracking-widest uppercase">
          Projects
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Things I&apos;ve Built
        </h2>
      </motion.div>

      <SkeletonWrapper
        skeleton={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} variant="card" />
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tech={project.tech}
              github={project.github}
              index={index}
              onClick={() => setSelectedIndex(index)}
            />
          ))}
        </div>
      </SkeletonWrapper>

      {selectedIndex !== null && (
        <ProjectModal
          project={projects[selectedIndex]}
          isOpen={selectedIndex !== null}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </section>
  );
}
