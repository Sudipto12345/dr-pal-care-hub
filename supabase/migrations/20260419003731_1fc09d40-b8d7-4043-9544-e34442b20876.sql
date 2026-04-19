
-- Allow authenticated users to create their own patient record (auto-create on first Google sign-in)
CREATE POLICY "Users can insert own patient record"
ON public.patients
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Update the new user trigger to also auto-create a patients row with patient_code for any new auth user
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
BEGIN
  _name := COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', NEW.email);
  _email := NEW.email;

  -- Profile
  INSERT INTO public.profiles (user_id, name, avatar_url)
  VALUES (NEW.id, _name, NEW.raw_user_meta_data->>'avatar_url')
  ON CONFLICT DO NOTHING;

  -- Role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user')
  ON CONFLICT DO NOTHING;

  -- Patient record (skip if one already exists for this user, e.g. admin-created)
  IF NOT EXISTS (SELECT 1 FROM public.patients WHERE user_id = NEW.id) THEN
    -- Skip synthetic patient-code accounts (they already get a patient row from the edge function)
    IF _email IS NULL OR _email NOT LIKE '%@patient.local' THEN
      _code := public.generate_patient_code();
      INSERT INTO public.patients (user_id, name, email, patient_code)
      VALUES (NEW.id, _name, _email, _code);
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;

-- Ensure trigger exists on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
