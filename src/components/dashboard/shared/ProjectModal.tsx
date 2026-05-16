"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useProjects } from "@/hooks/useProjects";
import { AlertModal } from "@/components/ui/AlertModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";

export type ProjectData = {
  id: string;
  name: string;
  description: string;
  status: "PRODUCTION" | "DRAFT" | "STAGING" | "pending";
  stack: string;
  image?: string | StaticRange;
  repo?: string | null;
  live_url?: string | null;
};

const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["PRODUCTION", "DRAFT", "STAGING", "pending"]),
  stack: z.string().min(1, "Tech stack is required"),
  image: z.instanceof(File).or(z.string()).optional(),
  repo: z.string().optional().or(z.literal("")),
  live_url: z.string().optional().or(z.literal("")),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any | null;
  onSave?: (data: any) => void;
}

export const ProjectModal = ({
  isOpen,
  onClose,
  initialData,
  onSave,
}: ProjectModalProps) => {
  const { createProjectMutation, updateProjectMutation } = useProjects();
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

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "DRAFT",
      stack: "",
      image: "",
      repo: "",
      live_url: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name,
        description: initialData.description,
        status: initialData.status,
        stack: Array.isArray(initialData.stack)
          ? initialData.stack.join(", ")
          : initialData.stack,
        image: initialData.image || "",
        repo: initialData.repo || "",
        live_url: initialData.live_url || "",
      });
    } else {
      reset({
        name: "",
        description: "",
        status: "DRAFT",
        stack: "",
        image: "",
        repo: "", // Keep fields consistently present
        live_url: "", // Keep fields consistently present
      });
    }
  }, [initialData, reset, isOpen]);

  const onSubmit = async (data: ProjectFormValues) => {
    const formattedData = {
      ...data,
      stack: data.stack
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      repo: data.repo || "",
      live_url: data.live_url || "",
      image: data.image || "",
    };

    if (onSave) {
      onSave({ ...formattedData, id: initialData?.id || initialData?._id });
      onClose();
      return;
    }

    try {
      if (initialData?._id) {
        await updateProjectMutation.mutateAsync({
          id: initialData._id,
          data: formattedData as any,
        });
        setAlert({
          show: true,
          title: "SUCCESS",
          message: "PROJECT UPDATED SUCCESSFULLY",
          type: "success",
        });
      } else {
        await createProjectMutation.mutateAsync(formattedData as any);
        setAlert({
          show: true,
          title: "SUCCESS",
          message: "PROJECT CREATED SUCCESSFULLY",
          type: "success",
        });
      }
    } catch (error: any) {
      setAlert({
        show: true,
        title: "ERROR",
        message: error.message || "SOMETHING WENT WRONG",
        type: "error",
      });
    }
  };

  const handleAlertClose = () => {
    setAlert({ ...alert, show: false });
    if (alert.type === "success") {
      onClose();
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white border-4 border-black p-8 w-full max-w-lg! shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-y-auto max-h-[90vh]">
          <DialogHeader className="mb-6">
            <DialogTitle className="text-2xl font-black italic tracking-tighter uppercase">
              {initialData ? "EDIT_PROJECT" : "ADD_NEW_PROJECT"}
            </DialogTitle>
            <DialogDescription className="hidden">
              Form to {initialData ? "edit" : "add"} project details.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest block mb-2">
                PROJECT NAME
              </label>
              <input
                {...register("name")}
                className="w-full border-2 border-black p-3 font-bold focus:bg-secondary outline-none uppercase"
              />
              {errors.name && (
                <span className="text-red-500 text-[10px] font-bold mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest block mb-2">
                DESCRIPTION
              </label>
              <textarea
                {...register("description")}
                className="w-full border-2 border-black p-3 font-bold focus:bg-secondary outline-none uppercase h-24 resize-none"
              />
              {errors.description && (
                <span className="text-red-500 text-[10px] font-bold mt-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest block mb-2">
                STATUS
              </label>
              <select
                {...register("status")}
                className="w-full border-2 border-black p-3 font-bold focus:bg-secondary outline-none uppercase appearance-none"
              >
                <option value="PRODUCTION">PRODUCTION</option>
                <option value="STAGING">STAGING</option>
                <option value="DRAFT">DRAFT</option>
                <option value="pending">PENDING</option>
              </select>
              {errors.status && (
                <span className="text-red-500 text-[10px] font-bold mt-1">
                  {errors.status.message}
                </span>
              )}
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest block mb-2">
                TECH STACK (COMMA SEPARATED)
              </label>
              <input
                {...register("stack")}
                placeholder="E.G. NEXT.JS, TAILWIND"
                className="w-full border-2 border-black p-3 font-bold focus:bg-secondary outline-none uppercase"
              />
              {errors.stack && (
                <span className="text-red-500 text-[10px] font-bold mt-1">
                  {errors.stack.message}
                </span>
              )}
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest block mb-2">
                IMAGE URL
              </label>
              <input
                type="file"
                onChange={(e) =>
                  e.target.files?.[0] && setValue("image", e.target.files?.[0])
                }
                className="w-full border-2 border-black p-3 font-bold focus:bg-secondary outline-none uppercase"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest block mb-2">
                live url
              </label>
              <input
                {...register("live_url")}
                placeholder="HTTP://LOCALHOST:3000/UPLOADS/..."
                className="w-full border-2 border-black p-3 font-bold focus:bg-secondary outline-none uppercase"
              />
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest block mb-2">
                github repo
              </label>
              <input
                {...register("repo")}
                placeholder="HTTP://LOCALHOST:3000/UPLOADS/..."
                className="w-full border-2 border-black p-3 font-bold focus:bg-secondary outline-none uppercase"
              />
            </div>

            <button
              type="submit"
              disabled={
                createProjectMutation.isPending ||
                updateProjectMutation.isPending
              }
              className="w-full bg-black text-white py-4 font-black justify-center flex items-center gap-2 tracking-widest hover:bg-secondary hover:text-black transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 disabled:opacity-50"
            >
              {(createProjectMutation.isPending ||
                updateProjectMutation.isPending) && (
                <Spinner className="size-5" />
              )}
              {initialData ? "UPDATE_ENTRY" : "CREATE_ENTRY"}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <AlertModal
        isOpen={alert.show}
        onClose={handleAlertClose}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />
    </>
  );
};
