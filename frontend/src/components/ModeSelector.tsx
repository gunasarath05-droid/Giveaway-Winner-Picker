"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Shuffle, Heart, Cpu } from "lucide-react";

export type PickMode = "random" | "most_liked" | "ai";

interface ModeSelectorProps {
  currentMode: PickMode;
  onModeChange: (mode: PickMode) => void;
}

const modes = [
  { id: "random", label: "Random Winner", icon: Shuffle },
  { id: "most_liked", label: "Most Liked", icon: Heart },
  { id: "ai", label: "AI Best Comment", icon: Cpu },
];

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {modes.map((mode) => {
        const Icon = mode.icon;
        const isActive = currentMode === mode.id;

        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id as PickMode)}
            className={cn(
              "relative flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
              "border border-slate-200 hover:border-accent/40",
              isActive ? "text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="mode-bg"
                className="absolute inset-0 bg-white rounded-full border border-accent/20 shadow-md shadow-emerald-100"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <Icon size={16} className={cn("relative z-10", isActive && "text-accent")} />
            <span className="relative z-10">{mode.label}</span>
          </button>
        );
      })}
    </div>
  );
}
