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
import { VscDebugStart } from "react-icons/vsc";
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
};

const categoryColors: Record<string, string> = {
  Languages: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Frontend: "bg-green-500/10 text-green-400 border-green-500/20",
  Backend: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Databases: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "DevOps & Tools": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

const proficiencies: Record<string, number> = {
  Languages: 90,
  Frontend: 95,
  Backend: 85,
  Databases: 80,
  "DevOps & Tools": 75,
};

const barColors: Record<string, string> = {
  Languages: "bg-blue-500",
  Frontend: "bg-green-500",
  Backend: "bg-purple-500",
  Databases: "bg-yellow-500",
  "DevOps & Tools": "bg-cyan-500",
};

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-48 rounded-card" />
            ))}
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, items], catIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="bg-dark-surface rounded-card p-6"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">
                  {category}
                </h3>
                <span className="text-xs font-mono text-text-muted">{proficiencies[category]}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-dark mb-5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${proficiencies[category]}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                  className={`h-full rounded-full ${barColors[category]}`}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => {
                  const Icon = iconMap[skill];
                  return (
                    <span
                      key={skill}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-full border transition-all duration-300 hover:scale-105 cursor-default ${
                        categoryColors[category] || "bg-accent-red/10 text-accent-red border-accent-red/20"
                      }`}
                    >
                      {Icon && <Icon className="text-sm" />}
                      {skill}
                    </span>
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
