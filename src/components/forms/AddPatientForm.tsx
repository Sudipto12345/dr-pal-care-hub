import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, CheckCircle, Loader2 } from "lucide-react";
import { useCreatePatient } from "@/hooks/useSupabaseData";

const initialState = { name: "", email: "", phone: "", age: "", gender: "", address: "" };

const AddPatientForm = ({ trigger }: { trigger?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const createPatient = useCreatePatient();

  const set = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (form.age && (isNaN(Number(form.age)) || Number(form.age) < 0 || Number(form.age) > 120)) e.age = "Enter valid age";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    createPatient.mutate(
      {
        name: form.name,
        phone: form.phone,
        age: form.age ? Number(form.age) : undefined,
        gender: form.gender?.toLowerCase() || undefined,
        address: form.address || undefined,
        email: form.email || undefined,
      },
      {
        onSuccess: () => {
          setSuccess(true);
          setTimeout(() => { setForm(initialState); setErrors({}); setSuccess(false); setOpen(false); }, 1500);
        },
      }
    );
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) { setForm(initialState); setErrors({}); setSuccess(false); }
    setOpen(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || <Button variant="hero" size="sm"><Plus className="w-4 h-4 mr-1" /> Add Patient</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        {success ? (
          <div className="py-12 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-1">Patient Registered!</h3>
            <p className="text-muted-foreground text-sm">{form.name} has been added.</p>
          </div>
        ) : (
          <>
            <DialogHeader><DialogTitle className="font-heading text-xl">Add New Patient</DialogTitle></DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Saida Begum" className="mt-1 rounded-xl" />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label>Phone *</Label>
                  <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+91 98765 43210" className="mt-1 rounded-xl" />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Age</Label>
                  <Input value={form.age} onChange={(e) => set("age", e.target.value)} placeholder="35" className="mt-1 rounded-xl" />
                  {errors.age && <p className="text-xs text-destructive mt-1">{errors.age}</p>}
                </div>
                <div>
                  <Label>Gender</Label>
                  <select value={form.gender} onChange={(e) => set("gender", e.target.value)} className="mt-1 w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <Label>Email</Label>
                <Input value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="patient@email.com" type="email" className="mt-1 rounded-xl" />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
              <div>
                <Label>Address</Label>
                <Textarea value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Full address" className="mt-1 rounded-xl" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} className="rounded-xl">Cancel</Button>
                <Button type="submit" variant="hero" disabled={createPatient.isPending}>
                  {createPatient.isPending && <Loader2 className="w-4 h-4 animate-spin mr-1" />} Add Patient
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientForm;
