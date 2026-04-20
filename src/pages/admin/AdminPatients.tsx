import { useState, useMemo } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Link } from "react-router-dom";
import DataTable from "@/components/shared/DataTable";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import AddPatientForm from "@/components/forms/AddPatientForm";
import { usePatients, useDeletePatient, useUpdatePatient } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, Eye, Pencil, Save, X, Clock, Mail, IdCard, Shield, Users, KeyRound, Copy, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type SourceFilter = "all" | "google" | "email" | "patient_id" | "admin";

const sourceMeta: Record<string, { label: string; className: string; icon: any }> = {
  google: { label: "Google", className: "bg-blue-500/10 text-blue-600 border-blue-500/30 hover:bg-blue-500/15", icon: () => (
    <svg className="w-3 h-3" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
  )},
  email: { label: "Email", className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30", icon: Mail },
  patient_id: { label: "Patient ID", className: "bg-amber-500/10 text-amber-600 border-amber-500/30", icon: IdCard },
  admin: { label: "Admin", className: "bg-purple-500/10 text-purple-600 border-purple-500/30", icon: Shield },
  unknown: { label: "Unknown", className: "bg-muted text-muted-foreground border-border", icon: Users },
};

const SourceBadge = ({ source }: { source?: string | null }) => {
  const key = source && sourceMeta[source] ? source : "unknown";
  const meta = sourceMeta[key];
  const Icon = meta.icon;
  return (
    <Badge variant="outline" className={`gap-1 font-normal text-xs ${meta.className}`}>
      <Icon className="w-3 h-3" />
      {meta.label}
    </Badge>
  );
};

const AdminPatients = () => {
  const { data: patients, isLoading } = usePatients();
  const deletePatient = useDeletePatient();
  const updatePatient = useUpdatePatient();

  const [viewPatient, setViewPatient] = useState<any>(null);
  const [editPatient, setEditPatient] = useState<any>(null);
  const [resetPatient, setResetPatient] = useState<any>(null);
  const [resetting, setResetting] = useState(false);
  const [resetResult, setResetResult] = useState<{ patient_code: string | null; passcode: string } | null>(null);
  const [resetCopied, setResetCopied] = useState(false);
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");

  const handleResetPasscode = async () => {
    if (!resetPatient) return;
    setResetting(true);
    try {
      const { data, error } = await supabase.functions.invoke("reset-patient-passcode", {
        body: { patient_id: resetPatient.id },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setResetResult({ patient_code: (data as any).patient_code, passcode: (data as any).passcode });
    } catch (err: any) {
      toast.error(err?.message || "Failed to reset passcode");
    } finally {
      setResetting(false);
    }
  };

  const closeReset = () => {
    setResetPatient(null);
    setResetResult(null);
    setResetCopied(false);
  };

  const copyResetCredentials = async () => {
    if (!resetResult) return;
    const text = `Patient ID: ${resetResult.patient_code ?? "—"}\nPasscode: ${resetResult.passcode}`;
    try {
      await navigator.clipboard.writeText(text);
      setResetCopied(true);
      setTimeout(() => setResetCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  };

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editGender, setEditGender] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editAddress, setEditAddress] = useState("");

  const openEdit = (p: any) => {
    setEditPatient(p);
    setEditName(p.name || "");
    setEditAge(p.age?.toString() || "");
    setEditGender(p.gender || "");
    setEditPhone(p.phone || "");
    setEditEmail(p.email || "");
    setEditAddress(p.address || "");
  };

  const handleUpdate = () => {
    if (!editPatient || !editName.trim()) return;
    updatePatient.mutate({
      id: editPatient.id,
      name: editName,
      age: editAge ? parseInt(editAge) : undefined,
      gender: editGender || undefined,
      phone: editPhone || undefined,
      email: editEmail || undefined,
      address: editAddress || undefined,
    }, { onSuccess: () => setEditPatient(null) });
  };

  const counts = useMemo(() => {
    const list = patients || [];
    return {
      all: list.length,
      google: list.filter((p: any) => p.signup_source === "google").length,
      email: list.filter((p: any) => p.signup_source === "email").length,
      patient_id: list.filter((p: any) => p.signup_source === "patient_id").length,
      admin: list.filter((p: any) => p.signup_source === "admin" || !p.signup_source).length,
    };
  }, [patients]);

  const filteredPatients = useMemo(() => {
    const list = patients || [];
    if (sourceFilter === "all") return list;
    if (sourceFilter === "admin") {
      return list.filter((p: any) => p.signup_source === "admin" || !p.signup_source);
    }
    return list.filter((p: any) => p.signup_source === sourceFilter);
  }, [patients, sourceFilter]);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-0 animate-fade-in">
      <PageHeader title="Patients" description="Manage patient records" actions={<AddPatientForm />} />

      <Tabs value={sourceFilter} onValueChange={(v) => setSourceFilter(v as SourceFilter)} className="mb-4">
        <TabsList className="rounded-xl flex-wrap h-auto">
          <TabsTrigger value="all" className="rounded-lg gap-1.5">
            All <span className="text-xs opacity-70">({counts.all})</span>
          </TabsTrigger>
          <TabsTrigger value="google" className="rounded-lg gap-1.5">
            <svg className="w-3 h-3" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google <span className="text-xs opacity-70">({counts.google})</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="rounded-lg gap-1.5">
            <Mail className="w-3 h-3" /> Email <span className="text-xs opacity-70">({counts.email})</span>
          </TabsTrigger>
          <TabsTrigger value="patient_id" className="rounded-lg gap-1.5">
            <IdCard className="w-3 h-3" /> Patient ID <span className="text-xs opacity-70">({counts.patient_id})</span>
          </TabsTrigger>
          <TabsTrigger value="admin" className="rounded-lg gap-1.5">
            <Shield className="w-3 h-3" /> Admin <span className="text-xs opacity-70">({counts.admin})</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <DataTable
        data={filteredPatients}
        searchPlaceholder="Search patients..."
        columns={[
          {
            header: "Name",
            accessor: (row: any) => (
              <button
                onClick={() => setViewPatient(row)}
                className="text-primary hover:underline font-medium text-left"
              >
                {row.name}
              </button>
            ),
          },
          { header: "Age", accessor: (row: any) => row.age ? `${row.age}y` : "—" },
          { header: "Gender", accessor: (row: any) => row.gender || "—" },
          { header: "Phone", accessor: (row: any) => row.phone || "—" },
          { header: "Source", accessor: (row: any) => <SourceBadge source={row.signup_source} /> },
          {
            header: "Actions",
            accessor: (row: any) => (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setViewPatient(row)} title="View"><Eye className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-info" asChild title="Timeline"><Link to={`/admin/patients/${row.id}/timeline`}><Clock className="w-3.5 h-3.5" /></Link></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(row)} title="Edit"><Pencil className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-amber-600" onClick={() => { setResetPatient(row); setResetResult(null); setResetCopied(false); }} title="Reset password" disabled={!row.user_id}>
                  <KeyRound className="w-3.5 h-3.5" />
                </Button>
                <ConfirmDialog
                  trigger={<Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>}
                  title="Delete Patient"
                  description={`Are you sure you want to delete ${row.name}?`}
                  confirmLabel="Delete"
                  variant="destructive"
                  onConfirm={() => deletePatient.mutate(row.id)}
                />
              </div>
            ),
          },
        ]}
      />

      {/* View Patient Popup */}
      <Dialog open={!!viewPatient} onOpenChange={() => setViewPatient(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 flex-wrap">
              {viewPatient?.name}
              <SourceBadge source={viewPatient?.signup_source} />
            </DialogTitle>
            <DialogDescription>Patient Information</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Patient ID:</span><span className="font-mono font-medium">{viewPatient?.patient_code || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Age:</span><span className="font-medium">{viewPatient?.age ? `${viewPatient.age} years` : "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Gender:</span><span className="font-medium">{viewPatient?.gender || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Phone:</span><span className="font-medium">{viewPatient?.phone || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Email:</span><span className="font-medium">{viewPatient?.email || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Address:</span><span className="font-medium">{viewPatient?.address || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Registered:</span><span className="font-medium">{viewPatient && new Date(viewPatient.created_at).toLocaleDateString()}</span></div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button variant="outline" size="sm" className="rounded-xl" asChild>
              <Link to={`/admin/patients/${viewPatient?.id}/timeline`}><Clock className="w-3.5 h-3.5 mr-1" /> Timeline</Link>
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => { setViewPatient(null); openEdit(viewPatient); }}>
              <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Patient Popup */}
      <Dialog open={!!editPatient} onOpenChange={() => setEditPatient(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Patient</DialogTitle>
            <DialogDescription>Update patient information</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label className="text-xs">Name *</Label><Input value={editName} onChange={e => setEditName(e.target.value)} className="rounded-xl mt-1" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Age</Label><Input type="number" value={editAge} onChange={e => setEditAge(e.target.value)} className="rounded-xl mt-1" /></div>
              <div>
                <Label className="text-xs">Gender</Label>
                <select value={editGender} onChange={e => setEditGender(e.target.value)} className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm mt-1">
                  <option value="">Select</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>
            <div><Label className="text-xs">Phone</Label><Input value={editPhone} onChange={e => setEditPhone(e.target.value)} className="rounded-xl mt-1" /></div>
            <div><Label className="text-xs">Email</Label><Input type="email" value={editEmail} onChange={e => setEditEmail(e.target.value)} className="rounded-xl mt-1" /></div>
            <div><Label className="text-xs">Address</Label><Input value={editAddress} onChange={e => setEditAddress(e.target.value)} className="rounded-xl mt-1" /></div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setEditPatient(null)}><X className="w-3.5 h-3.5 mr-1" /> Cancel</Button>
            <Button variant="hero" size="sm" className="rounded-xl" onClick={handleUpdate} disabled={updatePatient.isPending}>
              <Save className="w-3.5 h-3.5 mr-1" /> {updatePatient.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reset Passcode Popup */}
      <Dialog open={!!resetPatient} onOpenChange={(open) => { if (!open) closeReset(); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-amber-600" /> Reset Patient Passcode
            </DialogTitle>
            <DialogDescription>
              {resetResult
                ? "New passcode generated. Share it with the patient — it won't be shown again."
                : `Generate a new 6-digit passcode for ${resetPatient?.name ?? "this patient"}? Their old passcode will stop working immediately.`}
            </DialogDescription>
          </DialogHeader>

          {resetResult && (
            <div className="space-y-3 py-2">
              <div className="rounded-xl border border-border p-3 bg-muted/30 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Patient ID</span>
                  <span className="font-mono font-semibold">{resetResult.patient_code ?? "—"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">New Passcode</span>
                  <span className="font-mono font-semibold tracking-widest">{resetResult.passcode}</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full rounded-xl" onClick={copyResetCredentials}>
                {resetCopied ? <><Check className="w-3.5 h-3.5 mr-1" /> Copied</> : <><Copy className="w-3.5 h-3.5 mr-1" /> Copy credentials</>}
              </Button>
            </div>
          )}

          <DialogFooter className="gap-2">
            {resetResult ? (
              <Button variant="hero" size="sm" className="rounded-xl" onClick={closeReset}>Done</Button>
            ) : (
              <>
                <Button variant="outline" size="sm" className="rounded-xl" onClick={closeReset} disabled={resetting}>Cancel</Button>
                <Button variant="hero" size="sm" className="rounded-xl" onClick={handleResetPasscode} disabled={resetting}>
                  {resetting ? <><Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" /> Resetting...</> : <><KeyRound className="w-3.5 h-3.5 mr-1" /> Generate new passcode</>}
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPatients;
