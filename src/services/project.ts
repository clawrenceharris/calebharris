import { SupabaseClient } from "@supabase/supabase-js";
import { ProjectRepository } from "@/repositories/project";
import { Project, ProjectUpdate } from "@/types/project";

export const createProjectService = (client: SupabaseClient) => {
  const repository = new ProjectRepository(client);

  const getAllProjects = () => repository.getAll();
  const getProjectById = (projectId: string): Promise<Project | null> =>
    repository.getById(projectId);

  const updateProject = (
    projectId: string,
    data: ProjectUpdate,
  ): Promise<Project> => repository.update(projectId, data);
  const deleteProject = (projectId: string): Promise<void> =>
    repository.delete(projectId);

  return {
    getAllProjects,
    getProjectById,
    deleteProject,
    updateProject,
  };
};

export type ProjectService = ReturnType<typeof createProjectService>;
