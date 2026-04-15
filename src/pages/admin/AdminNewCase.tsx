import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Plus, ArrowLeft, ClipboardList, User, MessageSquare, Brain, Heart,
  Activity, Stethoscope, Search as SearchIcon, Pill, CalendarDays,
  Trash2, X, Venus, Mars, History, Users, FlaskConical, Lightbulb, Loader2,
} from "lucide-react";
import PatientSelector from "@/components/shared/PatientSelector";
import { useCreateCase, useCase, useUpdateCase, usePatients } from "@/hooks/useSupabaseData";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MedicineCombo from "@/components/shared/MedicineCombo";
import ComplaintCombo from "@/components/shared/ComplaintCombo";
import DiagnosisCombo from "@/components/shared/DiagnosisCombo";
import QuickPrescriptionDialog from "@/components/forms/QuickPrescriptionDialog";

const selectClass = "w-full h-10 rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

interface ComplaintRow {
  complaint: string;
  duration: string;
  location: string;
  sensation: string;
  betterBy: string;
  worseBy: string;
}
const emptyComplaint: ComplaintRow = { complaint: "", duration: "", location: "", sensation: "", betterBy: "", worseBy: "" };

interface FollowUpMedicine {
  name: string;
  potency: string;
  dose: string;
  frequency: string;
}
const emptyFollowUpMedicine: FollowUpMedicine = { name: "", potency: "", dose: "", frequency: "" };

interface FollowUpRow {
  date: string;
  status: string;
  improvement: string;
  medicine: string;
  notes: string;
  medicines: FollowUpMedicine[];
}
const emptyFollowUp: FollowUpRow = { date: "", status: "", improvement: "", medicine: "", notes: "", medicines: [{ ...emptyFollowUpMedicine }] };
const SectionHeader = ({ number, icon: Icon, title, color = "primary" }: { number: number; icon: any; title: string; color?: string }) => (
  <div className="flex items-center gap-2 mb-5">
    <span className={`w-7 h-7 rounded-full bg-${color} text-white text-xs font-bold flex items-center justify-center`}>{number}</span>
    <div className={`w-7 h-7 rounded-lg bg-${color}/10 flex items-center justify-center`}>
      <Icon className={`w-4 h-4 text-${color}`} />
    </div>
    <h2 className="font-heading font-semibold text-base">{title}</h2>
  </div>
);

