import { createProjectService } from "@/features/project/domain";
import { supabase } from "@/lib/supabase/client";

export const useProjectService = () => {
    return createProjectService(supabase);
}