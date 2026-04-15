import { Users, CalendarDays, FileText, FolderOpen, TrendingUp, UserPlus, ArrowRight, Activity, Clock, Pill, ClipboardPlus, UserCheck, Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { useAdminStats, useAppointments, usePatients, useCases } from "@/hooks/useSupabaseData";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

const AdminDashboard = () => {
  const { profile } = useAuth();
  const { data: stats, isLoading: statsLoading } = useAdminStats();
  const { data: appointments } = useAppointments();
  const { data: patients } = usePatients();
  const { data: cases } = useCases();

  const s = stats || { patients: 0, appointments: 0, prescriptions: 0, orders: 0, products: 0 };
  const recentAppointments = (appointments || []).slice(0, 5);
  const recentPatients = (patients || []).slice(0, 5);
  const recentCases = (cases || []).slice(0, 4);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">Welcome, {profile?.name || "Doctor"} 👋</h1>
          <p className="text-muted-foreground text-sm mt-1">Here's what's happening in your practice today</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </div>
      </div>

      {statsLoading ? (
        <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard icon={Users} label="Total Patients" value={s.patients} />
          <StatCard icon={CalendarDays} label="Appointments" value={s.appointments} />
          <StatCard icon={FileText} label="Prescriptions" value={s.prescriptions} />
          <StatCard icon={FolderOpen} label="Cases" value={recentCases.length} />
          <StatCard icon={TrendingUp} label="Orders" value={s.orders} />
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "Add Patient", icon: UserPlus, href: "/admin/patients", color: "bg-primary/10 text-primary" },
            { label: "New Appointment", icon: CalendarDays, href: "/admin/appointments", color: "bg-info/10 text-info" },
            { label: "Write Prescription", icon: ClipboardPlus, href: "/admin/prescriptions/new", color: "bg-warning/10 text-warning" },
            { label: "New Case", icon: FolderOpen, href: "/admin/cases/new", color: "bg-success/10 text-success" },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
            {recentAppointments.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No appointments yet</p>
            ) : (
              <div className="rounded-xl border border-border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/40 text-left">
                      <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Patient</th>
                      <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Date</th>
                      <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Time</th>
                      <th className="px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAppointments.map((a: any) => (
                      <tr key={a.id} className="border-t border-border hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <UserCheck className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="font-medium text-foreground text-sm">{a.patients?.name || "Unknown"}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{a.date}</td>
                        <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{a.time_slot || "—"}</td>
                        <td className="px-4 py-3 text-right"><StatusBadge status={a.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Cases */}
        <Card className="border-border/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-primary" /> Recent Cases
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" asChild>
              <Link to="/admin/cases">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentCases.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No cases yet</p>
            ) : (
              recentCases.map((c: any) => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                      <FolderOpen className="w-4 h-4 text-warning" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{c.patients?.name || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground truncate">{c.symptoms?.substring(0, 40) || "No symptoms"}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

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
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {(recentPatients || []).map((p: any) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">{p.name?.charAt(0) || "?"}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.age ? `${p.age}y` : ""} {p.gender || ""}</p>
                </div>
              </div>
            ))}
            {recentPatients.length === 0 && <p className="text-sm text-muted-foreground col-span-full text-center py-4">No patients yet</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
