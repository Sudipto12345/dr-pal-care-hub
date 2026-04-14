import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockPrescriptions } from "@/data/mockData";

const PatientPrescriptions = () => (
  <div>
    <PageHeader title="My Prescriptions" description="View your treatment history" />
    <DataTable
      data={mockPrescriptions}
      columns={[
        { header: "ID", accessor: "id" },
        { header: "Date", accessor: "date" },
        { header: "Diagnosis", accessor: "diagnosis" },
        { header: "Medicines", accessor: (row) => row.medicines.join(", ") },
        { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
      ]}
    />
  </div>
);

export default PatientPrescriptions;
