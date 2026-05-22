"use client";

import{ useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPublic } from "@/hooks/axios/useAxiosPublic";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

export const MaintenanceBanner = () => {
  const queryClient = useQueryClient();
  const [showConfirm, setShowConfirm] = useState(false);

  const { data: config, isLoading } = useQuery({
    queryKey: ["maintenance-config"],
    queryFn: async () => {
      const res = await axiosPublic.get("/admin/maintenance");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (isMaintenanceMode: boolean) => {
      const res = await axiosPublic.put("/admin/maintenance", {
        isMaintenanceMode,
        message:
          "Our site is currently undergoing scheduled maintenance. We will be back shortly!",
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenance-config"] });
    },
  });

  const isMaintenanceMode = config?.isMaintenanceMode || false;
  const lastUpdated = config?.updatedAt
    ? new Date(config.updatedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "UNKNOWN";

  const handleToggle = () => {
    if (!isMaintenanceMode) {
      setShowConfirm(true);
    } else {
      mutation.mutate(false);
    }
  };

  const confirmMaintenance = () => {
    setShowConfirm(false);
    mutation.mutate(true);
  };

  return (
    <div
      className={`brutalist-border-thick p-8 flex flex-col md:flex-row md:items-center justify-between gap-12 relative overflow-hidden group transition-colors duration-500 ${isMaintenanceMode ? "bg-red-500 text-white" : "bg-primary-text text-primary"}`}
    >
      <span className="absolute -bottom-10 -right-4 text-[120px] font-black opacity-10 leading-none select-none pointer-events-none group-hover:opacity-20 transition-opacity uppercase">
        ROOT
      </span>

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter uppercase mb-2">
          SYSTEM MAINTENANCE MODE
        </h2>
        <p
          className={`${isMaintenanceMode ? "text-red-100" : "text-brand-yellow"} font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs`}
        >
          LAST SAFETY CHECK: {isLoading ? "..." : lastUpdated}
        </p>
      </div>

      <div className="flex flex-wrap gap-4 relative z-10">
        <button
          onClick={handleToggle}
          disabled={mutation.isPending || isLoading}
          className={`brutalist-border-thick border-white px-8 py-3 font-black tracking-widest transition-all text-xs disabled:opacity-50 disabled:cursor-not-allowed ${isMaintenanceMode ? "bg-white text-red-500" : "bg-primary text-primary-text"}`}
        >
          {mutation.isPending
            ? "PROCESSING..."
            : isMaintenanceMode
              ? "DISABLE MAINTENANCE"
              : "ENABLE MAINTENANCE"}
        </button>
        <button className="brutalist-border-thick border-white bg-red-500 text-primary px-8 py-3 font-black tracking-widest hover:translate-x-1 hover:translate-y-1 hover:shadow-none brutalist-shadow text-xs">
          PURGE CACHE
        </button>
      </div>

      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md bg-white text-black p-6 rounded-none max-h-[90vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-black uppercase tracking-tight">
              ENABLE MAINTENANCE MODE?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-bold text-gray-600 uppercase text-sm mt-2">
              This will lock out all non-admin users and immediately redirect
              them to the maintenance screen. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex gap-4">
            <AlertDialogCancel className="w-full bg-white shrink text-black py-3 font-black tracking-widest hover:bg-gray-100 transition-all border-2 border-black rounded-none">
              CANCEL
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmMaintenance}
              className="w-full bg-red-500 text-white py-3 shrink font-black tracking-widest hover:bg-red-600 transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 rounded-none"
            >
              {mutation?.isPending && <Spinner />} CONFIRM
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
