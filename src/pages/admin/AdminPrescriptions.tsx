import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockPrescriptions } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Eye, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const AdminPrescriptions = () => (
  <div className="space-y-0 animate-fade-in">
    <PageHeader
      title="Prescriptions"
      description="Manage patient prescriptions"
      actions={<Button variant="hero" size="sm" asChild><Link to="/admin/prescriptions/new"><Plus className="w-4 h-4 mr-1" /> New Prescription</Link></Button>}
    />
    <DataTable
      data={mockPrescriptions}
      searchPlaceholder="Search prescriptions..."
      filterColumn="status"
      filterOptions={["Active", "Completed"]}
      filterLabel="Status"
      columns={[
        { header: "Patient", accessor: "patientName" },
        { header: "Date", accessor: "date" },
        { header: "Diagnosis", accessor: "diagnosis" },
        { header: "Medicines", accessor: (row) => (
          <span className="text-xs text-muted-foreground">{row.medicines.length} medicines</span>
        )},
        { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
        {
          header: "Actions",
          className: "text-right",
          accessor: (row) => (
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted" asChild>
              <Link to={`/prescription/${row.id}`}><Eye className="w-4 h-4" /></Link>
            </Button>
          ),
        },
      ]}
    />
  </div>
);

export default AdminPrescriptions;
