-- Create patient_reports table
CREATE TABLE public.patient_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid NOT NULL REFERENCES public.patients(id) ON DELETE CASCADE,
  title text,
  file_url text NOT NULL,
  file_name text NOT NULL,
  file_type text,
  file_size integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.patient_reports ENABLE ROW LEVEL SECURITY;

-- Admins can manage all reports
CREATE POLICY "Admins can manage reports" ON public.patient_reports
  FOR ALL TO public
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Patients can view own reports
CREATE POLICY "Patients view own reports" ON public.patient_reports
  FOR SELECT TO public
  USING (EXISTS (
    SELECT 1 FROM patients WHERE patients.id = patient_reports.patient_id AND patients.user_id = auth.uid()
  ));

-- Patients can insert own reports
CREATE POLICY "Patients insert own reports" ON public.patient_reports
  FOR INSERT TO public
  WITH CHECK (EXISTS (
    SELECT 1 FROM patients WHERE patients.id = patient_reports.patient_id AND patients.user_id = auth.uid()
  ));

-- Patients can delete own reports
CREATE POLICY "Patients delete own reports" ON public.patient_reports
  FOR DELETE TO public
  USING (EXISTS (
    SELECT 1 FROM patients WHERE patients.id = patient_reports.patient_id AND patients.user_id = auth.uid()
  ));

-- Create reports storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('reports', 'reports', true);

-- Storage RLS: anyone can read reports
CREATE POLICY "Public read reports" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'reports');

-- Authenticated users can upload reports
CREATE POLICY "Auth users upload reports" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'reports');

-- Users can delete own reports
CREATE POLICY "Auth users delete own reports" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'reports');

-- Add updated_at trigger
CREATE TRIGGER update_patient_reports_updated_at
  BEFORE UPDATE ON public.patient_reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.patient_reports;