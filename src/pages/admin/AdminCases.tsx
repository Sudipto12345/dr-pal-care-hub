import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockCases } from "@/data/mockData";

const AdminCases = () => (
  <div>
    <PageHeader title="Case Management" description="Track patient cases and progress" />
    <DataTable
      data={mockCases}
      columns={[
        { header: "ID", accessor: "id" },
        { header: "Patient", accessor: "patientName" },
        { header: "Condition", accessor: "condition" },
        { header: "Start Date", accessor: "startDate" },
        { header: "Visits", accessor: (row) => String(row.visits) },
        { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
      ]}
    />
  </div>
);

export default AdminCases;
