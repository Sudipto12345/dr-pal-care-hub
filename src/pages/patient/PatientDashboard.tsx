import { CalendarDays, FileText, ShoppingBag, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockPatientDashboard, mockAppointments, mockPrescriptions, mockOrders } from "@/data/mockData";

const PatientDashboard = () => {
  const d = mockPatientDashboard;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Welcome back, {d.patientName}!</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's your health overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={CalendarDays} label="Next Appointment" value={d.nextAppointment.date} trend={d.nextAppointment.time} />
        <StatCard icon={FileText} label="Active Prescriptions" value={d.activePrescriptions} />
        <StatCard icon={Clock} label="Total Visits" value={d.totalVisits} />
        <StatCard icon={ShoppingBag} label="Pending Orders" value={d.pendingOrders} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="font-heading text-lg">Upcoming Appointments</CardTitle>
            <Button variant="ghost" size="sm" asChild><Link to="/patient/appointments">View All <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockAppointments.filter(a => a.status === "Confirmed").map((a) => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.date} at {a.time}</p>
                  <p className="text-xs text-muted-foreground">{a.type}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="font-heading text-lg">Active Prescriptions</CardTitle>
            <Button variant="ghost" size="sm" asChild><Link to="/patient/prescriptions">View All <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockPrescriptions.map((p) => (
              <div key={p.id} className="p-3 rounded-xl bg-muted/50">
                <p className="text-sm font-medium text-foreground">{p.diagnosis}</p>
                <p className="text-xs text-muted-foreground mt-1">{p.medicines.length} medicines · {p.date}</p>
                <ul className="mt-2 space-y-1">
                  {p.medicines.map((m, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-secondary flex-shrink-0" /> {m}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="font-heading text-lg">Recent Orders</CardTitle>
            <Button variant="ghost" size="sm" asChild><Link to="/patient/orders">View All <ArrowRight className="w-4 h-4 ml-1" /></Link></Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-foreground">₹{o.total}</p>
                  <p className="text-xs text-muted-foreground">{o.items.join(", ")}</p>
                  <p className="text-xs text-muted-foreground">{o.date}</p>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PatientDashboard;
