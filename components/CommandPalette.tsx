"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { personalInfo, projects, skills } from "@/lib/data";
import { useTheme } from "./ThemeProvider";

type Command = {
  id: string;
  label: string;
  detail: string;
  action: () => void;
};

function scrollToSection(id: string) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.getElementById(id)?.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

function downloadResume() {
  const link = document.createElement("a");
  link.href = "/resume.pdf";
  link.download = "Jhon-Christian-Solano-Resume.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function copyEmail() {
  if (!navigator.clipboard) {
    window.location.href = `mailto:${personalInfo.email}`;
    return;
  }

  void navigator.clipboard.writeText(personalInfo.email).catch(() => {
    window.location.href = `mailto:${personalInfo.email}`;
  });
}

export default function CommandPalette() {
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  const close = () => {
    setOpen(false);
    setQuery("");
    window.setTimeout(() => openerRef.current?.focus(), 0);
  };

  const commands = useMemo<Command[]>(() => [
    { id: "about", label: "Go to About", detail: "Section", action: () => scrollToSection("about") },
    { id: "projects", label: "Go to Projects", detail: `${projects.length} case studies`, action: () => scrollToSection("projects") },
    { id: "github", label: "Go to GitHub activity", detail: "Section", action: () => scrollToSection("github") },
    { id: "experience", label: "Go to Experience", detail: "Section", action: () => scrollToSection("experience") },
    { id: "skills", label: "Go to Skills", detail: `${Object.values(skills).flat().length} tools`, action: () => scrollToSection("skills") },
    { id: "contact", label: "Go to Contact", detail: "Section", action: () => scrollToSection("contact") },
    { id: "resume", label: "Download resume", detail: "PDF", action: downloadResume },
    { id: "email", label: "Copy email address", detail: personalInfo.email, action: copyEmail },
    { id: "github-link", label: "Open GitHub", detail: "External link", action: () => window.open(personalInfo.github, "_blank", "noopener,noreferrer") },
    { id: "linkedin", label: "Open LinkedIn", detail: "External link", action: () => window.open(personalInfo.linkedin, "_blank", "noopener,noreferrer") },
    { id: "theme", label: `Switch to ${theme === "dark" ? "light" : "dark"} theme`, detail: "Appearance", action: toggleTheme },
  ], [theme, toggleTheme]);

  const filteredCommands = commands.filter((command) =>
    `${command.label} ${command.detail}`.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (open) {
          close();
        } else {
          openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
          setOpen(true);
        }
      }
      if (event.key === "Escape" && open) close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close, open]);

  useEffect(() => {
    if (!open) return;
    setActiveIndex(0);
    inputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusableElements = () => {
      const panel = panelRef.current;
      if (!panel) return [];
      return Array.from(panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      )).filter((element) => element.getClientRects().length > 0);
    };

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        panelRef.current?.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const keepFocusInside = (event: FocusEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", trapFocus, true);
    document.addEventListener("focusin", keepFocusInside);
    return () => {
      document.removeEventListener("keydown", trapFocus, true);
      document.removeEventListener("focusin", keepFocusInside);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (activeIndex >= filteredCommands.length) setActiveIndex(Math.max(0, filteredCommands.length - 1));
  }, [activeIndex, filteredCommands.length]);

  const runCommand = (command: Command | undefined) => {
    if (!command) return;
    command.action();
    close();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="command-palette-title" tabIndex={-1} className="command-palette w-full max-w-xl overflow-hidden rounded-2xl border border-text-muted/20 bg-dark-surface shadow-2xl">
        <h2 id="command-palette-title" className="sr-only">Command palette</h2>
        <div className="flex items-center border-b border-text-muted/15 px-4">
          <span aria-hidden="true" className="mr-3 text-text-muted">⌕</span>
          <input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} onKeyDown={(event) => {
            if (event.key === "ArrowDown") { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, filteredCommands.length - 1)); }
            if (event.key === "ArrowUp") { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)); }
            if (event.key === "Enter") { event.preventDefault(); runCommand(filteredCommands[activeIndex]); }
          }} placeholder="Search commands..." aria-label="Search commands" className="h-14 min-w-0 flex-1 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted" />
          <kbd className="hidden rounded border border-text-muted/20 px-2 py-1 font-mono text-[10px] text-text-muted sm:block">ESC</kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2" role="listbox" aria-label="Commands">
          {filteredCommands.length ? filteredCommands.map((command, index) => (
            <button key={command.id} type="button" role="option" aria-selected={index === activeIndex} onMouseEnter={() => setActiveIndex(index)} onClick={() => runCommand(command)} className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm transition-colors ${index === activeIndex ? "bg-accent-red/15 text-text-primary" : "text-text-muted hover:bg-accent-red/10 hover:text-text-primary"}`}>
              <span>{command.label}</span><span className="ml-4 text-xs text-text-muted">{command.detail}</span>
            </button>
          )) : <p className="px-3 py-8 text-center text-sm text-text-muted">No matching commands.</p>}
        </div>
        <div className="flex items-center justify-between border-t border-text-muted/15 px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-text-muted"><span>↑↓ Navigate</span><span>↵ Select</span><span>⌘K Open</span></div>
      </div>
    </div>
  );
}

export function CommandPaletteHint() {
  return <button type="button" onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }))} className="hidden items-center gap-2 rounded-lg border border-text-muted/20 px-2.5 py-1.5 font-mono text-[10px] text-text-muted transition-colors hover:border-accent-red/50 hover:text-accent-red md:inline-flex" aria-label="Open command palette"><span>Search</span><kbd>⌘K</kbd></button>;
}

