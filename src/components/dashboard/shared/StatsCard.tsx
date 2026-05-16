import React from "react";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  badge?: string;
  color?: "yellow" | "white" | "red";
}

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  badge,
  color = "white",
}: StatsCardProps) => {
  const bgColor = {
    yellow: "bg-secondary",
    white: "bg-white",
    red: "bg-red-500 text-primary",
  }[color];

  return (
    <div
      className={`p-6 brutalist-border-thick brutalist-shadow-lg ${bgColor} relative group overflow-hidden`}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 brutalist-border bg-white text-primary-text">
          <Icon size={24} />
        </div>
        {badge && (
          <span className="bg-primary-text text-primary text-[10px] px-2 py-1 font-black tracking-widest uppercase">
            {badge}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-4xl font-black mb-1 tracking-tighter">{value}</h3>
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 opacity-80">
          {title}
        </p>
      </div>

      {color === "yellow" && (
        <div className="absolute top-4 right-4 flex items-center gap-1">
          <span className="text-[10px] font-black uppercase">LIVE</span>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
      )}
    </div>
  );
};
