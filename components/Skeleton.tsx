export default function Skeleton({ className = "", variant = "text" }: { className?: string; variant?: "text" | "card" | "circle" }) {
  if (variant === "circle") {
    return (
      <div
        className={`rounded-full bg-text-muted/10 animate-pulse-skeleton ${className}`}
      />
    );
  }

  if (variant === "card") {
    return (
      <div className={`bg-dark-surface rounded-card p-6 ${className}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-lg bg-text-muted/10 animate-pulse-skeleton" />
          <div className="w-5 h-5 rounded bg-text-muted/10 animate-pulse-skeleton" />
        </div>
        <div className="h-4 w-3/4 bg-text-muted/10 rounded animate-pulse-skeleton mb-2" />
        <div className="h-3 w-full bg-text-muted/10 rounded animate-pulse-skeleton mb-1" />
        <div className="h-3 w-2/3 bg-text-muted/10 rounded animate-pulse-skeleton mb-4" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-text-muted/10 rounded-full animate-pulse-skeleton" />
          <div className="h-6 w-20 bg-text-muted/10 rounded-full animate-pulse-skeleton" />
          <div className="h-6 w-14 bg-text-muted/10 rounded-full animate-pulse-skeleton" />
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="h-3 w-16 bg-text-muted/10 rounded animate-pulse-skeleton" />
      <div className="h-8 w-3/4 bg-text-muted/10 rounded animate-pulse-skeleton" />
      <div className="h-4 w-full bg-text-muted/10 rounded animate-pulse-skeleton" />
      <div className="h-4 w-2/3 bg-text-muted/10 rounded animate-pulse-skeleton" />
    </div>
  );
}
