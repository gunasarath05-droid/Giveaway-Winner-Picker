"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Instagram, Trophy, ArrowRight, Video, BarChart3, Users } from "lucide-react";

export default function Home() {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkProfile() {
      try {
        const res = await fetch("https://giveaway-winner-picker.onrender.com/api/reels/stats/");
        const data = await res.json();
        if (data && !data.error) {
            setProfile(data);
        }
      } catch (err) {
        console.error("Auth check failed", err);
      } finally {
        setIsLoading(false);
      }
    }
    checkProfile();
  }, []);

  return (
    <main className="min-h-screen bg-white text-slate-900 relative overflow-hidden flex flex-col">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[130px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[130px] rounded-full" />

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 w-full flex justify-between items-center relative z-20">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <div className="p-1.5 bg-accent rounded-lg shadow-lg shadow-accent/20">
                <Instagram className="text-white" size={20} />
            </div>
            Reel<span className="text-accent underline decoration-4 decoration-accent/20">Analyzer</span>
        </div>
        <div className="flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-all hidden md:block">Features</a>
            {profile ? (
                <a 
                    href="/dashboard"
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                >
                    Dashboard
                </a>
            ) : (
                <a 
                    href="/login"
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                >
                    Login
                </a>
            )}
        </div>
      </nav>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-40 relative z-10 text-center flex-1 flex flex-col items-center justify-center">
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-black uppercase tracking-widest mb-10"
        >
            <Trophy size={14} /> Official v19.0 Meta Integration
        </motion.div>

        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] text-slate-900"
        >
            The Ultimate <br />
            <span className="text-accent italic">Giveaway Machine</span>
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto leading-relaxed"
        >
            The world's first AI-powered comment analyzer built specifically for Instagram Reels. 
            Pick winners fairly, analyze sentiment, and grow your audience with data.
        </motion.p>

        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-20"
        >
            {profile ? (
                <a 
                    href="/dashboard"
                    className="px-10 py-5 bg-accent text-white rounded-2xl font-black text-xl hover:bg-emerald-600 transition-all shadow-2xl shadow-accent/40 flex items-center justify-center gap-3"
                >
                    Launch Dashboard <ArrowRight size={20} />
                </a>
            ) : (
                <a 
                    href="/login"
                    className="px-10 py-5 bg-accent text-white rounded-2xl font-black text-xl hover:bg-emerald-600 transition-all shadow-2xl shadow-accent/40 flex items-center justify-center gap-3"
                >
                    <Instagram size={24} /> Connect My Account
                </a>
            )}
            <button className="px-10 py-5 bg-white text-slate-800 border-2 border-slate-100 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all">
                How it Works
            </button>
        </motion.div>

        {/* Feature Grid Mini */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                <div className="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-4">
                    <Video size={20} />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Reel Syncing</h3>
                <p className="text-sm text-slate-500">Automatically fetch and monitor your latest video content.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                <div className="w-10 h-10 bg-accent text-white rounded-xl flex items-center justify-center mb-4">
                    <BarChart3 size={20} />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">AI Sentiment</h3>
                <p className="text-sm text-slate-500">Deep analysis of audience reactions using OpenAI GPT-4.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                <div className="w-10 h-10 bg-purple-500 text-white rounded-xl flex items-center justify-center mb-4">
                    <Users size={20} />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">Fair Picking</h3>
                <p className="text-sm text-slate-500">Transparent winner selection with verifiable logic.</p>
            </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-10 border-t border-slate-100 text-center">
         <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">© 2026 ReelAnalyzer. All rights reserved.</p>
      </footer>
    </main>
  );
}
