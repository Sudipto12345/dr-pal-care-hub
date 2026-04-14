import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockOrders } from "@/data/mockData";

const PatientOrders = () => (
  <div>
    <PageHeader title="My Orders" description="Track your product orders" />
    <DataTable
      data={mockOrders}
      columns={[
        { header: "Order ID", accessor: "id" },
        { header: "Date", accessor: "date" },
        { header: "Items", accessor: (row) => row.items.join(", ") },
        { header: "Total", accessor: (row) => `₹${row.total}` },
        { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
      ]}
    />
  </div>
);

export default PatientOrders;
