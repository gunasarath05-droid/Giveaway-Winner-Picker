"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { ReelCard } from "@/components/ReelCard";
import { Loader } from "@/components/Loader";
import { Search, Filter, Instagram } from "lucide-react";

export default function ReelsPage() {
  const [reels, setReels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch reels from backend
    const fetchReels = async () => {
      try {
        setError(null);
        const res = await fetch("http://127.0.0.1:8000/api/reels/");
        const data = await res.json();
        
        if (Array.isArray(data)) {
          setReels(data);
        } else if (data.error) {
          setError(data.error);
          setReels([]);
        }
      } catch (err) {
        console.error("Failed to fetch reels", err);
        setError("Could not connect to the server.");
        setReels([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReels();
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">My Reels</h1>
            <p className="text-slate-500 font-medium">Browse and analyze your Instagram video content.</p>
          </div>

          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search reels..." 
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all w-64"
                />
             </div>
             <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors">
                <Filter size={20} />
             </button>
          </div>
        </header>

        {isLoading ? (
          <div className="h-[60vh] flex items-center justify-center">
            <Loader text="Fetching your reels..." />
          </div>
        ) : error ? (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
                <div className="w-20 h-20 bg-accent/10 text-accent rounded-3xl flex items-center justify-center mb-6">
                    <Instagram size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3">{error}</h2>
                <p className="text-slate-500 max-w-sm mb-8 font-medium">Link your Instagram account to see your reels and analyze engagement.</p>
                <a 
                    href="/login"
                    className="px-8 py-4 bg-accent text-white rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all shadow-xl shadow-accent/20 flex items-center gap-3"
                >
                    <Instagram size={20} /> Connect Account
                </a>
            </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {reels.map((reel) => (
              <ReelCard 
                key={reel.id}
                id={reel.id}
                thumbnail={reel.media_url}
                caption={reel.caption}
                likes={reel.like_count}
                comments={reel.comments_count}
              />
            ))}
            {reels.length === 0 && (
                <div className="col-span-full py-20 text-center">
                    <p className="text-slate-500 font-medium">No reels found. Make sure you have uploaded videos to Instagram.</p>
                </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
