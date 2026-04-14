import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import AddPatientForm from "@/components/forms/AddPatientForm";
import { mockPatients } from "@/data/mockData";

const AdminPatients = () => (
  <div>
    <PageHeader
      title="Patients"
      description="Manage patient records"
      actions={<AddPatientForm />}
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
