"use client";

import { Sidebar } from "@/components/Sidebar";
import { BarChart3, Clock, Construction, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8 flex flex-col items-center justify-center text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md"
        >
            <div className="w-24 h-24 bg-blue-500/10 text-blue-500 rounded-3xl flex items-center justify-center mb-8 mx-auto">
                <BarChart3 size={48} />
            </div>
            
            <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Advanced Analytics</h1>
            <p className="text-slate-500 font-medium text-lg mb-8 leading-relaxed">
                We're building deep engagement tracking, audience demographics, and sentiment trend reports. This feature is currently under high-intensity development.
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-600 rounded-full text-sm font-bold mb-10">
                <Construction size={16} /> Coming Soon in v2.0
            </div>

            <div className="flex flex-col gap-3">
                <Link 
                    href="/dashboard"
                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2"
                >
                    <ArrowLeft size={18} /> Back to Dashboard
                </Link>
            </div>
            
            <div className="mt-12 flex items-center justify-center gap-4 text-slate-300">
                <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Est. Release: Q3 2026</span>
                </div>
            </div>
        </motion.div>
      </main>
    </div>
  );
}
