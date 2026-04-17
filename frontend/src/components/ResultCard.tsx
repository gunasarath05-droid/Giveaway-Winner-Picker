"use client";

import { motion } from "framer-motion";
import { User, Trophy, Copy, Check, Medal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface WinnerData {
  username: string;
  comment: string;
  likes: number;
  score?: number;
}

interface ResultCardProps {
  winner: WinnerData;
  rank: number;
}

export function ResultCard({ winner, rank }: ResultCardProps) {
  const [copied, setCopied] = useState(false);
  const isTopThree = rank <= 3;
  const isFirst = rank === 1;

  const copyToClipboard = () => {
    const text = `#${rank} Winner: @${winner.username}\nComment: "${winner.comment}"`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: rank * 0.1, type: "spring", damping: 15 }}
      className={cn(
        "w-full group",
        isFirst ? "max-w-2xl mx-auto mb-12" : "max-w-xl mx-auto mb-6"
      )}
    >
      <div className={cn(
        "glass-card relative overflow-hidden transition-all duration-300",
        isFirst ? "p-8 border-accent/20 neon-glow" : "p-6 hover:bg-white",
        !isFirst && "border-slate-100"
      )}>
        {/* Rank Badge */}
        <div className={cn(
            "absolute top-0 left-0 px-4 py-2 rounded-br-2xl font-black text-sm z-20 flex items-center gap-1.5",
            isFirst ? "bg-accent text-white" : 
            rank === 2 ? "bg-slate-200 text-slate-700" :
            rank === 3 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-400"
        )}>
            {isFirst ? <Trophy size={14} /> : <Medal size={14} />}
            #{rank}
        </div>

        {/* Decorative glows for top winner */}
        {isFirst && (
            <>
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-3xl -mr-16 -mt-16 rounded-full" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/5 blur-3xl -ml-16 -mb-16 rounded-full" />
            </>
        )}

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
                <div className={cn(
                    "rounded-full flex items-center justify-center border-2 shadow-lg",
                    isFirst ? "h-16 w-16 bg-gradient-to-br from-slate-50 to-white border-accent/20" : "h-12 w-12 bg-slate-50 border-slate-100"
                )}>
                <User size={isFirst ? 32 : 24} className="text-slate-400" />
                </div>
                <div className="text-left">
                <h3 className={cn("font-bold text-slate-900 flex items-center gap-2", isFirst ? "text-xl" : "text-lg")}>
                    @{winner.username}
                </h3>
                <p className="text-slate-500 text-sm">
                    {winner.likes} likes • {Math.round((winner.score || 0) * 100)}% AI Score
                </p>
                </div>
            </div>
            
            <button
                onClick={copyToClipboard}
                className={cn(
                    "p-2.5 rounded-lg transition-all duration-300 border",
                    copied ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-slate-50 hover:bg-slate-100 text-slate-400 border-slate-100"
                )}
            >
                {copied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>

          <div className={cn(
              "bg-slate-50/80 rounded-xl p-4 border border-slate-100 italic leading-relaxed text-slate-700",
              isFirst ? "text-lg p-6" : "text-base"
          )}>
             "{winner.comment}"
          </div>
        </div>
      </div>
    </motion.div>
  );
}
