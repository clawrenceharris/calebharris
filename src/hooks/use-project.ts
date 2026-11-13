import { useQuery } from "@tanstack/react-query";
import { createProjectService } from "@/services/project";
import { supabase } from "@/lib/supabase/client";

export const useProject = (projectId: string) => {
  const projectService = createProjectService(supabase);
  const {
    data: project,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["projects", "detail", { projectId }],
    queryFn: () => projectService.getProjectById(projectId),
  });
  return { project, error, isLoading, refetch };
};
