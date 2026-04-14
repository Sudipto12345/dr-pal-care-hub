import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, ShoppingBag, Star } from "lucide-react";
import { mockProducts } from "@/data/mockData";
import { useCart } from "@/hooks/useCart";

const categories = ["All", ...Array.from(new Set(mockProducts.map((p) => p.category)))];

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const { addItem, totalItems, setIsOpen } = useCart();

  const filtered = mockProducts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      <section className="page-title-banner">
        <div className="container mx-auto px-4 text-center">
          <h1>Homeopathic Shop</h1>
          <p>Quality remedies and wellness products</p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="container mx-auto px-4">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Button
                  key={c}
                  variant={activeCategory === c ? "default" : "outline"}
                  size="sm"
                  className="rounded-full text-xs"
                  onClick={() => setActiveCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-56">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  className="pl-9 rounded-xl"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="relative rounded-xl" onClick={() => setIsOpen(true)}>
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No products found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <Card key={p.id} className="group border-border/60 rounded-2xl hover-lift overflow-hidden bg-card">
                  <div className="aspect-square bg-accent/40 flex items-center justify-center relative overflow-hidden">
                    <span className="text-5xl group-hover:scale-110 transition-transform duration-500">🌿</span>
                    <Badge className="absolute top-3 left-3 bg-secondary/90 text-secondary-foreground text-[10px] border-0">
                      {p.category}
                    </Badge>
                    {p.stock < 10 && (
                      <Badge variant="destructive" className="absolute top-3 right-3 text-[10px]">
                        Only {p.stock} left
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-0.5 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < 4 ? "fill-secondary/70 text-secondary/70" : "text-border"}`} />
                      ))}
                      <span className="text-[10px] text-muted-foreground ml-1">(4.0)</span>
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-1 leading-snug">{p.name}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">{p.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-heading font-bold text-lg text-foreground">₹{p.price}</span>
                      <Button
                        size="sm"
                        className="gradient-primary text-primary-foreground rounded-xl text-xs"
                        onClick={() => addItem({ id: p.id, name: p.name, price: p.price, category: p.category })}
                      >
                        <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
