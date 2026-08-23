import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Akshats-git";

interface ContributionPR {
  id: number;
  title: string;
  number: number;
  url: string;
  repo: string;
  repoUrl: string;
  mergedAt: string;
}

interface GitHubIssueItem {
  id: number;
  title: string;
  number: number;
  html_url: string;
  repository_url: string;
  closed_at: string | null;
}

export async function GET() {
  const query = `author:${GITHUB_USERNAME}+is:pr+is:merged+-user:${GITHUB_USERNAME}`;

  const res = await fetch(
    `https://api.github.com/search/issues?q=${query}&sort=updated&order=desc&per_page=30`,
    {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { totalCount: 0, contributions: [] },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200" } }
    );
  }

  const json = await res.json();
  const items: GitHubIssueItem[] = json.items ?? [];

  const contributions: ContributionPR[] = items.map((item) => {
    const repoPath = item.repository_url.replace("https://api.github.com/repos/", "");
    return {
      id: item.id,
      title: item.title,
      number: item.number,
      url: item.html_url,
      repo: repoPath,
      repoUrl: `https://github.com/${repoPath}`,
      mergedAt: item.closed_at ?? "",
    };
  });

  return NextResponse.json(
    { totalCount: json.total_count ?? contributions.length, contributions },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    }
  );
}
