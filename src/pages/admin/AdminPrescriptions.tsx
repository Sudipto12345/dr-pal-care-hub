import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import NewPrescriptionForm from "@/components/forms/NewPrescriptionForm";
import { mockPrescriptions } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

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
        {
          header: "Actions",
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

export default AdminPrescriptions;
