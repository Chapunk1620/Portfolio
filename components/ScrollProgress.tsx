"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "github", label: "GitHub activity" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(sections[0].label);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrentSection(sections.find((section) => section.id === visible.target.id)?.label ?? currentSection);
    }, { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.3, 0.6] });
    const observed = sections.map(({ id }) => document.getElementById(id)).filter((element): element is HTMLElement => Boolean(element));
    observed.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[70] h-5 bg-dark-surface/90" aria-label={`Page progress: ${currentSection}`}>
      <div className="h-0.5 bg-dark-surface">
        <div className="h-full bg-accent-red transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
      </div>
      <span className="absolute right-3 top-1 hidden font-mono text-[9px] uppercase tracking-widest text-text-muted sm:block">{currentSection}</span>
    </div>
  );
}
