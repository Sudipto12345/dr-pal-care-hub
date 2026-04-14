import { Users, CalendarDays, FileText, FolderOpen, TrendingUp, UserPlus, Plus, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockDashboardStats, mockAppointments, mockPatients, mockCases } from "@/data/mockData";

const AdminDashboard = () => {
  const s = mockDashboardStats;
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Good Morning, Dr. Pal 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's what's happening in your practice today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Total Patients" value={s.totalPatients} trend="+1 this month" trendDirection="up" />
        <StatCard icon={CalendarDays} label="Appointments" value={s.pendingAppointments} trend="2 upcoming" trendDirection="neutral" />
        <StatCard icon={FileText} label="Prescriptions" value={s.activePrescriptions} trend="Active" trendDirection="neutral" />
        <StatCard icon={TrendingUp} label="Revenue" value={`৳${(s.monthlyRevenue / 1000).toFixed(1)}K`} trend="+12% this month" trendDirection="up" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "New Patient", icon: UserPlus, href: "/admin/patients", color: "bg-primary/10 text-primary" },
          { label: "New Appointment", icon: CalendarDays, href: "/admin/appointments", color: "bg-info/10 text-info" },
          { label: "Write Rx", icon: FileText, href: "/admin/prescriptions", color: "bg-warning/10 text-warning" },
          { label: "New Case", icon: FolderOpen, href: "/admin/cases", color: "bg-success/10 text-success" },
        ].map((action) => (
          <Link key={action.label} to={action.href}>
            <Card className="border-border/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{action.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <Card className="border-border/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-base font-bold">Recent Appointments</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" asChild>
              <Link to="/admin/appointments">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockAppointments.slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{a.patientName}</p>
                  <p className="text-xs text-muted-foreground">{a.date} · {a.time} · {a.type}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Active Cases + Patients */}
        <div className="space-y-6">
          <Card className="border-border/60 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-base font-bold">Active Cases</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" asChild>
                <Link to="/admin/cases">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockCases.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{c.patientName}</p>
                    <p className="text-xs text-muted-foreground">{c.condition} · {c.visits} visits</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border/60 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-base font-bold">Recent Patients</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" asChild>
                <Link to="/admin/patients">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-2">
              {mockPatients.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
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
