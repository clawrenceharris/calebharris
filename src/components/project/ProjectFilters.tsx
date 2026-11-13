"use client";
import {
  ProjectFilterState,
  ProjectTag as ProjectTagType,
} from "@/types/project";
import { ValueOf } from "next/dist/shared/lib/constants";
import { ProjectTag } from "@/components/project";

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
    <div className="border-muted/50 mx-auto mb-6 flex w-full max-w-lg flex-row items-center gap-1 rounded-full border bg-black/20 p-1 text-white backdrop-blur-lg">
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
