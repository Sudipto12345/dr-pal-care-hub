import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { useCases, useUpdateCase, useDeleteCase } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Eye, Pencil, Trash2, X, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

const AdminCases = () => {
  const { data: cases, isLoading } = useCases();
  const updateCase = useUpdateCase();
  const deleteCase = useDeleteCase();

  const [viewCase, setViewCase] = useState<any>(null);
  const [editCase, setEditCase] = useState<any>(null);

  const [editSymptoms, setEditSymptoms] = useState("");
  const [editHistory, setEditHistory] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const openEdit = (c: any) => {
    setEditCase(c);
    setEditSymptoms(c.symptoms || "");
    setEditHistory(c.history || "");
    setEditNotes(c.notes || "");
  };

  const handleUpdate = () => {
    if (!editCase) return;
    updateCase.mutate({ id: editCase.id, symptoms: editSymptoms, history: editHistory, notes: editNotes }, {
      onSuccess: () => setEditCase(null),
    });
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-0 animate-fade-in">
      <PageHeader
        title="Case Management"
        description="Track patient cases and treatment progress"
        actions={<Button variant="hero" size="sm" asChild><Link to="/admin/cases/new"><Plus className="w-4 h-4 mr-1" /> New Case</Link></Button>}
      />
      <DataTable
        data={cases || []}
        searchPlaceholder="Search cases..."
        columns={[
          { header: "Patient", accessor: (row: any) => row.patients?.name || "Unknown" },
          { header: "Symptoms", accessor: (row: any) => row.symptoms?.substring(0, 50) || "—" },
          { header: "Date", accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
          { header: "Notes", accessor: (row: any) => row.notes?.substring(0, 40) || "—" },
          {
            header: "Actions",
            accessor: (row: any) => (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setViewCase(row)}><Eye className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(row)}><Pencil className="w-3.5 h-3.5" /></Button>
                <ConfirmDialog
                  trigger={<Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>}
                  title="Delete Case"
                  description="Are you sure? This cannot be undone."
                  confirmLabel="Delete"
                  variant="destructive"
                  onConfirm={() => deleteCase.mutate(row.id)}
                />
              </div>
            ),
          },
        ]}
      />

      {/* View Dialog */}
      <Dialog open={!!viewCase} onOpenChange={() => setViewCase(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Case Details</DialogTitle>
            <DialogDescription>Patient: {viewCase?.patients?.name || "Unknown"}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 text-sm">
            <div><span className="font-medium text-muted-foreground">Date:</span> <span>{viewCase && new Date(viewCase.created_at).toLocaleDateString()}</span></div>
            <div><span className="font-medium text-muted-foreground">Symptoms:</span><p className="mt-1 whitespace-pre-wrap">{viewCase?.symptoms || "—"}</p></div>
            <div><span className="font-medium text-muted-foreground">History:</span><p className="mt-1 whitespace-pre-wrap">{viewCase?.history || "—"}</p></div>
            <div><span className="font-medium text-muted-foreground">Notes:</span><p className="mt-1 whitespace-pre-wrap">{viewCase?.notes || "—"}</p></div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editCase} onOpenChange={() => setEditCase(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Case</DialogTitle>
            <DialogDescription>Patient: {editCase?.patients?.name || "Unknown"}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label>Symptoms</Label><Textarea value={editSymptoms} onChange={e => setEditSymptoms(e.target.value)} rows={3} /></div>
            <div><Label>History</Label><Textarea value={editHistory} onChange={e => setEditHistory(e.target.value)} rows={3} /></div>
            <div><Label>Notes</Label><Textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} rows={3} /></div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setEditCase(null)}><X className="w-3.5 h-3.5 mr-1" />Cancel</Button>
            <Button variant="hero" size="sm" onClick={handleUpdate} disabled={updateCase.isPending}><Save className="w-3.5 h-3.5 mr-1" />{updateCase.isPending ? "Saving..." : "Save"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCases;
