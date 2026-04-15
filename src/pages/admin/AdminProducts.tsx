import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import ProductForm from "@/components/forms/ProductForm";
import { useProducts, useDeleteProduct } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

const AdminProducts = () => {
  const { data: products, isLoading } = useProducts();
  const deleteProduct = useDeleteProduct();

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-0 animate-fade-in">
      <PageHeader title="Products" description="Manage shop inventory" actions={<ProductForm />} />
      <DataTable
        data={products || []}
        searchPlaceholder="Search products..."
        columns={[
          { header: "Name", accessor: "name" },
          { header: "Category", accessor: (row: any) => row.category || "—" },
          { header: "Price", accessor: (row: any) => `৳${row.price}` },
          { header: "Stock", accessor: (row: any) => String(row.stock) },
          { header: "Active", accessor: (row: any) => <StatusBadge status={row.is_active ? "Active" : "Inactive"} /> },
          {
            header: "Actions",
            className: "text-right",
            accessor: (row: any) => (
              <ConfirmDialog
                trigger={<Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>}
                title="Delete Product"
                description={`Delete ${row.name}?`}
                confirmLabel="Delete"
                variant="destructive"
                onConfirm={() => deleteProduct.mutate(row.id)}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default AdminProducts;
