import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosPublic } from "./axios/useAxiosPublic";

export interface ProjectData {
  _id?: string;
  name: string;
  description: string;
  status: string;
  stack: string[];
  image: string;
  repo: string;
  live_url: string;
}

export const useProjects = () => {
  const queryClient = useQueryClient();

  // Get all projects
  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/projects");
      return data?.data as ProjectData[];
    },
  });

  // Create project
  const createProjectMutation = useMutation({
    mutationFn: async (newProject: Omit<ProjectData, "_id">) => {
      const { data } = await axiosPublic.post("/projects", newProject, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  // Update project
  const updateProjectMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<ProjectData>;
    }) => {
      const { data: responseData } = await axiosPublic.put(
        `/projects/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return responseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  // Delete project
  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data } = await axiosPublic.delete(`/projects/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return {
    projectsQuery,
    createProjectMutation,
    updateProjectMutation,
    deleteProjectMutation,
  };
};
