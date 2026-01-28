
import { SupabaseClient } from "@supabase/supabase-js";
import { ProjectRepository } from "@/features/project/data";
import { Project, ProjectUpdate } from "@/features/project/domain";


export const createProjectService = (client: SupabaseClient) => {
  const repository = new ProjectRepository(client);

  const getAllProjects = () => repository.getAll();
const getProjectById = (projectId: string) => repository.getById(projectId);


const updateProject = (projectId: string, data: ProjectUpdate): Promise<Project> =>
    repository.update(projectId, data);
  const deleteProject = (projectId: string): Promise<void> =>
    repository.delete(projectId);

  return {
      getAllProjects,
      getProjectById,
      deleteProject,
      updateProject
    
  };
};

export type ProjectService = ReturnType<typeof createProjectService>;
