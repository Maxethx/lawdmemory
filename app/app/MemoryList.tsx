"use client";
import { useState } from "react";
import { ChevronRight, Inbox } from "lucide-react";

type Memory = {
  id: string;
  type: string;
  label: string;
  content: string;
  metadata: Record<string, unknown>;
  created_at: string;
};

export function MemoryList({ initial }: { initial: Memory[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (initial.length === 0) {
    return (
      <div className="card-matte rounded-xl p-12 text-center">
        <Inbox className="w-8 h-8 text-white/25 mx-auto mb-3" />
        <p className="text-white font-semibold text-sm">No memories yet.</p>
        <p className="text-white/45 text-xs mt-1.5 leading-relaxed max-w-sm mx-auto">
          Use the panel on the right to ingest your first memory.
          Try a recent commit, an incident summary, or an architectural decision.
        </p>
      </div>
    );
  }

  return (
    <div className="card-matte rounded-xl overflow-hidden">
      <div className="window-chrome">
        <span className="dot" />
        <span className="dot" />
        <span className="dot" />
        <span className="ml-2 text-white/35 text-xs font-mono">memories ~ recent · {initial.length}</span>
      </div>

      <ul className="divide-y divide-white/[0.04]">
        {initial.map((m) => {
          const isOpen = expanded === m.id;
          return (
            <li key={m.id}>
              <button
                onClick={() => setExpanded(isOpen ? null : m.id)}
                className="w-full flex items-start gap-3 px-4 py-3 hover:bg-white/[0.015] transition-colors text-left"
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 text-white/30 mt-1 shrink-0 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                />
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap text-[10px] font-mono">
                    <span className="px-1.5 py-0.5 rounded border border-white/15 bg-white/[0.04] text-white uppercase tracking-wider">
                      {m.type}
                    </span>
                    <span className="text-white/35">
                      {new Date(m.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm text-white font-semibold truncate">{m.label}</p>
                  {!isOpen && (
                    <p className="text-xs text-white/40 truncate font-mono">{m.content}</p>
                  )}
                  {isOpen && (
                    <div className="pt-2 space-y-2">
                      <pre className="text-xs text-white/70 font-mono whitespace-pre-wrap leading-relaxed bg-black border border-white/8 rounded-md p-3">
                        {m.content}
                      </pre>
                      {Object.keys(m.metadata ?? {}).length > 0 && (
                        <details className="text-[10px] font-mono text-white/45">
                          <summary className="cursor-pointer hover:text-white/70">metadata</summary>
                          <pre className="mt-2 bg-black border border-white/8 rounded-md p-2 overflow-x-auto">
                            {JSON.stringify(m.metadata, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
