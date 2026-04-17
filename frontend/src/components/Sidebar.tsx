"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Video, 
  BarChart3, 
  Settings, 
  LogOut,
  Instagram
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Video, label: "Reels", href: "/reels" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
];

import { useEffect, useState } from "react";

export function Sidebar() {
  const pathname = usePathname();
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch("https://giveaway-winner-picker.onrender.com/api/reels/stats/");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch sidebar profile", err);
      }
    }
    fetchProfile();
  }, []);

  return (
    <div className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col p-4 fixed left-0 top-0 z-50">
      <div className="flex items-center gap-3 px-4 mb-10 mt-2">
        <div className="p-2 bg-accent rounded-xl">
          <Instagram className="text-white" size={24} />
        </div>
        <span className="font-bold text-xl tracking-tight">ReelAnalyzer</span>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium",
              pathname === item.href 
                ? "bg-accent/10 text-accent" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-slate-100 pt-4 mt-auto">
        {profile?.profile_username && (
          <div className="px-4 py-3 mb-2 flex items-center gap-3 bg-slate-50 rounded-xl border border-slate-100">
             <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-xs font-black">
                {profile.profile_username[0].toUpperCase()}
             </div>
             <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold truncate">{profile.profile_username}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Connected Account</span>
             </div>
          </div>
        )}
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all font-medium">
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
