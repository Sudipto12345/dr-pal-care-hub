import { useState, useEffect } from "react";
import { CalendarDays, FileText, ShoppingBag, Clock, ArrowRight, Plus, Loader2, User, MessageSquare, Brain, Activity, Stethoscope, History, Users, FlaskConical, Lightbulb, Pill, Venus, Mars, Download, Upload, ClipboardList, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import EmptyState from "@/components/shared/EmptyState";
import { useAuth } from "@/hooks/useAuth";
import { useMyAppointments } from "@/hooks/useSupabaseData";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const InfoRow = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div className="flex justify-between py-1.5 border-b border-border/30 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-xs font-medium text-foreground">{value}</span>
    </div>
  );
};

const SectionCard = ({ icon: Icon, title, children, color = "primary" }: { icon: any; title: string; children: React.ReactNode; color?: string }) => (
  <div className="bg-card rounded-2xl border border-border p-4">
    <div className="flex items-center gap-2 mb-3">
      <div className={`w-6 h-6 rounded-lg bg-${color}/10 flex items-center justify-center`}>
        <Icon className={`w-3.5 h-3.5 text-${color}`} />
      </div>
      <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">{title}</h3>
    </div>
    {children}
  </div>
);

const PatientDashboard = () => {
  const { user, profile } = useAuth();
  const { data: appointments, isLoading: apptLoading } = useMyAppointments(user?.id);

  // Get patient record linked to this user
  const { data: patient } = useQuery({
    queryKey: ["my-patient-record", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("patients").select("*").eq("user_id", user!.id).maybeSingle();
      return data;
    },
    enabled: !!user?.id,
  });

  // Get patient's case
  const { data: myCase } = useQuery({
    queryKey: ["my-case", patient?.id],
    queryFn: async () => {
      const { data } = await supabase.from("cases").select("*, patients(name, age, gender, phone, address)").eq("patient_id", patient!.id).order("created_at", { ascending: false }).limit(1).maybeSingle();
      return data;
    },
    enabled: !!patient?.id,
  });

  // Get patient's prescriptions
  const { data: prescriptions = [] } = useQuery({
    queryKey: ["my-prescriptions", patient?.id],
    queryFn: async () => {
      const { data } = await supabase.from("prescriptions").select("*, prescription_items(*)").eq("patient_id", patient!.id).order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!patient?.id,
  });

  const fd = (myCase?.form_data || {}) as any;
  const patientName = patient?.name || profile?.name || "Patient";
  const initials = patientName.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase();
  const caseDate = myCase ? new Date(myCase.updated_at || myCase.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }) : "";
  const memberSince = patient ? new Date(patient.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "";
  const upcomingAppts = (appointments || []).filter((a: any) => a.status !== "cancelled").slice(0, 3);

  if (!user) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  const desires = [fd.desireSweet && "Sweet", fd.desireSalt && "Salt", fd.desireSour && "Sour", fd.desireSpicy && "Spicy", fd.desireMeat && "Meat"].filter(Boolean).join(", ");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-[hsl(var(--sidebar-background))] text-white rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-11 w-11 border-2 border-white/20">
            <AvatarFallback className="bg-white/10 text-white font-bold">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-bold">Welcome, {patientName}</h1>
            <p className="text-white/60 text-xs">
              {patient?.id ? `Patient ID: NLH-${new Date(patient.created_at).getFullYear()}-${String(patient.id).substring(0, 4).toUpperCase()}` : ""} · Last updated: {caseDate}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 rounded-xl" asChild>
          <Link to="/book-appointment"><CalendarDays className="w-4 h-4 mr-1" /> Book Appointment</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center"><FileText className="w-5 h-5 text-secondary" /></div>
          <div><p className="text-xl font-bold">{prescriptions.length}</p><p className="text-xs text-muted-foreground">Prescriptions</p></div>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center"><FlaskConical className="w-5 h-5 text-info" /></div>
          <div><p className="text-xl font-bold">0</p><p className="text-xs text-muted-foreground">Reports</p></div>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center"><CalendarDays className="w-5 h-5 text-warning" /></div>
          <div><p className="text-xl font-bold">{appointments?.length || 0}</p><p className="text-xs text-muted-foreground">Appointments</p></div>
        </div>
        <div className="bg-card rounded-2xl border border-border p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Shield className="w-5 h-5 text-primary" /></div>
          <div><p className="text-xl font-bold">Member</p><p className="text-xs text-muted-foreground">Since {memberSince}</p></div>
        </div>
      </div>

      {/* My Case Details */}
      {myCase && (
        <>
          <div className="bg-[hsl(var(--sidebar-background))]/5 border border-[hsl(var(--sidebar-background))]/20 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5 text-primary" />
                <div>
                  <h2 className="font-bold text-base">My Case Details</h2>
                  <p className="text-xs text-muted-foreground">Overview of your case as recorded by Dr. Amit Kumar Pal</p>
                </div>
              </div>
              {caseDate && (
                <span className="text-[10px] bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                  ✅ Last Updated: {caseDate}
                </span>
              )}
            </div>

            {/* Patient Header Card */}
            <div className="bg-card rounded-2xl border border-border p-5 mb-4">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14 border-2 border-primary/20">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">{initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold text-lg">{patientName}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                      {fd.age && <span>🎂 Age: <b className="text-foreground">{fd.age} {fd.ageUnit || "Years"}</b></span>}
                      {fd.sex && <span>⚧ Gender: <b className="text-foreground">{fd.sex}</b></span>}
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                      {patient?.phone && <span>📞 {patient.phone}</span>}
                      {fd.address && <span>📍 {fd.address}</span>}
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1.5">
                      {fd.maritalStatus && <span>💍 {fd.maritalStatus}</span>}
                      {fd.occupation && <span>💼 {fd.occupation}</span>}
                      {caseDate && <span>📅 Recorded: {caseDate}</span>}
                    </div>
                  </div>
                </div>
                <div className="bg-muted/40 rounded-xl p-3 text-center shrink-0">
                  <Avatar className="h-10 w-10 mx-auto mb-1">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">AK</AvatarFallback>
                  </Avatar>
                  <p className="text-xs font-bold">Dr. Amit Kumar Pal</p>
                  <p className="text-[10px] text-muted-foreground">BHMS (DU), DHMS (Homeopathy)</p>
                  <p className="text-[10px] text-muted-foreground">Classical Homeopath</p>
                  <p className="text-[10px] text-muted-foreground">Newlife Homeo Hall</p>
                </div>
              </div>
            </div>

            {/* Case Data Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Chief Complaints */}
              {fd.complaints?.some((c: any) => c.complaint) && (
                <SectionCard icon={MessageSquare} title="Chief Complaints" color="destructive">
                  {fd.complaints.filter((c: any) => c.complaint).map((c: any, i: number) => (
                    <div key={i} className="mb-3 last:mb-0">
                      <p className="text-xs font-semibold flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-destructive/10 text-destructive text-[10px] font-bold flex items-center justify-center">{i+1}</span>
                        {c.complaint}
                      </p>
                      <div className="ml-6 text-[11px] text-muted-foreground space-y-0.5 mt-1">
                        {c.duration && <p>⏱ {c.duration}</p>}
                        {c.location && <p>📍 {c.location}</p>}
                        {c.sensation && <p>✋ {c.sensation}</p>}
                        {c.betterBy && <p className="text-green-600">🟢 Better: {c.betterBy}</p>}
                        {c.worseBy && <p className="text-red-600">🔴 Worse: {c.worseBy}</p>}
                      </div>
                    </div>
                  ))}
                </SectionCard>
              )}

              {/* Mental & Emotional */}
              {(fd.temperament || fd.fears || fd.anger) && (
                <SectionCard icon={Brain} title="Mental & Emotional" color="info">
                  <InfoRow label="Temperament" value={fd.temperament} />
                  <InfoRow label="Fears" value={fd.fears} />
                  <InfoRow label="Anger" value={fd.anger} />
                  <InfoRow label="Confidence" value={fd.confidence} />
                  <InfoRow label="Stress / Grief" value={fd.stressHistory} />
                  <InfoRow label="Memory" value={fd.memory} />
                  <InfoRow label="Company Pref." value={fd.company} />
                </SectionCard>
              )}

              {/* Physical Generals */}
              {(fd.appetite || fd.thirst || fd.thermalType) && (
                <SectionCard icon={Activity} title="Physical Generals" color="secondary">
                  <InfoRow label="Appetite" value={fd.appetite} />
                  <InfoRow label="Thirst" value={fd.thirst} />
                  <InfoRow label="Desire (food)" value={desires} />
                  <InfoRow label="Aversion" value={fd.aversion} />
                  <InfoRow label="Sweat" value={fd.sweatQty} />
                  <InfoRow label="Sleep" value={fd.sleep} />
                  <InfoRow label="Dreams" value={fd.dreams} />
                  <InfoRow label="Thermal" value={fd.thermalType} />
                </SectionCard>
              )}

              {/* Female Section */}
              {fd.menstruation && (
                <SectionCard icon={Venus} title="Female Section" color="destructive">
                  <InfoRow label="Menstruation" value={fd.menstruation} />
                  <InfoRow label="Flow" value={fd.flow} />
                  <InfoRow label="Pain" value={fd.mensPain} />
                  <InfoRow label="Leucorrhoea" value={fd.leucorrhoea} />
                </SectionCard>
              )}

              {/* Past History */}
              {(fd.majorIllness || fd.surgery || fd.medHistory) && (
                <SectionCard icon={History} title="Past History" color="secondary">
                  <InfoRow label="Major Illness" value={fd.majorIllness} />
                  <InfoRow label="Surgery / Injury" value={fd.surgery} />
                  <InfoRow label="Medication" value={fd.medHistory} />
                </SectionCard>
              )}

              {/* Family History */}
              {(fd.famDiabetes || fd.famHypertension || fd.famCancer || fd.famOther) && (
                <SectionCard icon={Users} title="Family History">
                  <InfoRow label="Diabetes" value={fd.famDiabetes} />
                  <InfoRow label="Hypertension" value={fd.famHypertension} />
                  <InfoRow label="Cancer" value={fd.famCancer} />
                  <InfoRow label="Other" value={fd.famOther} />
                </SectionCard>
              )}

              {/* Male Section */}
              {fd.sexualDesire && (
                <SectionCard icon={Mars} title="Male Section" color="info">
                  <InfoRow label="Sexual Desire" value={fd.sexualDesire} />
                  <InfoRow label="Problems" value={fd.maleProblems} />
                </SectionCard>
              )}

              {/* Physical Exam */}
              <SectionCard icon={Stethoscope} title="Physical Exam">
                <InfoRow label="Weight" value={fd.weight ? `${fd.weight} kg` : undefined} />
                <InfoRow label="Height" value={fd.height} />
                <InfoRow label="Pulse" value={fd.pulse} />
                <InfoRow label="BP" value={fd.bp} />
                <InfoRow label="Tongue" value={fd.tongue} />
                <InfoRow label="Skin" value={fd.skin} />
              </SectionCard>

              {/* Investigations */}
              <SectionCard icon={FlaskConical} title="Investigations" color="info">
                <p className="text-xs text-muted-foreground">{fd.investigations || "No Lab report."}</p>
              </SectionCard>
            </div>

            {/* Totality & Analysis */}
            {(fd.keyRubrics || fd.miasm) && (
              <div className="mt-4 bg-warning/5 border border-warning/20 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-warning" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">Totality & Analysis</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {fd.keyRubrics && <div className="text-xs"><span className="text-muted-foreground">Key Rubrics:</span> <span className="font-medium">{fd.keyRubrics}</span></div>}
                  {fd.miasm && (
                    <div className="text-xs flex items-center gap-1.5">
                      <span className="text-muted-foreground">Miasm</span>
                      <span className="bg-destructive/10 text-destructive px-2 py-0.5 rounded-full text-[10px] font-semibold">{fd.miasm}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Prescription from case */}
            {fd.medicine && (
              <div className="mt-4 bg-secondary/5 border border-secondary/20 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Pill className="w-4 h-4 text-secondary" />
                  <h3 className="text-xs font-bold uppercase tracking-wider">Prescription</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground tracking-wider">Medicine</p>
                    <p className="font-semibold text-secondary">{fd.medicine}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground tracking-wider">Potency</p>
                    <p className="font-semibold text-secondary">{fd.potency || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground tracking-wider">Dose</p>
                    <p className="font-semibold">{fd.dose || "—"}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-muted-foreground tracking-wider">Repetition</p>
                    <p className="font-semibold">{fd.repetition || "—"}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Bottom Cards: Recent Prescriptions, Reports, Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Prescriptions */}
        <Card className="border-border/60 rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-secondary/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-secondary" />
              </div>
              <CardTitle className="text-sm font-bold">Recent Prescriptions</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-primary" asChild>
              <Link to="/patient/prescriptions">View All <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            {prescriptions.length === 0 ? (
              <EmptyState icon={FileText} title="No prescriptions yet" description="Your prescriptions will appear here" />
            ) : (
              <div className="space-y-2">
                {prescriptions.slice(0, 3).map((rx: any) => (
                  <div key={rx.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                        <Pill className="w-3.5 h-3.5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs font-medium">RX-{new Date(rx.created_at).toISOString().split("T")[0].replace(/-/g, "")}-{String(rx.id).substring(0, 4)}</p>
                        <p className="text-[10px] text-muted-foreground">{rx.diagnosis || "General"} · {new Date(rx.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                      <Link to={`/prescription/${rx.id}`}><Download className="w-3.5 h-3.5" /></Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right column: Reports + Appointments */}
        <div className="space-y-6">
          <Card className="border-border/60 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-info/10 flex items-center justify-center">
                  <FlaskConical className="w-4 h-4 text-info" />
                </div>
                <CardTitle className="text-sm font-bold">Recent Reports</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-primary">
                <Upload className="w-3 h-3 mr-1" /> Upload
              </Button>
            </CardHeader>
            <CardContent>
              <EmptyState icon={FlaskConical} title="No reports yet" description="Upload your lab reports here" />
            </CardContent>
          </Card>

          <Card className="border-border/60 rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-warning/10 flex items-center justify-center">
                  <CalendarDays className="w-4 h-4 text-warning" />
                </div>
                <CardTitle className="text-sm font-bold">Recent Appointments</CardTitle>
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-primary" asChild>
                <Link to="/patient/appointments">All <ArrowRight className="w-3 h-3 ml-1" /></Link>
              </Button>
            </CardHeader>
            <CardContent>
              {upcomingAppts.length === 0 ? (
                <EmptyState icon={CalendarDays} title="No appointments" description="Book your next visit" actionLabel="Book Now" actionHref="/book-appointment" />
              ) : (
                <div className="space-y-2">
                  {upcomingAppts.map((a: any) => (
                    <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                      <div>
                        <p className="text-xs font-medium">{a.date} {a.time_slot ? `at ${a.time_slot}` : ""}</p>
                        <p className="text-[10px] text-muted-foreground">{a.notes || "General consultation"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-[10px] text-muted-foreground py-4 border-t border-border/30">
        🔒 This is your personal medical record. Please consult your doctor for any queries.
        <span className="float-right">Dr. Amit Kumar Pal © {new Date().getFullYear()}. All Rights Reserved.</span>
      </div>
    </div>
  );
};

export default PatientDashboard;
