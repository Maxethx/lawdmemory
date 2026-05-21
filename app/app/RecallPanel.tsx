"use client";
import { useState, useRef } from "react";
import { Terminal, Loader2, Clock, Sparkles } from "lucide-react";
import { toast } from "@/components/ui/Toast";

type Memory = {
  id: string;
  type: string;
  label: string;
  content: string;
  metadata: Record<string, unknown>;
  created_at: string;
  similarity: number;
};

type RecallResult = {
  query: string;
  memories: Memory[];
  count: number;
  latency_ms: number;
};

export function RecallPanel() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecallResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/recall", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: q }),
    });

    setLoading(false);

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "unknown" }));
      toast(`Recall failed: ${err.error ?? "unknown"}`, "error");
      return;
    }

    setResult(await res.json());
  };

  const samples = [
    "Why was Redis introduced?",
    "Recent payment incidents",
    "Auth architecture decisions",
  ];

  return (
    <div className="card-matte rounded-xl overflow-hidden">
      <div className="window-chrome">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="ml-2 text-white/35 text-xs font-mono">recall ~ semantic search</span>
        {result && (
          <span className="ml-auto flex items-center gap-1 text-[10px] font-mono text-white/40">
            <Clock className="w-3 h-3" />
            {result.latency_ms}ms · {result.count} hits
          </span>
        )}
      </div>

      <form onSubmit={submit} className="p-4 space-y-3">
        <div className="flex items-center gap-2.5 bg-black border border-white/10 rounded-lg px-3 py-2.5 focus-within:border-white/30 transition-colors">
          <Terminal className="w-3.5 h-3.5 text-white/55" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything about your engineering history..."
            className="flex-1 bg-transparent text-sm font-mono text-white placeholder:text-white/30 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="text-white/40 hover:text-white disabled:opacity-30 transition-colors flex items-center gap-1.5"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* sample queries */}
        {!result && !loading && (
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] font-mono text-white/30 self-center">try:</span>
            {samples.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setQuery(s);
                  inputRef.current?.focus();
                }}
                className="text-[10px] font-mono text-white/50 hover:text-white border border-white/8 hover:border-white/25 bg-white/[0.02] rounded-md px-2 py-1 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Results */}
      {result && (
        <div className="border-t border-white/5 p-4 space-y-2">
          {result.count === 0 ? (
            <p className="text-sm text-white/45 font-mono text-center py-6">
              No matching memories. Try lowering threshold or ingesting more content.
            </p>
          ) : (
            result.memories.map((m) => (
              <RecallResult key={m.id} memory={m} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

function RecallResult({ memory }: { memory: Memory }) {
  return (
    <div className="bg-white/[0.02] border border-white/8 rounded-lg p-3 space-y-1.5">
      <div className="flex items-center gap-2 text-[10px] font-mono">
        <span className="px-1.5 py-0.5 rounded border border-white/15 bg-white/[0.04] text-white uppercase tracking-wider">
          {memory.type}
        </span>
        <span className="text-white/40">
          {new Date(memory.created_at).toLocaleDateString()}
        </span>
        <span className="ml-auto text-white/60">
          {(memory.similarity * 100).toFixed(1)}% match
        </span>
      </div>
      <p className="text-sm font-semibold text-white">{memory.label}</p>
      <p className="text-xs text-white/55 leading-relaxed line-clamp-3 font-mono">
        {memory.content}
      </p>
    </div>
  );
}
