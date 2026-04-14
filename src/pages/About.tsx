import { Award, GraduationCap, Users, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { icon: Clock, value: "20+", label: "Years Experience" },
  { icon: Users, value: "10,000+", label: "Patients Treated" },
  { icon: Award, value: "BHMS", label: "Qualification" },
  { icon: GraduationCap, value: "MD", label: "Homeopathy" },
];

const About = () => (
  <div>
    <section className="page-title-banner">
      <div className="container mx-auto px-4 text-center">
        <h1>About Dr. Amit Kumar Pal</h1>
        <p>Dedicated to healing through the science of homeopathy</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">A Journey of Healing</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Dr. Amit Kumar Pal is a highly experienced homeopathic physician with over 20 years of practice. He holds a BHMS degree and an MD in Homeopathy.</p>
              <p>His approach combines classical homeopathy with modern diagnostic methods, ensuring each patient receives the most effective treatment plan tailored to their individual constitution.</p>
              <p>Specializing in chronic diseases, pediatric care, skin disorders, and mental health conditions, Dr. Pal has helped thousands of patients find lasting relief through natural remedies.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <Card key={s.label} className="border-border rounded-2xl text-center">
                <CardContent className="p-6">
                  <s.icon className="w-8 h-8 text-secondary mx-auto mb-3" />
                  <div className="font-heading text-2xl font-bold text-foreground">{s.value}</div>
                  <div className="text-sm text-muted-foreground">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default About;
