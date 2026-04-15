import { CalendarDays, FileText, ShoppingBag, Clock, ArrowRight, Plus, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";
import { useAuth } from "@/hooks/useAuth";
import { useMyAppointments, useMyOrders } from "@/hooks/useSupabaseData";

const PatientDashboard = () => {
  const { user, profile } = useAuth();
  const { data: appointments, isLoading: apptLoading } = useMyAppointments(user?.id);
  const { data: orders, isLoading: ordLoading } = useMyOrders(user?.id);

  const upcomingAppts = (appointments || []).filter((a: any) => a.status !== "cancelled").slice(0, 3);
  const recentOrders = (orders || []).slice(0, 3);

  if (apptLoading || ordLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Welcome, {profile?.name || "Patient"} 🌿</h1>
          <p className="text-muted-foreground text-sm mt-1">Here's your health overview</p>
        </div>
        <Button className="rounded-xl gradient-primary text-primary-foreground hover-scale" asChild>
          <Link to="/book-appointment"><Plus className="w-4 h-4 mr-1" /> Book Appointment</Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CalendarDays} label="Appointments" value={appointments?.length || 0} />
        <StatCard icon={ShoppingBag} label="Orders" value={orders?.length || 0} />
        <StatCard icon={Clock} label="Upcoming" value={upcomingAppts.length} />
        <StatCard icon={FileText} label="Pending Orders" value={recentOrders.filter((o: any) => o.status === "pending").length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-bold">Upcoming Appointments</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <Link to="/patient/appointments">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {upcomingAppts.length === 0 ? (
              <EmptyState icon={CalendarDays} title="No upcoming appointments" description="Schedule your next visit" actionLabel="Book Now" actionHref="/book-appointment" />
            ) : (
              <div className="space-y-2">
                {upcomingAppts.map((a: any) => (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div>
                      <p className="text-sm font-medium text-foreground">{a.date} {a.time_slot ? `at ${a.time_slot}` : ""}</p>
                      <p className="text-xs text-muted-foreground">{a.notes || "General consultation"}</p>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-bold">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <Link to="/patient/orders">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <EmptyState icon={ShoppingBag} title="No orders yet" description="Browse our shop" actionLabel="Shop Now" actionHref="/shop" />
            ) : (
              <div className="space-y-2">
                {recentOrders.map((o: any) => (
                  <div key={o.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div>
                      <p className="text-sm font-medium text-foreground">৳{o.total}</p>
                      <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleDateString()}</p>
                    </div>
                    <StatusBadge status={o.status} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
