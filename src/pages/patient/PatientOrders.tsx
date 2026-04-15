import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { useMyOrders } from "@/hooks/useSupabaseData";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const PatientOrders = () => {
  const { user } = useAuth();
  const { data: orders, isLoading } = useMyOrders(user?.id);

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div>
      <PageHeader title="My Orders" description="Track your product orders" />
      <DataTable
        data={orders || []}
        columns={[
          { header: "Date", accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
          { header: "Items", accessor: (row: any) => `${row.order_items?.length || 0} items` },
          { header: "Total", accessor: (row: any) => `৳${row.total}` },
          { header: "Status", accessor: (row: any) => <StatusBadge status={row.status} /> },
        ]}
      />
    </div>
  );
};

export default PatientOrders;
