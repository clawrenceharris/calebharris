import { BaseRepository } from "@/lib/data/base-repository";
import {
  camelizeKeys,
  DomainInsert,
  DomainModel,
  DomainUpdate,
  snakeizeKeys,
} from "@/lib/data/naming";
import { AboutMes, AboutMesInsert, AboutMesUpdate } from "@/types";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Repository for projects (lesson plans) data operations using Supabase
 * Contains only database access logic, no business rules
 */
type AboutMe = DomainModel<AboutMes>;
type AboutInsert = DomainInsert<AboutMesInsert>;
type AboutUpdate = DomainUpdate<AboutMesUpdate>;

export class AboutRepository extends BaseRepository<
  AboutMes,
  AboutMe,
  AboutInsert,
  AboutUpdate,
  AboutInsert,
  AboutUpdate
> {
  constructor(client: SupabaseClient) {
    super(client, "about_mes");
  }
}
