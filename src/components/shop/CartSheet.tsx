import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const CartSheet = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsOpen(false);
    navigate("/checkout");
  };

  const handleContinue = () => {
    setIsOpen(false);
    navigate("/shop");
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md p-0">
        {/* Header */}
        <SheetHeader className="px-5 pt-5 pb-3 border-b border-border">
          <SheetTitle className="font-heading flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-primary" /> Cart
            </span>
            {totalItems > 0 && (
              <span className="text-xs font-medium text-muted-foreground bg-accent px-2.5 py-1 rounded-full">
                {totalItems} item{totalItems > 1 ? "s" : ""}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 px-6">
            <div className="w-20 h-20 rounded-full bg-accent/50 flex items-center justify-center">
              <ShoppingBag className="w-10 h-10 text-muted-foreground/40" />
            </div>
            <div>
              <p className="font-heading font-semibold text-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Browse our products and add items</p>
            </div>
            <Button variant="hero" size="sm" onClick={handleContinue}>
              Browse Shop
            </Button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-accent/30 border border-border/40 transition-all hover:border-border"
                >
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center text-lg flex-shrink-0">
                    🌿
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                    <div className="flex items-center justify-between mt-1.5">
                      <div className="flex items-center gap-1 border border-border rounded-lg bg-background">
                        <button
                          className="h-7 w-7 flex items-center justify-center hover:bg-accent rounded-l-lg transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold w-6 text-center">{item.quantity}</span>
                        <button
                          className="h-7 w-7 flex items-center justify-center hover:bg-accent rounded-r-lg transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="font-heading font-bold text-sm text-foreground">৳{item.price * item.quantity}</p>
                    </div>
                  </div>
                  <button
                    className="p-1.5 rounded-md hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-border px-5 py-4 space-y-3 bg-card">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading font-bold text-lg text-foreground">৳{totalPrice}</span>
              </div>
              {totalPrice < 500 && (
                <p className="text-xs text-muted-foreground text-center">
                  Add ৳{500 - totalPrice} more for free delivery
                </p>
              )}
              <Button className="w-full gradient-primary text-primary-foreground rounded-xl" size="lg" onClick={handleCheckout}>
                Checkout <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={handleContinue}>
                  Continue Shopping
                </Button>
                <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
