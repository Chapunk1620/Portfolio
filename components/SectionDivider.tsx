export default function SectionDivider() {
  return (
    <div className="section-divider mx-auto flex max-w-5xl items-center gap-4 px-6" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-accent-red/40 to-transparent" />
      <span className="h-1.5 w-1.5 rotate-45 bg-accent-red/70" />
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-accent-red/40 to-transparent" />
    </div>
  );
}
