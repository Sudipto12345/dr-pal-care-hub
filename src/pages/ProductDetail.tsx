import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, ArrowLeft, CheckCircle, Truck, ShieldCheck, Package, Loader2 } from "lucide-react";
import { useProduct } from "@/hooks/useSupabaseData";
import { useCart } from "@/hooks/useCart";
import PageHero from "@/components/shared/PageHero";
import heroShop from "@/assets/hero-shop.jpg";

const ProductDetail = () => {
  const { slug } = useParams();
  const { data: product, isLoading } = useProduct(slug || "");
  const { addItem, setIsOpen } = useCart();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Package className="w-12 h-12 text-muted-foreground/30 mb-3" />
        <h2 className="font-heading text-xl font-bold text-foreground mb-2">Product Not Found</h2>
        <Button variant="outline" className="rounded-xl mt-2" asChild>
          <Link to="/shop"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const outOfStock = product.stock === 0;

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, category: product.category || "" });
  };

  const handleBuyNow = () => {
    handleAdd();
    setIsOpen(true);
  };

  return (
    <div>
      <PageHero title={product.name} subtitle={product.category || "Product"} bgImage={heroShop} icon={<Package className="w-7 h-7 text-white" />} />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Button variant="ghost" size="sm" className="mb-6 text-muted-foreground" asChild>
            <Link to="/shop"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Shop</Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-14">
            <div className="rounded-2xl overflow-hidden border border-border/40 bg-accent/10">
              <img
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>

            <div className="space-y-5">
              <div>
                {product.category && (
                  <Badge className="bg-secondary/10 text-secondary border-0 text-xs mb-2">{product.category}</Badge>
                )}
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{product.name}</h2>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="font-heading text-3xl font-bold text-foreground">৳{product.price}</span>
              </div>

              <p className="text-muted-foreground text-[15px] leading-relaxed">{product.description}</p>

              <div className="text-sm text-muted-foreground">
                Stock: <span className={outOfStock ? "text-destructive font-medium" : "text-secondary font-medium"}>{outOfStock ? "Out of Stock" : `${product.stock} available`}</span>
              </div>

              <Separator />

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  className="gradient-primary text-primary-foreground rounded-xl flex-1"
                  disabled={outOfStock}
                  onClick={handleAdd}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" /> {outOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-xl flex-1 border-primary text-primary hover:bg-primary/5"
                  disabled={outOfStock}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { icon: Truck, label: "Free Delivery", sub: "Orders over ৳500" },
                  { icon: ShieldCheck, label: "100% Genuine", sub: "Certified products" },
                  { icon: Package, label: "Easy Returns", sub: "7-day return policy" },
                ].map((t) => (
                  <div key={t.label} className="text-center p-3 rounded-xl bg-accent/30 border border-border/30">
                    <t.icon className="w-4 h-4 text-secondary mx-auto mb-1" />
                    <p className="text-[10px] font-medium text-foreground">{t.label}</p>
                    <p className="text-[9px] text-muted-foreground">{t.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
