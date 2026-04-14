import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockAppointments } from "@/data/mockData";
import { Link } from "react-router-dom";

const PatientAppointments = () => (
  <div>
    <PageHeader
      title="My Appointments"
      description="View and manage your appointments"
      actions={<Button variant="hero" size="sm" asChild><Link to="/book-appointment"><Plus className="w-4 h-4 mr-1" /> Book New</Link></Button>}
    />
    <DataTable
      data={mockAppointments}
      columns={[
        { header: "Date", accessor: "date" },
        { header: "Time", accessor: "time" },
        { header: "Type", accessor: "type" },
        { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
      ]}
    />
  </div>
);

export default PatientAppointments;
