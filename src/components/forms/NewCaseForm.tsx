import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { mockPatients } from "@/data/mockData";

interface NewCaseFormProps {
  trigger?: React.ReactNode;
}

const NewCaseForm = ({ trigger }: NewCaseFormProps) => {
  const [open, setOpen] = useState(false);
  const [patientId, setPatientId] = useState("");
  const [condition, setCondition] = useState("");
  const [startDate, setStartDate] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [history, setHistory] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!patientId) e.patientId = "Select a patient";
    if (!condition.trim()) e.condition = "Condition is required";
    if (!startDate) e.startDate = "Start date is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const patient = mockPatients.find((p) => p.id === patientId);
    console.log("New Case:", { patientId, patientName: patient?.name, condition, startDate, symptoms, history, notes });
    toast.success("Case created", { description: `${patient?.name} – ${condition}` });
    setPatientId(""); setCondition(""); setStartDate(""); setSymptoms(""); setHistory(""); setNotes("");
    setErrors({});
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <Button variant="hero" size="sm"><Plus className="w-4 h-4 mr-1" /> New Case</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">New Case</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label>Patient *</Label>
            <select value={patientId} onChange={(e) => { setPatientId(e.target.value); if (errors.patientId) setErrors((er) => ({ ...er, patientId: "" })); }} className="mt-1 w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
              <option value="">Select patient</option>
              {mockPatients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {errors.patientId && <p className="text-xs text-destructive mt-1">{errors.patientId}</p>}
          </div>
          <div>
            <Label>Condition / Diagnosis *</Label>
            <Input value={condition} onChange={(e) => { setCondition(e.target.value); if (errors.condition) setErrors((er) => ({ ...er, condition: "" })); }} placeholder="e.g. Chronic Sinusitis" className="mt-1 rounded-xl" />
            {errors.condition && <p className="text-xs text-destructive mt-1">{errors.condition}</p>}
          </div>
          <div>
            <Label>Start Date *</Label>
            <Input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); if (errors.startDate) setErrors((er) => ({ ...er, startDate: "" })); }} className="mt-1 rounded-xl" />
            {errors.startDate && <p className="text-xs text-destructive mt-1">{errors.startDate}</p>}
          </div>
          <div>
            <Label>Chief Symptoms</Label>
            <Textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder="Describe key symptoms..." className="mt-1 rounded-xl" />
          </div>
          <div>
            <Label>Past Medical History</Label>
            <Textarea value={history} onChange={(e) => setHistory(e.target.value)} placeholder="Previous treatments, family history..." className="mt-1 rounded-xl" />
          </div>
          <div>
            <Label>Notes</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional observations..." className="mt-1 rounded-xl" />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="rounded-xl">Cancel</Button>
            <Button type="submit" variant="hero">Create Case</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCaseForm;
