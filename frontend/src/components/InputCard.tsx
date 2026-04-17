"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputCardProps {
  onPick: (url: string) => void;
  isLoading: boolean;
}

export function InputCard({ onPick, isLoading }: InputCardProps) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onPick(url);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-2 max-w-2xl mx-auto neon-glow"
    >
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input
            type="text"
            placeholder="Paste Instagram Post URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
            className={cn(
              "w-full bg-slate-100/80 border-none rounded-2xl py-4 pl-12 pr-4 text-slate-900 placeholder:text-slate-500",
              "focus:ring-2 focus:ring-accent/30 outline-none transition-all duration-300"
            )}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !url.trim()}
          className={cn(
            "w-full md:w-auto px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300",
            "bg-accent hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          )}
        >
          <Sparkles size={18} />
          <span>{isLoading ? "Fetching..." : "Pick Winner"}</span>
        </button>
      </form>
    </motion.div>
  );
}
