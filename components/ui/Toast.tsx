"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Info, AlertCircle } from "lucide-react";

/* ── tiny pub-sub store so `toast(...)` works from anywhere ── */
type ToastType = "success" | "info" | "error";
type ToastItem = { id: number; message: string; type: ToastType };

let toasts: ToastItem[] = [];
let listeners: Array<(toasts: ToastItem[]) => void> = [];
const emit = () => listeners.forEach((l) => l(toasts));

export const toast = (message: string, type: ToastType = "success") => {
  if (typeof window === "undefined") return;
  const id = Date.now() + Math.random();
  toasts = [...toasts, { id, message, type }];
  emit();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, 3500);
};

/* ── Toaster: mount once near the app root ── */
export function Toaster() {
  const [list, setList] = useState<ToastItem[]>([]);

  useEffect(() => {
    listeners.push(setList);
    return () => {
      listeners = listeners.filter((l) => l !== setList);
    };
  }, []);

  const icon = (t: ToastType) =>
    t === "success" ? <Check className="w-4 h-4 text-white" />
    : t === "error" ? <AlertCircle className="w-4 h-4 text-white" />
    : <Info className="w-4 h-4 text-white" />;

  return (
    <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {list.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="pointer-events-auto glass-strong rounded-xl px-4 py-3 flex items-center gap-3 glow-soft min-w-[260px] max-w-sm"
          >
            <span className="w-6 h-6 rounded-md bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
              {icon(t.type)}
            </span>
            <span className="text-sm text-white font-medium">{t.message}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
