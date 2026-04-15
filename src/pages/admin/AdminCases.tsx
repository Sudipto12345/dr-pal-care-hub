import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { useCases, useDeleteCase } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Eye, Pencil, Trash2, Copy, User, MessageSquare, Brain, Activity, Stethoscope, History, Users, FlaskConical, Lightbulb, Pill, CalendarDays, Venus, Mars } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { toast } from "sonner";

const InfoRow = ({ label, value }: { label: string; value: string | undefined }) => {
  if (!value) return null;
  return (
    <div className="flex gap-2">
      <span className="text-muted-foreground text-xs font-medium min-w-[100px] shrink-0">{label}:</span>
      <span className="text-foreground text-xs">{value}</span>
    </div>
  );
};

const SectionBlock = ({ icon: Icon, title, children, color = "primary" }: { icon: any; title: string; children: React.ReactNode; color?: string }) => (
  <div className="border border-border rounded-xl p-3 space-y-1.5">
    <div className="flex items-center gap-1.5 mb-2">
      <Icon className={`w-3.5 h-3.5 text-${color}`} />
      <span className="text-xs font-semibold text-foreground">{title}</span>
    </div>
    {children}
  </div>
);

const buildCopyText = (c: any) => {
  const fd = c.form_data || {};
  const lines: string[] = [];
  lines.push(`=== CASE: ${c.patients?.name || "Unknown"} ===`);
  lines.push(`Date: ${new Date(c.created_at).toLocaleDateString()}`);
  if (fd.age) lines.push(`Age: ${fd.age} ${fd.ageUnit || ""}`);
  if (fd.sex) lines.push(`Sex: ${fd.sex}`);
  if (fd.occupation) lines.push(`Occupation: ${fd.occupation}`);
  if (fd.phone) lines.push(`Phone: ${fd.phone}`);
  if (fd.address) lines.push(`Address: ${fd.address}`);

  if (fd.complaints?.length) {
    lines.push(`\n--- Chief Complaints ---`);
    fd.complaints.forEach((comp: any, i: number) => {
      if (comp.complaint) lines.push(`${i + 1}. ${comp.complaint} (Duration: ${comp.duration || "—"}, Location: ${comp.location || "—"}, Sensation: ${comp.sensation || "—"}, Better: ${comp.betterBy || "—"}, Worse: ${comp.worseBy || "—"})`);
    });
  }

  if (fd.temperament || fd.fears || fd.anger) {
    lines.push(`\n--- Mental & Emotional ---`);
    if (fd.temperament) lines.push(`Temperament: ${fd.temperament}`);
    if (fd.fears) lines.push(`Fears: ${fd.fears}`);
    if (fd.anger) lines.push(`Anger: ${fd.anger}`);
    if (fd.memory) lines.push(`Memory: ${fd.memory}`);
    if (fd.confidence) lines.push(`Confidence: ${fd.confidence}`);
    if (fd.stressHistory) lines.push(`Stress: ${fd.stressHistory}`);
    if (fd.company) lines.push(`Company: ${fd.company}`);
  }

  if (fd.appetite || fd.thirst || fd.thermalType) {
    lines.push(`\n--- Physical Generals ---`);
    if (fd.appetite) lines.push(`Appetite: ${fd.appetite}`);
    if (fd.thirst) lines.push(`Thirst: ${fd.thirst}`);
    const desires = [fd.desireSweet && "Sweet", fd.desireSalt && "Salt", fd.desireSour && "Sour", fd.desireSpicy && "Spicy", fd.desireMeat && "Meat"].filter(Boolean).join(", ");
    if (desires) lines.push(`Desires: ${desires}`);
    if (fd.aversion) lines.push(`Aversion: ${fd.aversion}`);
    if (fd.sleep) lines.push(`Sleep: ${fd.sleep}`);
    if (fd.dreams) lines.push(`Dreams: ${fd.dreams}`);
    if (fd.thermalType) lines.push(`Thermal: ${fd.thermalType}`);
  }

  if (fd.majorIllness || fd.surgery) {
    lines.push(`\n--- Past History ---`);
    if (fd.majorIllness) lines.push(`Major Illness: ${fd.majorIllness}`);
    if (fd.surgery) lines.push(`Surgery: ${fd.surgery}`);
    if (fd.medHistory) lines.push(`Medications: ${fd.medHistory}`);
  }

  if (fd.weight || fd.bp) {
    lines.push(`\n--- Physical Exam ---`);
    if (fd.weight) lines.push(`Weight: ${fd.weight} kg`);
    if (fd.height) lines.push(`Height: ${fd.height}`);
    if (fd.pulse) lines.push(`Pulse: ${fd.pulse}`);
    if (fd.bp) lines.push(`BP: ${fd.bp}`);
  }

  if (fd.medicine) {
    lines.push(`\n--- Prescription ---`);
    lines.push(`Medicine: ${fd.medicine} ${fd.potency || ""} ${fd.dose || ""}`);
    if (fd.repetition) lines.push(`Repetition: ${fd.repetition}`);
  }

  if (c.symptoms) lines.push(`\nSymptoms: ${c.symptoms}`);
  if (c.history) lines.push(`History: ${c.history}`);
  if (c.notes) lines.push(`Notes: ${c.notes}`);

  return lines.join("\n");
};

