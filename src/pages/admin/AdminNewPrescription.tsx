import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Trash2, ArrowLeft, ClipboardPlus, User, Stethoscope, Pill, MessageSquare, Eye, Calendar, Loader2, X, FileText } from "lucide-react";
import MedicineCombo from "@/components/shared/MedicineCombo";
import DiagnosisCombo from "@/components/shared/DiagnosisCombo";
import ComplaintCombo from "@/components/shared/ComplaintCombo";
import PatientSelector from "@/components/shared/PatientSelector";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { useCreatePrescription, usePrescription, useUpdatePrescription } from "@/hooks/useSupabaseData";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface MedicineRow {
  name: string;
  potency: string;
  dose: string;
  frequency: string;
}

const emptyMedicine: MedicineRow = { name: "", potency: "", dose: "", frequency: "" };
const potencyOptions = ["3X", "6X", "12X", "30C", "200C", "1M", "10M", "50M", "CM", "Q (Mother Tincture)"];

const AdminNewPrescription = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { user } = useAuth();
  const createPrescription = useCreatePrescription();
  const updatePrescription = useUpdatePrescription();
  const { data: existingRx, isLoading: rxLoading } = usePrescription(id || "");

  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [complaint, setComplaint] = useState<string[]>([]);
  const [diagnosis, setDiagnosis] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [clinicalExam, setClinicalExam] = useState({
    riskFactors: "", oe: "", pulse: "", bp: "", heart: "", lung: "", others: "",
  });
  const [medicines, setMedicines] = useState<MedicineRow[]>([{ ...emptyMedicine }]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loaded, setLoaded] = useState(false);
  const [autoPopulated, setAutoPopulated] = useState(false);

  // Fetch patient's latest case for follow-up prescription data
  const { data: patientCases } = useQuery({
    queryKey: ["patient-cases-for-rx", patientId],
    queryFn: async () => {
      if (!patientId) return [];
      const { data } = await supabase
        .from("cases")
        .select("id, form_data, created_at")
        .eq("patient_id", patientId)
        .order("created_at", { ascending: false });
      return data || [];
    },
    enabled: !!patientId && !isEditMode,
  });

  // Auto-populate from latest case follow-up medicines
  useEffect(() => {
    if (isEditMode || autoPopulated || !patientCases?.length) return;
    
    for (const c of patientCases) {
      const fd = c.form_data as any;
      if (!fd?.followUps?.length) continue;
      
      // Get the latest follow-up that has medicines
      const followUpsWithMeds = [...fd.followUps].reverse().find(
        (fu: any) => fu.medicines?.length && fu.medicines.some((m: any) => m.name?.trim())
      );
      
      if (followUpsWithMeds) {
        const meds: MedicineRow[] = followUpsWithMeds.medicines
          .filter((m: any) => m.name?.trim())
          .map((m: any) => ({
            name: m.name || "",
            potency: m.potency || "",
            dose: m.dose || "",
            frequency: m.frequency || "",
          }));
        
        if (meds.length > 0) {
          setMedicines(meds);
          if (fd.diagnosis) setDiagnosis(typeof fd.diagnosis === 'string' ? fd.diagnosis.split(", ").filter(Boolean) : [fd.diagnosis]);
          setAutoPopulated(true);
          toast.info("Auto-filled from latest case follow-up", {
            description: `${meds.length} medicine${meds.length !== 1 ? "s" : ""} loaded from case record`,
          });
          return;
        }
      }
    }
  }, [patientCases, isEditMode, autoPopulated]);

  // Load existing prescription data for edit mode
  useEffect(() => {
    if (isEditMode && existingRx && !loaded) {
      setPatientId(existingRx.patient_id);
      setPatientName((existingRx.patients as any)?.name || "");
      setDiagnosis(existingRx.diagnosis ? existingRx.diagnosis.split(", ") : []);
      setNotes(existingRx.advice || "");
      setFollowUpDate(existingRx.follow_up || "");
      if ((existingRx as any).clinical_exam) {
        const ce = (existingRx as any).clinical_exam as any;
        setClinicalExam({
          riskFactors: ce.riskFactors || "", oe: ce.oe || "", pulse: ce.pulse || "",
          bp: ce.bp || "", heart: ce.heart || "", lung: ce.lung || "", others: ce.others || "",
        });
      }
      const items = (existingRx.prescription_items || []) as any[];
      if (items.length > 0) {
        setMedicines(items.map((item: any) => ({
          name: item.medicine_name || "",
          potency: item.potency || "",
          dose: item.dose || "",
          frequency: item.frequency || "",
        })));
      }
      setLoaded(true);
    }
  }, [existingRx, isEditMode, loaded]);

  const handlePatientChange = (id: string, name: string) => {
    setPatientId(id);
    setPatientName(name);
    setAutoPopulated(false); // Reset so new patient triggers auto-populate
    if (errors.patientId) setErrors((e) => ({ ...e, patientId: "" }));
  };

  const addMedicine = () => setMedicines((m) => [...m, { ...emptyMedicine }]);

  const removeMedicine = (index: number) => {
    if (medicines.length <= 1) return;
    setMedicines((m) => m.filter((_, i) => i !== index));
  };

  const updateMedicine = (index: number, field: keyof MedicineRow, value: string) => {
    setMedicines((m) => m.map((row, i) => (i === index ? { ...row, [field]: value } : row)));
    if (errors[`med_${index}_${field}`]) setErrors((e) => ({ ...e, [`med_${index}_${field}`]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!patientId) e.patientId = "Select a patient";
    if (diagnosis.length === 0) e.diagnosis = "Diagnosis is required";
    medicines.forEach((m, i) => {
      if (!m.name.trim()) e[`med_${i}_name`] = "Required";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    const itemsPayload = medicines.filter((m) => m.name.trim()).map((m) => ({
      medicine_name: m.name,
      potency: m.potency || undefined,
      dose: m.dose || undefined,
      frequency: m.frequency || undefined,
    }));

    const hasExam = Object.values(clinicalExam).some(v => v.trim());
    const payload: any = {
      patient_id: patientId,
      doctor_id: user?.id || "",
      diagnosis: diagnosis.join(", "),
      advice: notes,
      follow_up: followUpDate || undefined,
      items: itemsPayload,
      clinical_exam: hasExam ? clinicalExam : undefined,
    };

    if (isEditMode) {
      updatePrescription.mutate({ id: id!, ...payload }, { onSuccess: () => navigate("/admin/prescriptions") });
    } else {
      createPrescription.mutate(payload, { onSuccess: () => navigate("/admin/prescriptions") });
    }
  };

  const isPending = isEditMode ? updatePrescription.isPending : createPrescription.isPending;
  const today = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

  if (isEditMode && rxLoading) {
    return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  }

  return (
    <div className="space-y-0 animate-fade-in">
      {/* Hero Banner */}
      <div className="bg-[hsl(var(--sidebar-background))] text-white rounded-2xl p-6 flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
            <ClipboardPlus className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold flex items-center gap-2">
              {isEditMode ? "Edit Prescription" : <><Plus className="w-5 h-5" /> New Prescription</>}
            </h1>
            <p className="text-white/70 text-sm">
              {isEditMode ? "Update the prescription details" : "Create a detailed prescription for your patient"}
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 rounded-xl" asChild>
          <Link to="/admin/prescriptions"><ArrowLeft className="w-4 h-4 mr-1" /> Back to List</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Information */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <h2 className="font-heading font-semibold text-base">Patient Information</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground mb-1.5 block">Select Patient *</Label>
                  <PatientSelector
                    value={patientId}
                    onChange={handlePatientChange}
                    error={errors.patientId}
                  />
                  {autoPopulated && (
                    <p className="text-xs text-info mt-1.5 flex items-center gap-1">
                      <FileText className="w-3 h-3" /> Medicines auto-filled from case follow-up
                    </p>
                  )}
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground mb-1.5 block">Follow-up Date</Label>
                  <Input type="date" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} className="rounded-xl h-10" />
                </div>
              </div>
            </div>

            {/* Clinical Details */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-destructive" />
                </div>
                <h2 className="font-heading font-semibold text-base">Clinical Details</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-muted-foreground mb-1.5 block">Chief Complaint</Label>
                  <ComplaintCombo multi value={complaint} onChange={setComplaint} />
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground mb-1.5 block">Diagnosis *</Label>
                  <DiagnosisCombo
                    multi
                    value={diagnosis}
                    onChange={(v) => { setDiagnosis(v); if (errors.diagnosis) setErrors((er) => ({ ...er, diagnosis: "" })); }}
                  />
                  {errors.diagnosis && <p className="text-xs text-destructive mt-1">{errors.diagnosis}</p>}
                </div>
              </div>
            </div>

            {/* Medicines */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Pill className="w-4 h-4 text-secondary" />
                  </div>
                  <h2 className="font-heading font-semibold text-base">Medicines</h2>
                </div>
                <span className="text-sm text-secondary font-medium">{medicines.length} medicine{medicines.length !== 1 ? "s" : ""}</span>
              </div>

              <div className="space-y-4">
                {medicines.map((med, i) => (
                  <div key={i} className="p-5 rounded-xl border border-border bg-muted/20 space-y-4 relative">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-secondary text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                        <span className="text-sm font-semibold text-foreground">Medicine #{i + 1}</span>
                      </div>
                      {medicines.length > 1 && (
                        <ConfirmDialog
                          trigger={<Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>}
                          title="Remove Medicine"
                          description={med.name ? `Remove "${med.name}"?` : "Remove this medicine?"}
                          confirmLabel="Remove"
                          variant="destructive"
                          onConfirm={() => removeMedicine(i)}
                        />
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-xs text-muted-foreground">Medicine Name *</Label>
                        <div className="mt-1">
                          <MedicineCombo
                            value={med.name}
                            onChange={(name, defaults) => {
                              updateMedicine(i, "name", name);
                              if (defaults?.potency && !med.potency) updateMedicine(i, "potency", defaults.potency);
                              if (defaults?.dose && !med.dose) updateMedicine(i, "dose", defaults.dose);
                              if (defaults?.frequency && !med.frequency) updateMedicine(i, "frequency", defaults.frequency);
                            }}
                          />
                        </div>
                        {errors[`med_${i}_name`] && <p className="text-xs text-destructive mt-1">{errors[`med_${i}_name`]}</p>}
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Potency</Label>
                        <select value={med.potency} onChange={(e) => updateMedicine(i, "potency", e.target.value)}
                          className="mt-1 w-full h-10 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                          <option value="">Select</option>
                          {potencyOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Dose</Label>
                        <Input value={med.dose} onChange={(e) => updateMedicine(i, "dose", e.target.value)} placeholder="e.g., 4 pills, Twice Daily" className="mt-1 rounded-xl" />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs text-muted-foreground">Frequency / Repetition</Label>
                      <Input value={med.frequency} onChange={(e) => updateMedicine(i, "frequency", e.target.value)} placeholder="e.g., 5 Days, then wait / Once daily x 7 days" className="mt-1 rounded-xl" />
                    </div>
                  </div>
                ))}
              </div>

              <Button type="button" variant="outline" size="sm" onClick={addMedicine} className="mt-4 rounded-xl text-secondary border-secondary/30 hover:bg-secondary/5">
                <Plus className="w-4 h-4 mr-1" /> Add Another Medicine
              </Button>
            </div>

            {/* Advice & Instructions */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 rounded-lg bg-info/10 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-info" />
                </div>
                <h2 className="font-heading font-semibold text-base">Advice & Instructions</h2>
              </div>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Dietary advice, lifestyle changes, do's and don'ts..." className="rounded-xl min-h-[120px] resize-y" />
            </div>
          </div>

          {/* Right: Preview Panel */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-7 h-7 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-secondary" />
                </div>
                <h2 className="font-heading font-semibold text-base">Preview</h2>
              </div>

              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                  <User className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="font-semibold text-foreground">{patientName || "Select Patient"}</p>
                <p className="text-xs text-muted-foreground">{today}</p>
              </div>

              {diagnosis.length > 0 && (
                <div className="mb-4 p-3 rounded-xl bg-muted/30 border border-border">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">Diagnosis</p>
                  <p className="text-sm text-foreground">{diagnosis.join(", ")}</p>
                </div>
              )}

              <div className="mb-6">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-2">Medicines</p>
                {medicines.some((m) => m.name) ? (
                  <div className="space-y-2">
                    {medicines.filter((m) => m.name).map((m, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-muted/30 border border-border">
                        <p className="text-sm font-medium text-foreground">{m.name}</p>
                        <p className="text-xs text-muted-foreground">{[m.potency, m.dose, m.frequency].filter(Boolean).join(" · ") || "—"}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No medicines added yet</p>
                )}
              </div>

              <div className="space-y-2">
                <Button type="submit" variant="hero" className="w-full rounded-xl" disabled={isPending}>
                  {isPending && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                  <ClipboardPlus className="w-4 h-4 mr-2" /> {isEditMode ? "Update Prescription" : "Create Prescription"}
                </Button>
                <Button type="button" variant="outline" className="w-full rounded-xl" asChild>
                  <Link to="/admin/prescriptions"><X className="w-4 h-4 mr-1" /> Cancel</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminNewPrescription;
