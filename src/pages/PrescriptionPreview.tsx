import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, Download } from "lucide-react";
import { mockPrescriptions, mockPatients } from "@/data/mockData";

const PrescriptionPreview = () => {
  const { id } = useParams();
  const prescription = mockPrescriptions.find((p) => p.id === id) || mockPrescriptions[0];
  const patient = mockPatients.find((p) => p.name === prescription.patientName) || mockPatients[0];

  const handlePrint = () => window.print();

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Toolbar — hidden on print */}
      <div className="print:hidden sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto max-w-4xl flex items-center justify-between h-14 px-4">
          <Link to="/admin/prescriptions" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Prescriptions
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-1" /> Print
            </Button>
            <Button variant="hero" size="sm" onClick={handlePrint}>
              <Download className="w-4 h-4 mr-1" /> Save PDF
            </Button>
          </div>
        </div>
      </div>

      {/* A4 Page */}
      <div className="container mx-auto max-w-4xl py-8 px-4 print:p-0 print:max-w-none">
        <div className="bg-card rounded-2xl shadow-elevated print:shadow-none print:rounded-none mx-auto" style={{ width: "210mm", minHeight: "297mm", padding: "20mm" }}>

          {/* Doctor Header */}
          <div className="border-b-2 border-primary pb-5 mb-6">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-heading text-2xl font-bold text-foreground tracking-tight">Dr. Amit Kumar Pal</h1>
                <p className="text-secondary font-medium text-sm mt-0.5">BHMS, MD (Homeopathy)</p>
                <p className="text-muted-foreground text-xs mt-1">Reg. No: 12345 — West Bengal Council of Homeopathic Medicine</p>
              </div>
              <div className="text-right text-xs text-muted-foreground leading-relaxed">
                <p className="font-medium text-foreground text-sm">Pal Homeopathic Clinic</p>
                <p>123 Healing Lane, New Delhi 110001</p>
                <p>Phone: +91 98765 43210</p>
                <p>Email: dr.amitpal@clinic.com</p>
              </div>
            </div>
          </div>

          {/* Prescription ID & Date */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <span className="text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full">Rx# {prescription.id}</span>
              <span className="text-xs text-muted-foreground">Date: {prescription.date}</span>
            </div>
          </div>

          {/* Patient Information */}
          <div className="bg-accent/40 rounded-xl p-4 mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Patient Information</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 gap-x-6 text-sm">
              <div>
                <span className="text-muted-foreground text-xs">Name</span>
                <p className="font-medium text-foreground">{patient.name}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Age / Gender</span>
                <p className="font-medium text-foreground">{patient.age} yrs / {patient.gender}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Patient ID</span>
                <p className="font-medium text-foreground">{patient.id}</p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Phone</span>
                <p className="font-medium text-foreground">{patient.phone}</p>
              </div>
            </div>
          </div>

          {/* Diagnosis */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Diagnosis</h3>
            <p className="text-foreground font-medium">{prescription.diagnosis}</p>
          </div>

          {/* Rx Symbol & Medicine Table */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-heading text-3xl font-bold text-secondary italic">℞</span>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Medicines</h3>
            </div>
            <div className="border border-border rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/60">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider w-8">#</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Medicine</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Potency</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Dosage</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Frequency</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {prescription.medicines.map((med, i) => {
                    // Parse medicine string "Name Potency – frequency"
                    const parts = med.split(" – ");
                    const nameParts = parts[0].split(" ");
                    const potency = nameParts.pop() || "";
                    const name = nameParts.join(" ");
                    const frequency = parts[1] || "As directed";
                    return (
                      <tr key={i} className={i % 2 === 0 ? "bg-card" : "bg-muted/20"}>
                        <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                        <td className="px-4 py-3 font-medium text-foreground">{name}</td>
                        <td className="px-4 py-3 text-foreground">{potency}</td>
                        <td className="px-4 py-3 text-foreground">2 pills</td>
                        <td className="px-4 py-3 text-foreground">{frequency}</td>
                        <td className="px-4 py-3 text-foreground">30 days</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Advice */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Advice & Instructions</h3>
            <div className="bg-accent/40 rounded-xl p-4 text-sm text-foreground leading-relaxed space-y-1.5">
              <p>• Take medicines 30 minutes before or after meals.</p>
              <p>• Avoid strong-smelling substances (coffee, camphor, menthol) during treatment.</p>
              <p>• Maintain a diet diary and note any aggravations.</p>
              <p>• Follow-up after 30 days or sooner if symptoms change.</p>
            </div>
          </div>

          {/* Follow-up */}
          <div className="mb-10">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Next Follow-up</h3>
            <p className="text-foreground font-medium text-sm">After 30 days — or as needed</p>
          </div>

          {/* Signature */}
          <div className="flex items-end justify-between pt-6 border-t border-border">
            <div className="text-xs text-muted-foreground">
              <p>This prescription is generated digitally.</p>
              <p>Valid for 60 days from the date of issue.</p>
            </div>
            <div className="text-right">
              <div className="w-40 border-b border-foreground mb-1" />
              <p className="font-heading font-semibold text-sm text-foreground">Dr. Amit Kumar Pal</p>
              <p className="text-xs text-muted-foreground">BHMS, MD (Homeopathy)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPreview;
