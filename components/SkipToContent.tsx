export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-red focus:text-white focus:rounded-button focus:text-sm focus:font-medium"
    >
      Skip to content
    </a>
  );
}
