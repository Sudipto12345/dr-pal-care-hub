import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Stethoscope, Pill, ShieldCheck, Star, ArrowRight, Calendar, Leaf, Phone, MapPin, Quote, Award, GraduationCap, Globe, Building2 } from "lucide-react";

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
import doctorProfile from "@/assets/doctor-profile.png";

const features = [
  { img: featureConsultation, title: "Personal Consultation", desc: "One-on-one detailed case taking and personalized treatment plans tailored to your constitution.", rotate: "-0.5deg" },
  { img: featureMedicine, title: "Medicine Preparation", desc: "Carefully prepared homeopathic remedies sourced from trusted pharmacies across India.", rotate: "0.3deg" },
  { img: featureOnline, title: "Online Consultation", desc: "Get expert homeopathic advice from the comfort of your home — anywhere in the world.", rotate: "-0.2deg" },
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
  { name: "Priya Sharma", location: "New Delhi", text: "Dr. Pal's treatment completely cured my chronic allergies after 3 months. I wish I had found homeopathy sooner.", rating: 5 },
  { name: "Rajesh Kumar", location: "Kolkata", text: "After years of conventional medicine, homeopathy finally gave me lasting relief from migraines.", rating: 5 },
  { name: "Anita Desai", location: "Mumbai", text: "The holistic approach and genuine caring nature of Dr. Pal is truly commendable. My whole family trusts him.", rating: 5 },
];

