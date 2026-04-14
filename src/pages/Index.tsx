import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart, Stethoscope, Pill, ShieldCheck, Star, ArrowRight, Calendar, Leaf, Phone, MapPin,
  Quote, Award, GraduationCap, Globe, Building2, Droplets, TreePine, Sprout, Sun,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

import heroBanner from "@/assets/doctor-hero-banner.png";
import aboutDoctor from "@/assets/about-doctor.jpg";
import ctaBackground from "@/assets/cta-patient.jpg";
import featureConsultation from "@/assets/feature-consultation.jpg";
import featureMedicine from "@/assets/feature-medicine.jpg";
import featureOnline from "@/assets/feature-online.jpg";
import productsDisplay from "@/assets/products-display.jpg";
import blogHealthy from "@/assets/blog-healthy.jpg";
import blogNotes from "@/assets/blog-notes.jpg";
import blogNatural from "@/assets/blog-natural.jpg";
import clinicExterior from "@/assets/clinic-exterior.jpg";
import doctorProfile from "@/assets/doctor-profile.png";

/* SVG leaf decorations */
const FloatingLeaf = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} style={style}>
    <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5C5 13 8.5 10 12 10s7 3 8.7 7c.8-1.5 1.3-3.2 1.3-5 0-5.5-4.5-10-10-10z" fill="currentColor" opacity="0.15" />
  </svg>
);

const WaveDivider = ({ flip = false }: { flip?: boolean }) => (
  <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}>
    <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <path d="M0 30C240 60 480 0 720 30C960 60 1200 0 1440 30V60H0V30Z" fill="hsl(120 20% 98%)" />
    </svg>
  </div>
);

