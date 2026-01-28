import { useMemo, useState } from "react";
import { Project, ProjectFilterState } from "@/features/project/domain";




export function useProjectFilters(projects: Project[]) {
  const [filters, setFilters] = useState<ProjectFilterState>({});
  
  const filteredProjects = useMemo(() => {
      return projects.filter((project) => {
        
        if (filters.tag && !project.projectTags.includes(filters.tag)) {
        return false;
      }

      return true;
    });
  }, [filters, projects]);

 

  return {
      filteredProjects,
    setFilters,
      filters,
  };
}
