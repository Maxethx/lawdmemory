"use client";
import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface Props {
  number: string;            // e.g. "01"
  label: string;             // e.g. "The Problem"
  title: ReactNode;          // headline; pass JSX for accent styling
  description?: string;
  align?: "center" | "left";
}

export function SectionHeader({ number, label, title, description, align = "center" }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const isCenter = align === "center";

  return (
    <div
      ref={ref}
      className={`mb-20 space-y-5 ${isCenter ? "text-center mx-auto max-w-3xl" : "text-left max-w-3xl"}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className={isCenter ? "flex justify-center" : "flex justify-start"}
      >
        <span className="eyebrow">
          <span className="dot" />
          {number} · {label}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-grad"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base sm:text-lg text-white/50 leading-relaxed max-w-2xl mx-auto"
          style={isCenter ? {} : { marginLeft: 0, marginRight: 0 }}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
