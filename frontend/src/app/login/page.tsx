"use client";

import { Instagram, ArrowRight, Shield, BarChart2, Zap, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginContent() {
  const searchParams = useSearchParams();
  const errorMsg = searchParams.get("error");
  
  const handleLogin = async () => {
    try {
      const res = await fetch("https://giveaway-winner-picker.onrender.com/auth/instagram/login/");
      const data = await res.json();
      if (data.auth_url) {
        window.location.href = data.auth_url;
      }
    } catch (err) {
      console.error("Failed to initiate login", err);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 relative overflow-hidden flex flex-col">
      {/* Background Accent */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />

      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 w-full flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
            <div className="p-1.5 bg-accent rounded-lg">
                <Instagram className="text-white" size={20} />
            </div>
            Reel<span className="text-accent">Analyzer</span>
        </div>
        <button 
            onClick={handleLogin}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2"
        >
            Get Started <ArrowRight size={16} />
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 text-center max-w-4xl mx-auto">
        {errorMsg && (
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl mx-auto mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl flex items-center justify-center gap-2 font-medium"
            >
                <AlertCircle size={20} />
                {decodeURIComponent(errorMsg)}
            </motion.div>
        )}

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-bold mb-8"
        >
            <Zap size={14} /> Powered by Meta Graph API & AI
        </motion.div>

        <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-[1.1]"
        >
            Transform your Reels into <br />
            <span className="text-accent neon-text-glow italic">Actionable Insights</span>
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-500 font-medium mb-12 max-w-2xl"
        >
            Automatically analyze comments, track sentiment, and discover key trends. 
            Grow your Instagram engagement with data-driven content strategy.
        </motion.p>

        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
            <button 
                onClick={handleLogin}
                className="px-8 py-5 bg-accent text-white rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-accent/20 flex items-center justify-center gap-3"
            >
                <Instagram size={24} /> Login with Instagram
            </button>
            <button className="px-8 py-5 bg-white text-slate-600 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                View Live Demo
            </button>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left w-full">
            <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg w-fit mb-4">
                    <BarChart2 size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Advanced Analytics</h3>
                <p className="text-slate-500 text-sm font-medium">Deep dive into likes, comments, and engagement metrics for every reel.</p>
            </div>
            <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="p-2 bg-accent/10 text-accent rounded-lg w-fit mb-4">
                    <Zap size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">AI Sentiment Analysis</h3>
                <p className="text-slate-500 text-sm font-medium">Understand how your audience feels using OpenAI-powered sentiment tracking.</p>
            </div>
            <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                <div className="p-2 bg-purple-500/10 text-purple-500 rounded-lg w-fit mb-4">
                    <Shield size={24} />
                </div>
                <h3 className="font-bold text-lg mb-2">Secure & Official</h3>
                <p className="text-slate-500 text-sm font-medium">We use official Meta Graph API only. No scraping, no account risks.</p>
            </div>
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 font-bold text-xs uppercase tracking-widest relative z-10">
        © 2026 ReelAnalyzer • Built for Creators
      </footer>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
