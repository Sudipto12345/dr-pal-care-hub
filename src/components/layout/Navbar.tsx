import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, ShoppingCart, Globe } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/i18n/LanguageContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsOpen: openCart } = useCart();
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.about, path: "/about" },
    { label: t.nav.treatments, path: "/treatments" },
    { label: t.nav.services, path: "/services" },
    { label: t.nav.shop, path: "/shop" },
    { label: t.nav.blog, path: "/blog" },
    { label: t.nav.contact, path: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-tight text-foreground tracking-tight">Dr. Amit Kumar Pal</span>
            <span className="text-[10px] text-muted-foreground leading-tight">
              {lang === "bn" ? "হোমিওপ্যাথিক সেবা" : "Homeopathic Care"}
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-border hover:bg-accent transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "বাংলা" : "EN"}
          </button>

          <button onClick={() => openCart(true)} className="relative p-2 rounded-xl hover:bg-muted/50 transition-colors">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-scale-in">
                {totalItems}
              </span>
            )}
          </button>
          <Button variant="ghost" size="sm" className="rounded-xl text-xs" asChild>
            <Link to="/patient/dashboard">{t.nav.patientPortal}</Link>
          </Button>
          <Button variant="ghost" size="sm" className="rounded-xl text-xs" asChild>
            <Link to="/admin/dashboard">{t.nav.admin}</Link>
          </Button>
          <Button size="sm" className="rounded-xl gradient-primary text-primary-foreground hover-scale" asChild>
            <Link to="/book-appointment">{t.nav.bookAppointment}</Link>
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <button
            onClick={toggleLang}
            className="p-2 rounded-xl hover:bg-muted/50 transition-colors text-xs font-semibold"
          >
            {lang === "en" ? "বা" : "EN"}
          </button>
          <button onClick={() => openCart(true)} className="relative p-2 rounded-xl hover:bg-muted/50 transition-colors">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-scale-in">
                {totalItems}
              </span>
            )}
          </button>
          <button className="p-2 rounded-xl hover:bg-muted/50 transition-colors" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-card px-4 pb-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`block py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
            <Button variant="ghost" size="sm" className="rounded-xl justify-start" asChild>
              <Link to="/patient/dashboard" onClick={() => setOpen(false)}>{t.nav.patientPortal}</Link>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-xl justify-start" asChild>
              <Link to="/admin/dashboard" onClick={() => setOpen(false)}>{t.nav.adminPanel}</Link>
            </Button>
            <Button size="sm" className="rounded-xl gradient-primary text-primary-foreground" asChild>
              <Link to="/book-appointment" onClick={() => setOpen(false)}>{t.nav.bookAppointment}</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
