import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Stethoscope, Pill, ShieldCheck, Star, ArrowRight, Calendar, Leaf, Phone, MapPin } from "lucide-react";

import doctorHero from "@/assets/doctor-hero.png";
import featureConsultation from "@/assets/feature-consultation.jpg";
import featureMedicine from "@/assets/feature-medicine.jpg";
import featureOnline from "@/assets/feature-online.jpg";
import aboutDoctor from "@/assets/about-doctor.jpg";
import productsDisplay from "@/assets/products-display.jpg";
import blogHealthy from "@/assets/blog-healthy.jpg";
import blogNotes from "@/assets/blog-notes.jpg";
import blogNatural from "@/assets/blog-natural.jpg";
import ctaPatient from "@/assets/cta-patient.jpg";
import clinicExterior from "@/assets/clinic-exterior.jpg";

const features = [
  { img: featureConsultation, title: "Personal Consultation", desc: "One-on-one detailed case taking and personalized treatment plans" },
  { img: featureMedicine, title: "Medicine Preparation", desc: "Carefully prepared homeopathic remedies from premium sources" },
  { img: featureOnline, title: "Online Consultation", desc: "Get expert homeopathic advice from the comfort of your home" },
];

const highlights = [
  { icon: Leaf, title: "Holistic Healing", desc: "Treating the root cause" },
  { icon: Heart, title: "Safe & Natural", desc: "No side effects" },
  { icon: Stethoscope, title: "Personalized Care", desc: "Tailored for you" },
  { icon: ShieldCheck, title: "Long-Term Wellness", desc: "Sustainable results" },
];

const blogs = [
  { img: blogHealthy, title: "5 Daily Habits for Natural Immunity", date: "March 15, 2025", excerpt: "Simple lifestyle changes that boost your body's natural defenses through holistic wellness." },
  { img: blogNotes, title: "Understanding Homeopathic Potency", date: "March 8, 2025", excerpt: "A guide to how potency works in homeopathy and why it matters for your treatment." },
  { img: blogNatural, title: "Herbs That Heal: A Complete Guide", date: "Feb 28, 2025", excerpt: "Discover the medicinal properties of common herbs used in homeopathic treatment." },
];

const testimonials = [
  { name: "Priya Sharma", text: "Dr. Pal's treatment completely cured my chronic allergies. Highly recommend!", rating: 5 },
  { name: "Rajesh Kumar", text: "After years of conventional medicine, homeopathy finally gave me relief from migraines.", rating: 5 },
  { name: "Anita Desai", text: "The holistic approach and caring nature of Dr. Pal is truly commendable.", rating: 5 },
];

