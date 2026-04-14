import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import NewAppointmentForm from "@/components/forms/NewAppointmentForm";
import { mockAppointments } from "@/data/mockData";

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
      ]}
    />
  </div>
);

export default AdminAppointments;
