import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import MobileBottomNav from "./MobileBottomNav";
import { Leaf, LayoutDashboard, Users, CalendarDays, FileText, Package, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const AdminLayout = () => {
  const { t, lang, toggleLang } = useLanguage();

  const bottomNavItems = [
    { label: t.admin.dashboard, url: "/admin/dashboard", icon: LayoutDashboard },
    { label: t.admin.patients, url: "/admin/patients", icon: Users },
    { label: t.admin.appointments, url: "/admin/appointments", icon: CalendarDays },
    { label: "Rx", url: "/admin/prescriptions", icon: FileText },
    { label: t.admin.products, url: "/admin/products", icon: Package },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-lg px-4 sticky top-0 z-40">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="hidden md:flex" />
              <span className="text-sm font-medium text-foreground md:text-muted-foreground">{t.nav.adminPanel}</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={toggleLang} className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium border border-border hover:bg-accent transition-colors">
                <Globe className="w-3 h-3" /> {lang === "en" ? "বাংলা" : "EN"}
              </button>
              <Link to="/" className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-heading font-semibold text-sm hidden sm:block text-foreground">Dr. Amit Kumar Pal</span>
              </Link>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 bg-muted/30 pb-20 md:pb-6">
            <Outlet />
          </main>
        </div>
        <MobileBottomNav items={bottomNavItems} />
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
