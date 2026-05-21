"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { SectionHeader } from "@/components/ui/SectionHeader";

const knowledgeData = [
  { month: "Jul", memories: 1200 },
  { month: "Aug", memories: 3400 },
  { month: "Sep", memories: 5800 },
  { month: "Oct", memories: 8200 },
  { month: "Nov", memories: 13400 },
  { month: "Dec", memories: 19000 },
  { month: "Jan", memories: 28000 },
  { month: "Feb", memories: 42000 },
  { month: "Mar", memories: 67000 },
  { month: "Apr", memories: 98000 },
  { month: "May", memories: 142000 },
];

const complexityData = [
  { repo: "backend",  nodes: 420, edges: 1240 },
  { repo: "frontend", nodes: 280, edges: 840 },
  { repo: "infra",    nodes: 190, edges: 560 },
  { repo: "mobile",   nodes: 310, edges: 920 },
  { repo: "ml-svc",   nodes: 140, edges: 380 },
];

const latencyData = [
  { time: "00:00", p50: 2.1, p95: 4.8, p99: 8.2 },
  { time: "04:00", p50: 1.8, p95: 3.9, p99: 6.4 },
  { time: "08:00", p50: 3.2, p95: 6.1, p99: 11.2 },
  { time: "12:00", p50: 2.9, p95: 5.4, p99: 9.8 },
  { time: "16:00", p50: 3.8, p95: 7.2, p99: 13.5 },
  { time: "20:00", p50: 2.4, p95: 4.6, p99: 8.1 },
  { time: "24:00", p50: 1.9, p95: 3.7, p99: 6.9 },
];

const agentData = [
  { week: "W1", claude: 340,  copilot: 180, custom: 60 },
  { week: "W2", claude: 420,  copilot: 230, custom: 90 },
  { week: "W3", claude: 580,  copilot: 310, custom: 140 },
  { week: "W4", claude: 720,  copilot: 390, custom: 200 },
  { week: "W5", claude: 890,  copilot: 470, custom: 280 },
  { week: "W6", claude: 1100, copilot: 560, custom: 380 },
];

const tooltipStyle = {
  backgroundColor: "#000000",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  color: "#ffffff",
  fontSize: "11px",
  fontFamily: "monospace",
};

const axisTick = { fill: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "monospace" };

function ChartCard({ title, sub, children, delay }: {
  title: string; sub: string; children: React.ReactNode; delay: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.6 }}
      className="card-matte rounded-2xl p-5 shimmer hover:border-white/20 transition-colors duration-300"
    >
      <div className="mb-1">
        <h3 className="text-white font-bold text-sm">{title}</h3>
        <p className="text-white/30 text-xs font-mono">{sub}</p>
      </div>
      <div className="mt-4">{children}</div>
    </motion.div>
  );
}

function LegendDot({ label, opacity = 0.8, dashed = false }: { label: string; opacity?: number; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="w-3 h-0.5 rounded-full"
        style={{
          background: dashed
            ? `repeating-linear-gradient(90deg, rgba(255,255,255,${opacity}) 0 2px, transparent 2px 4px)`
            : `rgba(255,255,255,${opacity})`,
        }}
      />
      <span className="text-[10px] font-mono text-white/40">{label}</span>
    </div>
  );
}

export default function Analytics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="analytics" ref={ref} className="relative py-32 lg:py-40 overflow-hidden bg-black">

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="06"
          label="Analytics"
          title={
            <>
              Real-time memory <span className="text-white/40">intelligence.</span>
            </>
          }
          description="Watch your organizational knowledge grow, monitor retrieval performance, and track agent collaboration."
        />

        {/* top row */}
        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <ChartCard title="Knowledge Growth" sub="total memories indexed / month" delay={0.1}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={knowledgeData}>
                <defs>
                  <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#ffffff" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="month" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${Number(v).toLocaleString()} memories`, ""]} />
                <Area type="monotone" dataKey="memories" stroke="#ffffff" strokeWidth={1.5} fill="url(#memGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Repository Complexity" sub="knowledge nodes & edges per repo" delay={0.2}>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={complexityData} barGap={4}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="repo" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="nodes" fill="rgba(255,255,255,0.7)" radius={[3, 3, 0, 0]} />
                <Bar dataKey="edges" fill="rgba(255,255,255,0.25)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-3">
              <LegendDot label="nodes" opacity={0.7} />
              <LegendDot label="edges" opacity={0.3} />
            </div>
          </ChartCard>
        </div>

        {/* bottom row */}
        <div className="grid md:grid-cols-2 gap-3">
          <ChartCard title="Memory Retrieval Latency" sub="p50 / p95 / p99 (ms)" delay={0.3}>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={latencyData}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="time" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`${Number(v)}ms`, ""]} />
                <Line type="monotone" dataKey="p50" stroke="rgba(255,255,255,0.85)" strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="p95" stroke="rgba(255,255,255,0.5)"  strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="p99" stroke="rgba(255,255,255,0.3)"  strokeWidth={1}   dot={false} strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-3">
              <LegendDot label="p50" opacity={0.85} />
              <LegendDot label="p95" opacity={0.5} />
              <LegendDot label="p99" opacity={0.3} dashed />
            </div>
          </ChartCard>

          <ChartCard title="Agent Collaboration Activity" sub="memory queries by agent / week" delay={0.4}>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={agentData}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#ffffff" stopOpacity={0.30} />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#ffffff" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%"   stopColor="#ffffff" stopOpacity={0.10} />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="week" tick={axisTick} axisLine={false} tickLine={false} />
                <YAxis tick={axisTick} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="claude"  stroke="rgba(255,255,255,0.85)" strokeWidth={1.5} fill="url(#g1)" />
                <Area type="monotone" dataKey="copilot" stroke="rgba(255,255,255,0.55)" strokeWidth={1.5} fill="url(#g2)" />
                <Area type="monotone" dataKey="custom"  stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} fill="url(#g3)" />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-3">
              <LegendDot label="claude"  opacity={0.85} />
              <LegendDot label="copilot" opacity={0.55} />
              <LegendDot label="custom"  opacity={0.35} />
            </div>
          </ChartCard>
        </div>
      </div>
    </section>
  );
}
