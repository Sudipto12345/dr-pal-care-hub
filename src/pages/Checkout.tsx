import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  const delivery = totalPrice >= 500 ? 0 : 60;
  const total = totalPrice + delivery;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <p className="text-muted-foreground mb-4">Your cart is empty</p>
        <Button className="rounded-xl" asChild><Link to="/shop">Go to Shop</Link></Button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.city) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
    setTimeout(() => {
      clearCart();
      navigate(`/order-success?id=${orderId}&total=${total}&city=${encodeURIComponent(form.city)}`);
    }, 1200);
  };

  return (
    <div>
      <section className="page-title-banner">
        <div className="container mx-auto px-4">
          <Link to="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Cart
          </Link>
          <h1>Checkout</h1>
        </div>
      </section>

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-[1fr_380px] gap-8">
              {/* Form */}
              <div className="space-y-6">
                <Card className="border-border/40 rounded-2xl">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-heading font-semibold text-foreground">Delivery Information</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-foreground">Full Name *</label>
                        <Input placeholder="Your full name" className="rounded-xl" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium text-foreground">Phone Number *</label>
                        <Input placeholder="01XXXXXXXXX" className="rounded-xl" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">Full Address *</label>
                      <Input placeholder="House, Road, Area" className="rounded-xl" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">City *</label>
                      <Input placeholder="Dhaka, Bagerhat, etc." className="rounded-xl" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-foreground">Order Notes (optional)</label>
                      <Textarea placeholder="Special instructions..." className="rounded-xl min-h-[80px]" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/40 rounded-2xl">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-semibold text-foreground mb-3">Payment Method</h3>
                    <div className="flex items-center gap-3 p-3 rounded-xl border-2 border-primary bg-primary/5">
                      <CreditCard className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Cash on Delivery</p>
                        <p className="text-xs text-muted-foreground">Pay when you receive your order</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary */}
              <Card className="border-border/40 rounded-2xl h-fit sticky top-20">
                <CardContent className="p-6">
                  <h3 className="font-heading font-semibold text-foreground mb-4">Order Summary</h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground truncate mr-2">{item.name} × {item.quantity}</span>
                        <span className="text-foreground font-medium flex-shrink-0">৳{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span><span>৳{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Delivery</span><span>{delivery === 0 ? "Free" : `৳${delivery}`}</span>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-heading font-bold text-foreground text-lg mb-5">
                    <span>Total</span><span>৳{total}</span>
                  </div>
                  <Button type="submit" className="w-full gradient-primary text-primary-foreground rounded-xl" size="lg" disabled={submitting}>
                    {submitting ? "Placing Order..." : "Place Order"}
                  </Button>

                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <ShieldCheck className="w-3.5 h-3.5 text-secondary" /> Secure & Safe
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <Truck className="w-3.5 h-3.5 text-secondary" /> Fast Delivery
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