const AdminCases = () => {
  const { data: cases, isLoading } = useCases();
  const deleteCase = useDeleteCase();
  const [viewCase, setViewCase] = useState<any>(null);

  const handleCopy = (c: any) => {
    navigator.clipboard.writeText(buildCopyText(c));
    toast.success("Case copied to clipboard!");
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-0 animate-fade-in">
      <PageHeader
        title="Case Management"
        description="Track patient cases and treatment progress"
        actions={<Button variant="hero" size="sm" asChild><Link to="/admin/cases/new"><Plus className="w-4 h-4 mr-1" /> New Case</Link></Button>}
      />
      <DataTable
        data={cases || []}
        searchPlaceholder="Search cases..."
        columns={[
          { header: "Patient", accessor: (row: any) => row.patients?.name || "Unknown" },
          { header: "Symptoms", accessor: (row: any) => row.symptoms?.substring(0, 50) || "—" },
          { header: "Date", accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
          {
            header: "Actions",
            accessor: (row: any) => (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setViewCase(row)} title="View"><Eye className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" asChild title="Edit"><Link to={`/admin/cases/${row.id}/edit`}><Pencil className="w-3.5 h-3.5" /></Link></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(row)} title="Copy"><Copy className="w-3.5 h-3.5" /></Button>
                <ConfirmDialog
                  trigger={<Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>}
                  title="Delete Case"
                  description="Are you sure? This cannot be undone."
                  confirmLabel="Delete"
                  variant="destructive"
                  onConfirm={() => deleteCase.mutate(row.id)}
                />
              </div>
            ),
          },
        ]}
      />

      {/* Full Case View Dialog */}
      <Dialog open={!!viewCase} onOpenChange={() => setViewCase(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Case: {viewCase?.patients?.name || "Unknown"}
            </DialogTitle>
            <DialogDescription>
              Created: {viewCase && new Date(viewCase.created_at).toLocaleDateString()} 
              {viewCase?.form_data ? " • Full structured data available" : " • Basic data only"}
            </DialogDescription>
          </DialogHeader>

          {viewCase?.form_data && Object.keys(viewCase.form_data).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Patient Info */}
              <SectionBlock icon={User} title="Patient Information">
                <InfoRow label="Age" value={viewCase.form_data.age ? `${viewCase.form_data.age} ${viewCase.form_data.ageUnit || ""}` : undefined} />
                <InfoRow label="Sex" value={viewCase.form_data.sex} />
                <InfoRow label="Marital" value={viewCase.form_data.maritalStatus} />
                <InfoRow label="Occupation" value={viewCase.form_data.occupation} />
                <InfoRow label="Phone" value={viewCase.form_data.phone} />
                <InfoRow label="Address" value={viewCase.form_data.address} />
              </SectionBlock>

              {/* Complaints */}
              <SectionBlock icon={MessageSquare} title="Chief Complaints" color="destructive">
                {viewCase.form_data.complaints?.map((c: any, i: number) => (
                  c.complaint ? (
                    <div key={i} className="p-2 bg-muted/30 rounded-lg text-xs space-y-0.5">
                      <p className="font-medium">{i + 1}. {c.complaint}</p>
                      <p className="text-muted-foreground">
                        {[c.duration && `Duration: ${c.duration}`, c.location && `Location: ${c.location}`, c.sensation && `Sensation: ${c.sensation}`].filter(Boolean).join(" • ")}
                      </p>
                      <p className="text-muted-foreground">
                        {[c.betterBy && `Better: ${c.betterBy}`, c.worseBy && `Worse: ${c.worseBy}`].filter(Boolean).join(" • ")}
                      </p>
                    </div>
                  ) : null
                ))}
              </SectionBlock>

              {/* Mental */}
              <SectionBlock icon={Brain} title="Mental & Emotional" color="info">
                <InfoRow label="Temperament" value={viewCase.form_data.temperament} />
                <InfoRow label="Fears" value={viewCase.form_data.fears} />
                <InfoRow label="Anger" value={viewCase.form_data.anger} />
                <InfoRow label="Memory" value={viewCase.form_data.memory} />
                <InfoRow label="Confidence" value={viewCase.form_data.confidence} />
                <InfoRow label="Stress" value={viewCase.form_data.stressHistory} />
                <InfoRow label="Company" value={viewCase.form_data.company} />
              </SectionBlock>

              {/* Physical Generals */}
              <SectionBlock icon={Activity} title="Physical Generals" color="secondary">
                <InfoRow label="Appetite" value={viewCase.form_data.appetite} />
                <InfoRow label="Thirst" value={viewCase.form_data.thirst} />
                {(() => {
                  const fd = viewCase.form_data;
                  const desires = [fd.desireSweet && "Sweet", fd.desireSalt && "Salt", fd.desireSour && "Sour", fd.desireSpicy && "Spicy", fd.desireMeat && "Meat"].filter(Boolean).join(", ");
                  return desires ? <InfoRow label="Desires" value={desires} /> : null;
                })()}
                <InfoRow label="Aversion" value={viewCase.form_data.aversion} />
                <InfoRow label="Sweat" value={viewCase.form_data.sweatQty} />
                <InfoRow label="Sleep" value={viewCase.form_data.sleep} />
                <InfoRow label="Dreams" value={viewCase.form_data.dreams} />
                <InfoRow label="Thermal" value={viewCase.form_data.thermalType} />
                <InfoRow label="Weather" value={viewCase.form_data.weatherEffect} />
              </SectionBlock>

              {/* Female/Male */}
              {viewCase.form_data.menstruation && (
                <SectionBlock icon={Venus} title="Female Section" color="destructive">
                  <InfoRow label="Menstruation" value={viewCase.form_data.menstruation} />
                  <InfoRow label="Flow" value={viewCase.form_data.flow} />
                  <InfoRow label="Pain" value={viewCase.form_data.mensPain} />
                  <InfoRow label="Leucorrhoea" value={viewCase.form_data.leucorrhoea} />
                </SectionBlock>
              )}
              {viewCase.form_data.sexualDesire && (
                <SectionBlock icon={Mars} title="Male Section" color="info">
                  <InfoRow label="Sexual Desire" value={viewCase.form_data.sexualDesire} />
                  <InfoRow label="Problems" value={viewCase.form_data.maleProblems} />
                </SectionBlock>
              )}

              {/* Past & Family History */}
              <SectionBlock icon={History} title="Past History">
                <InfoRow label="Major Illness" value={viewCase.form_data.majorIllness} />
                <InfoRow label="Surgery" value={viewCase.form_data.surgery} />
                <InfoRow label="Medications" value={viewCase.form_data.medHistory} />
              </SectionBlock>

              <SectionBlock icon={Users} title="Family History">
                <InfoRow label="Diabetes" value={viewCase.form_data.famDiabetes} />
                <InfoRow label="Hypertension" value={viewCase.form_data.famHypertension} />
                <InfoRow label="Cancer" value={viewCase.form_data.famCancer} />
                <InfoRow label="Other" value={viewCase.form_data.famOther} />
              </SectionBlock>

              {/* Physical Exam */}
              <SectionBlock icon={Stethoscope} title="Physical Examination">
                <InfoRow label="Weight" value={viewCase.form_data.weight ? `${viewCase.form_data.weight} kg` : undefined} />
                <InfoRow label="Height" value={viewCase.form_data.height} />
                <InfoRow label="Pulse" value={viewCase.form_data.pulse} />
                <InfoRow label="BP" value={viewCase.form_data.bp} />
                <InfoRow label="Tongue" value={viewCase.form_data.tongue} />
                <InfoRow label="Skin" value={viewCase.form_data.skin} />
              </SectionBlock>

              {/* Investigations */}
              {viewCase.form_data.investigations && (
                <SectionBlock icon={FlaskConical} title="Investigations">
                  <p className="text-xs text-foreground whitespace-pre-wrap">{viewCase.form_data.investigations}</p>
                </SectionBlock>
              )}

              {/* Totality */}
              {(viewCase.form_data.keyRubrics || viewCase.form_data.miasm) && (
                <SectionBlock icon={Lightbulb} title="Totality & Analysis" color="warning">
                  <InfoRow label="Key Rubrics" value={viewCase.form_data.keyRubrics} />
                  <InfoRow label="Miasm" value={viewCase.form_data.miasm} />
                </SectionBlock>
              )}

              {/* Prescription */}
              {viewCase.form_data.medicine && (
                <SectionBlock icon={Pill} title="Prescription" color="secondary">
                  <InfoRow label="Medicine" value={viewCase.form_data.medicine} />
                  <InfoRow label="Potency" value={viewCase.form_data.potency} />
                  <InfoRow label="Dose" value={viewCase.form_data.dose} />
                  <InfoRow label="Repetition" value={viewCase.form_data.repetition} />
                </SectionBlock>
              )}

              {/* Follow-up */}
              {(viewCase.form_data.nextVisit || viewCase.form_data.followUpNotes) && (
                <SectionBlock icon={CalendarDays} title="Follow-Up" color="info">
                  <InfoRow label="Next Visit" value={viewCase.form_data.nextVisit} />
                  <InfoRow label="Notes" value={viewCase.form_data.followUpNotes} />
                </SectionBlock>
              )}
            </div>
          ) : (
            /* Fallback: basic fields */
            <div className="space-y-3 text-sm">
              <div><span className="font-medium text-muted-foreground">Symptoms:</span><p className="mt-1 whitespace-pre-wrap">{viewCase?.symptoms || "—"}</p></div>
              <div><span className="font-medium text-muted-foreground">History:</span><p className="mt-1 whitespace-pre-wrap">{viewCase?.history || "—"}</p></div>
              <div><span className="font-medium text-muted-foreground">Notes:</span><p className="mt-1 whitespace-pre-wrap">{viewCase?.notes || "—"}</p></div>
            </div>
          )}

          {/* Bottom actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => handleCopy(viewCase)}>
              <Copy className="w-3.5 h-3.5 mr-1" /> Copy
            </Button>
            <Button variant="hero" size="sm" className="rounded-xl" asChild>
              <Link to={`/admin/cases/${viewCase?.id}/edit`}><Pencil className="w-3.5 h-3.5 mr-1" /> Edit</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCases;
