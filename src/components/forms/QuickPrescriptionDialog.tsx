import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, ClipboardPlus, Loader2, Activity } from "lucide-react";
import MedicineCombo from "@/components/shared/MedicineCombo";
import DiagnosisCombo from "@/components/shared/DiagnosisCombo";
import PatientSelector from "@/components/shared/PatientSelector";
import { useCreatePrescription } from "@/hooks/useSupabaseData";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface MedicineRow {
  name: string;
  potency: string;
  dose: string;
  frequency: string;
}

const emptyMedicine: MedicineRow = { name: "", potency: "", dose: "", frequency: "" };
const potencyOptions = ["3X", "6X", "12X", "30C", "200C", "1M", "10M", "50M", "CM", "Q (Mother Tincture)"];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const QuickPrescriptionDialog = ({ open, onOpenChange }: Props) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createPrescription = useCreatePrescription();

  const [patientId, setPatientId] = useState("");
  const [diagnosis, setDiagnosis] = useState<string[]>([]);
  const [advice, setAdvice] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [clinicalExam, setClinicalExam] = useState({
    riskFactors: "", oe: "", pulse: "", bp: "", heart: "", lung: "", others: "",
  });
  const [medicines, setMedicines] = useState<MedicineRow[]>([{ ...emptyMedicine }]);

  const reset = () => {
    setPatientId("");
    setDiagnosis([]);
    setAdvice("");
    setFollowUp("");
    setClinicalExam({ riskFactors: "", oe: "", pulse: "", bp: "", heart: "", lung: "", others: "" });
    setMedicines([{ ...emptyMedicine }]);
  };

  const handleSubmit = () => {
    if (!patientId) { toast.error("Select a patient"); return; }
    if (diagnosis.length === 0) { toast.error("Diagnosis is required"); return; }
    if (!medicines.some(m => m.name.trim())) { toast.error("Add at least one medicine"); return; }

    const hasExam = Object.values(clinicalExam).some(v => v.trim());
    createPrescription.mutate({
      patient_id: patientId,
      doctor_id: user?.id || "",
      diagnosis: diagnosis.join(", "),
      advice: advice || undefined,
      follow_up: followUp || undefined,
      clinical_exam: hasExam ? clinicalExam : undefined,
      items: medicines.filter(m => m.name.trim()).map(m => ({
        medicine_name: m.name,
        potency: m.potency || undefined,
        dose: m.dose || undefined,
        frequency: m.frequency || undefined,
      })),
    }, {
      onSuccess: () => {
        toast.success("Prescription created!");
        reset();
        onOpenChange(false);
      },
    });
  };

  const updateMedicine = (i: number, field: keyof MedicineRow, value: string) =>
    setMedicines(m => m.map((row, idx) => idx === i ? { ...row, [field]: value } : row));

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); onOpenChange(v); }}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2"><ClipboardPlus className="w-5 h-5 text-primary" /> Quick Prescription</DialogTitle>
          <DialogDescription>Create a prescription without leaving this page</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Patient + Follow-up */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Patient *</Label>
              <PatientSelector value={patientId} onChange={(id) => setPatientId(id)} />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground mb-1 block">Follow-up Date</Label>
              <Input type="date" value={followUp} onChange={e => setFollowUp(e.target.value)} className="rounded-xl h-10" />
            </div>
          </div>

          {/* Diagnosis */}
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Diagnosis *</Label>
            <DiagnosisCombo multi value={diagnosis} onChange={setDiagnosis} />
          </div>

          {/* Medicines */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs text-muted-foreground">Medicines</Label>
              <Button type="button" variant="ghost" size="sm" className="h-7 text-xs text-primary" onClick={() => setMedicines(m => [...m, { ...emptyMedicine }])}>
                <Plus className="w-3 h-3 mr-1" /> Add
              </Button>
            </div>
            <div className="space-y-2">
              {medicines.map((med, i) => (
                <div key={i} className="flex gap-2 items-start p-2.5 rounded-xl border border-border bg-muted/20">
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <MedicineCombo
                      value={med.name}
                      onChange={(name, defaults) => {
                        updateMedicine(i, "name", name);
                        if (defaults?.potency && !med.potency) updateMedicine(i, "potency", defaults.potency);
                        if (defaults?.dose && !med.dose) updateMedicine(i, "dose", defaults.dose);
                        if (defaults?.frequency && !med.frequency) updateMedicine(i, "frequency", defaults.frequency);
                      }}
                      placeholder="Medicine *"
                      className="h-8 text-xs"
                    />
                    <select value={med.potency} onChange={e => updateMedicine(i, "potency", e.target.value)}
                      className="h-8 rounded-lg border border-input bg-background px-2 text-xs focus:outline-none focus:ring-2 focus:ring-ring">
                      <option value="">Potency</option>
                      {potencyOptions.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <Input value={med.dose} onChange={e => updateMedicine(i, "dose", e.target.value)} placeholder="Dose" className="rounded-lg h-8 text-xs" />
                    <Input value={med.frequency} onChange={e => updateMedicine(i, "frequency", e.target.value)} placeholder="Frequency" className="rounded-lg h-8 text-xs" />
                  </div>
                  {medicines.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive shrink-0" onClick={() => setMedicines(m => m.filter((_, idx) => idx !== i))}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Examination */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Activity className="w-3.5 h-3.5 text-muted-foreground" />
              <Label className="text-xs text-muted-foreground">Clinical Examination</Label>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <Input value={clinicalExam.riskFactors} onChange={e => setClinicalExam(p => ({ ...p, riskFactors: e.target.value }))} placeholder="Risk Factors" className="rounded-lg h-8 text-xs" />
              <Input value={clinicalExam.oe} onChange={e => setClinicalExam(p => ({ ...p, oe: e.target.value }))} placeholder="O/E" className="rounded-lg h-8 text-xs" />
              <Input value={clinicalExam.pulse} onChange={e => setClinicalExam(p => ({ ...p, pulse: e.target.value }))} placeholder="Pulse" className="rounded-lg h-8 text-xs" />
              <Input value={clinicalExam.bp} onChange={e => setClinicalExam(p => ({ ...p, bp: e.target.value }))} placeholder="BP" className="rounded-lg h-8 text-xs" />
              <Input value={clinicalExam.heart} onChange={e => setClinicalExam(p => ({ ...p, heart: e.target.value }))} placeholder="Heart" className="rounded-lg h-8 text-xs" />
              <Input value={clinicalExam.lung} onChange={e => setClinicalExam(p => ({ ...p, lung: e.target.value }))} placeholder="Lung" className="rounded-lg h-8 text-xs" />
              <Input value={clinicalExam.others} onChange={e => setClinicalExam(p => ({ ...p, others: e.target.value }))} placeholder="Others" className="rounded-lg h-8 text-xs col-span-2 sm:col-span-3" />
            </div>
          </div>

          {/* Advice */}
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">Advice</Label>
            <Textarea value={advice} onChange={e => setAdvice(e.target.value)} placeholder="Dietary advice, lifestyle changes..." className="rounded-xl min-h-[50px]" />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm" className="rounded-xl" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button variant="hero" size="sm" className="rounded-xl" onClick={handleSubmit} disabled={createPrescription.isPending}>
            {createPrescription.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <ClipboardPlus className="w-4 h-4 mr-1" />}
            Create Prescription
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickPrescriptionDialog;
