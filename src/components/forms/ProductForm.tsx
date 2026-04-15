import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Loader2 } from "lucide-react";
import { useCreateProduct } from "@/hooks/useSupabaseData";

const ProductForm = ({ trigger }: { trigger?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", price: "", stock: "", description: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const createProduct = useCreateProduct();

  const set = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.price.trim() || isNaN(Number(form.price)) || Number(form.price) <= 0) e.price = "Valid price required";
    if (!form.stock.trim() || isNaN(Number(form.stock)) || Number(form.stock) < 0) e.stock = "Valid stock required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    createProduct.mutate(
      { name: form.name, slug, price: Number(form.price), stock: Number(form.stock), category: form.category || undefined, description: form.description || undefined },
      { onSuccess: () => { setForm({ name: "", category: "", price: "", stock: "", description: "" }); setErrors({}); setOpen(false); } }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="hero" size="sm"><Plus className="w-4 h-4 mr-1" /> Add Product</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader><DialogTitle className="font-heading text-xl">Add Product</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label>Product Name *</Label>
            <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Arnica Montana 30C" className="mt-1 rounded-xl" />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label>Category</Label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)} className="mt-1 w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
              <option value="">Select</option>
              <option>Remedy</option><option>Kit</option><option>Tincture</option><option>Supplement</option><option>Book</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Price (৳) *</Label>
              <Input value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="150" className="mt-1 rounded-xl" />
              {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
            </div>
            <div>
              <Label>Stock *</Label>
              <Input value={form.stock} onChange={(e) => set("stock", e.target.value)} placeholder="45" className="mt-1 rounded-xl" />
              {errors.stock && <p className="text-xs text-destructive mt-1">{errors.stock}</p>}
            </div>
          </div>
          <div>
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Brief description..." className="mt-1 rounded-xl" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-xl">Cancel</Button>
            <Button type="submit" variant="hero" disabled={createProduct.isPending}>
              {createProduct.isPending && <Loader2 className="w-4 h-4 animate-spin mr-1" />} Add Product
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
