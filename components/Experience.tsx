"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";

interface TimelineItemProps {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  index: number;
}

function TimelineItem({ company, role, period, achievements, index }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative pl-8 pb-12 border-l-2 border-accent-red/30 last:pb-0"
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-accent-red shadow-[0_0_10px_rgba(233,69,96,0.5)]" />

      <span className="text-xs text-text-muted font-mono">{period}</span>
      <h3 className="text-lg font-semibold mt-1">{role}</h3>
      <p className="text-accent-red text-sm font-medium mb-3">{company}</p>

      <ul className="space-y-2">
        {achievements.map((a, i) => (
          <li key={i} className="text-text-muted text-sm flex items-start gap-2">
            <span className="text-accent-red mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-red flex-shrink-0" />
            {a}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 px-6 bg-dark-surface/50 scroll-mt-20">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-accent-red font-mono text-sm mb-2 tracking-widest uppercase">
            Experience
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Where I&apos;ve Worked
          </h2>
        </motion.div>

        <div>
          {experiences.map((exp, index) => (
            <TimelineItem key={exp.company} {...exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
