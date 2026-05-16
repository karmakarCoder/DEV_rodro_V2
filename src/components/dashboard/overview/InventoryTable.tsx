"use client";
import React, { useState } from "react";
import { Plus, Search } from "lucide-react";
import { ProjectModal, ProjectData } from "../shared/ProjectModal";
import { ProjectTable } from "../shared/ProjectTable";

const initialProjects: ProjectData[] = [
  {
    id: "1",
    name: "Nexus AI Landing",
    status: "PRODUCTION",
    stack: "Next.js, Three.js",
  },
  {
    id: "2",
    name: "Brutalist Dashboard",
    status: "DRAFT",
    stack: "Tailwind, React",
  },
  {
    id: "3",
    name: "Cyberpunk Editor",
    status: "PRODUCTION",
    stack: "Rust, WebAssembly",
  },
  {
    id: "4",
    name: "Vaporwave Store",
    status: "STAGING",
    stack: "Shopify, Hydrogen",
  },
];

export const InventoryTable = () => {
  const [data, setData] = useState<ProjectData[]>(initialProjects);
  const [globalFilter, setGlobalFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(
    null,
  );

  const handleSave = (project: ProjectData) => {
    if (editingProject) {
      setData((prev) => prev.map((p) => (p.id === project.id ? project : p)));
    } else {
      setData((prev) => [...prev, project]);
    }
  };

  return (
    <div className="brutalist-border-thick bg-white p-6 brutalist-shadow-lg grow flex flex-col gap-6 scale-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-black uppercase tracking-tighter mb-1">
            PROJECT INVENTORY
          </h3>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">
            DATABASE_MANAGEMENT_SYSTEM
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={16}
            />
            <input
              type="text"
              placeholder="SEARCH_LOGS..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="w-full brutalist-border p-2 pl-10 text-xs font-black uppercase outline-none focus:bg-brand-cream transition-colors"
            />
          </div>
          <button
            onClick={() => {
              setEditingProject(null);
              setIsModalOpen(true);
            }}
            className="bg-primary-text text-primary text-[10px] px-4 py-2 font-black tracking-widest uppercase flex items-center gap-2 hover:bg-secondary hover:text-primary-text transition-colors border-2 border-primary-text"
          >
            <Plus size={14} />
            ADD NEW
          </button>
        </div>
      </div>

      <ProjectTable
        data={data}
        globalFilter={globalFilter}
        onEdit={(p) => {
          setEditingProject(p);
          setIsModalOpen(true);
        }}
        onDelete={(id) => setData((prev) => prev.filter((p) => p.id !== id))}
      />

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingProject}
      />
    </div>
  );
};
