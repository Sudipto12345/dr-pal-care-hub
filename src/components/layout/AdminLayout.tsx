import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "./AdminSidebar";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const AdminLayout = () => (
  <SidebarProvider>
    <div className="min-h-screen flex w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-lg px-4 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <span className="text-sm font-medium text-muted-foreground hidden sm:block">Admin Panel</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg gradient-primary flex items-center justify-center">
                <Leaf className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-heading font-semibold text-sm hidden sm:block text-foreground">Dr. Amit Kumar Pal</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 bg-muted/30">
          <Outlet />
        </main>
      </div>
    </div>
  </SidebarProvider>
);

export default AdminLayout;
