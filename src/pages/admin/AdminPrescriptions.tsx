import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import NewPrescriptionForm from "@/components/forms/NewPrescriptionForm";
import { mockPrescriptions } from "@/data/mockData";

const AdminPrescriptions = () => (
  <div>
    <PageHeader
      title="Prescriptions"
      description="Manage patient prescriptions"
      actions={<NewPrescriptionForm />}
    />
    <DataTable
      data={mockPrescriptions}
      columns={[
        { header: "ID", accessor: "id" },
        { header: "Patient", accessor: "patientName" },
        { header: "Date", accessor: "date" },
        { header: "Diagnosis", accessor: "diagnosis" },
        { header: "Medicines", accessor: (row) => row.medicines.join(", ") },
        { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
      ]}
    />
  </div>
);

export default AdminPrescriptions;
