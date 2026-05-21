"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, GitFork } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { createClient } from "@/lib/supabase/client";
import { toast } from "@/components/ui/Toast";

export function LoginForm() {
  const supabase = createClient();
  const params = useSearchParams();
  const next = params.get("next") ?? "/app";
  const error = params.get("error");
  const [loading, setLoading] = useState(false);

  const signInWithGitHub = async () => {
    setLoading(true);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
    if (oauthError) {
      setLoading(false);
      toast(oauthError.message, "error");
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        className="relative z-10 w-[90vw] max-w-md card-matte rounded-2xl overflow-hidden glow-soft"
      >
        <div className="window-chrome">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="ml-2 text-white/35 text-xs font-mono">lawdmemory ~ /login</span>
        </div>

        <div className="p-8 space-y-6">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <Logo size={28} />
            <span className="font-bold text-base text-white">
              Lawd<span className="text-white/50 font-normal">Memory</span>
            </span>
          </Link>

          <div className="space-y-2">
            <span className="eyebrow">
              <span className="dot" />
              Sign in
            </span>
            <h1 className="text-3xl font-black tracking-[-0.025em] text-white">
              Welcome back.
            </h1>
            <p className="text-white/55 text-sm leading-relaxed">
              Sign in with GitHub to access your workspace and memory graph.
            </p>
          </div>

          {error && (
            <div className="text-xs text-white bg-white/[0.04] border border-white/15 rounded-lg p-3 font-mono">
              ⚠ {error}
            </div>
          )}

          <button
            onClick={signInWithGitHub}
            disabled={loading}
            className="btn-primary w-full justify-center !py-3 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <GitFork className="w-4 h-4" />
                Continue with GitHub
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="flex items-center gap-3 pt-2 border-t border-white/5">
            <span className="text-[10px] font-mono text-white/35 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-white/50" />
              MIT Licensed
            </span>
            <span className="text-[10px] font-mono text-white/35 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-white/50" />
              No tracking
            </span>
            <Link
              href="/docs"
              className="ml-auto text-[10px] font-mono text-white/45 hover:text-white transition-colors"
            >
              Read docs →
            </Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
