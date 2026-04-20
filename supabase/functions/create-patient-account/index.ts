import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    const body = await req.json();
    const { name, phone, age, gender, address, email } = body;
    if (!name) {
      return new Response(JSON.stringify({ error: "Name is required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Duplicate phone check
    if (phone) {
      const { data: phoneDup } = await admin.from("patients").select("id").eq("phone", phone).maybeSingle();
      if (phoneDup) {
        return new Response(JSON.stringify({ error: "A patient with this phone number already exists. Try a new one." }), { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // Duplicate email check
    if (email) {
      const { data: emailDup } = await admin.from("patients").select("id").eq("email", email).maybeSingle();
      if (emailDup) {
        return new Response(JSON.stringify({ error: "A patient with this email already exists. Try a new one." }), { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // Generate 5-digit patient code
    const { data: codeData, error: codeErr } = await admin.rpc("generate_patient_code");
    if (codeErr || !codeData) throw new Error(codeErr?.message ?? "Failed to generate code");
    const patientCode: string = codeData;

    // Generate 6-digit numeric passcode
    const passcode = String(Math.floor(100000 + Math.random() * 900000));
    const loginEmail = `${patientCode}@patient.local`;

    // Create auth user (auto-confirmed)
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: loginEmail,
      password: passcode,
      email_confirm: true,
      user_metadata: { name, patient_code: patientCode },
    });
    if (createErr) throw new Error(createErr.message);

    const newUserId = created.user!.id;

    // Insert patient record linked to that auth user
    const { data: patient, error: patientErr } = await admin
      .from("patients")
      .insert({
        name,
        phone: phone || null,
        age: age ?? null,
        gender: gender || null,
        address: address || null,
        email: email || null,
        patient_code: patientCode,
        passcode,
        user_id: newUserId,
        signup_source: "admin",
      })
      .select()
      .single();

    if (patientErr) {
      // Rollback auth user if patient insert fails
      await admin.auth.admin.deleteUser(newUserId);
      throw new Error(patientErr.message);
    }

    return new Response(
      JSON.stringify({ patient, patient_code: patientCode, passcode }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e: any) {
    console.error("create-patient-account error:", e);
    return new Response(JSON.stringify({ error: e.message ?? "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
