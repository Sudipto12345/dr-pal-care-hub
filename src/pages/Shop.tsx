import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Search, ShoppingBag, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { useProducts } from "@/hooks/useSupabaseData";
import PageHero from "@/components/shared/PageHero";
import heroShop from "@/assets/hero-shop.jpg";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/i18n/LanguageContext";
import { cn } from "@/lib/utils";

const Shop = () => {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [stockOnly, setStockOnly] = useState(false);
  const { addItem, totalItems, setIsOpen } = useCart();
  const { t } = useLanguage();
  const { data: products, isLoading } = useProducts();

  const categories = useMemo(() => {
    const cats = new Set((products || []).map((p: any) => p.category).filter(Boolean));
    return ["All", ...Array.from(cats)] as string[];
  }, [products]);

  const filtered = useMemo(() => {
    let items = (products || []).filter((p: any) => {
      const matchCat = category === "All" || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || (p.description || "").toLowerCase().includes(search.toLowerCase());
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchStock = !stockOnly || p.stock > 0;
      return matchCat && matchSearch && matchPrice && matchStock;
    });
    if (sort === "price-asc") items.sort((a: any, b: any) => a.price - b.price);
    else if (sort === "price-desc") items.sort((a: any, b: any) => b.price - a.price);
    return items;
  }, [products, category, search, sort, priceRange, stockOnly]);

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-heading font-semibold text-sm text-foreground mb-3">{t.shop.category}</h4>
        <div className="flex flex-col gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "text-left text-sm px-3 py-1.5 rounded-lg transition-colors",
                category === c ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-accent"
              )}
            >
              {c === "All" ? t.shop.all : c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h4 className="font-heading font-semibold text-sm text-foreground mb-3">{t.shop.priceRange}</h4>
        <Slider min={0} max={1000} step={50} value={priceRange} onValueChange={setPriceRange} className="mb-2" />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>৳{priceRange[0]}</span>
          <span>৳{priceRange[1]}</span>
        </div>
      </div>
      <div>
        <h4 className="font-heading font-semibold text-sm text-foreground mb-3">{t.shop.availability}</h4>
        <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
          <input type="checkbox" checked={stockOnly} onChange={(e) => setStockOnly(e.target.checked)} className="rounded border-border" />
          {t.shop.inStockOnly}
        </label>
      </div>
    </div>
  );

  return (
    <div>
      <PageHero title={t.shop.pageTitle} subtitle={t.shop.pageSubtitle} bgImage={heroShop} icon={<ShoppingBag className="w-7 h-7 text-white" />} gradient="from-secondary/85 via-primary/60 to-warning/40" />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder={t.shop.searchProducts} className="pl-9 rounded-xl" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant="outline" size="sm" className="md:hidden rounded-xl gap-1.5" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="w-3.5 h-3.5" /> {t.shop.filters}
              </Button>
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-40 rounded-xl text-xs h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t.shop.newest}</SelectItem>
                  <SelectItem value="price-asc">{t.shop.priceLowHigh}</SelectItem>
                  <SelectItem value="price-desc">{t.shop.priceHighLow}</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" className="relative rounded-xl h-9 w-9" onClick={() => setIsOpen(true)}>
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-secondary text-secondary-foreground text-[10px] font-bold flex items-center justify-center">{totalItems}</span>
                )}
              </Button>
            </div>
          </div>

          {showFilters && (
            <div className="md:hidden mb-6 p-4 rounded-xl border border-border bg-card animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading font-semibold text-sm">{t.shop.filters}</span>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowFilters(false)}><X className="w-4 h-4" /></Button>
              </div>
              <FilterSidebar />
            </div>
          )}

          <div className="flex gap-8">
            <aside className="hidden md:block w-56 flex-shrink-0">
              <div className="sticky top-20"><FilterSidebar /></div>
            </aside>
            <div className="flex-1">
              {isLoading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
              ) : (
                <>
                  <p className="text-xs text-muted-foreground mb-4">{filtered.length} {filtered.length !== 1 ? t.shop.productsFound : t.shop.productFound}</p>
                  {filtered.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="font-medium">{t.shop.noProducts}</p>
                      <p className="text-xs mt-1">{t.shop.adjustFilters}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                      {filtered.map((p: any) => (
                        <Card key={p.id} className="group border-border/50 rounded-2xl overflow-hidden hover-lift bg-card">
                          <Link to={`/product/${p.slug || p.id}`}>
                            <div className="aspect-square overflow-hidden bg-accent/20 relative">
                              <img src={p.image_url || "/placeholder.svg"} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              {p.stock === 0 && (
                                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                                  <Badge variant="secondary" className="text-xs">{t.shop.outOfStock}</Badge>
                                </div>
                              )}
                            </div>
                          </Link>
                          <CardContent className="p-3 sm:p-4">
                            <p className="text-[10px] text-secondary font-medium uppercase tracking-wider mb-1">{p.category}</p>
                            <Link to={`/product/${p.slug || p.id}`}>
                              <h3 className="font-heading font-semibold text-sm text-foreground mb-1 leading-snug hover:text-primary transition-colors line-clamp-1">{p.name}</h3>
                            </Link>
                            <div className="flex items-end justify-between mt-2">
                              <span className="font-heading font-bold text-base text-foreground">৳{p.price}</span>
                              <Button
                                size="sm"
                                className="gradient-primary text-primary-foreground rounded-xl text-[11px] h-8 px-2.5"
                                disabled={p.stock === 0}
                                onClick={(e) => { e.preventDefault(); addItem({ id: p.id, name: p.name, price: p.price, category: p.category || "" }); }}
                              >
                                <ShoppingCart className="w-3 h-3 mr-1" /> {t.shop.addToCart}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
