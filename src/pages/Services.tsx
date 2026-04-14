import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Baby, Brain, Flower2, Bone, Eye, HeartPulse, Pill } from "lucide-react";

const services = [
  { icon: Stethoscope, title: "General Consultation", desc: "Complete health assessment and constitutional analysis for personalized treatment." },
  { icon: Baby, title: "Pediatric Care", desc: "Safe and gentle homeopathic treatments for infants and children." },
  { icon: Brain, title: "Mental Health", desc: "Natural remedies for anxiety, depression, stress, and emotional wellness." },
  { icon: Flower2, title: "Skin Disorders", desc: "Treatment for eczema, psoriasis, acne, and other dermatological conditions." },
  { icon: Bone, title: "Joint & Bone Care", desc: "Relief from arthritis, joint pain, and musculoskeletal conditions." },
  { icon: Eye, title: "Allergies", desc: "Long-term solutions for allergies, asthma, and respiratory issues." },
  { icon: HeartPulse, title: "Chronic Diseases", desc: "Managing diabetes, hypertension, thyroid, and other chronic conditions." },
  { icon: Pill, title: "Preventive Medicine", desc: "Boost immunity and prevent diseases with constitutional homeopathic treatment." },
];

const Services = () => (
  <div>
    <section className="page-title-banner">
      <div className="container mx-auto px-4 text-center">
        <h1>Our Services</h1>
        <p>Comprehensive homeopathic treatments for a healthier you</p>
      </div>
    </section>
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <Card key={s.title} className="group border-border hover:shadow-card transition-all duration-300 rounded-2xl">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <s.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Services;
