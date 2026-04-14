import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockPrescriptions } from "@/data/mockData";

const AdminPrescriptions = () => (
  <div>
    <PageHeader
      title="Prescriptions"
      description="Manage patient prescriptions"
      actions={<Button variant="hero" size="sm"><Plus className="w-4 h-4 mr-1" /> New Prescription</Button>}
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
