
-- Add patient_code and passcode columns
ALTER TABLE public.patients
  ADD COLUMN IF NOT EXISTS patient_code TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS passcode TEXT;

-- Function to generate next available 5-digit patient code
CREATE OR REPLACE FUNCTION public.generate_patient_code()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  next_num INTEGER;
  new_code TEXT;
BEGIN
  SELECT COALESCE(MAX(patient_code::INTEGER), 10000) + 1
  INTO next_num
  FROM public.patients
  WHERE patient_code ~ '^\d{5}$';

  new_code := LPAD(next_num::TEXT, 5, '0');
  RETURN new_code;
END;
$$;

-- Public function to look up patient login email by 5-digit code
-- Returns the synthetic auth email so the client can sign in via Supabase Auth
CREATE OR REPLACE FUNCTION public.get_patient_login_email(_code TEXT)
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT _code || '@patient.local'
  WHERE EXISTS (
    SELECT 1 FROM public.patients WHERE patient_code = _code
  );
$$;

GRANT EXECUTE ON FUNCTION public.get_patient_login_email(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.generate_patient_code() TO authenticated;
