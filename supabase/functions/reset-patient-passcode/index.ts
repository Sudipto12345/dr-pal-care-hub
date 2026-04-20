import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const bodySchema = z.object({
  patient_id: z.string().uuid("Invalid patient id"),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const ANON_KEY = Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? Deno.env.get("SUPABASE_ANON_KEY")!;

    const authHeader = req.headers.get("Authorization") ?? "";
    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    const { data: isAdmin } = await admin.rpc("has_role", { _user_id: userData.user.id, _role: "admin" });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Admin access required" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const parsed = bodySchema.safeParse(await req.json());
    if (!parsed.success) {
      const firstMessage = Object.values(parsed.error.flatten().fieldErrors).flat().find(Boolean) ?? "Invalid request";
      return new Response(JSON.stringify({ error: firstMessage }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const { patient_id } = parsed.data;

    const { data: patient, error: patientErr } = await admin
      .from("patients")
      .select("id, user_id, patient_code")
      .eq("id", patient_id)
      .maybeSingle();

    if (patientErr) throw new Error(patientErr.message);
    if (!patient) {
      return new Response(JSON.stringify({ error: "Patient not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    if (!patient.user_id) {
      return new Response(JSON.stringify({ error: "This patient has no login account to reset" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const newPasscode = String(Math.floor(100000 + Math.random() * 900000));

    const { error: updateAuthErr } = await admin.auth.admin.updateUserById(patient.user_id, {
      password: newPasscode,
    });
    if (updateAuthErr) throw new Error(updateAuthErr.message);

    const { error: updatePatientErr } = await admin
      .from("patients")
      .update({ passcode: newPasscode })
      .eq("id", patient.id);
    if (updatePatientErr) throw new Error(updatePatientErr.message);

    return new Response(
      JSON.stringify({
        patient_code: patient.patient_code,
        passcode: newPasscode,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e: any) {
    console.error("reset-patient-passcode error:", e);
    return new Response(JSON.stringify({ error: e.message ?? "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
