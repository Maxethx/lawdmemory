"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const integrations = [
  "Claude",      "GPT-4",      "Cursor",       "Copilot",     "Aider",
  "Continue",    "Cody",       "Phind",        "Anthropic MCP", "OpenAI",
  "GitHub",      "GitLab",     "Linear",       "Notion",      "Slack",
  "Vercel",      "Sentry",     "PagerDuty",    "DataDog",     "Stripe",
];

// duplicate so the loop is seamless
const loop = [...integrations, ...integrations];

export default function Marquee() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative py-16 border-y border-white/5 bg-black/60 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* label */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px flex-1 max-w-[140px] bg-gradient-to-r from-transparent to-white/15" />
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em]">
            Built for every AI agent · ingests every data source
          </span>
          <div className="h-px flex-1 max-w-[140px] bg-gradient-to-l from-transparent to-white/15" />
        </div>

        {/* scrolling marquee */}
        <div className="marquee-mask">
          <div className="flex w-max marquee-track gap-12 items-center">
            {loop.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-lg sm:text-xl font-bold text-white/35 hover:text-white/80 transition-colors whitespace-nowrap"
                style={{ letterSpacing: "-0.02em" }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