const Index = () => (
  <div>
    {/* ─── HERO ─── */}
    <section className="relative overflow-hidden bg-gradient-to-br from-accent via-background to-accent/60">
      {/* Soft blurred background circles */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute -bottom-40 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left – Text */}
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 bg-secondary/10 rounded-full px-4 py-1.5 text-sm text-secondary font-medium mb-5">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Now accepting new patients
            </div>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-4">
              Dr. Amit Kumar Pal
            </h1>
            <p className="font-heading text-xl md:text-2xl font-semibold text-secondary mb-4">
              Advanced Homeopathic &amp; Wellness Care
            </p>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Personalized, root-cause based homeopathic treatment for long-term healing. Gentle, safe, and effective care for the whole family.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="gradient-primary text-primary-foreground rounded-2xl font-semibold shadow-elevated hover:opacity-90 transition-opacity" asChild>
                <Link to="/book-appointment"><Calendar className="w-4 h-4 mr-2" /> Book Appointment</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl border-secondary/40 text-secondary hover:bg-secondary/5" asChild>
                <Link to="/contact"><Phone className="w-4 h-4 mr-2" /> WhatsApp Consultation</Link>
              </Button>
            </div>
          </div>

          {/* Right – Doctor Image */}
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <img
                src={doctorHero}
                alt="Dr. Amit Kumar Pal - Homeopathic Doctor"
                width={600}
                height={450}
                className="rounded-3xl shadow-elevated object-cover w-full max-w-lg"
              />
              {/* Glass overlay card */}
              <div className="absolute -bottom-4 -left-4 bg-card/80 backdrop-blur-lg border border-border rounded-2xl px-4 py-3 shadow-card">
                <p className="text-xs text-muted-foreground">Experience</p>
                <p className="font-heading font-bold text-2xl text-foreground">20+ Years</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom highlights bar */}
      <div className="border-t border-border bg-card/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {highlights.map((h) => (
              <div key={h.title} className="flex items-center gap-3 py-5 px-4">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                  <h.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm text-foreground">{h.title}</p>
                  <p className="text-xs text-muted-foreground">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ─── FEATURES ─── */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">Our Services</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Comprehensive homeopathic care tailored to your unique needs</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f) => (
            <Card key={f.title} className="group overflow-hidden border-border rounded-2xl hover:shadow-card transition-all duration-300">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={f.img}
                  alt={f.title}
                  loading="lazy"
                  width={768}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* ─── ABOUT DOCTOR ─── */}
    <section className="py-16 md:py-24 bg-accent/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src={aboutDoctor}
              alt="Dr. Amit Kumar Pal in clinic"
              loading="lazy"
              width={640}
              height={800}
              className="rounded-3xl shadow-elevated object-cover w-full max-w-md mx-auto group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">About Dr. Amit Kumar Pal</h2>
            <p className="text-secondary font-medium mb-3">BHMS, MD (Homeopathy) — 20+ Years of Experience</p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Dr. Amit Kumar Pal is a renowned homeopathic physician specializing in chronic disease management, skin disorders, and respiratory ailments.
              With a deep understanding of classical homeopathy, he provides individualized treatment that targets the root cause of illness.
            </p>
            <ul className="space-y-3 mb-8">
              {["No side effects", "Safe for all ages", "Treats root cause", "Affordable & accessible"].map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button className="gradient-primary text-primary-foreground rounded-2xl" asChild>
              <Link to="/about">Learn More <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* ─── PRODUCTS ─── */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">Premium Homeopathic Products</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              We source the highest quality homeopathic medicines and natural remedies. Each product is carefully selected for purity and effectiveness.
            </p>
            <Button variant="outline" className="rounded-2xl border-secondary/40 text-secondary" asChild>
              <Link to="/shop">Browse Shop <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-card">
            <img
              src={productsDisplay}
              alt="Homeopathic products"
              loading="lazy"
              width={768}
              height={512}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>

    {/* ─── TESTIMONIALS ─── */}
    <section className="py-16 md:py-24 bg-accent/50">
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

    {/* ─── BLOG ─── */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">Latest Articles</h2>
            <p className="text-muted-foreground">Health tips and insights from Dr. Pal</p>
          </div>
          <Button variant="ghost" className="text-secondary hidden md:flex" asChild>
            <Link to="/blog">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((b) => (
            <Card key={b.title} className="group overflow-hidden border-border rounded-2xl hover:shadow-card transition-all duration-300">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={b.img}
                  alt={b.title}
                  loading="lazy"
                  width={768}
                  height={512}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <CardContent className="p-5">
                <p className="text-xs text-muted-foreground mb-2">{b.date}</p>
                <h3 className="font-heading font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* ─── CTA ─── */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative rounded-3xl overflow-hidden shadow-elevated">
          <img
            src={ctaPatient}
            alt="Happy patient with doctor"
            loading="lazy"
            width={1280}
            height={540}
            className="w-full h-80 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 md:px-14 max-w-lg">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Start Your Healing Journey?
              </h2>
              <p className="text-primary-foreground/80 mb-6">
                Book a consultation today and discover the natural path to wellness.
              </p>
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-2xl font-semibold" asChild>
                <Link to="/book-appointment"><Calendar className="w-4 h-4 mr-2" /> Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ─── CLINIC / MAP ─── */}
    <section className="py-16 md:py-24 bg-accent/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="overflow-hidden rounded-3xl shadow-card">
            <img
              src={clinicExterior}
              alt="Pal Homeopathic Clinic exterior"
              loading="lazy"
              width={1280}
              height={512}
              className="w-full h-64 md:h-80 object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Visit Our Clinic</h2>
            <div className="space-y-4 text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <p>123 Healing Lane, New Delhi 110001, India</p>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <p>+91 98765 43210</p>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <p>Mon – Sat: 10:00 AM – 8:00 PM</p>
                  <p>Sunday: By appointment only</p>
                </div>
              </div>
            </div>
            <Button className="gradient-primary text-primary-foreground rounded-2xl mt-6" asChild>
              <Link to="/contact">Get Directions <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Index;
