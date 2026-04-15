import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { useBlogPosts, useCreateBlogPost, useDeleteBlogPost } from "@/hooks/useSupabaseData";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Loader2, Trash2 } from "lucide-react";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AdminBlog = () => {
  const { data: posts, isLoading } = useBlogPosts();
  const createPost = useCreateBlogPost();
  const deletePost = useDeleteBlogPost();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [published, setPublished] = useState(false);

  const handleCreate = () => {
    if (!title.trim()) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    createPost.mutate({ title, slug, content, excerpt, published, author_id: user?.id }, {
      onSuccess: () => { setOpen(false); setTitle(""); setContent(""); setExcerpt(""); setPublished(false); },
    });
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-0 animate-fade-in">
      <PageHeader
        title="Blog Posts"
        description="Manage blog content and articles"
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-xl gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-1" /> New Post</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>New Blog Post</DialogTitle></DialogHeader>
              <div className="space-y-4">
                <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" className="rounded-xl mt-1" /></div>
                <div><Label>Excerpt</Label><Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary" className="rounded-xl mt-1" /></div>
                <div><Label>Content</Label><Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post..." className="rounded-xl mt-1 min-h-[120px]" /></div>
                <div className="flex items-center gap-2"><Switch checked={published} onCheckedChange={setPublished} /><Label>Publish immediately</Label></div>
                <Button onClick={handleCreate} disabled={createPost.isPending} className="w-full gradient-primary text-primary-foreground rounded-xl">
                  {createPost.isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />} Create Post
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />
      <DataTable
        data={posts || []}
        searchPlaceholder="Search posts..."
        columns={[
          { header: "Title", accessor: "title" },
          { header: "Date", accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
          { header: "Status", accessor: (row: any) => <StatusBadge status={row.published ? "Published" : "Draft"} /> },
          {
            header: "Actions",
            className: "text-right",
            accessor: (row: any) => (
              <ConfirmDialog
                trigger={<Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>}
                title="Delete Post"
                description={`Delete "${row.title}"?`}
                confirmLabel="Delete"
                variant="destructive"
                onConfirm={() => deletePost.mutate(row.id)}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default AdminBlog;
