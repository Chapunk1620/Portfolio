import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-8xl font-bold text-accent-red mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-text-muted mb-8 max-w-md">
        Looks like you&apos;ve wandered off the map. This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-accent-red text-white rounded-button font-medium hover:bg-accent-red/90 transition-all duration-300"
      >
        Go Home
      </Link>
    </div>
  );
}
