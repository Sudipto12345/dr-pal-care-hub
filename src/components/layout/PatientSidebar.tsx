import { ClipboardList, FileText, CalendarDays, FolderOpen, User, LogOut, Leaf, Phone, Clock } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/i18n/LanguageContext";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

const PatientSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { t } = useLanguage();
  const { user, profile, patient, signOut } = useAuth();

  const displayName = patient?.name || profile?.name || user?.email || "Patient";
  const avatarUrl =
    profile?.avatar_url ||
    (user?.user_metadata as any)?.avatar_url ||
    (user?.user_metadata as any)?.picture ||
    "";
  const initials = displayName
    .split(" ")
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const items = [
    { title: "My Case", subtitle: "View Case Details", url: "/patient/dashboard", icon: ClipboardList },
    { title: "Prescription", subtitle: "View Medicines", url: "/patient/prescriptions", icon: FileText },
    { title: "Appointments", subtitle: "Visit History", url: "/patient/appointments", icon: CalendarDays },
    { title: "Reports", subtitle: "Lab & Documents", url: "/patient/reports", icon: FolderOpen },
    { title: "Profile", subtitle: "My Information", url: "/patient/profile", icon: User },
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
              <p className="text-[10px] text-sidebar-foreground/60 truncate">Advanced Homeopathic &amp; Wellness Care</p>
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
                        className={`rounded-xl transition-all duration-150 py-2.5 ${active ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"}`}
                        activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-semibold"
                      >
                        <item.icon className="mr-2.5 h-4 w-4" />
                        {!collapsed && (
                          <div className="min-w-0">
                            <span className="block text-sm">{item.title}</span>
                            <span className="block text-[10px] opacity-60">{item.subtitle}</span>
                          </div>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Need Help section */}
      {!collapsed && (
        <div className="px-4 py-4">
          <div className="bg-sidebar-accent/50 rounded-2xl p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-sidebar-primary/10 flex items-center justify-center mx-auto mb-2">
              <Phone className="w-5 h-5 text-sidebar-primary" />
            </div>
            <p className="text-xs font-semibold text-sidebar-foreground mb-0.5">Need Help?</p>
            <p className="text-[10px] text-sidebar-foreground/60 mb-1">Call Us</p>
            <p className="text-xs font-bold text-sidebar-primary">+880 1911-734726</p>
            <p className="text-[10px] text-sidebar-foreground/50 flex items-center justify-center gap-1 mt-0.5">
              <Clock className="w-3 h-3" /> 10 AM - 8 PM
            </p>
          </div>
        </div>
      )}

      <SidebarFooter className="p-3 border-t border-sidebar-border space-y-1">
        <Link
          to="/patient/profile"
          className="flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-sidebar-accent transition-colors"
        >
          <Avatar className="h-8 w-8 flex-shrink-0">
            {avatarUrl && <AvatarImage src={avatarUrl} alt={displayName} referrerPolicy="no-referrer" />}
            <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">{displayName}</p>
              {patient?.patient_code && (
                <p className="text-[10px] text-sidebar-foreground/60 font-mono truncate">
                  ID: {patient.patient_code}
                </p>
              )}
            </div>
          )}
        </Link>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => signOut()} className="text-sidebar-foreground/70 hover:text-sidebar-foreground rounded-xl cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              {!collapsed && <span className="text-sm">Sign Out</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default PatientSidebar;
