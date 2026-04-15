import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, User, Pill, CalendarDays, Stethoscope, FileText, Clock } from "lucide-react";
import { usePatient } from "@/hooks/useSupabaseData";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface TimelineEvent {
  id: string;
  date: string;
  type: "prescription" | "followup";
  title: string;
  subtitle?: string;
  details: any;
}

const AdminPatientTimeline = () => {
  const { patientId } = useParams();
  const { data: patient, isLoading: patientLoading } = usePatient(patientId || "");

  const { data: prescriptions, isLoading: rxLoading } = useQuery({
    queryKey: ["timeline-prescriptions", patientId],
    queryFn: async () => {
      const { data } = await supabase
        .from("prescriptions")
        .select("*, prescription_items(*)")
        .eq("patient_id", patientId!)
        .order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!patientId,
  });

  const { data: cases, isLoading: casesLoading } = useQuery({
    queryKey: ["timeline-cases", patientId],
    queryFn: async () => {
      const { data } = await supabase
        .from("cases")
        .select("*")
        .eq("patient_id", patientId!)
        .order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!patientId,
  });

  const isLoading = patientLoading || rxLoading || casesLoading;

  // Build unified timeline
  const timelineEvents: TimelineEvent[] = [];

  // Add prescriptions
  (prescriptions || []).forEach((rx: any) => {
    timelineEvents.push({
      id: `rx-${rx.id}`,
      date: rx.created_at,
      type: "prescription",
      title: rx.diagnosis || "Prescription",
      subtitle: `${(rx.prescription_items || []).length} medicine${(rx.prescription_items || []).length !== 1 ? "s" : ""}`,
      details: rx,
    });
  });

  // Add case follow-ups
  (cases || []).forEach((c: any) => {
    const fd = c.form_data as any;
    if (fd?.followUps?.length) {
      fd.followUps.forEach((fu: any, i: number) => {
        const fuDate = fu.date ? new Date(fu.date).toISOString() : c.created_at;
        const meds = (fu.medicines || []).filter((m: any) => m.name?.trim());
        timelineEvents.push({
          id: `fu-${c.id}-${i}`,
          date: fuDate,
          type: "followup",
          title: `Follow-Up Visit #${i + 1}`,
          subtitle: fu.status || undefined,
          details: { ...fu, medicines: meds, caseId: c.id },
        });
      });
    }
  });

  // Sort chronologically (newest first)
  timelineEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (isLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-0 animate-fade-in">
      {/* Hero */}
      <div className="bg-[hsl(var(--sidebar-background))] text-white rounded-2xl p-6 flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold flex items-center gap-2">
              Patient Timeline
            </h1>
            <p className="text-white/70 text-sm">
              {patient?.name || "Patient"} — All prescriptions & follow-ups in chronological order
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 rounded-xl" asChild>
          <Link to="/admin/patients"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Patients</Link>
        </Button>
      </div>

      {/* Patient Summary Card */}
      <div className="bg-card rounded-2xl border border-border p-5 mb-6 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="w-7 h-7 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="font-heading font-semibold text-lg">{patient?.name}</h2>
          <p className="text-sm text-muted-foreground">
            {[patient?.age && `${patient.age}y`, patient?.gender, patient?.phone].filter(Boolean).join(" · ")}
          </p>
        </div>
        <div className="flex gap-3">
          <div className="text-center px-4 py-2 bg-secondary/10 rounded-xl">
            <p className="text-lg font-bold text-secondary">{prescriptions?.length || 0}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Prescriptions</p>
          </div>
          <div className="text-center px-4 py-2 bg-info/10 rounded-xl">
            <p className="text-lg font-bold text-info">{timelineEvents.filter(e => e.type === "followup").length}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Follow-ups</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      {timelineEvents.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-12 text-center">
          <FileText className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No prescriptions or follow-ups found for this patient.</p>
        </div>
      ) : (
        <div className="relative pl-8">
          {/* Timeline line */}
          <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-secondary to-info/30 rounded-full" />

          <div className="space-y-5">
            {timelineEvents.map((event) => (
              <div key={event.id} className="relative flex gap-4">
                {/* Dot */}
                <div className="absolute -left-8 top-3 z-10">
                  <div className={`w-5 h-5 rounded-full border-2 border-background shadow-md flex items-center justify-center ${
                    event.type === "prescription" ? "bg-secondary" : "bg-info"
                  }`}>
                    {event.type === "prescription" ? (
                      <Pill className="w-2.5 h-2.5 text-white" />
                    ) : (
                      <CalendarDays className="w-2.5 h-2.5 text-white" />
                    )}
                  </div>
                </div>

                {/* Card */}
                <div className={`flex-1 rounded-2xl border p-5 transition-colors ${
                  event.type === "prescription"
                    ? "bg-card border-secondary/20 hover:border-secondary/40"
                    : "bg-card border-info/20 hover:border-info/40"
                }`}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider ${
                          event.type === "prescription"
                            ? "bg-secondary/10 text-secondary"
                            : "bg-info/10 text-info"
                        }`}>
                          {event.type === "prescription" ? "Prescription" : "Follow-Up"}
                        </span>
                        {event.subtitle && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                            event.details.status === "Improved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                            event.details.status === "Worse" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                            event.details.status === "Same" ? "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400" :
                            event.details.status === "Partially Improved" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                            "bg-muted text-muted-foreground"
                          }`}>
                            {event.subtitle}
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground">{event.title}</h3>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </span>
                  </div>

                  {/* Content based on type */}
                  {event.type === "prescription" && (
                    <div>
                      {event.details.advice && (
                        <p className="text-xs text-muted-foreground mb-3">{event.details.advice}</p>
                      )}
                      {(event.details.prescription_items || []).length > 0 && (
                        <div className="bg-muted/30 rounded-xl p-3 border border-border">
                          <div className="grid gap-2">
                            {event.details.prescription_items.map((item: any, i: number) => (
                              <div key={i} className="flex items-center gap-2 text-xs">
                                <span className="w-5 h-5 rounded-full bg-secondary/20 text-secondary text-[10px] font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                                <span className="font-medium text-foreground">{item.medicine_name}</span>
                                <span className="text-muted-foreground">
                                  {[item.potency, item.dose, item.frequency].filter(Boolean).join(" · ")}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {event.details.follow_up && (
                        <p className="text-xs text-muted-foreground mt-2">
                          <CalendarDays className="w-3 h-3 inline mr-1" />
                          Follow-up: {new Date(event.details.follow_up).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                        </p>
                      )}
                      <div className="flex gap-2 mt-3">
                        <Button variant="ghost" size="sm" className="h-7 text-xs rounded-lg" asChild>
                          <Link to={`/prescription/${event.details.id}`}>
                            <Stethoscope className="w-3 h-3 mr-1" /> View
                          </Link>
                        </Button>
                        <Button variant="ghost" size="sm" className="h-7 text-xs rounded-lg" asChild>
                          <Link to={`/admin/prescriptions/${event.details.id}/edit`}>
                            <FileText className="w-3 h-3 mr-1" /> Edit
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}

                  {event.type === "followup" && (
                    <div>
                      {event.details.improvement && (
                        <div className="mb-2">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Improvement:</span>
                          <p className="text-xs text-foreground">{event.details.improvement}</p>
                        </div>
                      )}
                      {event.details.medicine && (
                        <div className="mb-2">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Medicine (legacy):</span>
                          <p className="text-xs text-foreground">{event.details.medicine}</p>
                        </div>
                      )}
                      {event.details.notes && (
                        <div className="mb-2">
                          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Notes:</span>
                          <p className="text-xs text-foreground">{event.details.notes}</p>
                        </div>
                      )}
                      {/* Follow-up medicines */}
                      {(event.details.medicines || []).length > 0 && (
                        <div className="bg-secondary/5 rounded-xl p-3 border border-secondary/20 mt-2">
                          <div className="flex items-center gap-1.5 mb-2">
                            <Pill className="w-3 h-3 text-secondary" />
                            <span className="text-[10px] uppercase tracking-wider text-secondary font-semibold">
                              Prescription ({event.details.medicines.length} medicine{event.details.medicines.length !== 1 ? "s" : ""})
                            </span>
                          </div>
                          <div className="grid gap-1.5">
                            {event.details.medicines.map((med: any, mi: number) => (
                              <div key={mi} className="flex items-center gap-2 text-xs">
                                <span className="w-4 h-4 rounded-full bg-secondary/20 text-secondary text-[9px] font-bold flex items-center justify-center shrink-0">{mi + 1}</span>
                                <span className="font-medium text-foreground">{med.name}</span>
                                <span className="text-muted-foreground">
                                  {[med.potency, med.dose, med.frequency].filter(Boolean).join(" · ")}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="flex gap-2 mt-3">
                        <Button variant="ghost" size="sm" className="h-7 text-xs rounded-lg" asChild>
                          <Link to={`/admin/cases/${event.details.caseId}/edit`}>
                            <FileText className="w-3 h-3 mr-1" /> Edit Case
                          </Link>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPatientTimeline;
