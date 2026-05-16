import React from "react";

export const MaintenanceBanner = () => {
  return (
    <div className="brutalist-border-thick bg-primary-text text-primary p-8 flex flex-col md:flex-row md:items-center justify-between gap-12 relative overflow-hidden group">
      <span className="absolute -bottom-10 -right-4 text-[120px] font-black opacity-10 leading-none select-none pointer-events-none group-hover:opacity-20 transition-opacity uppercase">
        ROOT
      </span>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase mb-2">
          SYSTEM MAINTENANCE MODE
        </h2>
        <p className="text-brand-yellow font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs">
          LAST SAFETY CHECK: OCT 24, 2023
        </p>
      </div>

      <div className="flex flex-wrap gap-4 relative z-10">
        <button className="brutalist-border-thick border-white bg-primary px-8 py-3 font-black tracking-widest text-primary-text transition-all text-xs">
          ENABLE MAINTENANCE
        </button>
        <button className="brutalist-border-thick border-white bg-red-500 text-primary px-8 py-3 font-black tracking-widest hover:translate-x-1 hover:translate-y-1 hover:shadow-none brutalist-shadow text-xs">
          PURGE CACHE
        </button>
      </div>
    </div>
  );
};
