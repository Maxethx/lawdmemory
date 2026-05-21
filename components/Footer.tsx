"use client";
import { ExternalLink, Share2 } from "lucide-react";
import Logo from "./Logo";
import { toast } from "./ui/Toast";
import { openSignup } from "./ui/SignupDialog";

type Link = { label: string; action?: () => void; href?: string };

const linkGroups: Record<string, Link[]> = {
  Product: [
    { label: "Features",      href: "#features" },
    { label: "Memory Graph",  href: "#graph" },
    { label: "AI Query",      href: "#demo" },
    { label: "Analytics",     href: "#analytics" },
    { label: "API",           href: "#api" },
  ],
  Developers: [
    { label: "Documentation", href: "/docs" },
    { label: "SDK Reference", href: "/docs#sdks" },
    { label: "MCP Tools",     href: "/docs#mcp-server" },
    { label: "GitHub",        href: "https://github.com/lawdmemory-lab/lawdmemory" },
    { label: "Changelog",     action: () => toast("v1.0.0 — initial release.", "info") },
  ],
  Company: [
    { label: "About",    action: () => toast("Built for AI-native engineering teams.", "info") },
    { label: "Blog",     action: () => toast("Blog launching soon.", "info") },
    { label: "Careers",  action: () => toast("We're hiring — email careers@lawdmemory.dev", "info") },
    { label: "Security", action: () => toast("SOC 2 audit in progress. SSO via SAML.", "info") },
    { label: "Status",   action: () => toast("All systems operational.", "info") },
  ],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <Logo size={28} />
              <span className="font-bold text-lg text-white">
                Lawd<span className="text-white/50 font-normal">Memory</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Persistent memory for AI engineering teams.
              Open source. MIT license.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/lawdmemory-lab/lawdmemory"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/30 hover:text-white transition-colors"
                title="View on GitHub"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={() => toast("Follow @lawdmemory once we launch.", "info")}
                className="text-white/30 hover:text-white transition-colors"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            <button onClick={openSignup} className="btn-secondary !text-xs !px-3.5 !py-1.5 mt-2">
              Join the beta
            </button>
          </div>

          {/* Links */}
          {Object.entries(linkGroups).map(([section, items]) => (
            <div key={section} className="space-y-4">
              <h4 className="text-white/55 text-[10px] font-mono uppercase tracking-[0.25em]">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) =>
                  item.href ? (
                    <li key={item.label}>
                      <a href={item.href} className="text-white/30 hover:text-white text-sm transition-colors">
                        {item.label}
                      </a>
                    </li>
                  ) : (
                    <li key={item.label}>
                      <button
                        onClick={item.action}
                        className="text-white/30 hover:text-white text-sm transition-colors text-left"
                      >
                        {item.label}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-white/25 text-xs font-mono">
            © 2026 LawdMemory. Open Source under MIT License.
          </p>
          <p className="text-white/25 text-xs font-mono">
            Built with Next.js · TypeScript · React Flow · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
