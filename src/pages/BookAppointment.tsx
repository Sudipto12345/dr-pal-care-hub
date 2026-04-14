import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BookAppointment = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Appointment Request Sent!", description: "We'll confirm your appointment shortly." });
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Request Submitted!</h2>
          <p className="text-muted-foreground">We'll contact you to confirm your appointment.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="gradient-hero text-primary-foreground py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Book an Appointment</h1>
          <p className="text-primary-foreground/70 max-w-lg mx-auto">Schedule your consultation with Dr. Amit Kumar Pal</p>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="border-border rounded-2xl shadow-card">
            <CardHeader>
              <CardTitle className="font-heading text-xl">Appointment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Full Name" required className="rounded-xl" />
                  <Input placeholder="Email" type="email" required className="rounded-xl" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input placeholder="Phone Number" required className="rounded-xl" />
                  <Input type="date" required className="rounded-xl" />
                </div>
                <select className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
                  <option value="">Select Time Slot</option>
                  <option>9:00 AM - 10:00 AM</option>
                  <option>10:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 12:00 PM</option>
                  <option>2:00 PM - 3:00 PM</option>
                  <option>3:00 PM - 4:00 PM</option>
                  <option>5:00 PM - 6:00 PM</option>
                </select>
                <select className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
                  <option value="">Consultation Type</option>
                  <option>First Visit</option>
                  <option>Follow-up</option>
                  <option>Online Consultation</option>
                </select>
                <Textarea placeholder="Describe your health concern..." className="rounded-xl min-h-[100px]" />
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Mon-Sat</div>
                  <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> 9 AM - 7 PM</div>
                </div>
                <Button variant="hero" size="lg" type="submit" className="w-full">Book Appointment</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BookAppointment;
