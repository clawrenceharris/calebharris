"use client";

import React, {useRef } from "react";
import { ProjectCard,ProjectFilters } from "@/features/project/components";
import { useProjectFilters,useProjects } from "@/features/project/hooks";
import { Skeleton } from "@/components//ui";
import { AlertTriangle } from "lucide-react";

interface ProjectsSectionProps {
  onProjectClick?: (projectId: string) => void;
}

export function ProjectsSection({ onProjectClick }: ProjectsSectionProps) {
  const listRef = useRef(null);
  const { projects, isLoading, error } = useProjects();

  const { filteredProjects, setFilters, filters } = useProjectFilters(projects);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="w-full h-30 rounded-xl" />
        <div className=" grid grid-cols-1 md:grid-cols-3 xl:grid-col-4 gap-3">
          <Skeleton className="w-full h-70 rounded-xl" />
          <Skeleton className="w-full h-70 rounded-xl" />
          <Skeleton className="w-full h-70 rounded-xl" />
          <Skeleton className="w-full h-70 rounded-xl" />
          <Skeleton className="w-full h-70 rounded-xl" />
          <Skeleton className="w-full h-70 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <>
  
        <h2 className="text-4xl font-bold text-white mb-8">My Projects</h2>
        <div className="flex flex-col w-full text-center justify-center">

          <div className="flex justify-center gap-2 w-full ">
            <div className="space-y-5">
              
        
              <div className="flex relative justify-center gap-5 w-full items-center bg-secondary-foreground rounded-full p-4">
            
                <span className="text-accent-400 absolute left-1 bg-accent-800/30 text-nowrap flex items-center justify-center size-12 rounded-full">
                  
       
                  <AlertTriangle />
                </span>
                <h3 className="text-xl  font-lexend-giga font-bold">Something went wrong</h3>
              </div>
              <p className="text-md">Some projects failed to load. Please try again later</p>
            </div>
          </div>
        </div>
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
