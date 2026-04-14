import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockCases } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const AdminCases = () => (
  <div className="space-y-0 animate-fade-in">
    <PageHeader
      title="Case Management"
      description="Track patient cases and treatment progress"
      actions={<Button variant="hero" size="sm" asChild><Link to="/admin/cases/new"><Plus className="w-4 h-4 mr-1" /> New Case</Link></Button>}
    />
    <DataTable
      data={mockCases}
      searchPlaceholder="Search cases..."
      filterColumn="status"
      filterOptions={["Ongoing", "Improving", "Resolved"]}
      filterLabel="Status"
      columns={[
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
