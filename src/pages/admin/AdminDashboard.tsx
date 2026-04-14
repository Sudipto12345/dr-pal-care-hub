import { Users, CalendarDays, FileText, IndianRupee, TrendingUp, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockDashboardStats, mockAppointments, mockPatients } from "@/data/mockData";

const AdminDashboard = () => {
  const s = mockDashboardStats;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of your practice</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard icon={Users} label="Total Patients" value={s.totalPatients} trend="+5% this month" />
        <StatCard icon={CalendarDays} label="Today's Appointments" value={s.appointmentsToday} />
        <StatCard icon={CalendarDays} label="Pending" value={s.pendingAppointments} />
        <StatCard icon={FileText} label="Active Rx" value={s.activePrescriptions} />
        <StatCard icon={IndianRupee} label="Revenue (Month)" value={`₹${(s.monthlyRevenue / 1000).toFixed(1)}K`} trend="+12%" />
        <StatCard icon={UserPlus} label="New Patients" value={s.newPatientsThisMonth} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border rounded-2xl">
          <CardHeader><CardTitle className="font-heading text-lg">Today's Appointments</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockAppointments.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.patientName}</p>
                  <p className="text-xs text-muted-foreground">{a.time} • {a.type}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border rounded-2xl">
          <CardHeader><CardTitle className="font-heading text-lg">Recent Patients</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockPatients.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.age}y • {p.gender} • Last: {p.lastVisit}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
