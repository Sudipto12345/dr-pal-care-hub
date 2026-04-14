import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const CartSheet = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleCheckout = () => { setIsOpen(false); navigate("/checkout"); };
  const handleContinue = () => { setIsOpen(false); navigate("/shop"); };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-bold text-base">
              <ShoppingBag className="w-5 h-5 text-primary" /> {t.cart.yourCart}
            </span>
            {totalItems > 0 && (
              <span className="text-[11px] font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                {totalItems} {totalItems > 1 ? t.cart.items : t.cart.item}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 px-6">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{t.cart.empty}</p>
              <p className="text-sm text-muted-foreground mt-1">{t.cart.emptyDesc}</p>
            </div>
            <Button size="sm" className="rounded-xl gradient-primary text-primary-foreground" onClick={handleContinue}>{t.cart.browseShop}</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-2xl bg-muted/30 border border-border/40 transition-all duration-150 hover:border-border hover:shadow-xs">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-base flex-shrink-0">🌿</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                    <p className="text-[11px] text-muted-foreground">{item.category}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-0.5 border border-border rounded-xl bg-background">
                        <button className="h-7 w-7 flex items-center justify-center hover:bg-muted rounded-l-xl transition-colors" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold w-6 text-center">{item.quantity}</span>
                        <button className="h-7 w-7 flex items-center justify-center hover:bg-muted rounded-r-xl transition-colors" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-bold text-sm text-foreground">৳{item.price * item.quantity}</p>
                    </div>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors" onClick={() => removeItem(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="border-t border-border px-5 py-4 space-y-3 bg-card">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{t.cart.subtotal}</span>
                <span className="font-bold text-lg text-foreground">৳{totalPrice}</span>
              </div>
              {totalPrice < 500 && (
                <p className="text-xs text-muted-foreground text-center">
                  {t.cart.freeDeliveryHint.replace("{amount}", String(500 - totalPrice))}
                </p>
              )}
              <Button className="w-full gradient-primary text-primary-foreground rounded-xl hover-scale" size="lg" onClick={handleCheckout}>
                {t.cart.checkout} <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={handleContinue}>{t.cart.continueShopping}</Button>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={clearCart}>{t.cart.clearCart}</Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
