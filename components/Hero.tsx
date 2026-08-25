"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import Skeleton from "./Skeleton";
import SkeletonWrapper from "./SkeletonWrapper";

const ParticleBackground = dynamic(() => import("./ParticleBackground"), { ssr: false });

const impactStatements = [
  "replace manual workflows",
  "scale to real-world needs",
  "turn messy processes into products",
  "ship on time, every time",
];

const codeSample = `async function handleRequest(req: Request) {
  const data = await validateInput(req.body);
  const result = await processWorkflow(data);
  return Response.json({ success: true, result });
}`;

function CountUp({ end, suffix = "", reducedMotion = false }: { end: number; suffix?: string; reducedMotion?: boolean }) {
  const [count, setCount] = useState(reducedMotion ? end : 0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(end / (duration / 16));
    const timer = window.setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        window.clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => window.clearInterval(timer);
  }, [end, reducedMotion]);

  return <>{count}{suffix}</>;
}

function RotatingImpactStatement({ statements }: { statements: string[] }) {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % statements.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion, statements.length]);

  return (
    <motion.span
      key={statements[index]}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.35 }}
      className="inline-block text-accent-red"
    >
      {statements[index]}
    </motion.span>
  );
}

function CodeSnippet() {
  const [displayed, setDisplayed] = useState("");
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(codeSample);
      return;
    }

    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setDisplayed(codeSample.slice(0, index));
      if (index >= codeSample.length) window.clearInterval(timer);
    }, 24);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  return (
    <pre
      aria-label="Example TypeScript request handler"
      className="hero-code mt-8 mx-auto max-w-2xl overflow-x-auto rounded-card border border-text-muted/20 bg-dark-surface/80 p-4 text-left text-xs leading-relaxed text-text-muted shadow-xl backdrop-blur-sm sm:text-sm"
    >
      <code>{displayed}{!prefersReducedMotion && <span className="animate-pulse text-accent-red" aria-hidden="true">▋</span>}</code>
    </pre>
  );
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion={prefersReducedMotion ? "always" : "never"}>
      <section className="relative min-h-screen overflow-hidden px-6 py-32 sm:py-36">
      <ParticleBackground />

      <SkeletonWrapper
        skeleton={
          <div className="mx-auto max-w-4xl px-6 text-center">
            <Skeleton className="mx-auto mb-6 h-3 w-24" />
            <Skeleton className="mx-auto mb-6 h-12 w-3/4" />
            <Skeleton className="mx-auto mb-4 h-6 w-1/2" />
            <Skeleton className="mx-auto mb-10 h-4 w-2/3" />
            <div className="flex justify-center gap-4">
              <Skeleton className="h-11 w-32 rounded-button" />
              <Skeleton className="h-11 w-32 rounded-button" />
            </div>
          </div>
        }
      >
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 font-mono text-sm uppercase tracking-widest text-accent-red"
          >
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mb-6 font-mono text-xl text-text-muted md:text-2xl"
          >
            <span className="text-accent-red">&lt;</span> {personalInfo.title} <span className="text-accent-red">/&gt;</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-4 text-2xl font-semibold sm:text-3xl"
          >
            I build systems that <RotatingImpactStatement statements={impactStatements} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mx-auto mb-6 max-w-xl text-text-muted"
          >
            {personalInfo.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent-red/30 bg-accent-red/10 px-4 py-2 text-sm text-text-primary"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden="true" />
            {personalInfo.availability}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a href="#projects" className="animate-pulse-glow rounded-button bg-accent-red px-8 py-3 font-medium text-white transition-all duration-300 hover:bg-accent-red/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-dark">
              View My Work
            </a>
            <a href="/resume.pdf" download className="rounded-button border border-text-muted/30 px-8 py-3 font-medium text-text-primary transition-all duration-300 hover:border-accent-red hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-dark">
              Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
          >
            <CodeSnippet />
          </motion.div>
        </div>
      </SkeletonWrapper>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="relative z-10 mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-14"
      >
        {[
          { label: "Projects", value: 5 },
          { label: "Experience", value: "2+", suffix: " yrs" },
          { label: "Tech Stack", value: 20, suffix: "+" },
          { label: "Kaizen Win", value: "1" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="font-mono text-2xl font-bold text-accent-red md:text-3xl">
              {typeof stat.value === "number" ? <CountUp end={stat.value} suffix={stat.suffix || ""} reducedMotion={Boolean(prefersReducedMotion)} /> : `${stat.value}${stat.suffix || ""}`}
            </div>
            <div className="mt-1 text-xs uppercase tracking-wider text-text-muted">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
          transition={prefersReducedMotion ? undefined : { duration: 2, repeat: Infinity }}
          className="text-2xl text-text-muted"
          aria-hidden="true"
        >
          ↓
        </motion.div>
      </motion.div>
      </section>
    </MotionConfig>
  );
}
