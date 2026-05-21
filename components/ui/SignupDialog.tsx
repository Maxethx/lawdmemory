"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { toast } from "./Toast";

/* ── singleton open/close so any button can call openSignup() ── */
let setOpenFn: ((open: boolean) => void) | null = null;
export const openSignup = () => setOpenFn?.(true);

export function SignupDialog() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOpenFn = setOpen;
    return () => { setOpenFn = null; };
  }, []);

  // close on ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // lock scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = ""; };
    }
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setOpen(false);
    toast(`You're on the list — we'll email ${email}.`);
    setEmail("");
    setOrg("");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[90] bg-black/95"
          />

          {/* dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[100]
                       w-[92vw] max-w-md glass-strong rounded-2xl overflow-hidden glow-mid"
          >
            {/* chrome */}
            <div className="window-chrome">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
              <span className="ml-2 text-white/35 text-xs font-mono">lawdmemory ~ /signup</span>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto text-white/35 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* body */}
            <div className="p-7 space-y-5">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 eyebrow">
                  <Sparkles className="w-3 h-3" />
                  Public Beta · Limited Access
                </div>
                <h3 className="text-2xl font-black tracking-tight">Join the beta.</h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  Get early access to LawdMemory. We&apos;ll send install instructions and your
                  workspace invite to your inbox.
                </p>
              </div>

              <form onSubmit={submit} className="space-y-3">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.18em]">
                    Work email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-white/12 rounded-lg px-4 py-3 text-white font-mono text-sm
                               placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-[0.18em]">
                    Org name <span className="text-white/25 normal-case">(optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="acme-corp"
                    value={org}
                    onChange={(e) => setOrg(e.target.value)}
                    className="w-full bg-black border border-white/12 rounded-lg px-4 py-3 text-white font-mono text-sm
                               placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="btn-primary w-full justify-center !py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      Request access
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-2 border-t border-white/5">
                {["MIT Licensed", "Self-hostable", "No spam", "GDPR"].map((b) => (
                  <span key={b} className="text-[10px] font-mono text-white/35 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-white/50" /> {b}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
