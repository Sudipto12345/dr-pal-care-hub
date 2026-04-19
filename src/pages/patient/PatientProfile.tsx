import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageHeader from "@/components/shared/PageHeader";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, IdCard, LogOut } from "lucide-react";

const PatientProfile = () => {
  const { user, profile, patient, signOut, refreshPatient } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(patient?.name || profile?.name || "");
  const [phone, setPhone] = useState(patient?.phone || profile?.phone || "");
  const [age, setAge] = useState(patient?.age ? String(patient.age) : "");
  const [gender, setGender] = useState(patient?.gender || "");
  const [address, setAddress] = useState(patient?.address || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    if (!name.trim() || !phone.trim()) {
      toast({ title: "Name and phone are required", variant: "destructive" });
      return;
    }
    const ageNum = age ? parseInt(age) : null;
    if (age && (isNaN(ageNum!) || ageNum! < 0 || ageNum! > 120)) {
      toast({ title: "Enter a valid age (0-120)", variant: "destructive" });
      return;
    }
    setSaving(true);
    const updates = await Promise.all([
      supabase.from("profiles").update({ name: name.trim(), phone: phone.trim() }).eq("user_id", user.id),
      patient
        ? supabase
            .from("patients")
            .update({
              name: name.trim(),
              phone: phone.trim(),
              age: ageNum,
              gender: gender || null,
              address: address.trim() || null,
            })
            .eq("id", patient.id)
        : Promise.resolve({ error: null } as any),
    ]);
    setSaving(false);
    const err = updates.find((u: any) => u?.error)?.error;
    if (err) toast({ title: "Error", description: err.message, variant: "destructive" });
    else {
      toast({ title: "Profile updated!" });
      await refreshPatient();
    }
  };

  return (
    <div>
      <PageHeader title="My Profile" description="Manage your personal information" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border rounded-2xl lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-heading text-lg">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <Input value={user?.email || ""} disabled className="mt-1 rounded-xl" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Full Name *</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 rounded-xl" maxLength={100} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Phone *</label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 rounded-xl" maxLength={20} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Age</label>
                <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="mt-1 rounded-xl" min={0} max={120} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Gender</label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Select gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-muted-foreground">Address</label>
                <Textarea value={address} onChange={(e) => setAddress(e.target.value)} className="mt-1 rounded-xl" rows={2} maxLength={500} />
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="hero" size="sm" onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 animate-spin mr-1" />} Save Changes
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>
                <LogOut className="w-4 h-4 mr-1" /> Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>

        {patient?.patient_code && (
          <Card className="border-border rounded-2xl bg-accent/30">
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <IdCard className="w-5 h-5" /> Patient ID
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-mono font-bold tracking-[0.3em] text-center py-4">
                {patient.patient_code}
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Share this with the clinic for quick lookup.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
