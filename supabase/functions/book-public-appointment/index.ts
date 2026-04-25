import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const body = await req.json();
    const { name, phone, email, concern, date, time, type } = body || {};

    if (!name || !phone || !date || !time) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Find existing patient by phone or email
    let patientId: string | null = null;
    const { data: existing } = await admin
      .from("patients")
      .select("id")
      .or(`phone.eq.${phone}${email ? `,email.eq.${email}` : ""}`)
      .limit(1)
      .maybeSingle();

    if (existing?.id) {
      patientId = existing.id;
    } else {
      // Generate code
      const { data: codeData } = await admin.rpc("generate_patient_code");
      const { data: newPatient, error: pErr } = await admin
        .from("patients")
        .insert({
          name,
          phone,
          email: email || null,
          patient_code: codeData,
          signup_source: "website",
        })
        .select("id")
        .single();
      if (pErr) throw pErr;
      patientId = newPatient.id;
    }

    const notes = [type ? `Type: ${type}` : null, concern ? `Concern: ${concern}` : null]
      .filter(Boolean)
      .join("\n");

    const { data: appt, error: aErr } = await admin
      .from("appointments")
      .insert({
        patient_id: patientId,
        date,
        time_slot: time,
        status: "pending",
        notes: notes || null,
      })
      .select("id")
      .single();

    if (aErr) throw aErr;

    return new Response(JSON.stringify({ success: true, appointment_id: appt.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
