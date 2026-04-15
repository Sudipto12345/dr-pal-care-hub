import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { usePrescriptions } from "@/hooks/useSupabaseData";

const PatientPrescriptions = () => {
  const { data: prescriptions, isLoading } = usePrescriptions();

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div>
      <PageHeader title="My Prescriptions" description="View your treatment history" />
      <DataTable
        data={prescriptions || []}
        columns={[
          { header: "Date", accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
          { header: "Diagnosis", accessor: (row: any) => row.diagnosis || "—" },
          { header: "Medicines", accessor: (row: any) => `${row.prescription_items?.length || 0} medicines` },
          {
            header: "",
            accessor: (row: any) => (
              <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                <Link to={`/prescription/${row.id}`}><Eye className="w-4 h-4" /></Link>
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
};

export default PatientPrescriptions;
