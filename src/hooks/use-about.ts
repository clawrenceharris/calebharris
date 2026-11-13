import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createProjectService } from "@/services/project";
import { supabase } from "@/lib/supabase/client";
import { createAboutService } from "@/services/about";

export const useAbout = () => {
  const aboutService = createAboutService(supabase);
  const ABOUT_ME_ID = process.env.NEXT_PUBLIC_ABOUT_ME_ID;

  if (!ABOUT_ME_ID) {
    throw new Error("NEXT_PUBLIC_ABOUT_ME_ID is not set");
  }
  const {
    data: about,
    error,
    isLoading,
    refetch,
  } = useSuspenseQuery({
    queryKey: ["about", "detail", { id: ABOUT_ME_ID }],
    queryFn: async () => {
      const about = await aboutService.getAboutMeById(ABOUT_ME_ID);
      if (!about) throw new Error("About me not found");
      return about;
    },
  });
  return { about, error, isLoading, refetch };
};
