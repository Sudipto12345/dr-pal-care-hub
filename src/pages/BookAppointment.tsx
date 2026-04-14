import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, CheckCircle, User, Phone, Mail, Stethoscope, ArrowRight, ArrowLeft, MapPin } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "02:00 PM", "02:30 PM", "03:00 PM",
  "03:30 PM", "04:00 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "07:00 PM",
];

const consultTypes = [
  { value: "first", label: "First Visit", desc: "Initial consultation & case-taking", icon: Stethoscope, duration: "45 min" },
  { value: "followup", label: "Follow-up", desc: "Review progress & adjust treatment", icon: Clock, duration: "20 min" },
  { value: "online", label: "Online Consultation", desc: "Video call from anywhere", icon: MapPin, duration: "30 min" },
];

const steps = ["Type", "Date & Time", "Your Details", "Confirm"];

const BookAppointment = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const [consultType, setConsultType] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", concern: "" });

  const canNext = () => {
    if (step === 0) return !!consultType;
    if (step === 1) return !!date && !!time;
    if (step === 2) return !!form.name && !!form.phone;
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    toast({ title: "Appointment Booked!", description: `Your ${consultType} appointment is confirmed for ${date ? format(date, "PPP") : ""} at ${time}.` });
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center animate-fade-in max-w-md">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Appointment Confirmed!</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Your {consultTypes.find((c) => c.value === consultType)?.label} is scheduled for{" "}
            <strong className="text-foreground">{date ? format(date, "PPP") : ""}</strong> at{" "}
            <strong className="text-foreground">{time}</strong>.
          </p>
          <p className="text-xs text-muted-foreground">You'll receive a confirmation via WhatsApp / phone shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="page-title-banner">
        <div className="container mx-auto px-4 text-center">
          <h1>Book an Appointment</h1>
          <p>Schedule your consultation with Dr. Amit Kumar Pal</p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Step indicator */}
          <div className="flex items-center justify-center gap-1 mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-1">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors",
                  i <= step ? "gradient-primary text-primary-foreground" : "bg-accent text-muted-foreground"
                )}>
                  {i + 1}
                </div>
                <span className={cn("text-xs hidden sm:block", i <= step ? "text-foreground font-medium" : "text-muted-foreground")}>
                  {s}
                </span>
                {i < steps.length - 1 && <div className={cn("w-8 md:w-14 h-px mx-1", i < step ? "bg-primary" : "bg-border")} />}
              </div>
            ))}
          </div>

          {/* Step 0: Consultation Type */}
          {step === 0 && (
            <div className="grid sm:grid-cols-3 gap-4">
              {consultTypes.map((ct) => (
                <Card
                  key={ct.value}
                  className={cn(
                    "cursor-pointer border-2 rounded-2xl transition-all hover-lift",
                    consultType === ct.value ? "border-primary bg-primary/5" : "border-border/50 hover:border-primary/30"
                  )}
                  onClick={() => setConsultType(ct.value)}
                >
                  <CardContent className="p-5 text-center">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors",
                      consultType === ct.value ? "gradient-primary" : "bg-accent"
                    )}>
                      <ct.icon className={cn("w-5 h-5", consultType === ct.value ? "text-primary-foreground" : "text-muted-foreground")} />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">{ct.label}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{ct.desc}</p>
                    <span className="text-[10px] font-medium text-secondary bg-secondary/10 px-2 py-0.5 rounded-full">{ct.duration}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Step 1: Date & Time */}
          {step === 1 && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-border/50 rounded-2xl">
                <CardContent className="p-4">
                  <p className="font-heading font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-secondary" /> Select Date
                  </p>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date() || d.getDay() === 0}
                    className="p-3 pointer-events-auto rounded-xl"
                  />
                </CardContent>
              </Card>
              <Card className="border-border/50 rounded-2xl">
                <CardContent className="p-4">
                  <p className="font-heading font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary" /> Select Time
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((t) => (
                      <Button
                        key={t}
                        variant={time === t ? "default" : "outline"}
                        size="sm"
                        className={cn("rounded-xl text-xs", time === t && "gradient-primary text-primary-foreground")}
                        onClick={() => setTime(t)}
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <Card className="border-border/50 rounded-2xl max-w-lg mx-auto">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-secondary" /> Full Name *</label>
                  <Input placeholder="Your full name" className="rounded-xl" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-secondary" /> Phone *</label>
                    <Input placeholder="+91 98765 43210" className="rounded-xl" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-foreground flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-secondary" /> Email</label>
                    <Input placeholder="email@example.com" type="email" className="rounded-xl" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-foreground">Health Concern</label>
                  <Textarea placeholder="Briefly describe your symptoms or health concern..." className="rounded-xl min-h-[100px]" value={form.concern} onChange={(e) => setForm({ ...form, concern: e.target.value })} />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Confirm */}
          {step === 3 && (
            <Card className="border-border/50 rounded-2xl max-w-lg mx-auto">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Appointment Summary</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: "Type", value: consultTypes.find((c) => c.value === consultType)?.label },
                    { label: "Date", value: date ? format(date, "EEEE, MMMM d, yyyy") : "" },
                    { label: "Time", value: time },
                    { label: "Name", value: form.name },
                    { label: "Phone", value: form.phone },
                    { label: "Email", value: form.email || "—" },
                    { label: "Concern", value: form.concern || "—" },
                  ].map((r) => (
                    <div key={r.label} className="flex justify-between border-b border-border/30 pb-2 last:border-0">
                      <span className="text-muted-foreground">{r.label}</span>
                      <span className="text-foreground font-medium text-right max-w-[60%]">{r.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 max-w-lg mx-auto">
            <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 0} className="gap-1.5">
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            {step < 3 ? (
              <Button onClick={() => setStep(step + 1)} disabled={!canNext()} className="gradient-primary text-primary-foreground rounded-xl gap-1.5">
                Next <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} className="gradient-primary text-primary-foreground rounded-xl gap-1.5">
                <CheckCircle className="w-4 h-4" /> Confirm Booking
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookAppointment;
