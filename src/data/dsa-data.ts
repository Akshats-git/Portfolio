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
    totalProblems: 456,
    solved: 380,
    topics: [
      { name: "Arrays", solved: 40, total: 40 },
      { name: "Binary Search", solved: 32, total: 32 },
      { name: "Linked List", solved: 30, total: 31 },
      { name: "Stacks & Queues", solved: 28, total: 30 },
      { name: "Trees", solved: 45, total: 48 },
      { name: "Graphs", solved: 42, total: 54 },
      { name: "DP", solved: 50, total: 56 },
      { name: "Strings", solved: 25, total: 28 },
      { name: "Greedy", solved: 18, total: 20 },
      { name: "Recursion", solved: 22, total: 25 },
      { name: "Bit Manipulation", solved: 18, total: 18 },
      { name: "Heap", solved: 15, total: 17 },
      { name: "Tries", solved: 7, total: 7 },
      { name: "Sliding Window", solved: 8, total: 12 },
    ],
  },
  {
    name: "CP-31 Sheet",
    url: "https://www.cp31.org",
    totalProblems: 310,
    solved: 240,
    topics: [
      { name: "Number Theory", solved: 28, total: 35 },
      { name: "Binary Search", solved: 22, total: 25 },
      { name: "Graphs", solved: 35, total: 45 },
      { name: "DP", solved: 40, total: 50 },
      { name: "Segment Trees", solved: 18, total: 25 },
      { name: "Combinatorics", solved: 15, total: 20 },
      { name: "Greedy", solved: 25, total: 30 },
      { name: "Strings", solved: 20, total: 25 },
      { name: "Trees", solved: 22, total: 30 },
      { name: "Bit Manipulation", solved: 15, total: 25 },
    ],
  },
];
