import React from "react";

export const StatusBanner = () => {
  return (
    <div className="brutalist-border-thick bg-secondary p-4 brutalist-shadow flex items-center gap-3">
      <div className="w-4 h-4 rounded-full bg-primary-text"></div>
      <span className="font-black text-sm tracking-widest uppercase">
        ALL SYSTEMS NOMINAL
      </span>
    </div>
  );
};
