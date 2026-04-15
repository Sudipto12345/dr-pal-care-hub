import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Link } from "react-router-dom";
import DataTable from "@/components/shared/DataTable";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import AddPatientForm from "@/components/forms/AddPatientForm";
import { usePatients, useDeletePatient, useUpdatePatient } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, Eye, Pencil, Save, X, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AdminPatients = () => {
  const { data: patients, isLoading } = usePatients();
  const deletePatient = useDeletePatient();
  const updatePatient = useUpdatePatient();

  const [viewPatient, setViewPatient] = useState<any>(null);
  const [editPatient, setEditPatient] = useState<any>(null);

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

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-0 animate-fade-in">
      <PageHeader title="Patients" description="Manage patient records" actions={<AddPatientForm />} />
      <DataTable
        data={patients || []}
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
          {
            header: "Actions",
            accessor: (row: any) => (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setViewPatient(row)} title="View"><Eye className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-info" asChild title="Timeline"><Link to={`/admin/patients/${row.id}/timeline`}><Clock className="w-3.5 h-3.5" /></Link></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(row)} title="Edit"><Pencil className="w-3.5 h-3.5" /></Button>
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
            <DialogTitle>{viewPatient?.name}</DialogTitle>
            <DialogDescription>Patient Information</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Age:</span><span className="font-medium">{viewPatient?.age ? `${viewPatient.age} years` : "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Gender:</span><span className="font-medium">{viewPatient?.gender || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Phone:</span><span className="font-medium">{viewPatient?.phone || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Email:</span><span className="font-medium">{viewPatient?.email || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Address:</span><span className="font-medium">{viewPatient?.address || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Registered:</span><span className="font-medium">{viewPatient && new Date(viewPatient.created_at).toLocaleDateString()}</span></div>
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
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
    </div>
  );
};

export default AdminPatients;