const Index = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: Leaf, title: t.highlights.holisticHealing, desc: t.highlights.holisticDesc },
    { icon: Heart, title: t.highlights.safeNatural, desc: t.highlights.safeDesc },
    { icon: Stethoscope, title: t.highlights.personalizedCare, desc: t.highlights.personalizedDesc },
    { icon: ShieldCheck, title: t.highlights.longTermWellness, desc: t.highlights.longTermDesc },
  ];

  const services = [
    { icon: Stethoscope, title: t.services.personalConsultation, desc: t.services.personalConsultationDesc, img: featureConsultation, color: "from-primary/20 to-primary/5" },
    { icon: Pill, title: t.services.medicinePreparation, desc: t.services.medicinePreparationDesc, img: featureMedicine, color: "from-secondary/20 to-secondary/5" },
    { icon: Globe, title: t.services.onlineConsultation, desc: t.services.onlineConsultationDesc, img: featureOnline, color: "from-info/20 to-info/5" },
  ];

  const testimonials = [
    { name: "Priya Sharma", location: "New Delhi", text: "Dr. Pal's treatment completely cured my chronic allergies after 3 months. I wish I had found homeopathy sooner.", rating: 5 },
    { name: "Rajesh Kumar", location: "Kolkata", text: "After years of conventional medicine, homeopathy finally gave me lasting relief from migraines.", rating: 5 },
    { name: "Anita Desai", location: "Mumbai", text: "The holistic approach and genuine caring nature of Dr. Pal is truly commendable. My whole family trusts him.", rating: 5 },
  ];

  const blogs = [
    { img: blogHealthy, title: "5 Daily Habits for Natural Immunity", date: "March 15, 2025", excerpt: "Simple lifestyle changes that boost your body's natural defenses." },
    { img: blogNotes, title: "Understanding Homeopathic Potency", date: "March 8, 2025", excerpt: "A guide to how potency works and why it matters for treatment." },
    { img: blogNatural, title: "Herbs That Heal: A Complete Guide", date: "Feb 28, 2025", excerpt: "Discover medicinal properties of common herbs used in homeopathy." },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img src={heroNatureBg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white/20 animate-float-particle"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${6 + i}s`,
            }}
          />
        ))}

        {/* Floating leaf SVGs */}
        <FloatingLeaf className="absolute top-20 left-10 w-16 h-16 text-white/10 animate-float-leaf" />
        <FloatingLeaf className="absolute bottom-32 right-16 w-12 h-12 text-white/8 animate-float-leaf" style={{ animationDelay: "2s" }} />

        <div className="container mx-auto px-4 relative z-10 text-center pt-16">
          <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 text-sm text-white/80 font-medium mb-8">
            <Leaf className="w-4 h-4 text-nature-400" />
            {t.hero.badge}
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.08] tracking-tight max-w-4xl mx-auto">
            {t.hero.title1}
            <br />
            <span className="bg-gradient-to-r from-nature-300 via-nature-400 to-mint-300 bg-clip-text text-transparent">
              {t.hero.title2}
            </span>
          </h1>

          <p className="text-white/60 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button size="lg" className="gradient-primary text-primary-foreground rounded-2xl font-semibold shadow-glow hover-scale px-8 text-base" asChild>
              <Link to="/book-appointment"><Calendar className="w-5 h-5 mr-2" /> {t.hero.bookBtn}</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-2xl border-white/25 text-white bg-white/10 hover:bg-white/20 hover:text-white backdrop-blur-sm text-base" asChild>
              <Link to="/about"><ArrowRight className="w-5 h-5 mr-2" /> Explore More</Link>
            </Button>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <WaveDivider />
        </div>
      </section>

      {/* ─── HIGHLIGHT STRIP ─── */}
      <section className="py-6 md:py-8 bg-background relative -mt-1">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {highlights.map((h) => (
              <div key={h.title} className="flex items-center gap-3 p-4 rounded-2xl glass border border-border/30 shadow-soft hover-lift">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0 shadow-glow">
                  <h.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm text-foreground leading-tight">{h.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT ME ─── */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <img src={aboutNatureBg} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.06]" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/80 via-background/90 to-background" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm mb-3">
              <Sprout className="w-4 h-4" /> {t.about.sectionTag || "About Me"}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {t.doctor.name}
            </h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-lg mx-auto">{t.doctor.title}</p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-14 items-start">
            {/* Photo column */}
            <div className="flex flex-col items-center lg:sticky lg:top-28">
              <div className="relative mb-6">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-elevated ring-4 ring-primary/10" style={{ transform: "rotate(-2deg)" }}>
                  <img src={doctorProfile} alt={t.doctor.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 -right-3 gradient-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" /> {t.doctor.goldMedalist}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 w-full max-w-xs mb-5">
                {[
                  { value: "10+", label: "Years Exp." },
                  { value: "5K+", label: "Patients" },
                  { value: "4.9", label: "Rating" },
                ].map((s) => (
                  <div key={s.label} className="text-center bg-card border border-border/40 rounded-xl py-3 px-2 shadow-soft hover-lift">
                    <p className="font-heading font-bold text-lg text-primary">{s.value}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-2 mb-5">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                  <Award className="w-3 h-3" /> {t.doctor.goldMedalist}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-info/10 text-info px-2.5 py-1 rounded-full">
                  <Globe className="w-3 h-3" /> {t.doctor.ahfMember}
                </span>
              </div>

              <div className="flex flex-col gap-2.5 w-full max-w-xs">
                <Button className="gradient-primary text-primary-foreground rounded-xl text-sm w-full shadow-glow hover-scale" asChild>
                  <Link to="/book-appointment"><Calendar className="w-4 h-4 mr-1.5" /> {t.doctor.bookConsultation}</Link>
                </Button>
                <Button variant="outline" className="rounded-xl text-sm border-border w-full" asChild>
                  <Link to="/about">{t.doctor.learnMore} <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-5">
              <div className="glass rounded-2xl p-6 shadow-soft border border-border/30">
                <p className="text-muted-foreground text-sm md:text-[15px] leading-[1.85]">{t.doctor.bio}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: GraduationCap, title: t.doctor.qualifications, items: [t.doctor.qual1, t.doctor.qual2, t.doctor.qual3], iconColor: "text-primary", bgColor: "bg-primary/10" },
                  { icon: Award, title: t.doctor.achievements, items: [t.doctor.ach1, t.doctor.ach2, t.doctor.ach3], iconColor: "text-warning", bgColor: "bg-warning/10" },
                  { icon: Building2, title: t.doctor.chambers, items: [t.doctor.chamber1, t.doctor.chamber2], iconColor: "text-info", bgColor: "bg-info/10" },
                  { icon: Stethoscope, title: t.doctor.experience, items: [t.doctor.experienceYears, t.doctor.consultationType], iconColor: "text-secondary", bgColor: "bg-secondary/10" },
                ].map((card) => (
                  <div key={card.title} className="glass rounded-2xl p-5 shadow-soft border border-border/30 hover-lift">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                        <card.icon className={`w-4 h-4 ${card.iconColor}`} />
                      </div>
                      <h4 className="font-heading font-semibold text-sm text-foreground">{card.title}</h4>
                    </div>
                    <ul className="space-y-1.5">
                      {card.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-20 md:py-28 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm mb-3">
              <TreePine className="w-4 h-4" /> {t.services.sectionTag}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">{t.services.sectionTitle}</h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">{t.services.sectionDesc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((s) => (
              <Card key={s.title} className="group overflow-hidden border-border/40 rounded-3xl hover-lift hover-glow bg-card shadow-soft">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={s.img} alt={s.title} loading="lazy" width={768} height={512} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-3 shadow-glow -mt-12 relative z-10">
                    <s.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRODUCTS ─── */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ background: "linear-gradient(180deg, hsl(140 25% 96%), hsl(120 20% 98%))" }}>
        {/* botanical pattern overlay */}
        <FloatingLeaf className="absolute top-10 right-20 w-24 h-24 text-primary/5 animate-float" />
        <FloatingLeaf className="absolute bottom-20 left-10 w-16 h-16 text-primary/5 animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm mb-3">
                <Droplets className="w-4 h-4" /> {t.shop.sectionTag}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{t.shop.sectionTitle}</h2>
              <p className="text-muted-foreground mb-7 text-[15px] leading-[1.75] max-w-md">{t.shop.sectionDesc}</p>
              <Button className="gradient-primary text-primary-foreground rounded-2xl hover-scale shadow-glow" asChild>
                <Link to="/shop">{t.shop.browseShop} <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-elevated">
              <img src={productsDisplay} alt="Homeopathic products" loading="lazy" width={768} height={512} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm mb-3">
              <Heart className="w-4 h-4" /> {t.testimonials.sectionTag}
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">{t.testimonials.sectionTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((tst) => (
              <Card key={tst.name} className="border-border/40 rounded-3xl hover-lift hover-glow bg-card shadow-soft">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Quote className="w-5 h-5 text-primary -scale-x-100" />
                  </div>
                  <p className="text-muted-foreground text-[15px] mb-5 leading-relaxed italic">"{tst.text}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-heading font-semibold text-foreground">{tst.name}</p>
                      <p className="text-xs text-muted-foreground">{tst.location}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: tst.rating }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-warning text-warning" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BLOG ─── */}
      <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, hsl(140 25% 96%), hsl(120 20% 98%))" }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm mb-3">
                <Sun className="w-4 h-4" /> {t.blog.sectionTag}
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">{t.blog.sectionTitle}</h2>
            </div>
            <Button variant="ghost" className="text-primary hover:bg-primary/5 transition-colors self-start sm:self-auto" asChild>
              <Link to="/blog">{t.blog.viewAll} <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {blogs.map((b) => (
              <Card key={b.title} className="group overflow-hidden border-border/40 rounded-3xl hover-lift hover-glow bg-card shadow-soft">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={b.img} alt={b.title} loading="lazy" width={768} height={512} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <CardContent className="p-5">
                  <p className="text-[11px] text-primary font-medium mb-2 uppercase tracking-wider">{b.date}</p>
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
          <div className="relative rounded-3xl overflow-hidden shadow-elevated">
            <img src={ctaNatureBg} alt="" loading="lazy" width={1920} height={768} className="w-full h-72 md:h-[22rem] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-14 max-w-lg">
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">{t.cta.title}</h2>
                <p className="text-white/80 mb-6 text-[15px]">{t.cta.subtitle}</p>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-2xl font-semibold shadow-lg hover-scale" asChild>
                  <Link to="/book-appointment"><Calendar className="w-5 h-5 mr-2" /> {t.cta.bookNow}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLINIC ─── */}
      <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, hsl(140 25% 96%), hsl(120 20% 98%))" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center">
            <div className="overflow-hidden rounded-3xl shadow-elevated">
              <img src={clinicExterior} alt="Clinic" loading="lazy" width={1280} height={512} className="w-full h-60 md:h-72 object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm mb-3">
                <MapPin className="w-4 h-4" /> {t.clinic.sectionTag}
              </span>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-5">{t.clinic.sectionTitle}</h2>
              <div className="space-y-4 text-muted-foreground text-[15px]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-medium text-foreground text-sm">Newlife Homeo Hall</p>
                    <p className="text-sm">{t.doctor.chamber1}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-medium text-foreground text-sm">Newlife Homeo Hall</p>
                    <p className="text-sm">{t.doctor.chamber2}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm mt-1.5">{t.doctor.consultationType}</p>
                </div>
              </div>
              <Button className="gradient-primary text-primary-foreground rounded-2xl mt-7 hover-scale shadow-glow" asChild>
                <Link to="/contact">{t.contact.pageTitle} <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
