"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ReactFlow,
  Node,
  Edge,
  Background,
  BackgroundVariant,
  Handle,
  Position,
  NodeProps,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Spotlight } from "@/components/ui/Background";

/* ── monochrome node styles ──────────────────────────────── */
const nodeStyles: Record<string, { ring: string; intensity: number }> = {
  repo:     { ring: "rgba(255,255,255,0.45)", intensity: 1.0 },
  service:  { ring: "rgba(255,255,255,0.35)", intensity: 0.85 },
  commit:   { ring: "rgba(255,255,255,0.25)", intensity: 0.7 },
  incident: { ring: "rgba(255,255,255,0.55)", intensity: 1.0 },
  agent:    { ring: "rgba(255,255,255,0.40)", intensity: 0.9 },
  decision: { ring: "rgba(255,255,255,0.30)", intensity: 0.75 },
};

function MemoryNode({ data }: NodeProps) {
  const nd = data as { label: string; type: string; sub: string };
  const c = nodeStyles[nd.type] || nodeStyles.repo;
  return (
    <div
      className="px-3 py-2 rounded-xl text-xs font-mono min-w-[120px] bg-black"
      style={{
        border: `1px solid ${c.ring}`,
        boxShadow: `0 0 14px rgba(255,255,255,${0.05 * c.intensity}), inset 0 0 0 1px rgba(255,255,255,0.02)`,
        color: "rgba(255,255,255,0.92)",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "rgba(255,255,255,0.5)", width: 5, height: 5, border: "none" }}
      />
      <p className="font-bold truncate">{nd.label}</p>
      <p className="opacity-40 text-[9px] uppercase tracking-[0.15em] mt-0.5">{nd.type}</p>
      {nd.sub && <p className="opacity-30 text-[9px] mt-0.5 truncate">{nd.sub}</p>}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "rgba(255,255,255,0.5)", width: 5, height: 5, border: "none" }}
      />
    </div>
  );
}

const nodeTypes = { memory: MemoryNode };

/* ── graph data ──────────────────────────────────────────── */
const initNodes: Node[] = [
  { id: "1",  type: "memory", position: { x: 300, y: 30  }, data: { label: "acme/backend",       type: "repo",     sub: "main repository" } },
  { id: "2",  type: "memory", position: { x: 60,  y: 160 }, data: { label: "auth-service",        type: "service",  sub: "Node.js" } },
  { id: "3",  type: "memory", position: { x: 550, y: 160 }, data: { label: "payments-service",    type: "service",  sub: "Python" } },
  { id: "4",  type: "memory", position: { x: 160, y: 300 }, data: { label: "commit: a3f92b",      type: "commit",   sub: "Add Redis session" } },
  { id: "5",  type: "memory", position: { x: 440, y: 300 }, data: { label: "INC-047",             type: "incident", sub: "Payment outage" } },
  { id: "6",  type: "memory", position: { x: 10,  y: 430 }, data: { label: "AI Agent — Claude",  type: "agent",    sub: "code reviewer" } },
  { id: "7",  type: "memory", position: { x: 300, y: 430 }, data: { label: "Use Redis for cache", type: "decision", sub: "arch decision" } },
  { id: "8",  type: "memory", position: { x: 580, y: 430 }, data: { label: "AI Agent — Copilot", type: "agent",    sub: "PR assistant" } },
  { id: "9",  type: "memory", position: { x: 160, y: 560 }, data: { label: "PR #218",             type: "commit",   sub: "Auth redesign" } },
  { id: "10", type: "memory", position: { x: 450, y: 560 }, data: { label: "INC-031",             type: "incident", sub: "Auth flood" } },
];

const edgeStyle = (op = 0.25) => ({ stroke: `rgba(255,255,255,${op})`, strokeWidth: 1 });

const initEdges: Edge[] = [
  { id: "e1-2",  source: "1", target: "2",  animated: true,  style: edgeStyle(0.35) },
  { id: "e1-3",  source: "1", target: "3",  animated: true,  style: edgeStyle(0.35) },
  { id: "e2-4",  source: "2", target: "4",  animated: true,  style: edgeStyle(0.22) },
  { id: "e3-5",  source: "3", target: "5",  animated: true,  style: edgeStyle(0.30) },
  { id: "e4-7",  source: "4", target: "7",  animated: false, style: edgeStyle(0.18) },
  { id: "e5-7",  source: "5", target: "7",  animated: false, style: edgeStyle(0.18) },
  { id: "e6-4",  source: "6", target: "4",  animated: true,  style: edgeStyle(0.25) },
  { id: "e8-5",  source: "8", target: "5",  animated: true,  style: edgeStyle(0.25) },
  { id: "e4-9",  source: "4", target: "9",  animated: false, style: edgeStyle(0.18) },
  { id: "e5-10", source: "5", target: "10", animated: false, style: edgeStyle(0.18) },
  { id: "e2-6",  source: "2", target: "6",  animated: true,  style: edgeStyle(0.22) },
];

const LEGEND = [
  { type: "repo",     label: "Repository" },
  { type: "service",  label: "Service" },
  { type: "commit",   label: "Commit" },
  { type: "incident", label: "Incident" },
  { type: "agent",    label: "AI Agent" },
  { type: "decision", label: "Decision" },
];

export default function MemoryGraph() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [nodes, , onNodesChange] = useNodesState(initNodes);
  const [edges, , onEdgesChange] = useEdgesState(initEdges);

  return (
    <section id="graph" ref={ref} className="relative py-32 lg:py-40 overflow-hidden">
      <Spotlight size={900} opacity={0.025} y="40%" x="70%" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="03"
          label="Memory Graph"
          title={
            <>
              Your knowledge <span className="text-white/40">as a living graph.</span>
            </>
          }
          description="Every commit, incident, decision, and AI agent interaction becomes a node in your persistent organizational memory."
        />

        {/* graph window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative card-matte rounded-2xl overflow-hidden glow-soft"
          style={{ height: 640 }}
        >
          {/* window bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.015] absolute top-0 left-0 right-0 z-10">
            <div className="w-2 h-2 rounded-full bg-white/25" />
            <div className="w-2 h-2 rounded-full bg-white/25" />
            <div className="w-2 h-2 rounded-full bg-white/25" />
            <span className="ml-2 text-white/30 text-xs font-mono">memory-graph ~ live view</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white pulse-soft" />
              <span className="text-white/35 text-xs font-mono">synced</span>
            </div>
          </div>

          <div className="absolute inset-0 pt-11">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              minZoom={0.4}
              maxZoom={1.5}
              attributionPosition="bottom-right"
              proOptions={{ hideAttribution: false }}
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={28}
                size={1}
                color="rgba(255,255,255,0.06)"
              />
            </ReactFlow>
          </div>
        </motion.div>

        {/* legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 flex flex-wrap justify-center gap-4"
        >
          {LEGEND.map(({ type, label }) => {
            const s = nodeStyles[type];
            return (
              <div key={type} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm bg-black"
                  style={{ border: `1px solid ${s.ring}` }}
                />
                <span className="text-xs text-white/45 font-mono">{label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
