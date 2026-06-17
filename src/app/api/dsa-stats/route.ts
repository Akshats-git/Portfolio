import { NextResponse } from "next/server";

const HANDLES = {
  leetcode: "AkshatWiz",
  codeforces: "Chef_Akshat",
  codechef: "chef_akshatg",
  gfg: "akshatgeek",
};

interface PlatformStat {
  name: string;
  handle: string;
  profileUrl: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  problemsSolved: number;
  totalProblems?: number;
  contestsGiven?: number;
  stars?: number;
  score?: number;
  streak?: number;
  breakdown?: { label: string; count: number; color: string }[];
}

async function fetchLeetCode(): Promise<PlatformStat> {
  const query = `{
    matchedUser(username:"${HANDLES.leetcode}") {
      submitStats { acSubmissionNum { difficulty count } }
      profile { ranking }
    }
    userContestRanking(username:"${HANDLES.leetcode}") {
      attendedContestsCount rating globalRanking
    }
  }`;

  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  const json = await res.json();
  const user = json.data.matchedUser;
  const contest = json.data.userContestRanking;
  const stats = user.submitStats.acSubmissionNum;

  const easy = stats.find((s: { difficulty: string }) => s.difficulty === "Easy")?.count ?? 0;
  const medium = stats.find((s: { difficulty: string }) => s.difficulty === "Medium")?.count ?? 0;
  const hard = stats.find((s: { difficulty: string }) => s.difficulty === "Hard")?.count ?? 0;
  const total = stats.find((s: { difficulty: string }) => s.difficulty === "All")?.count ?? 0;

  return {
    name: "LeetCode",
    handle: HANDLES.leetcode,
    profileUrl: `https://leetcode.com/u/${HANDLES.leetcode}`,
    rating: contest ? Math.round(contest.rating) : undefined,
    contestsGiven: contest?.attendedContestsCount,
    problemsSolved: total,
    totalProblems: 3500,
    breakdown: [
      { label: "Easy", count: easy, color: "#22c55e" },
      { label: "Medium", count: medium, color: "#f59e0b" },
      { label: "Hard", count: hard, color: "#ef4444" },
    ],
  };
}

async function fetchCodeforces(): Promise<PlatformStat> {
  const [infoRes, ratingRes, statusRes] = await Promise.all([
    fetch(`https://codeforces.com/api/user.info?handles=${HANDLES.codeforces}`, {
      next: { revalidate: 3600 },
    }),
    fetch(`https://codeforces.com/api/user.rating?handle=${HANDLES.codeforces}`, {
      next: { revalidate: 3600 },
    }),
    fetch(
      `https://codeforces.com/api/user.status?handle=${HANDLES.codeforces}&from=1&count=10000`,
      { next: { revalidate: 3600 } }
    ),
  ]);

  const info = await infoRes.json();
  const ratingData = await ratingRes.json();
  const statusData = await statusRes.json();

  const user = info.result[0];
  const contests = ratingData.result?.length ?? 0;

  const solved = new Set<string>();
  if (statusData.status === "OK") {
    for (const sub of statusData.result) {
      if (sub.verdict === "OK") {
        solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
      }
    }
  }

  return {
    name: "Codeforces",
    handle: HANDLES.codeforces,
    profileUrl: `https://codeforces.com/profile/${HANDLES.codeforces}`,
    rating: user.rating,
    maxRating: user.maxRating,
    rank: user.rank.charAt(0).toUpperCase() + user.rank.slice(1),
    problemsSolved: solved.size,
    contestsGiven: contests,
  };
}

async function fetchCodeChef(): Promise<PlatformStat> {
  const res = await fetch(`https://www.codechef.com/users/${HANDLES.codechef}`, {
    headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) Chrome/120.0.0.0" },
    next: { revalidate: 3600 },
  });
  const html = await res.text();

  let currentRating = 0;
  let maxRating = 0;
  let contestCount = 0;
  let problemsSolved = 0;
  let stars = 0;

  const highestMatch = html.match(/Highest Rating.*?(\d{3,4})/);
  if (highestMatch) maxRating = parseInt(highestMatch[1]);

  const probMatch = html.match(/Total Problems Solved:\s*(\d+)/i);
  if (probMatch) problemsSolved = parseInt(probMatch[1]);

  const starMatch = html.match(/(\d)\s*-?\s*star/i);
  if (starMatch) stars = parseInt(starMatch[1]);

  const ratingJsonMatch = html.match(/"all":\[(\{.*?\}(?:,\{.*?\})*)\]/);
  if (ratingJsonMatch) {
    try {
      const entries = JSON.parse(`[${ratingJsonMatch[1]}]`);
      contestCount = entries.length;
      if (entries.length > 0) {
        currentRating = parseInt(entries[entries.length - 1].rating);
        maxRating = Math.max(maxRating, ...entries.map((e: { rating: string }) => parseInt(e.rating)));
      }
    } catch {
      // parsing failed, use defaults
    }
  }

  return {
    name: "CodeChef",
    handle: HANDLES.codechef,
    profileUrl: `https://www.codechef.com/users/${HANDLES.codechef}`,
    rating: currentRating,
    maxRating,
    stars: stars || undefined,
    problemsSolved,
    contestsGiven: contestCount,
  };
}

async function fetchGFG(): Promise<PlatformStat> {
  const res = await fetch(
    `https://authapi.geeksforgeeks.org/api-get/user-profile-info/?handle=${HANDLES.gfg}`,
    {
      headers: { "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) Chrome/120.0.0.0" },
      next: { revalidate: 3600 },
    }
  );
  const json = await res.json();
  const data = json.data;

  return {
    name: "GeeksforGeeks",
    handle: HANDLES.gfg,
    profileUrl: `https://www.geeksforgeeks.org/user/${HANDLES.gfg}`,
    problemsSolved: data.total_problems_solved ?? 0,
    score: data.score ?? 0,
    streak: data.pod_solved_longest_streak ?? 0,
    rank: data.institute_rank ? `Institute Rank ${data.institute_rank}` : undefined,
  };
}

export async function GET() {
  const results = await Promise.allSettled([
    fetchLeetCode(),
    fetchCodeforces(),
    fetchCodeChef(),
    fetchGFG(),
  ]);

  const platforms: PlatformStat[] = [];
  for (const r of results) {
    if (r.status === "fulfilled") {
      platforms.push(r.value);
    }
  }

  return NextResponse.json(
    { platforms },
    {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
      },
    }
  );
}
