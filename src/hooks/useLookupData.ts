import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Medicines
export const useMedicines = () =>
  useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("medicines")
        .select("*")
        .order("name");
      if (error) throw error;
      return data || [];
    },
  });

export const useCreateMedicine = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (med: { name: string; default_potency?: string; default_dose?: string; default_frequency?: string }) => {
      const { data, error } = await supabase.from("medicines").insert(med).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["medicines"] }),
  });
};

// Diagnoses
export const useDiagnoses = () =>
  useQuery({
    queryKey: ["diagnoses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("diagnoses")
        .select("*")
        .order("name");
      if (error) throw error;
      return data || [];
    },
  });

export const useCreateDiagnosis = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (d: { name: string }) => {
      const { data, error } = await supabase.from("diagnoses").insert(d).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["diagnoses"] }),
  });
};

// Chief Complaints
export const useChiefComplaints = () =>
  useQuery({
    queryKey: ["chief_complaints"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chief_complaints")
        .select("*")
        .order("name");
      if (error) throw error;
      return data || [];
    },
  });

export const useCreateChiefComplaint = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (c: { name: string }) => {
      const { data, error } = await supabase.from("chief_complaints").insert(c).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["chief_complaints"] }),
  });
};
