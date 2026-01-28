import { BaseRepository } from "@/lib/data/base-repository";
import { camelizeKeys, DomainInsert, DomainModel, DomainUpdate, snakeizeKeys } from "@/lib/data/naming";
import {
  Projects,
  ProjectsInsert,
  ProjectsUpdate,
} from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Repository for projects (lesson plans) data operations using Supabase
 * Contains only database access logic, no business rules
 */
type Project = DomainModel<Projects>;
type ProjectInsert = DomainInsert<ProjectsInsert>;
type ProjectUpdate = DomainUpdate<ProjectsUpdate>;

export class ProjectRepository extends BaseRepository<
  Projects,
  Project,
  ProjectsInsert,
  ProjectsUpdate,
  ProjectInsert,
  ProjectUpdate
> {
  constructor(client: SupabaseClient) {
    super(client, "projects");
  }


}

