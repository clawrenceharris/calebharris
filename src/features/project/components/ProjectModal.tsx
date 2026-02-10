"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ToolItem } from "@/components/ToolItem";
import { Loader2 } from "lucide-react";
import { useProject } from "@/features/project/hooks";
import { tools } from "@/lib/constants/tools";
import Link from "next/link";
import { MorphyButton } from "@/components/ui";
import { BulletItem } from "@/features/project/domain";
import { BulletList } from "@/components";

interface ProjectModalProps {
  projectId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectModal({
  projectId,
  open,
  onOpenChange,
}: ProjectModalProps) {
  const { project, error, isLoading } = useProject(projectId);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="animate-spin text-primary-500" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }
  if (!project) {
    return (
      <div className="flex justify-center items-center py-8">
        <p>Project Not Found</p>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full  max-w-240 max-h-[90vh] overflow-y-auto bg-[#1a1a1a] text-white border-[#33353F]">
        <DialogHeader>
          <DialogTitle className="text-3xl mb-2">{project.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-10">
          {project.featuredImage && (
            <div className=" relative">
              <Image
                src={project.featuredImage}
                alt={project.title}
                width={1920}
                className="rounded-2xl"
                height={1080}
              />
            </div>
          )}

          <div>
            <div className="space-y-5 bg-secondary-foreground p-4 rounded-2xl">
              <div className="space-y-3">
                <p className="text-muted-foreground text-nowrap italic">
                  {project.tagline}
                  {" | "}
                  {!project.endYear ? (
                    <i>{project.startYear} - Present</i>
                  ) : (
                    <i>
                      {project.startYear} - {project.endYear}
                    </i>
                  )}
                </p>
                <span className="sr-only">Tools Used</span>
                <div className="flex flex-wrap gap-2 ">
                  {project.tools.map((tool) => (
                    <ToolItem tool={tools[tool]} key={tools[tool].id} />
                  ))}
                </div>
              </div>
              <p className="text-foreground">{project.description}</p>

              {project.demoLink && (
                <MorphyButton>
                  <Link target="_blank" href={project.demoLink}>
                    Try it out!
                  </Link>
                </MorphyButton>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-10 px-4">
              <BulletList
                heading="Key Features"
                items={project.keyFeatures as BulletItem[]}
              />

              <BulletList
                heading="My Contributions"
                items={project.myContributions as BulletItem[]}
              />
            </div>

            <div className="space-y-4">
              {project.images.map((image, i) => (
                <Image
                  key={i}
                  src={image}
                  alt={`${project.title} - Image ${i + 2}`}
                  width={1920}
                  height={1080}
                  className="w-full h-auto rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
