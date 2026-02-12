import { DomainInsert, DomainModel, DomainUpdate } from "@/lib/data/naming";
import { Projects, ProjectsInsert, ProjectsUpdate } from "@/types/tables";

export type Project = DomainModel<Projects>;
export type ProjectInsert = DomainInsert<ProjectsInsert>;
export type ProjectUpdate = DomainUpdate<ProjectsUpdate>;
export type ProjectFromSupabase = import("@/types").Projects;
export type ProjectTag = import("@/types").Enums<"project_tag">;
export type ProjectType = import("@/types").Enums<"project_type">;

export type BulletItem = {
  title: string;
  description: string;
};

export interface ProjectFilterState {
  tag?: ProjectTag;
}
