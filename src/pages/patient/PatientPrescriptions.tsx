import { Loader2, FileText, Pill, CalendarCheck, Download, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePrescriptions } from "@/hooks/useSupabaseData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const PatientPrescriptions = () => {
  const { user } = useAuth();

  const { data: patient } = useQuery({
    queryKey: ["my-patient-record", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("patients").select("*").eq("user_id", user!.id).maybeSingle();
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: prescriptions = [], isLoading } = useQuery({
    queryKey: ["my-prescriptions", patient?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("prescriptions")
        .select("*, prescription_items(*)")
        .eq("patient_id", patient!.id)
        .order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!patient?.id,
  });

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-primary rounded-2xl p-5 flex items-center justify-between text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold">My Prescriptions</h1>
            <p className="text-xs text-primary-foreground/70">View and download all your prescriptions from Dr. Amit Kumar Pal</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
          <p className="text-xl font-bold">{prescriptions.length}</p>
          <p className="text-[10px] text-primary-foreground/70">Total</p>
        </div>
      </div>

      {/* Prescription Cards */}
      {prescriptions.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No prescriptions yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {prescriptions.map((rx: any) => {
            const items = rx.prescription_items || [];
            const rxDate = new Date(rx.created_at);
            const rxId = `RX-${rxDate.toISOString().split("T")[0].replace(/-/g, "")}-${String(rx.id).substring(0, 4)}`;
            const followUp = rx.follow_up ? new Date(rx.follow_up).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : null;

            return (
              <div key={rx.id} className="bg-card border border-border rounded-2xl overflow-hidden">
                {/* Rx Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">{rxId}</p>
                      <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <CalendarCheck className="w-3 h-3" />
                        {rxDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {followUp && (
                      <div className="border border-primary/30 rounded-xl px-3 py-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <div>
                          <p className="text-[9px] text-muted-foreground uppercase tracking-wider">Next Visit</p>
                          <p className="text-xs font-bold text-primary">{followUp}</p>
                        </div>
                      </div>
                    )}
                    <Button size="sm" className="rounded-xl" asChild>
                      <Link to={`/prescription/${rx.id}`}>
                        <Download className="w-3.5 h-3.5 mr-1" /> PDF
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Medicine Items */}
                <div className="p-5 space-y-4">
                  {items.map((m: any, i: number) => (
                    <div key={m.id || i} className="bg-muted/30 border border-border/40 rounded-xl p-4">
                      <p className="text-xs font-bold text-primary flex items-center gap-1.5 mb-3">
                        <Pill className="w-3.5 h-3.5" /> Prescription
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Medicine</p>
                          <p className="text-sm font-semibold mt-0.5">{m.medicine_name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Potency</p>
                          <p className="text-sm font-semibold mt-0.5">{m.potency || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Dose</p>
                          <p className="text-sm mt-0.5">{m.dose || "—"}</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Repetition</p>
                          <p className="text-sm mt-0.5">{m.frequency || "—"}</p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Advice */}
                  {rx.advice && (
                    <div className="border-t border-border/40 pt-3 mt-2">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Advice</p>
                      <p className="text-sm mt-0.5">{rx.advice}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-[10px] text-muted-foreground py-4 border-t border-border/30">
        🔒 This is your personal medical record. Please consult your doctor for any queries.
        <span className="float-right">Dr. Amit Kumar Pal © {new Date().getFullYear()}. All Rights Reserved.</span>
      </div>
    </div>
  );
};

export default PatientPrescriptions;
