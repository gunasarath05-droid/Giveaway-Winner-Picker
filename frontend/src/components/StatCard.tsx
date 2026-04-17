import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

export function StatCard({ label, value, icon: Icon, trend, color = "bg-accent" }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={color.replace("bg-", "text-")} size={24} />
        </div>
        {trend && (
          <span className={`text-sm font-bold ${trend.isPositive ? "text-emerald-500" : "text-rose-500"}`}>
            {trend.isPositive ? "+" : "-"}{trend.value}%
          </span>
        )}
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium mb-1">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
    </div>
  );
}
