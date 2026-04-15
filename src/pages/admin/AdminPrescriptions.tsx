import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { usePrescriptions, useDeletePrescription } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Eye, Plus, Loader2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

const AdminPrescriptions = () => {
  const { data: prescriptions, isLoading } = usePrescriptions();
  const deletePrescription = useDeletePrescription();

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-0 animate-fade-in">
      <PageHeader
        title="Prescriptions"
        description="Manage patient prescriptions"
        actions={<Button variant="hero" size="sm" asChild><Link to="/admin/prescriptions/new"><Plus className="w-4 h-4 mr-1" /> New Prescription</Link></Button>}
      />
      <DataTable
        data={prescriptions || []}
        searchPlaceholder="Search prescriptions..."
        columns={[
          { header: "Patient", accessor: (row: any) => row.patients?.name || "Unknown" },
          { header: "Date", accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
          { header: "Diagnosis", accessor: (row: any) => row.diagnosis || "—" },
          { header: "Medicines", accessor: (row: any) => <span className="text-xs text-muted-foreground">{row.prescription_items?.length || 0} medicines</span> },
          {
            header: "Actions",
            accessor: (row: any) => (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" asChild title="View">
                  <Link to={`/prescription/${row.id}`}><Eye className="w-3.5 h-3.5" /></Link>
                </Button>
                <ConfirmDialog
                  trigger={<Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>}
                  title="Delete Prescription"
                  description="Are you sure? This will also delete all medicine items."
                  confirmLabel="Delete"
                  variant="destructive"
                  onConfirm={() => deletePrescription.mutate(row.id)}
                />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default AdminPrescriptions;
