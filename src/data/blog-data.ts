export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  content: ContentBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "building-hirelens-end-to-end-ml-resume-screening",
    title: "Building HireLens: An End-to-End ML System for Resume Screening",
    description:
      "A personal account of building a production ML system from scratch, including the messy parts: weak supervision, fine-tuning on 4GB of VRAM, and deploying to a t3.micro.",
    date: "July 17, 2026",
    readTime: "12 min",
    category: "Machine Learning",
    tags: ["ML", "NLP", "FastAPI", "Docker", "AWS"],
    content: [
      {
        type: "paragraph",
        text: "A personal account of building a production ML system from scratch, including the messy parts.",
      },
      {
        type: "heading",
        text: "Why I Built This",
      },
      {
        type: "paragraph",
        text: 'Resume screening is broken. Most systems match keywords. If your resume says "JS" and the job posting says "JavaScript," you are already penalized before a human even looks at your application. Keyword matching does not understand meaning. It just counts overlapping strings.',
      },
      {
        type: "paragraph",
        text: "I wanted to build something that actually reads both the resume and the job description the way a person would and then reasons about how well they fit. Not just on skills either, but on experience level, education background, and the overall direction of someone's career.",
      },
      {
        type: "paragraph",
        text: "The other motivation was personal. I had been applying to jobs, and I kept wondering why some applications were getting through and others were not. I wanted a tool that could tell me specifically what I was missing, not just a generic rejection.",
      },
      {
        type: "paragraph",
        text: "So I built HireLens: an AI-powered resume screening and job matching system with two views, one for candidates who want feedback on their own resume, and one for recruiters who need to rank a stack of resumes quickly.",
      },
      {
        type: "heading",
        text: "What I Planned to Build",
      },
      {
        type: "paragraph",
        text: "Before writing a single line of code, I mapped out the full system.",
      },
      {
        type: "paragraph",
        text: "The application needed two distinct modes. In **Candidate View**, a person uploads their resume PDF, pastes in a job description, and gets back a match score with a detailed breakdown showing exactly which skills they have, which ones are missing, and what they should add. In **Recruiter View**, someone uploads up to 50 resumes at once and gets a ranked list with filters for minimum score, must-have skills, and experience level.",
      },
      {
        type: "paragraph",
        text: "Under the hood, the ML pipeline had four components:",
      },
      {
        type: "list",
        items: [
          "**Skills Match** at 40% weight, combining exact skill overlap with semantic similarity",
          "**Experience Relevance** at 30% weight, measuring how closely the career narrative matches the role",
          "**Education Fit** at 15% weight, with a penalty system for degree mismatches",
          "**Keyword Alignment** at 15% weight, using TF-IDF to catch domain-specific language",
        ],
      },
      {
        type: "paragraph",
        text: "The infrastructure plan was full production stack: FastAPI backend, React frontend, PostgreSQL, Redis caching, Docker containers, GitHub Actions for CI/CD, and AWS EC2 for deployment. Nothing tutorial-level.",
      },
      {
        type: "heading",
        text: "The Data Problem",
      },
      {
        type: "paragraph",
        text: "Every ML project lives or dies on data quality. This one was no different.",
      },
      {
        type: "paragraph",
        text: "I used two main datasets. The first was the Kaggle Resume Dataset with around 19,000 resumes spanning engineering, data science, finance, marketing, and healthcare. The second was a LinkedIn Job Postings dataset with 3.3 million listings, each with structured metadata including required skills, industries, and seniority levels.",
      },
      {
        type: "paragraph",
        text: "The real challenge was that I did not have labeled pairs showing which resumes match which job descriptions. Hiring decisions are private. Nobody publishes ground truth match data.",
      },
      {
        type: "paragraph",
        text: "So I generated my own labels using weak supervision. The approach was simple: embed every resume and every job description using the base sentence-transformer model, compute cosine similarities, and treat pairs with similarity above 0.65 as positive examples and pairs below 0.35 as negatives. This gave me around 5,700 training pairs with a roughly 1:2 positive to negative ratio.",
      },
      {
        type: "paragraph",
        text: "It is not perfect labeling. But it is good enough to teach the model the structure of the domain, and the fine-tuning step does the rest.",
      },
      {
        type: "heading",
        text: "Training the Model",
      },
      {
        type: "paragraph",
        text: "The base model I chose was `all-MiniLM-L6-v2` from sentence-transformers. It is fast, small at 384 dimensions, and already knows how to encode sentence-level meaning. I just needed to adapt it to the specific language of resumes and job postings.",
      },
      {
        type: "paragraph",
        text: "Fine-tuning ran for 5 epochs on a GTX 1650 with 4GB of VRAM. I used `CosineSimilarityLoss`, batch size 32, and a learning rate of 2e-5 with a cosine decay schedule and 200 warmup steps. FP16 training helped fit everything into the GPU memory. The whole run took about 56 minutes.",
      },
      {
        type: "paragraph",
        text: "The results were clear. The base model achieved a Pearson correlation of 0.355 on the validation set. After fine-tuning, that jumped to 0.622, a 75% improvement. The model had learned something real about what makes a resume relevant to a job.",
      },
      {
        type: "paragraph",
        text: "On the full retrieval evaluation across 712 held-out pairs:",
      },
      {
        type: "table",
        headers: ["Metric", "Target", "Achieved"],
        rows: [
          ["NDCG@10", "0.80", "**0.962**"],
          ["AUC-ROC", "0.80", "**0.837**"],
          ["Precision@1", "", "**0.896**"],
          ["MRR", "", "**0.948**"],
          ["NER F1", "0.88", "**0.771**"],
        ],
      },
      {
        type: "paragraph",
        text: "Most targets were exceeded by a comfortable margin. The NER F1 score for skill extraction landed at 0.771, which I will talk about in the challenges section.",
      },
      {
        type: "heading",
        text: "Building the System",
      },
      {
        type: "subheading",
        text: "The ML Pipeline",
      },
      {
        type: "paragraph",
        text: 'Skill extraction runs through spaCy using the transformer-based `en_core_web_trf` model. On top of that, I built a taxonomy of 595 technical skills, 51 soft skills, and 35 certifications. Every extracted entity gets matched against this taxonomy to standardize names like "JS", "JavaScript", and "ECMAScript" into a single canonical form.',
      },
      {
        type: "paragraph",
        text: "The scoring system sits on top of embeddings and NER. For each resume and job description pair, it computes the four weighted components and returns a single percentage with a label: Excellent (above 85), Good (above 70), Fair (above 50), or Poor.",
      },
      {
        type: "subheading",
        text: "The Backend",
      },
      {
        type: "paragraph",
        text: "FastAPI was the right call here. The async capabilities mattered because the bulk recruiter endpoint processes up to 50 resumes concurrently using an 8-thread async pool. A synchronous framework would have made this painful.",
      },
      {
        type: "paragraph",
        text: "The ML service loads once at application startup and lives as a singleton. Model loading takes a few seconds, but every request after that is fast. Redis caches embedding results using SHA-256 keys derived from the text content, so repeated content never gets re-embedded. On a warm cache hit, embedding latency drops to near zero.",
      },
      {
        type: "paragraph",
        text: "The full scoring pipeline on GPU takes around 165ms per resume: about 28ms for embeddings, 86ms for NER, and the rest for the weighted scoring logic. On the AWS t3.micro which is CPU-only, this is roughly 3 to 5 times slower, but still within a usable range.",
      },
      {
        type: "subheading",
        text: "The Frontend",
      },
      {
        type: "paragraph",
        text: "The React frontend has three pages: a landing page for role selection, the Candidate view, and the Recruiter view. I used Tailwind CSS throughout and built support for both dark and light modes.",
      },
      {
        type: "paragraph",
        text: "The Candidate view shows a circular score dial, a skills breakdown, and a list of missing skills with specific suggestions for each one. The Recruiter view shows a sortable table with score badges, and filter controls for minimum score, must-have skills, and experience level. The whole thing was built to look professional, not like a demo.",
      },
      {
        type: "subheading",
        text: "CI/CD and Deployment",
      },
      {
        type: "paragraph",
        text: "The GitHub Actions pipeline has four jobs that run on every push to main:",
      },
      {
        type: "list",
        items: [
          "Python linting with black and flake8, then 30 unit tests",
          "Frontend ESLint and Vite production build check",
          "Multi-stage Docker image builds pushed to GitHub Container Registry",
          "SSH deploy to EC2 with a rolling restart and a smoke test",
        ],
      },
      {
        type: "paragraph",
        text: "The EC2 instance is a t3.micro in AWS eu-north-1. Nginx sits in front as a reverse proxy, routing the root path to the React SPA and `/api/*` traffic to FastAPI. A bootstrap script handles the initial setup of Docker, nginx, and a swap file to help with the limited RAM on t3.micro.",
      },
      {
        type: "heading",
        text: "The Hard Parts",
      },
      {
        type: "subheading",
        text: "Getting Training Data Without Labels",
      },
      {
        type: "paragraph",
        text: "This was the biggest problem at the start. I had resumes and I had job postings but nothing connecting them. Real hiring decisions are not public, and manually labeling thousands of pairs was not realistic.",
      },
      {
        type: "paragraph",
        text: "The weak supervision approach solved this, but it introduced noise. Some pairs near the similarity threshold are genuinely ambiguous. The model can learn the wrong thing from enough noisy labels.",
      },
      {
        type: "paragraph",
        text: "The fix was being careful about the thresholds. I pulled the positive threshold up to 0.65 and the negative threshold down to 0.35, leaving a wide dead zone in between. Pairs in that middle range never made it into training data. This kept the signal clean even if it reduced the size of the training set.",
      },
      {
        type: "subheading",
        text: "NER F1 Score Falling Short",
      },
      {
        type: "paragraph",
        text: "The skill extraction NER score landed at 0.771 against a target of 0.88. This was the one metric that did not hit its goal.",
      },
      {
        type: "paragraph",
        text: "The root cause is taxonomy coverage. The taxonomy covers 595 technical terms, but real resumes mention thousands of tools, frameworks, and technologies. Anything outside the taxonomy gets missed or misclassified, and that pulls down recall.",
      },
      {
        type: "paragraph",
        text: "A bigger taxonomy would help. Training spaCy on domain-specific annotated resume data would help more. I built the taxonomy by hand and ran out of time to expand it properly. This is the most obvious thing to improve in a next iteration.",
      },
      {
        type: "subheading",
        text: "Fitting a Model on 4GB of VRAM",
      },
      {
        type: "paragraph",
        text: "The GTX 1650 has 3.9GB of usable VRAM. Loading `en_core_web_trf` for NER and the fine-tuned sentence-transformer at the same time pushes against that limit.",
      },
      {
        type: "paragraph",
        text: "FP16 training was essential for the fine-tuning run. For inference I kept the models in FP32 since accuracy matters more there, but I had to be careful about batch sizes and never loading both models with large batches simultaneously.",
      },
      {
        type: "subheading",
        text: "Deploying to a t3.micro",
      },
      {
        type: "paragraph",
        text: "A t3.micro has 1GB of RAM. Running four Docker containers on it (FastAPI, React/nginx, PostgreSQL, Redis) required adding a 2GB swap file just to keep the system stable during model loading. The EC2 bootstrap script handles this automatically, but discovering it was necessary came from watching the instance OOM-kill containers during the first deploy attempt.",
      },
      {
        type: "subheading",
        text: "The Docker Image Size Problem",
      },
      {
        type: "paragraph",
        text: "The backend Docker image ended up at 6.6GB. PyTorch, spaCy with the transformer model, and the sentence-transformers library together are heavy. Build times on GitHub Actions were over 20 minutes before I set up proper layer caching.",
      },
      {
        type: "paragraph",
        text: "Multi-stage builds helped at the margins, but the real win was configuring GitHub Actions to cache Docker layers between runs. After that, rebuilds on code changes (with unchanged dependencies) take a few minutes instead of 20+.",
      },
      {
        type: "heading",
        text: "What I Learned",
      },
      {
        type: "paragraph",
        text: "**Weak supervision is underrated.** When you do not have labels, building your own from the data you do have is almost always better than waiting for annotated data or switching to a simpler problem. It requires thinking carefully about what signals are trustworthy, but it works.",
      },
      {
        type: "paragraph",
        text: "**Production infrastructure takes longer than the model.** I spent about as much time on CI/CD, Docker configuration, nginx routing, and AWS setup as I did on the ML pipeline itself. That ratio surprised me. Getting a model to work in a notebook is one thing. Getting it to run reliably on a server with sub-400ms response times is a different project.",
      },
      {
        type: "paragraph",
        text: "**Caching is not optional.** The SHA-256 keyed embedding cache was one of the better decisions I made. Without it, scoring 50 resumes repeatedly against the same job description would re-embed the job description 50 times. The cache drops that to one call per unique text.",
      },
      {
        type: "paragraph",
        text: "**Pick your battles with metrics.** NDCG@10 of 0.962 is excellent. NER F1 of 0.771 is acceptable but below target. Both are real measurements of real behavior. Chasing every metric to 100% is not the goal. Understanding what each one means and which failures actually matter to users is.",
      },
      {
        type: "paragraph",
        text: "**Small models are viable.** MiniLM-L6-v2 encodes 384 dimensions and fits in under 100MB. Fine-tuned on domain-specific data, it produces results that match what much larger models would give on this specific task. Bigger is not always better when the domain is narrow and the training signal is clean.",
      },
      {
        type: "heading",
        text: "Results and What It Looks Like",
      },
      {
        type: "paragraph",
        text: "The system is live at [http://13.51.207.145](http://13.51.207.145) on an AWS EC2 t3.micro in Stockholm.",
      },
      {
        type: "paragraph",
        text: "A candidate uploads their PDF resume, pastes in a job description, and within about 350ms gets a score like 78% (Good), a breakdown showing Skills: 82%, Experience: 74%, Education: 85%, Keywords: 68%, the exact skills they have matched, the skills that are missing, and three or four specific suggestions for what to add to their resume.",
      },
      {
        type: "paragraph",
        text: "A recruiter uploads 50 resumes at once and within about 8 seconds gets a ranked table with names, scores, and a color-coded badge for each candidate. They can filter to show only candidates above 70%, require that Python be present, and sort by any column.",
      },
      {
        type: "paragraph",
        text: "The test suite has 30 tests and all of them pass. The CI/CD pipeline runs automatically on every push and deploys without any manual steps after the first bootstrap.",
      },
      {
        type: "heading",
        text: "What Comes Next",
      },
      {
        type: "paragraph",
        text: "A few things I would build with more time:",
      },
      {
        type: "paragraph",
        text: "The taxonomy expansion is the clearest improvement. Adding another 1,000 to 2,000 terms and including common abbreviations and synonyms would push the NER F1 score meaningfully higher.",
      },
      {
        type: "paragraph",
        text: "Active learning would help too. Real user interactions reveal which scores feel wrong. Logging those and using them to generate better training pairs would make the model improve over time from actual usage.",
      },
      {
        type: "paragraph",
        text: "The recruiter view could support resume summarization, a one-paragraph description of each candidate that the recruiter can read without opening the full PDF.",
      },
      {
        type: "paragraph",
        text: "And the infrastructure could move from a t3.micro to something with a GPU. The latency numbers from the GTX 1650 (165ms per resume) versus the t3.micro estimate (500 to 800ms) are real, and a g4dn.xlarge on AWS would give production-grade GPU inference.",
      },
      {
        type: "heading",
        text: "Closing",
      },
      {
        type: "paragraph",
        text: "HireLens is not a research project and it is not a tutorial. It is a system that handles real PDFs, runs in Docker containers on a real server, deploys automatically from git, and returns results in under 400ms. It has flaws and things I would change, but it works.",
      },
      {
        type: "paragraph",
        text: "The NER F1 score did not hit its target. The t3.micro is not a powerful machine. But the system does what it was supposed to do: read a resume and a job description together, understand whether they fit, and tell you specifically why.",
      },
      {
        type: "paragraph",
        text: "That felt like the point.",
      },
      {
        type: "paragraph",
        text: "The source code is on GitHub at [github.com/Akshats-git/HireLens](https://github.com/Akshats-git/HireLens). The live deployment is at [http://13.51.207.145](http://13.51.207.145).",
      },
    ],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
