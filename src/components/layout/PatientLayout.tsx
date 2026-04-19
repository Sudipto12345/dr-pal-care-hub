import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import PatientSidebar from "./PatientSidebar";
import MobileBottomNav from "./MobileBottomNav";
import { Leaf, LayoutDashboard, CalendarDays, FileText, ShoppingBag, User, Globe, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CompleteProfileGate from "@/components/auth/CompleteProfileGate";
import { useAuth } from "@/hooks/useAuth";

const pageTitles: Record<string, string> = {
  "/patient/dashboard": "Dashboard",
  "/patient/appointments": "Appointments",
  "/patient/prescriptions": "Prescriptions",
  "/patient/orders": "Orders",
  "/patient/profile": "Profile",
};

const PatientLayout = () => {
  const { t, lang, toggleLang } = useLanguage();
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "Patient";

  const bottomNavItems = [
    { label: t.patient.dashboard, url: "/patient/dashboard", icon: LayoutDashboard },
    { label: t.patient.appointments, url: "/patient/appointments", icon: CalendarDays },
    { label: "Rx", url: "/patient/prescriptions", icon: FileText },
    { label: t.patient.orders, url: "/patient/orders", icon: ShoppingBag },
    { label: t.patient.profile, url: "/patient/profile", icon: User },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <PatientSidebar />
        <div className="flex-1 flex flex-col min-w-0">
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
              <button onClick={toggleLang} className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium border border-border/60 text-foreground hover:bg-accent transition-colors">
                <Globe className="w-3.5 h-3.5" /> {lang === "en" ? "বাংলা" : "EN"}
              </button>

              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl text-foreground">
                <Bell className="w-4 h-4" />
              </Button>

              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarFallback className="gradient-primary text-primary-foreground text-xs font-semibold">SB</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 md:pb-8">
            <Outlet />
          </main>
        </div>
        <MobileBottomNav items={bottomNavItems} />
        <CompleteProfileGate />
      </div>
    </SidebarProvider>
  );
};

export default PatientLayout;
