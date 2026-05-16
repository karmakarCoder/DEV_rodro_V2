import { StatsCard } from "@/components/dashboard/shared/StatsCard";
import { InventoryTable } from "@/components/dashboard/overview/InventoryTable";
import { QuickEdit } from "@/components/dashboard/overview/QuickEdit";
import { RecentLogs } from "@/components/dashboard/overview/RecentLogs";
import { StatusBanner } from "@/components/dashboard/shared/StatusBanner";
import { MaintenanceBanner } from "@/components/dashboard/shared/MaintenanceBanner";
import { FolderKanban, Eye, Rocket } from "lucide-react";

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Page Title Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none mb-4">
            SYSTEM OVERVIEW
          </h1>
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-blue-600"></div>
            <p className="text-sm font-bold text-gray-600 uppercase tracking-widest">
              Last updated 14 minutes ago via SSH
            </p>
          </div>
        </div>
        <StatusBanner />
      </div>

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatsCard
          title="Total Projects"
          value="24"
          subtitle="Updated today"
          icon={FolderKanban}
          badge="+2 THIS MONTH"
        />
        <StatsCard
          color="yellow"
          title="Total Visits"
          value="12.8k"
          subtitle="Cloudflare Analytics"
          icon={Eye}
          badge="LIVE ●"
        />
        <StatsCard
          title="Active Deploys"
          value="08"
          subtitle="Vercel Integration"
          icon={Rocket}
          badge="VER. 4.1"
        />
      </div>

      {/* Management Grid */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full">
          <InventoryTable />
        </div>

        <div className="flex flex-col gap-8 w-full lg:w-auto">
          <QuickEdit />
          <RecentLogs />
        </div>
      </div>

      <MaintenanceBanner />
    </div>
  );
}
