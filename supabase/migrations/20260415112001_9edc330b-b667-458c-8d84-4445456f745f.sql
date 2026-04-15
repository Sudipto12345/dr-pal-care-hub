
-- Medicines lookup table
CREATE TABLE public.medicines (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  default_potency TEXT,
  default_dose TEXT,
  default_frequency TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX medicines_name_unique ON public.medicines (LOWER(name));
ALTER TABLE public.medicines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage medicines" ON public.medicines FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Authenticated can view medicines" ON public.medicines FOR SELECT TO authenticated USING (true);

-- Diagnoses lookup table
CREATE TABLE public.diagnoses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX diagnoses_name_unique ON public.diagnoses (LOWER(name));
ALTER TABLE public.diagnoses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage diagnoses" ON public.diagnoses FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Authenticated can view diagnoses" ON public.diagnoses FOR SELECT TO authenticated USING (true);

-- Chief complaints lookup table
CREATE TABLE public.chief_complaints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX chief_complaints_name_unique ON public.chief_complaints (LOWER(name));
ALTER TABLE public.chief_complaints ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins can manage complaints" ON public.chief_complaints FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Authenticated can view complaints" ON public.chief_complaints FOR SELECT TO authenticated USING (true);
