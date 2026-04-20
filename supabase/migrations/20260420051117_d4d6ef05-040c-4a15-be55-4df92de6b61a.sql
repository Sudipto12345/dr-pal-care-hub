CREATE TABLE public.site_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key text NOT NULL UNIQUE,
  title text,
  content text,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view site settings"
ON public.site_settings FOR SELECT
USING (true);

CREATE POLICY "Admins can manage site settings"
ON public.site_settings FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_site_settings_updated_at
BEFORE UPDATE ON public.site_settings
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.site_settings (key, title, content) VALUES
('privacy_policy', 'Privacy Policy', E'# Privacy Policy\n\nWe respect your privacy. This page explains how we collect, use, and protect your personal information when you use Dr. Amit Kumar Pal''s clinic services and website.\n\n## Information We Collect\n- Personal details (name, age, gender, contact info)\n- Medical history and consultation records\n- Appointment and prescription data\n- Order and payment information\n\n## How We Use Your Information\n- To provide medical consultations and treatments\n- To manage appointments and prescriptions\n- To process orders and deliveries\n- To improve our services\n\n## Data Protection\nAll patient data is stored securely and accessed only by authorized clinical staff. We never sell or share your data with third parties for marketing.\n\n## Your Rights\nYou may request access, correction, or deletion of your personal data at any time by contacting the clinic.\n\n## Contact\nFor privacy concerns, please contact us through the contact page.'),
('terms_of_service', 'Terms of Service', E'# Terms of Service\n\nBy using this website and the services of Dr. Amit Kumar Pal''s clinic, you agree to the following terms.\n\n## Medical Disclaimer\nInformation on this website is for general purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.\n\n## Appointments\n- Appointments must be booked in advance\n- Cancellations should be made at least 4 hours before the scheduled time\n- Repeated no-shows may result in restricted booking access\n\n## Online Orders\n- Product prices and availability are subject to change\n- Delivery times are estimates and may vary\n- Refunds are processed per our refund policy\n\n## User Accounts\n- You are responsible for keeping your login credentials secure\n- Misuse of the platform may lead to account suspension\n\n## Limitation of Liability\nThe clinic is not liable for any indirect or consequential damages arising from use of this website.\n\n## Changes to Terms\nWe may update these terms at any time. Continued use of the site means acceptance of the updated terms.');