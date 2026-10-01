import "server-only";
import { siteConfig } from "./site-config";

export type GithubRepo = {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
  pushedAt: string;
};

type ApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
};

export const githubUsername = new URL(siteConfig.socials.github).pathname.replace(/\//g, "");

/**
 * Fetches the repos listed in `siteConfig.githubRepos`, in config order.
 * Runs on the server with hourly revalidation so visitors never hit the
 * GitHub rate limit. Returns [] on any failure — the Playground renders a
 * plain "view on GitHub" link instead of breaking the page or the build.
 * Set GITHUB_TOKEN in the environment to raise the API rate limit.
 */
export async function getFeaturedRepos(): Promise<GithubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${githubUsername}/repos?per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(process.env.GITHUB_TOKEN
            ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
            : {}),
        },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];

    const repos = (await res.json()) as ApiRepo[];
    const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));

    return siteConfig.githubRepos.flatMap((name) => {
      const repo = byName.get(name.toLowerCase());
      if (!repo) return [];
      return [
        {
          name: repo.name,
          description: repo.description,
          url: repo.html_url,
          language: repo.language,
          stars: repo.stargazers_count,
          pushedAt: repo.pushed_at,
        },
      ];
    });
  } catch {
    return [];
  }
}
