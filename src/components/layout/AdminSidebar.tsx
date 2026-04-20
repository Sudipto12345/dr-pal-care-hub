import { LayoutDashboard, Users, FileText, FolderOpen, CalendarDays, Package, PenSquare, LogOut, Leaf, ChevronDown, MessageSquareQuote, Play, ShoppingCart, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/i18n/LanguageContext";
import { Separator } from "@/components/ui/separator";

const AdminSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { t } = useLanguage();

  const mainItems = [
    { title: t.admin.dashboard, url: "/admin/dashboard", icon: LayoutDashboard },
    { title: t.admin.patients, url: "/admin/patients", icon: Users },
    { title: t.admin.appointments, url: "/admin/appointments", icon: CalendarDays },
    { title: t.admin.prescriptions, url: "/admin/prescriptions", icon: FileText },
    { title: t.admin.cases, url: "/admin/cases", icon: FolderOpen },
  ];

  const manageItems = [
    { title: t.admin.products, url: "/admin/products", icon: Package },
    { title: "Orders", url: "/admin/orders", icon: ShoppingCart },
    { title: t.admin.blog, url: "/admin/blog", icon: PenSquare },
    { title: "Testimonials", url: "/admin/testimonials", icon: MessageSquareQuote },
    { title: "YouTube Videos", url: "/admin/youtube", icon: Play },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ];

  const renderItem = (item: typeof mainItems[0]) => {
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
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarContent className="px-2 py-3">
        {/* Logo */}
        <div className="px-3 py-2 mb-2 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sidebar-primary flex items-center justify-center flex-shrink-0 shadow-sm">
            <Leaf className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-bold text-sm text-sidebar-foreground truncate">Dr. Amit Kumar Pal</p>
              <p className="text-[10px] text-sidebar-foreground/60 truncate">{t.nav.adminPanel}</p>
            </div>
          )}
        </div>

        <Separator className="mb-2 bg-sidebar-border" />

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 font-semibold px-3 mb-1">Clinical</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {mainItems.map(renderItem)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <Separator className="my-2 bg-sidebar-border" />

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel className="text-[10px] uppercase tracking-widest text-sidebar-foreground/50 font-semibold px-3 mb-1">Manage</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-0.5">
              {manageItems.map(renderItem)}
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

export default AdminSidebar;
