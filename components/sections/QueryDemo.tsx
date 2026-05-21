"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight, Clock, Cpu } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

type Line = { text: string; delay: number; intensity?: "dim" | "mid" | "bright" };

const queries: { q: string; response: Line[]; tags: string[] }[] = [
  {
    q: "Why was Redis introduced?",
    response: [
      { text: "› retrieving from memory graph ...",                        delay: 300, intensity: "dim" },
      { text: "✓ found 3 related memories · 2ms",                          delay: 800, intensity: "mid" },
      { text: "",                                                          delay: 900 },
      { text: "Redis was introduced in commit a3f92b on 2024-01-15.",      delay: 1100, intensity: "bright" },
      { text: "Root cause: session bottleneck identified in INC-047.",     delay: 1400, intensity: "mid" },
      { text: "Decision recorded in PR #218 — approved by @alice, @bob.",  delay: 1700, intensity: "mid" },
    ],
    tags: ["commit:a3f92b", "incident:INC-047", "pr:#218", "decision:redis"],
  },
  {
    q: "When did authentication architecture change?",
    response: [
      { text: "› scanning temporal memory index ...",                       delay: 300, intensity: "dim" },
      { text: "✓ found 7 events across 14 months · 4ms",                    delay: 900, intensity: "mid" },
      { text: "",                                                           delay: 1000 },
      { text: "Auth was refactored 3 times:",                               delay: 1200, intensity: "bright" },
      { text: "  [2023-03] JWT → Session cookies (INC-031 trigger)",        delay: 1500, intensity: "mid" },
      { text: "  [2023-09] Added OAuth2 provider (PR #445)",                delay: 1800, intensity: "mid" },
      { text: "  [2024-02] Zero-trust migration (ongoing)",                 delay: 2100, intensity: "mid" },
    ],
    tags: ["temporal:14mo", "arch:auth", "incident:INC-031", "pr:#445"],
  },
  {
    q: "Show incidents related to payments.",
    response: [
      { text: "› semantic search · incident index ...",                     delay: 300, intensity: "dim" },
      { text: "✓ retrieved 5 payment incidents · 1ms",                      delay: 800, intensity: "mid" },
      { text: "",                                                           delay: 900 },
      { text: "INC-047 · 2024-01-12 · P0 · 23min MTTR",                     delay: 1100, intensity: "bright" },
      { text: "INC-031 · 2023-09-04 · P1 · 1h 14min MTTR",                  delay: 1400, intensity: "mid" },
      { text: "INC-018 · 2023-06-22 · P2 · 45min MTTR",                     delay: 1700, intensity: "mid" },
      { text: "Common cause: Stripe webhook timeout (3/5 incidents)",       delay: 2000, intensity: "bright" },
    ],
    tags: ["service:payments", "pattern:webhook-timeout", "severity:P0-P2"],
  },
  {
    q: "What decisions affected scalability?",
    response: [
      { text: "› traversing decision graph · depth=4 ...",                  delay: 300, intensity: "dim" },
      { text: "✓ found 12 architecture decisions · 6ms",                    delay: 900, intensity: "mid" },
      { text: "",                                                           delay: 1000 },
      { text: "High-impact scalability decisions:",                         delay: 1200, intensity: "bright" },
      { text: "  → Redis caching (2024-01) — ↑ 4× throughput",              delay: 1500, intensity: "mid" },
      { text: "  → Monolith→microservices (2023-11) — ↑ deploy velocity",   delay: 1800, intensity: "mid" },
      { text: "  → Postgres read replicas (2023-07) — ↓ latency 60%",       delay: 2100, intensity: "mid" },
    ],
    tags: ["graph:decisions", "impact:scalability", "nodes:12"],
  },
];

const intensityClass: Record<NonNullable<Line["intensity"]>, string> = {
  dim:    "text-white/30",
  mid:    "text-white/65",
  bright: "text-white",
};

function TypeWriter({ text, className }: { text: string; className: string }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!text) return;
    let i = 0;
    const t = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(t);
    }, 14);
    return () => clearInterval(t);
  }, [text]);
  return <span className={className}>{displayed}</span>;
}

export default function QueryDemo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState(0);
  const [phase, setPhase] = useState<"idle" | "loading" | "done">("idle");
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAll = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const run = (idx: number) => {
    clearAll();
    setSelected(idx);
    setPhase("loading");
    setVisibleLines(0);
    const q = queries[idx];
    q.response.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => prev + 1);
        if (i === q.response.length - 1) setPhase("done");
      }, line.delay);
      timeouts.current.push(t);
    });
  };

  useEffect(() => {
    if (inView && phase === "idle") {
      const t = setTimeout(() => run(0), 700);
      timeouts.current.push(t);
    }
    return clearAll;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const q = queries[selected];

  return (
    <section id="demo" ref={ref} className="relative py-32 lg:py-40 overflow-hidden bg-black">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="04"
          label="Query Demo"
          title={
            <>
              Ask anything about your <span className="text-white/40">engineering history.</span>
            </>
          }
          description="LawdMemory retrieves temporal, causal, and semantic context in milliseconds."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid lg:grid-cols-[320px_1fr] gap-6"
        >
          {/* sidebar */}
          <div className="space-y-2">
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.25em] mb-4">Sample Queries</p>
            {queries.map((query, i) => (
              <button
                key={i}
                onClick={() => run(i)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-mono transition-all duration-200 border ${
                  selected === i
                    ? "bg-white/[0.04] border-white/25 text-white glow-soft"
                    : "card-matte text-white/50 hover:text-white hover:border-white/15"
                }`}
              >
                <div className="flex items-center gap-2">
                  <ChevronRight className={`w-3 h-3 flex-shrink-0 ${selected === i ? "text-white" : "text-white/25"}`} />
                  <span className="line-clamp-2">{query.q}</span>
                </div>
              </button>
            ))}
          </div>

          {/* terminal */}
          <div className="relative card-matte rounded-2xl overflow-hidden">
            {/* top bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.015]">
              <div className="w-2 h-2 rounded-full bg-white/25" />
              <div className="w-2 h-2 rounded-full bg-white/25" />
              <div className="w-2 h-2 rounded-full bg-white/25" />
              <span className="ml-2 text-white/30 text-xs font-mono">lawdmemory ~ query terminal</span>
              <div className="ml-auto flex items-center gap-3 text-white/30 text-xs font-mono">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {phase === "done" ? "~3ms" : "..."}</span>
                <span className="flex items-center gap-1"><Cpu className="w-3 h-3 text-white/60" /> claude</span>
              </div>
            </div>

            <div className="p-6 min-h-[380px] font-mono text-sm space-y-1">
              {/* prompt */}
              <div className="flex items-start gap-2 mb-4">
                <span className="text-white">›</span>
                <span className="text-white">{q.q}</span>
              </div>

              {/* lines */}
              {q.response.slice(0, visibleLines).map((line, i) => (
                <div key={`${selected}-${i}`} className="leading-relaxed">
                  {line.text === "" ? (
                    <br />
                  ) : (
                    <TypeWriter
                      text={line.text}
                      className={intensityClass[line.intensity ?? "mid"]}
                    />
                  )}
                </div>
              ))}

              {/* cursor */}
              {phase !== "done" && (
                <span className="inline-block w-2 h-4 bg-white/80 cursor-blink align-middle" />
              )}

              {/* tags */}
              {phase === "done" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-4 border-t border-white/5 flex flex-wrap gap-2"
                >
                  {q.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono px-2 py-1 rounded-lg border border-white/10 bg-white/[0.02] text-white/65"
                    >
                      {tag}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
