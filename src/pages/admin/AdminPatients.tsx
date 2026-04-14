import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockPatients } from "@/data/mockData";

const AdminPatients = () => (
  <div>
    <PageHeader
      title="Patients"
      description="Manage patient records"
      actions={<Button variant="hero" size="sm"><Plus className="w-4 h-4 mr-1" /> Add Patient</Button>}
    />
    <DataTable
      data={mockPatients}
      columns={[
        { header: "ID", accessor: "id" },
        { header: "Name", accessor: "name" },
        { header: "Age", accessor: (row) => `${row.age}y` },
        { header: "Gender", accessor: "gender" },
        { header: "Phone", accessor: "phone" },
        { header: "Last Visit", accessor: "lastVisit" },
        { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
      ]}
    />
  </div>
);

export default AdminPatients;
