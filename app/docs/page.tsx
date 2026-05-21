"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft, Search, GitFork, ArrowRight, ChevronRight,
  BookOpen, Zap, Network, Lock, Database, Code2, Server, Terminal, HelpCircle, Sparkles,
} from "lucide-react";
import Logo from "@/components/Logo";
import { CodeBlock, InlineCode } from "@/components/docs/CodeBlock";
import { openSignup } from "@/components/ui/SignupDialog";
import { toast } from "@/components/ui/Toast";

/* ── sidebar structure ──────────────────────────────────── */
const nav = [
  {
    title: "Getting Started",
    icon: Zap,
    items: [
      { id: "introduction", label: "Introduction" },
      { id: "quick-start",  label: "Quick Start" },
      { id: "authentication", label: "Authentication" },
    ],
  },
  {
    title: "Core Concepts",
    icon: Network,
    items: [
      { id: "memory-graph",      label: "Memory Graph" },
      { id: "temporal-memory",   label: "Temporal Memory" },
      { id: "semantic-search",   label: "Semantic Search" },
    ],
  },
  {
    title: "Integrations",
    icon: Database,
    items: [
      { id: "mcp-server",  label: "MCP Server (Claude)" },
      { id: "github",      label: "GitHub" },
      { id: "webhooks",    label: "Webhooks" },
    ],
  },
  {
    title: "API Reference",
    icon: Code2,
    items: [
      { id: "rest-api",  label: "REST API" },
      { id: "graphql",   label: "GraphQL" },
      { id: "sdks",      label: "SDKs" },
    ],
  },
  {
    title: "Operations",
    icon: Server,
    items: [
      { id: "self-hosting", label: "Self-Hosting" },
      { id: "cli",          label: "CLI Reference" },
    ],
  },
  {
    title: "Resources",
    icon: HelpCircle,
    items: [
      { id: "faqs", label: "FAQs" },
    ],
  },
];

const allItems = nav.flatMap((g) => g.items.map((i) => ({ ...i, group: g.title })));

