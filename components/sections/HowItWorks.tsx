"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Download, Cpu, Search, GitPullRequest, FileText, AlertCircle,
  Database, Network, Clock, Lightbulb,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const steps = [
  {
    id: "01",
    label: "INGEST",
    title: "Connect your engineering universe",
    desc: "LawdMemory ingests every signal from your development workflow — from git commits to incident postmortems.",
    icon: Download,
    items: [
      { icon: GitPullRequest, label: "GitHub repositories & PRs" },
      { icon: FileText,       label: "Issues & discussions" },
      { icon: AlertCircle,    label: "Incident reports" },
      { icon: Database,       label: "Internal docs & wikis" },
    ],
    code: `$ lawdmemory connect github \\
    --org acme-corp \\
    --repos "*" \\
    --history 365d

▸ scanning 48 repositories ...
✓ ingested 142,418 memories`,
  },
  {
    id: "02",
    label: "UNDERSTAND",
    title: "Build the knowledge graph",
    desc: "AI extracts semantic meaning, temporal relationships, and causal chains from every engineering signal.",
    icon: Cpu,
    items: [
      { icon: Network,   label: "Knowledge graph generation" },
      { icon: Database,  label: "Semantic embedding" },
      { icon: Clock,     label: "Temporal memory indexing" },
      { icon: Lightbulb, label: "Decision extraction" },
    ],
    code: `// extracted automatically
{
  type:    "decision",
  subject: "Redis",
  reason:  "Session bottleneck",
  refs:    ["INC-047", "a3f92b"],
  impact:  "↑ 4x throughput"
}`,
  },
  {
    id: "03",
    label: "RECALL",
    title: "Instant engineering intelligence",
    desc: "AI agents get instant access to historical context, architectural decisions, and relevant incidents — in real time.",
    icon: Search,
    items: [
      { icon: Search,   label: "Semantic memory search" },
      { icon: Cpu,      label: "Context injection for AI" },
      { icon: Clock,    label: "Historical reasoning" },
      { icon: Network,  label: "Graph traversal queries" },
    ],
    code: `const memory = await lawdmemory.recall({
  query:   "why was Redis added?",
  depth:   3,
  include: ["commits", "incidents"]
})

▸ retrieved in 3ms · 96% recall`,
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="how-it-works" ref={ref} className="relative py-32 lg:py-40 overflow-hidden bg-black">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="02"
          label="How It Works"
          title={
            <>
              Three steps to <span className="text-white/40">infinite memory.</span>
            </>
          }
          description="From raw repository data to AI-ready organizational memory in minutes — fully automated."
        />

        {/* steps timeline */}
        <div className="relative space-y-4">
          {/* vertical line behind cards */}
          <div className="hidden lg:block absolute left-[60px] top-8 bottom-8 w-px bg-gradient-to-b from-white/15 via-white/8 to-white/15" />

          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.65 }}
              className="relative card-matte rounded-2xl overflow-hidden grid lg:grid-cols-[120px_1fr_420px] items-stretch group"
            >
              {/* step indicator */}
              <div className="relative flex lg:flex-col items-center lg:items-start lg:justify-center gap-3 p-6 lg:p-8 lg:border-r border-white/5">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/10 rounded-xl blur-md group-hover:bg-white/15 transition-all" />
                  <div className="relative w-12 h-12 rounded-xl border border-white/15 bg-white/[0.04] flex items-center justify-center glow-soft">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-white/35 tracking-[0.2em]">
                    STEP {step.id}
                  </p>
                  <p className="text-[11px] font-mono font-bold text-white tracking-[0.2em] mt-0.5">
                    {step.label}
                  </p>
                </div>
              </div>

              {/* content */}
              <div className="px-6 lg:px-8 py-6 lg:py-8 space-y-4 border-t lg:border-t-0 border-white/5">
                <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed max-w-xl">{step.desc}</p>
                <div className="grid grid-cols-2 gap-y-2 gap-x-6 pt-1">
                  {step.items.map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5">
                      <item.icon className="w-3.5 h-3.5 text-white/40 shrink-0" />
                      <span className="text-xs text-white/60">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* code panel */}
              <div className="bg-black border-t lg:border-t-0 lg:border-l border-white/5 p-4 lg:p-5 font-mono">
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                  <span className="ml-1.5 text-white/25 text-[10px]">terminal</span>
                  <span className="ml-auto text-white/20 text-[10px]">{step.id}</span>
                </div>
                <pre className="text-[11px] lg:text-xs text-white/75 whitespace-pre-wrap leading-relaxed overflow-hidden">
                  {step.code}
                </pre>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
