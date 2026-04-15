import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import StatusBadge from "@/components/shared/StatusBadge";
import { useBlogPosts, useCreateBlogPost, useUpdateBlogPost, useDeleteBlogPost } from "@/hooks/useSupabaseData";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Loader2, Trash2, Pencil } from "lucide-react";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const BlogFormDialog = ({ trigger, editData, onDone }: {
  trigger: React.ReactNode;
  editData?: any;
  onDone?: () => void;
}) => {
  const { user } = useAuth();
  const createPost = useCreateBlogPost();
  const updatePost = useUpdateBlogPost();
  const isEdit = !!editData;
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [published, setPublished] = useState(false);

  useEffect(() => {
    if (editData && open) {
      setTitle(editData.title || "");
      setContent(editData.content || "");
      setExcerpt(editData.excerpt || "");
      setImageUrl(editData.image_url || "");
      setPublished(editData.published ?? false);
    }
  }, [editData, open]);

  const reset = () => { setTitle(""); setContent(""); setExcerpt(""); setImageUrl(""); setPublished(false); };
  const handleClose = () => { setOpen(false); if (!isEdit) reset(); onDone?.(); };

  const handleSubmit = () => {
    if (!title.trim()) return;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (isEdit) {
      updatePost.mutate({ id: editData.id, title, slug, content, excerpt, image_url: imageUrl || undefined, published }, { onSuccess: handleClose });
    } else {
      createPost.mutate({ title, slug, content, excerpt, image_url: imageUrl || undefined, published, author_id: user?.id }, { onSuccess: () => { reset(); handleClose(); } });
    }
  };

  const isPending = isEdit ? updatePost.isPending : createPost.isPending;

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) handleClose(); else setOpen(true); }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader><DialogTitle className="font-heading text-xl">{isEdit ? "Edit Post" : "New Blog Post"}</DialogTitle></DialogHeader>
        <div className="space-y-4 mt-2">
          <div><Label>Title *</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" className="rounded-xl mt-1" /></div>
          <div><Label>Excerpt</Label><Input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary" className="rounded-xl mt-1" /></div>
          <div><Label>Image URL</Label><Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="rounded-xl mt-1" /></div>
          <div><Label>Content</Label><Textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post..." className="rounded-xl mt-1 min-h-[120px]" /></div>
          <div className="flex items-center gap-2"><Switch checked={published} onCheckedChange={setPublished} /><Label>{published ? "Published" : "Draft"}</Label></div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" className="rounded-xl" onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} disabled={isPending} className="gradient-primary text-primary-foreground rounded-xl">
              {isPending && <Loader2 className="w-4 h-4 animate-spin mr-1" />} {isEdit ? "Update" : "Create Post"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const AdminBlog = () => {
  const { data: posts, isLoading } = useBlogPosts();
  const deletePost = useDeleteBlogPost();

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-0 animate-fade-in">
      <PageHeader
        title="Blog Posts"
        description="Manage blog content and articles"
        actions={
          <BlogFormDialog trigger={<Button size="sm" className="rounded-xl gradient-primary text-primary-foreground"><Plus className="w-4 h-4 mr-1" /> New Post</Button>} />
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
            accessor: (row: any) => (
              <div className="flex gap-1">
                <BlogFormDialog
                  editData={row}
                  trigger={<Button variant="ghost" size="icon" className="h-7 w-7" title="Edit"><Pencil className="w-3.5 h-3.5" /></Button>}
                />
                <ConfirmDialog
                  trigger={<Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>}
                  title="Delete Post"
                  description={`Delete "${row.title}"?`}
                  confirmLabel="Delete"
                  variant="destructive"
                  onConfirm={() => deletePost.mutate(row.id)}
                />
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default AdminBlog;
