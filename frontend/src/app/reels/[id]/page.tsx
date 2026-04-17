"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Loader } from "@/components/Loader";
import { StatCard } from "@/components/StatCard";
import { 
  Heart, 
  MessageCircle, 
  TrendingUp, 
  ChevronLeft,
  Smile,
  Frown,
  Meh,
  Shuffle,
  PartyPopper,
  Trophy
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function ReelDetailPage() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [winners, setWinners] = useState<any[]>([]);
  const [isPicking, setIsPicking] = useState(false);

  const pickWinners = () => {
    if (comments.length === 0) return;
    setIsPicking(true);
    setWinners([]);
    
    // Simulated picking animation
    setTimeout(() => {
        const shuffled = [...comments].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3); // Pick Top 3
        setWinners(selected);
        setIsPicking(false);
    }, 1500);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [analysisRes, commentsRes] = await Promise.all([
          fetch(`https://giveaway-winner-picker.onrender.com/api/analysis/${id}/`),
          fetch(`https://giveaway-winner-picker.onrender.com/api/reels/comments/${id}/`)
        ]);
        
        const analysisData = await analysisRes.json();
        const commentsData = await commentsRes.json();
        
        setAnalysis(analysisData);
        setComments(commentsData);
      } catch (err) {
        console.error("Failed to fetch reel data", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-slate-50/50">
        <Sidebar />
        <main className="flex-1 ml-64 flex items-center justify-center">
          <Loader text="Analyzing reel performance..." />
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50/50">
      <Sidebar />
      
      <main className="flex-1 ml-64 p-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Link 
              href="/reels" 
              className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-4 font-bold"
            >
              <ChevronLeft size={20} /> Back to Reels
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Reel Analysis</h1>
            <p className="text-slate-500 font-medium truncate max-w-2xl font-bold text-xs uppercase tracking-tight mt-1">Reel ID: {id}</p>
          </div>

          <button 
            onClick={pickWinners}
            disabled={comments.length === 0 || isPicking}
            className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPicking ? (
                <>Picking Winners...</>
            ) : (
                <>
                    <Shuffle size={18} /> Pick Winners
                </>
            )}
          </button>
        </header>

        <AnimatePresence>
          {winners.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 overflow-hidden"
            >
              <div className="bg-emerald-500 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl shadow-emerald-200">
                <div className="absolute top-0 right-0 p-4 opacity-20 rotate-12">
                   <PartyPopper size={120} />
                </div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-black mb-6 flex items-center gap-3">
                    <Trophy /> Winners Selected!
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {winners.map((winner, idx) => (
                      <div key={winner.id} className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white text-emerald-600 rounded-full flex items-center justify-center font-black text-xl">
                            {idx + 1}
                          </div>
                          <p className="font-bold text-lg line-clamp-1">{winner.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            label="Comments Found" 
            value={analysis?.total_comments || 0} 
            icon={MessageCircle} 
            color="bg-blue-500"
          />
          <StatCard 
            label="Positive Sentiment" 
            value={`${analysis?.sentiment?.positive || 0}%`} 
            icon={Smile} 
            color="bg-emerald-500"
          />
          <StatCard 
            label="Neutral Sentiment" 
            value={`${analysis?.sentiment?.neutral || 0}%`} 
            icon={Meh} 
            color="bg-slate-500"
          />
          <StatCard 
            label="Negative Sentiment" 
            value={`${analysis?.sentiment?.negative || 0}%`} 
            icon={Frown} 
            color="bg-rose-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Keywords Section */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                <h3 className="text-lg font-bold mb-6 text-slate-900">Key Takeaways</h3>
                <div className="space-y-4">
                   {analysis?.top_keywords && Object.entries(analysis.top_keywords).map(([word, count]: any) => (
                       <div key={word} className="flex items-center justify-between">
                          <span className="text-slate-600 font-medium capitalize">{word}</span>
                          <span className="px-2 py-0.5 bg-accent/10 text-accent rounded text-xs font-bold">{count} mentions</span>
                       </div>
                   ))}
                </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
             <h3 className="text-lg font-bold mb-6 text-slate-900">Detailed Comments</h3>
             <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {comments.map((comment) => (
                    <div key={comment.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="text-slate-700 font-medium leading-relaxed">{comment.text}</p>
                        <div className="flex items-center justify-between mt-3 text-xs text-slate-400 font-bold uppercase tracking-wider">
                            <span>{new Date(comment.timestamp).toLocaleDateString()}</span>
                            <span className="flex items-center gap-1">
                                <Heart size={12} /> {comment.like_count} likes
                            </span>
                        </div>
                    </div>
                ))}
                {comments.length === 0 && (
                    <p className="text-center py-10 text-slate-400 font-medium">No comments fetched for this reel.</p>
                )}
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
