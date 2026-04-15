import { LayoutDashboard, CalendarDays, FileText, ShoppingBag, User, LogOut, Leaf } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/i18n/LanguageContext";
import { Separator } from "@/components/ui/separator";

const PatientSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { t } = useLanguage();

  const items = [
    { title: t.patient.dashboard, url: "/patient/dashboard", icon: LayoutDashboard },
    { title: t.patient.appointments, url: "/patient/appointments", icon: CalendarDays },
    { title: t.patient.prescriptions, url: "/patient/prescriptions", icon: FileText },
    { title: t.patient.orders, url: "/patient/orders", icon: ShoppingBag },
    { title: t.patient.profile, url: "/patient/profile", icon: User },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="px-2 py-3">
        <div className="px-3 py-2 mb-2 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sidebar-primary flex items-center justify-center flex-shrink-0 shadow-sm">
            <Leaf className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-bold text-sm text-sidebar-foreground truncate">Dr. Amit Kumar Pal</p>
              <p className="text-[10px] text-sidebar-foreground/60 truncate">{t.nav.patientPortal}</p>
            </div>
          )}
        </div>

        <Separator className="mb-2 bg-sidebar-border" />

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {items.map((item) => {
                const active = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton asChild isActive={active}>
                      <NavLink
                        to={item.url}
                        end
                        className={`rounded-xl transition-all duration-150 ${active ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"}`}
                        activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-semibold"
                      >
                        <item.icon className="mr-2.5 h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/" className="text-sidebar-foreground/70 hover:text-sidebar-foreground rounded-xl">
                <LogOut className="mr-2 h-4 w-4" />
                {!collapsed && <span className="text-sm">Back to Site</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default PatientSidebar;
