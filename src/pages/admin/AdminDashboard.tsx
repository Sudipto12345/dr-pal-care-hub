import { Users, CalendarDays, FileText, FolderOpen, IndianRupee, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockDashboardStats, mockAppointments, mockPatients, mockCases } from "@/data/mockData";

const AdminDashboard = () => {
  const s = mockDashboardStats;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Overview of your practice</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard icon={Users} label="Total Patients" value={s.totalPatients} />
        <StatCard icon={CalendarDays} label="Pending Appointments" value={s.pendingAppointments} />
        <StatCard icon={FileText} label="Prescriptions" value={s.activePrescriptions} />
        <StatCard icon={FolderOpen} label="Cases" value={s.totalCases} />
        <StatCard icon={IndianRupee} label="Revenue (Month)" value={`₹${(s.monthlyRevenue / 1000).toFixed(1)}K`} trend="+12%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border rounded-2xl">
          <CardHeader><CardTitle className="font-heading text-lg">Recent Appointments</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockAppointments.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <p className="text-sm font-medium text-foreground">{a.patientName}</p>
                  <p className="text-xs text-muted-foreground">{a.date} · {a.time} · {a.type}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border rounded-2xl">
            <CardHeader><CardTitle className="font-heading text-lg">Active Cases</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {mockCases.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{c.patientName}</p>
                    <p className="text-xs text-muted-foreground">{c.condition} · {c.visits} visits</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border rounded-2xl">
            <CardHeader><CardTitle className="font-heading text-lg">Patients</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {mockPatients.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.age}y · {p.gender} · Last: {p.lastVisit}</p>
                  </div>
                  <StatusBadge status={p.status} />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
