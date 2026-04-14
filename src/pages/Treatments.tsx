import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Baby, Brain, Flower2, Bone, Eye, HeartPulse, Pill, Shield, Droplets } from "lucide-react";

const treatments = [
  { icon: Stethoscope, title: "Constitutional Treatment", desc: "Deep-acting remedies selected based on your unique mental, emotional, and physical characteristics for long-term healing." },
  { icon: HeartPulse, title: "Chronic Disease Management", desc: "Comprehensive management of diabetes, hypertension, thyroid disorders, and autoimmune conditions." },
  { icon: Flower2, title: "Dermatology", desc: "Effective treatment for eczema, psoriasis, acne, vitiligo, urticaria, and fungal infections." },
  { icon: Brain, title: "Mental & Emotional Health", desc: "Natural remedies for anxiety, depression, OCD, ADHD, insomnia, and behavioral issues." },
  { icon: Baby, title: "Pediatric Homeopathy", desc: "Gentle treatments for children — recurrent infections, tonsillitis, growth issues, and behavioral concerns." },
  { icon: Bone, title: "Musculoskeletal Care", desc: "Relief from arthritis, cervical spondylosis, sciatica, frozen shoulder, and sports injuries." },
  { icon: Eye, title: "Allergy & Respiratory", desc: "Long-term solutions for allergic rhinitis, sinusitis, asthma, and recurrent bronchitis." },
  { icon: Shield, title: "Autoimmune Disorders", desc: "Constitutional approach to rheumatoid arthritis, lupus, Hashimoto's, and inflammatory conditions." },
  { icon: Droplets, title: "Digestive Disorders", desc: "Treatment for IBS, acid reflux, ulcerative colitis, Crohn's disease, and liver conditions." },
  { icon: Pill, title: "Preventive & Wellness", desc: "Boost immunity, manage stress, improve vitality, and maintain optimal health with constitutional remedies." },
];

const Treatments = () => (
  <div>
    <section className="page-title-banner">
      <div className="container mx-auto px-4 text-center">
        <h1>Treatments</h1>
        <p>Specialized homeopathic treatments for a wide range of conditions</p>
      </div>
    </section>
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {treatments.map((t) => (
            <Card key={t.title} className="group border-border hover:shadow-card transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <t.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Treatments;
