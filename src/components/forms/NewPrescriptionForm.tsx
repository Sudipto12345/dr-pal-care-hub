import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";
import { mockPatients } from "@/data/mockData";

interface MedicineRow {
  name: string;
  potency: string;
  dosage: string;
  frequency: string;
  duration: string;
}

const emptyMedicine: MedicineRow = { name: "", potency: "", dosage: "", frequency: "", duration: "" };

interface NewPrescriptionFormProps {
  trigger?: React.ReactNode;
}

const NewPrescriptionForm = ({ trigger }: NewPrescriptionFormProps) => {
  const [open, setOpen] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [medicines, setMedicines] = useState<MedicineRow[]>([{ ...emptyMedicine }]);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    if (!diagnosis.trim()) e.diagnosis = "Diagnosis is required";
    medicines.forEach((m, i) => {
      if (!m.name.trim()) e[`med_${i}_name`] = "Medicine name required";
      if (!m.potency.trim()) e[`med_${i}_potency`] = "Potency required";
      if (!m.dosage.trim()) e[`med_${i}_dosage`] = "Dosage required";
    });
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const patient = mockPatients.find((p) => p.id === patientId);
    console.log("New Prescription:", { patientId, patientName: patient?.name, diagnosis, notes, medicines });
    toast.success("Prescription created", { description: `For ${patient?.name} – ${diagnosis}` });
    setPatientId("");
    setDiagnosis("");
    setNotes("");
    setMedicines([{ ...emptyMedicine }]);
    setErrors({});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="hero" size="sm"><Plus className="w-4 h-4 mr-1" /> New Prescription</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">New Prescription</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Patient *</Label>
              <select value={patientId} onChange={(e) => { setPatientId(e.target.value); if (errors.patientId) setErrors((er) => ({ ...er, patientId: "" })); }} className="mt-1 w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
                <option value="">Select patient</option>
                {mockPatients.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
              </select>
              {errors.patientId && <p className="text-xs text-destructive mt-1">{errors.patientId}</p>}
            </div>
            <div>
              <Label>Diagnosis *</Label>
              <Input value={diagnosis} onChange={(e) => { setDiagnosis(e.target.value); if (errors.diagnosis) setErrors((er) => ({ ...er, diagnosis: "" })); }} placeholder="e.g. Chronic Sinusitis" className="mt-1 rounded-xl" />
              {errors.diagnosis && <p className="text-xs text-destructive mt-1">{errors.diagnosis}</p>}
            </div>
          </div>

          {/* Dynamic medicine rows */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base font-heading font-semibold">Medicines</Label>
              <Button type="button" variant="outline" size="sm" onClick={addMedicine} className="rounded-xl">
                <Plus className="w-4 h-4 mr-1" /> Add Medicine
              </Button>
            </div>
            <div className="space-y-4">
              {medicines.map((med, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-muted/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Medicine #{i + 1}</span>
                    {medicines.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeMedicine(i)} className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Name *</Label>
                      <Input value={med.name} onChange={(e) => updateMedicine(i, "name", e.target.value)} placeholder="e.g. Kali Bichromicum" className="mt-1 rounded-xl" />
                      {errors[`med_${i}_name`] && <p className="text-xs text-destructive mt-1">{errors[`med_${i}_name`]}</p>}
                    </div>
                    <div>
                      <Label className="text-xs">Potency *</Label>
                      <Input value={med.potency} onChange={(e) => updateMedicine(i, "potency", e.target.value)} placeholder="e.g. 30C, 200C" className="mt-1 rounded-xl" />
                      {errors[`med_${i}_potency`] && <p className="text-xs text-destructive mt-1">{errors[`med_${i}_potency`]}</p>}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <Label className="text-xs">Dosage *</Label>
                      <Input value={med.dosage} onChange={(e) => updateMedicine(i, "dosage", e.target.value)} placeholder="e.g. 2 pills" className="mt-1 rounded-xl" />
                      {errors[`med_${i}_dosage`] && <p className="text-xs text-destructive mt-1">{errors[`med_${i}_dosage`]}</p>}
                    </div>
                    <div>
                      <Label className="text-xs">Frequency</Label>
                      <select value={med.frequency} onChange={(e) => updateMedicine(i, "frequency", e.target.value)} className="mt-1 w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
                        <option value="">Select</option>
                        <option>Once daily</option>
                        <option>Twice daily</option>
                        <option>Thrice daily</option>
                        <option>Once weekly</option>
                        <option>As needed</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-xs">Duration</Label>
                      <Input value={med.duration} onChange={(e) => updateMedicine(i, "duration", e.target.value)} placeholder="e.g. 30 days" className="mt-1 rounded-xl" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Additional Notes</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Diet restrictions, lifestyle advice, follow-up instructions..." className="mt-1 rounded-xl min-h-[80px]" />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-xl">Cancel</Button>
            <Button type="submit" variant="hero">Create Prescription</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPrescriptionForm;
