// types/project.ts
export interface Project {
  id: string;
  name: string;
  description: string;
  image?: string;
  stack?: string[];
  live_url?: string;
  repo?: string;
  status: string;
  updated_at: string;
}

// For this example, we'll use a simple in-memory array
export let projects: Project[] = [
  {
    id: "1",
    name: "Project Alpha",
    description: "Internal tool",
    updated_at: "2026-05-15",
    status: "production",
  },
];
