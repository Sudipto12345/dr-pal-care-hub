import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { usePrescriptions } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Eye, Plus, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const AdminPrescriptions = () => {
  const { data: prescriptions, isLoading } = usePrescriptions();

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
            className: "text-right",
            accessor: (row: any) => (
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted" asChild>
                <Link to={`/prescription/${row.id}`}><Eye className="w-4 h-4" /></Link>
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
};

export default AdminPrescriptions;
