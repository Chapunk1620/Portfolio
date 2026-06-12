"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

const links = [
  {
    label: "GitHub",
    href: personalInfo.github,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: personalInfo.linkedin,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${personalInfo.email}`,
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formsubmit.co/ajax/" + personalInfo.email, {
        method: "POST",
        body: data,
      });
      if (res.ok) setSent(true);
    } catch {
      window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(data.get("subject") as string)}&body=${encodeURIComponent(data.get("message") as string)}`;
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-dark-surface/50 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-accent-red font-mono text-sm mb-2 tracking-widest uppercase">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-text-muted max-w-md mx-auto mb-10">
            Have a project in mind or just want to say hi? I&apos;m always open to new opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="box" />

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full px-4 py-3 bg-dark border border-dark-mid/30 rounded-button text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-red transition-colors text-sm"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 bg-dark border border-dark-mid/30 rounded-button text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-red transition-colors text-sm"
            />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="w-full px-4 py-3 bg-dark border border-dark-mid/30 rounded-button text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-red transition-colors text-sm"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              required
              rows={5}
              className="w-full px-4 py-3 bg-dark border border-dark-mid/30 rounded-button text-text-primary placeholder-text-muted/50 focus:outline-none focus:border-accent-red transition-colors text-sm resize-none"
            />
            <button
              type="submit"
              className="w-full py-3 bg-accent-red text-white rounded-button font-medium hover:bg-accent-red/90 transition-all duration-300 text-sm"
            >
              {sent ? "✓ Message Sent!" : "Send Message"}
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center md:items-start justify-center gap-8"
          >
            <div className="space-y-4">
              {[
                { label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                { label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-text-muted hover:text-accent-red transition-colors"
                >
                  <span className="text-xs font-mono text-accent-red block">{item.label}</span>
                  <span className="text-sm">{item.value}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-accent-red transition-colors duration-200 group"
                  aria-label={link.label}
                >
                  <span className="group-hover:scale-110 transition-transform block">
                    {link.icon}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
