import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, UserCircle2 } from "lucide-react";

const CompleteProfileGate = () => {
  const { user, patient, needsProfileCompletion, refreshPatient } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (patient) {
      setName(patient.name || "");
      setPhone(patient.phone || "");
      setAge(patient.age ? String(patient.age) : "");
      setGender(patient.gender || "");
      setAddress(patient.address || "");
    }
  }, [patient]);

  const handleSave = async () => {
    if (!user || !patient) return;
    if (!name.trim() || !phone.trim() || !age || !gender || !address.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) {
      toast.error("Enter a valid age (0-120)");
      return;
    }
    setSaving(true);
    const [pRes, profRes] = await Promise.all([
      supabase
        .from("patients")
        .update({ name: name.trim(), phone: phone.trim(), age: ageNum, gender, address: address.trim() })
        .eq("id", patient.id),
      supabase.from("profiles").update({ name: name.trim(), phone: phone.trim() }).eq("user_id", user.id),
    ]);
    setSaving(false);
    if (pRes.error || profRes.error) {
      toast.error(pRes.error?.message || profRes.error?.message || "Failed to save");
      return;
    }
    toast.success("Profile completed!");
    await refreshPatient();
  };

  if (!needsProfileCompletion) return null;

  return (
    <Dialog open={true}>
      <DialogContent className="max-w-lg rounded-2xl" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
        <DialogHeader>
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-2">
            <UserCircle2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <DialogTitle className="font-heading text-xl">Complete Your Profile</DialogTitle>
          <DialogDescription>
            Welcome! Please share a few details so the clinic can serve you better.
            {patient?.patient_code && (
              <span className="block mt-2 text-xs">
                Your Patient ID: <span className="font-mono font-semibold text-foreground">{patient.patient_code}</span>
              </span>
            )}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-muted-foreground">Full Name *</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 rounded-xl" maxLength={100} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground">Phone *</label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 rounded-xl" maxLength={20} />
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Age *</label>
              <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="mt-1 rounded-xl" min={0} max={120} />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Gender *</label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Address *</label>
            <Textarea value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 rounded-xl" rows={2} maxLength={500} />
          </div>
          <Button variant="hero" className="w-full" onClick={handleSave} disabled={saving}>
            {saving && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Save & Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CompleteProfileGate;
