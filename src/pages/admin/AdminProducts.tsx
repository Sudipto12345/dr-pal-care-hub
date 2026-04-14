import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockProducts } from "@/data/mockData";

const AdminProducts = () => (
  <div>
    <PageHeader
      title="Products"
      description="Manage shop inventory"
      actions={<Button variant="hero" size="sm"><Plus className="w-4 h-4 mr-1" /> Add Product</Button>}
    />
    <DataTable
      data={mockProducts}
      columns={[
        { header: "ID", accessor: "id" },
        { header: "Name", accessor: "name" },
        { header: "Category", accessor: "category" },
        { header: "Price", accessor: (row) => `₹${row.price}` },
        { header: "Stock", accessor: (row) => String(row.stock) },
        { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
      ]}
    />
  </div>
);

export default AdminProducts;
