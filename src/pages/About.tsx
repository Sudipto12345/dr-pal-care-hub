import { Award, GraduationCap, Users, Clock, Globe, Building2, Stethoscope, MapPin, Phone, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import doctorProfile from "@/assets/doctor-profile.png";

const stats = [
  { icon: Clock, value: "5+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Patients Treated" },
  { icon: Award, value: "Gold Medalist", label: "India" },
  { icon: Globe, value: "AHF Member", label: "U.S.A." },
];

const qualifications = [
  "DHMS (BHB), Dhaka",
  "MA in English",
  "BS in Health Science, U.S.A.",
];

const achievements = [
  "Gold Medalist (India)",
  "Member, American Homeopathic Foundation (AHF), U.S.A.",
  "Higher Training in Advanced Homeopathy (India)",
  "Advanced Scientific Research-Based Homeopathy Specialist",
];

const About = () => (
  <div>
    <section className="page-title-banner">
      <div className="container mx-auto px-4 text-center">
        <h1>About Dr. Amit Kumar Pal</h1>
        <p>Homeopathic Consultant & Wellness Specialist</p>
      </div>
    </section>

    {/* Profile section */}
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[300px_1fr] gap-10 lg:gap-14 items-start">
          {/* Photo column */}
          <div className="flex flex-col items-center text-center">
            <div className="w-52 h-52 rounded-2xl overflow-hidden shadow-card ring-2 ring-secondary/20 mb-5" style={{ transform: "rotate(-1deg)" }}>
              <img src={doctorProfile} alt="Dr. Amit Kumar Pal" className="w-full h-full object-cover" />
            </div>
            <h2 className="font-heading font-bold text-xl text-foreground">Dr. Amit Kumar Pal</h2>
            <p className="text-secondary font-medium text-sm mt-1">Homeopathic Consultant</p>
            <p className="text-muted-foreground text-xs">Wellness Specialist</p>
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-secondary/10 text-secondary px-2.5 py-1 rounded-full">
                <Award className="w-3 h-3" /> Gold Medalist
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                <Globe className="w-3 h-3" /> AHF Member
              </span>
            </div>
            <Button className="gradient-primary text-primary-foreground rounded-xl mt-6 w-full" asChild>
              <Link to="/book-appointment">Book Consultation</Link>
            </Button>
          </div>

          {/* Bio column */}
          <div className="space-y-8">
            <div>
              <h3 className="font-heading font-bold text-2xl text-foreground mb-3">About Me</h3>
              <p className="text-muted-foreground text-[15px] leading-[1.8]">
                Dr. Amit Kumar Pal is a highly qualified homeopathic physician and wellness specialist with advanced training from India and the United States. His root-cause based, individualized approach to homeopathic treatment has helped hundreds of patients overcome chronic and lifestyle diseases safely and naturally.
              </p>
            </div>

            {/* Stats row */}
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

            {/* Qualifications & Achievements */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-secondary" /> Qualifications
                </h4>
                <ul className="space-y-2">
                  {qualifications.map((q) => (
                    <li key={q} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-secondary" /> Achievements
                </h4>
                <ul className="space-y-2">
                  {achievements.map((a) => (
                    <li key={a} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="w-3.5 h-3.5 text-secondary mt-0.5 flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Chambers */}
            <div>
              <h4 className="font-heading font-semibold text-foreground text-sm uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-secondary" /> Chambers
              </h4>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { name: "Newlife Homeo Hall", location: "Mirpur 11, Dhaka" },
                  { name: "Newlife Homeo Hall", location: "Bagerhat, Bangladesh" },
                ].map((c) => (
                  <div key={c.location} className="flex items-start gap-2.5 p-3 rounded-xl bg-accent/40 border border-border/30">
                    <MapPin className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/5 border border-secondary/15">
              <Stethoscope className="w-5 h-5 text-secondary flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Available for Online & Offline Consultation</p>
                <p className="text-xs text-muted-foreground">Book your appointment today for personalized treatment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
