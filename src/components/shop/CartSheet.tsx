import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Separator } from "@/components/ui/separator";

const CartSheet = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/30" />
            <p className="text-muted-foreground text-sm">Your cart is empty</p>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-3 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-accent/30 border border-border/40">
                  <div className="w-14 h-14 rounded-lg bg-accent flex items-center justify-center text-xl flex-shrink-0">🌿</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                    <p className="font-heading font-bold text-foreground mt-1">₹{item.price * item.quantity}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                    <div className="flex items-center gap-1 border border-border rounded-lg">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <SheetFooter className="flex-col gap-3 pt-4 sm:flex-col">
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="font-heading font-bold text-lg text-foreground">₹{totalPrice}</span>
              </div>
              <Button className="w-full gradient-primary text-primary-foreground rounded-xl" size="lg">
                Proceed to Checkout
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={clearCart}>
                Clear Cart
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
