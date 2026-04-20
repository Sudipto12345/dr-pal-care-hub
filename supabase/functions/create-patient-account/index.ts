import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { z } from "https://esm.sh/zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const bodySchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120, "Name is too long"),
  phone: z.string().trim().min(6, "Phone is too short").max(20, "Phone is too long").optional().nullable(),
  age: z.number().int().min(0, "Age must be at least 0").max(120, "Age must be 120 or less").optional().nullable(),
  gender: z.string().trim().max(30, "Gender is too long").optional().nullable(),
  address: z.string().trim().max(500, "Address is too long").optional().nullable(),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long").optional().nullable().or(z.literal("")),
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
      const firstMessage = Object.values(parsed.error.flatten().fieldErrors).flat().find(Boolean) ?? "Invalid request data";
      return new Response(JSON.stringify({ error: firstMessage }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const name = parsed.data.name;
    const phone = parsed.data.phone?.trim() || null;
    const age = parsed.data.age ?? null;
    const gender = parsed.data.gender?.trim() || null;
    const address = parsed.data.address?.trim() || null;
    const email = parsed.data.email?.trim().toLowerCase() || null;

    // Duplicate phone check
    if (phone) {
      const { data: phoneDup } = await admin.from("patients").select("id").eq("phone", phone).maybeSingle();
      if (phoneDup) {
        return new Response(JSON.stringify({ error: "A patient with this phone number already exists. Try a new one." }), { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    // Duplicate email check in patients table only.
    // Admin-created patient logins use generated patient.local emails, so auth email conflicts here are not relevant.
    if (email) {
      const { data: emailDup } = await admin.from("patients").select("id").eq("email", email).maybeSingle();
      if (emailDup) {
        return new Response(JSON.stringify({ error: "A patient with this email already exists. Try a new one." }), { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    const findAuthUserByEmail = async (targetEmail: string) => {
      let page = 1;
      const perPage = 200;

      while (true) {
        const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
        if (error) throw new Error(error.message);

        const match = data.users.find((u) => u.email?.toLowerCase() === targetEmail.toLowerCase());
        if (match) return match;
        if (data.users.length < perPage) return null;
        page += 1;
      }
    };

    // Generate a unique 5-digit patient code and internal login email
    let patientCode: string | null = null;
    let loginEmail: string | null = null;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const { data: codeData, error: codeErr } = await admin.rpc("generate_patient_code");
      if (codeErr || !codeData) throw new Error(codeErr?.message ?? "Failed to generate code");

      patientCode = codeData;
      loginEmail = `${patientCode}@patient.local`;

      const authDup = await findAuthUserByEmail(loginEmail);
      if (!authDup) break;

      const { data: patientByCode } = await admin.from("patients").select("id").eq("patient_code", patientCode).maybeSingle();
      if (!patientByCode) {
        await admin.auth.admin.deleteUser(authDup.id);
        break;
      }

      await admin.from("patients").update({ patient_code: null }).eq("id", patientByCode.id);
    }

    if (!patientCode || !loginEmail) {
      throw new Error("Failed to prepare patient account credentials");
    }

    // Generate 6-digit numeric passcode
    const passcode = String(Math.floor(100000 + Math.random() * 900000));

    // Create auth user (auto-confirmed)
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email: loginEmail,
      password: passcode,
      email_confirm: true,
      user_metadata: { name, patient_code: patientCode },
    });
    if (createErr) {
      const msg = (createErr.message || "").toLowerCase();
      if (msg.includes("already") && msg.includes("registered")) {
        return new Response(
          JSON.stringify({ error: "Failed to generate a unique patient login. Please try again." }),
          { status: 409, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      throw new Error(createErr.message);
    }

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
