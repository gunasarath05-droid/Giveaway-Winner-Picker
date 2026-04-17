import { Heart, MessageCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface ReelCardProps {
  id: string;
  thumbnail: string;
  caption: string;
  likes: number;
  comments: number;
}

export function ReelCard({ id, thumbnail, caption, likes, comments }: ReelCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden group"
    >
      <div className="relative aspect-[9/16] overflow-hidden">
        <img 
          src={thumbnail} 
          alt={caption} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <Link 
            href={`/reels/${id}`}
            className="w-full py-2 bg-white text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
          >
            Analyze <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-slate-700 text-sm font-medium line-clamp-2 mb-4 h-10">
          {caption || "No caption"}
        </p>
        <div className="flex items-center gap-4 text-slate-500 text-sm font-bold">
          <div className="flex items-center gap-1">
            <Heart size={16} className="text-rose-500" />
            {likes.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle size={16} className="text-blue-500" />
            {comments.toLocaleString()}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
