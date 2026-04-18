import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import PageHero from "@/components/shared/PageHero";
import heroContact from "@/assets/hero-contact.jpg";

const Contact = () => (
  <div>
    <PageHero
      title="Contact Us"
      subtitle="Get in touch for appointments and inquiries"
      bgImage={heroContact}
      icon={<Phone className="w-7 h-7 text-white" />}
      gradient="from-primary/80 via-secondary/60 to-info/50"
    />
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Send a Message</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input placeholder="Full Name" className="rounded-xl" />
                <Input placeholder="Email" type="email" className="rounded-xl" />
              </div>
              <Input placeholder="Phone Number" className="rounded-xl" />
              <Input placeholder="Subject" className="rounded-xl" />
              <Textarea placeholder="Your message..." className="rounded-xl min-h-[120px]" />
              <Button variant="hero" size="lg" type="submit">Send Message</Button>
            </form>
          </div>
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Clinic Information</h2>
            {[
              { icon: MapPin, label: "Address", value: "Dhaka, Bangladesh" },
              { icon: Phone, label: "Phone", value: "+880 1911 734 726 / 01787 354 248" },
              { icon: Mail, label: "Email", value: "dramithomeo@gmail.com" },
              { icon: Clock, label: "Consultation", value: "Online & Offline Consultation Available" },
            ].map((item) => (
              <Card key={item.label} className="border-border rounded-2xl">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Contact;
