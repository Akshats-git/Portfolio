import { Octokit } from "@octokit/rest";
import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME!;

if (!GITHUB_TOKEN || !OPENAI_API_KEY || !GITHUB_USERNAME) {
  console.error("Missing required env vars: GITHUB_TOKEN, OPENAI_API_KEY, GITHUB_USERNAME");
  process.exit(1);
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

const DATA_FILE = path.resolve(__dirname, "../src/data/portfolio-data.ts");

type ProjectDomain = "Data Analysis" | "Agentic AI" | "ML" | "Full Stack";

interface ProjectEntry {
  title: string;
  description: string;
  tags: string[];
  domains: ProjectDomain[];
  image: string;
  githubUrl: string;
}

interface SkillCategory {
  name: string;
  skills: string[];
}

// ── GitHub helpers ──────────────────────────────────────────────────────────

async function fetchPortfolioRepos() {
  const { data } = await octokit.search.repos({
    q: `user:${GITHUB_USERNAME} topic:portfolio-ready`,
    per_page: 50,
  });
  return data.items;
}

async function fetchRepoDetails(repoName: string) {
  const [readmeRes, languagesRes] = await Promise.allSettled([
    octokit.repos.getReadme({ owner: GITHUB_USERNAME, repo: repoName }),
    octokit.repos.listLanguages({ owner: GITHUB_USERNAME, repo: repoName }),
  ]);

  const readme =
    readmeRes.status === "fulfilled"
      ? Buffer.from(readmeRes.value.data.content, "base64")
          .toString("utf-8")
          .slice(0, 3000)
      : "";

  const languages =
    languagesRes.status === "fulfilled"
      ? Object.keys(languagesRes.value.data)
      : [];

  return { readme, languages };
}

// ── OpenAI helpers ──────────────────────────────────────────────────────────

async function generateProjectEntry(
  repo: Awaited<ReturnType<typeof fetchPortfolioRepos>>[number],
  details: { readme: string; languages: string[] }
): Promise<ProjectEntry> {
  const prompt = `You are helping build a developer portfolio. Given this GitHub repository, generate a project entry.

Repository:
- Name: ${repo.name}
- Description: ${repo.description ?? "No description"}
- Stars: ${repo.stargazers_count}
- Languages: ${details.languages.join(", ") || "none"}
- Topics: ${repo.topics?.filter((t) => t !== "portfolio-ready").join(", ") || "none"}
- README (first 3000 chars):
${details.readme || "No README available"}

Return a JSON object with exactly these fields:
{
  "title": "Human-readable project title (not the repo slug, capitalize properly)",
  "description": "2-3 sentences. Explain what it does and why it is useful. Be specific and engaging.",
  "tags": ["3-6 specific tech stack items — prefer specific names like FastAPI over Python, LangChain over AI"],
  "domains": ["one or more from exactly: Data Analysis, Agentic AI, ML, Full Stack"],
  "image": "a single emoji that best represents this project"
}`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.3,
  });

  const parsed = JSON.parse(res.choices[0].message.content!);
  return { ...parsed, githubUrl: repo.html_url };
}

async function generateUpdatedSkills(
  repoData: Array<{ languages: string[]; topics: string[] }>
): Promise<SkillCategory[]> {
  const allTech = [
    ...new Set([
      ...repoData.flatMap((r) => r.languages),
      ...repoData.flatMap((r) =>
        r.topics.filter((t) => t !== "portfolio-ready")
      ),
    ]),
  ];

  const existingSkills = {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Redux"],
    Backend: ["Node.js", "Express", "Python", "FastAPI"],
    Databases: ["PostgreSQL", "MongoDB", "Firebase", "Redis", "MySQL"],
    "Tools & Platforms": ["Git", "Docker", "AWS", "Vercel", "GitHub Actions", "VS Code"],
    "UI/UX & Design": ["Figma", "Shadcn UI", "Material-UI"],
    "Agentic Frameworks": ["LangChain", "Hugging Face", "RAG Systems", "LangGraph"],
  };

  const prompt = `You are updating a developer portfolio's skills section.

Technologies found across portfolio GitHub repos:
${allTech.join(", ") || "none"}

Current skills by category:
${JSON.stringify(existingSkills, null, 2)}

Rules:
1. Keep ALL existing skills exactly as written
2. Add new technologies from the repo list that fit naturally into existing categories
3. Use proper display names (e.g. "OpenAI API" not "openai-api", "LangChain" not "langchain")
4. Skip overly generic terms (e.g. "programming", "software")
5. Do not create new categories — only use the six existing ones

Return a JSON object:
{
  "skillCategories": [
    { "name": "Frontend", "skills": [...] },
    { "name": "Backend", "skills": [...] },
    { "name": "Databases", "skills": [...] },
    { "name": "Tools & Platforms", "skills": [...] },
    { "name": "UI/UX & Design", "skills": [...] },
    { "name": "Agentic Frameworks", "skills": [...] }
  ]
}`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
    temperature: 0.2,
  });

  const parsed = JSON.parse(res.choices[0].message.content!);
  return parsed.skillCategories as SkillCategory[];
}

// ── File generation ─────────────────────────────────────────────────────────

function buildDataFile(projects: ProjectEntry[], skillCategories: SkillCategory[]): string {
  const timestamp = new Date().toISOString();

  const projectsWithId = projects.map((p, i) => ({ id: i + 1, ...p }));

  return `// AUTO-GENERATED by portfolio-sync — do not edit manually
// Last synced: ${timestamp}
// To update: trigger the "Sync Portfolio" workflow in GitHub Actions.

export type ProjectDomain = "Data Analysis" | "Agentic AI" | "ML" | "Full Stack";

export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  domains: ProjectDomain[];
  githubUrl: string;
  image: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export const projects: Project[] = ${JSON.stringify(projectsWithId, null, 2)};

export const skillCategories: SkillCategory[] = ${JSON.stringify(skillCategories, null, 2)};
`;
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Searching for repos with topic "portfolio-ready" for user ${GITHUB_USERNAME}...`);
  const repos = await fetchPortfolioRepos();

  if (repos.length === 0) {
    console.log('No repos found with the "portfolio-ready" topic. Nothing to update.');
    process.exit(0);
  }

  console.log(`Found ${repos.length} repo(s): ${repos.map((r) => r.name).join(", ")}\n`);

  // Fetch details for all repos in parallel
  const repoDetails = await Promise.all(
    repos.map(async (repo) => {
      console.log(`  Fetching details for: ${repo.name}`);
      const details = await fetchRepoDetails(repo.name);
      return { repo, details };
    })
  );

  // Generate project entries in parallel
  console.log("\nGenerating project entries with GPT-4o...");
  const projects = await Promise.all(
    repoDetails.map(({ repo, details }) => generateProjectEntry(repo, details))
  );

  // Generate updated skills in one call
  console.log("Generating updated skills...");
  const skillCategories = await generateUpdatedSkills(
    repoDetails.map(({ repo, details }) => ({
      languages: details.languages,
      topics: repo.topics ?? [],
    }))
  );

  // Write the data file
  const content = buildDataFile(projects, skillCategories);
  fs.writeFileSync(DATA_FILE, content, "utf-8");

  console.log(`\nDone! Wrote ${DATA_FILE}`);
  console.log(`  Projects : ${projects.length}`);
  console.log(`  Skill categories : ${skillCategories.length}`);
  projects.forEach((p) => console.log(`    ${p.image}  ${p.title}`));
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
