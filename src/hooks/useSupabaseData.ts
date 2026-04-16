import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// ─── PATIENTS ───
export const usePatients = () =>
  useQuery({
    queryKey: ["patients"],
    queryFn: async () => {
      const { data, error } = await supabase.from("patients").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const usePatient = (id: string) =>
  useQuery({
    queryKey: ["patients", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("patients").select("*").eq("id", id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

export const useCreatePatient = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (patient: { name: string; phone?: string; age?: number; gender?: string; address?: string; email?: string }) => {
      const { data, error } = await supabase.from("patients").insert(patient).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["patients"] });
      toast({ title: "Patient added successfully" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useUpdatePatient = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; name?: string; phone?: string; age?: number; gender?: string; address?: string; email?: string }) => {
      const { data, error } = await supabase.from("patients").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["patients"] });
      toast({ title: "Patient updated" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useDeletePatient = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("patients").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["patients"] });
      toast({ title: "Patient deleted" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

// ─── APPOINTMENTS ───
export const useAppointments = () =>
  useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data, error } = await supabase.from("appointments").select("*, patients(name, phone)").order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useMyAppointments = (userId: string | undefined) =>
  useQuery({
    queryKey: ["my-appointments", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("appointments").select("*, patients(name)").eq("user_id", userId!).order("date", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

export const useCreateAppointment = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (appt: { patient_id: string; user_id: string; date: string; time_slot?: string; notes?: string }) => {
      const { data, error } = await supabase.from("appointments").insert(appt).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
      qc.invalidateQueries({ queryKey: ["my-appointments"] });
      toast({ title: "Appointment booked!" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useUpdateAppointmentStatus = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
      toast({ title: "Status updated" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useDeleteAppointment = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("appointments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
      qc.invalidateQueries({ queryKey: ["my-appointments"] });
      toast({ title: "Appointment deleted" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useUpdateAppointment = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; date?: string; time_slot?: string; notes?: string; status?: string }) => {
      const { error } = await supabase.from("appointments").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
      qc.invalidateQueries({ queryKey: ["my-appointments"] });
      toast({ title: "Appointment updated" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

// ─── PRESCRIPTIONS ───
export const usePrescriptions = () =>
  useQuery({
    queryKey: ["prescriptions"],
    queryFn: async () => {
      const { data, error } = await supabase.from("prescriptions").select("*, patients(name), prescription_items(*)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const usePrescription = (id: string) =>
  useQuery({
    queryKey: ["prescriptions", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("prescriptions").select("*, patients(name, age, gender, phone, address), prescription_items(*)").eq("id", id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

export const useCreatePrescription = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ items, clinical_exam, ...prescription }: {
      patient_id: string; doctor_id: string; diagnosis?: string; advice?: string; follow_up?: string;
      clinical_exam?: Record<string, string>;
      items: { medicine_name: string; potency?: string; dose?: string; frequency?: string }[];
    }) => {
      const insertData: any = { ...prescription };
      if (clinical_exam) insertData.clinical_exam = clinical_exam;
      const { data: rx, error: rxErr } = await supabase.from("prescriptions").insert(insertData as any).select().single();
      if (rxErr) throw rxErr;
      if (items.length > 0) {
        const { error: itemErr } = await supabase.from("prescription_items").insert(items.map((i) => ({ ...i, prescription_id: rx.id })));
        if (itemErr) throw itemErr;
      }
      return rx;
    },
    onSuccess: (rx) => {
      qc.invalidateQueries({ queryKey: ["prescriptions"] });
      toast({ title: "Prescription created" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useDeletePrescription = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      // Delete items first, then prescription
      await supabase.from("prescription_items").delete().eq("prescription_id", id);
      const { error } = await supabase.from("prescriptions").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["prescriptions"] });
      toast({ title: "Prescription deleted" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useUpdatePrescription = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, items, clinical_exam, ...updates }: {
      id: string; patient_id?: string; doctor_id?: string; diagnosis?: string; advice?: string; follow_up?: string;
      clinical_exam?: Record<string, string>;
      items: { medicine_name: string; potency?: string; dose?: string; frequency?: string }[];
    }) => {
      const updateData: any = { ...updates };
      if (clinical_exam) updateData.clinical_exam = clinical_exam;
      const { error: rxErr } = await supabase.from("prescriptions").update(updateData as any).eq("id", id);
      if (rxErr) throw rxErr;
      await supabase.from("prescription_items").delete().eq("prescription_id", id);
      if (items.length > 0) {
        const { error: itemErr } = await supabase.from("prescription_items").insert(items.map((i) => ({ ...i, prescription_id: id })));
        if (itemErr) throw itemErr;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["prescriptions"] });
      toast({ title: "Prescription updated" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};


export const useCases = () =>
  useQuery({
    queryKey: ["cases"],
    queryFn: async () => {
      const { data, error } = await supabase.from("cases").select("*, patients(name)").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useCreateCase = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (caseData: { patient_id: string; symptoms?: string; history?: string; notes?: string; form_data?: any }) => {
      const { data, error } = await supabase.from("cases").insert(caseData).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cases"] });
      toast({ title: "Case created" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useCase = (id: string) =>
  useQuery({
    queryKey: ["cases", id],
    queryFn: async () => {
      const { data, error } = await supabase.from("cases").select("*, patients(name, age, gender, phone)").eq("id", id).single();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

export const useUpdateCase = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; patient_id?: string; symptoms?: string; history?: string; notes?: string; form_data?: any }) => {
      const { data, error } = await supabase.from("cases").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cases"] });
      toast({ title: "Case updated" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useDeleteCase = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("cases").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cases"] });
      toast({ title: "Case deleted" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

// ─── PRODUCTS ───
export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useProduct = (slug: string) =>
  useQuery({
    queryKey: ["products", slug],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

export const useCreateProduct = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (product: { name: string; slug?: string; price: number; description?: string; image_url?: string; stock?: number; category?: string }) => {
      const { data, error } = await supabase.from("products").insert(product).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Product added" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useUpdateProduct = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; name?: string; price?: number; description?: string; image_url?: string; stock?: number; category?: string; is_active?: boolean; slug?: string }) => {
      const { data, error } = await supabase.from("products").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Product updated" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["products"] });
      toast({ title: "Product deleted" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

// ─── ORDERS ───
export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*, order_items(*, products(name))").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

export const useMyOrders = (userId: string | undefined) =>
  useQuery({
    queryKey: ["my-orders", userId],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*, order_items(*, products(name))").eq("user_id", userId!).order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });

export const useCreateOrder = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ items, ...order }: {
      user_id: string; total: number; address: string; phone: string; customer_name: string; customer_email?: string;
      items: { product_id: string; quantity: number; price: number }[];
    }) => {
      const { data: ord, error: ordErr } = await supabase.from("orders").insert(order).select().single();
      if (ordErr) throw ordErr;
      const { error: itemErr } = await supabase.from("order_items").insert(items.map((i) => ({ ...i, order_id: ord.id })));
      if (itemErr) throw itemErr;
      return ord;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
      qc.invalidateQueries({ queryKey: ["my-orders"] });
      toast({ title: "Order placed successfully!" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useUpdateOrderStatus = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("orders").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["orders"] });
      toast({ title: "Order status updated" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

// ─── BLOG ───
export const useBlogPosts = (publishedOnly = false) =>
  useQuery({
    queryKey: ["blog-posts", publishedOnly],
    queryFn: async () => {
      let q = supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (publishedOnly) q = q.eq("published", true);
      const { data, error } = await q;
      if (error) throw error;
      return data;
    },
  });

export const useCreateBlogPost = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (post: { title: string; slug?: string; content?: string; excerpt?: string; image_url?: string; published?: boolean; author_id?: string }) => {
      const { data, error } = await supabase.from("blog_posts").insert(post).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      toast({ title: "Blog post created" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useUpdateBlogPost = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; title?: string; slug?: string; content?: string; excerpt?: string; image_url?: string; published?: boolean; author_id?: string }) => {
      const { data, error } = await supabase.from("blog_posts").update(updates).eq("id", id).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      toast({ title: "Blog post updated" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

export const useDeleteBlogPost = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      toast({ title: "Blog post deleted" });
    },
    onError: (e: any) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });
};

// ─── DASHBOARD STATS ───
export const useAdminStats = () =>
  useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [patients, appointments, prescriptions, orders, products] = await Promise.all([
        supabase.from("patients").select("id", { count: "exact", head: true }),
        supabase.from("appointments").select("id", { count: "exact", head: true }),
        supabase.from("prescriptions").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
      ]);
      return {
        patients: patients.count ?? 0,
        appointments: appointments.count ?? 0,
        prescriptions: prescriptions.count ?? 0,
        orders: orders.count ?? 0,
        products: products.count ?? 0,
      };
    },
  });
