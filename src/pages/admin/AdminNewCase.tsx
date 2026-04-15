import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Plus, ArrowLeft, ClipboardList, User, MessageSquare, Brain, Heart,
  Activity, Stethoscope, Search as SearchIcon, Pill, CalendarDays,
  Trash2, X, Venus, Mars, History, Users, FlaskConical, Lightbulb,
} from "lucide-react";
import PatientSelector from "@/components/shared/PatientSelector";
import { useCreateCase } from "@/hooks/useSupabaseData";

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
  // Patient info
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [ageUnit, setAgeUnit] = useState("Years");
  const [sex, setSex] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  // Chief complaints
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

  // Follow-up
  const [nextVisit, setNextVisit] = useState("");
  const [followUpNotes, setFollowUpNotes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const addComplaint = () => setComplaints((c) => [...c, { ...emptyComplaint }]);
  const removeComplaint = (i: number) => { if (complaints.length > 1) setComplaints((c) => c.filter((_, idx) => idx !== i)); };
  const updateComplaint = (i: number, field: keyof ComplaintRow, value: string) => {
    setComplaints((c) => c.map((row, idx) => (idx === i ? { ...row, [field]: value } : row)));
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Record<string, string> = {};
    if (!patientId) e.patientId = "Required";
    setErrors(e);
    if (Object.keys(e).length) { toast.error("Please fix errors"); return; }
    toast.success("Case created successfully", { description: `For ${patientName}` });
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

  return (
    <div className="space-y-0 animate-fade-in">
      {/* Hero Banner */}
      <div className="bg-[hsl(var(--sidebar-background))] text-white rounded-2xl p-6 flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-heading font-bold">Homeopathic Case Taking Form</h1>
            <p className="text-white/70 text-sm">Complete case analysis for constitutional treatment</p>
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1.5 block">Patient *</Label>
                  <PatientSelector value={patientId} onChange={(id, name) => { setPatientId(id); setPatientName(name); }} error={errors.patientId} />
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
                <SelectField label="Sex" value={sex} onChange={setSex} options={["Male", "Female", "Other"]} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <SelectField label="Marital Status" value={maritalStatus} onChange={setMaritalStatus} options={["Single", "Married", "Divorced", "Widowed"]} />
                <TextField label="Occupation" value={occupation} onChange={setOccupation} placeholder="e.g., Teacher, Farmer" />
                <TextField label="Phone" value={phone} onChange={setPhone} placeholder="01XXXXXXXXX" />
              </div>
              <TextField label="Address" value={address} onChange={setAddress} placeholder="Village, Upazila, District, Country" />
            </div>

            {/* 2. Chief Complaints */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <SectionHeader number={2} icon={MessageSquare} title="Chief Complaints" color="destructive" />
              {complaints.map((c, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-muted/20 mb-4 relative">
                  {complaints.length > 1 && (
                    <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 text-destructive" onClick={() => removeComplaint(i)}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  )}
                  <div className="mb-3">
                    <Label className="text-xs text-muted-foreground">Complaint (in patient's own words)</Label>
                    <Textarea value={c.complaint} onChange={(e) => updateComplaint(i, "complaint", e.target.value)} placeholder="e.g., Joint pain (knee & shoulder)" className="mt-1 rounded-xl min-h-[70px]" />
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
                <TextField label="Medicine" value={medicine} onChange={setMedicine} placeholder="e.g., Rhus Toxicodendron" />
                <div className="grid grid-cols-2 gap-3">
                  <TextField label="Potency" value={potency} onChange={setPotency} placeholder="e.g., 200C" />
                  <TextField label="Dose" value={dose} onChange={setDose} placeholder="e.g., 4 pills" />
                </div>
                <TextField label="Repetition" value={repetition} onChange={setRepetition} placeholder="e.g., Once daily x 5 days" />
              </div>
            </div>

            {/* 13. Follow-Up */}
            <div className="bg-card rounded-2xl border-2 border-blue-200 p-5">
              <SectionHeader number={13} icon={CalendarDays} title="Follow-Up" color="info" />
              <div className="mb-3">
                <Label className="text-xs text-muted-foreground mb-1.5 block">Next Visit</Label>
                <Input type="date" value={nextVisit} onChange={(e) => setNextVisit(e.target.value)} className="rounded-xl" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground mb-1.5 block">Changes / Notes</Label>
                <Textarea value={followUpNotes} onChange={(e) => setFollowUpNotes(e.target.value)} placeholder="e.g., Improvement noted, reduce dose" className="rounded-xl min-h-[70px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-center mt-8 mb-4">
          <Button type="submit" variant="hero" size="lg" className="rounded-xl px-12">
            <ClipboardList className="w-5 h-5 mr-2" /> Submit Case
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminNewCase;
