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
  const ce = ((prescription as any).clinical_exam || {}) as any;

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
        <div className="bg-white shadow-elevated print:shadow-none" style={{ minHeight: "297mm", padding: "10mm 12mm", fontFamily: "'Times New Roman', serif", color: "#1a1a1a", position: "relative" }}>

          {/* ===== HEADER ===== */}
          <div style={{ borderBottom: "2.5px solid #333", paddingBottom: "10px", marginBottom: "8px", minHeight: "115px" }}>
            {showHeader ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                {/* Left - Bengali */}
                <div style={{ flex: 1 }}>
                  <h1 className="font-bangla" style={{ fontSize: "26px", fontWeight: 700, color: "#1a237e", margin: 0, lineHeight: 1.2 }}>
                    ডাঃ অমিত কুমার পাল
                  </h1>
                  <p className="font-bangla" style={{ fontSize: "11px", margin: "2px 0", color: "#333", fontWeight: 600 }}>
                    হোমিওপ্যাথিক কনসালট্যান্ট, গবেষক ও ওয়েলনেস বিশেষজ্ঞ
                  </p>
                  <p className="font-bangla" style={{ fontSize: "11px", margin: "1px 0", color: "#c62828", fontWeight: 600 }}>
                    সরকার অনুমোদিত হোমিওপ্যাথিক ডাক্তার
                  </p>
                  <p className="font-bangla" style={{ fontSize: "11px", margin: "1px 0", color: "#555" }}>
                    ডিএইচএমএস (বিএইচবি), ঢাকা | এমএ, বিএ (ইংরেজি)
                  </p>
                  <p className="font-bangla" style={{ fontSize: "11px", margin: "1px 0", color: "#555" }}>
                    বিএস ইন হেলথ সায়েন্স, যুক্তরাষ্ট্র | স্বর্ণপদক বিজয়ী (ভারত)
                  </p>
                  <p className="font-bangla" style={{ fontSize: "10px", margin: "1px 0", color: "#555" }}>
                    সদস্য: হোমিওপ্যাথি ওয়ার্ল্ড কমিউনিটি, যুক্তরাষ্ট্র
                  </p>
                </div>

                {/* Right - English */}
                <div style={{ textAlign: "right", flex: 1 }}>
                  <h2 style={{ fontSize: "22px", fontWeight: 700, color: "#1a237e", margin: 0, lineHeight: 1.2 }}>
                    Dr. Amit Kumar Pal
                  </h2>
                  <p style={{ fontSize: "11px", margin: "2px 0", color: "#333", fontWeight: 600 }}>
                    Homeopathic Consultant, Researcher & Wellness Specialist
                  </p>
                  <p style={{ fontSize: "11px", margin: "1px 0", color: "#c62828", fontWeight: 600 }}>
                    Govt Reg. Homeopathic Doctor
                  </p>
                  <p style={{ fontSize: "10px", margin: "1px 0", color: "#555" }}>
                    DHMS (BHB), Dhaka | MA, BA (English)
                  </p>
                  <p style={{ fontSize: "10px", margin: "1px 0", color: "#555" }}>
                    BS in Health Science, U.S.A. | Gold Medalist (India)
                  </p>
                  <p style={{ fontSize: "10px", margin: "1px 0", color: "#555" }}>
                    Member: Homeopathy World Community, U.S.A.
                  </p>
                  <p style={{ fontSize: "10px", margin: "3px 0 0", color: "#1565c0", fontWeight: 600 }}>
                    📍 Dhaka, Bangladesh | 📞 01911 734 726 / 01787 354 248
                  </p>
                </div>
              </div>
            ) : (
              <div style={{ height: "105px" }} />
            )}
          </div>

          {/* ===== PATIENT INFO ROW ===== */}
          <div style={{ display: "flex", borderBottom: "1.5px solid #999", paddingBottom: "6px", marginBottom: "10px", fontSize: "13px", gap: "6px" }}>
            <div style={{ flex: 2 }}>
              <span style={{ fontWeight: 700 }}>Name: </span>
              <span style={{ borderBottom: "1px dotted #999", paddingBottom: "1px" }}>{patient?.name || "________________"}</span>
            </div>
            <div style={{ flex: 0.8 }}>
              <span style={{ fontWeight: 700 }}>Age: </span>
              <span>{patient?.age || "___"}y</span>
            </div>
            <div style={{ flex: 0.6 }}>
              <span style={{ fontWeight: 700 }}>Wt: </span>
              <span>___</span>
            </div>
            <div style={{ flex: 1.2 }}>
              <span style={{ fontWeight: 700 }}>Date: </span>
              <span>{new Date(prescription.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* ===== TWO COLUMN BODY ===== */}
          <div style={{ display: "flex", gap: "0", minHeight: "520px" }}>
            {/* LEFT COLUMN - 35% */}
            <div style={{ width: "35%", paddingRight: "12px", borderRight: "1.5px solid #bbb" }}>
              {/* Dx */}
              <div style={{ marginBottom: "18px" }}>
                <p style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 4px" }}>Dx-</p>
                <p style={{ fontSize: "12px", color: "#333", minHeight: "18px", whiteSpace: "pre-line" }}>{prescription.diagnosis || ""}</p>
              </div>

              {/* Clinical Complaints */}
              <div style={{ marginBottom: "18px" }}>
                <p style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 4px" }}>Clinical Complaints:</p>
                <p style={{ fontSize: "12px", color: "#333", whiteSpace: "pre-line", minHeight: "80px" }}>{prescription.advice || ""}</p>
              </div>

              {/* Risk Factors / Notes */}
              <div style={{ marginBottom: "18px" }}>
                <p style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 4px" }}>Risk Factors: <span style={{ fontWeight: 400, fontSize: "12px" }}>{ce.riskFactors || ""}</span></p>
                <div style={{ fontSize: "12px", color: "#333", lineHeight: 1.6 }}>
                  <p style={{ margin: "0" }}>O/E- {ce.oe || ""}</p>
                  <p style={{ margin: "0" }}>Pulse- {ce.pulse || ""}</p>
                  <p style={{ margin: "0" }}>BP- {ce.bp || ""}</p>
                  <p style={{ margin: "0" }}>Heart- {ce.heart || ""}</p>
                  <p style={{ margin: "0" }}>Lung- {ce.lung || ""}</p>
                  <p style={{ margin: "0" }}>Others- {ce.others || ""}</p>
                </div>
              </div>

              {/* Investigations / Follow-up */}
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "14px", fontWeight: 700, margin: "0 0 4px" }}>Investigations:</p>
                <p style={{ fontSize: "12px", color: "#333", whiteSpace: "pre-line", minHeight: "40px" }}>
                  {prescription.follow_up ? `Follow-up: ${new Date(prescription.follow_up).toLocaleDateString()}` : ""}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN - 65% */}
            <div style={{ width: "65%", paddingLeft: "10px" }}>
              {/* Medicine Grid Table */}
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "11px" }}>
                <thead>
                  <tr>
                    <th style={{ ...thStyle, textAlign: "center", width: "4%", padding: "5px 2px" }}></th>
                    <th style={{ ...thStyle, textAlign: "left", width: "28%", padding: "5px 4px" }}>Medicine</th>
                    <th style={{ ...thStyle, width: "10%", padding: "5px 2px" }}>Potency</th>
                    <th style={{ ...thStyle, padding: "5px 2px" }} className="font-bangla">সকাল</th>
                    <th style={{ ...thStyle, padding: "5px 2px" }} className="font-bangla">দুপুর</th>
                    <th style={{ ...thStyle, padding: "5px 2px" }} className="font-bangla">রাত</th>
                    <th style={{ ...thStyle, padding: "5px 2px", fontSize: "9px", lineHeight: 1.2 }} className="font-bangla">খাবার<br/>আগে</th>
                    <th style={{ ...thStyle, padding: "5px 2px", fontSize: "9px", lineHeight: 1.2 }} className="font-bangla">খাবার<br/>পরে</th>
                    <th style={{ ...thStyle, padding: "5px 2px" }} className="font-bangla">সময়</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.map((m: any, i: number) => {
                    const freq = (m.frequency || "").toLowerCase();
                    const morning = freq.includes("thrice") || freq.includes("twice") || freq.includes("once") || freq.includes("morning") ? m.dose || "✓" : "";
                    const noon = freq.includes("thrice") || freq.includes("twice") ? m.dose || "✓" : "";
                    const night = freq.includes("thrice") || freq.includes("night") || freq.includes("once") ? m.dose || "✓" : "";
                    const beforeMeal = freq.includes("before") ? "✓" : "";
                    const afterMeal = freq.includes("after") ? "✓" : "";

                    return (
                      <tr key={m.id || i}>
                        <td style={tdStyle}>{i + 1}</td>
                        <td style={{ ...tdStyle, fontWeight: 600, textAlign: "left" }}>{m.medicine_name}</td>
                        <td style={{ ...tdStyle, textAlign: "center" }}>{m.potency || "—"}</td>
                        <td style={tdStyle}>{morning}</td>
                        <td style={tdStyle}>{noon}</td>
                        <td style={tdStyle}>{night}</td>
                        <td style={tdStyle}>{beforeMeal}</td>
                        <td style={tdStyle}>{afterMeal}</td>
                        <td style={{ ...tdStyle, fontSize: "10px" }}>{m.frequency || "—"}</td>
                      </tr>
                    );
                  })}
                  {/* Empty rows */}
                  {Array.from({ length: Math.max(0, 10 - medicines.length) }).map((_, i) => (
                    <tr key={`empty-${i}`}>
                      <td style={tdStyle}>&nbsp;</td>
                      <td style={tdStyle}>&nbsp;</td>
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
          <div style={{ position: "absolute", bottom: "10mm", left: "12mm", right: "12mm", borderTop: "2.5px solid #333", paddingTop: "8px", minHeight: "65px" }}>
            {showFooter ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: "11px" }}>
                <div>
                  <p className="font-bangla" style={{ margin: "0 0 2px", fontWeight: 600, color: "#333", fontSize: "12px" }}>
                    অনলাইন ও অফলাইন পরামর্শ সেবা
                  </p>
                  <p style={{ margin: "0 0 2px", color: "#555", fontSize: "11px" }}>
                    📍 Dhaka, Bangladesh • ✉ dramithomeo@gmail.com
                  </p>
                  <p className="font-bangla" style={{ margin: "0", fontWeight: 700, color: "#c62828", fontSize: "14px" }}>
                    📞 ০১৯১১-৭৩৪৭২৬ / ০১৭৮৭-৩৫৪২৪৮
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ width: "180px", borderTop: "1px solid #333", paddingTop: "4px", marginLeft: "auto" }}>
                    <p style={{ fontSize: "13px", fontWeight: 700, margin: 0, color: "#1a237e" }}>Dr. Amit Kumar Pal</p>
                    <p style={{ fontSize: "10px", margin: 0, color: "#555" }}>DHMS (BHB) • Gold Medalist</p>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ height: "55px" }} />
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

const thStyle: React.CSSProperties = {
  border: "1px solid #999",
  padding: "5px 3px",
  textAlign: "center",
  fontWeight: 700,
  backgroundColor: "#f5f5f5",
  fontSize: "11px",
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #ccc",
  padding: "5px 3px",
  textAlign: "center",
  verticalAlign: "middle",
  minHeight: "26px",
};

export default PrescriptionPreview;
