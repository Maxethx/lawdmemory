"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Plus } from "lucide-react";
import { toast } from "@/components/ui/Toast";

const TYPES = ["commit", "pr", "issue", "incident", "decision", "note"] as const;
type MemType = typeof TYPES[number];

export function IngestPanel() {
  const router = useRouter();
  const [type, setType]       = useState<MemType>("decision");
  const [label, setLabel]     = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim() || !content.trim()) return;
    setLoading(true);

    const res = await fetch("/api/memories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, label: label.trim(), content: content.trim() }),
    });

    setLoading(false);

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: "unknown" }));
      toast(`Ingest failed: ${err.error ?? "unknown"}`, "error");
      return;
    }

    toast("Memory ingested + embedded");
    setLabel("");
    setContent("");
    router.refresh();
  };

  return (
    <form onSubmit={submit} className="card-matte rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        <Plus className="w-3.5 h-3.5 text-white/55" />
        <p className="text-xs font-mono text-white uppercase tracking-[0.18em]">
          Ingest memory
        </p>
      </div>

      <div className="space-y-2.5">
        <div className="space-y-1">
          <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.16em]">
            Type
          </label>
          <div className="grid grid-cols-3 gap-1">
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`px-2 py-1.5 rounded-md text-[11px] font-mono transition-colors ${
                  type === t
                    ? "bg-white text-black font-semibold"
                    : "bg-white/[0.03] border border-white/8 text-white/55 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.16em]">
            Label
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Add Redis caching layer"
            maxLength={280}
            className="w-full bg-black border border-white/12 rounded-lg px-3 py-2 text-sm text-white
                       placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.16em]">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Introduced Redis to address session bottlenecks identified in INC-047. Decision approved by @alice, @bob in PR #218."
            rows={5}
            maxLength={8000}
            className="w-full bg-black border border-white/12 rounded-lg px-3 py-2 text-sm text-white font-mono leading-relaxed
                       placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors resize-none"
          />
          <p className="text-[10px] font-mono text-white/30 text-right">
            {content.length} / 8000
          </p>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !label.trim() || !content.trim()}
        className="btn-primary w-full justify-center !text-xs !py-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Embedding...
          </>
        ) : (
          <>Ingest + Embed</>
        )}
      </button>
    </form>
  );
}
