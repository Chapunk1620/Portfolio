"use client";

import { motion, useReducedMotion } from "framer-motion";
import { personalInfo } from "@/lib/data";

const philosophyCards = [
  {
    icon: "🔨",
    title: "Ship, Then Iterate",
    description: "Bias toward shipping working software, then improving it based on real feedback.",
  },
  {
    icon: "🏗️",
    title: "Full-Stack Means Full Ownership",
    description: "From database schema to deployment pipeline, I take ownership of the entire stack.",
  },
  {
    icon: "🏆",
    title: "Kaizen Winner",
    description: "Built an application that won my company's continuous improvement competition.",
  },
  {
    icon: "🤖",
    title: "AI-Augmented Developer",
    description: "I use AI tools and automation to multiply my output and ship faster.",
  },
];

export default function BentoGrid() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {philosophyCards.map((card, index) => (
        <motion.article
          key={card.title}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.45, delay: index * 0.08 }}
          className={`rounded-card border border-text-muted/10 bg-dark-surface/70 p-6 backdrop-blur-sm hover:border-accent-red/30 ${
            prefersReducedMotion ? "" : "transition-transform duration-300 hover:-translate-y-1"
          }`}
        >
          <div className="mb-4 text-2xl" aria-hidden="true">{card.icon}</div>
          <h3 className="mb-2 text-lg font-semibold">{card.title}</h3>
          <p className="text-sm leading-relaxed text-text-muted">{card.title === "Kaizen Winner" ? "Built an application that won my company's continuous improvement competition." : card.title === "AI-Augmented Developer" ? `I use AI tools like Claude, Pi, and n8n to multiply my output and ship faster. ${personalInfo.currentFocus ? `Currently: ${personalInfo.currentFocus}.` : ""}` : card.description}</p>
        </motion.article>
      ))}
    </div>
  );
}
