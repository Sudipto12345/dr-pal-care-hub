import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ShoppingBag, Truck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const OrderSuccess = () => {
  const [params] = useSearchParams();
  const { t } = useLanguage();
  const orderId = params.get("id") || "ORD-XXXX";
  const total = params.get("total") || "0";
  const city = params.get("city") || "Dhaka";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <Card className="max-w-md w-full border-border/40 rounded-2xl shadow-card">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-5 animate-fade-in">
            <CheckCircle className="w-8 h-8 text-primary-foreground" />
          </div>

          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">{t.orderSuccess.title}</h2>
          <p className="text-muted-foreground text-sm mb-6">{t.orderSuccess.subtitle}</p>

          <div className="space-y-3 text-left bg-accent/30 rounded-xl p-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t.orderSuccess.orderId}</span>
              <span className="font-mono font-medium text-foreground">{orderId}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t.orderSuccess.totalAmount}</span>
              <span className="font-heading font-bold text-foreground">৳{total}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t.checkoutPage.paymentMethod}</span>
              <span className="text-foreground">{t.checkoutPage.cashOnDelivery}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{t.orderSuccess.deliveryArea}</span>
              <span className="text-foreground">{city}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/5 rounded-lg p-3 mb-6">
            <Truck className="w-4 h-4 text-secondary flex-shrink-0" />
            <span>{t.orderSuccess.estimatedDelivery}: {t.orderSuccess.days}</span>
          </div>

          <div className="flex flex-col gap-2">
            <Button className="gradient-primary text-primary-foreground rounded-xl w-full" asChild>
              <Link to="/patient/orders"><ShoppingBag className="w-4 h-4 mr-1" /> {t.orderSuccess.trackOrder}</Link>
            </Button>
            <Button variant="outline" className="rounded-xl w-full" asChild>
              <Link to="/shop">{t.orderSuccess.backToShop}</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSuccess;
