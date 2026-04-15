import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileBottomNav from "./MobileBottomNav";
import { Home, Stethoscope, ShoppingBag, BookOpen, Phone } from "lucide-react";

const bottomNavItems = [
  { label: "Home", url: "/", icon: Home },
  { label: "Services", url: "/services", icon: Stethoscope },
  { label: "Shop", url: "/shop", icon: ShoppingBag },
  { label: "Blog", url: "/blog", icon: BookOpen },
  { label: "Contact", url: "/contact", icon: Phone },
];

const PublicLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 pb-16 md:pb-0">
      <Outlet />
    </main>
    <div className="hidden md:block">
      <Footer />
    </div>
    <MobileBottomNav items={bottomNavItems} />
  </div>
);

export default PublicLayout;
