"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Rocket } from "lucide-react";
import DashboardSvg from "@/components/svg/DashboardSvg";
import SourceCodeSvg from "@/components/svg/SourceCodeSvg";

const navItems = [
  { name: "OVERVIEW", icon: <DashboardSvg />, path: "/dashboard" },
  { name: "PROJECTS", icon: <SourceCodeSvg />, path: "/dashboard/projects" },
  { name: "TECH STACK", icon: <DashboardSvg />, path: "/dashboard/tech-stack" },
  { name: "LOGS", icon: <DashboardSvg />, path: "/dashboard/logs" },
  { name: "SETTINGS", icon: <DashboardSvg />, path: "/dashboard/settings" },
];

export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen sticky top-0 bg-brand-cream border-r-[5px] border-brand-dark flex flex-col justify-between p-6">
      <div>
        <div className="mb-12">
          <h2 className="text-xl font-black tracking-tighter uppercase mb-1">
            PORTFOLIO_OS
          </h2>
          <p className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">
            V2.0.4
          </p>
          <div className="h-1 bg-primary-text w-full mt-2"></div>
        </div>

        <nav className="space-y-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 p-3 font-bold brutalist-border transition-all group ${
                  isActive
                    ? "bg-secondary brutalist-shadow"
                    : "hover:bg-secondary/50"
                }`}
              >
                <span>{item.icon}</span>
                <span className="text-sm tracking-widest">{item.name}</span>
                {isActive && (
                  <div className="ml-auto w-1 h-4 bg-primary-text"></div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto pt-8">
        <button className="w-full bg-red-500 text-primary p-3 brutalist-border brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 font-black tracking-widest">
          <Rocket size={20} />
          DEPLOYS
        </button>
      </div>
    </aside>
  );
};
