import { useQuery } from "@tanstack/react-query";
import { Project } from "@/features/project/domain";
import { useProject, useProjectService } from "@/features/project/hooks";

export function useProjects<TSelected = Project[]>(
  select?: (playbooks: Project[]) => TSelected,
) {
  const projectService = useProjectService();
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
