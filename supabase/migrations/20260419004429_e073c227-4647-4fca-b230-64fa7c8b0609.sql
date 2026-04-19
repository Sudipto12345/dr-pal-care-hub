
-- Add signup_source column to patients
ALTER TABLE public.patients
ADD COLUMN IF NOT EXISTS signup_source text;

-- Backfill existing patients
UPDATE public.patients
SET signup_source = CASE
  WHEN user_id IS NULL THEN 'admin'
  WHEN email LIKE '%@patient.local' THEN 'patient_id'
  WHEN EXISTS (
    SELECT 1 FROM auth.identities i
    WHERE i.user_id = patients.user_id AND i.provider = 'google'
  ) THEN 'google'
  ELSE 'email'
END
WHERE signup_source IS NULL;

-- Update the new user trigger to set signup_source on auto-created patients
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _name text;
  _email text;
  _code text;
  _source text;
BEGIN
  _name := COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', NEW.email);
  _email := NEW.email;

  -- Determine source from app_metadata.provider (set by Supabase auth)
  _source := CASE
    WHEN NEW.raw_app_meta_data->>'provider' = 'google' THEN 'google'
    WHEN _email LIKE '%@patient.local' THEN 'patient_id'
    ELSE 'email'
  END;

  -- Profile
  INSERT INTO public.profiles (user_id, name, avatar_url)
  VALUES (NEW.id, _name, NEW.raw_user_meta_data->>'avatar_url')
  ON CONFLICT DO NOTHING;

  -- Role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT DO NOTHING;

  -- Patient record
  IF NOT EXISTS (SELECT 1 FROM public.patients WHERE user_id = NEW.id) THEN
    IF _email IS NULL OR _email NOT LIKE '%@patient.local' THEN
      _code := public.generate_patient_code();
      INSERT INTO public.patients (user_id, name, email, patient_code, signup_source)
      VALUES (NEW.id, _name, _email, _code, _source);
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;
