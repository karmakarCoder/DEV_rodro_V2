"use client";
import { useState, useMemo } from "react";
import { DashboardPageHeader } from "@/components/dashboard/shared/DashboardPageHeader";
import { ProjectSearch } from "@/components/dashboard/shared/ProjectSearch";
import { ProjectCard } from "@/components/dashboard/projects/ProjectCard";
import { ProjectTable } from "@/components/dashboard/shared/ProjectTable";
import { MetricsGrid } from "@/components/dashboard/projects/MetricsGrid";
import { ProjectModal } from "@/components/dashboard/shared/ProjectModal";
import { useProjects } from "@/hooks/useProjects";
import { AlertModal } from "@/components/ui/AlertModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/ui/spinner";

// skeleton
const ProjectCardSkeleton = () => {
  return (
    <div className="brutalist-border-thick bg-white brutalist-shadow-md animate-pulse flex flex-col">
      <div className="h-48 bg-gray-100 border-b-2 border-brand-dark relative overflow-hidden">
        <div className="absolute top-4 left-4">
          <div className="h-5 w-24 bg-gray-300 brutalist-border" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 brutalist-border opacity-20 bg-gray-300" />
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="space-y-2 w-full">
            <div className="h-7 w-3/4 bg-gray-300" />
            <div className="h-7 w-1/2 bg-gray-200" />
          </div>

          <div className="w-5 h-5 rounded-full bg-gray-300 ml-4 shrink-0" />
        </div>
        <div className="space-y-2 mb-6">
          <div className="h-3 w-full bg-gray-200" />
          <div className="h-3 w-5/6 bg-gray-200" />
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-5 w-14 border border-gray-300 bg-gray-100"
            />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <div className="h-12 brutalist-border bg-gray-200" />
          <div className="h-12 brutalist-border bg-gray-200" />
        </div>
        <div className="h-12 brutalist-border bg-gray-300 mt-2 brutalist-shadow" />
      </div>
    </div>
  );
};

export default function ProjectsListingPage() {
  const { projectsQuery, deleteProjectMutation } = useProjects();
  const [globalFilter, setGlobalFilter] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [alert, setAlert] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    title: "",
    message: "",
    type: "success",
  });

  const projects = projectsQuery?.data || [];

  const filteredData = useMemo(() => {
    return projects?.filter(
      (p: any) =>
        p.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        (Array.isArray(p.stack)
          ? p.stack.join(" ").toLowerCase().includes(globalFilter.toLowerCase())
          : p.stack.toLowerCase().includes(globalFilter.toLowerCase())),
    );
  }, [projects, globalFilter]);

  const handleDelete = async () => {
    if (!projectToDelete) return;

    try {
      await deleteProjectMutation.mutateAsync(projectToDelete);
      setAlert({
        show: true,
        title: "SUCCESS",
        message: "PROJECT DELETED SUCCESSFULLY",
        type: "success",
      });
    } catch (error: any) {
      setAlert({
        show: true,
        title: "ERROR",
        message: error.message || "FAILED TO DELETE PROJECT",
        type: "error",
      });
    } finally {
      setProjectToDelete(null);
    }
  };

  const metrics = [
    {
      label: "TOTAL_PROJECTS",
      value: projects.length,
      subtext: "+12% INCREASE FROM LAST QUARTER",
      type: "dark" as const,
    },
    {
      label: "ACTIVE_LIVE",
      value: projects.filter((p: any) => p.status === "PRODUCTION").length,
      subtext: "CURRENTLY DEPLOYED",
      type: "yellow" as const,
      progress:
        (projects.filter((p: any) => p.status === "PRODUCTION").length /
          (projects.length || 1)) *
        100,
    },
    {
      label: "SERVER_STATUS",
      value: "98.2% UPTIME",
      subtext: "MONITORING 14 ENDPOINTS",
      type: "white" as const,
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-400">
      <DashboardPageHeader
        title="PROJECTS_LISTING"
        description="GLOBAL REPOSITORY OF ALL DEVELOPMENT INITIATIVES, STATUS MONITORING, AND DEPLOYMENT HOOKS."
        onAddClick={() => {
          setEditingProject(null);
          setIsModalOpen(true);
        }}
        buttonText="ADD NEW PROJECT"
      />

      <ProjectSearch value={globalFilter} onChange={setGlobalFilter} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projectsQuery?.isPending
          ? [...Array(6)].map((_, index) => <ProjectCardSkeleton key={index} />)
          : filteredData.map((project: any) => (
              <ProjectCard
                key={project._id}
                title={project.name}
                image={project?.image}
                description={project.description}
                status={
                  project.status === "PRODUCTION"
                    ? "LIVE"
                    : project.status === "STAGING"
                      ? "BETA"
                      : "DRAFT"
                }
                tags={
                  Array.isArray(project.stack) ? project.stack : [project.stack]
                }
                repo={project?.repo}
                live={project.live_url}
                onEdit={() => {
                  setEditingProject(project);
                  setIsModalOpen(true);
                }}
                onDelete={() => setProjectToDelete(project._id)}
              />
            ))}
        {filteredData.length === 0 && (
          <div className="col-span-full p-12 border-4 border-dashed border-black flex flex-col items-center justify-center bg-gray-50">
            <h3 className="text-2xl font-black italic uppercase">
              NO_PROJECTS_FOUND
            </h3>
            <p className="font-bold text-gray-500 uppercase mt-2 text-sm">
              TRY ADJUSTING YOUR SEARCH FILTER
            </p>
          </div>
        )}
      </div>

      <div className="pt-12">
        <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-6 underline decoration-4 underline-offset-8">
          FULL_INVENTORY
        </h2>
        <ProjectTable
          data={projects}
          globalFilter={globalFilter}
          onEdit={(p) => {
            setEditingProject(p);
            setIsModalOpen(true);
          }}
          onDelete={(id) => setProjectToDelete(id)}
        />
      </div>

      <MetricsGrid metrics={metrics} />

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingProject}
      />

      <AlertModal
        isOpen={alert.show}
        onClose={() => setAlert({ ...alert, show: false })}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!projectToDelete}
        onOpenChange={(open) => !open && setProjectToDelete(null)}
      >
        <AlertDialogContent className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-black uppercase italic">
              ARE YOU SURE?
            </AlertDialogTitle>
            <AlertDialogDescription className="font-bold text-gray-600 uppercase text-sm">
              THIS ACTION CANNOT BE UNDONE. THIS WILL PERMANENTLY DELETE THE
              PROJECT FROM THE DATABASE.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-4">
            <AlertDialogCancel className="border-2 border-black font-black uppercase tracking-widest hover:bg-gray-100 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5">
              CANCEL
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 text-white border-2 border-black font-black uppercase tracking-widest hover:bg-red-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
            >
              {deleteProjectMutation?.isPending && <Spinner />} DELETE_PROJECT
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
