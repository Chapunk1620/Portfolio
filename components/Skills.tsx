"use client";

import { motion } from "framer-motion";
import { skills } from "@/lib/data";
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

  // AI Tools
  Ollama: SiOllama,
  Gemini: SiGooglegemini,
  "Claude Code": SiClaude,
  Antigravity: SiAnthropic,
  Pi: SiRobotframework,
  OpenCode: VscTerminalPowershell,
  ChatGPT: SiOpenai,

  // Automation Tools
  n8n: SiN8N,
};

const categoryTextColors: Record<string, string> = {
  Languages: "text-blue-400",
  Frontend: "text-green-400",
  Backend: "text-purple-400",
  Databases: "text-yellow-400",
  "DevOps & Tools": "text-cyan-400",
  "AI Tools": "text-fuchsia-400",
  "Automation": "text-orange-400",
};



const skillEntries = Object.entries(skills);

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-6 max-w-6xl mx-auto scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-accent-red font-mono text-sm mb-2 tracking-widest uppercase">
          Skills
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Tech Stack
        </h2>
      </motion.div>

      <SkeletonWrapper
        skeleton={
          <div className="space-y-8">
            {Object.keys(skills).map((category) => (
              <div key={category}>
                <Skeleton className="h-4 w-28 mb-3 rounded" />
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                  {skills[category as keyof typeof skills].map((_, i) => (
                    <Skeleton key={i} className="h-24 rounded-card" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        }
      >
        <div className="space-y-10">
          {skillEntries.map(([category, items], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.08 }}
            >
              <h3
                className={`text-xs font-semibold uppercase tracking-widest font-mono mb-4 ${
                  categoryTextColors[category] || "text-accent-red"
                }`}
              >
                {category}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                {items.map((skill, i) => {
                  const Icon = iconMap[skill];
                  return (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.35,
                        delay: catIndex * 0.08 + i * 0.04,
                        ease: "easeOut",
                      }}
                      className="group flex flex-col items-center justify-center gap-2.5 bg-dark-surface border border-transparent rounded-card py-6 px-3 cursor-default transition-all duration-300 hover:-translate-y-1 hover:border-accent-red/40 hover:shadow-[0_8px_24px_rgb(var(--color-accent-red)/0.12)]"
                    >
                      {Icon && (
                        <Icon className="text-4xl text-text-muted transition-colors duration-300 group-hover:text-accent-red" />
                      )}
                      <span className="text-xs font-mono text-text-primary text-center leading-tight">
                        {skill}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </SkeletonWrapper>
    </section>
  );
}
