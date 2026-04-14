import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import NewAppointmentForm from "@/components/forms/NewAppointmentForm";
import { mockAppointments } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const AdminAppointments = () => (
  <div className="space-y-0 animate-fade-in">
    <PageHeader
      title="Appointments"
      description="Manage all patient appointments"
      actions={<NewAppointmentForm />}
    />
    <DataTable
      data={mockAppointments}
      searchPlaceholder="Search by patient name..."
      filterColumn="status"
      filterOptions={["Confirmed", "Completed", "Pending", "Cancelled"]}
      filterLabel="Status"
      columns={[
        { header: "Patient", accessor: "patientName" },
        { header: "Date", accessor: "date" },
        { header: "Time", accessor: "time" },
        { header: "Type", accessor: "type" },
        { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
        {
          header: "Actions",
          className: "text-right",
          accessor: (row) => (
            <div className="flex items-center justify-end gap-1">
              {row.status === "Confirmed" && (
                <ConfirmDialog
                  trigger={<Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success hover:bg-success/10"><CheckCircle className="w-4 h-4" /></Button>}
                  title="Mark as Completed"
                  description={`Mark ${row.patientName}'s appointment on ${row.date} as completed?`}
                  confirmLabel="Complete"
                  onConfirm={() => toast.success(`Appointment completed for ${row.patientName}`)}
                />
              )}
              <ConfirmDialog
                trigger={<Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"><XCircle className="w-4 h-4" /></Button>}
                title="Cancel Appointment"
                description={`Cancel ${row.patientName}'s appointment on ${row.date} at ${row.time}?`}
                confirmLabel="Cancel Appointment"
                variant="destructive"
                onConfirm={() => toast.success(`Appointment cancelled for ${row.patientName}`)}
              />
            </div>
          ),
        },
      ]}
    />
  </div>
);

export default AdminAppointments;
