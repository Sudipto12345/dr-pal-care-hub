import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockBlogPosts } from "@/data/mockData";

const AdminBlog = () => (
  <div>
    <PageHeader
      title="Blog Posts"
      description="Manage blog content"
      actions={<Button variant="hero" size="sm"><Plus className="w-4 h-4 mr-1" /> New Post</Button>}
    />
    <DataTable
      data={mockBlogPosts}
      columns={[
        { header: "Title", accessor: "title" },
        { header: "Category", accessor: "category" },
        { header: "Date", accessor: "date" },
        { header: "Views", accessor: (row) => String(row.views) },
        { header: "Status", accessor: (row) => <StatusBadge status={row.status} /> },
      ]}
    />
  </div>
);

export default AdminBlog;
