import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import AddPatientForm from "@/components/forms/AddPatientForm";
import { mockPatients } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import { toast } from "sonner";

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
        {
          header: "Actions",
          accessor: (row) => (
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.info(`Viewing ${row.name}`)}>
                <Eye className="w-4 h-4" />
              </Button>
              <ConfirmDialog
                trigger={<Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>}
                title="Delete Patient"
                description={`Are you sure you want to delete ${row.name}? This action cannot be undone and will remove all associated records.`}
                confirmLabel="Delete"
                variant="destructive"
                onConfirm={() => toast.success(`${row.name} deleted`)}
              />
            </div>
          ),
        },
      ]}
    />
  </div>
);

export default AdminPatients;
