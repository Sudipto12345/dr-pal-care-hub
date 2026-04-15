import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { useAppointments, useUpdateAppointmentStatus } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const AdminAppointments = () => {
  const { data: appointments, isLoading } = useAppointments();
  const updateStatus = useUpdateAppointmentStatus();

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-0 animate-fade-in">
      <PageHeader title="Appointments" description="Manage all patient appointments" />
      <DataTable
        data={appointments || []}
        searchPlaceholder="Search by patient name..."
        filterColumn="status"
        filterOptions={["confirmed", "pending", "cancelled"]}
        filterLabel="Status"
        columns={[
          { header: "Patient", accessor: (row: any) => row.patients?.name || "Unknown" },
          { header: "Date", accessor: "date" },
          { header: "Time", accessor: (row: any) => row.time_slot || "—" },
          { header: "Status", accessor: (row: any) => <StatusBadge status={row.status} /> },
          {
            header: "Actions",
            className: "text-right",
            accessor: (row: any) => (
              <div className="flex items-center justify-end gap-1">
                {row.status === "pending" && (
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
                    onClick={() => updateStatus.mutate({ id: row.id, status: "confirmed" })}>
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                )}
                {row.status !== "cancelled" && (
                  <ConfirmDialog
                    trigger={<Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"><XCircle className="w-4 h-4" /></Button>}
                    title="Cancel Appointment"
                    description={`Cancel this appointment?`}
                    confirmLabel="Cancel Appointment"
                    variant="destructive"
                    onConfirm={() => updateStatus.mutate({ id: row.id, status: "cancelled" })}
                  />
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default AdminAppointments;
