"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BrainCog, Layers, Shuffle, EyeOff } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const problems = [
  {
    icon: BrainCog,
    title: "AI forgets architecture",
    desc: "Every new session starts blank. Your AI assistant has no memory of why services were split, why databases were chosen, or what tradeoffs were made.",
  },
  {
    icon: EyeOff,
    title: "Context disappears",
    desc: "Between chat sessions, sprints, and team members — critical engineering context evaporates. The 'why' behind every decision is lost forever.",
  },
  {
    icon: Shuffle,
    title: "Knowledge is scattered",
    desc: "Architecture lives in Notion. Bugs live in Jira. Decisions live in Slack. No AI can reason across this fragmented landscape.",
  },
  {
    icon: Layers,
    title: "History becomes invisible",
    desc: "After 6 months, no one remembers why that refactor happened, what broke in the incident, or which PR introduced the regression.",
  },
];

export default function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="problem" ref={ref} className="relative py-32 lg:py-40 overflow-hidden bg-black">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="01"
          label="The Problem"
          title={
            <>
              AI agents have <span className="text-white/40">no memory.</span>
            </>
          }
          description="Today's AI coding tools are brilliant — but amnesiac. They can't remember what happened yesterday, last month, or last year."
        />

        {/* cards */}
        <div className="grid sm:grid-cols-2 gap-3 lg:gap-4">
          {problems.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.6 }}
              className="card-matte rounded-2xl p-7 lift shimmer group"
            >
              <div className="flex items-start gap-5">
                <div className="shrink-0 w-11 h-11 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/5">
                  <p.icon className="w-5 h-5 text-white/75 group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-2 min-w-0">
                  <h3 className="text-white font-bold text-lg tracking-tight">{p.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                <span className="text-[10px] font-mono text-white/30 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/40 pulse-soft" />
                  context.lost = true
                </span>
                <span className="text-[10px] font-mono text-white/25">
                  err · 0x{(i * 13 + 47).toString(16).toUpperCase()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* stat bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.55, duration: 0.6 }}
          className="mt-10 card-matte rounded-2xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/[0.06]"
        >
          {[
            { v: "87%",  l: "of engineering context lost within 3 months" },
            { v: "4.2h", l: "wasted re-discovering decisions per week" },
            { v: "23%",  l: "of bugs caused by forgotten context" },
            { v: "$0",   l: "persistent memory in existing AI tools" },
          ].map((s, i) => (
            <div key={i} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <p className="text-3xl lg:text-4xl font-black text-white font-mono tabular-nums tracking-tight">
                {s.v}
              </p>
              <p className="text-white/40 text-xs mt-2 leading-snug max-w-[180px]">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
