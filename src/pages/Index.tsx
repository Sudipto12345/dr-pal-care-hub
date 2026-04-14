import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Stethoscope, Pill, ShieldCheck, Star, ArrowRight, Calendar } from "lucide-react";

const services = [
  { icon: Stethoscope, title: "Consultation", desc: "Comprehensive evaluation and personalized treatment plans" },
  { icon: Pill, title: "Remedies", desc: "Natural homeopathic medicines for holistic healing" },
  { icon: Heart, title: "Chronic Care", desc: "Long-term management of chronic conditions" },
  { icon: ShieldCheck, title: "Preventive Care", desc: "Build immunity and prevent diseases naturally" },
];

const testimonials = [
  { name: "Priya Sharma", text: "Dr. Pal's treatment completely cured my chronic allergies. Highly recommend!", rating: 5 },
  { name: "Rajesh Kumar", text: "After years of conventional medicine, homeopathy finally gave me relief.", rating: 5 },
  { name: "Anita Desai", text: "The holistic approach and caring nature of Dr. Pal is truly commendable.", rating: 5 },
];

const Index = () => (
  <div>
    {/* Hero */}
    <section className="relative overflow-hidden gradient-hero text-primary-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
      <div className="container mx-auto px-4 py-20 md:py-28 relative">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
            Now accepting new patients
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight mb-6">
            Natural Healing,<br />
            <span className="text-primary-foreground/80">Lasting Wellness</span>
          </h1>
          <p className="text-lg text-primary-foreground/70 mb-8 max-w-lg">
            Experience the power of homeopathy with Dr. Amit Kumar Pal. Gentle, safe, and effective treatments for the whole family.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl font-semibold" asChild>
              <Link to="/book-appointment"><Calendar className="w-4 h-4 mr-2" /> Book Appointment</Link>
            </Button>
            <Button size="lg" variant="hero-outline" className="border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/services">Our Services <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Services */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">Our Services</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Comprehensive homeopathic care tailored to your unique needs</p>
        </div>
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

    {/* Why Homeopathy */}
    <section className="py-16 md:py-24 bg-accent/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Homeopathy?</h2>
            <p className="text-muted-foreground mb-6">
              Homeopathy treats the whole person, not just the symptoms. It&apos;s a natural system of medicine that stimulates your body&apos;s own healing power.
            </p>
            <ul className="space-y-3">
              {["No side effects", "Safe for all ages", "Treats root cause", "Affordable & accessible"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="w-full aspect-square rounded-3xl gradient-subtle border border-border flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-heading font-bold text-gradient">20+</div>
                <p className="text-muted-foreground mt-2">Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">Patient Testimonials</h2>
          <p className="text-muted-foreground">Hear from those who have experienced healing</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-border rounded-2xl">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mb-4">&ldquo;{t.text}&rdquo;</p>
                <p className="font-heading font-semibold text-foreground">{t.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="gradient-primary rounded-3xl p-8 md:p-14 text-center text-primary-foreground">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Healing Journey?</h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">Book a consultation today and discover the natural path to wellness.</p>
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl font-semibold" asChild>
            <Link to="/book-appointment"><Calendar className="w-4 h-4 mr-2" /> Book Now</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default Index;
