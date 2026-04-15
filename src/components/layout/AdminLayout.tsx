import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import MobileBottomNav from "./MobileBottomNav";
import { Leaf, LayoutDashboard, Users, CalendarDays, FileText, Package, Globe, Bell, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const pageTitles: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/patients": "Patients",
  "/admin/appointments": "Appointments",
  "/admin/prescriptions": "Prescriptions",
  "/admin/cases": "Cases",
  "/admin/products": "Products",
  "/admin/blog": "Blog",
};

const AdminLayout = () => {
  const { t, lang, toggleLang } = useLanguage();
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Admin";

  const bottomNavItems = [
    { label: t.admin.dashboard, url: "/admin/dashboard", icon: LayoutDashboard },
    { label: t.admin.patients, url: "/admin/patients", icon: Users },
    { label: t.admin.appointments, url: "/admin/appointments", icon: CalendarDays },
    { label: "Rx", url: "/admin/prescriptions", icon: FileText },
    { label: t.admin.products, url: "/admin/products", icon: Package },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {/* Topbar */}
          <header className="h-14 flex items-center justify-between border-b border-border/50 bg-card px-4 md:px-6 sticky top-0 z-40 shadow-xs">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="hidden md:flex h-8 w-8 text-foreground" />
              <div className="hidden md:block">
                <h2 className="text-base font-bold text-foreground tracking-tight">{pageTitle}</h2>
              </div>
              <div className="md:hidden flex items-center gap-2">
                <Link to="/">
                  <div className="w-8 h-8 rounded-xl gradient-primary flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-primary-foreground" />
                  </div>
                </Link>
                <span className="font-bold text-sm text-foreground">{pageTitle}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Search - desktop */}
              <div className="hidden lg:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  className="pl-9 h-8 w-56 bg-muted/50 border-0 rounded-xl text-sm focus:bg-background focus:border-border"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="hero" size="sm" className="h-8 rounded-xl px-3 text-xs">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Create
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild><Link to="/admin/prescriptions/new" className="flex items-center gap-2"><FileText className="w-4 h-4" /> New Prescription</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/admin/appointments" className="flex items-center gap-2"><CalendarDays className="w-4 h-4" /> New Appointment</Link></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button onClick={toggleLang} className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-border/60 text-foreground hover:bg-accent transition-colors">
                <Globe className="w-3.5 h-3.5" /> {lang === "en" ? "বাংলা" : "EN"}
              </button>

              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-foreground relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" />
              </Button>

              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-semibold">AK</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
            <Outlet />
          </main>
        </div>
        <MobileBottomNav items={bottomNavItems} />
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
