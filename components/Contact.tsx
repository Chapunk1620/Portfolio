"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { personalInfo } from "@/lib/data";
import Skeleton from "./Skeleton";
import SkeletonWrapper from "./SkeletonWrapper";

const socialLinks = [
  {
    label: "GitHub",
    href: personalInfo.github,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: personalInfo.linkedin,
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 00-2.063-2.065 2.064 2.064 0 104.127 0 2.062 2.062 0 00-2.064-2.065zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Please add a subject.";
  if (!values.message.trim()) errors.message = "Please add a message.";
  return errors;
}

function buildFallbackMailto(values: FormValues) {
  const body = [`Name: ${values.name}`, `Email: ${values.email}`, "", values.message].join("\n");
  return `mailto:${personalInfo.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`;
}

function FieldStatus({ valid }: { valid: boolean }) {
  if (!valid) return null;
  return <span className="contact-field-status" aria-label="Valid">✓</span>;
}

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fallbackMailto, setFallbackMailto] = useState("");
  const reduceMotion = useReducedMotion();
  const fieldRefs = useRef<Partial<Record<keyof FormValues, HTMLInputElement | HTMLTextAreaElement>>>({});
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (submitted) successHeadingRef.current?.focus();
  }, [submitted]);

  const updateValue = (field: keyof FormValues, value: string) => {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: validate(nextValues)[field] }));
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${personalInfo.email}`;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitError("");
    setFallbackMailto("");
    const firstInvalidField = (Object.keys(validationErrors) as Array<keyof FormValues>)[0];
    if (firstInvalidField) {
      fieldRefs.current[firstInvalidField]?.focus();
      return;
    }

    setSending(true);
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
        method: "POST",
        body: data,
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        setFallbackMailto(buildFallbackMailto(values));
        setSubmitError("Your message could not be sent. Please try again or use the email link below.");
      }
    } catch {
      setFallbackMailto(buildFallbackMailto(values));
      setSubmitError("The contact service is unavailable. Please use the email link below instead.");
    } finally {
      setSending(false);
    }
  };

  const inputClass = (field: keyof FormValues) =>
    `peer w-full rounded-button border bg-dark px-4 pb-2.5 pt-5 text-sm text-text-primary outline-none transition-colors placeholder:text-transparent focus:border-accent-red focus-visible:ring-2 focus-visible:ring-accent-red/50 ${
      errors[field] ? "border-accent-red" : "border-dark-mid/30"
    }`;

  return (
    <section id="contact" className="scroll-mt-20 bg-dark-surface/50 px-6 py-16 md:py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reduceMotion ? undefined : { duration: 0.5 }}
          className="text-center"
        >
          <p className="mb-2 font-mono text-sm uppercase tracking-widest text-accent-red">Contact</p>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Building something interesting? Let&apos;s talk.</h2>
          <p className="mx-auto mb-6 max-w-lg text-text-muted">
            Have a project in mind or want to discuss a full-stack opportunity? I&apos;m always open to a good challenge.
          </p>
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-accent-red/30 bg-accent-red/10 px-4 py-2 text-sm text-accent-red">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent-red" aria-hidden="true" />
            {personalInfo.availability}
          </div>
        </motion.div>

        <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <button type="button" onClick={copyEmail} className="contact-action-card text-left focus-visible:ring-2 focus-visible:ring-accent-red">
            <span className="contact-action-icon" aria-hidden="true">✉</span>
            <span className="contact-action-label">{copied ? "Copied!" : "Email Me"}</span>
            <span className="text-xs text-text-muted">{personalInfo.email}</span>
          </button>
          <a href="/resume.pdf" download className="contact-action-card focus-visible:ring-2 focus-visible:ring-accent-red">
            <span className="contact-action-icon" aria-hidden="true">↧</span>
            <span className="contact-action-label">Download Resume</span>
            <span className="text-xs text-text-muted">See my experience at a glance</span>
          </a>
          <a href={`mailto:${personalInfo.email}?subject=${encodeURIComponent("Let's Chat — From Portfolio")}`} className="contact-action-card focus-visible:ring-2 focus-visible:ring-accent-red">
            <span className="contact-action-icon" aria-hidden="true">↗</span>
            <span className="contact-action-label">Let&apos;s Chat</span>
            <span className="text-xs text-text-muted">Start a conversation</span>
          </a>
        </div>

        <SkeletonWrapper
          skeleton={
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <div className="space-y-4">
                <Skeleton className="h-16 w-full rounded-button" />
                <Skeleton className="h-16 w-full rounded-button" />
                <Skeleton className="h-16 w-full rounded-button" />
                <Skeleton className="h-36 w-full rounded-button" />
                <Skeleton className="h-12 w-full rounded-button" />
              </div>
              <div className="flex flex-col justify-center gap-8 pl-4"><Skeleton className="h-32 w-48" /></div>
            </div>
          }
        >
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
            {submitError && (
              <p role="alert" className="md:col-span-2 rounded-button border border-accent-red/40 bg-accent-red/10 px-4 py-3 text-sm text-accent-red">
                {submitError}{" "}
                <a className="rounded-sm underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red" href={fallbackMailto || `mailto:${personalInfo.email}`}>
                  Email me directly.
                </a>
              </p>
            )}
            {submitted ? (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
                role="status"
                className="flex min-h-[330px] flex-col items-center justify-center rounded-card border border-accent-red/30 bg-dark-surface p-8 text-center"
              >
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent-red/15 text-2xl text-accent-red">✓</span>
                <h3 ref={successHeadingRef} tabIndex={-1} className="mb-2 text-xl font-semibold focus:outline-none">Message sent!</h3>
                <p className="max-w-xs text-sm leading-relaxed text-text-muted">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <motion.form
                initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-4"
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="box" />

                {(["name", "email", "subject"] as const).map((field) => {
                  const labels = { name: "Your Name", email: "Your Email", subject: "Subject" };
                  const isValid = values[field].trim().length > 0 && !validate(values)[field];
                  return (
                    <div className="contact-field" key={field}>
                      <input
                        id={`contact-${field}`}
                        ref={(element) => { fieldRefs.current[field] = element ?? undefined; }}
                        type={field === "email" ? "email" : "text"}
                        required
                        name={field}
                        value={values[field]}
                        onChange={(event) => updateValue(field, event.target.value)}
                        placeholder=" "
                        aria-invalid={Boolean(errors[field])}
                        aria-describedby={errors[field] ? `contact-${field}-error` : undefined}
                        className={inputClass(field)}
                      />
                      <label htmlFor={`contact-${field}`}>{labels[field]}</label>
                      <FieldStatus valid={isValid} />
                      {errors[field] && <p id={`contact-${field}-error`} className="mt-1 text-xs text-accent-red">{errors[field]}</p>}
                    </div>
                  );
                })}
                <div className="contact-field">
                  <textarea
                    id="contact-message"
                    ref={(element) => { fieldRefs.current.message = element ?? undefined; }}
                    name="message"
                    value={values.message}
                    onChange={(event) => updateValue("message", event.target.value)}
                    placeholder=" "
                    required
                    rows={5}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    className={`${inputClass("message")} resize-none`}
                  />
                  <label htmlFor="contact-message">Your Message</label>
                  <FieldStatus valid={values.message.trim().length > 0 && !errors.message} />
                  {errors.message && <p id="contact-message-error" className="mt-1 text-xs text-accent-red">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-button bg-accent-red py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-accent-red/90 focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-dark disabled:cursor-wait disabled:opacity-70"
                >
                  {sending ? "Sending…" : "Send Message"}
                </button>
              </motion.form>
            )}

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: 20 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center justify-center gap-8 md:items-start"
            >
              <div className="space-y-4">
                <a href={`mailto:${personalInfo.email}`} className="block rounded-sm text-text-muted transition-colors hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red">
                  <span className="block font-mono text-xs text-accent-red">Email</span>
                  <span className="text-sm">{personalInfo.email}</span>
                </a>
                <a href={`tel:${personalInfo.phone}`} className="block rounded-sm text-text-muted transition-colors hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red">
                  <span className="block font-mono text-xs text-accent-red">Phone</span>
                  <span className="text-sm">{personalInfo.phone}</span>
                </a>
              </div>
              <div className="flex items-center gap-4" aria-label="Social links">
                {socialLinks.map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="group relative rounded-full border border-dark-mid/40 p-3 text-text-muted transition-colors hover:border-accent-red hover:text-accent-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red" aria-label={link.label}>
                    {link.icon}
                    <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded bg-dark px-2 py-1 text-xs text-text-primary opacity-0 transition-opacity group-hover:opacity-100">{link.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </SkeletonWrapper>
      </div>
    </section>
  );
}
