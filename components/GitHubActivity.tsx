"use client";

import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

const GITHUB_USERNAME = "Chapunk1620";
const GITHUB_PROFILE_URL = `https://api.github.com/users/${GITHUB_USERNAME}`;
const GITHUB_EVENTS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/events`;
const GITHUB_PAGE_URL = `https://github.com/${GITHUB_USERNAME}`;

type GitHubProfile = {
  login: string;
  name: string | null;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
};

type GitHubCommit = { sha: string; message: string };

type GitHubPushEvent = {
  id: string;
  type: "PushEvent";
  created_at: string;
  repo: { name: string };
  payload: { commits?: GitHubCommit[] };
};

type GitHubEvent = GitHubPushEvent;

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function isValidDate(value: unknown): value is string {
  return typeof value === "string" && !Number.isNaN(new Date(value).getTime());
}

function isGitHubProfile(value: unknown): value is GitHubProfile {
  if (!isRecord(value)) return false;
  return (
    typeof value.login === "string" &&
    (typeof value.name === "string" || value.name === null) &&
    (typeof value.bio === "string" || value.bio === null) &&
    typeof value.public_repos === "number" && Number.isFinite(value.public_repos) &&
    typeof value.followers === "number" && Number.isFinite(value.followers) &&
    typeof value.following === "number" && Number.isFinite(value.following)
  );
}

function isGitHubCommit(value: unknown): value is GitHubCommit {
  return isRecord(value) && typeof value.sha === "string" && typeof value.message === "string";
}

function isPushEvent(value: unknown): value is GitHubPushEvent {
  if (!isRecord(value) || value.type !== "PushEvent" || typeof value.id !== "string" || !isValidDate(value.created_at)) {
    return false;
  }

  if (!isRecord(value.repo) || typeof value.repo.name !== "string" || value.repo.name.length === 0) {
    return false;
  }

  if (!isRecord(value.payload)) return false;
  if (value.payload.commits !== undefined && !Array.isArray(value.payload.commits)) return false;

  return true;
}

function normalizePushEvent(value: GitHubPushEvent): GitHubPushEvent {
  const commits = Array.isArray(value.payload.commits)
    ? value.payload.commits.filter(isGitHubCommit)
    : undefined;

  return {
    ...value,
    payload: commits ? { commits } : {},
  };
}

function formatEventDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recent activity";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function LoadingState() {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]" role="status" aria-live="polite" aria-label="Loading GitHub activity">
      <div className="rounded-card border border-text-muted/20 bg-dark-surface p-6">
        <Skeleton className="mb-5 h-4 w-28" variant="bar" />
        <Skeleton className="mb-3 h-7 w-48" variant="bar" />
        <Skeleton className="mb-7 h-4 w-full" variant="bar" />
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((item) => <Skeleton key={item} className="h-16 w-full" variant="bar" />)}
        </div>
      </div>
      <div className="rounded-card border border-text-muted/20 bg-dark-surface p-6">
        <Skeleton className="mb-5 h-4 w-36" variant="bar" />
        <div className="space-y-4">
          {[1, 2, 3].map((item) => <Skeleton key={item} className="h-12 w-full" variant="bar" />)}
        </div>
      </div>
    </div>
  );
}

function FallbackState({ message }: { message?: string }) {
  return (
    <div className="rounded-card border border-accent-red/25 bg-dark-surface p-6 md:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-accent-red">GitHub activity</p>
          <h3 className="mt-2 text-xl font-semibold text-text-primary">See what I&apos;m shipping</h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-muted">
            {message ?? "Live activity is unavailable right now, but my public repositories are always available on GitHub."}
          </p>
        </div>
        <a
          href={GITHUB_PAGE_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center rounded-button bg-accent-red px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
        >
          Visit GitHub <span aria-hidden="true" className="ml-2">↗</span>
        </a>
      </div>
    </div>
  );
}

export default function GitHubActivity() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [events, setEvents] = useState<GitHubPushEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivity() {
      try {
        const [profileResponse, eventsResponse] = await Promise.all([
          fetch(GITHUB_PROFILE_URL, { signal: controller.signal, headers: { Accept: "application/vnd.github+json" } }),
          fetch(GITHUB_EVENTS_URL, { signal: controller.signal, headers: { Accept: "application/vnd.github+json" } }),
        ]);

        if (!profileResponse.ok || !eventsResponse.ok) throw new Error("GitHub API unavailable");

        const profileData: unknown = await profileResponse.json();
        const eventData: unknown = await eventsResponse.json();
        if (!isGitHubProfile(profileData) || !Array.isArray(eventData)) {
          throw new Error("Unexpected GitHub response");
        }

        if (controller.signal.aborted) return;
        setProfile(profileData);
        setEvents(eventData.filter(isPushEvent).map(normalizePushEvent).slice(0, 5));
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        if (!controller.signal.aborted) setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadActivity();
    return () => controller.abort();
  }, []);

  return (
    <section id="github" className="scroll-mt-20 px-6 py-16 md:py-24" aria-labelledby="github-heading">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="mb-2 font-mono text-sm uppercase tracking-widest text-accent-red">Open source trail</p>
          <h2 id="github-heading" className="text-3xl font-bold md:text-4xl">GitHub Activity</h2>
          <p className="mt-3 max-w-2xl text-text-muted">A live snapshot of public work and recent shipping activity.</p>
        </div>

        {loading ? <LoadingState /> : error || !profile ? <FallbackState /> : (
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-card border border-text-muted/20 bg-dark-surface p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-text-muted">Profile</p>
                  <h3 className="mt-2 text-xl font-semibold text-text-primary">{profile.name || profile.login}</h3>
                  <p className="mt-1 font-mono text-sm text-accent-red">@{profile.login}</p>
                </div>
                <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-red/10 font-mono font-bold text-accent-red">GH</span>
              </div>
              <p className="mt-5 min-h-10 text-sm leading-relaxed text-text-muted">{profile.bio || "Full-stack development, experiments, and public projects."}</p>
              <div className="mt-6 grid grid-cols-3 gap-2" aria-label="GitHub profile stats">
                {[
                  ["Repos", profile.public_repos],
                  ["Followers", profile.followers],
                  ["Following", profile.following],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-text-muted/15 bg-dark/40 p-3 text-center">
                    <p className="text-lg font-bold text-text-primary">{value}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">{label}</p>
                  </div>
                ))}
              </div>
              <a href={GITHUB_PAGE_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex text-sm font-semibold text-accent-red underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-red">View full profile ↗</a>
            </div>

            <div className="rounded-card border border-text-muted/20 bg-dark-surface p-6 md:p-7">
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-text-muted">Recent pushes</h3>
                <span className="rounded-full border border-status-success/30 px-2.5 py-1 font-mono text-[10px] text-status-success">Public API</span>
              </div>
              {events.length > 0 ? (
                <ul className="mt-5 divide-y divide-text-muted/15" aria-label="Recent public push events">
                  {events.map((event) => {
                    const commitCount = event.payload.commits?.length ?? 0;
                    return (
                      <li key={event.id} className="py-4 first:pt-0 last:pb-0">
                        <p className="truncate text-sm font-medium text-text-primary">{event.repo.name}</p>
                        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-text-muted">
                          <span>{formatEventDate(event.created_at)}</span>
                          <span>{commitCount} {commitCount === 1 ? "commit" : "commits"}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="mt-5 text-sm leading-relaxed text-text-muted">No recent public push events were returned. Visit GitHub for the complete project history.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
