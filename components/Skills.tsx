"use client";

import { motion, useReducedMotion } from "framer-motion";
import { learningItems, skillCategoryDescriptions, skillMeta, skills } from "@/lib/data";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPhp,
  SiDotnet,
  SiReact,
  SiNextdotjs,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiLaravel,
  SiPostgresql,
  SiSqlite,
  SiMongodb,
  SiMysql,
  SiGit,
  SiDocker,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import { DiMsqlServer } from "react-icons/di";
import { VscDebugStart, VscTerminalPowershell } from "react-icons/vsc";
import {
  SiOllama,
  SiGooglegemini,
  SiClaude,
  SiAnthropic,
  SiOpenai,
  SiRobotframework,
  SiN8N,
} from "react-icons/si";
import type { IconType } from "react-icons";
import Skeleton from "./Skeleton";
import SkeletonWrapper from "./SkeletonWrapper";

const iconMap: Record<string, IconType> = {
  JavaScript: SiJavascript,
  Python: SiPython,
  Java: FaJava,
  TypeScript: SiTypescript,
  "C#": SiDotnet,
  PHP: SiPhp,
  React: SiReact,
  "Next.js": SiNextdotjs,
  HTML: SiHtml5,
  CSS: SiCss,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  Django: SiDjango,
  Laravel: SiLaravel,
  PostgreSQL: SiPostgresql,
  SQLite: SiSqlite,
  MongoDB: SiMongodb,
  "SQL Server": DiMsqlServer,
  MySQL: SiMysql,
  Git: SiGit,
  Docker: SiDocker,
  AWS: FaAws,
  "CI/CD": VscDebugStart,
  Ollama: SiOllama,
  Gemini: SiGooglegemini,
  "Claude Code": SiClaude,
  Antigravity: SiAnthropic,
  Pi: SiRobotframework,
  OpenCode: VscTerminalPowershell,
  ChatGPT: SiOpenai,
  n8n: SiN8N,
};

const categoryTextColors: Record<string, string> = {
  Languages: "text-blue-400",
  Frontend: "text-green-400",
  Backend: "text-purple-400",
  Databases: "text-yellow-400",
  "DevOps & Tools": "text-cyan-400",
  "AI Tools": "text-fuchsia-400",
  Automation: "text-orange-400",
};

const primaryCategories = Object.entries(skills).filter(([category]) => !["AI Tools", "Automation"].includes(category));
const toolCategories = Object.entries(skills).filter(([category]) => ["AI Tools", "Automation"].includes(category));

function SkillCard({ skill, category, index, reducedMotion }: { skill: string; category: string; index: number; reducedMotion: boolean }) {
  const Icon = iconMap[skill];
  const meta = skillMeta[skill];
  const proficiency = meta?.proficiency ?? "Familiar";

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : index * 0.025 }}
      className="group rounded-card border border-text-muted/20 bg-dark-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-red/45 hover:shadow-[0_8px_24px_rgb(var(--color-accent-red)/0.1)]"
    >
      <div className="flex items-start justify-between gap-2">
        {Icon ? <Icon aria-hidden="true" className="text-3xl text-text-muted transition-colors group-hover:text-accent-red" /> : <span aria-hidden="true" className="h-8 w-8" />}
        <span className="rounded-full bg-accent-red/10 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-accent-red">
          {proficiency}
        </span>
      </div>
      <p className="mt-4 text-sm font-medium text-text-primary">{skill}</p>
      {meta && meta.projects > 0 && (
        <p className="mt-1 font-mono text-[10px] text-text-muted">{meta.projects} {meta.projects === 1 ? "project" : "projects"}</p>
      )}
      <p className="mt-3 h-1 overflow-hidden rounded-full bg-text-muted/15">
        <span className={`block h-full rounded-full ${proficiency === "Daily Driver" ? "w-full" : proficiency === "Proficient" ? "w-3/4" : "w-2/5"} bg-accent-red/70`} />
      </p>
      <span className="sr-only">Category: {category}</span>
    </motion.div>
  );
}

function CategoryGroup({ category, items, groupIndex, reducedMotion }: { category: string; items: string[]; groupIndex: number; reducedMotion: boolean }) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : groupIndex * 0.06 }}
    >
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className={`font-mono text-xs font-semibold uppercase tracking-widest ${categoryTextColors[category] || "text-accent-red"}`}>
          {category}
        </h3>
        <p className="text-xs text-text-muted">{skillCategoryDescriptions[category] || "Tools I use to build"}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((skill, index) => <SkillCard key={skill} skill={skill} category={category} index={index} reducedMotion={reducedMotion} />)}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const reducedMotion = useReducedMotion() ?? false;

  return (
    <section id="skills" className="scroll-mt-20 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}>
          <p className="mb-2 font-mono text-sm uppercase tracking-widest text-accent-red">Skills</p>
          <h2 className="text-3xl font-bold md:text-4xl">Tech Arsenal</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">A practical stack shaped by shipping internal systems, workflow tools, and interfaces that people rely on every day.</p>
        </motion.div>

        <SkeletonWrapper
          skeleton={
            <div className="mt-12 space-y-8">
              {Object.keys(skills).map((category) => (
                <div key={category}><Skeleton className="mb-3 h-4 w-28 rounded" /><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{skills[category as keyof typeof skills].map((_, i) => <Skeleton key={i} className="h-32 rounded-card" />)}</div></div>
              ))}
            </div>
          }
        >
          <div className="mt-12 space-y-10">
            {primaryCategories.map(([category, items], index) => <CategoryGroup key={category} category={category} items={items} groupIndex={index} reducedMotion={reducedMotion} />)}

            <div className="rounded-card border border-accent-red/30 bg-accent-red/5 p-5 md:p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent-red">Workflow layer</p>
                  <h3 className="mt-1 text-xl font-semibold">Tools I Ship With</h3>
                </div>
                <p className="max-w-md text-sm text-text-muted">AI and automation tools that help me explore, prototype, and remove repetition from delivery.</p>
              </div>
              <div className="mt-6 space-y-8">
                {toolCategories.map(([category, items], index) => <CategoryGroup key={category} category={category} items={items} groupIndex={index} reducedMotion={reducedMotion} />)}
              </div>
            </div>

            <div className="border-y border-dashed border-text-muted/35 py-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-accent-red">Next up</p>
                  <h3 className="mt-1 text-lg font-semibold">Currently Learning</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {learningItems.map((item) => <span key={item} className="rounded-full border border-dashed border-accent-red/60 px-3 py-1.5 text-xs text-text-primary">{item}</span>)}
                </div>
              </div>
            </div>
          </div>
        </SkeletonWrapper>
      </div>
    </section>
  );
}
