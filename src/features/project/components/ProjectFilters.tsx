"use client";
import {
  ProjectFilterState,
  ProjectTag as ProjectTagType,
} from "@/features/project/domain";
import { ValueOf } from "next/dist/shared/lib/constants";
import { ProjectTag } from "@/features/project/components";

interface ProjectFiltersProps {
  onFilterChange: (filter: ProjectFilterState) => void;
  filters: ProjectFilterState;
  availableCourses?: string[];
}

export const ProjectFilters = ({
  onFilterChange,
  filters,
}: ProjectFiltersProps) => {
  const handleToggle = (
    key: keyof ProjectFilterState,
    value: ValueOf<ProjectFilterState>,
  ) => {
    const newFilter = filters[key] === value ? undefined : value;
    onFilterChange({ ...filters, [key]: newFilter });
  };

  const tags: ProjectTagType[] = ["Game", "UI/UX", "Website"];

  return (
    <div className="text-white p-1 gap-1 w-full max-w-lg mx-auto flex bg-black/20 backdrop-blur-lg border border-muted/50 rounded-full  flex-row items-center mb-6">
      {tags.map((tag) => (
        <ProjectTag
          key={tag}
          onClick={() => handleToggle("tag", tag)}
          name={tag}
          isSelected={filters.tag === tag}
        />
      ))}
    </div>
  );
};
