"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Spotlight } from "@/components/ui/Background";
import { CopyCommand } from "@/components/ui/CopyCommand";
import { openSignup } from "@/components/ui/SignupDialog";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="cta" ref={ref} className="relative py-28 lg:py-36 overflow-hidden">
      <Spotlight size={900} opacity={0.04} y="50%" />
      <div className="absolute inset-0 grid-bg-fine mask-radial opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="flex justify-center">
            <span className="eyebrow">
              <span className="dot" />
              Ready when you are
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-[-0.035em] leading-[1] text-white">
            Deploy in under a minute.
          </h2>

          <p className="text-base sm:text-lg text-white/55 max-w-xl mx-auto leading-relaxed">
            Self-host, run on our cloud, or use the managed MCP server.
            Connect your first repo with one command.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <button onClick={openSignup} className="btn-primary group !px-6 !py-3.5">
            <Sparkles className="w-4 h-4" />
            Get Access
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
          <a href="/docs" className="btn-secondary !px-6 !py-3.5">
            <BookOpen className="w-4 h-4" />
            Read Docs
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex justify-center"
        >
          <CopyCommand command="npx create-lawdmemory@latest" />
        </motion.div>
      </div>
    </section>
  );
}
