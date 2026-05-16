"use client";
import { Bell, Settings as SettingsIcon, User, LogOut } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export const DashboardHeader = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="h-20 bg-white border-b-[5px] border-brand-dark flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-8">
        <h1 className="text-2xl font-black tracking-tighter uppercase">
          DEV_rodro_V1
        </h1>
        <nav className="flex items-center gap-6 text-[11px] font-black tracking-widest text-primary-text/40">
          <span className="text-brand-yellow border-b-2 border-brand-yellow">
            DASHBOARD
          </span>
          <Link
            href="/"
            target="_blank"
            className="hover:text-primary-text cursor-pointer transition-colors"
          >
            LIVE SITE
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 brutalist-border hover:bg-secondary transition-colors bg-white">
          <Bell size={20} />
        </button>
        <button className="p-2 brutalist-border hover:bg-secondary transition-colors bg-white">
          <SettingsIcon size={20} />
        </button>
        <button 
          onClick={handleLogout}
          className="p-2 brutalist-border hover:bg-red-500 hover:text-white transition-colors bg-white group"
          title="LOGOUT"
        >
          <LogOut size={20} />
        </button>
        <div className="w-10 h-10 brutalist-border bg-gray-200 flex items-center justify-center">
          <User size={24} />
        </div>
      </div>
    </header>
  );
};

