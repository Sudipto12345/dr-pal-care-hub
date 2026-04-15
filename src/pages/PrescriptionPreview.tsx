import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Printer, ArrowLeft, Download, Loader2, Eye, EyeOff } from "lucide-react";
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
            {/* Header/Footer toggles */}
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

      {/* Prescription Content */}
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <div className="bg-white rounded-2xl shadow-elevated p-8 print:shadow-none print:rounded-none print:p-6">
          {/* Header - maintains space when hidden */}
          <div className="border-b-2 border-primary/20 pb-6 mb-6">
            {showHeader ? (
              <div className="text-center">
                <h1 className="text-2xl font-heading font-bold text-foreground">Dr. Amit Kumar Pal</h1>
                <p className="text-sm text-primary font-medium">BHMS (Gold Medalist) | Advanced Homeopathic Practitioner</p>
                <p className="text-xs text-muted-foreground mt-1">Reg. No: WBHMC/12345</p>
                <p className="text-xs text-muted-foreground mt-0.5">📞 +91 98765 43210 | ✉ dr.amitpal@clinic.com</p>
                <p className="text-xs text-muted-foreground">📍 123 Healing Lane, New Delhi, India 110001</p>
              </div>
            ) : (
              <div className="h-[88px]" /> /* blank space preserving layout */
            )}
          </div>

          {/* Patient Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/30 rounded-xl">
            <div>
              <p className="text-xs text-muted-foreground">Patient Name</p>
              <p className="text-sm font-semibold text-foreground">{patient?.name || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Age / Gender</p>
              <p className="text-sm font-semibold text-foreground">{patient?.age || "—"}y / {patient?.gender || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm text-foreground">{patient?.phone || "—"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Date</p>
              <p className="text-sm text-foreground">{new Date(prescription.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Diagnosis */}
          {prescription.diagnosis && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Diagnosis</h3>
              <p className="text-sm text-muted-foreground">{prescription.diagnosis}</p>
            </div>
          )}

          {/* Rx Symbol */}
          <div className="mb-4">
            <span className="text-3xl font-serif text-primary font-bold">℞</span>
          </div>

          {/* Medicines Table */}
          <div className="mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-foreground/10">
                  <th className="text-left py-2 text-xs uppercase tracking-wide text-muted-foreground">#</th>
                  <th className="text-left py-2 text-xs uppercase tracking-wide text-muted-foreground">Medicine</th>
                  <th className="text-left py-2 text-xs uppercase tracking-wide text-muted-foreground">Potency</th>
                  <th className="text-left py-2 text-xs uppercase tracking-wide text-muted-foreground">Dose</th>
                  <th className="text-left py-2 text-xs uppercase tracking-wide text-muted-foreground">Frequency</th>
                </tr>
              </thead>
              <tbody>
                {medicines.map((m: any, i: number) => (
                  <tr key={m.id || i} className="border-b border-border/50">
                    <td className="py-3 text-muted-foreground">{i + 1}</td>
                    <td className="py-3 font-medium text-foreground">{m.medicine_name}</td>
                    <td className="py-3 text-muted-foreground">{m.potency || "—"}</td>
                    <td className="py-3 text-muted-foreground">{m.dose || "—"}</td>
                    <td className="py-3 text-muted-foreground">{m.frequency || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Advice */}
          {prescription.advice && (
            <div className="mb-6 p-4 bg-primary/5 rounded-xl">
              <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Advice & Instructions</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">{prescription.advice}</p>
            </div>
          )}

          {/* Follow-up */}
          {prescription.follow_up && (
            <div className="mb-6">
              <p className="text-sm"><span className="font-semibold text-foreground">Follow-up: </span><span className="text-muted-foreground">{new Date(prescription.follow_up).toLocaleDateString()}</span></p>
            </div>
          )}

          {/* Footer - maintains space when hidden */}
          <div className="pt-8 border-t border-border/50">
            {showFooter ? (
              <div className="flex justify-between items-end">
                <div className="text-xs text-muted-foreground">
                  <p>This is a computer-generated prescription.</p>
                  <p className="mt-0.5">📞 +91 98765 43210 | 📍 123 Healing Lane, New Delhi</p>
                </div>
                <div className="text-right">
                  <div className="w-40 border-t border-foreground/30 pt-1">
                    <p className="text-sm font-semibold text-foreground">Dr. Amit Kumar Pal</p>
                    <p className="text-xs text-muted-foreground">BHMS (Gold Medalist)</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[52px]" /> /* blank space preserving layout */
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionPreview;
