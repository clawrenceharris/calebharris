import { useMemo, useState } from "react";
import { Project, ProjectFilterState } from "@/types/project";

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
