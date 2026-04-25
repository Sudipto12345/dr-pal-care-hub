import { useState, useMemo } from "react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { useAppointments, useUpdateAppointmentStatus, useDeleteAppointment, useUpdateAppointment } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, Eye, Pencil, Trash2, X, Save } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminAppointments = () => {
  const { data: appointments, isLoading } = useAppointments();
  const updateStatus = useUpdateAppointmentStatus();
  const deleteAppointment = useDeleteAppointment();
  const updateAppointment = useUpdateAppointment();

  const [viewAppt, setViewAppt] = useState<any>(null);
  const [editAppt, setEditAppt] = useState<any>(null);
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [statusTab, setStatusTab] = useState<"all" | "pending" | "confirmed" | "cancelled">("all");

  const counts = useMemo(() => {
    const list = appointments || [];
    return {
      all: list.length,
      pending: list.filter((a: any) => a.status === "pending").length,
      confirmed: list.filter((a: any) => a.status === "confirmed").length,
      cancelled: list.filter((a: any) => a.status === "cancelled").length,
    };
  }, [appointments]);

  const filteredAppts = useMemo(() => {
    const list = appointments || [];
    return statusTab === "all" ? list : list.filter((a: any) => a.status === statusTab);
  }, [appointments, statusTab]);


  const openEdit = (a: any) => {
    setEditAppt(a);
    setEditDate(a.date || "");
    setEditTime(a.time_slot || "");
    setEditNotes(a.notes || "");
    setEditStatus(a.status || "pending");
  };

  const handleUpdate = () => {
    if (!editAppt) return;
    updateAppointment.mutate({
      id: editAppt.id,
      date: editDate,
      time_slot: editTime || undefined,
      notes: editNotes || undefined,
      status: editStatus,
    }, { onSuccess: () => setEditAppt(null) });
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-0 animate-fade-in">
      <PageHeader title="Appointments" description="Manage all patient appointments" />

      <div className="px-4 md:px-6 pt-4">
        <Tabs value={statusTab} onValueChange={(v) => setStatusTab(v as any)}>
          <TabsList className="rounded-xl">
            <TabsTrigger value="all" className="rounded-lg">All <span className="ml-1.5 text-xs opacity-70">({counts.all})</span></TabsTrigger>
            <TabsTrigger value="pending" className="rounded-lg">Pending <span className="ml-1.5 text-xs opacity-70">({counts.pending})</span></TabsTrigger>
            <TabsTrigger value="confirmed" className="rounded-lg">Confirmed <span className="ml-1.5 text-xs opacity-70">({counts.confirmed})</span></TabsTrigger>
            <TabsTrigger value="cancelled" className="rounded-lg">Cancelled <span className="ml-1.5 text-xs opacity-70">({counts.cancelled})</span></TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <DataTable
        data={filteredAppts}
        searchPlaceholder="Search by patient name..."
        columns={[
          { header: "Patient", accessor: (row: any) => row.patients?.name || "Unknown" },
          { header: "Date", accessor: "date" },
          { header: "Time", accessor: (row: any) => row.time_slot || "—" },
          { header: "Status", accessor: (row: any) => <StatusBadge status={row.status} /> },
          {
            header: "Actions",
            accessor: (row: any) => (
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setViewAppt(row)} title="View"><Eye className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEdit(row)} title="Edit"><Pencil className="w-3.5 h-3.5" /></Button>
                {row.status === "pending" && (
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-success" onClick={() => updateStatus.mutate({ id: row.id, status: "confirmed" })} title="Confirm">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </Button>
                )}
                {row.status !== "cancelled" && (
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-amber-500" onClick={() => updateStatus.mutate({ id: row.id, status: "cancelled" })} title="Cancel">
                    <XCircle className="w-3.5 h-3.5" />
                  </Button>
                )}
                <ConfirmDialog
                  trigger={<Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>}
                  title="Delete Appointment"
                  description="Are you sure? This cannot be undone."
                  confirmLabel="Delete"
                  variant="destructive"
                  onConfirm={() => deleteAppointment.mutate(row.id)}
                />
              </div>
            ),
          },
        ]}
      />

      {/* View Dialog */}
      <Dialog open={!!viewAppt} onOpenChange={() => setViewAppt(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>{viewAppt?.patients?.name || "Unknown"}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Patient:</span><span className="font-medium">{viewAppt?.patients?.name || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Phone:</span><span className="font-medium">{viewAppt?.patients?.phone || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Date:</span><span className="font-medium">{viewAppt?.date || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Time:</span><span className="font-medium">{viewAppt?.time_slot || "—"}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Status:</span><StatusBadge status={viewAppt?.status || ""} /></div>
            {viewAppt?.notes && <div><span className="text-muted-foreground">Notes:</span><p className="mt-1 text-foreground">{viewAppt.notes}</p></div>}
          </div>
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => { setViewAppt(null); openEdit(viewAppt); }}>
              <Pencil className="w-3.5 h-3.5 mr-1" /> Edit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editAppt} onOpenChange={() => setEditAppt(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Appointment</DialogTitle>
            <DialogDescription>{editAppt?.patients?.name || "Unknown"}</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <div><Label className="text-xs">Date</Label><Input type="date" value={editDate} onChange={e => setEditDate(e.target.value)} className="rounded-xl mt-1" /></div>
            <div><Label className="text-xs">Time Slot</Label><Input value={editTime} onChange={e => setEditTime(e.target.value)} placeholder="e.g. 10:00 AM" className="rounded-xl mt-1" /></div>
            <div>
              <Label className="text-xs">Status</Label>
              <select value={editStatus} onChange={e => setEditStatus(e.target.value)} className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm mt-1">
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div><Label className="text-xs">Notes</Label><Textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} className="rounded-xl mt-1" /></div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setEditAppt(null)}><X className="w-3.5 h-3.5 mr-1" /> Cancel</Button>
            <Button variant="hero" size="sm" className="rounded-xl" onClick={handleUpdate} disabled={updateAppointment.isPending}>
              <Save className="w-3.5 h-3.5 mr-1" /> {updateAppointment.isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAppointments;
