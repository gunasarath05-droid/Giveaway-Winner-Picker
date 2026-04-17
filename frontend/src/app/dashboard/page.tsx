"use client";

import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { 
  Users, 
  MessageCircle, 
  Heart, 
  TrendingUp, 
  PlayCircle 
} from "lucide-react";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/reels/stats/");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            {stats?.profile_username ? `${stats.profile_username}'s Dashboard` : 'Dashboard Overview'}
          </h1>
          <p className="text-slate-500 font-medium">Welcome back! Here's what's happening with your Reels.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            label="Total Reels" 
            value={isLoading ? "..." : (stats?.total_reels ?? "0")} 
            icon={PlayCircle} 
            color="bg-blue-500"
          />
          <StatCard 
            label="Total Likes" 
            value={isLoading ? "..." : (stats?.total_likes?.toLocaleString() ?? "0")} 
            icon={Heart} 
            color="bg-rose-500"
          />
          <StatCard 
            label="Comments Analyzed" 
            value={isLoading ? "..." : (stats?.total_comments?.toLocaleString() ?? "0")} 
            icon={MessageCircle} 
            color="bg-accent"
          />
          <StatCard 
            label="Avg. Sentiment" 
            value={isLoading ? "..." : (stats?.avg_sentiment + "%")} 
            icon={TrendingUp} 
            color="bg-amber-500"
          />
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6 text-slate-900">Engagement Over Time</h3>
            <div className="h-64 flex items-center justify-center bg-slate-50 rounded-xl border border-dashed border-slate-200">
               <span className="text-slate-400 font-medium italic">Chart Integration (Recharts) Coming Soon</span>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold mb-6 text-slate-900">Top Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {["Quality", "Design", "Fast", "Amazing", "Love", "Feature", "Mobile", "UI/UX"].map(word => (
                <span key={word} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-bold uppercase tracking-wider">
                  {word}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
