import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { mockProducts } from "@/data/mockData";

const Shop = () => (
  <div>
    <section className="page-title-banner">
      <div className="container mx-auto px-4 text-center">
        <h1>Homeopathic Shop</h1>
        <p>Quality remedies and wellness products</p>
      </div>
    </section>
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.map((p) => (
            <Card key={p.id} className="border-border rounded-2xl hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-full h-40 rounded-xl bg-accent/50 flex items-center justify-center mb-4">
                  <span className="text-4xl">🌿</span>
                </div>
                <span className="text-xs font-medium text-secondary bg-accent px-2 py-1 rounded-full">{p.category}</span>
                <h3 className="font-heading font-semibold text-foreground mt-2 mb-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-heading font-bold text-lg text-foreground">₹{p.price}</span>
                  <Button variant="hero" size="sm"><ShoppingCart className="w-4 h-4 mr-1" /> Add</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Shop;
