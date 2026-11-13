import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types/project";
import { createProjectService } from "@/services/project";
import { supabase } from "@/lib/supabase/client";

export function useProjects<TSelected = Project[]>(
  select?: (playbooks: Project[]) => TSelected,
) {
  const projectService = createProjectService(supabase);
  const {
    data: projects = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: () => projectService.getAllProjects(),
    select,
  });
  return { projects, isLoading, error, refetch };
}
