"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { toast } from "@/components/ui/Toast";

interface Props {
  code: string;
  language?: string;
  filename?: string;
  showCopy?: boolean;
}

export function CodeBlock({ code, language = "ts", filename, showCopy = true }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast("Copied to clipboard");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast("Couldn't copy", "error");
    }
  };

  return (
    <div className="my-5 not-prose rounded-xl overflow-hidden border border-white/8 bg-black">
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.015] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
            <span className="text-[11px] font-mono text-white/50">
              {filename || language}
            </span>
          </div>
          {showCopy && (
            <button
              onClick={copy}
              className="text-white/30 hover:text-white transition-colors p-1 -mr-1"
              title="Copy code"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      )}
      <pre className="text-[13px] font-mono text-white/80 p-4 overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/* inline code */
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[0.875em] px-1.5 py-0.5 rounded-md bg-white/[0.06] border border-white/8 text-white">
      {children}
    </code>
  );
}