const Index = () => (
  <div className="overflow-x-hidden">
    {/* ─── HERO ─── */}
    <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-end">
      {/* Background: user-provided doctor image */}
      <div className="absolute inset-0">
        <img
          src={doctorHero}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-top"
        />
        {/* Dark gradient overlay — heavier on left for text readability */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, hsl(152 22% 8% / 0.92) 0%, hsl(152 18% 10% / 0.75) 40%, hsl(152 18% 12% / 0.35) 70%, hsl(152 18% 12% / 0.15) 100%)" }} />
        {/* Bottom vignette */}
        <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: "linear-gradient(to top, hsl(152 20% 8% / 0.9), transparent)" }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-32 pb-14 md:pt-40 md:pb-20 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-3.5 py-1 text-[13px] text-white/55 font-medium mb-8 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Now accepting new patients
          </div>

          <h1 className="font-heading text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold leading-[1.04] text-white mb-5 tracking-tight">
            Natural Healing,<br />
            <span className="text-white/50">Lasting Wellness</span>
          </h1>

          <p className="text-white/40 text-base md:text-lg mb-10 max-w-[28rem] leading-relaxed">
            Personalized, root-cause based homeopathic treatment by Dr. Amit Kumar Pal — gentle, safe, and effective care for your whole family.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl font-semibold shadow-elevated transition-all duration-300 hover:-translate-y-0.5 px-7" asChild>
              <Link to="/book-appointment"><Calendar className="w-4 h-4 mr-2" /> Book Appointment</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm" asChild>
              <Link to="/contact"><Phone className="w-4 h-4 mr-2" /> WhatsApp Consultation</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom highlights bar — sits inside dark hero */}
      <div className="relative z-10 border-t border-white/8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {highlights.map((h, i) => (
              <div key={h.title} className={`flex items-center gap-3 py-5 px-4 ${i > 0 ? "border-l border-white/8" : ""}`}>
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0" style={{ borderRadius: "8px 10px 8px 12px" }}>
                  <h.icon className="w-4 h-4 text-white/70" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm text-white/90 leading-tight">{h.title}</p>
                  <p className="text-[11px] text-white/40 mt-0.5">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* ─── DOCTOR PROFILE CARD ─── */}
    <section className="py-16 md:py-24" style={{ background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(100 12% 97%) 100%)" }}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-border/40 rounded-2xl overflow-hidden shadow-card">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-[280px_1fr]">
                {/* Photo side */}
                <div className="bg-accent/40 flex flex-col items-center justify-center p-8 md:p-6 text-center border-b md:border-b-0 md:border-r border-border/30">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden shadow-soft mb-4 ring-2 ring-secondary/20" style={{ transform: "rotate(-1deg)" }}>
                    <img src={doctorProfile} alt="Dr. Amit Kumar Pal" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-foreground">Dr. Amit Kumar Pal</h3>
                  <p className="text-xs text-secondary font-medium mt-1">Homeopathic Consultant</p>
                  <p className="text-xs text-muted-foreground">Wellness Specialist</p>
                  <div className="flex items-center gap-3 mt-4">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                      <Award className="w-3 h-3" /> Gold Medalist
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">
                      <Globe className="w-3 h-3" /> AHF Member
                    </span>
                  </div>
                </div>

                {/* Info side */}
                <div className="p-6 md:p-8 space-y-5">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Providing safe, natural, and effective homeopathic treatment for chronic and lifestyle diseases with a personalized, root-cause based approach.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-heading font-semibold text-foreground text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <GraduationCap className="w-3.5 h-3.5 text-secondary" /> Qualifications
                      </p>
                      <ul className="space-y-1 text-muted-foreground text-xs">
                        <li>DHMS (BHB), Dhaka</li>
                        <li>MA in English</li>
                        <li>BS in Health Science, U.S.A.</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-foreground text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-secondary" /> Achievements
                      </p>
                      <ul className="space-y-1 text-muted-foreground text-xs">
                        <li>Gold Medalist (India)</li>
                        <li>Member, AHF — U.S.A.</li>
                        <li>Advanced Homeopathy Specialist</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-heading font-semibold text-foreground text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-secondary" /> Chambers
                      </p>
                      <ul className="space-y-1 text-muted-foreground text-xs">
                        <li>Newlife Homeo Hall, Mirpur 11, Dhaka</li>
                        <li>Newlife Homeo Hall, Bagerhat</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-foreground text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5 text-secondary" /> Experience
                      </p>
                      <p className="text-muted-foreground text-xs">5+ Years of Clinical Practice</p>
                      <p className="text-muted-foreground text-xs mt-1">Online & Offline Consultation</p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button className="gradient-primary text-primary-foreground rounded-xl text-sm" asChild>
                      <Link to="/book-appointment"><Calendar className="w-4 h-4 mr-1.5" /> Book Consultation</Link>
                    </Button>
                    <Button variant="outline" className="rounded-xl text-sm border-border" asChild>
                      <Link to="/about">Learn More <ArrowRight className="w-4 h-4 ml-1" /></Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>

    {/* ─── FEATURES ─── */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-handwritten text-xl text-secondary mb-2">What we offer</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Our <span className="underline-hand">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">
            Comprehensive homeopathic care tailored to your unique needs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-7 lg:gap-9">
          {features.map((f) => (
            <Card
              key={f.title}
              className="group overflow-hidden border-border/60 rounded-2xl hover-lift bg-card"
              style={{ transform: `rotate(${f.rotate})` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={f.img}
                  alt={f.title}
                  loading="lazy"
                  width={768}
                  height={512}
                  className="w-full h-full object-cover img-organic group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
              </div>
              <CardContent className="p-5 md:p-6">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* ─── Soft divider ─── */}
    <div className="container mx-auto px-4">
      <div className="divider-leaf text-secondary">
        <Leaf className="w-4 h-4 opacity-40" />
      </div>
    </div>

    {/* ─── ABOUT DOCTOR ─── */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[0.85fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="relative">
            <div style={{ transform: "rotate(-1deg)" }}>
              <img
                src={aboutDoctor}
                alt="Dr. Amit Kumar Pal in clinic"
                loading="lazy"
                width={640}
                height={800}
                className="rounded-2xl shadow-card object-cover w-full max-w-[380px] mx-auto img-organic"
              />
            </div>
            {/* Handwritten note */}
            <div
              className="absolute -bottom-6 right-0 md:right-4 bg-card border border-border/50 rounded-xl px-4 py-2.5 shadow-soft"
              style={{ transform: "rotate(2deg)" }}
            >
              <p className="font-handwritten text-lg text-secondary">"Healing with heart" 🌿</p>
            </div>
          </div>

          <div>
            <p className="font-handwritten text-xl text-secondary mb-2">Get to know</p>
            <h2 className="font-heading text-3xl md:text-[2.5rem] font-bold text-foreground mb-3 leading-tight">
              About Dr. Amit Kumar Pal
            </h2>
            <p className="text-secondary/80 font-medium text-sm mb-4">DHMS (BHB) • BS in Health Science (USA) • Gold Medalist (India)</p>
            <p className="text-muted-foreground mb-6 text-[15px] leading-[1.75]">
              Dr. Amit Kumar Pal is a highly qualified homeopathic physician and wellness specialist with advanced training from India and the United States. His root-cause based, individualized approach has helped hundreds of patients overcome chronic and lifestyle diseases safely and naturally.
            </p>
            <ul className="space-y-3.5 mb-8">
              {["No side effects — ever", "Safe for all ages, from infants to elderly", "Treats the root cause, not symptoms", "Affordable & accessible healthcare"].map((item, i) => (
                <li key={item} className="flex items-start gap-3 text-foreground text-[15px]">
                  <div className="w-5 h-5 rounded-md gradient-primary flex items-center justify-center flex-shrink-0 mt-0.5" style={{ borderRadius: `${6 + i}px` }}>
                    <ShieldCheck className="w-3 h-3 text-primary-foreground" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <Button className="gradient-primary text-primary-foreground rounded-xl hover:shadow-card transition-all duration-300 hover:-translate-y-0.5" asChild>
              <Link to="/about">Learn More <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* ─── PRODUCTS ─── */}
    <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, hsl(100 12% 97%), hsl(90 10% 94%) 100%)" }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div>
            <p className="font-handwritten text-xl text-secondary mb-2">Shop natural</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
              Premium Homeopathic<br /> Products
            </h2>
            <p className="text-muted-foreground mb-7 text-[15px] leading-[1.75] max-w-md">
              We source the highest quality homeopathic medicines and natural remedies. Each product is carefully selected for purity, potency, and effectiveness.
            </p>
            <Button variant="outline" className="rounded-xl border-border text-foreground hover:bg-accent/60 transition-all duration-300" asChild>
              <Link to="/shop">Browse Shop <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="overflow-hidden rounded-2xl shadow-card" style={{ transform: "rotate(0.5deg)" }}>
            <img
              src={productsDisplay}
              alt="Homeopathic products"
              loading="lazy"
              width={768}
              height={512}
              className="w-full h-full object-cover img-organic hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          </div>
        </div>
      </div>
    </section>

    {/* ─── TESTIMONIALS ─── */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-handwritten text-xl text-secondary mb-2">Real stories</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Patient <span className="underline-hand">Testimonials</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">Hear from those who have experienced healing</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <Card
              key={t.name}
              className="border-border/50 rounded-2xl hover-lift bg-card"
              style={{ transform: `rotate(${i === 0 ? "-0.4" : i === 1 ? "0.3" : "-0.2"}deg)` }}
            >
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-secondary/20 mb-3 -scale-x-100" />
                <p className="text-muted-foreground text-[15px] mb-5 leading-relaxed italic">{t.text}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-heading font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.location}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-secondary/70 text-secondary/70" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* ─── Soft divider ─── */}
    <div className="container mx-auto px-4">
      <div className="divider-leaf text-secondary">
        <Leaf className="w-4 h-4 opacity-40" />
      </div>
    </div>

    {/* ─── BLOG ─── */}
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-14">
          <div>
            <p className="font-handwritten text-xl text-secondary mb-2">From our journal</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Latest Articles</h2>
            <p className="text-muted-foreground text-sm md:text-base">Health tips and insights from Dr. Pal</p>
          </div>
          <Button variant="ghost" className="text-secondary hidden md:flex hover:bg-secondary/5 transition-colors" asChild>
            <Link to="/blog">View All <ArrowRight className="w-4 h-4 ml-1" /></Link>
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-7 lg:gap-9">
          {blogs.map((b, i) => (
            <Card
              key={b.title}
              className="group overflow-hidden border-border/50 rounded-2xl hover-lift bg-card"
              style={{ transform: `rotate(${i === 0 ? "0.3" : i === 1 ? "-0.4" : "0.2"}deg)` }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={b.img}
                  alt={b.title}
                  loading="lazy"
                  width={768}
                  height={512}
                  className="w-full h-full object-cover img-organic group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                />
              </div>
              <CardContent className="p-5">
                <p className="text-[11px] text-muted-foreground mb-2 uppercase tracking-wider">{b.date}</p>
                <h3 className="font-heading font-semibold text-foreground mb-2 leading-snug">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.excerpt}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>

    {/* ─── CTA ─── */}
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden shadow-elevated" style={{ transform: "rotate(-0.3deg)" }}>
          <img
            src={ctaPatient}
            alt="Happy patient with doctor"
            loading="lazy"
            width={1280}
            height={540}
            className="w-full h-72 md:h-[22rem] object-cover img-organic"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, hsl(152 38% 24% / 0.92) 0%, hsl(152 38% 24% / 0.6) 50%, transparent 100%)" }} />
          <div className="absolute inset-0 flex items-center">
            <div className="px-8 md:px-12 max-w-lg">
              <p className="font-handwritten text-xl text-primary-foreground/70 mb-2">Take the first step</p>
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4 leading-tight">
                Ready to Start Your Healing Journey?
              </h2>
              <p className="text-primary-foreground/70 mb-6 text-[15px]">
                Book a consultation and discover the natural path to wellness.
              </p>
              <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5" asChild>
                <Link to="/book-appointment"><Calendar className="w-4 h-4 mr-2" /> Book Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ─── CLINIC / MAP ─── */}
    <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, hsl(100 12% 97%), hsl(90 10% 94%) 100%)" }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center">
          <div className="overflow-hidden rounded-2xl shadow-card" style={{ transform: "rotate(-0.5deg)" }}>
            <img
              src={clinicExterior}
              alt="Pal Homeopathic Clinic exterior"
              loading="lazy"
              width={1280}
              height={512}
              className="w-full h-60 md:h-72 object-cover img-organic hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
          </div>
          <div>
            <p className="font-handwritten text-xl text-secondary mb-2">Come see us</p>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-5">Visit Our Chambers</h2>
            <div className="space-y-4 text-muted-foreground text-[15px]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm">Newlife Homeo Hall</p>
                  <p>Mirpur 11, Dhaka, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground text-sm">Newlife Homeo Hall</p>
                  <p>Bagerhat, Bangladesh</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                <p>Available for Online & Offline Consultation</p>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p>Mon – Sat: 10:00 AM – 8:00 PM</p>
                  <p className="text-muted-foreground/70">Sunday: By appointment only</p>
                </div>
              </div>
            </div>
            <Button className="gradient-primary text-primary-foreground rounded-xl mt-7 hover:shadow-card transition-all duration-300 hover:-translate-y-0.5" asChild>
              <Link to="/contact">Get Directions <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Index;
