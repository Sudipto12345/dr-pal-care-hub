-- Drop FIRST so updates aren't blocked by the existing constraint
ALTER TABLE public.patients DROP CONSTRAINT IF EXISTS patients_gender_check;

UPDATE public.patients
   SET gender = CASE
     WHEN gender IS NULL OR btrim(gender) = '' THEN NULL
     WHEN lower(btrim(gender)) IN ('m', 'male') THEN 'Male'
     WHEN lower(btrim(gender)) IN ('f', 'female') THEN 'Female'
     ELSE 'Other'
   END;

ALTER TABLE public.patients
  ADD CONSTRAINT patients_gender_check
  CHECK (gender IS NULL OR gender IN ('Male', 'Female', 'Other'));