import React from "react";
import { Plus } from "lucide-react";

interface DashboardPageHeaderProps {
  title: string;
  description: string;
  onAddClick?: () => void;
  buttonText?: string;
  showButton?: boolean;
}

export const DashboardPageHeader = ({
  title,
  description,
  onAddClick,
  buttonText = "ADD NEW",
  showButton = true,
}: DashboardPageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-4 border-brand-dark mb-8">
      <div className="flex-1">
        <h1 className="text-6xl font-black tracking-tighter uppercase leading-none mb-2">
          {title}
        </h1>
        <div className="flex items-center gap-2">
          <div className="w-1 h-12 bg-primary-text"></div>
          <p className="max-w-md text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {showButton && (
        <button
          onClick={onAddClick}
          className="brutalist-border-thick bg-secondary px-5 py-3 brutalist-shadow flex items-center gap-3 group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all w-full md:w-auto justify-center"
        >
          <Plus size={24} strokeWidth={3} />
          <span className="font-black text-base tracking-tight uppercase">
            {buttonText}
          </span>
        </button>
      )}
    </div>
  );
};
