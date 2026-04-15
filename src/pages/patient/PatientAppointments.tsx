import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { useMyAppointments } from "@/hooks/useSupabaseData";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const PatientAppointments = () => {
  const { user } = useAuth();
  const { data: appointments, isLoading } = useMyAppointments(user?.id);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div>
      <PageHeader title="My Appointments" description="View and manage your appointments"
        actions={<Button variant="hero" size="sm" asChild><Link to="/book-appointment"><Plus className="w-4 h-4 mr-1" /> Book New</Link></Button>} />
      <DataTable
        data={appointments || []}
        columns={[
          { header: "Date", accessor: "date" },
          { header: "Time", accessor: (row: any) => row.time_slot || "—" },
          { header: "Notes", accessor: (row: any) => row.notes || "—" },
          { header: "Status", accessor: (row: any) => <StatusBadge status={row.status} /> },
        ]}
      />
    </div>
  );
};

export default PatientAppointments;
