
import { useQuery } from "@tanstack/react-query"
import { useProjectService } from "@/features/project/hooks";


export const useProject = (projectId: string) => {
    
    const projectService = useProjectService();
    const { data: project, error, isLoading, refetch } = useQuery({
        queryKey: ["projects", "detail", { projectId }],
        queryFn: () => projectService.getProjectById(projectId),
    });
    return {project, error, isLoading, refetch}
        
    
}