import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/shared/PageHeader";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const PatientProfile = () => {
  const { user, profile, signOut } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(profile?.name || "");
  const [phone, setPhone] = useState(profile?.phone || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ name, phone }).eq("user_id", user.id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else toast({ title: "Profile updated!" });
    setSaving(false);
  };

  return (
    <div>
      <PageHeader title="My Profile" description="Manage your personal information" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border rounded-2xl">
          <CardHeader><CardTitle className="font-heading text-lg">Personal Information</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <Input value={user?.email || ""} disabled className="mt-1 rounded-xl" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Full Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 rounded-xl" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Phone</label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 rounded-xl" />
            </div>
            <div className="flex gap-2">
              <Button variant="hero" size="sm" onClick={handleSave} disabled={saving}>
                {saving && <Loader2 className="w-4 h-4 animate-spin mr-1" />} Save Changes
              </Button>
              <Button variant="outline" size="sm" onClick={signOut}>Sign Out</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientProfile;
