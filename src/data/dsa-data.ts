export interface PlatformStat {
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

export interface SheetProgress {
  name: string;
  url: string;
  totalProblems: number;
  solved: number;
  topics: { name: string; solved: number; total: number }[];
}

export const sheets: SheetProgress[] = [
  {
    name: "Striver's DSA Sheet",
    url: "https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2",
    totalProblems: 474,
    solved: 356,
    topics: [
      { name: "Basics", solved: 52, total: 54 },
      { name: "Sorting", solved: 0, total: 7 },
      { name: "Arrays", solved: 38, total: 40 },
      { name: "Binary Search", solved: 26, total: 32 },
      { name: "Strings", solved: 13, total: 15 },
      { name: "Linked List", solved: 25, total: 31 },
      { name: "Recursion", solved: 9, total: 25 },
      { name: "Bit Manipulation", solved: 15, total: 18 },
      { name: "Stacks & Queues", solved: 25, total: 30 },
      { name: "Sliding Window", solved: 8, total: 12 },
      { name: "Heaps", solved: 6, total: 17 },
      { name: "Greedy", solved: 9, total: 15 },
      { name: "Binary Trees", solved: 29, total: 38 },
      { name: "BST", solved: 13, total: 16 },
      { name: "Graphs", solved: 37, total: 53 },
      { name: "DP", solved: 51, total: 55 },
      { name: "Tries", solved: 0, total: 7 },
      { name: "Strings (Adv)", solved: 0, total: 9 },
    ],
  },
  {
    name: "CP-31 Sheet",
    url: "https://www.tle-eliminators.com/cp-sheet",
    totalProblems: 372,
    solved: 124,
    topics: [
      { name: "800", solved: 31, total: 31 },
      { name: "900", solved: 25, total: 31 },
      { name: "1000", solved: 17, total: 31 },
      { name: "1100", solved: 15, total: 31 },
      { name: "1200", solved: 21, total: 31 },
      { name: "1300", solved: 13, total: 31 },
      { name: "1400", solved: 2, total: 31 },
      { name: "1500", solved: 0, total: 31 },
      { name: "1600", solved: 0, total: 31 },
      { name: "1700", solved: 0, total: 31 },
      { name: "1800", solved: 0, total: 31 },
      { name: "1900", solved: 0, total: 31 },
    ],
  },
];
