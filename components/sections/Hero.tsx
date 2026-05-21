"use client";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles, Terminal, Clock, AlertCircle, GitCommit } from "lucide-react";
import { ParticleField, Spotlight } from "@/components/ui/Background";
import { CopyCommand } from "@/components/ui/CopyCommand";
import { openSignup } from "@/components/ui/SignupDialog";

/* ───────────────────────────────────────────────────────────
   App preview — fully rendered fake product window.
   Click-through is functional (smooth scroll to demo).
─────────────────────────────────────────────────────────── */
function HeroAppPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.55, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative mx-auto max-w-6xl"
    >
      <div className="absolute -inset-12 bg-white/[0.04] rounded-[2.5rem] blur-3xl" />
      <div className="absolute inset-x-12 -top-8 h-32 bg-white/[0.06] blur-3xl rounded-full" />

      <a href="#demo" className="block group/preview">
        <div className="relative glass-strong rounded-2xl overflow-hidden shadow-[0_30px_120px_rgba(0,0,0,0.6)]
                        transition-all duration-500 group-hover/preview:scale-[1.005]">
          {/* chrome */}
          <div className="window-chrome">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="ml-2 text-white/35 text-xs font-mono">lawdmemory ~ acme-corp</span>
            <div className="ml-auto flex items-center gap-2 text-[10px] font-mono text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-white pulse-soft" />
              142,418 memories indexed
            </div>
          </div>

          <div className="grid grid-cols-12 min-h-[440px] divide-x divide-white/[0.04]">
            {/* sidebar */}
            <aside className="col-span-3 hidden md:flex flex-col bg-white/[0.01] p-4 gap-1">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2 px-2">
                Workspaces
              </p>
              {[
                { label: "acme/backend",     active: true,  hint: "428 mem" },
                { label: "acme/frontend",    active: false, hint: "291 mem" },
                { label: "acme/infra",       active: false, hint: "183 mem" },
                { label: "acme/ml-pipeline", active: false, hint: "104 mem" },
              ].map((w) => (
                <div
                  key={w.label}
                  className={`flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-mono transition-colors ${
                    w.active
                      ? "bg-white/10 text-white border border-white/15"
                      : "text-white/40 hover:text-white/70 border border-transparent"
                  }`}
                >
                  <span className="truncate">{w.label}</span>
                  <span className="text-[9px] opacity-50">{w.hint}</span>
                </div>
              ))}

              <div className="mt-5 pt-4 border-t border-white/5">
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-2 px-2">
                  Agents
                </p>
                {[
                  { name: "claude-3.7",  on: true },
                  { name: "copilot",     on: true },
                  { name: "cursor",      on: false },
                ].map((a) => (
                  <div key={a.name} className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono text-white/45">
                    <span className={`w-1.5 h-1.5 rounded-full ${a.on ? "bg-white pulse-soft" : "bg-white/15"}`} />
                    {a.name}
                  </div>
                ))}
              </div>
            </aside>

            {/* main */}
            <section className="col-span-12 md:col-span-6 p-5 space-y-3">
              <div className="flex items-center gap-2.5 bg-black border border-white/8 rounded-lg px-3.5 py-2.5">
                <Terminal className="w-3.5 h-3.5 text-white/55" />
                <span className="font-mono text-xs sm:text-sm text-white/85">
                  Why was Redis introduced into the stack?
                </span>
                <span className="ml-auto font-mono text-xs text-white cursor-blink">▋</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <p className="text-white/35">› querying memory graph · depth=3 ...</p>
                <p className="text-white/55">✓ retrieved 3 memories · 2ms</p>
              </div>

              <div className="bg-black/60 border border-white/8 rounded-lg p-4 text-xs sm:text-[13px] font-mono leading-relaxed">
                <p className="text-white/90">
                  Redis was introduced in{" "}
                  <span className="text-white underline decoration-white/25">commit a3f92b</span> on{" "}
                  <span className="text-white">2024-01-15</span> to address session
                  management bottlenecks identified in{" "}
                  <span className="text-white underline decoration-white/25">incident INC-047</span>.
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {["commit", "incident", "decision", "service:redis"].map((t) => (
                    <span key={t} className="px-1.5 py-0.5 rounded border border-white/12 bg-white/[0.04] text-white/55 text-[10px]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <p className="text-[10px] font-mono text-white/35 uppercase tracking-[0.2em] mb-2">Related Memories</p>
                <div className="space-y-1.5">
                  {[
                    { icon: GitCommit,   label: "commit · a3f92b",          meta: "2024-01-15" },
                    { icon: AlertCircle, label: "INC-047 · Payment outage", meta: "P0 · 23min" },
                    { icon: Clock,       label: "PR #218 · Auth redesign",  meta: "merged" },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-md bg-white/[0.015] border border-white/5 text-xs font-mono hover:bg-white/[0.04] transition-colors"
                    >
                      <m.icon className="w-3 h-3 text-white/45" />
                      <span className="text-white/70 truncate">{m.label}</span>
                      <span className="ml-auto text-white/30 text-[10px]">{m.meta}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* right pane — mini graph */}
            <aside className="col-span-3 hidden lg:flex flex-col bg-white/[0.01] p-4">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-3">Memory Graph</p>
              <div className="relative flex-1 min-h-[280px] rounded-lg bg-black/40 border border-white/5 overflow-hidden">
                <svg viewBox="0 0 200 280" fill="none" className="absolute inset-0 w-full h-full">
                  <g stroke="rgba(255,255,255,0.18)" strokeWidth="0.8">
                    <line x1="100" y1="40"  x2="50"  y2="110" />
                    <line x1="100" y1="40"  x2="150" y2="110" />
                    <line x1="50"  y1="110" x2="60"  y2="200" />
                    <line x1="150" y1="110" x2="130" y2="200" />
                    <line x1="60"  y1="200" x2="100" y2="250" />
                    <line x1="130" y1="200" x2="100" y2="250" />
                    <line x1="50"  y1="110" x2="150" y2="110" />
                  </g>
                  {[
                    { cx: 100, cy: 40,  r: 9, primary: true  },
                    { cx: 50,  cy: 110, r: 7, primary: false },
                    { cx: 150, cy: 110, r: 7, primary: false },
                    { cx: 60,  cy: 200, r: 6, primary: false },
                    { cx: 130, cy: 200, r: 6, primary: true  },
                    { cx: 100, cy: 250, r: 7, primary: false },
                  ].map((n, i) => (
                    <g key={i}>
                      <circle cx={n.cx} cy={n.cy} r={n.r + 4} fill="rgba(255,255,255,0.05)" />
                      <circle cx={n.cx} cy={n.cy} r={n.r}     fill="rgba(255,255,255,0.08)"
                        stroke={n.primary ? "#fff" : "rgba(255,255,255,0.45)"} strokeWidth="1" />
                    </g>
                  ))}
                </svg>
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-white/35">
                  <span>6 nodes · 7 edges</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-white pulse-soft" />
                    live
                  </span>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="bg-white/[0.02] border border-white/5 rounded-md px-2 py-1.5">
                  <p className="text-white text-sm font-bold font-mono">3ms</p>
                  <p className="text-white/35 text-[9px] font-mono uppercase tracking-wider">latency</p>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-md px-2 py-1.5">
                  <p className="text-white text-sm font-bold font-mono">96%</p>
                  <p className="text-white/35 text-[9px] font-mono uppercase tracking-wider">recall</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </a>

      <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-white/[0.025] blur-2xl rounded-full pointer-events-none" />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative pt-28 pb-24 lg:pt-36 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg mask-radial opacity-60 pointer-events-none" />
      <ParticleField density={32} opacity={0.5} />
      <Spotlight size={1100} opacity={0.06} y="28%" />
      <Spotlight size={700}  opacity={0.03} y="65%" x="20%" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-black pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-7"
        >
          <span className="eyebrow">
            <span className="dot" />
            Get Started Today · Public Beta v1.0
          </span>
        </motion.div>

        {/* MASSIVE headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.7 }}
          className="text-center text-5xl sm:text-6xl lg:text-7xl xl:text-[92px] font-black tracking-[-0.045em] leading-[0.94]"
        >
          <span className="block text-white">Give your AI team</span>
          <span className="block text-white mt-1">long-term memory.</span>
        </motion.h1>

        {/* subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="mt-7 text-center text-base sm:text-lg lg:text-xl text-white/55 max-w-2xl mx-auto leading-relaxed"
        >
          Stop losing engineering context. Start building an organization that gets smarter
          with every <span className="text-white/90">commit</span>,{" "}
          <span className="text-white/90">incident</span>, and{" "}
          <span className="text-white/90">architecture decision</span>.
        </motion.p>

        {/* CTAs — FUNCTIONAL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <button onClick={openSignup} className="btn-primary group !px-6 !py-3.5">
            <Sparkles className="w-4 h-4" />
            Deploy LawdMemory
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <a href="/docs" className="btn-secondary !px-6 !py-3.5">
            <BookOpen className="w-4 h-4" />
            Read Documentation
          </a>
        </motion.div>

        {/* trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
        >
          {[
            "Open Source · MIT",
            "Self-hostable",
            "GDPR Compliant",
            "SOC 2 Ready",
            "No vendor lock-in",
          ].map((b) => (
            <div key={b} className="flex items-center gap-2 text-xs text-white/40">
              <div className="w-1 h-1 rounded-full bg-white/55" />
              {b}
            </div>
          ))}
        </motion.div>

        {/* COPYABLE install command */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex justify-center"
        >
          <CopyCommand command="npx create-lawdmemory@latest --org your-team" />
        </motion.div>

        {/* stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center"
        >
          {[
            { v: "142K+", l: "Memories Indexed" },
            { v: "48",    l: "Repos Connected" },
            { v: "3ms",   l: "Avg Retrieval" },
            { v: "99.9%", l: "Uptime" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col items-center">
              <p className="text-2xl font-bold text-white font-mono tabular-nums">{s.v}</p>
              <p className="text-[10px] text-white/35 font-mono uppercase tracking-[0.15em] mt-1">{s.l}</p>
            </div>
          ))}
        </motion.div>

        {/* product preview */}
        <div className="mt-20 lg:mt-24">
          <HeroAppPreview />
        </div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#problem"
            className="text-[10px] font-mono text-white/30 hover:text-white/70 uppercase tracking-[0.3em] transition-colors"
          >
            ↓ Why memory matters
          </a>
        </motion.div>
      </div>
    </section>
  );
}
