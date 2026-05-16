import React from "react";
import { ShieldAlert } from "lucide-react";

interface MetricItem {
  label: string;
  value: string | number;
  subtext: string;
  type: "dark" | "yellow" | "white";
  progress?: number;
}

interface MetricsGridProps {
  metrics: MetricItem[];
}

export const MetricsGrid = ({ metrics }: MetricsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
      {metrics.map((metric, i) => {
        if (metric.type === "dark") {
          return (
            <div
              key={i}
              className="brutalist-border-thick bg-primary-text text-primary p-8 brutalist-shadow relative overflow-hidden group"
            >
              <span className="text-[10px] font-black tracking-[0.5em] uppercase opacity-60 block mb-4">
                {metric.label}
              </span>
              <div className="text-8xl font-black tracking-tighter leading-none mb-6">
                {metric.value}
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {metric.subtext}
              </p>
            </div>
          );
        }
        if (metric.type === "yellow") {
          return (
            <div
              key={i}
              className="brutalist-border-thick bg-secondary p-8 brutalist-shadow flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-black tracking-widest uppercase block mb-4">
                  {metric.label}
                </span>
                <div className="text-6xl font-black tracking-tighter leading-none mb-4">
                  {metric.value}
                </div>
              </div>
              {metric.progress !== undefined && (
                <div className="w-full h-2 bg-primary-text/10 brutalist-border relative">
                  <div
                    className="absolute top-0 left-0 h-full bg-sky-700 transition-all duration-500"
                    style={{ width: `${metric.progress}%` }}
                  />
                </div>
              )}
            </div>
          );
        }
        return (
          <div
            key={i}
            className="brutalist-border-thick bg-white p-8 brutalist-shadow flex flex-col justify-center"
          >
            <h4 className="text-[12px] font-black tracking-widest uppercase mb-2">
              {metric.label}
            </h4>
            <div className="flex items-center gap-2 text-brand-red mb-4">
              <ShieldAlert size={20} />
              <span className="text-2xl font-black tracking-tighter uppercase">
                {metric.value}
              </span>
            </div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
              {metric.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
};
