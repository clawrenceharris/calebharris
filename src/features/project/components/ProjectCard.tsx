import React from "react";
import { Project } from "@/features/project/domain";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui";

interface ProjectCardProps {
  project: Project;
  onProjectClick?: (projectId: string) => void;
}

export function ProjectCard({ project, onProjectClick }: ProjectCardProps) {
  const handleClick = () => {
    if (onProjectClick) {
      onProjectClick(project.id);
    }
  };
  console.log(project)
  return (
    <button className="w-full h-[300px] rounded-xl"  onClick={handleClick}>

   
    <Card
      className="p-0 relative cursor-pointer h-full text-left"
        role="button"
       
        
      
    >
      <div className="relative w-full h-full">

     
      {project.featuredImage && <Image
        src={project.featuredImage}
        alt={project.title}
        objectFit="cover"
        className="rounded-t-xl"
       fill
        />}
         </div>
      <CardContent className="text-white rounded-b-xl  pb-5 px-4">
          <div className="space-y-3">

         
          <div className="flex flex-col md:flex-row items-center justify-between ">

       
        <CardTitle className="text-xl font-semibold">
          {project.title}
        </CardTitle>
        <CardDescription>
          {!project?.endYear ? (
            <i>{project.startYear + " - Present"}</i>
          ) : (
            <i>{project.startYear + " - " + project.endYear}</i>
          )}
              </CardDescription>
              
          </div>
            <p className="text-muted-foreground">{project.tagline}</p>
        </div>
        </CardContent>
      
      </Card>
    </button>
  );
}
