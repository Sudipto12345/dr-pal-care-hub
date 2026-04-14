import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Stethoscope, Pill, ShieldCheck, Star, ArrowRight, Calendar, Leaf, Phone, MapPin, Quote, Award, GraduationCap, Globe, Building2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

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

const Index = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: Leaf, title: t.highlights.holisticHealing, desc: t.highlights.holisticDesc },
    { icon: Heart, title: t.highlights.safeNatural, desc: t.highlights.safeDesc },
    { icon: Stethoscope, title: t.highlights.personalizedCare, desc: t.highlights.personalizedDesc },
    { icon: ShieldCheck, title: t.highlights.longTermWellness, desc: t.highlights.longTermDesc },
  ];

  const features = [
    { img: featureConsultation, title: t.services.personalConsultation, desc: t.services.personalConsultationDesc, rotate: "-0.5deg" },
    { img: featureMedicine, title: t.services.medicinePreparation, desc: t.services.medicinePreparationDesc, rotate: "0.3deg" },
    { img: featureOnline, title: t.services.onlineConsultation, desc: t.services.onlineConsultationDesc, rotate: "-0.2deg" },
  ];

  const testimonials = [
    { name: "Priya Sharma", location: "New Delhi", text: "Dr. Pal's treatment completely cured my chronic allergies after 3 months. I wish I had found homeopathy sooner.", rating: 5 },
    { name: "Rajesh Kumar", location: "Kolkata", text: "After years of conventional medicine, homeopathy finally gave me lasting relief from migraines.", rating: 5 },
    { name: "Anita Desai", location: "Mumbai", text: "The holistic approach and genuine caring nature of Dr. Pal is truly commendable. My whole family trusts him.", rating: 5 },
  ];

  const blogs = [
    { img: blogHealthy, title: "5 Daily Habits for Natural Immunity", date: "March 15, 2025", excerpt: "Simple lifestyle changes that boost your body's natural defenses through holistic wellness." },
    { img: blogNotes, title: "Understanding Homeopathic Potency", date: "March 8, 2025", excerpt: "A guide to how potency works in homeopathy and why it matters for your treatment." },
    { img: blogNatural, title: "Herbs That Heal: A Complete Guide", date: "Feb 28, 2025", excerpt: "Discover the medicinal properties of common herbs used in homeopathic treatment." },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden min-h-[90vh] flex flex-col justify-end">
        <div className="absolute inset-0">
          <img src={doctorHero} alt="" aria-hidden="true" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, hsl(152 22% 8% / 0.92) 0%, hsl(152 18% 10% / 0.75) 40%, hsl(152 18% 12% / 0.35) 70%, hsl(152 18% 12% / 0.15) 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: "linear-gradient(to top, hsl(152 20% 8% / 0.9), transparent)" }} />
        </div>

        <div className="container mx-auto px-4 pt-32 pb-14 md:pt-40 md:pb-20 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/8 border border-white/10 rounded-full px-3.5 py-1 text-[13px] text-white/55 font-medium mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              {t.hero.badge}
            </div>

            <h1 className="font-heading text-[3rem] md:text-[4rem] lg:text-[5rem] font-bold leading-[1.04] text-white mb-5 tracking-tight">
              {t.hero.title1}<br />
              <span className="text-white/50">{t.hero.title2}</span>
            </h1>

            <p className="text-white/40 text-base md:text-lg mb-10 max-w-[28rem] leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl font-semibold shadow-elevated transition-all duration-300 hover:-translate-y-0.5 px-7" asChild>
                <Link to="/book-appointment"><Calendar className="w-4 h-4 mr-2" /> {t.hero.bookBtn}</Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl border-white/30 text-white bg-white/10 hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-sm" asChild>
                <Link to="/contact"><Phone className="w-4 h-4 mr-2" /> {t.hero.whatsappBtn}</Link>
              </Button>
            </div>
          </div>
        </div>

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

      {/* ─── ABOUT ME ─── */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section header */}
          <div className="text-center mb-12 md:mb-16">
            <p className="font-handwritten text-xl text-secondary mb-2">{t.about.sectionTag || "About Me"}</p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-tight">
              {t.doctor.name}
            </h2>
            <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-lg mx-auto">{t.doctor.title}</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-12 items-start">

              {/* Left: Photo + Quick Info */}
              <div className="flex flex-col items-center lg:sticky lg:top-28">
                <div className="relative mb-6">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-elevated ring-4 ring-background" style={{ transform: "rotate(-2deg)" }}>
                    <img src={doctorProfile} alt={t.doctor.name} className="w-full h-full object-cover" />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-3 -right-3 bg-secondary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> {t.doctor.goldMedalist}
                  </div>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3 w-full max-w-xs mb-5">
                  {[
                    { value: "10+", label: "Years Exp." },
                    { value: "5K+", label: "Patients" },
                    { value: "4.9", label: "Rating" },
                  ].map((s) => (
                    <div key={s.label} className="text-center bg-card border border-border/50 rounded-xl py-3 px-2 shadow-soft">
                      <p className="font-heading font-bold text-lg text-foreground">{s.value}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap justify-center gap-2 mb-5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-secondary/10 text-secondary px-2.5 py-1 rounded-full">
                    <Award className="w-3 h-3" /> {t.doctor.goldMedalist}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                    <Globe className="w-3 h-3" /> {t.doctor.ahfMember}
                  </span>
                </div>

                {/* CTA buttons - mobile visible, desktop sticky */}
                <div className="flex flex-col gap-2.5 w-full max-w-xs">
                  <Button className="gradient-primary text-primary-foreground rounded-xl text-sm w-full" asChild>
                    <Link to="/book-appointment"><Calendar className="w-4 h-4 mr-1.5" /> {t.doctor.bookConsultation}</Link>
                  </Button>
                  <Button variant="outline" className="rounded-xl text-sm border-border w-full" asChild>
                    <Link to="/about">{t.doctor.learnMore} <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                </div>
              </div>

              {/* Right: Details */}
              <div className="space-y-6">
                {/* Bio */}
                <div className="bg-card border border-border/50 rounded-2xl p-5 md:p-7 shadow-soft">
                  <p className="text-muted-foreground text-sm md:text-[15px] leading-[1.8]">{t.doctor.bio}</p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Qualifications */}
                  <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-soft hover-lift transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-secondary" />
                      </div>
                      <h4 className="font-heading font-semibold text-sm text-foreground">{t.doctor.qualifications}</h4>
                    </div>
                    <ul className="space-y-2">
                      {[t.doctor.qual1, t.doctor.qual2, t.doctor.qual3].map((q) => (
                        <li key={q} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary/50 mt-1.5 flex-shrink-0" />
                          {q}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-soft hover-lift transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                        <Award className="w-4 h-4 text-amber-600" />
                      </div>
                      <h4 className="font-heading font-semibold text-sm text-foreground">{t.doctor.achievements}</h4>
                    </div>
                    <ul className="space-y-2">
                      {[t.doctor.ach1, t.doctor.ach2, t.doctor.ach3].map((a) => (
                        <li key={a} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <Star className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Chambers */}
                  <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-soft hover-lift transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-primary" />
                      </div>
                      <h4 className="font-heading font-semibold text-sm text-foreground">{t.doctor.chambers}</h4>
                    </div>
                    <ul className="space-y-2">
                      {[t.doctor.chamber1, t.doctor.chamber2].map((c) => (
                        <li key={c} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Experience */}
                  <div className="bg-card border border-border/50 rounded-2xl p-5 shadow-soft hover-lift transition-all duration-300">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Stethoscope className="w-4 h-4 text-blue-600" />
                      </div>
                      <h4 className="font-heading font-semibold text-sm text-foreground">{t.doctor.experience}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{t.doctor.experienceYears}</p>
                    <p className="text-xs text-muted-foreground">{t.doctor.consultationType}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-handwritten text-xl text-secondary mb-2">{t.services.sectionTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              {t.services.sectionTitle}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto text-sm md:text-base">{t.services.sectionDesc}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-7 lg:gap-9">
            {features.map((f) => (
              <Card key={f.title} className="group overflow-hidden border-border/60 rounded-2xl hover-lift bg-card" style={{ transform: `rotate(${f.rotate})` }}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={f.img} alt={f.title} loading="lazy" width={768} height={512} className="w-full h-full object-cover img-organic group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
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


      {/* ─── PRODUCTS ─── */}
      <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, hsl(100 12% 97%), hsl(90 10% 94%) 100%)" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="font-handwritten text-xl text-secondary mb-2">{t.shop.sectionTag}</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">{t.shop.sectionTitle}</h2>
              <p className="text-muted-foreground mb-7 text-[15px] leading-[1.75] max-w-md">{t.shop.sectionDesc}</p>
              <Button variant="outline" className="rounded-xl border-border text-foreground hover:bg-accent/60 transition-all duration-300" asChild>
                <Link to="/shop">{t.shop.browseShop} <ArrowRight className="w-4 h-4 ml-1" /></Link>
              </Button>
            </div>
            <div className="overflow-hidden rounded-2xl shadow-card" style={{ transform: "rotate(0.5deg)" }}>
              <img src={productsDisplay} alt="Homeopathic products" loading="lazy" width={768} height={512} className="w-full h-full object-cover img-organic hover:scale-[1.03] transition-transform duration-700 ease-out" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="font-handwritten text-xl text-secondary mb-2">{t.testimonials.sectionTag}</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">{t.testimonials.sectionTitle}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((tst, i) => (
              <Card key={tst.name} className="border-border/50 rounded-2xl hover-lift bg-card" style={{ transform: `rotate(${i === 0 ? "-0.4" : i === 1 ? "0.3" : "-0.2"}deg)` }}>
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-secondary/20 mb-3 -scale-x-100" />
                  <p className="text-muted-foreground text-[15px] mb-5 leading-relaxed italic">{tst.text}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-heading font-semibold text-foreground">{tst.name}</p>
                      <p className="text-xs text-muted-foreground">{tst.location}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: tst.rating }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-secondary/70 text-secondary/70" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4"><div className="divider-leaf text-secondary"><Leaf className="w-4 h-4 opacity-40" /></div></div>

      {/* ─── BLOG ─── */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-14">
            <div>
              <p className="font-handwritten text-xl text-secondary mb-2">{t.blog.sectionTag}</p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">{t.blog.sectionTitle}</h2>
            </div>
            <Button variant="ghost" className="text-secondary hidden md:flex hover:bg-secondary/5 transition-colors" asChild>
              <Link to="/blog">{t.blog.viewAll} <ArrowRight className="w-4 h-4 ml-1" /></Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-7 lg:gap-9">
            {blogs.map((b, i) => (
              <Card key={b.title} className="group overflow-hidden border-border/50 rounded-2xl hover-lift bg-card" style={{ transform: `rotate(${i === 0 ? "0.3" : i === 1 ? "-0.4" : "0.2"}deg)` }}>
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={b.img} alt={b.title} loading="lazy" width={768} height={512} className="w-full h-full object-cover img-organic group-hover:scale-[1.04] transition-transform duration-700 ease-out" />
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
            <img src={ctaPatient} alt="" loading="lazy" width={1280} height={540} className="w-full h-72 md:h-[22rem] object-cover img-organic" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, hsl(152 38% 24% / 0.92) 0%, hsl(152 38% 24% / 0.6) 50%, transparent 100%)" }} />
            <div className="absolute inset-0 flex items-center">
              <div className="px-8 md:px-12 max-w-lg">
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4 leading-tight">{t.cta.title}</h2>
                <p className="text-primary-foreground/70 mb-6 text-[15px]">{t.cta.subtitle}</p>
                <Button size="lg" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5" asChild>
                  <Link to="/book-appointment"><Calendar className="w-4 h-4 mr-2" /> {t.cta.bookNow}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLINIC ─── */}
      <section className="py-20 md:py-28" style={{ background: "linear-gradient(180deg, hsl(100 12% 97%), hsl(90 10% 94%) 100%)" }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-8 lg:gap-14 items-center">
            <div className="overflow-hidden rounded-2xl shadow-card" style={{ transform: "rotate(-0.5deg)" }}>
              <img src={clinicExterior} alt="Clinic" loading="lazy" width={1280} height={512} className="w-full h-60 md:h-72 object-cover img-organic hover:scale-[1.03] transition-transform duration-700 ease-out" />
            </div>
            <div>
              <p className="font-handwritten text-xl text-secondary mb-2">{t.clinic.sectionTag}</p>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-5">{t.clinic.sectionTitle}</h2>
              <div className="space-y-4 text-muted-foreground text-[15px]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Newlife Homeo Hall</p>
                    <p>{t.doctor.chamber1}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Newlife Homeo Hall</p>
                    <p>{t.doctor.chamber2}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
                  <p>{t.doctor.consultationType}</p>
                </div>
              </div>
              <Button className="gradient-primary text-primary-foreground rounded-xl mt-7 hover:shadow-card transition-all duration-300 hover:-translate-y-0.5" asChild>
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
