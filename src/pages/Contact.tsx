import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => (
  <div>
    <section className="gradient-hero text-primary-foreground py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-primary-foreground/70 max-w-lg mx-auto">Get in touch for appointments and inquiries</p>
      </div>
    </section>
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
              { icon: MapPin, label: "Address", value: "123 Healing Lane, New Delhi, India 110001" },
              { icon: Phone, label: "Phone", value: "+91 98765 43210" },
              { icon: Mail, label: "Email", value: "dr.amitpal@clinic.com" },
              { icon: Clock, label: "Hours", value: "Mon-Sat: 9:00 AM - 7:00 PM" },
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
