"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean);

    sections.forEach((s) => s && observer.observe(s));
    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((s) => s && observer.unobserve(s));
    };
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-dark/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="text-xl font-bold tracking-tight">
          <span className="text-accent-red">&lt;</span>J<span className="text-accent-red">/</span>
        </a>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative transition-colors duration-200 text-sm font-medium group ${
                  activeSection === link.href.slice(1)
                    ? "text-accent-red"
                    : "text-text-muted hover:text-accent-red"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent-red transition-all duration-300 ${
                  activeSection === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-surface/95 backdrop-blur-md"
          >
            <ul className="flex flex-col px-6 pb-6 gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-2 transition-colors text-sm font-medium ${
                      activeSection === link.href.slice(1)
                        ? "text-accent-red"
                        : "text-text-muted hover:text-accent-red"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
