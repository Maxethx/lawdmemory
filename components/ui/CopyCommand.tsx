"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "./Toast";

export function CopyCommand({
  command,
  prefix = "$",
  className = "",
  size = "md",
}: {
  command: string;
  prefix?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      toast("Copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast("Couldn't copy. Try selecting manually.", "error");
    }
  };

  const sizeClasses = {
    sm: "px-3.5 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-4 text-base",
  }[size];

  return (
    <button
      onClick={copy}
      title="Click to copy"
      className={`group inline-flex items-center gap-3 card-matte rounded-xl font-mono
                  hover:border-white/30 active:scale-[0.99] transition-all ${sizeClasses} ${className}`}
    >
      <span className="text-white/40 select-none">{prefix}</span>
      <span className="text-white truncate">{command}</span>
      <span className="ml-2 text-white/35 group-hover:text-white transition-colors shrink-0">
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </span>
    </button>
  );
}
