import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { useCases } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const AdminCases = () => {
  const { data: cases, isLoading } = useCases();

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-0 animate-fade-in">
      <PageHeader
        title="Case Management"
        description="Track patient cases and treatment progress"
        actions={<Button variant="hero" size="sm" asChild><Link to="/admin/cases/new"><Plus className="w-4 h-4 mr-1" /> New Case</Link></Button>}
      />
      <DataTable
        data={cases || []}
        searchPlaceholder="Search cases..."
        columns={[
          { header: "Patient", accessor: (row: any) => row.patients?.name || "Unknown" },
          { header: "Symptoms", accessor: (row: any) => row.symptoms?.substring(0, 50) || "—" },
          { header: "Date", accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
          { header: "Notes", accessor: (row: any) => row.notes?.substring(0, 40) || "—" },
        ]}
      />
    </div>
  );
};

export default AdminCases;
