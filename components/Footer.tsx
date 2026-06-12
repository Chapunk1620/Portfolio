import { personalInfo } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="py-6 px-6 bg-dark border-t border-dark-surface text-center">
      <p className="text-text-muted text-sm">
        &copy; {new Date().getFullYear()} {personalInfo.name}. Built with Next.js &amp; Tailwind CSS.
      </p>
    </footer>
  );
}
