import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

const products = [
  { id: 1, name: "Arnica Montana 30C", category: "Remedy", price: 150, desc: "For bruises, sprains, and muscle soreness" },
  { id: 2, name: "Nux Vomica 200C", category: "Remedy", price: 180, desc: "For digestive issues and stress-related complaints" },
  { id: 3, name: "Bryonia Alba 30C", category: "Remedy", price: 150, desc: "For joint pain and dry cough" },
  { id: 4, name: "Immunity Booster Kit", category: "Kit", price: 599, desc: "Complete kit for building natural immunity" },
  { id: 5, name: "Allergy Relief Kit", category: "Kit", price: 499, desc: "Natural remedies for seasonal allergies" },
  { id: 6, name: "Stress Relief Drops", category: "Tincture", price: 350, desc: "Bach flower remedy for anxiety and stress" },
];

const Shop = () => (
  <div>
    <section className="gradient-hero text-primary-foreground py-16 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Homeopathic Shop</h1>
        <p className="text-primary-foreground/70 max-w-lg mx-auto">Quality remedies and wellness products</p>
      </div>
    </section>
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <Card key={p.id} className="border-border rounded-2xl hover:shadow-card transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-full h-40 rounded-xl bg-accent/50 flex items-center justify-center mb-4">
                  <span className="text-4xl">🌿</span>
                </div>
                <span className="text-xs font-medium text-secondary bg-accent px-2 py-1 rounded-full">{p.category}</span>
                <h3 className="font-heading font-semibold text-foreground mt-2 mb-1">{p.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{p.desc}</p>
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
