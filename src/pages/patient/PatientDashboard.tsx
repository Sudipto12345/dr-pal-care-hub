import { CalendarDays, FileText, ShoppingBag, Clock, ArrowRight, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import EmptyState from "@/components/shared/EmptyState";
import { mockPatientDashboard, mockAppointments, mockPrescriptions, mockOrders } from "@/data/mockData";

const PatientDashboard = () => {
  const d = mockPatientDashboard;
  const confirmedAppts = mockAppointments.filter(a => a.status === "Confirmed");

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Welcome, {d.patientName} 🌿</h1>
          <p className="text-muted-foreground text-sm mt-1">Here's your health overview</p>
        </div>
        <Button className="rounded-xl gradient-primary text-primary-foreground hover-scale" asChild>
          <Link to="/book-appointment"><Plus className="w-4 h-4 mr-1" /> Book Appointment</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CalendarDays} label="Next Visit" value={d.nextAppointment.date} trend={d.nextAppointment.time} trendDirection="neutral" />
        <StatCard icon={FileText} label="Active Rx" value={d.activePrescriptions} />
        <StatCard icon={Clock} label="Total Visits" value={d.totalVisits} />
        <StatCard icon={ShoppingBag} label="Pending Orders" value={d.pendingOrders} />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments */}
        <Card className="border-border/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-bold">Upcoming Appointments</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <Link to="/patient/appointments">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {confirmedAppts.length === 0 ? (
              <EmptyState
                icon={CalendarDays}
                title="No upcoming appointments"
                description="Schedule your next visit"
                actionLabel="Book Now"
                actionHref="/book-appointment"
              />
            ) : (
              <div className="space-y-2">
                {confirmedAppts.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-foreground">{a.date} at {a.time}</p>
                      <p className="text-xs text-muted-foreground">{a.type}</p>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Prescriptions */}
        <Card className="border-border/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-bold">Active Prescriptions</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <Link to="/patient/prescriptions">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {mockPrescriptions.length === 0 ? (
              <EmptyState icon={FileText} title="No prescriptions" description="Your prescriptions will appear here" />
            ) : (
              <div className="space-y-2">
                {mockPrescriptions.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl bg-muted/30">
                    <p className="text-sm font-medium text-foreground">{p.diagnosis}</p>
                    <p className="text-xs text-muted-foreground mt-1">{p.medicines.length} medicines · {p.date}</p>
                    <ul className="mt-2 space-y-1">
                      {p.medicines.map((m, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Orders */}
        <Card className="border-border/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-bold">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs" asChild>
              <Link to="/patient/orders">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {mockOrders.length === 0 ? (
              <EmptyState icon={ShoppingBag} title="No orders yet" description="Browse our shop" actionLabel="Shop Now" actionHref="/shop" />
            ) : (
              <div className="space-y-2">
                {mockOrders.map((o) => (
                  <div key={o.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">৳{o.total}</p>
                      <p className="text-xs text-muted-foreground truncate">{o.items.join(", ")}</p>
                      <p className="text-xs text-muted-foreground">{o.date}</p>
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
