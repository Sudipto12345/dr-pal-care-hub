import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus } from "lucide-react";

interface NewAppointmentFormProps {
  trigger?: React.ReactNode;
}

const NewAppointmentForm = ({ trigger }: NewAppointmentFormProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", date: "", time: "", type: "", concern: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.date) e.date = "Date is required";
    if (!form.time) e.time = "Select a time slot";
    if (!form.type) e.type = "Select consultation type";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    console.log("New Appointment:", form);
    toast.success("Appointment booked", { description: `${form.name} on ${form.date} at ${form.time}` });
    setForm({ name: "", phone: "", email: "", date: "", time: "", type: "", concern: "" });
    setErrors({});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="hero" size="sm"><Plus className="w-4 h-4 mr-1" /> New Appointment</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Book Appointment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Full Name *</Label>
              <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Patient name" className="mt-1 rounded-xl" />
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label>Phone *</Label>
              <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" className="mt-1 rounded-xl" />
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
            </div>
          </div>
          <div>
            <Label>Email</Label>
            <Input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="Optional" type="email" className="mt-1 rounded-xl" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Date *</Label>
              <Input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className="mt-1 rounded-xl" />
              {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
            </div>
            <div>
              <Label>Time Slot *</Label>
              <select value={form.time} onChange={(e) => set("time", e.target.value)} className="mt-1 w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
                <option value="">Select</option>
                <option>09:00 AM</option><option>09:30 AM</option><option>10:00 AM</option><option>10:30 AM</option>
                <option>11:00 AM</option><option>11:30 AM</option><option>02:00 PM</option><option>02:30 PM</option>
                <option>03:00 PM</option><option>03:30 PM</option><option>04:00 PM</option><option>05:00 PM</option>
              </select>
              {errors.time && <p className="text-xs text-destructive mt-1">{errors.time}</p>}
            </div>
          </div>
          <div>
            <Label>Consultation Type *</Label>
            <select value={form.type} onChange={(e) => set("type", e.target.value)} className="mt-1 w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
              <option value="">Select</option>
              <option>First Visit</option>
              <option>Follow-up</option>
              <option>Online Consultation</option>
            </select>
            {errors.type && <p className="text-xs text-destructive mt-1">{errors.type}</p>}
          </div>
          <div>
            <Label>Health Concern</Label>
            <Textarea value={form.concern} onChange={(e) => set("concern", e.target.value)} placeholder="Describe symptoms or reason for visit..." className="mt-1 rounded-xl min-h-[80px]" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-xl">Cancel</Button>
            <Button type="submit" variant="hero">Book Appointment</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAppointmentForm;
