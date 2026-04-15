import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useYoutubeVideos, useCreateYoutubeVideo, useUpdateYoutubeVideo, useDeleteYoutubeVideo } from "@/hooks/useYoutubeVideos";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import DataTable from "@/components/shared/DataTable";
import { Loader2, Trash2, Pencil, Plus, Youtube, ExternalLink } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";

const AdminYoutubeVideos = () => {
  const { data: videos, isLoading } = useYoutubeVideos();
  const createVideo = useCreateYoutubeVideo();
  const updateVideo = useUpdateYoutubeVideo();
  const deleteVideo = useDeleteYoutubeVideo();

  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [youtubeId, setYoutubeId] = useState("");
  const [description, setDescription] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const resetForm = () => { setTitle(""); setYoutubeId(""); setDescription(""); setSortOrder(0); setEditItem(null); };

  // Extract YouTube ID from URL or use raw ID
  const extractYoutubeId = (input: string) => {
    const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : input.trim();
  };

  const handleSubmit = () => {
    if (!title.trim() || !youtubeId.trim()) return;
    const payload = { title, youtube_id: extractYoutubeId(youtubeId), description, sort_order: sortOrder };
    if (editItem) {
      updateVideo.mutate({ id: editItem.id, ...payload }, { onSuccess: () => { setOpen(false); resetForm(); } });
    } else {
      createVideo.mutate(payload, { onSuccess: () => { setOpen(false); resetForm(); } });
    }
  };

  const openEdit = (row: any) => {
    setEditItem(row);
    setTitle(row.title);
    setYoutubeId(row.youtube_id);
    setDescription(row.description || "");
    setSortOrder(row.sort_order);
    setOpen(true);
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;

  const columns = [
    {
      header: "Thumbnail", accessor: (row: any) => (
        <img src={`https://img.youtube.com/vi/${row.youtube_id}/mqdefault.jpg`} alt={row.title} className="w-24 h-14 rounded object-cover" />
      ),
    },
    { header: "Title", accessor: "title" as const, searchable: true },
    { header: "Order", accessor: "sort_order" as const },
    { header: "Status", accessor: (row: any) => <StatusBadge status={row.is_active ? "active" : "inactive"} /> },
    {
      header: "Actions", accessor: (row: any) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" asChild>
            <a href={`https://youtube.com/watch?v=${row.youtube_id}`} target="_blank" rel="noopener"><ExternalLink className="w-4 h-4" /></a>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => openEdit(row)}><Pencil className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" onClick={() => updateVideo.mutate({ id: row.id, is_active: !row.is_active })}>
            {row.is_active ? "🔴" : "🟢"}
          </Button>
          <ConfirmDialog title="Delete video?" description="This action cannot be undone." onConfirm={() => deleteVideo.mutate(row.id)}>
            <Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-destructive" /></Button>
          </ConfirmDialog>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="YouTube Videos" description="Manage YouTube video showcase">
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-1" /> Add Video</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>{editItem ? "Edit" : "Add"} Video</DialogTitle></DialogHeader>
            <div className="space-y-3 mt-2">
              <div><Label>Title</Label><Input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
              <div><Label>YouTube URL or Video ID</Label><Input value={youtubeId} onChange={(e) => setYoutubeId(e.target.value)} placeholder="https://youtube.com/watch?v=..." /></div>
              <div><Label>Description</Label><Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} /></div>
              <div><Label>Sort Order</Label><Input type="number" value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} /></div>
              <Button onClick={handleSubmit} className="w-full" disabled={createVideo.isPending || updateVideo.isPending}>
                {(createVideo.isPending || updateVideo.isPending) && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
                {editItem ? "Update" : "Add"} Video
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </PageHeader>
      <DataTable columns={columns} data={videos || []} searchPlaceholder="Search videos..." />
    </div>
  );
};

export default AdminYoutubeVideos;
