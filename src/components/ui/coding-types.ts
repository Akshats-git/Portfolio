export interface ContributionPR {
  id: number;
  title: string;
  number: number;
  url: string;
  repo: string;
  repoUrl: string;
  mergedAt: string;
}

export type ThemeColors = { primary: string; secondary: string; accent: string };

export const platformAccents: Record<string, string> = {
  LeetCode: "#FFA116",
  Codeforces: "#1890FF",
  CodeChef: "#C4A484",
  GeeksforGeeks: "#2F8D46",
};
