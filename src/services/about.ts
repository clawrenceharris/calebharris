import { SupabaseClient } from "@supabase/supabase-js";
import { AboutRepository } from "@/repositories/about";

export const createAboutService = (client: SupabaseClient) => {
  const repository = new AboutRepository(client);

  const getAboutMeById = (id: string) => repository.getById(id);

  return {
    getAboutMeById,
  };
};

export type AboutService = ReturnType<typeof createAboutService>;
