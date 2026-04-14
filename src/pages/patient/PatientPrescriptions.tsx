import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockPrescriptions } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

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
        {
          header: "",
          accessor: (row) => (
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <Link to={`/prescription/${row.id}`}><Eye className="w-4 h-4" /></Link>
            </Button>
          ),
        },
      ]}
    />
  </div>
);

export default PatientPrescriptions;
