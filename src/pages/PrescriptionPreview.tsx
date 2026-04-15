import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, Download, Loader2 } from "lucide-react";
import { usePrescription } from "@/hooks/useSupabaseData";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PrescriptionPreview = () => {
  const { id } = useParams();
  const { data: prescription, isLoading } = usePrescription(id || "");
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  const handlePrint = () => window.print();

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;
  if (!prescription) return <div className="min-h-screen flex items-center justify-center"><p className="text-muted-foreground">Prescription not found</p></div>;

  const patient = prescription.patients as any;
  const medicines = (prescription.prescription_items || []) as any[];

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Toolbar */}
      <div className="print:hidden sticky top-0 z-50 bg-card border-b border-border">
        <div className="container mx-auto max-w-4xl flex items-center justify-between h-14 px-4">
          <Link to="/admin/prescriptions" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Prescriptions
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-4 border-r border-border pr-3">
              <div className="flex items-center gap-1.5">
                <Switch id="show-header" checked={showHeader} onCheckedChange={setShowHeader} className="h-4 w-7" />
                <Label htmlFor="show-header" className="text-xs text-muted-foreground cursor-pointer">Header</Label>
              </div>
              <div className="flex items-center gap-1.5">
                <Switch id="show-footer" checked={showFooter} onCheckedChange={setShowFooter} className="h-4 w-7" />
                <Label htmlFor="show-footer" className="text-xs text-muted-foreground cursor-pointer">Footer</Label>
              </div>
            </div>
            <Button variant="outline" size="sm" className="rounded-xl" onClick={handlePrint}>
              <Printer className="w-4 h-4 mr-1" /> Print
            </Button>
            <Button size="sm" className="rounded-xl gradient-primary text-primary-foreground" onClick={handlePrint}>
              <Download className="w-4 h-4 mr-1" /> Save PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Prescription Pad */}
      <div className="container mx-auto max-w-[210mm] py-8 px-4 print:py-0 print:px-0">
        <div className="bg-white shadow-elevated print:shadow-none" style={{ minHeight: "297mm", padding: "12mm 15mm", fontFamily: "'Times New Roman', serif", color: "#1a1a1a", position: "relative" }}>

          {/* ===== HEADER ===== */}
          <div style={{ borderBottom: "2px solid #333", paddingBottom: "12px", marginBottom: "10px", minHeight: "120px" }}>
            {showHeader ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                {/* Left - Bengali + English */}
                <div style={{ flex: 1 }}>
                  <h1 className="font-bangla" style={{ fontSize: "28px", fontWeight: 700, color: "#1a237e", margin: 0, lineHeight: 1.2 }}>
                    ডাঃ অমিত কুমার পাল
                  </h1>
                  <p className="font-bangla" style={{ fontSize: "13px", margin: "2px 0", color: "#333" }}>
                    বিএইচএমএস (গোল্ড মেডেলিস্ট)
                  </p>
                  <p className="font-bangla" style={{ fontSize: "13px", margin: "2px 0", color: "#333" }}>
                    উন্নত হোমিওপ্যাথিক চিকিৎসক
                  </p>
                  <p className="font-bangla" style={{ fontSize: "12px", margin: "4px 0 0", color: "#c62828", fontWeight: 600 }}>
                    হোমিওপ্যাথি বিশেষজ্ঞ
                  </p>
                  <p className="font-bangla" style={{ fontSize: "11px", margin: "2px 0", color: "#555" }}>
                    ক্লিনিক: ১২৩ হিলিং লেন, নিউ দিল্লি
                  </p>
                </div>

                {/* Right - English */}
                <div style={{ textAlign: "right", flex: 1 }}>
                  <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1a237e", margin: 0, lineHeight: 1.2 }}>
                    Dr. Amit Kumar Pal
                  </h2>
                  <p style={{ fontSize: "13px", margin: "2px 0", color: "#333" }}>
                    BHMS (Gold Medalist)
                  </p>
                  <p style={{ fontSize: "13px", margin: "2px 0", color: "#333" }}>
                    Advanced Homeopathic Practitioner
                  </p>
                  <p style={{ fontSize: "12px", margin: "4px 0 0", color: "#c62828", fontWeight: 600 }}>
                    Intervention Homeopath
                  </p>
                  <p style={{ fontSize: "12px", margin: "2px 0", color: "#c62828", fontWeight: 600 }}>
                    and Medicine Specialist
                  </p>
                  <p style={{ fontSize: "12px", margin: "4px 0 0", color: "#1565c0", fontWeight: 600 }}>
                    Healing Lane Clinic
                  </p>
                  <p style={{ fontSize: "11px", margin: "2px 0", color: "#333" }}>
                    Reg. No: WBHMC/12345
                  </p>
                  <p style={{ fontSize: "11px", margin: "2px 0", color: "#333" }}>
                    Contact: +91 98765 43210
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ height: "108px" }} />
            )}
          </div>

          {/* ===== PATIENT INFO ROW ===== */}
          <div style={{ display: "flex", borderBottom: "1px solid #999", paddingBottom: "8px", marginBottom: "12px", fontSize: "14px", gap: "8px" }}>
            <div style={{ flex: 2 }}>
              <span style={{ fontWeight: 600 }}>Name: </span>
              <span style={{ borderBottom: "1px dotted #999", paddingBottom: "2px" }}>{patient?.name || "________________"}</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 600 }}>Age: </span>
              <span>{patient?.age || "___"}y</span>
            </div>
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 600 }}>Gender: </span>
              <span>{patient?.gender || "___"}</span>
            </div>
            <div style={{ flex: 1.5 }}>
              <span style={{ fontWeight: 600 }}>Date: </span>
              <span>{new Date(prescription.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* ===== TWO COLUMN BODY ===== */}
          <div style={{ display: "flex", gap: "0", minHeight: "500px" }}>
            {/* LEFT COLUMN - Diagnosis & Clinical Info */}
            <div style={{ width: "45%", paddingRight: "16px", borderRight: "1px solid #ccc" }}>
              {/* Dx */}
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 4px" }}>Dx-</p>
                <p style={{ fontSize: "13px", color: "#333", minHeight: "20px" }}>{prescription.diagnosis || ""}</p>
              </div>

              {/* Clinical Complaints / Advice */}
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 4px" }}>Clinical Complaints:</p>
                <p style={{ fontSize: "13px", color: "#333", whiteSpace: "pre-line", minHeight: "60px" }}>{prescription.advice || ""}</p>
              </div>

              {/* Follow-up */}
              {prescription.follow_up && (
                <div style={{ marginBottom: "16px" }}>
                  <p style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 4px" }}>Follow-up:</p>
                  <p style={{ fontSize: "13px", color: "#333" }}>{new Date(prescription.follow_up).toLocaleDateString()}</p>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN - Rx & Medicine Grid Table */}
            <div style={{ width: "55%", paddingLeft: "16px" }}>
              {/* Rx Symbol */}
              <div style={{ marginBottom: "8px" }}>
                <span style={{ fontSize: "36px", fontWeight: 700, color: "#1a237e", fontFamily: "serif" }}>℞</span>
              </div>

              {/* Medicine Grid Table */}
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, textAlign: "left", width: "5%" }}>#</th>
                    <th style={{ ...thStyle, textAlign: "left", width: "35%" }}>Medicine</th>
                    <th style={{ ...thStyle, width: "12%" }}>Potency</th>
                    <th style={thStyle} className="font-bangla">সকাল</th>
                    <th style={thStyle} className="font-bangla">দুপুর</th>
                    <th style={thStyle} className="font-bangla">রাত</th>
                    <th style={thStyle} className="font-bangla">সময়</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((m: any, i: number) => {
                    const freq = (m.frequency || "").toLowerCase();
                    const morning = freq.includes("thrice") || freq.includes("twice") || freq.includes("once") || freq.includes("morning") ? m.dose || "✓" : "";
                    const noon = freq.includes("thrice") || freq.includes("twice") ? m.dose || "✓" : "";
                    const night = freq.includes("thrice") || freq.includes("night") || freq.includes("once") ? m.dose || "✓" : "";

                    return (
                      <tr key={m.id || i}>
                        <td style={tdStyle}>{i + 1}</td>
                        <td style={{ ...tdStyle, fontWeight: 600, textAlign: "left" }}>{m.medicine_name}</td>
                        <td style={{ ...tdStyle, textAlign: "center" }}>{m.potency || "—"}</td>
                        <td style={tdStyle}>{morning}</td>
                        <td style={tdStyle}>{noon}</td>
                        <td style={tdStyle}>{night}</td>
                        <td style={tdStyle}>{m.frequency || "—"}</td>
                      </tr>
                    );
                  })}
                  {/* Empty rows to fill space like a real pad */}
                  {Array.from({ length: Math.max(0, 8 - medicines.length) }).map((_, i) => (
                    <tr key={`empty-${i}`}>
                      <td style={tdStyle}>&nbsp;</td>
                      <td style={tdStyle}>&nbsp;</td>
                      <td style={tdStyle}>&nbsp;</td>
                      <td style={tdStyle}>&nbsp;</td>
                      <td style={tdStyle}>&nbsp;</td>
                      <td style={tdStyle}>&nbsp;</td>
                      <td style={tdStyle}>&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ===== FOOTER ===== */}
          <div style={{ position: "absolute", bottom: "12mm", left: "15mm", right: "15mm", borderTop: "2px solid #333", paddingTop: "10px", minHeight: "70px" }}>
            {showFooter ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: "12px" }}>
                {/* Left clinic */}
                <div>
                  <p className="font-bangla" style={{ margin: "0 0 2px", fontWeight: 600, color: "#333" }}>
                    প্রতিদিন সকাল ৯টা থেকে রাত ৯টা
                  </p>
                  <p style={{ margin: "0 0 2px", color: "#555" }}>
                    123 Healing Lane, New Delhi, India
                  </p>
                  <p className="font-bangla" style={{ margin: "0", fontWeight: 700, color: "#c62828", fontSize: "14px" }}>
                    ০১৯৮৭-৬৫৪৩২১
                  </p>
                </div>

                {/* Right - Signature */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ width: "180px", borderTop: "1px solid #333", paddingTop: "4px", marginLeft: "auto" }}>
                    <p style={{ fontSize: "14px", fontWeight: 700, margin: 0, color: "#1a237e" }}>Dr. Amit Kumar Pal</p>
                    <p style={{ fontSize: "11px", margin: 0, color: "#555" }}>BHMS (Gold Medalist)</p>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ height: "58px" }} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

// Table cell styles
const thStyle: React.CSSProperties = {
  border: "1px solid #999",
  padding: "6px 4px",
  textAlign: "center",
  fontWeight: 700,
  backgroundColor: "#f5f5f5",
  fontSize: "11px",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "6px 4px",
  textAlign: "center",
  verticalAlign: "middle",
  minHeight: "28px",
};

export default PrescriptionPreview;
