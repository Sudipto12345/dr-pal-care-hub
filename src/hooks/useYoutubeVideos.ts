import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useYoutubeVideos = (activeOnly = false) =>
  useQuery({
    queryKey: ["youtube-videos", activeOnly],
    queryFn: async () => {
      let q = supabase.from("youtube_videos").select("*").order("sort_order", { ascending: true });
      if (activeOnly) q = q.eq("is_active", true);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });

export const useCreateYoutubeVideo = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (v: { title: string; youtube_id: string; description?: string; sort_order?: number }) => {
      const { data, error } = await supabase.from("youtube_videos").insert(v).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["youtube-videos"] }); toast({ title: "Video added" }); },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useUpdateYoutubeVideo = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; title?: string; youtube_id?: string; description?: string; sort_order?: number; is_active?: boolean }) => {
      const { data, error } = await supabase.from("youtube_videos").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["youtube-videos"] }); toast({ title: "Video updated" }); },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useDeleteYoutubeVideo = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("youtube_videos").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["youtube-videos"] }); toast({ title: "Video deleted" }); },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};