/* ─────────────────────────────────────────────────────── */
export default function DocsPage() {
  const [search, setSearch] = useState("");
  const [activeId, setActiveId] = useState<string>("introduction");
  const contentRef = useRef<HTMLDivElement>(null);

  /* scroll-spy: highlight active section in sidebar */
  useEffect(() => {
    const sections = allItems
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-100px 0px -65% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const matches = (label: string) =>
    !search || label.toLowerCase().includes(search.toLowerCase());

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ─── Top navbar ─── */}
      <header className="sticky top-0 z-40 glass border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-4">
          {/* logo + back */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <Logo size={26} className="group-hover:opacity-80 transition-opacity" />
            <span className="font-bold text-sm tracking-tight text-white hidden sm:block">
              Lawd<span className="text-white/50 font-normal">Memory</span>
            </span>
            <span className="ml-1 px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-[0.15em] text-white/55 border border-white/10 rounded bg-white/[0.02]">
              docs
            </span>
          </Link>

          <div className="hidden md:block w-px h-5 bg-white/10" />

          <Link
            href="/"
            className="hidden md:inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to site
          </Link>

          {/* search */}
          <div className="flex-1 max-w-md ml-auto">
            <label className="relative block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30" />
              <input
                type="search"
                placeholder="Search docs…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-lg pl-9 pr-12 py-1.5 text-sm
                           placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-white/30 border border-white/10 px-1.5 py-0.5 rounded">
                ⌘K
              </kbd>
            </label>
          </div>

          {/* actions */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => toast("⭐ GitHub repo opens after public release.", "info")}
              className="text-white/40 hover:text-white transition-colors p-1.5"
              title="GitHub"
            >
              <GitFork className="w-4 h-4" />
            </button>
            <button
              onClick={openSignup}
              className="btn-primary group !text-xs !px-3 !py-1.5 !rounded-lg"
            >
              Get Access
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile-only section selector ─── */}
      <div className="lg:hidden sticky top-14 z-30 glass border-b border-white/5 px-4 py-3">
        <label className="block">
          <span className="sr-only">Jump to section</span>
          <select
            value={activeId}
            onChange={(e) => {
              const id = e.target.value;
              setActiveId(id);
              document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="w-full bg-black border border-white/12 rounded-lg px-3 py-2 text-sm text-white
                       focus:outline-none focus:border-white/40"
          >
            {nav.map((g) => (
              <optgroup key={g.title} label={g.title}>
                {g.items.map((i) => (
                  <option key={i.id} value={i.id} className="bg-black">
                    {i.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>

      {/* ─── Body ─── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[240px_1fr_220px] gap-8 py-10">

        {/* ── Sidebar ── */}
        <aside className="hidden lg:block sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto pr-2">
          <nav className="space-y-7">
            {(() => {
              const total = nav.reduce((acc, g) => acc + g.items.filter((i) => matches(i.label)).length, 0);
              if (total === 0) {
                return (
                  <div className="text-xs text-white/40 leading-relaxed px-3 py-4 card-matte rounded-lg">
                    No sections match <span className="text-white font-mono">&quot;{search}&quot;</span>.
                  </div>
                );
              }
              return null;
            })()}
            {nav.map((group) => {
              const visibleItems = group.items.filter((i) => matches(i.label));
              if (visibleItems.length === 0) return null;
              return (
                <div key={group.title}>
                  <div className="flex items-center gap-2 mb-2.5">
                    <group.icon className="w-3.5 h-3.5 text-white/40" />
                    <p className="text-[10px] font-mono text-white/45 uppercase tracking-[0.22em]">
                      {group.title}
                    </p>
                  </div>
                  <ul className="space-y-0.5 border-l border-white/8">
                    {visibleItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`block pl-4 -ml-px py-1.5 text-sm border-l transition-colors ${
                            activeId === item.id
                              ? "text-white border-white"
                              : "text-white/45 hover:text-white/80 border-transparent"
                          }`}
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}

            {/* sidebar CTA */}
            <div className="mt-6 p-4 card-matte rounded-xl">
              <p className="text-xs font-semibold text-white">Need help?</p>
              <p className="text-[11px] text-white/50 mt-1 leading-relaxed">
                Get a personal walk-through from the team.
              </p>
              <button
                onClick={openSignup}
                className="btn-primary !text-[11px] !px-3 !py-1.5 mt-3 w-full justify-center"
              >
                Book a demo
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </nav>
        </aside>

        {/* ── Main content ── */}
        <main ref={contentRef} className="min-w-0 max-w-none">
          {/* breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono text-white/35 mb-6">
            <Link href="/" className="hover:text-white/70 transition-colors">~</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white/55">docs</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{nav.find((g) => g.items.some((i) => i.id === activeId))?.title.toLowerCase().replace(/\s+/g, "-")}</span>
          </nav>

          {/* page header */}
          <div className="mb-12">
            <span className="eyebrow mb-4">
              <span className="dot" />
              Documentation · v1.0
            </span>
            <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-[-0.03em] text-grad leading-[1.05]">
              LawdMemory Docs
            </h1>
            <p className="mt-4 text-base text-white/55 leading-relaxed max-w-2xl">
              The complete reference for building persistent memory into your AI engineering workflow.
              From first install to self-hosted production deployments.
            </p>
          </div>

          {/* ─── Introduction ─── */}
          <Section id="introduction" title="Introduction" eyebrow="Overview">
            <p>
              <strong className="text-white">LawdMemory</strong> is a persistent memory layer for
              AI engineering teams. It ingests your repositories, PRs, incidents, and decisions,
              builds a temporal knowledge graph, and exposes it to AI agents via a simple API.
            </p>
            <p>
              Use it to give Claude, Copilot, Cursor, or any custom agent <em>actual memory</em>{" "}
              of why your architecture looks the way it does — across sessions, sprints, and team members.
            </p>

            <div className="my-7 grid sm:grid-cols-3 gap-3">
              {[
                { icon: Network, t: "Memory Graph",       d: "Every commit, incident, and decision becomes a queryable node." },
                { icon: Sparkles, t: "AI-Native",         d: "MCP-compatible. Works with Claude, GPT, and custom agents." },
                { icon: Lock,    t: "Self-hostable",      d: "MIT-licensed. Run on your infra or our managed cloud." },
              ].map((c) => (
                <div key={c.t} className="card-matte rounded-xl p-4">
                  <c.icon className="w-4 h-4 text-white/70 mb-2" />
                  <p className="text-white font-semibold text-sm">{c.t}</p>
                  <p className="text-white/50 text-xs mt-1 leading-relaxed">{c.d}</p>
                </div>
              ))}
            </div>
          </Section>

          {/* ─── Quick Start ─── */}
          <Section id="quick-start" title="Quick Start" eyebrow="5-minute install">
            <p>Get a working memory graph from your first repo in under 5 minutes.</p>

            <h3>1. Install the CLI</h3>
            <CodeBlock filename="terminal" code={`npm install -g @lawdmemory/cli\n# or use npx — no install required\nnpx create-lawdmemory@latest --org your-team`} />

            <h3>2. Authenticate</h3>
            <p>
              LawdMemory uses keypair-based identity. The CLI generates a DID for you on first run:
            </p>
            <CodeBlock filename="terminal" code={`lawdmemory auth init\n\n▸ generating Ed25519 keypair...\n✓ identity created: did:key:z6MkpTHR8VNs...\n✓ stored in ~/.lawdmemory/identity.json`} />

            <h3>3. Connect your first repo</h3>
            <CodeBlock filename="terminal" code={`lawdmemory connect github \\
    --org acme-corp \\
    --repo backend \\
    --history 365d

▸ scanning 14,328 commits...
▸ extracting decisions from 482 PRs...
▸ indexing 1,204 incident reports...
✓ ingested 142,418 memories in 2m 38s`} />

            <h3>4. Query the graph</h3>
            <CodeBlock filename="terminal" code={`lawdmemory ask "why was Redis added?"\n\n✓ retrieved 3 memories · 2ms\nRedis was introduced in commit a3f92b on 2024-01-15...`} />

            <Callout type="success">
              That&apos;s it. Your team&apos;s memory is now queryable via CLI, REST, GraphQL, and MCP.
            </Callout>
          </Section>

          {/* ─── Authentication ─── */}
          <Section id="authentication" title="Authentication" eyebrow="Identity & Tokens">
            <p>
              LawdMemory uses <strong className="text-white">decentralized identifiers (DIDs)</strong>{" "}
              for human and agent identity. Every actor — human or AI — is identified by a cryptographic keypair.
            </p>

            <h3>API tokens</h3>
            <p>
              For server-to-server calls, mint a scoped API token:
            </p>
            <CodeBlock filename="terminal" code={`lawdmemory tokens create \\
  --name "ci-pipeline" \\
  --scopes "graph:read,memory:write" \\
  --expires 90d`} />

            <h3>Using tokens</h3>
            <CodeBlock language="ts" filename="example.ts" code={`import { LawdMemory } from "@lawdmemory/sdk";

const lm = new LawdMemory({
  apiKey: process.env.LAWDMEMORY_API_KEY,
  org:    "acme-corp",
});

const results = await lm.search("authentication decisions");`} />
          </Section>

          {/* ─── Memory Graph ─── */}
          <Section id="memory-graph" title="Memory Graph" eyebrow="Core Concept">
            <p>
              Every signal LawdMemory ingests becomes a typed <InlineCode>Node</InlineCode> in
              a graph, connected by typed <InlineCode>Edge</InlineCode> relationships.
            </p>

            <h3>Node types</h3>
            <ul>
              <li><InlineCode>repo</InlineCode> — a repository</li>
              <li><InlineCode>service</InlineCode> — a microservice or module</li>
              <li><InlineCode>commit</InlineCode> — a git commit with extracted context</li>
              <li><InlineCode>pr</InlineCode> — a pull request and its discussion</li>
              <li><InlineCode>incident</InlineCode> — an outage or postmortem</li>
              <li><InlineCode>decision</InlineCode> — an extracted architectural choice</li>
              <li><InlineCode>agent</InlineCode> — an AI agent that interacted with the graph</li>
            </ul>

            <h3>Querying the graph</h3>
            <CodeBlock language="ts" code={`const trace = await lm.graph.traverse({
  start:    "decision:redis-caching",
  edges:    ["caused_by", "fixed_by", "discussed_in"],
  depth:    3,
  direction: "both",
});

trace.nodes.forEach(n => console.log(n.type, n.label));`} />
          </Section>

          {/* ─── Temporal Memory ─── */}
          <Section id="temporal-memory" title="Temporal Memory" eyebrow="Core Concept">
            <p>
              Every memory is timestamped and versioned. You can query the graph
              <strong className="text-white"> as of any point in time</strong>.
            </p>

            <CodeBlock language="ts" code={`// What did our architecture look like before INC-047?
const snapshot = await lm.recall({
  query: "current architecture",
  asOf:  "2024-01-11",
});

// Diff between two points in time
const diff = await lm.diff({
  from: "2024-01-01",
  to:   "2024-06-01",
  scope: "auth",
});`} />
          </Section>

          {/* ─── Semantic Search ─── */}
          <Section id="semantic-search" title="Semantic Search" eyebrow="Core Concept">
            <p>
              Semantic search runs over embeddings of every memory in your graph.
              Vector store is pluggable — Pinecone, Qdrant, Weaviate, or self-hosted pgvector.
            </p>

            <CodeBlock language="ts" code={`const hits = await lm.search({
  query:   "performance regression in payment flow",
  k:       10,
  filters: {
    types:  ["incident", "commit"],
    after:  "2024-01-01",
    severity: ["P0", "P1"],
  },
  rerank: true,
});`} />
          </Section>

          {/* ─── MCP Server ─── */}
          <Section id="mcp-server" title="MCP Server (Claude)" eyebrow="Integration">
            <p>
              LawdMemory ships a Model Context Protocol server with <strong className="text-white">25 tools</strong>{" "}
              that Claude and other MCP agents can call directly.
            </p>

            <h3>Claude Desktop config</h3>
            <CodeBlock filename="claude_desktop_config.json" language="json" code={`{
  "mcpServers": {
    "lawdmemory": {
      "command": "npx",
      "args": ["-y", "@lawdmemory/mcp"],
      "env": {
        "LAWDMEMORY_API_KEY": "lm_...",
        "LAWDMEMORY_ORG":      "acme-corp"
      }
    }
  }
}`} />

            <h3>Available tools</h3>
            <p>
              Claude gains: <InlineCode>recall_memory</InlineCode>, <InlineCode>search_graph</InlineCode>,{" "}
              <InlineCode>traverse_decisions</InlineCode>, <InlineCode>get_incident_history</InlineCode>,{" "}
              <InlineCode>find_related_commits</InlineCode>, and 20 more.
            </p>
          </Section>

          {/* ─── GitHub ─── */}
          <Section id="github" title="GitHub" eyebrow="Integration">
            <p>
              Install the GitHub App on your organization to auto-ingest commits, PRs, issues, and discussions.
            </p>
            <CodeBlock filename="terminal" code={`lawdmemory connect github --org acme-corp --repos "*"`} />
            <p>
              The app subscribes to webhooks and ingests every event in real time. Historical
              backfill happens in parallel.
            </p>
          </Section>

          {/* ─── Webhooks ─── */}
          <Section id="webhooks" title="Webhooks" eyebrow="Integration">
            <p>Stream events from any source into the memory graph:</p>
            <CodeBlock language="ts" filename="server.ts" code={`import express from "express";
import { LawdMemory } from "@lawdmemory/sdk";

const app = express();
const lm  = new LawdMemory({ apiKey: process.env.LM_KEY! });

app.post("/webhook/sentry", express.json(), async (req, res) => {
  await lm.ingest.incident({
    source:  "sentry",
    title:   req.body.event.title,
    severity: req.body.event.level,
    metadata: req.body,
  });
  res.sendStatus(200);
});`} />
          </Section>

          {/* ─── REST API ─── */}
          <Section id="rest-api" title="REST API" eyebrow="Reference">
            <p>
              Base URL: <InlineCode>https://api.lawdmemory.dev/v1</InlineCode>
            </p>

            <h3>Common endpoints</h3>
            <Endpoint method="POST" path="/recall"      desc="Retrieve memories matching a natural-language query." />
            <Endpoint method="GET"  path="/memories/:id" desc="Fetch a single memory by ID." />
            <Endpoint method="POST" path="/graph/query"  desc="Run a graph traversal." />
            <Endpoint method="POST" path="/search"       desc="Semantic vector search." />
            <Endpoint method="POST" path="/ingest"       desc="Ingest a new memory event." />

            <h3>Example request</h3>
            <CodeBlock filename="curl" code={`curl -X POST https://api.lawdmemory.dev/v1/recall \\
  -H "Authorization: Bearer $LM_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "why was Redis introduced",
    "depth": 3
  }'`} />
          </Section>

          {/* ─── GraphQL ─── */}
          <Section id="graphql" title="GraphQL" eyebrow="Reference">
            <p>The GraphQL endpoint supports queries, mutations, and subscriptions.</p>
            <CodeBlock language="graphql" filename="query.graphql" code={`query MemoryQuery($q: String!) {
  recall(query: $q, depth: 3) {
    memories {
      id
      type
      label
      createdAt
      sources { type ref }
    }
    latencyMs
  }
}`} />
          </Section>

          {/* ─── SDKs ─── */}
          <Section id="sdks" title="SDKs" eyebrow="Reference">
            <p>First-party SDKs for the two languages that matter for AI infra:</p>
            <div className="grid sm:grid-cols-2 gap-3 my-5">
              <SDKCard lang="TypeScript" cmd="npm install @lawdmemory/sdk" />
              <SDKCard lang="Python"     cmd="pip install lawdmemory" />
            </div>
            <CodeBlock language="py" filename="example.py" code={`from lawdmemory import LawdMemory

lm = LawdMemory(api_key=os.environ["LM_KEY"], org="acme-corp")

result = lm.recall("why was Redis added?")
print(result.summary)`} />
          </Section>

          {/* ─── Self-Hosting ─── */}
          <Section id="self-hosting" title="Self-Hosting" eyebrow="Operations">
            <p>
              LawdMemory is MIT-licensed and ships as a single Docker image with a Postgres + pgvector dependency.
            </p>
            <CodeBlock filename="docker-compose.yml" language="yaml" code={`services:
  lawdmemory:
    image: ghcr.io/lawdmemory/server:latest
    ports: ["8080:8080"]
    environment:
      DATABASE_URL: postgres://lm:lm@db:5432/lawdmemory
      JWT_SECRET:   \${JWT_SECRET}
  db:
    image: pgvector/pgvector:pg16
    volumes: ["pgdata:/var/lib/postgresql/data"]
volumes: { pgdata: {} }`} />

            <Callout type="info">
              For multi-region deployments and high-availability setup, see the{" "}
              <button
                onClick={() => toast("Production checklist available after signup.", "info")}
                className="underline decoration-white/40 hover:decoration-white text-white"
              >
                production checklist
              </button>
              .
            </Callout>
          </Section>

          {/* ─── CLI ─── */}
          <Section id="cli" title="CLI Reference" eyebrow="Operations">
            <p>The CLI is the fastest way to interact with your workspace.</p>
            <div className="space-y-2 my-5">
              {[
                { cmd: "lawdmemory init",            d: "Initialize a new workspace" },
                { cmd: "lawdmemory connect <source>", d: "Connect a data source (github, linear, sentry...)" },
                { cmd: "lawdmemory ask <query>",      d: "Query the memory graph from the terminal" },
                { cmd: "lawdmemory tokens create",    d: "Mint an API token" },
                { cmd: "lawdmemory sync",             d: "Force a re-sync of all sources" },
                { cmd: "lawdmemory status",           d: "Show ingestion and indexing health" },
              ].map((c) => (
                <div key={c.cmd} className="flex items-start gap-4 px-4 py-3 card-matte rounded-lg">
                  <Terminal className="w-3.5 h-3.5 text-white/40 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-mono text-sm text-white">{c.cmd}</p>
                    <p className="text-white/45 text-xs mt-0.5">{c.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* ─── FAQs ─── */}
          <Section id="faqs" title="FAQs" eyebrow="Resources">
            {[
              {
                q: "Is LawdMemory really open source?",
                a: "Yes — MIT licensed, source available on GitHub. You can self-host indefinitely without paying us a cent.",
              },
              {
                q: "What's the difference between LawdMemory and a vector database?",
                a: "Vector stores answer 'find me similar text'. LawdMemory answers 'why did this happen, when, and what changed because of it' — semantic + temporal + causal.",
              },
              {
                q: "Do you train on my code?",
                a: "No. Embeddings are generated locally or via your chosen provider (OpenAI, Cohere, Voyage). We never see plaintext.",
              },
              {
                q: "How do AI agents access the memory?",
                a: "Via the MCP server (for Claude / MCP-compatible agents), REST API, GraphQL, or our TypeScript/Python SDKs.",
              },
            ].map((f) => (
              <details key={f.q} className="group card-matte rounded-xl px-5 py-4 my-2.5">
                <summary className="flex items-center justify-between cursor-pointer text-white font-medium text-sm list-none">
                  {f.q}
                  <ChevronRight className="w-4 h-4 text-white/40 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-white/55 text-sm mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </Section>

          {/* footer pager */}
          <div className="mt-16 pt-8 border-t border-white/8 flex flex-wrap items-center justify-between gap-4">
            <Link href="/" className="btn-secondary !text-sm">
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to LawdMemory
            </Link>
            <button onClick={openSignup} className="btn-primary !text-sm">
              <BookOpen className="w-3.5 h-3.5" />
              Get full docs access
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </main>

        {/* ── On this page (TOC) ── */}
        <aside className="hidden xl:block sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto">
          <p className="text-[10px] font-mono text-white/45 uppercase tracking-[0.22em] mb-3">
            On this page
          </p>
          <ul className="space-y-1.5 border-l border-white/8">
            {allItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`block pl-3 -ml-px py-0.5 text-[12px] border-l transition-colors ${
                    activeId === item.id
                      ? "text-white border-white"
                      : "text-white/40 hover:text-white/70 border-transparent"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

/* ─── Doc primitives ───────────────────────────────────── */
function Section({ id, title, eyebrow, children }: {
  id: string; title: string; eyebrow?: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-20 doc-prose">
      {eyebrow && (
        <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.22em] mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-black tracking-[-0.02em] text-white mb-5">
        {title}
      </h2>
      <div className="doc-body">{children}</div>
    </section>
  );
}

function Callout({ type, children }: { type: "info" | "success"; children: React.ReactNode }) {
  return (
    <div className={`my-5 not-prose flex gap-3 p-4 rounded-xl border ${
      type === "success" ? "border-white/20 bg-white/[0.04]" : "border-white/10 bg-white/[0.02]"
    }`}>
      <div className="w-1 rounded-full bg-white/50 shrink-0" />
      <div className="text-sm text-white/80 leading-relaxed">{children}</div>
    </div>
  );
}

function Endpoint({ method, path, desc }: { method: string; path: string; desc: string }) {
  return (
    <div className="not-prose flex items-center gap-4 px-4 py-3 my-1.5 card-matte rounded-lg">
      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white text-black tracking-wider shrink-0">
        {method}
      </span>
      <code className="font-mono text-sm text-white shrink-0">{path}</code>
      <span className="text-white/45 text-xs ml-auto text-right">{desc}</span>
    </div>
  );
}

function SDKCard({ lang, cmd }: { lang: string; cmd: string }) {
  return (
    <div className="not-prose card-matte rounded-xl p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-white font-semibold text-sm">{lang}</p>
        <span className="text-[10px] font-mono text-white/35">v1.0</span>
      </div>
      <code className="text-[12px] font-mono text-white/70 block">{cmd}</code>
    </div>
  );
}
