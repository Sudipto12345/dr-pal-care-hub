import { Users, CalendarDays, FileText, FolderOpen, TrendingUp, UserPlus, ArrowRight, Activity, Clock, Pill, ClipboardPlus, UserCheck, Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { mockDashboardStats, mockAppointments, mockPatients, mockCases } from "@/data/mockData";

const recentActivity = [
  { id: 1, icon: UserPlus, text: "New patient Anjali Tripathi registered", time: "2 hours ago", color: "bg-primary/10 text-primary" },
  { id: 2, icon: FileText, text: "Prescription created for Saida Begum", time: "3 hours ago", color: "bg-info/10 text-info" },
  { id: 3, icon: CalendarDays, text: "Appointment confirmed — Rohit Mehra", time: "5 hours ago", color: "bg-success/10 text-success" },
  { id: 4, icon: FolderOpen, text: "Case updated: Atopic Dermatitis progress", time: "Yesterday", color: "bg-warning/10 text-warning" },
  { id: 5, icon: Pill, text: "Medicine stock updated — Arnica Montana 30C", time: "Yesterday", color: "bg-primary/10 text-primary" },
];

const AdminDashboard = () => {
  const s = mockDashboardStats;
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Good Morning, Dr. Pal 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">Here's what's happening in your practice today</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard icon={Users} label="Total Patients" value={s.totalPatients} trend="+1 this month" trendDirection="up" />
        <StatCard icon={CalendarDays} label="Today's Appts" value={s.appointmentsToday} trend="2 upcoming" trendDirection="neutral" />
        <StatCard icon={FileText} label="Active Rx" value={s.activePrescriptions} trend="1 new today" trendDirection="up" />
        <StatCard icon={FolderOpen} label="Open Cases" value={s.totalCases} trend="2 improving" trendDirection="up" />
        <StatCard icon={TrendingUp} label="Revenue" value={`৳${(s.monthlyRevenue / 1000).toFixed(1)}K`} trend="+12% vs last month" trendDirection="up" />
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Add Patient", icon: UserPlus, href: "/admin/patients", color: "bg-primary/10 text-primary" },
            { label: "New Appointment", icon: CalendarDays, href: "/admin/appointments", color: "bg-info/10 text-info" },
            { label: "Write Prescription", icon: ClipboardPlus, href: "/admin/prescriptions", color: "bg-warning/10 text-warning" },
            { label: "New Case", icon: FolderOpen, href: "/admin/cases", color: "bg-success/10 text-success" },
            { label: "Manage Products", icon: Pill, href: "/admin/products", color: "bg-destructive/10 text-destructive" },
            { label: "View Reports", icon: Activity, href: "/admin/dashboard", color: "bg-muted text-muted-foreground" },
          ].map((action) => (
            <Link key={action.label} to={action.href}>
              <Card className="border-border/60 rounded-2xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group h-full">
                <CardContent className="p-4 flex flex-col items-center text-center gap-2.5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${action.color} group-hover:scale-110 transition-transform duration-200`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors leading-tight">{action.label}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments — 2 cols */}
        <Card className="border-border/60 rounded-2xl lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-primary" /> Recent Appointments
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" asChild>
              <Link to="/admin/appointments">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/40 text-left">
                    <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Patient</th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Date</th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Time</th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden lg:table-cell">Type</th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAppointments.map((a) => (
                    <tr key={a.id} className="border-t border-border hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <UserCheck className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-foreground truncate text-sm">{a.patientName}</p>
                            <p className="text-[11px] text-muted-foreground sm:hidden">{a.date} · {a.time}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{a.date}</td>
                      <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{a.time}</td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md">{a.type}</span>
                      </td>
                      <td className="px-4 py-3 text-right"><StatusBadge status={a.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Feed — 1 col */}
        <Card className="border-border/60 rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[17px] top-2 bottom-2 w-px bg-border" />
              <div className="space-y-4">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 relative">
                    <div className={`w-[35px] h-[35px] rounded-lg flex items-center justify-center flex-shrink-0 z-10 ${item.color}`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 pt-1">
                      <p className="text-sm text-foreground leading-snug">{item.text}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Cases */}
        <Card className="border-border/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-primary" /> Active Cases
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" asChild>
              <Link to="/admin/cases">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockCases.map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                    <FolderOpen className="w-4 h-4 text-warning" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{c.patientName}</p>
                    <p className="text-xs text-muted-foreground truncate">{c.condition} · {c.visits} visits</p>
                  </div>
                </div>
                <StatusBadge status={c.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card className="border-border/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" /> Recent Patients
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" asChild>
              <Link to="/admin/patients">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {mockPatients.map((p) => (
              <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-primary">{p.name.charAt(0)}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.age}y · {p.gender} · Last: {p.lastVisit}</p>
                  </div>
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
