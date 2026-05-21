"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Clock, Code2, GitBranch, AlertTriangle, Bot, Network, Brain, FileSearch,
} from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const features = [
  { icon: Clock,          title: "Temporal Memory Engine",        desc: "Track how architectural decisions, code patterns, and team knowledge evolve over time with millisecond precision.", tag: "v1.0" },
  { icon: Code2,          title: "Semantic Code Intelligence",    desc: "Understand the meaning behind your codebase — not just the syntax. Map intent, patterns, and implicit contracts.", tag: "v1.0" },
  { icon: GitBranch,      title: "Architecture Timeline",         desc: "Visualize how your system architecture evolved — from monolith to microservices, from single DB to distributed.", tag: "v1.0" },
  { icon: AlertTriangle,  title: "Incident Recall",               desc: "Every incident, postmortem, and fix becomes searchable memory. Never fight the same fire twice.", tag: "v1.0" },
  { icon: Bot,            title: "Agent Context Injection",       desc: "Automatically inject relevant historical context into your AI agents before every task — no manual prompting required.", tag: "v1.1" },
  { icon: Network,        title: "Repository Knowledge Graph",    desc: "Interactive knowledge graph connecting repositories, services, teams, and decisions in a unified visual layer.", tag: "v1.0" },
  { icon: Brain,          title: "Persistent AI Context",         desc: "AI agents retain context between sessions, across repositories, and even across teams — indefinitely.", tag: "v1.1" },
  { icon: FileSearch,     title: "Engineering Decision Tracking", desc: "Automatically extract and index every significant engineering decision from PRs, issues, and docs.", tag: "v1.2" },
];

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" ref={ref} className="relative py-32 lg:py-40 overflow-hidden bg-black">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="05"
          label="Features"
          title={
            <>
              Everything your AI team <span className="text-white/40">needs to remember.</span>
            </>
          }
          description="A complete memory layer that makes your engineering organization smarter over time."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group relative card-matte rounded-2xl p-5 transition-all duration-300
                         hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.02] hover:glow-soft cursor-default"
            >
              {/* icon */}
              <div className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center mb-4
                              transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/[0.05]">
                <f.icon className="w-5 h-5 text-white/80 transition-colors group-hover:text-white" />
              </div>

              <div className="flex items-start justify-between mb-2 gap-2">
                <h3 className="text-white font-bold text-sm leading-snug">{f.title}</h3>
                <span className="text-[9px] font-mono text-white/30 border border-white/10 px-1.5 py-0.5 rounded shrink-0">
                  {f.tag}
                </span>
              </div>

              <p className="text-white/45 text-xs leading-relaxed">{f.desc}</p>

              {/* bottom glow line */}
              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
