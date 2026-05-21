import { createClient } from "@/lib/supabase/server";
import { RecallPanel } from "./RecallPanel";
import { IngestPanel } from "./IngestPanel";
import { MemoryList } from "./MemoryList";
import { Database, Sparkles, Activity } from "lucide-react";

type Memory = {
  id: string;
  type: string;
  label: string;
  content: string;
  metadata: Record<string, unknown>;
  created_at: string;
  source_at: string | null;
};

export default async function AppPage() {
  const supabase = await createClient();

  const { data: memories } = await supabase
    .from("memories")
    .select("id, type, label, content, metadata, created_at, source_at")
    .order("created_at", { ascending: false })
    .limit(20);

  const list = (memories ?? []) as Memory[];

  // Quick stats
  const total = list.length;
  const byType = list.reduce<Record<string, number>>((acc, m) => {
    acc[m.type] = (acc[m.type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="eyebrow mb-3">
            <span className="dot" />
            Workspace · v0.1
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.025em] text-grad">
            Your memory graph.
          </h1>
          <p className="text-white/50 text-sm mt-2">
            Ingest engineering signals manually for now. GitHub auto-ingest coming soon.
          </p>
        </div>

        <div className="flex gap-2">
          <StatChip icon={Database} label="memories" value={total.toString()} />
          <StatChip icon={Sparkles} label="types"    value={Object.keys(byType).length.toString()} />
          <StatChip icon={Activity} label="status"   value="live" />
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-4">
        {/* Left: recall + list */}
        <div className="space-y-4 min-w-0">
          <RecallPanel />
          <MemoryList initial={list} />
        </div>

        {/* Right: ingest panel */}
        <aside className="lg:sticky lg:top-20 lg:self-start space-y-4">
          <IngestPanel />

          {/* Tips card */}
          <div className="card-matte rounded-xl p-4 space-y-2">
            <p className="text-xs font-mono text-white/45 uppercase tracking-[0.18em]">Tips</p>
            <ul className="text-[12px] text-white/55 space-y-1.5 leading-relaxed">
              <li>• Use <code className="font-mono text-white">type=decision</code> for architectural choices.</li>
              <li>• Include <code className="font-mono text-white">refs</code> in metadata to link memories (e.g. <code className="font-mono text-white">{`{"refs":["a3f92b"]}`}</code>).</li>
              <li>• Recall uses cosine similarity. Threshold defaults to 0.2.</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}

function StatChip({ icon: Icon, label, value }: {
  icon: React.ElementType; label: string; value: string;
}) {
  return (
    <div className="card-matte rounded-lg px-3 py-2 flex items-center gap-2">
      <Icon className="w-3.5 h-3.5 text-white/50" />
      <div>
        <p className="text-white text-sm font-bold font-mono leading-none">{value}</p>
        <p className="text-white/35 text-[9px] font-mono uppercase tracking-wider mt-0.5">{label}</p>
      </div>
    </div>
  );
}
