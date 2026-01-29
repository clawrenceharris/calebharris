"use client";

import React, { useRef } from "react";
import { ProjectCard, ProjectFilters } from "@/features/project/components";
import { useProjectFilters, useProjects } from "@/features/project/hooks";
import { AlertTriangle } from "lucide-react";
import { Callout, Skeleton } from "@/components";

interface ProjectsSectionProps {
  onProjectClick?: (projectId: string) => void;
}

export function ProjectsSection({ onProjectClick }: ProjectsSectionProps) {
  const listRef = useRef(null);
  const { projects, isLoading, error } = useProjects();

  const { filteredProjects, setFilters, filters } = useProjectFilters(projects);

  if (isLoading) {
    return (
      <>
        <h2 className="mb-8">My Projects</h2>

        <ProjectFilters onFilterChange={setFilters} filters={filters} />

        <div className="grid  grid-cols-[repeat(auto-fill,minmax(350px,1fr))] py-7  gap-4">
          {" "}
          <Skeleton className="w-full h-70 rounded-xl" />
          <Skeleton className="w-full h-70 rounded-xl" />
          <Skeleton className="w-full h-70 rounded-xl" />
          <Skeleton className="w-full h-70 rounded-xl" />
          <Skeleton className="w-full h-70 rounded-xl" />
          <Skeleton className="w-full h-70 rounded-xl" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h2 className="mb-8">My Projects</h2>
        <Callout
          title="Something went wrong."
          description="Some projects failed to load. Please try again later."
          icon={<AlertTriangle />}
          variant="destructive"
        />
      </>
    );
  }

  return (
    <>
      <h2 className="sticky text-4xl font-bold text-white mb-8">My Projects</h2>
      <ProjectFilters onFilterChange={setFilters} filters={filters} />

      <ul
        ref={listRef}
        className="grid  grid-cols-[repeat(auto-fill,minmax(350px,1fr))] py-7  gap-4"
      >
        {filteredProjects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} onProjectClick={onProjectClick} />
          </li>
        ))}
      </ul>
    </>
  );
}
