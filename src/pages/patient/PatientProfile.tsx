import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageHeader from "@/components/shared/PageHeader";

const PatientProfile = () => (
  <div>
    <PageHeader title="My Profile" description="Manage your personal information" />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-border rounded-2xl">
        <CardHeader><CardTitle className="font-heading text-lg">Personal Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm text-muted-foreground">Full Name</label><Input defaultValue="Priya Sharma" className="mt-1 rounded-xl" /></div>
            <div><label className="text-sm text-muted-foreground">Email</label><Input defaultValue="priya@email.com" className="mt-1 rounded-xl" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="text-sm text-muted-foreground">Phone</label><Input defaultValue="+91 98765 11111" className="mt-1 rounded-xl" /></div>
            <div><label className="text-sm text-muted-foreground">Date of Birth</label><Input type="date" defaultValue="1991-05-15" className="mt-1 rounded-xl" /></div>
          </div>
          <div><label className="text-sm text-muted-foreground">Gender</label><Input defaultValue="Female" className="mt-1 rounded-xl" /></div>
          <Button variant="hero" size="sm">Save Changes</Button>
        </CardContent>
      </Card>

      <Card className="border-border rounded-2xl">
        <CardHeader><CardTitle className="font-heading text-lg">Medical Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div><label className="text-sm text-muted-foreground">Blood Group</label><Input defaultValue="B+" className="mt-1 rounded-xl" /></div>
          <div><label className="text-sm text-muted-foreground">Allergies</label><Input defaultValue="Dust, Pollen" className="mt-1 rounded-xl" /></div>
          <div><label className="text-sm text-muted-foreground">Current Medications</label><Input defaultValue="None" className="mt-1 rounded-xl" /></div>
          <div><label className="text-sm text-muted-foreground">Emergency Contact</label><Input defaultValue="+91 98765 99999" className="mt-1 rounded-xl" /></div>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default PatientProfile;
