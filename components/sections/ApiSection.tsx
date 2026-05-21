"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Webhook, Network, Database, Code2, GitMerge, Layers, Copy, Check } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { toast } from "@/components/ui/Toast";

const apis = [
  { icon: Code2,    label: "MCP Integration",      desc: "25 tools for Claude, GPT, and any MCP-compatible agent." },
  { icon: Network,  label: "Graph API",             desc: "Query the knowledge graph via REST and GraphQL." },
  { icon: Database, label: "Embedding Pipeline",    desc: "Pipe repo content into your own vector store." },
  { icon: Webhook,  label: "Webhook Ingestion",     desc: "Real-time ingestion from GitHub, Linear, PagerDuty." },
  { icon: GitMerge, label: "Vector Retrieval",      desc: "Semantic search over millions of engineering memories." },
  { icon: Layers,   label: "Knowledge Graph Sync",  desc: "Bidirectional sync with your existing data platforms." },
];

const snippets: Record<string, string> = {
  "MCP Integration": `// Claude agent with LawdMemory
import { LawdMemory } from "@lawdmemory/mcp";

const mcp = new LawdMemory({ org: "acme-corp" });

const agent = new ClaudeAgent({
  tools:  mcp.tools,    // 25 memory tools
  memory: mcp.recall,   // auto-inject context
});

await agent.run("Why is Redis in the stack?");`,

  "Graph API": `# Query the knowledge graph
curl -s https://api.lawdmemory.dev/v1/graph/query \\
  -H "Authorization: Bearer $TOKEN" \\
  -d '{
    "query": "decisions affecting auth",
    "depth": 3,
    "types": ["decision", "incident", "commit"]
  }'`,

  "Embedding Pipeline": `# Stream embeddings to your vector store
import lawdmemory

pipe = lawdmemory.pipeline(
    org="acme-corp",
    repos=["backend", "frontend"],
    destination="pinecone",
    chunk_strategy="semantic",
)

await pipe.run()`,

  "Webhook Ingestion": `// Real-time event ingestion
const webhook = new LawdMemory.Webhook({
  secret: process.env.LM_WEBHOOK_SECRET,
});

// GitHub events → memory graph
app.post("/webhook/github", webhook.handler({
  on_push:         (e) => ingest.commit(e),
  on_pull_request: (e) => ingest.pr(e),
  on_issues:       (e) => ingest.issue(e),
}));`,

  "Vector Retrieval": `// Semantic search over memories
const results = await lawdmemory.search({
  query: "Redis session management decision",
  k: 10,
  filters: {
    repos: ["backend"],
    types: ["decision", "commit"],
    after: "2023-01-01",
  },
  rerank: true,
});`,

  "Knowledge Graph Sync": `# Sync knowledge graph to Notion / Confluence
lawdmemory sync \\
  --source github:acme-corp \\
  --destination notion:workspace \\
  --strategy incremental \\
  --interval 1h`,
};

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        toast("Code copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      }}
      className="text-white/30 hover:text-white transition-colors"
      title="Copy code"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function ApiSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState("MCP Integration");

  return (
    <section id="api" ref={ref} className="relative py-32 lg:py-40 overflow-hidden bg-black">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="07"
          label="Open API"
          title={
            <>
              Build on <span className="text-white/40">LawdMemory.</span>
            </>
          }
          description="Fully open API. Connect any agent, any data source, any workflow."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="grid lg:grid-cols-[300px_1fr] gap-4"
        >
          {/* sidebar */}
          <div className="space-y-2">
            {apis.map((api) => (
              <button
                key={api.label}
                onClick={() => setActive(api.label)}
                className={`group w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                  active === api.label
                    ? "bg-white/[0.04] border-white/25 glow-soft"
                    : "card-matte hover:border-white/15 hover:bg-white/[0.015]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <api.icon
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 transition-colors ${
                      active === api.label ? "text-white" : "text-white/35"
                    }`}
                  />
                  <div>
                    <p className={`text-sm font-medium ${active === api.label ? "text-white" : "text-white/60"}`}>
                      {api.label}
                    </p>
                    <p className="text-xs text-white/30 mt-0.5 leading-snug">{api.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* code window */}
          <div className="relative card-matte rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.015]">
              <div className="w-2 h-2 rounded-full bg-white/25" />
              <div className="w-2 h-2 rounded-full bg-white/25" />
              <div className="w-2 h-2 rounded-full bg-white/25" />
              <span className="ml-2 text-white/30 text-xs font-mono">
                {active.toLowerCase().replace(/\s+/g, "_")}.ts
              </span>
              <div className="ml-auto">
                <CopyButton code={snippets[active]} />
              </div>
            </div>

            <motion.pre
              key={active}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="p-6 text-sm font-mono text-white/75 overflow-x-auto leading-relaxed"
            >
              <code>{snippets[active]}</code>
            </motion.pre>
          </div>
        </motion.div>

        {/* bottom badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 flex flex-wrap justify-center gap-2"
        >
          {[
            "MIT License", "Self-hostable", "OpenAPI 3.1", "GraphQL",
            "MCP v1.0", "TypeScript SDK", "Python SDK", "REST API",
          ].map((b) => (
            <span
              key={b}
              className="text-[11px] font-mono text-white/55 border border-white/10 bg-white/[0.02] px-3 py-1.5 rounded-lg"
            >
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
