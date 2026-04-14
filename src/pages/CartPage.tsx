import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Minus, Plus, Trash2, ArrowLeft, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/i18n/LanguageContext";
import PageHero from "@/components/shared/PageHero";
import heroShop from "@/assets/hero-shop.jpg";

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();
  const { t } = useLanguage();

  if (items.length === 0) {
    return (
      <div>
        <PageHero title={t.cart.title} subtitle="Your shopping cart is empty" bgImage={heroShop} icon={<ShoppingBag className="w-7 h-7 text-white" />} />
        <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
          <ShoppingBag className="w-16 h-16 text-muted-foreground/20 mb-4" />
          <h2 className="font-heading text-xl font-bold text-foreground mb-2">{t.cart.empty}</h2>
          <p className="text-muted-foreground text-sm mb-6">{t.cart.emptyDesc}</p>
          <Button className="gradient-primary text-primary-foreground rounded-xl" asChild>
            <Link to="/shop"><ArrowLeft className="w-4 h-4 mr-1" /> {t.cart.continueShopping}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero title={t.cart.title} subtitle={`${totalItems} ${totalItems !== 1 ? t.cart.items : t.cart.item}`} bgImage={heroShop} icon={<ShoppingBag className="w-7 h-7 text-white" />} />

      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            <div className="space-y-3">
              {items.map((item) => (
                <Card key={item.id} className="border-border/40 rounded-2xl">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl bg-accent/30 flex items-center justify-center text-2xl flex-shrink-0">🌿</div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-heading font-semibold text-foreground text-sm truncate">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                      <p className="font-heading font-bold text-foreground mt-1">৳{item.price * item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-border rounded-xl">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="ghost" className="text-muted-foreground text-sm" asChild>
                <Link to="/shop"><ArrowLeft className="w-4 h-4 mr-1" /> {t.cart.continueShopping}</Link>
              </Button>
            </div>

            <Card className="border-border/40 rounded-2xl h-fit sticky top-20">
              <CardContent className="p-6">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-4">{t.cart.orderSummary}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t.cart.subtotal} ({totalItems} {t.cart.items})</span>
                    <span>৳{totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{t.cart.delivery}</span>
                    <span className={totalPrice >= 500 ? "text-secondary font-medium" : ""}>
                      {totalPrice >= 500 ? t.cart.free : "৳60"}
                    </span>
                  </div>
                  {totalPrice < 500 && (
                    <p className="text-[11px] text-secondary bg-secondary/5 rounded-lg p-2">
                      {t.cart.addMore.replace("{amount}", String(500 - totalPrice))}
                    </p>
                  )}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-heading font-bold text-foreground text-lg mb-4">
                  <span>{t.cart.total}</span>
                  <span>৳{totalPrice + (totalPrice >= 500 ? 0 : 60)}</span>
                </div>
                <Button className="w-full gradient-primary text-primary-foreground rounded-xl" size="lg" asChild>
                  <Link to="/checkout">{t.cart.proceedCheckout} <ArrowRight className="w-4 h-4 ml-1" /></Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CartPage;
