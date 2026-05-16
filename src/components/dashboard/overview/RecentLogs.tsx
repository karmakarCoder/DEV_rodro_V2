import React from "react";
import { History } from "lucide-react";

const logs = [
  { time: "12:04", action: "Deploy successful:", target: "v4.1.2", color: "blue" },
  { time: "11:55", action: "Project deleted:", target: "Legacy Portfolio", color: "red" },
  { time: "09:12", action: "Media upload:", target: "hero_image_01.webp", color: "blue" },
  { time: "08:30", action: "Admin login detected from", target: "192.168.1.1", color: "gray" },
];

export const RecentLogs = () => {
  return (
    <div className="brutalist-border-thick bg-white p-6 brutalist-shadow-lg w-full md:w-80 overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <History size={20} />
        <h3 className="text-lg font-black uppercase tracking-tighter">RECENT LOGS</h3>
      </div>

      <div className="space-y-4">
        {logs.map((log, index) => (
          <div key={index} className="flex gap-3 items-start group">
            <span className="text-[10px] font-black text-gray-400 mt-0.5">{log.time}</span>
            <div className="h-full w-0.5 bg-gray-200 self-stretch group-last:bg-transparent"></div>
            <p className="text-[11px] font-bold leading-tight">
              {log.action}{" "}
              <span className={`
                ${log.color === 'blue' ? 'text-blue-600' : ''}
                ${log.color === 'red' ? 'text-brand-red' : ''}
                ${log.color === 'gray' ? 'text-gray-600' : ''}
              `}>
                {log.target}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
