import { Award, GraduationCap, Users, Clock, Globe, Building2, Stethoscope, MapPin, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import doctorProfile from "@/assets/dr-amit-pal.jpg";
import { useLanguage } from "@/i18n/LanguageContext";
import PageHero from "@/components/shared/PageHero";
import heroServices from "@/assets/hero-services.jpg";

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Clock, value: "5+", label: t.about.yearsExp },
    { icon: Users, value: "500+", label: t.about.patientsTreated },
    { icon: Award, value: t.doctor.goldMedalist, label: "India" },
    { icon: Globe, value: t.doctor.ahfMember, label: "U.S.A." },
  ];

  return (
    <div>
      <PageHero
        title={t.about.pageTitle}
        subtitle={t.about.pageSubtitle}
        bgImage={heroServices}
        icon={<Users className="w-7 h-7 text-white" />}
        gradient="from-primary/85 via-secondary/65 to-info/40"
      />

      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-[300px_1fr] gap-10 lg:gap-14 items-start">
            <div className="flex flex-col items-center text-center">
              <div className="w-52 h-52 rounded-2xl overflow-hidden shadow-card ring-2 ring-secondary/20 mb-5" style={{ transform: "rotate(-1deg)" }}>
                <img src={doctorProfile} alt={t.doctor.name} className="w-full h-full object-cover" />
              </div>
              <h2 className="font-heading font-bold text-xl text-foreground">{t.doctor.name}</h2>
              <p className="text-secondary font-medium text-sm mt-1">{t.doctor.title}</p>
              <p className="text-muted-foreground text-xs">{t.doctor.subtitle}</p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-secondary/10 text-secondary px-2.5 py-1 rounded-full">
                  <Award className="w-3 h-3" /> {t.doctor.goldMedalist}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                  <Globe className="w-3 h-3" /> {t.doctor.ahfMember}
                </span>
              </div>
              <Button className="gradient-primary text-primary-foreground rounded-xl mt-6 w-full" asChild>
                <Link to="/book-appointment">{t.doctor.bookConsultation}</Link>
              </Button>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">{t.about.aboutMe}</h3>
                <p className="text-muted-foreground text-[15px] leading-[1.8]">{t.about.bio}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {stats.map((s) => (
                  <Card key={s.label} className="border-border/50 rounded-xl text-center">
                    <CardContent className="p-4">
                      <s.icon className="w-5 h-5 text-secondary mx-auto mb-2" />
                      <div className="font-heading text-lg font-bold text-foreground leading-tight">{s.value}</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">{s.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-secondary" /> {t.doctor.qualifications}
                  </h4>
                  <ul className="space-y-2">
                    {[t.doctor.qual1, t.doctor.qual2, t.doctor.qual3].map((q) => (
                      <li key={q} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" /> {q}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-secondary" /> {t.doctor.achievements}
                  </h4>
                  <ul className="space-y-2">
                    {[t.doctor.ach1, t.doctor.ach2, t.doctor.ach3].map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" /> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-secondary" /> {t.doctor.chambers}
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[t.doctor.chamber1, t.doctor.chamber2].map((c) => (
                    <div key={c} className="flex items-start gap-2.5 p-3 rounded-xl bg-accent/40 border border-border/30">
                      <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{c}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/5 border border-secondary/15">
                <Stethoscope className="w-5 h-5 text-secondary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-foreground">{t.about.availableConsultation}</p>
                  <p className="text-xs text-muted-foreground">{t.about.availableConsultationDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
