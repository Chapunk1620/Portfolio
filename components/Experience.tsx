"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { experiences } from "@/lib/data";
import Skeleton from "./Skeleton";
import SkeletonWrapper from "./SkeletonWrapper";

function CountUp({ value, suffix = "", reducedMotion }: { value: number; suffix?: string; reducedMotion: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  const [count, setCount] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (!isInView) return;
    if (reducedMotion) {
      setCount(value);
      return;
    }

    const duration = 900;
    const startedAt = performance.now();
    let frame = 0;

    const update = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setCount(Math.round(progress * value));
      if (progress < 1) frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isInView, reducedMotion, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function TimelineItem({
  company,
  role,
  period,
  achievements,
  tech,
  highlight,
  index,
}: (typeof experiences)[number] & { index: number }) {
  const [expanded, setExpanded] = useState(false);
  const reducedMotion = useReducedMotion() ?? false;
  const initial = company.charAt(0).toUpperCase();
  const durationWidth = index === 0 ? "100%" : "58%";

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, x: -24 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : index * 0.15 }}
      className="relative border-l-2 border-accent-red/60 pl-8 pb-10 last:pb-0 md:pl-10"
    >
      <div
        aria-hidden="true"
        className="absolute -left-[13px] top-7 flex h-6 w-6 items-center justify-center rounded-full border-4 border-dark bg-accent-red shadow-[0_0_0_4px_rgb(var(--color-accent-red)/0.15)]"
      />

      <div className="rounded-card border border-text-muted/20 bg-dark-surface/90 p-5 shadow-[0_12px_36px_rgb(0_0_0/0.08)] transition-shadow hover:shadow-[0_16px_42px_rgb(var(--color-accent-red)/0.1)] md:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-red/10 font-mono text-lg font-bold text-accent-red"
            >
              {initial}
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-text-muted">{period}</p>
              <h3 className="mt-1 text-xl font-semibold text-text-primary">{role}</h3>
              <p className="mt-1 text-sm font-medium text-accent-red">{company}</p>
            </div>
          </div>
          <span className="w-fit rounded-full border border-accent-red/25 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-accent-red">
            Experience {experiences.length - index}
          </span>
        </div>

        <div className="mt-6 rounded-xl border-l-2 border-accent-red bg-accent-red/5 px-4 py-3">
          <p className="text-sm leading-relaxed text-text-primary">{highlight}</p>
        </div>

        <div className="mt-5" aria-label={`${company} timeline duration`}>
          <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-text-muted">
            <span>Timeline</span>
            <span>{index === 0 ? "Current" : "Previous role"}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-text-muted/15">
            <motion.div
              initial={{ width: reducedMotion ? durationWidth : 0 }}
              whileInView={reducedMotion ? undefined : { width: durationWidth }}
              viewport={{ once: true }}
              transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : index * 0.15 + 0.2 }}
              className="h-full rounded-full bg-accent-red"
            />
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-text-muted/20 px-2.5 py-1 font-mono text-[11px] text-text-muted"
            >
              {item}
            </span>
          ))}
        </div>

        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded((current) => !current)}
          className="mt-6 inline-flex items-center gap-2 rounded-button border border-text-muted/25 px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent-red hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
        >
          {expanded ? "Hide details" : "View achievements"}
          <span aria-hidden="true" className={`transition-transform ${expanded ? "rotate-180" : ""}`}>
            ↓
          </span>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.ul
              initial={reducedMotion ? false : { height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 20 }}
              exit={reducedMotion ? { opacity: 1, height: "auto", marginTop: 20 } : { height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.25 }}
              className="space-y-3 overflow-hidden border-t border-text-muted/15 pt-5"
            >
              {achievements.filter((achievement) => achievement !== highlight).map((achievement) => (
                <li key={achievement} className="flex items-start gap-3 text-sm leading-relaxed text-text-muted">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-red" />
                  <span>{achievement}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const reducedMotion = useReducedMotion() ?? false;
  const stats = [
    { value: 2, suffix: "+", label: "Years Experience" },
    { value: 2, label: "Companies" },
    { value: 10, suffix: "+", label: "Systems Shipped" },
    { value: 1, label: "Kaizen Winner" },
  ];

  return (
    <section id="experience" className="scroll-mt-20 bg-dark-surface/50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reducedMotion ? 0 : 0.5 }}
        >
          <p className="mb-2 font-mono text-sm uppercase tracking-widest text-accent-red">Experience</p>
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">Where I&apos;ve Worked</h2>
        </motion.div>

        <div className="mb-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4" aria-label="Career highlights">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-card border border-text-muted/20 bg-dark-surface p-4 md:p-5">
              <p className="text-lg font-bold text-accent-red md:text-xl">
                <CountUp value={stat.value} suffix={stat.suffix} reducedMotion={reducedMotion} /> {stat.label}
              </p>
            </div>
          ))}
        </div>

        <SkeletonWrapper
          skeleton={
            <div className="space-y-8">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-4">
                  <Skeleton className="mt-1 h-5 w-5 shrink-0 rounded-full" />
                  <div className="flex-1 rounded-card border border-text-muted/20 p-6">
                    <Skeleton className="mb-2 h-3 w-32" />
                    <Skeleton className="mb-1 h-5 w-48" />
                    <Skeleton className="mb-5 h-4 w-36" />
                    <Skeleton className="mb-3 h-12 w-full" />
                    <Skeleton className="h-3 w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <div>
            {experiences.map((experience, index) => (
              <TimelineItem key={experience.company} {...experience} index={index} />
            ))}
          </div>
        </SkeletonWrapper>
      </div>
    </section>
  );
}
