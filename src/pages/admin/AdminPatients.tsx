import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import AddPatientForm from "@/components/forms/AddPatientForm";
import { usePatients, useDeletePatient } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Loader2 } from "lucide-react";

const AdminPatients = () => {
  const { data: patients, isLoading } = usePatients();
  const deletePatient = useDeletePatient();

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-0 animate-fade-in">
      <PageHeader title="Patients" description="Manage patient records" actions={<AddPatientForm />} />
      <DataTable
        data={patients || []}
        searchPlaceholder="Search patients..."
        columns={[
          { header: "Name", accessor: "name" },
          { header: "Age", accessor: (row: any) => row.age ? `${row.age}y` : "—" },
          { header: "Gender", accessor: (row: any) => row.gender || "—" },
          { header: "Phone", accessor: (row: any) => row.phone || "—" },
          { header: "Email", accessor: (row: any) => row.email || "—" },
          {
            header: "Actions",
            className: "text-right",
            accessor: (row: any) => (
              <ConfirmDialog
                trigger={<Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>}
                title="Delete Patient"
                description={`Are you sure you want to delete ${row.name}? This cannot be undone.`}
                confirmLabel="Delete"
                variant="destructive"
                onConfirm={() => deletePatient.mutate(row.id)}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default AdminPatients;
