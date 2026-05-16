import React from "react";
import { Search, ListFilter } from "lucide-react";

interface ProjectSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const ProjectSearch = ({
  value,
  onChange,
  placeholder = "SEARCH_DATABASE...",
}: ProjectSearchProps) => {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
      <div className="flex items-center gap-2 flex-1 min-w-[300px]">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-primary-text transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-white brutalist-border p-4 pl-12 text-xs font-black uppercase outline-none focus:bg-brand-cream/50 transition-colors"
          />
        </div>
        <button className="brutalist-border p-4 bg-white hover:bg-secondary transition-colors">
          <ListFilter size={20} />
        </button>
      </div>
    </div>
  );
};
