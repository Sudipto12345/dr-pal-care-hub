import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, Download } from "lucide-react";
import { mockPrescriptions, mockPatients } from "@/data/mockData";

const PrescriptionPreview = () => {
  const { id } = useParams();
  const prescription = mockPrescriptions.find((p) => p.id === id) || mockPrescriptions[0];
  const patient = mockPatients.find((p) => p.name === prescription.patientName) || mockPatients[0];

  const handlePrint = () => window.print();

  // Parse medicines into structured data
  const medicines = prescription.medicines.map((med) => {
    const parts = med.split(" – ");
    const nameParts = parts[0].split(" ");
    const potency = nameParts.pop() || "";
    const name = nameParts.join(" ");
    const frequency = parts[1] || "As directed";
    return { name, potency, frequency };
  });

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Toolbar — hidden on print */}
      <div className="print:hidden sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto max-w-4xl flex items-center justify-between h-14 px-4">
          <Link to="/admin/prescriptions" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Prescriptions
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-xl" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-1" /> Print
            </Button>
            <Button size="sm" className="rounded-xl gradient-primary text-primary-foreground" onClick={handlePrint}>
              <Download className="w-4 h-4 mr-1" /> Save PDF
            </Button>
          </div>
        </div>
      </div>

      {/* A4 Prescription Page */}
      <div className="container mx-auto max-w-4xl py-8 px-4 print:p-0 print:max-w-none">
        <div
          className="bg-white rounded-2xl shadow-elevated print:shadow-none print:rounded-none mx-auto relative overflow-hidden"
          style={{ width: "210mm", minHeight: "297mm" }}
        >
          {/* ═══════════════════════════════════════
              HEADER — Bilingual Doctor Info
              ═══════════════════════════════════════ */}
          <div className="px-[20mm] pt-[15mm] pb-4">
            <div className="flex items-start justify-between">
              {/* Left — Bangla */}
              <div>
                <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                  ডাঃ অমিত কুমার পাল
                </h1>
                <div className="text-xs text-muted-foreground mt-1 space-y-0.5" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                  <p className="font-medium">বি.এইচ.এম.এস, এম.ডি (হোমিওপ্যাথি)</p>
                  <p>হোমিওপ্যাথিক চিকিৎসক ও গবেষক</p>
                  <p className="text-primary font-medium">হৃদরোগ, বাতজ্বর ও মেডিসিন বিশেষজ্ঞ</p>
                  <p>ক্লিনিক্যাল ও ইন্টারভেনশনাল কার্ডিওলজিস্ট</p>
                  <p className="text-primary font-medium">নিউলাইফ হোমিও হল</p>
                </div>
              </div>

              {/* Right — English */}
              <div className="text-right">
                <h2 className="text-xl font-bold text-foreground">Dr. Amit Kumar Pal</h2>
                <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
                  <p>BHMS, MD (Homeopathy)</p>
                  <p>Homeopathic Physician & Researcher</p>
                  <p className="text-primary font-semibold">Specialist in Constitutional Treatment</p>
                  <p className="text-primary font-semibold">& Chronic Disease Management</p>
                  <p className="font-medium text-foreground mt-1">Newlife Homeo Hall</p>
                  <p>BMDC Reg. no. - H-12345</p>
                  <p>Contact: 01700-000000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Header divider line */}
          <div className="mx-[20mm] border-t-2 border-foreground/80" />

          {/* ═══════════════════════════════════════
              PATIENT INFO ROW
              ═══════════════════════════════════════ */}
          <div className="px-[20mm] py-3">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground">Name:</span>
                <span className="text-foreground min-w-[120px] border-b border-muted-foreground/30 pb-0.5">{patient.name}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground">Age:</span>
                <span className="text-foreground min-w-[40px] border-b border-muted-foreground/30 pb-0.5">{patient.age}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground">Wt:</span>
                <span className="text-foreground min-w-[40px] border-b border-muted-foreground/30 pb-0.5">—</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground">Date:</span>
                <span className="text-foreground min-w-[80px] border-b border-muted-foreground/30 pb-0.5">{prescription.date}</span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              MAIN CONTENT — Two columns
              ═══════════════════════════════════════ */}
          <div className="px-[20mm] flex" style={{ minHeight: "180mm" }}>
            {/* LEFT COLUMN — Diagnosis, Complaints, Risk Factors, Investigations */}
            <div className="w-[45%] pr-4 border-r border-muted-foreground/20 py-4 space-y-5">
              {/* Dx */}
              <div>
                <h3 className="font-bold text-sm text-foreground mb-1.5">Dx-</h3>
                <p className="text-sm text-foreground leading-relaxed">{prescription.diagnosis}</p>
              </div>

              {/* Clinical Complaints */}
              <div>
                <h3 className="font-bold text-sm text-foreground mb-1.5">Clinical Complaints:</h3>
                <div className="text-sm text-muted-foreground space-y-1 leading-relaxed">
                  <p>Chronic nasal congestion</p>
                  <p>Thick, ropy nasal discharge</p>
                  <p>Post-nasal drip</p>
                  <p>Frontal headache</p>
                  <p>Loss of smell</p>
                </div>
              </div>

              {/* Risk Factors / O/E */}
              <div>
                <h3 className="font-bold text-sm text-foreground mb-1.5">Risk Factors:</h3>
                <div className="text-sm text-muted-foreground space-y-0.5">
                  <p>O/E-</p>
                  <p>Pulse- 72/min</p>
                  <p>BP- 120/80 mmHg</p>
                  <p>Temp- Normal</p>
                  <p>Tongue- Coated</p>
                  <p>Others- NAD</p>
                </div>
              </div>

              {/* Investigations */}
              <div>
                <h3 className="font-bold text-sm text-foreground mb-1.5">Investigations:</h3>
                <div className="text-sm text-muted-foreground">
                  <p>X-Ray PNS,</p>
                  <p>CBC, ESR,</p>
                  <p>IgE Total,</p>
                  <p>AEC</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — Rx Medicine Table with Schedule Grid */}
            <div className="w-[55%] pl-4 py-4">
              {/* Rx Symbol */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-3xl font-bold text-primary italic" style={{ fontFamily: "serif" }}>℞</span>
              </div>

              {/* Medicine Schedule Table */}
              <div className="border border-foreground/30 rounded-sm overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-foreground/30">
                      <th className="text-left px-2 py-2 font-semibold text-foreground border-r border-foreground/20 w-[40%]">Medicine</th>
                      <th className="px-1.5 py-1 font-semibold text-foreground border-r border-foreground/20 text-center" style={{ fontFamily: "'Noto Sans Bengali', sans-serif", fontSize: "10px" }}>সকাল</th>
                      <th className="px-1.5 py-1 font-semibold text-foreground border-r border-foreground/20 text-center" style={{ fontFamily: "'Noto Sans Bengali', sans-serif", fontSize: "10px" }}>দুপুর</th>
                      <th className="px-1.5 py-1 font-semibold text-foreground border-r border-foreground/20 text-center" style={{ fontFamily: "'Noto Sans Bengali', sans-serif", fontSize: "10px" }}>রাত</th>
                      <th className="px-1 py-1 font-semibold text-foreground border-r border-foreground/20 text-center" style={{ fontFamily: "'Noto Sans Bengali', sans-serif", fontSize: "9px", lineHeight: "1.2" }}>খাবার<br/>আগে</th>
                      <th className="px-1 py-1 font-semibold text-foreground border-r border-foreground/20 text-center" style={{ fontFamily: "'Noto Sans Bengali', sans-serif", fontSize: "9px", lineHeight: "1.2" }}>খাবার<br/>পরে</th>
                      <th className="px-1.5 py-1 font-semibold text-foreground text-center" style={{ fontFamily: "'Noto Sans Bengali', sans-serif", fontSize: "10px" }}>সময়</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map((med, i) => (
                      <tr key={i} className="border-b border-foreground/20 last:border-b-0">
                        <td className="px-2 py-2.5 text-foreground border-r border-foreground/20">
                          <p className="font-medium text-xs">{med.name}</p>
                          <p className="text-[10px] text-muted-foreground">{med.potency}</p>
                        </td>
                        <td className="px-1.5 py-2.5 text-center border-r border-foreground/20 text-foreground">
                          {med.frequency.includes("twice") || med.frequency.includes("thrice") ? "✓" : med.frequency.includes("once") ? "" : "✓"}
                        </td>
                        <td className="px-1.5 py-2.5 text-center border-r border-foreground/20 text-foreground">
                          {med.frequency.includes("thrice") ? "✓" : ""}
                        </td>
                        <td className="px-1.5 py-2.5 text-center border-r border-foreground/20 text-foreground">
                          {med.frequency.includes("twice") || med.frequency.includes("thrice") ? "✓" : ""}
                        </td>
                        <td className="px-1.5 py-2.5 text-center border-r border-foreground/20 text-foreground">✓</td>
                        <td className="px-1.5 py-2.5 text-center border-r border-foreground/20 text-foreground"></td>
                        <td className="px-1.5 py-2.5 text-center text-foreground text-[10px]">30 days</td>
                      </tr>
                    ))}
                    {/* Empty rows for manual writing */}
                    {Array.from({ length: Math.max(0, 6 - medicines.length) }).map((_, i) => (
                      <tr key={`empty-${i}`} className="border-b border-foreground/20 last:border-b-0">
                        <td className="px-2 py-4 border-r border-foreground/20"></td>
                        <td className="px-1.5 py-4 border-r border-foreground/20"></td>
                        <td className="px-1.5 py-4 border-r border-foreground/20"></td>
                        <td className="px-1.5 py-4 border-r border-foreground/20"></td>
                        <td className="px-1.5 py-4 border-r border-foreground/20"></td>
                        <td className="px-1.5 py-4 border-r border-foreground/20"></td>
                        <td className="px-1.5 py-4"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Advice section */}
              <div className="mt-6">
                <h3 className="font-bold text-sm text-foreground mb-2">Advice:</h3>
                <div className="text-xs text-muted-foreground space-y-1 leading-relaxed">
                  <p>• Take medicines 30 min before/after meals</p>
                  <p>• Avoid coffee, camphor, menthol during treatment</p>
                  <p>• Maintain a diet diary</p>
                  <p>• Follow-up after 30 days</p>
                </div>
              </div>

              {/* Signature */}
              <div className="mt-auto pt-10 flex justify-end">
                <div className="text-right">
                  <div className="w-40 border-b border-foreground mb-1" />
                  <p className="font-semibold text-sm text-foreground">Dr. Amit Kumar Pal</p>
                  <p className="text-[10px] text-muted-foreground">BHMS, MD (Homeopathy)</p>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              FOOTER — Clinic addresses (bilingual)
              ═══════════════════════════════════════ */}
          <div className="absolute bottom-0 left-0 right-0 border-t-2 border-foreground/60 px-[20mm] py-4">
            <div className="flex items-start justify-between">
              {/* Left chamber */}
              <div className="text-[10px] text-muted-foreground" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                <p className="font-medium text-foreground">
                  প্রতি শুক্রবার <span className="font-bold text-primary">বিকাল ৩ টা থেকে</span> - <span className="font-bold text-primary">রাত ৮ টা</span>
                </p>
                <p>নিউলাইফ হোমিও হল</p>
                <p>পেকুয়া, কক্সবাজার</p>
                <p className="font-medium text-foreground mt-1">সিরিয়ালের জন্য:</p>
                <p className="text-primary font-bold text-xs">01700-000000</p>
              </div>

              {/* Right chamber */}
              <div className="text-right text-[10px] text-muted-foreground" style={{ fontFamily: "'Noto Sans Bengali', sans-serif" }}>
                <p className="font-medium text-foreground">
                  প্রতিদিন <span className="font-bold text-primary">বিকাল ৬টা থেকে রাত ১০টা</span>
                </p>
                <p className="font-medium text-foreground">(মঙ্গলবার ও শুক্রবার বন্ধ)</p>
                <p className="font-medium text-foreground">রুম নং - ৩১৯</p>
                <p className="text-primary font-bold mt-1">চট্টগ্রাম মেট্রোপলিটন ডায়াগনস্টিক সেন্টার লিঃ</p>
                <p>গোল পাহাড় মোড়, ফোরাম সেন্টার, লেভেল - ২</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPreview;
