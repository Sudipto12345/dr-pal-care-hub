import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import NewAppointmentForm from "@/components/forms/NewAppointmentForm";
import { mockAppointments } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const AdminAppointments = () => (
  <div>
    <PageHeader
      title="Appointments"
      description="Manage all appointments"
      actions={<NewAppointmentForm />}
    />
    <DataTable
      data={mockAppointments}
      columns={[
        { header: "ID", accessor: "id" },
        { header: "Patient", accessor: "patientName" },
        { header: "Date", accessor: "date" },
        { header: "Time", accessor: "time" },
        { header: "Type", accessor: "type" },
        { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
        {
          header: "Actions",
          accessor: (row) => (
            <div className="flex items-center gap-1">
              {row.status === "Confirmed" && (
                <ConfirmDialog
                  trigger={<Button variant="ghost" size="icon" className="h-8 w-8 text-secondary"><CheckCircle className="w-4 h-4" /></Button>}
                  title="Mark as Completed"
                  description={`Mark ${row.patientName}'s appointment on ${row.date} as completed?`}
                  confirmLabel="Complete"
                  onConfirm={() => toast.success(`Appointment completed for ${row.patientName}`)}
                />
              )}
              <ConfirmDialog
                trigger={<Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"><XCircle className="w-4 h-4" /></Button>}
                title="Cancel Appointment"
                description={`Cancel ${row.patientName}'s appointment on ${row.date} at ${row.time}? The patient will need to rebook.`}
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
