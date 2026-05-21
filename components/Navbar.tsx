"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, GitFork, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import { openSignup } from "./ui/SignupDialog";

const links = [
  { label: "Product",      href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Graph",        href: "/#graph" },
  { label: "API",          href: "/#api" },
  { label: "Docs",         href: "/docs" },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "glass border-b border-white/5 shadow-lg shadow-black/60" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <Logo size={32} className="transition-opacity duration-300 group-hover:opacity-80" />
              <span className="font-bold text-lg tracking-tight text-white">
                Lawd<span className="text-white/50 font-normal">Memory</span>
              </span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="text-sm text-white/40 hover:text-white transition-colors duration-200 font-medium"
                >
                  {l.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://github.com/lawdmemory-lab/lawdmemory"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white transition-colors"
                title="View on GitHub"
              >
                <GitFork className="w-4 h-4" />
              </a>
              <button onClick={openSignup} className="btn-primary group !text-sm !px-3.5 !py-1.5 !rounded-lg">
                Start Building
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile button */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden text-white/60 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 glass border-b border-white/5 px-4 py-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white/60 hover:text-white transition-colors text-sm font-medium"
                >
                  {l.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  openSignup();
                }}
                className="btn-primary justify-center mt-2"
              >
                Start Building
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
