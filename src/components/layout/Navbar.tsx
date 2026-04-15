import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, ShoppingCart, Globe } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useLanguage } from "@/i18n/LanguageContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { totalItems, setIsOpen: openCart } = useCart();
  const { lang, toggleLang, t } = useLanguage();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.home, path: "/" },
    { label: t.nav.about, path: "/about" },
    { label: t.nav.treatments, path: "/treatments" },
    { label: t.nav.services, path: "/services" },
    { label: t.nav.shop, path: "/shop" },
    { label: t.nav.blog, path: "/blog" },
    { label: t.nav.contact, path: "/contact" },
  ];

  const navBg = "bg-primary border-b border-primary/80 shadow-soft";

  const textColor = "text-primary-foreground";
  const mutedColor = "text-primary-foreground/70";
  const hoverBg = "hover:bg-white/15";
  const activeStyle = "bg-white/20 text-primary-foreground";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-sm">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className={`font-heading font-bold text-sm leading-tight tracking-tight ${textColor}`}>Dr. Amit Kumar Pal</span>
            <span className={`text-[10px] leading-tight ${mutedColor}`}>
              {lang === "bn" ? "হোমিওপ্যাথিক সেবা" : "Homeopathic Care"}
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 relative group ${
                location.pathname === link.path
                  ? activeStyle
                  : `${mutedColor} ${hoverBg} hover:text-white`
              }`}
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white rounded-full transition-all duration-300 group-hover:w-4/5" />
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <button
            onClick={toggleLang}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-colors border-white/30 text-white hover:bg-white/15`}
          >
            <Globe className="w-3.5 h-3.5" />
            {lang === "en" ? "বাংলা" : "EN"}
          </button>

          <button onClick={() => openCart(true)} className={`relative p-2 rounded-xl transition-colors ${hoverBg}`}>
            <ShoppingCart className={`w-5 h-5 ${textColor}`} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-white text-primary text-[10px] font-bold flex items-center justify-center animate-scale-in">
                {totalItems}
              </span>
            )}
          </button>
          <Button variant="ghost" size="sm" className={`rounded-xl text-xs ${mutedColor} ${hoverBg}`} asChild>
            <Link to="/patient/dashboard">{t.nav.patientPortal}</Link>
          </Button>
          <Button variant="ghost" size="sm" className={`rounded-xl text-xs ${mutedColor} ${hoverBg}`} asChild>
            <Link to="/admin/dashboard">{t.nav.admin}</Link>
          </Button>
          <Button size="sm" className="rounded-xl bg-white text-primary hover:bg-white/90 font-semibold shadow-sm" asChild>
            <Link to="/book-appointment">{t.nav.bookAppointment}</Link>
          </Button>
        </div>

        <div className="lg:hidden flex items-center gap-1">
          <button
            onClick={toggleLang}
            className={`p-2 rounded-xl transition-colors text-xs font-semibold ${mutedColor} ${hoverBg}`}
          >
            {lang === "en" ? "বা" : "EN"}
          </button>
          <button onClick={() => openCart(true)} className={`relative p-2 rounded-xl transition-colors ${hoverBg}`}>
            <ShoppingCart className={`w-5 h-5 ${textColor}`} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center animate-scale-in">
                {totalItems}
              </span>
            )}
          </button>
          <button className={`p-2 rounded-xl transition-colors ${hoverBg}`} onClick={() => setOpen(!open)}>
            {open ? <X className={`w-5 h-5 ${textColor}`} /> : <Menu className={`w-5 h-5 ${textColor}`} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-primary border-t border-white/20 px-4 pb-4 animate-fade-in">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`block py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "bg-white/20 text-white"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-white/20">
            <Button variant="ghost" size="sm" className="rounded-xl justify-start text-white hover:bg-white/10 hover:text-white" asChild>
              <Link to="/patient/dashboard" onClick={() => setOpen(false)}>{t.nav.patientPortal}</Link>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-xl justify-start text-white hover:bg-white/10 hover:text-white" asChild>
              <Link to="/admin/dashboard" onClick={() => setOpen(false)}>{t.nav.adminPanel}</Link>
            </Button>
            <Button size="sm" className="rounded-xl bg-white/20 text-white hover:bg-white/30 border border-white/30" asChild>
              <Link to="/book-appointment" onClick={() => setOpen(false)}>{t.nav.bookAppointment}</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
