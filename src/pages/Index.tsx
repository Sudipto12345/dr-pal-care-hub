import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart, Stethoscope, Pill, ShieldCheck, Star, ArrowRight, Calendar, Leaf, Phone, MapPin,
  Quote, Award, GraduationCap, Globe, Building2, Droplets, TreePine, Sprout, Sun,
  MessageCircle, Play, Sparkles, Mail, Facebook,
} from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useYoutubeVideos } from "@/hooks/useYoutubeVideos";

import drAmitPal from "@/assets/dr-amit-pal.jpg";
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
const doctorProfile = drAmitPal;

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
  const { data: dbTestimonials } = useTestimonials(true);
  const { data: youtubeVideos } = useYoutubeVideos(true);

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

  const testimonials = dbTestimonials?.length ? dbTestimonials : [
    { name: "Priya Sharma", location: "New Delhi", text: "Dr. Pal's treatment completely cured my chronic allergies after 3 months.", rating: 5 },
    { name: "Rajesh Kumar", location: "Kolkata", text: "After years of conventional medicine, homeopathy finally gave me lasting relief from migraines.", rating: 5 },
    { name: "Anita Desai", location: "Mumbai", text: "The holistic approach and genuine caring nature of Dr. Pal is truly commendable.", rating: 5 },
  ];

  const blogs = [
    { img: blogHealthy, title: "5 Daily Habits for Natural Immunity", date: "March 15, 2025", excerpt: "Simple lifestyle changes that boost your body's natural defenses." },
    { img: blogNotes, title: "Understanding Homeopathic Potency", date: "March 8, 2025", excerpt: "A guide to how potency works and why it matters for treatment." },
    { img: blogNatural, title: "Herbs That Heal: A Complete Guide", date: "Feb 28, 2025", excerpt: "Discover medicinal properties of common herbs used in homeopathy." },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO (no big image, animated nature) ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-br from-accent/40 via-background to-primary/5">
        {/* Soft radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(var(--primary)/0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,hsl(var(--secondary)/0.10),transparent_50%)]" />

        {/* Decorative animated nature SVGs */}
        <FloatingLeaf className="absolute top-16 left-6 md:left-20 w-20 h-20 text-primary/25 animate-float-leaf" />
        <FloatingLeaf className="absolute top-1/3 right-8 w-14 h-14 text-secondary/30 animate-float-leaf" style={{ animationDelay: "1.2s" }} />
        <FloatingLeaf className="absolute bottom-24 left-1/4 w-16 h-16 text-primary/20 animate-float-leaf" style={{ animationDelay: "2.5s" }} />
        <FloatingLeaf className="absolute bottom-32 right-1/4 w-12 h-12 text-info/20 animate-float-leaf" style={{ animationDelay: "0.8s" }} />

        {/* Floating particles */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/40 animate-float-particle"
            style={{
              left: `${8 + i * 9}%`,
              top: `${15 + (i % 4) * 22}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + (i % 3) * 2}s`,
            }}
          />
        ))}

        {/* Animated sprout vector bottom-left */}
        <svg viewBox="0 0 200 200" className="absolute -bottom-6 -left-6 w-44 h-44 text-primary/15 animate-float-leaf" style={{ animationDelay: "1.8s" }} fill="currentColor">
          <path d="M100 180 C100 130, 60 110, 40 80 C70 90, 95 110, 100 140 C105 100, 130 80, 160 70 C140 100, 110 120, 100 170 Z" />
        </svg>

        <div className="container mx-auto px-4 relative z-10 w-full pt-24 pb-12 lg:py-0">
          <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center min-h-[calc(92vh-7rem)]">
            {/* Left: text */}
            <div className="text-left animate-fade-in">
              <div className="inline-flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 text-xs sm:text-sm text-primary font-medium mb-6 shadow-soft border border-primary/20">
                <Sparkles className="w-4 h-4" /> Natural & Holistic Healing
              </div>

              <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-foreground mb-3 leading-[1.1] tracking-tight">
                Dr. Amit Kumar Pal
              </h1>
              <h2 className="font-heading text-lg sm:text-xl md:text-2xl font-semibold text-primary mb-5">
                {t.doctor.fullTitle || "Homeopathic Consultant, Researcher & Wellness Specialist"}
              </h2>

              <p className="text-muted-foreground text-base md:text-lg mb-7 leading-relaxed max-w-xl">
                Personalized, root-cause based homeopathic treatment for long-term healing — gentle, safe, and effective for the whole family.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="gradient-primary text-primary-foreground rounded-2xl font-semibold shadow-glow hover-scale px-8 text-base h-14" asChild>
                  <Link to="/book-appointment"><Calendar className="w-5 h-5 mr-2" /> Book Appointment</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-2xl border-2 border-primary text-primary bg-card/70 hover:bg-primary/5 font-semibold text-base h-14 px-8 backdrop-blur-sm" asChild>
                  <a href="https://wa.me/8801911734726" target="_blank" rel="noopener"><MessageCircle className="w-5 h-5 mr-2" /> WhatsApp</a>
                </Button>
              </div>
            </div>

            {/* Right: Doctor portrait card */}
            <div className="relative animate-scale-in flex justify-center lg:justify-end">
              {/* Decorative ring */}
              <div className="absolute -inset-4 md:-inset-6 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-secondary/15 to-info/10 blur-2xl" />
              <div className="relative w-[260px] sm:w-[320px] md:w-[360px] lg:w-[400px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-elevated ring-4 ring-card">
                <img src={drAmitPal} alt="Dr. Amit Kumar Pal — Homeopathic Consultant" className="w-full h-full object-cover" />
                {/* Floating badge */}
                <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-md rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1.5 border border-primary/20">
                  <Award className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[11px] font-bold text-foreground">Gold Medalist</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-border/30">
                  <p className="text-xs text-muted-foreground">3rd Generation Homeopath</p>
                  <p className="text-sm font-bold text-foreground">Dhaka, Bangladesh</p>
                </div>
              </div>
              {/* Orbiting leaf */}
              <Leaf className="absolute -top-3 -left-3 w-8 h-8 text-primary/60 animate-float-leaf" />
              <Sprout className="absolute -bottom-3 -right-3 w-9 h-9 text-secondary/70 animate-float-leaf" style={{ animationDelay: "1.5s" }} />
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <WaveDivider />
        </div>
      </section>

      {/* ─── LEGACY / HEALING QUOTE ─── */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-background">
        <FloatingLeaf className="absolute top-10 left-10 w-24 h-24 text-primary/8 animate-float-leaf" />
        <FloatingLeaf className="absolute bottom-10 right-10 w-20 h-20 text-secondary/8 animate-float-leaf" style={{ animationDelay: "2s" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm mb-5">
              <Sparkles className="w-4 h-4" /> {t.legacy?.tag || "A Family Legacy"}
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-foreground mb-8 leading-[1.25] tracking-tight">
              <Quote className="inline w-6 h-6 md:w-8 md:h-8 text-primary/60 mr-2 -translate-y-2" />
              {t.legacy?.title || '"Healing Comes from the Divine, The doctor merely an instrument."'}
            </h2>
            <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-[1.85] max-w-3xl mx-auto">
              <p>{t.legacy?.para1}</p>
              <p>{t.legacy?.para2}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 max-w-2xl mx-auto mt-12">
              {[
                { v: t.legacy?.stat1Value || "3rd", l: t.legacy?.stat1Label || "Generation" },
                { v: t.legacy?.stat2Value || "50+", l: t.legacy?.stat2Label || "Years Family Practice" },
                { v: t.legacy?.stat3Value || "1000+", l: t.legacy?.stat3Label || "Successful Cases" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 border border-border/40 px-3 py-5 md:px-5 md:py-6 shadow-soft hover-lift">
                  <p className="font-heading font-extrabold text-2xl md:text-4xl text-primary leading-none">{s.v}</p>
                  <p className="text-[11px] md:text-sm text-muted-foreground mt-2 font-medium">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
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
        <img src={aboutDoctor} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover opacity-[0.08]" />
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

      {/* ─── YOUTUBE VIDEOS ─── */}
      {youtubeVideos && youtubeVideos.length > 0 && (
        <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, hsl(140 25% 96%), hsl(120 20% 98%))" }}>
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-1.5 text-primary font-medium text-sm mb-3">
                <Play className="w-4 h-4" /> আমাদের ভিডিও
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">YouTube Video Gallery</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">স্বাস্থ্য বিষয়ক তথ্যবহুল ভিডিও দেখুন আমাদের YouTube চ্যানেলে</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {youtubeVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden border-border/40 rounded-3xl hover-lift hover-glow bg-card shadow-soft group">
                  <div className="aspect-video relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.youtube_id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-heading font-semibold text-foreground text-sm leading-snug line-clamp-2">{video.title}</h3>
                    {video.description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{video.description}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" className="rounded-full" asChild>
                <a href="https://youtube.com/@dramitbd" target="_blank" rel="noopener">
                  <Play className="w-4 h-4 mr-1" /> Visit YouTube Channel <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}

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
            <img src={ctaBackground} alt="" loading="lazy" width={1920} height={768} className="w-full h-72 md:h-[22rem] object-cover" />
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
