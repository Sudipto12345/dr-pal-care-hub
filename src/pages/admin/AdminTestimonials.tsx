import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useTestimonials, useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial } from "@/hooks/useTestimonials";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import DataTable from "@/components/shared/DataTable";
import { Loader2, Trash2, Pencil, Plus, Star } from "lucide-react";
import StatusBadge from "@/components/shared/StatusBadge";

const AdminTestimonials = () => {
  const { data: testimonials, isLoading } = useTestimonials();
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  const resetForm = () => { setName(""); setLocation(""); setText(""); setRating(5); setEditItem(null); };

  const handleSubmit = () => {
    if (!name.trim() || !text.trim()) return;
    const payload = { name, location, text, rating };
    if (editItem) {
      updateTestimonial.mutate({ id: editItem.id, ...payload }, { onSuccess: () => { setOpen(false); resetForm(); } });
    } else {
      createTestimonial.mutate(payload, { onSuccess: () => { setOpen(false); resetForm(); } });
    }
  };

  const openEdit = (row: any) => {
    setEditItem(row);
    setName(row.name);
    setLocation(row.location || "");
    setText(row.text);
    setRating(row.rating);
    setOpen(true);
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;

  const columns = [
    { header: "Name", accessor: "name" as const, searchable: true },
    { header: "Location", accessor: "location" as const },
    { header: "Rating", accessor: (row: any) => <div className="flex gap-0.5">{Array.from({ length: row.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-warning text-warning" />)}</div> },
    { header: "Status", accessor: (row: any) => <StatusBadge status={row.is_active ? "active" : "inactive"} /> },
    {
      header: "Actions", accessor: (row: any) => (
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => openEdit(row)}><Pencil className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" onClick={() => updateTestimonial.mutate({ id: row.id, is_active: !row.is_active })}>
            {row.is_active ? "🔴" : "🟢"}
          </Button>
          <ConfirmDialog trigger={<Button variant="ghost" size="icon"><Trash2 className="w-4 h-4 text-destructive" /></Button>} title="Delete testimonial?" description="This action cannot be undone." onConfirm={() => deleteTestimonial.mutate(row.id)} />
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Testimonials"
        description="Manage patient testimonials"
        actions={
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-1" /> Add Testimonial</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{editItem ? "Edit" : "Add"} Testimonial</DialogTitle></DialogHeader>
              <div className="space-y-3 mt-2">
                <div><Label>Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
                <div><Label>Location</Label><Input value={location} onChange={(e) => setLocation(e.target.value)} /></div>
                <div><Label>Review Text</Label><Textarea value={text} onChange={(e) => setText(e.target.value)} rows={4} /></div>
                <div><Label>Rating (1-5)</Label><Input type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} /></div>
                <Button onClick={handleSubmit} className="w-full" disabled={createTestimonial.isPending || updateTestimonial.isPending}>
                  {(createTestimonial.isPending || updateTestimonial.isPending) && <Loader2 className="w-4 h-4 mr-1 animate-spin" />}
                  {editItem ? "Update" : "Add"} Testimonial
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        }
      />
      <DataTable columns={columns} data={testimonials || []} searchPlaceholder="Search testimonials..." />
    </div>
  );
};

export default AdminTestimonials;
