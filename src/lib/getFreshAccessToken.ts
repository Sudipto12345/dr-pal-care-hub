import { supabase } from "@/integrations/supabase/client";

export const getFreshAccessToken = async () => {
  const { data: currentSession } = await supabase.auth.getSession();

  if (!currentSession.session?.refresh_token) {
    throw new Error("Your session expired. Please sign in again.");
  }

  const { data, error } = await supabase.auth.refreshSession();

  if (error || !data.session?.access_token) {
    throw new Error("Your session expired. Please sign in again.");
  }

  return data.session.access_token;
};
