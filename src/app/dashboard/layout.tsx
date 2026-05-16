"use client";
import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/shared/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/shared/DashboardHeader";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-brand-cream selection:bg-secondary">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-primary-text/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Desktop and Mobile */}
      <div
        className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <DashboardSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />

        {/* Mobile Toggle */}
        <div className="md:hidden p-4 border-b-2 border-brand-dark bg-white flex justify-between items-center sticky top-20 z-10">
          <span className="font-black tracking-tighter uppercase italic">
            PANEL_CONTROL
          </span>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 brutalist-border bg-secondary"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <main className="p-8 w-full">{children}</main>
      </div>
    </div>
  );
}