const AdminNewCase = () => {
  const navigate = useNavigate();
  const { id: editId } = useParams();
  const isEdit = !!editId;
  const createCase = useCreateCase();
  const updateCase = useUpdateCase();
  const { data: existingCase, isLoading: loadingCase } = useCase(editId || "");
  const { data: allPatients } = usePatients();
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState("");
  const [showQuickRx, setShowQuickRx] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [viewPrescription, setViewPrescription] = useState<any>(null);

  // Fetch prescriptions for selected patient
  const { data: patientPrescriptions = [] } = useQuery({
    queryKey: ["patient-prescriptions", patientId],
    queryFn: async () => {
      if (!patientId) return [];
      const { data, error } = await supabase
        .from("prescriptions")
        .select("*, patients(name), prescription_items(*)")
        .eq("patient_id", patientId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!patientId,
  });
  const [age, setAge] = useState("");
  const [ageUnit, setAgeUnit] = useState("Years");
  const [sex, setSex] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Chief complaints
  const [chiefComplaintsSummary, setChiefComplaintsSummary] = useState<string[]>([]);
  const [complaints, setComplaints] = useState<ComplaintRow[]>([{ ...emptyComplaint }]);

  // Mental
  const [temperament, setTemperament] = useState("");
  const [fears, setFears] = useState("");
  const [anger, setAnger] = useState("");
  const [memory, setMemory] = useState("");
  const [confidence, setConfidence] = useState("");
  const [stressHistory, setStressHistory] = useState("");
  const [company, setCompany] = useState("");

  // Physical generals
  const [appetite, setAppetite] = useState("");
  const [thirst, setThirst] = useState("");
  const [desireSweet, setDesireSweet] = useState(false);
  const [desireSalt, setDesireSalt] = useState(false);
  const [desireSour, setDesireSour] = useState(false);
  const [desireSpicy, setDesireSpicy] = useState(false);
  const [desireMeat, setDesireMeat] = useState(false);
  const [aversion, setAversion] = useState("");
  const [sweatQty, setSweatQty] = useState("");
  const [sweatOdor, setSweatOdor] = useState("");
  const [sleep, setSleep] = useState("");
  const [dreams, setDreams] = useState("");
  const [sleepPosition, setSleepPosition] = useState("");
  const [thermalType, setThermalType] = useState("");
  const [weatherEffect, setWeatherEffect] = useState("");

  // Female
  const [menstruation, setMenstruation] = useState("");
  const [flow, setFlow] = useState("");
  const [mensPain, setMensPain] = useState("");
  const [leucorrhoea, setLeucorrhoea] = useState("");

  // Male
  const [sexualDesire, setSexualDesire] = useState("");
  const [maleProblems, setMaleProblems] = useState("");

  // Past history
  const [majorIllness, setMajorIllness] = useState("");
  const [surgery, setSurgery] = useState("");
  const [medHistory, setMedHistory] = useState("");

  // Family history
  const [famDiabetes, setFamDiabetes] = useState("");
  const [famHypertension, setFamHypertension] = useState("");
  const [famCancer, setFamCancer] = useState("");
  const [famOther, setFamOther] = useState("");

  // Physical exam
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [pulse, setPulse] = useState("");
  const [bp, setBp] = useState("");
  const [tongue, setTongue] = useState("");
  const [skin, setSkin] = useState("");

  // Investigations
  const [investigations, setInvestigations] = useState("");

  // Totality
  const [keyRubrics, setKeyRubrics] = useState("");
  const [miasm, setMiasm] = useState("");

  // Prescription
  const [medicine, setMedicine] = useState("");
  const [potency, setPotency] = useState("");
  const [dose, setDose] = useState("");
  const [repetition, setRepetition] = useState("");
  const [advice, setAdvice] = useState("");

  // Follow-ups (multiple)
  const [followUps, setFollowUps] = useState<FollowUpRow[]>([{ ...emptyFollowUp }]);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load existing case for edit mode
  useEffect(() => {
    if (existingCase?.form_data) {
      const fd = existingCase.form_data as any;
      setPatientId(existingCase.patient_id || "");
      setPatientName(existingCase.patients?.name || "");
      if (fd.age) setAge(fd.age);
      if (fd.ageUnit) setAgeUnit(fd.ageUnit);
      if (fd.sex) setSex(fd.sex);
      if (fd.maritalStatus) setMaritalStatus(fd.maritalStatus);
      if (fd.occupation) setOccupation(fd.occupation);
      if (fd.phone) setPhone(fd.phone);
      if (fd.address) setAddress(fd.address);
      if (fd.chiefComplaintsSummary) setChiefComplaintsSummary(fd.chiefComplaintsSummary);
      if (fd.complaints) setComplaints(fd.complaints);
      if (fd.temperament) setTemperament(fd.temperament);
      if (fd.fears) setFears(fd.fears);
      if (fd.anger) setAnger(fd.anger);
      if (fd.memory) setMemory(fd.memory);
      if (fd.confidence) setConfidence(fd.confidence);
      if (fd.stressHistory) setStressHistory(fd.stressHistory);
      if (fd.company) setCompany(fd.company);
      if (fd.appetite) setAppetite(fd.appetite);
      if (fd.thirst) setThirst(fd.thirst);
      if (fd.desireSweet) setDesireSweet(fd.desireSweet);
      if (fd.desireSalt) setDesireSalt(fd.desireSalt);
      if (fd.desireSour) setDesireSour(fd.desireSour);
      if (fd.desireSpicy) setDesireSpicy(fd.desireSpicy);
      if (fd.desireMeat) setDesireMeat(fd.desireMeat);
      if (fd.aversion) setAversion(fd.aversion);
      if (fd.sweatQty) setSweatQty(fd.sweatQty);
      if (fd.sweatOdor) setSweatOdor(fd.sweatOdor);
      if (fd.sleep) setSleep(fd.sleep);
      if (fd.dreams) setDreams(fd.dreams);
      if (fd.sleepPosition) setSleepPosition(fd.sleepPosition);
      if (fd.thermalType) setThermalType(fd.thermalType);
      if (fd.weatherEffect) setWeatherEffect(fd.weatherEffect);
      if (fd.menstruation) setMenstruation(fd.menstruation);
      if (fd.flow) setFlow(fd.flow);
      if (fd.mensPain) setMensPain(fd.mensPain);
      if (fd.leucorrhoea) setLeucorrhoea(fd.leucorrhoea);
      if (fd.sexualDesire) setSexualDesire(fd.sexualDesire);
      if (fd.maleProblems) setMaleProblems(fd.maleProblems);
      if (fd.majorIllness) setMajorIllness(fd.majorIllness);
      if (fd.surgery) setSurgery(fd.surgery);
      if (fd.medHistory) setMedHistory(fd.medHistory);
      if (fd.famDiabetes) setFamDiabetes(fd.famDiabetes);
      if (fd.famHypertension) setFamHypertension(fd.famHypertension);
      if (fd.famCancer) setFamCancer(fd.famCancer);
      if (fd.famOther) setFamOther(fd.famOther);
      if (fd.weight) setWeight(fd.weight);
      if (fd.height) setHeight(fd.height);
      if (fd.pulse) setPulse(fd.pulse);
      if (fd.bp) setBp(fd.bp);
      if (fd.tongue) setTongue(fd.tongue);
      if (fd.skin) setSkin(fd.skin);
      if (fd.investigations) setInvestigations(fd.investigations);
      if (fd.keyRubrics) setKeyRubrics(fd.keyRubrics);
      if (fd.miasm) setMiasm(fd.miasm);
      if (fd.medicine) setMedicine(fd.medicine);
      if (fd.potency) setPotency(fd.potency);
      if (fd.dose) setDose(fd.dose);
      if (fd.repetition) setRepetition(fd.repetition);
      if (fd.advice) setAdvice(fd.advice);
      if (fd.diagnosis) setDiagnosis(fd.diagnosis);
      if (fd.followUps) setFollowUps(fd.followUps.map((fu: any) => ({ ...fu, medicines: fu.medicines || [{ ...emptyFollowUpMedicine }] })));
      // Legacy support
      else if (fd.nextVisit || fd.followUpNotes) setFollowUps([{ date: fd.nextVisit || "", status: "", improvement: "", medicine: "", notes: fd.followUpNotes || "", medicines: [{ ...emptyFollowUpMedicine }] }]);
    }
  }, [existingCase]);

  const addComplaint = () => setComplaints((c) => [...c, { ...emptyComplaint }]);
  const removeComplaint = (i: number) => { if (complaints.length > 1) setComplaints((c) => c.filter((_, idx) => idx !== i)); };
  const updateComplaint = (i: number, field: keyof ComplaintRow, value: string) => {
    setComplaints((c) => {
      const updated = c.map((row, idx) => (idx === i ? { ...row, [field]: value } : row));
      if (field === "complaint") {
        const names = updated.map(r => r.complaint).filter(Boolean);
        setChiefComplaintsSummary(prev => {
          const merged = new Set([...prev, ...names]);
          return Array.from(merged);
        });
      }
      return updated;
    });
  };

  const buildFormData = () => ({
    age, ageUnit, sex, maritalStatus, occupation, phone, address,
    complaints, chiefComplaintsSummary, temperament, fears, anger, memory, confidence, stressHistory, company,
    appetite, thirst, desireSweet, desireSalt, desireSour, desireSpicy, desireMeat, aversion,
    sweatQty, sweatOdor, sleep, dreams, sleepPosition, thermalType, weatherEffect,
    menstruation, flow, mensPain, leucorrhoea, sexualDesire, maleProblems,
    majorIllness, surgery, medHistory, famDiabetes, famHypertension, famCancer, famOther,
    weight, height, pulse, bp, tongue, skin, investigations,
    keyRubrics, miasm, medicine, potency, dose, repetition, advice, diagnosis, followUps,
  });

  const addFollowUp = () => setFollowUps(f => [...f, { ...emptyFollowUp, medicines: [{ ...emptyFollowUpMedicine }] }]);
  const removeFollowUp = (i: number) => { if (followUps.length > 1) setFollowUps(f => f.filter((_, idx) => idx !== i)); };
  const updateFollowUp = (i: number, field: keyof FollowUpRow, value: string) => {
    setFollowUps(f => f.map((row, idx) => idx === i ? { ...row, [field]: value } : row));
  };
  const addFollowUpMedicine = (fuIdx: number) => {
    setFollowUps(f => f.map((row, idx) => idx === fuIdx ? { ...row, medicines: [...row.medicines, { ...emptyFollowUpMedicine }] } : row));
  };
  const removeFollowUpMedicine = (fuIdx: number, medIdx: number) => {
    setFollowUps(f => f.map((row, idx) => idx === fuIdx ? { ...row, medicines: row.medicines.length > 1 ? row.medicines.filter((_, mi) => mi !== medIdx) : row.medicines } : row));
  };
  const updateFollowUpMedicine = (fuIdx: number, medIdx: number, field: keyof FollowUpMedicine, value: string) => {
    setFollowUps(f => f.map((row, idx) => idx === fuIdx ? { ...row, medicines: row.medicines.map((m, mi) => mi === medIdx ? { ...m, [field]: value } : m) } : row));
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!patientId) e.patientId = "Required";
    setErrors(e);
    if (Object.keys(e).length) { toast.error("Please fix errors"); return; }
    
    const symptomsText = [chiefComplaintsSummary.join(", "), ...complaints.map(c => c.complaint).filter(Boolean)].filter(Boolean).join("; ");
    const historyText = [majorIllness, surgery, medHistory].filter(Boolean).join("; ");
    const notesText = [keyRubrics, miasm, medicine, ...followUps.map(f => f.notes).filter(Boolean)].filter(Boolean).join(" | ");
    const form_data = buildFormData();
    
    if (isEdit) {
      updateCase.mutate(
        { id: editId!, patient_id: patientId, symptoms: symptomsText, history: historyText, notes: notesText, form_data },
        { onSuccess: () => navigate("/admin/cases") }
      );
    } else {
      createCase.mutate(
        { patient_id: patientId, symptoms: symptomsText, history: historyText, notes: notesText, form_data },
        { onSuccess: () => navigate("/admin/cases") }
      );
    }
  };

  const SelectField = ({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) => (
    <div>
      <Label className="text-xs text-muted-foreground mb-1.5 block">{label}</Label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={selectClass}>
        <option value="">Select</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const TextField = ({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) => (
    <div>
      <Label className="text-xs text-muted-foreground mb-1.5 block">{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="rounded-xl" />
    </div>
  );

  if (isEdit && loadingCase) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-0 animate-fade-in">
      {/* Hero Banner */}
      <div className="bg-[hsl(var(--sidebar-background))] text-white rounded-2xl p-6 flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold">{isEdit ? "Edit Case" : "Homeopathic Case Taking Form"}</h1>
            <p className="text-white/70 text-sm">{isEdit ? "Update case details" : "Complete case analysis for constitutional treatment"}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 rounded-xl" asChild>
          <Link to="/admin/cases"><ArrowLeft className="w-4 h-4 mr-1" /> Back to Cases</Link>
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">

            {/* 1. Patient Information */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <SectionHeader number={1} icon={User} title="Patient Information" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Patient *</Label>
                  <PatientSelector value={patientId} onChange={(id, name) => {
                    setPatientId(id); setPatientName(name); setSelectedPrescriptionId("");
                    // Auto-fill from patient record
                    const pt = (allPatients || []).find((p: any) => p.id === id);
                    if (pt && !isEdit) {
                      if (pt.age) setAge(pt.age.toString());
                      if (pt.gender) setSex(pt.gender);
                      if (pt.phone) setPhone(pt.phone);
                      if (pt.address) setAddress(pt.address);
                    }
                  }} error={errors.patientId} />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Age</Label>
                  <div className="flex gap-2">
                    <Input value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" className="rounded-xl flex-1" />
                    <select value={ageUnit} onChange={(e) => setAgeUnit(e.target.value)} className="h-10 rounded-xl border border-input bg-background px-2 text-sm w-24">
                      <option>Years</option><option>Months</option><option>Days</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <SelectField label="Sex" value={sex} onChange={setSex} options={["Male", "Female", "Other"]} />
                <SelectField label="Marital Status" value={maritalStatus} onChange={setMaritalStatus} options={["Single", "Married", "Divorced", "Widowed"]} />
                <TextField label="Occupation" value={occupation} onChange={setOccupation} placeholder="e.g., Teacher, Farmer" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <TextField label="Phone" value={phone} onChange={setPhone} placeholder="01XXXXXXXXX" />
                <TextField label="Address" value={address} onChange={setAddress} placeholder="Village, Upazila, District, Country" />
              </div>

              {/* Link Prescription - shown after patient selected */}
              {patientId && (
                <div className="mt-4 pt-4 border-t border-border">
                  <Label className="text-xs text-muted-foreground mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-secondary" /> Link Prescription
                  </Label>
                  <div className="flex gap-2">
                    {patientPrescriptions.length > 0 ? (
                      <Select value={selectedPrescriptionId} onValueChange={(val) => {
                        setSelectedPrescriptionId(val);
                        const rx = patientPrescriptions.find((p: any) => p.id === val);
                        if (rx?.diagnosis) { setKeyRubrics(prev => prev || rx.diagnosis); setDiagnosis(prev => prev || rx.diagnosis); }
                        if (rx?.prescription_items?.length) {
                          const first = rx.prescription_items[0];
                          if (first.medicine_name) setMedicine(prev => prev || first.medicine_name);
                          if (first.potency) setPotency(prev => prev || first.potency);
                          if (first.dose) setDose(prev => prev || first.dose);
                          if (first.frequency) setRepetition(prev => prev || first.frequency);
                        }
                        if (rx?.advice) setAdvice(prev => prev || rx.advice);
                      }}>
                        <SelectTrigger className="rounded-xl flex-1">
                          <SelectValue placeholder="Select a prescription to link..." />
                        </SelectTrigger>
                        <SelectContent>
                          {patientPrescriptions.map((p: any) => (
                            <SelectItem key={p.id} value={p.id}>
                              {new Date(p.created_at).toLocaleDateString()} — {p.diagnosis || "No diagnosis"} ({p.prescription_items?.length || 0} medicines)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="flex-1 text-sm text-muted-foreground bg-muted/30 rounded-xl px-3 py-2">No prescriptions found for this patient</p>
                    )}
                    {selectedPrescriptionId && (
                      <Button type="button" variant="outline" size="icon" className="rounded-xl h-10 w-10 shrink-0" onClick={() => setViewPrescription(patientPrescriptions.find((p: any) => p.id === selectedPrescriptionId))} title="View Prescription">
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                    <Button type="button" variant="hero" size="sm" className="rounded-xl h-10 shrink-0" onClick={() => setShowQuickRx(true)}>
                      <Plus className="w-4 h-4 mr-1" /> New Rx
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Chief Complaints */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <SectionHeader number={2} icon={MessageSquare} title="Chief Complaints" color="destructive" />
              <div className="mb-4">
                <Label className="text-xs text-muted-foreground mb-1 block">Chief Complaints (multi-select)</Label>
                <ComplaintCombo multi value={chiefComplaintsSummary} onChange={(newValues) => {
                  const removed = chiefComplaintsSummary.filter(v => !newValues.includes(v));
                  if (removed.length > 0) {
                    setComplaints(prev => {
                      const filtered = prev.filter(c => !removed.includes(c.complaint));
                      return filtered.length > 0 ? filtered : [{ ...emptyComplaint }];
                    });
                  }
                  setChiefComplaintsSummary(newValues);
                }} />
              </div>
              <Label className="text-xs text-muted-foreground mb-2 block">Detailed Complaints</Label>
              {complaints.map((c, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-muted/20 mb-4 relative">
                  {complaints.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 text-destructive" onClick={() => removeComplaint(i)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                  <div className="mb-3">
                    <Label className="text-xs text-muted-foreground">Complaint (in patient's own words)</Label>
                    <div className="mt-1">
                      <ComplaintCombo value={c.complaint} onChange={(v) => updateComplaint(i, "complaint", v)} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                    <TextField label="Duration" value={c.duration} onChange={(v) => updateComplaint(i, "duration", v)} placeholder="e.g., 2 Years" />
                    <TextField label="Location" value={c.location} onChange={(v) => updateComplaint(i, "location", v)} placeholder="e.g., Both knees" />
                    <TextField label="Sensation" value={c.sensation} onChange={(v) => updateComplaint(i, "sensation", v)} placeholder="e.g., Burning, Stitching" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <TextField label="Modalities (Better)" value={c.betterBy} onChange={(v) => updateComplaint(i, "betterBy", v)} placeholder="Better: e.g., Warm application" />
                    <TextField label="Modalities (Worse)" value={c.worseBy} onChange={(v) => updateComplaint(i, "worseBy", v)} placeholder="Worse: e.g., Morning, Cold" />
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addComplaint} className="rounded-xl text-secondary border-secondary/30 hover:bg-secondary/5">
                <Plus className="w-4 h-4 mr-1" /> Add Another Complaint
              </Button>
            </div>

            {/* 3. Mental & Emotional */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <SectionHeader number={3} icon={Brain} title="Mental & Emotional Symptoms" color="info" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <SelectField label="Temperament" value={temperament} onChange={setTemperament} options={["Calm", "Irritable", "Anxious", "Fearful", "Depressed", "Sensitive", "Reserved"]} />
                <TextField label="Fears" value={fears} onChange={setFears} placeholder="e.g., Darkness, Disease, Death" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <SelectField label="Anger" value={anger} onChange={setAnger} options={["Suppressed", "Violent", "Silent"]} />
                <SelectField label="Memory" value={memory} onChange={setMemory} options={["Good", "Weak"]} />
                <SelectField label="Confidence" value={confidence} onChange={setConfidence} options={["Low", "Moderate", "High"]} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <TextField label="Stress / Grief / Shock History" value={stressHistory} onChange={setStressHistory} placeholder="e.g., Loss of parent, Work pressure" />
                <SelectField label="Company" value={company} onChange={setCompany} options={["Likes company", "Dislikes company", "Indifferent"]} />
              </div>
            </div>

            {/* 4. Physical Generals */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <SectionHeader number={4} icon={Activity} title="Physical Generals" color="secondary" />

              <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-1.5">☕ Appetite & Thirst</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <SelectField label="Appetite" value={appetite} onChange={setAppetite} options={["Normal", "Increased", "Decreased"]} />
                <SelectField label="Thirst" value={thirst} onChange={setThirst} options={["Low", "Moderate", "Excessive"]} />
              </div>

              <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-1.5">♡ Desires / Aversions</p>
              <div className="mb-3">
                <Label className="text-xs text-muted-foreground mb-2 block">Desire</Label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Sweet", val: desireSweet, set: setDesireSweet },
                    { label: "Salt", val: desireSalt, set: setDesireSalt },
                    { label: "Sour", val: desireSour, set: setDesireSour },
                    { label: "Spicy", val: desireSpicy, set: setDesireSpicy },
                    { label: "Meat", val: desireMeat, set: setDesireMeat },
                  ].map((d) => (
                    <button key={d.label} type="button" onClick={() => d.set(!d.val)}
                      className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${d.val ? "bg-secondary text-white border-secondary" : "bg-background border-input hover:bg-muted/50"}`}>
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <TextField label="Aversion" value={aversion} onChange={setAversion} placeholder="e.g., Milk, Fatty food" />
              </div>

              <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-1.5">💧 Sweat</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <SelectField label="Quantity" value={sweatQty} onChange={setSweatQty} options={["Less", "Moderate", "Profuse"]} />
                <TextField label="Odor" value={sweatOdor} onChange={setSweatOdor} placeholder="e.g., Offensive, None" />
              </div>

              <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-1.5">🌙 Sleep</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <SelectField label="Sleep" value={sleep} onChange={setSleep} options={["Sound", "Disturbed", "Insomnia"]} />
                <TextField label="Dreams" value={dreams} onChange={setDreams} placeholder="e.g., Vivid, Nightmares" />
                <TextField label="Position" value={sleepPosition} onChange={setSleepPosition} placeholder="e.g., Left side, Back" />
              </div>

              <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-1.5">🌡️ Thermal Reaction</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField label="Type" value={thermalType} onChange={setThermalType} options={["Hot patient", "Cold patient", "Ambithermal"]} />
                <TextField label="Weather Effect" value={weatherEffect} onChange={setWeatherEffect} placeholder="e.g., Worse in winter" />
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-1 space-y-6">

            {/* 5. Female Section */}
            <div className="bg-card rounded-2xl border-2 border-pink-200 p-5">
              <SectionHeader number={5} icon={Venus} title="Female Section" color="destructive" />
              <div className="grid grid-cols-2 gap-3 mb-3">
                <SelectField label="Menstruation" value={menstruation} onChange={setMenstruation} options={["Regular", "Irregular", "N/A"]} />
                <SelectField label="Flow" value={flow} onChange={setFlow} options={["Scanty", "Normal", "Profuse"]} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <TextField label="Pain" value={mensPain} onChange={setMensPain} placeholder="e.g., Before onset" />
                <TextField label="Leucorrhoea" value={leucorrhoea} onChange={setLeucorrhoea} placeholder="e.g., Milky, None" />
              </div>
            </div>

            {/* 6. Male Section */}
            <div className="bg-card rounded-2xl border-2 border-blue-200 p-5">
              <SectionHeader number={6} icon={Mars} title="Male Section" color="info" />
              <SelectField label="Sexual Desire" value={sexualDesire} onChange={setSexualDesire} options={["Normal", "Low", "High"]} />
              <div className="mt-3">
                <TextField label="Problems" value={maleProblems} onChange={setMaleProblems} placeholder="e.g., None" />
              </div>
            </div>

            {/* 7. Past History */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <SectionHeader number={7} icon={History} title="Past History" />
              <div className="space-y-3">
                <TextField label="Major Illness" value={majorIllness} onChange={setMajorIllness} placeholder="e.g., Typhoid (2018), Malaria (2020)" />
                <TextField label="Surgery / Injury" value={surgery} onChange={setSurgery} placeholder="e.g., Appendectomy (2019)" />
                <TextField label="Medication History" value={medHistory} onChange={setMedHistory} placeholder="e.g., Painkillers for 2 years" />
              </div>
            </div>

            {/* 8. Family History */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <SectionHeader number={8} icon={Users} title="Family History" />
              <div className="grid grid-cols-2 gap-3 mb-3">
                <SelectField label="Diabetes" value={famDiabetes} onChange={setFamDiabetes} options={["Yes", "No"]} />
                <SelectField label="Hypertension" value={famHypertension} onChange={setFamHypertension} options={["Yes", "No"]} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <SelectField label="Cancer" value={famCancer} onChange={setFamCancer} options={["Yes", "No"]} />
                <TextField label="Other" value={famOther} onChange={setFamOther} placeholder="e.g., Asthma" />
              </div>
            </div>

            {/* 9. Physical Examination */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <SectionHeader number={9} icon={Stethoscope} title="Physical Examination" />
              <div className="grid grid-cols-2 gap-3 mb-3">
                <TextField label="Weight (kg)" value={weight} onChange={setWeight} placeholder="e.g., 65" />
                <TextField label="Height" value={height} onChange={setHeight} placeholder={`e.g., 5'8"`} />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <TextField label="Pulse" value={pulse} onChange={setPulse} placeholder="e.g., 72 bpm" />
                <TextField label="BP" value={bp} onChange={setBp} placeholder="e.g., 120/80" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <TextField label="Tongue" value={tongue} onChange={setTongue} placeholder="e.g., Coated white" />
                <TextField label="Skin" value={skin} onChange={setSkin} placeholder="e.g., Dry, Eczema" />
              </div>
            </div>

            {/* 10. Investigations */}
            <div className="bg-card rounded-2xl border border-border p-5">
              <SectionHeader number={10} icon={FlaskConical} title="Investigations" />
              <Textarea value={investigations} onChange={(e) => setInvestigations(e.target.value)} placeholder="Lab reports, X-ray findings, etc." className="rounded-xl min-h-[80px]" />
            </div>

            {/* 11. Totality & Analysis */}
            <div className="bg-card rounded-2xl border-2 border-amber-200 p-5">
              <SectionHeader number={11} icon={Lightbulb} title="Totality & Analysis" color="warning" />
              <div className="mb-3">
                <Label className="text-xs text-muted-foreground mb-1.5 block">Diagnosis</Label>
                <DiagnosisCombo value={diagnosis} onChange={setDiagnosis} />
              </div>
              <div className="mb-3">
                <Label className="text-xs text-muted-foreground mb-1.5 block">Key Rubrics</Label>
                <Textarea value={keyRubrics} onChange={(e) => setKeyRubrics(e.target.value)} placeholder="Key rubrics for repertorization" className="rounded-xl min-h-[70px]" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-2 block">Miasm</Label>
                <div className="flex flex-wrap gap-2">
                  {["Psora", "Sycosis", "Syphilis", "Mixed"].map((m) => (
                    <button key={m} type="button" onClick={() => setMiasm(m)}
                      className={`px-3 py-1.5 rounded-lg border text-sm transition-colors ${miasm === m ? "bg-warning text-white border-warning" : "bg-background border-input hover:bg-muted/50"}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 12. Prescription */}
            <div className="bg-card rounded-2xl border-2 border-green-200 p-5">
              <SectionHeader number={12} icon={Pill} title="Prescription" color="secondary" />
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Medicine</Label>
                  <MedicineCombo
                    value={medicine}
                    onChange={(name, defaults) => {
                      setMedicine(name);
                      if (defaults?.potency && !potency) setPotency(defaults.potency);
                      if (defaults?.dose && !dose) setDose(defaults.dose);
                      if (defaults?.frequency && !repetition) setRepetition(defaults.frequency);
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <TextField label="Potency" value={potency} onChange={setPotency} placeholder="e.g., 200C" />
                  <TextField label="Dose" value={dose} onChange={setDose} placeholder="e.g., 4 pills" />
                </div>
                <TextField label="Repetition" value={repetition} onChange={setRepetition} placeholder="e.g., Once daily x 5 days" />
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Advice</Label>
                  <Textarea value={advice} onChange={(e) => setAdvice(e.target.value)} placeholder="e.g., Avoid cold water, take rest..." className="rounded-xl min-h-[60px]" />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 13. Follow-Ups — Full Width */}
        <div className="bg-card rounded-2xl border-2 border-blue-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <SectionHeader number={13} icon={CalendarDays} title="Follow-Up Visits" color="info" />
            <span className="text-xs font-medium text-info">{followUps.length} visit{followUps.length !== 1 ? "s" : ""}</span>
          </div>
          {followUps.map((fu, i) => (
            <div key={i} className="p-4 rounded-xl border border-border bg-muted/20 mb-3 relative">
              {followUps.length > 1 && (
                <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 text-destructive" onClick={() => removeFollowUp(i)}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              )}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 rounded-full bg-info text-white text-xs font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-sm font-semibold text-foreground">Follow-Up #{i + 1}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Visit Date</Label>
                  <Input type="date" value={fu.date} onChange={(e) => updateFollowUp(i, "date", e.target.value)} className="rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Patient Status</Label>
                  <select value={fu.status} onChange={(e) => updateFollowUp(i, "status", e.target.value)}
                    className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm">
                    <option value="">Select</option>
                    <option value="Improved">✅ Improved</option>
                    <option value="Same">➡️ Same / No Change</option>
                    <option value="Worse">❌ Worse</option>
                    <option value="Partially Improved">🔄 Partially Improved</option>
                    <option value="New Symptoms">⚠️ New Symptoms Appeared</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Medicine Change (if any)</Label>
                  <Input value={fu.medicine} onChange={(e) => updateFollowUp(i, "medicine", e.target.value)}
                    placeholder="e.g., Continue same / Changed to Bryonia 200C" className="rounded-xl" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Doctor's Notes</Label>
                  <Input value={fu.notes} onChange={(e) => updateFollowUp(i, "notes", e.target.value)}
                    placeholder="e.g., Reduce dose, next visit after 15 days" className="rounded-xl" />
                </div>
              </div>
              <div className="mb-3">
                <Label className="text-xs text-muted-foreground mb-1 block">Improvement / Deterioration Details</Label>
                <Textarea value={fu.improvement} onChange={(e) => updateFollowUp(i, "improvement", e.target.value)}
                  placeholder="e.g., Joint pain reduced 50%, sleep improved, appetite better..."
                  className="rounded-xl min-h-[60px]" />
              </div>

              {/* Prescription for this follow-up */}
              <div className="mt-4 pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-secondary flex items-center gap-1"><Pill className="w-3.5 h-3.5" /> Prescription</p>
                  <span className="text-[10px] text-muted-foreground">{(fu.medicines || []).length} medicine{(fu.medicines || []).length !== 1 ? "s" : ""}</span>
                </div>
                {(fu.medicines || []).map((med, mi) => (
                  <div key={mi} className="flex gap-2 mb-2 items-start">
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <MedicineCombo
                        value={med.name}
                        onChange={(name, defaults) => {
                          updateFollowUpMedicine(i, mi, "name", name);
                          if (defaults?.potency && !med.potency) updateFollowUpMedicine(i, mi, "potency", defaults.potency);
                          if (defaults?.dose && !med.dose) updateFollowUpMedicine(i, mi, "dose", defaults.dose);
                          if (defaults?.frequency && !med.frequency) updateFollowUpMedicine(i, mi, "frequency", defaults.frequency);
                        }}
                        placeholder="Medicine"
                        className="text-xs h-8"
                      />
                      <Input value={med.potency} onChange={(e) => updateFollowUpMedicine(i, mi, "potency", e.target.value)} placeholder="Potency" className="rounded-lg text-xs h-8" />
                      <Input value={med.dose} onChange={(e) => updateFollowUpMedicine(i, mi, "dose", e.target.value)} placeholder="Dose" className="rounded-lg text-xs h-8" />
                      <Input value={med.frequency} onChange={(e) => updateFollowUpMedicine(i, mi, "frequency", e.target.value)} placeholder="Frequency" className="rounded-lg text-xs h-8" />
                    </div>
                    {(fu.medicines || []).length > 1 && (
                      <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive shrink-0" onClick={() => removeFollowUpMedicine(i, mi)}>
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="ghost" size="sm" onClick={() => addFollowUpMedicine(i)}
                  className="text-xs text-secondary hover:text-secondary h-7 px-2">
                  <Plus className="w-3 h-3 mr-1" /> Add Medicine
                </Button>
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addFollowUp}
            className="rounded-xl text-info border-info/30 hover:bg-info/5">
            <Plus className="w-4 h-4 mr-1" /> Add Another Follow-Up
          </Button>
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-8 mb-4">
          <Button type="submit" variant="hero" size="lg" className="rounded-xl px-12" disabled={createCase.isPending || updateCase.isPending}>
            <ClipboardList className="w-5 h-5 mr-2" /> {isEdit ? "Update Case" : "Submit Case"}
          </Button>
        </div>
      </form>

      {/* Linked Prescription Summary Card */}
      {selectedPrescriptionId && (() => {
        const rx = patientPrescriptions.find((p: any) => p.id === selectedPrescriptionId);
        if (!rx) return null;
        return (
          <div className="mt-6 bg-card rounded-2xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h3 className="font-heading font-semibold text-base">Linked Prescription</h3>
              </div>
              <Button variant="outline" size="sm" className="rounded-xl" onClick={() => setViewPrescription(rx)}>
                <Eye className="w-4 h-4 mr-1" /> View Full
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
              <div><span className="text-muted-foreground">Date:</span> <span className="font-medium">{new Date(rx.created_at).toLocaleDateString()}</span></div>
              <div><span className="text-muted-foreground">Diagnosis:</span> <span className="font-medium">{rx.diagnosis || "—"}</span></div>
              <div><span className="text-muted-foreground">Follow-up:</span> <span className="font-medium">{rx.follow_up ? new Date(rx.follow_up).toLocaleDateString() : "—"}</span></div>
              <div><span className="text-muted-foreground">Medicines:</span> <span className="font-medium">{rx.prescription_items?.length || 0}</span></div>
            </div>
            {rx.prescription_items?.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium">#</th>
                      <th className="text-left px-3 py-2 font-medium">Medicine</th>
                      <th className="text-left px-3 py-2 font-medium">Potency</th>
                      <th className="text-left px-3 py-2 font-medium">Dose</th>
                      <th className="text-left px-3 py-2 font-medium">Frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rx.prescription_items.map((item: any, i: number) => (
                      <tr key={item.id} className="border-t border-border">
                        <td className="px-3 py-2">{i + 1}</td>
                        <td className="px-3 py-2 font-medium">{item.medicine_name}</td>
                        <td className="px-3 py-2">{item.potency || "—"}</td>
                        <td className="px-3 py-2">{item.dose || "—"}</td>
                        <td className="px-3 py-2">{item.frequency || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {rx.advice && <p className="mt-3 text-sm"><span className="text-muted-foreground">Advice:</span> {rx.advice}</p>}
          </div>
        );
      })()}

      {/* Full Prescription View Dialog */}
      <Dialog open={!!viewPrescription} onOpenChange={(open) => !open && setViewPrescription(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Prescription Details
            </DialogTitle>
          </DialogHeader>
          {viewPrescription && (
            <div className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Patient:</span> <span className="font-medium">{viewPrescription.patients?.name || patientName}</span></div>
                <div><span className="text-muted-foreground">Date:</span> <span className="font-medium">{new Date(viewPrescription.created_at).toLocaleDateString()}</span></div>
                <div><span className="text-muted-foreground">Diagnosis:</span> <span className="font-medium">{viewPrescription.diagnosis || "—"}</span></div>
                <div><span className="text-muted-foreground">Follow-up:</span> <span className="font-medium">{viewPrescription.follow_up ? new Date(viewPrescription.follow_up).toLocaleDateString() : "—"}</span></div>
              </div>

              {viewPrescription.prescription_items?.length > 0 && (
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-1"><Pill className="w-4 h-4 text-secondary" /> Medicines</h4>
                  <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left px-3 py-2 font-medium">#</th>
                        <th className="text-left px-3 py-2 font-medium">Medicine</th>
                        <th className="text-left px-3 py-2 font-medium">Potency</th>
                        <th className="text-left px-3 py-2 font-medium">Dose</th>
                        <th className="text-left px-3 py-2 font-medium">Frequency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {viewPrescription.prescription_items.map((item: any, i: number) => (
                        <tr key={item.id} className="border-t border-border">
                          <td className="px-3 py-2">{i + 1}</td>
                          <td className="px-3 py-2 font-medium">{item.medicine_name}</td>
                          <td className="px-3 py-2">{item.potency || "—"}</td>
                          <td className="px-3 py-2">{item.dose || "—"}</td>
                          <td className="px-3 py-2">{item.frequency || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {viewPrescription.advice && (
                <div>
                  <h4 className="font-semibold text-sm mb-1">Advice</h4>
                  <p className="text-sm text-muted-foreground bg-muted/30 rounded-xl p-3">{viewPrescription.advice}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <QuickPrescriptionDialog open={showQuickRx} onOpenChange={setShowQuickRx} />
    </div>
  );
};

export default AdminNewCase;
