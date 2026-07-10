export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "list"; items: string[] };

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
    slug: "getting-started-with-nextjs-15",
    title: "Getting Started with Next.js 15",
    description:
      "A practical guide to building web apps with Next.js 15, covering the App Router, Server Components, and performance.",
    date: "March 15, 2024",
    readTime: "8 min",
    category: "Web Development",
    tags: ["Next.js", "React", "Web Development"],
    content: [
      {
        type: "paragraph",
        text: "Next.js 15 is a big step forward for React. It improves the App Router, upgrades Server Components, and adds several performance gains. Because of this, it has become a popular choice for building production web applications.",
      },
      {
        type: "heading",
        text: "Why Next.js 15?",
      },
      {
        type: "paragraph",
        text: "The framework has matured a lot since its early days. Next.js 15 makes features that used to be experimental stable, and it adds new tools that make full-stack development easier.",
      },
      {
        type: "list",
        items: [
          "Stable App Router with improved caching semantics",
          "Turbopack as the default bundler for development",
          "Enhanced Server Actions with better error handling",
          "Partial Prerendering for optimal loading performance",
          "Improved TypeScript support and type inference",
        ],
      },
      {
        type: "heading",
        text: "Setting Up Your Project",
      },
      {
        type: "paragraph",
        text: "Getting started with Next.js 15 is straightforward. The create-next-app CLI has been updated with new templates and improved defaults.",
      },
      {
        type: "code",
        language: "bash",
        code: "npx create-next-app@latest my-app --typescript --tailwind --app\ncd my-app\nnpm run dev",
      },
      {
        type: "paragraph",
        text: "This sets up a project with TypeScript, Tailwind CSS, and the App Router, which is the recommended stack for new projects.",
      },
      {
        type: "heading",
        text: "Understanding the App Router",
      },
      {
        type: "paragraph",
        text: "The App Router uses a file-system based routing mechanism where folders define routes. Each folder can contain a page.tsx for the UI, layout.tsx for shared layouts, and loading.tsx for streaming states.",
      },
      {
        type: "code",
        language: "typescript",
        code: `// app/blog/[slug]/page.tsx
export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  return <article>{post.content}</article>;
}`,
      },
      {
        type: "heading",
        text: "Server Components by Default",
      },
      {
        type: "paragraph",
        text: "In Next.js 15, components are Server Components by default. This means they render on the server, reducing the JavaScript sent to the client. You only opt into client-side interactivity when you need it with the 'use client' directive.",
      },
      {
        type: "paragraph",
        text: "This change leads to faster initial page loads, better SEO, and a clearer idea of where your code runs. With Partial Prerendering, you also get both static and dynamic rendering in the same app.",
      },
    ],
  },
  {
    id: 2,
    slug: "machine-learning-model-deployment",
    title: "Machine Learning Model Deployment",
    description:
      "How to deploy machine learning models to production, covering containers, scaling, and monitoring.",
    date: "March 10, 2024",
    readTime: "12 min",
    category: "Machine Learning",
    tags: ["ML", "DevOps", "Python"],
    content: [
      {
        type: "paragraph",
        text: "Building a machine learning model is only half the work. The harder part is deploying it to production so it can serve predictions reliably at scale. This guide covers the main steps for taking your models from notebooks to production.",
      },
      {
        type: "heading",
        text: "The Deployment Gap",
      },
      {
        type: "paragraph",
        text: "Many data scientists can train excellent models but struggle with deployment. The gap between a Jupyter notebook and a production API involves considerations around infrastructure, scalability, monitoring, and maintainability.",
      },
      {
        type: "list",
        items: [
          "Model serialization and versioning",
          "API design and input validation",
          "Container orchestration with Docker and Kubernetes",
          "Load balancing and auto-scaling",
          "Monitoring model performance and data drift",
        ],
      },
      {
        type: "heading",
        text: "Containerizing Your Model",
      },
      {
        type: "paragraph",
        text: "Docker provides a consistent environment for your model, eliminating the classic 'it works on my machine' problem. A well-structured Dockerfile ensures reproducibility across development, staging, and production.",
      },
      {
        type: "code",
        language: "dockerfile",
        code: `FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY model/ ./model/
COPY app.py .

EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]`,
      },
      {
        type: "heading",
        text: "Building the Prediction API",
      },
      {
        type: "paragraph",
        text: "FastAPI is an excellent choice for serving ML models. It provides automatic request validation, OpenAPI documentation, and async support out of the box.",
      },
      {
        type: "code",
        language: "python",
        code: `from fastapi import FastAPI
from pydantic import BaseModel
import joblib

app = FastAPI()
model = joblib.load("model/classifier.pkl")

class PredictionRequest(BaseModel):
    features: list[float]

@app.post("/predict")
async def predict(request: PredictionRequest):
    prediction = model.predict([request.features])
    return {"prediction": prediction[0].tolist()}`,
      },
      {
        type: "heading",
        text: "Monitoring in Production",
      },
      {
        type: "paragraph",
        text: "Once deployed, monitoring is critical. Track prediction latency, throughput, error rates, and, most of all, data drift. If the incoming data starts to differ from your training data, model performance will drop without any obvious errors.",
      },
      {
        type: "list",
        items: [
          "Set up alerting for prediction latency spikes",
          "Log input distributions and compare against training data",
          "Implement A/B testing for model version comparisons",
          "Schedule periodic retraining pipelines",
        ],
      },
      {
        type: "paragraph",
        text: "A good deployment pipeline brings these parts together: containers for consistency, APIs for serving, and monitoring for reliability. Start simple and add more only when you need it.",
      },
    ],
  },
  {
    id: 3,
    slug: "advanced-typescript-patterns",
    title: "Advanced TypeScript Patterns",
    description:
      "A look at advanced TypeScript patterns, including generics, conditional types, and utility types for type-safe code.",
    date: "March 5, 2024",
    readTime: "10 min",
    category: "TypeScript",
    tags: ["TypeScript", "Best Practices"],
    content: [
      {
        type: "paragraph",
        text: "TypeScript has one of the strongest type systems among mainstream languages. Beyond basic type annotations, it gives you tools to model complex data with compile-time safety. Here are a few patterns that go past everyday TypeScript usage.",
      },
      {
        type: "heading",
        text: "Generic Constraints",
      },
      {
        type: "paragraph",
        text: "Generics become truly powerful when combined with constraints. By narrowing what a generic type can be, you unlock autocompletion and catch errors that would otherwise slip through.",
      },
      {
        type: "code",
        language: "typescript",
        code: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Alice", age: 30, email: "alice@example.com" };
const name = getProperty(user, "name"); // type: string
const age = getProperty(user, "age");   // type: number
// getProperty(user, "address"); // Error: not assignable to "name" | "age" | "email"`,
      },
      {
        type: "heading",
        text: "Conditional Types",
      },
      {
        type: "paragraph",
        text: "Conditional types allow you to create types that depend on other types, similar to ternary expressions but at the type level. They are the foundation of many advanced patterns.",
      },
      {
        type: "code",
        language: "typescript",
        code: `type ApiResponse<T> = T extends Array<infer U>
  ? { data: U[]; total: number }
  : { data: T };

type UserListResponse = ApiResponse<User[]>;
// { data: User[]; total: number }

type SingleUserResponse = ApiResponse<User>;
// { data: User }`,
      },
      {
        type: "heading",
        text: "Discriminated Unions",
      },
      {
        type: "paragraph",
        text: "Discriminated unions combine literal types with union types to create type-safe state machines. They are essential for modeling states that carry different data.",
      },
      {
        type: "code",
        language: "typescript",
        code: `type RequestState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

function handleState(state: RequestState<User>) {
  switch (state.status) {
    case "success":
      console.log(state.data.name); // TypeScript knows data exists
      break;
    case "error":
      console.error(state.error.message); // TypeScript knows error exists
      break;
  }
}`,
      },
      {
        type: "heading",
        text: "Template Literal Types",
      },
      {
        type: "paragraph",
        text: "Template literal types let you construct string types from other types, enabling patterns like type-safe event emitters and route definitions.",
      },
      {
        type: "code",
        language: "typescript",
        code: `type EventName = "click" | "focus" | "blur";
type HandlerName = \`on\${Capitalize<EventName>}\`;
// "onClick" | "onFocus" | "onBlur"

type CSSProperty = "margin" | "padding";
type Direction = "top" | "right" | "bottom" | "left";
type CSSSpacing = \`\${CSSProperty}-\${Direction}\`;
// "margin-top" | "margin-right" | ... | "padding-left"`,
      },
      {
        type: "paragraph",
        text: "These patterns work together to catch whole classes of bugs at compile time. Learning them takes some effort, but it pays off as your codebase grows. Refactors become safer, APIs document themselves, and many runtime errors turn into compile-time errors.",
      },
    ],
  },
  {
    id: 4,
    slug: "building-real-time-applications",
    title: "Building Real-time Applications",
    description:
      "How to build real-time apps with WebSocket, Socket.IO, and Firebase for instant data updates.",
    date: "February 28, 2024",
    readTime: "9 min",
    category: "Web Development",
    tags: ["WebSocket", "Real-time", "Backend"],
    content: [
      {
        type: "paragraph",
        text: "Real-time features are now expected in most modern apps. From chat apps to live dashboards, users want instant updates without refreshing the page. This post looks at the main technologies and patterns that make that possible.",
      },
      {
        type: "heading",
        text: "WebSocket Fundamentals",
      },
      {
        type: "paragraph",
        text: "WebSocket provides a persistent, full-duplex connection between client and server. Unlike HTTP's request-response model, WebSocket allows both parties to send data at any time, making it ideal for real-time communication.",
      },
      {
        type: "code",
        language: "typescript",
        code: `// Server (Node.js)
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data.toString());
      }
    });
  });
});`,
      },
      {
        type: "heading",
        text: "Socket.IO for Production",
      },
      {
        type: "paragraph",
        text: "While raw WebSocket works well, Socket.IO adds critical production features: automatic reconnection, room-based messaging, acknowledgments, and fallback transports for environments where WebSocket is blocked.",
      },
      {
        type: "code",
        language: "typescript",
        code: `// Server
import { Server } from "socket.io";

const io = new Server(3001, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("join-room", (roomId: string) => {
    socket.join(roomId);
  });

  socket.on("message", ({ roomId, text }) => {
    io.to(roomId).emit("message", {
      text,
      sender: socket.id,
      timestamp: Date.now(),
    });
  });
});`,
      },
      {
        type: "heading",
        text: "Choosing the Right Technology",
      },
      {
        type: "paragraph",
        text: "The choice between WebSocket, Socket.IO, Server-Sent Events (SSE), and Firebase depends on your use case and constraints.",
      },
      {
        type: "list",
        items: [
          "WebSocket: Low-level, full control, best for custom protocols",
          "Socket.IO: Production-ready with rooms, reconnection, and broadcasting",
          "SSE: Server-to-client only, simpler than WebSocket, works over HTTP/2",
          "Firebase Realtime DB: Fully managed, best for rapid prototyping and mobile apps",
        ],
      },
      {
        type: "heading",
        text: "Scaling Real-time Systems",
      },
      {
        type: "paragraph",
        text: "Scaling WebSocket connections is fundamentally different from scaling HTTP. Each connection maintains state, so you need strategies for distributing connections across servers while ensuring messages reach the right clients.",
      },
      {
        type: "list",
        items: [
          "Use Redis pub/sub as a message broker between server instances",
          "Implement sticky sessions at the load balancer level",
          "Consider connection limits per server (typically 10k-50k per instance)",
          "Use heartbeats to detect and clean up stale connections",
        ],
      },
      {
        type: "paragraph",
        text: "Real-time features add complexity to your architecture, but the user experience gains are substantial. Start with the simplest solution that meets your requirements and scale up as needed.",
      },
    ],
  },
];

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
