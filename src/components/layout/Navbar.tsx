import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Treatments", path: "/treatments" },
  { label: "Services", path: "/services" },
  { label: "Shop", path: "/shop" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { totalItems, setIsOpen: openCart } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm leading-tight text-foreground">Dr. Amit Kumar Pal</span>
            <span className="text-[10px] text-muted-foreground leading-tight">Homeopathic Care</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button onClick={() => openCart(true)} className="relative p-2 rounded-lg hover:bg-accent transition-colors">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-scale-in">
                {totalItems}
              </span>
            )}
          </button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/patient/dashboard">Patient Portal</Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin/dashboard">Admin</Link>
          </Button>
          <Button variant="hero" size="sm" asChild>
            <Link to="/book-appointment">Book Appointment</Link>
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <button onClick={() => openCart(true)} className="relative p-2 rounded-lg hover:bg-accent transition-colors">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-scale-in">
                {totalItems}
              </span>
            )}
          </button>
          <button className="p-2" onClick={() => setOpen(!open)}>
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
              className="block py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/patient/dashboard" onClick={() => setOpen(false)}>Patient Portal</Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/dashboard" onClick={() => setOpen(false)}>Admin Panel</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/book-appointment" onClick={() => setOpen(false)}>Book Appointment</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
