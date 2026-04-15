import { useState } from "react";
import PageHeader from "@/components/shared/PageHeader";
import DataTable from "@/components/shared/DataTable";
import { useCases, useDeleteCase } from "@/hooks/useSupabaseData";
import { Button } from "@/components/ui/button";
import { Plus, Loader2, Eye, Pencil, Trash2, Copy, User, MessageSquare, Brain, Activity, Stethoscope, History, Users, FlaskConical, Lightbulb, Pill, CalendarDays, Venus, Mars, Printer, Download, ClipboardPlus, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const InfoRow = ({ label, value }: { label: string; value: string | undefined }) => {
  if (!value) return null;
  return (
    <div className="flex gap-2">
      <span className="text-muted-foreground text-xs font-medium min-w-[100px] shrink-0">{label}:</span>
      <span className="text-foreground text-xs">{value}</span>
    </div>
  );
};

const SectionBlock = ({ icon: Icon, title, children, color = "primary" }: { icon: any; title: string; children: React.ReactNode; color?: string }) => (
  <div className="border border-border rounded-xl p-3 space-y-1.5">
    <div className="flex items-center gap-1.5 mb-2">
      <Icon className={`w-3.5 h-3.5 text-${color}`} />
      <span className="text-xs font-semibold text-foreground">{title}</span>
    </div>
    {children}
  </div>
);

const buildCopyText = (c: any) => {
  const fd = c.form_data || {};
  const lines: string[] = [];
  lines.push(`=== CASE: ${c.patients?.name || "Unknown"} ===`);
  lines.push(`Date: ${new Date(c.created_at).toLocaleDateString()}`);
  if (fd.age) lines.push(`Age: ${fd.age} ${fd.ageUnit || ""}`);
  if (fd.sex) lines.push(`Sex: ${fd.sex}`);
  if (fd.occupation) lines.push(`Occupation: ${fd.occupation}`);
  if (fd.phone) lines.push(`Phone: ${fd.phone}`);
  if (fd.address) lines.push(`Address: ${fd.address}`);

  if (fd.complaints?.length) {
    lines.push(`\n--- Chief Complaints ---`);
    fd.complaints.forEach((comp: any, i: number) => {
      if (comp.complaint) lines.push(`${i + 1}. ${comp.complaint} (Duration: ${comp.duration || "—"}, Location: ${comp.location || "—"}, Sensation: ${comp.sensation || "—"}, Better: ${comp.betterBy || "—"}, Worse: ${comp.worseBy || "—"})`);
    });
  }

  if (fd.temperament || fd.fears || fd.anger) {
    lines.push(`\n--- Mental & Emotional ---`);
    if (fd.temperament) lines.push(`Temperament: ${fd.temperament}`);
    if (fd.fears) lines.push(`Fears: ${fd.fears}`);
    if (fd.anger) lines.push(`Anger: ${fd.anger}`);
    if (fd.memory) lines.push(`Memory: ${fd.memory}`);
    if (fd.confidence) lines.push(`Confidence: ${fd.confidence}`);
    if (fd.stressHistory) lines.push(`Stress: ${fd.stressHistory}`);
    if (fd.company) lines.push(`Company: ${fd.company}`);
  }

  if (fd.appetite || fd.thirst || fd.thermalType) {
    lines.push(`\n--- Physical Generals ---`);
    if (fd.appetite) lines.push(`Appetite: ${fd.appetite}`);
    if (fd.thirst) lines.push(`Thirst: ${fd.thirst}`);
    const desires = [fd.desireSweet && "Sweet", fd.desireSalt && "Salt", fd.desireSour && "Sour", fd.desireSpicy && "Spicy", fd.desireMeat && "Meat"].filter(Boolean).join(", ");
    if (desires) lines.push(`Desires: ${desires}`);
    if (fd.aversion) lines.push(`Aversion: ${fd.aversion}`);
    if (fd.sleep) lines.push(`Sleep: ${fd.sleep}`);
    if (fd.dreams) lines.push(`Dreams: ${fd.dreams}`);
    if (fd.thermalType) lines.push(`Thermal: ${fd.thermalType}`);
  }

  if (fd.majorIllness || fd.surgery) {
    lines.push(`\n--- Past History ---`);
    if (fd.majorIllness) lines.push(`Major Illness: ${fd.majorIllness}`);
    if (fd.surgery) lines.push(`Surgery: ${fd.surgery}`);
    if (fd.medHistory) lines.push(`Medications: ${fd.medHistory}`);
  }

  if (fd.weight || fd.bp) {
    lines.push(`\n--- Physical Exam ---`);
    if (fd.weight) lines.push(`Weight: ${fd.weight} kg`);
    if (fd.height) lines.push(`Height: ${fd.height}`);
    if (fd.pulse) lines.push(`Pulse: ${fd.pulse}`);
    if (fd.bp) lines.push(`BP: ${fd.bp}`);
  }

  if (fd.medicine) {
    lines.push(`\n--- Prescription ---`);
    lines.push(`Medicine: ${fd.medicine} ${fd.potency || ""} ${fd.dose || ""}`);
    if (fd.repetition) lines.push(`Repetition: ${fd.repetition}`);
  }

  if (fd.followUps?.length) {
    lines.push(`\n--- Follow-Up Visits ---`);
    fd.followUps.forEach((fu: any, i: number) => {
      lines.push(`\nVisit #${i + 1}: ${fu.date || "No date"} — ${fu.status || "No status"}`);
      if (fu.improvement) lines.push(`  Improvement/Loss: ${fu.improvement}`);
      if (fu.medicine) lines.push(`  Medicine: ${fu.medicine}`);
      if ((fu.medicines || []).filter((m: any) => m.name?.trim()).length > 0) {
        lines.push(`  Prescription:`);
        fu.medicines.filter((m: any) => m.name?.trim()).forEach((m: any, mi: number) => {
          lines.push(`    ${mi + 1}. ${m.name} ${[m.potency, m.dose, m.frequency].filter(Boolean).join(" · ")}`);
        });
      }
      if (fu.notes) lines.push(`  Notes: ${fu.notes}`);
    });
  }

  if (c.symptoms) lines.push(`\nSymptoms: ${c.symptoms}`);
  if (c.history) lines.push(`History: ${c.history}`);
  if (c.notes) lines.push(`Notes: ${c.notes}`);

  return lines.join("\n");
};

const AdminCases = () => {
  const { data: cases, isLoading } = useCases();
  const deleteCase = useDeleteCase();
  const [viewCase, setViewCase] = useState<any>(null);

  const handleCopy = (c: any) => {
    navigator.clipboard.writeText(buildCopyText(c));
    toast.success("Case copied to clipboard!");
  };

  const buildCaseHtml = (c: any) => {
    const fd = c.form_data || {};
    const patientName = c.patients?.name || "Unknown";
    const date = new Date(c.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

    const section = (title: string, content: string) => content ? `<div class="section"><h3>${title}</h3>${content}</div>` : "";
    const row = (label: string, value: string | undefined) => value ? `<div class="row"><span class="label">${label}:</span> <span>${value}</span></div>` : "";

    const desires = [fd.desireSweet && "Sweet", fd.desireSalt && "Salt", fd.desireSour && "Sour", fd.desireSpicy && "Spicy", fd.desireMeat && "Meat"].filter(Boolean).join(", ");

    let complaintsHtml = "";
    if (fd.complaints?.length) {
      complaintsHtml = fd.complaints.filter((c: any) => c.complaint).map((c: any, i: number) =>
        `<div class="complaint"><strong>${i + 1}. ${c.complaint}</strong><br/>
        <span class="sub">${[c.duration && `Duration: ${c.duration}`, c.location && `Location: ${c.location}`, c.sensation && `Sensation: ${c.sensation}`, c.betterBy && `Better: ${c.betterBy}`, c.worseBy && `Worse: ${c.worseBy}`].filter(Boolean).join(" · ")}</span></div>`
      ).join("");
    }

    let followUpsHtml = "";
    if (fd.followUps?.length) {
      followUpsHtml = fd.followUps.map((fu: any, i: number) => {
        const medsHtml = (fu.medicines || []).filter((m: any) => m.name?.trim()).map((m: any, mi: number) =>
          `<tr><td>${mi + 1}</td><td>${m.name}</td><td>${m.potency || "—"}</td><td>${m.dose || "—"}</td><td>${m.frequency || "—"}</td></tr>`
        ).join("");

        return `<div class="followup">
          <div class="fu-header">
            <strong>Visit #${i + 1}</strong> — ${fu.date || "No date"}
            ${fu.status ? `<span class="badge">${fu.status}</span>` : ""}
          </div>
          ${fu.improvement ? `<div class="row"><span class="label">Improvement:</span> ${fu.improvement}</div>` : ""}
          ${fu.medicine ? `<div class="row"><span class="label">Medicine:</span> ${fu.medicine}</div>` : ""}
          ${fu.notes ? `<div class="row"><span class="label">Notes:</span> ${fu.notes}</div>` : ""}
          ${medsHtml ? `<table class="med-table"><thead><tr><th>#</th><th>Medicine</th><th>Potency</th><th>Dose</th><th>Frequency</th></tr></thead><tbody>${medsHtml}</tbody></table>` : ""}
        </div>`;
      }).join("");
    }

    return { patientName, html: `
    <div class="header">
      <div class="logo-area">
        <svg class="logo-icon" viewBox="0 0 48 48" width="48" height="48">
          <circle cx="24" cy="24" r="22" fill="#166534" opacity="0.1" stroke="#166534" stroke-width="2"/>
          <path d="M24 8 C20 16, 14 20, 14 28 C14 34, 18 38, 24 38 C30 38, 34 34, 34 28 C34 20, 28 16, 24 8Z" fill="#166534" opacity="0.3"/>
          <line x1="24" y1="14" x2="24" y2="34" stroke="#166534" stroke-width="2"/>
          <line x1="18" y1="20" x2="24" y2="26" stroke="#166534" stroke-width="1.5"/>
          <line x1="30" y1="22" x2="24" y2="28" stroke="#166534" stroke-width="1.5"/>
        </svg>
      </div>
      <h1>Newlife Homeo Hall</h1>
      <p class="clinic-tagline">Holistic Homeopathic Care</p>
      <p>Rampal, Bagerhat · +880 1911 734 726</p>
      <p style="margin-top:8px;font-size:14px;font-weight:600;">Case Record — ${patientName}</p>
      <p>Date: ${date}</p>
    </div>
    <div class="grid">
      ${section("Patient Information", [
        row("Age", fd.age ? `${fd.age} ${fd.ageUnit || ""}` : undefined),
        row("Sex", fd.sex), row("Marital Status", fd.maritalStatus),
        row("Occupation", fd.occupation), row("Phone", fd.phone), row("Address", fd.address),
      ].join(""))}
      ${complaintsHtml ? `<div class="section"><h3>Chief Complaints</h3>${complaintsHtml}</div>` : ""}
      ${section("Mental & Emotional", [
        row("Temperament", fd.temperament), row("Fears", fd.fears), row("Anger", fd.anger),
        row("Memory", fd.memory), row("Confidence", fd.confidence), row("Stress", fd.stressHistory), row("Company", fd.company),
      ].join(""))}
      ${section("Physical Generals", [
        row("Appetite", fd.appetite), row("Thirst", fd.thirst), desires ? row("Desires", desires) : "",
        row("Aversion", fd.aversion), row("Sweat", fd.sweatQty), row("Sleep", fd.sleep),
        row("Dreams", fd.dreams), row("Thermal", fd.thermalType), row("Weather", fd.weatherEffect),
      ].join(""))}
      ${fd.menstruation ? section("Female Section", [row("Menstruation", fd.menstruation), row("Flow", fd.flow), row("Pain", fd.mensPain), row("Leucorrhoea", fd.leucorrhoea)].join("")) : ""}
      ${fd.sexualDesire ? section("Male Section", [row("Sexual Desire", fd.sexualDesire), row("Problems", fd.maleProblems)].join("")) : ""}
      ${section("Past History", [row("Major Illness", fd.majorIllness), row("Surgery", fd.surgery), row("Medications", fd.medHistory)].join(""))}
      ${section("Family History", [row("Diabetes", fd.famDiabetes), row("Hypertension", fd.famHypertension), row("Cancer", fd.famCancer), row("Other", fd.famOther)].join(""))}
      ${section("Physical Examination", [row("Weight", fd.weight ? `${fd.weight} kg` : undefined), row("Height", fd.height), row("Pulse", fd.pulse), row("BP", fd.bp), row("Tongue", fd.tongue), row("Skin", fd.skin)].join(""))}
      ${fd.investigations ? section("Investigations", `<p style="font-size:12px;white-space:pre-wrap;">${fd.investigations}</p>`) : ""}
      ${fd.keyRubrics || fd.miasm ? section("Totality & Analysis", [row("Key Rubrics", fd.keyRubrics), row("Miasm", fd.miasm)].join("")) : ""}
      ${fd.medicine ? `<div class="section prescription-box"><h3>Prescription</h3>${[row("Medicine", fd.medicine), row("Potency", fd.potency), row("Dose", fd.dose), row("Repetition", fd.repetition)].join("")}</div>` : ""}
    </div>
    ${followUpsHtml ? `<div class="section full-width" style="margin-top:4px;"><h3>Follow-Up Visits (${fd.followUps.length})</h3>${followUpsHtml}</div>` : ""}
    ${!fd || !Object.keys(fd).length ? `<div class="grid"><div class="section">${row("Symptoms", c.symptoms)}${row("History", c.history)}${row("Notes", c.notes)}</div></div>` : ""}
    
    <div class="signature-area">
      <div class="signature-left">
        <div class="sig-line"></div>
        <p>Patient / Guardian Signature</p>
      </div>
      <div class="signature-right">
        <div class="sig-line"></div>
        <p>Doctor's Signature & Seal</p>
        <p class="doctor-name">Dr. [Name]</p>
        <p class="doctor-qual">BHMS / DHMS</p>
        <p class="doctor-qual">Newlife Homeo Hall</p>
      </div>
    </div>

    <div class="footer">Printed on ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" })} · Newlife Homeo Hall · This is a confidential medical document</div>
    `};
  };

  const caseStyles = `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; color: #1a1a1a; font-size: 13px; line-height: 1.5; }
    .header { text-align: center; border-bottom: 2px solid #166534; padding-bottom: 15px; margin-bottom: 20px; }
    .logo-area { display: flex; justify-content: center; margin-bottom: 8px; }
    .logo-icon { width: 48px; height: 48px; }
    .header h1 { font-size: 22px; color: #166534; margin-bottom: 0; letter-spacing: 0.5px; }
    .clinic-tagline { font-size: 11px; color: #166534; font-style: italic; margin-bottom: 4px; letter-spacing: 1px; text-transform: uppercase; }
    .header p { color: #666; font-size: 12px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
    .section { border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; break-inside: avoid; }
    .section h3 { font-size: 13px; color: #166534; border-bottom: 1px solid #e8e8e8; padding-bottom: 5px; margin-bottom: 8px; }
    .row { font-size: 12px; margin-bottom: 3px; }
    .label { font-weight: 600; color: #555; }
    .full-width { grid-column: 1 / -1; }
    .complaint { background: #f9f9f9; padding: 6px 8px; border-radius: 5px; margin-bottom: 5px; font-size: 12px; }
    .complaint .sub { color: #777; font-size: 11px; }
    .followup { border: 1px solid #e4e4e4; border-radius: 8px; padding: 10px; margin-bottom: 10px; }
    .fu-header { font-size: 13px; margin-bottom: 6px; }
    .badge { background: #166534; color: white; padding: 1px 8px; border-radius: 10px; font-size: 10px; margin-left: 8px; }
    .med-table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 11px; }
    .med-table th { background: #f0fdf4; text-align: left; padding: 4px 8px; border: 1px solid #d1d5db; font-weight: 600; }
    .med-table td { padding: 4px 8px; border: 1px solid #d1d5db; }
    .prescription-box { background: #f0fdf4; border: 1px solid #166534; border-radius: 8px; padding: 12px; }
    .prescription-box h3 { color: #166534; border-bottom: 1px solid #bbf7d0; }
    .signature-area { display: flex; justify-content: space-between; margin-top: 40px; padding: 0 20px; }
    .signature-left, .signature-right { text-align: center; width: 40%; }
    .sig-line { border-top: 1px solid #333; margin-bottom: 6px; margin-top: 50px; }
    .signature-area p { font-size: 11px; color: #555; margin: 0; }
    .doctor-name { font-weight: 600; color: #166534 !important; font-size: 12px !important; margin-top: 4px !important; }
    .doctor-qual { font-size: 10px !important; color: #777 !important; }
    .footer { text-align: center; margin-top: 30px; padding-top: 10px; border-top: 1px solid #ccc; color: #999; font-size: 10px; }
    @media print { body { padding: 15px; } .section { break-inside: avoid; } .signature-area { break-inside: avoid; } }
  `;

  const handlePrint = (c: any) => {
    const { patientName, html: bodyHtml } = buildCaseHtml(c);
    const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Case - ${patientName}</title><style>${caseStyles}</style></head><body>${bodyHtml}</body></html>`;
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(fullHtml);
      printWindow.document.close();
      printWindow.onload = () => printWindow.print();
    }
  };

  const handleDownloadPdf = async (c: any) => {
    const { patientName, html: bodyHtml } = buildCaseHtml(c);
    toast.info("Generating PDF...");

    const container = document.createElement("div");
    container.innerHTML = bodyHtml;
    container.style.cssText = "font-family: 'Segoe UI', Arial, sans-serif; padding: 30px; color: #1a1a1a; font-size: 13px; line-height: 1.5; width: 794px;";

    // Add styles inline for html2pdf
    const styleEl = document.createElement("style");
    styleEl.textContent = caseStyles;
    container.prepend(styleEl);

    document.body.appendChild(container);

    try {
      const html2pdf = (await import("html2pdf.js")).default;
      await html2pdf().set({
        margin: [10, 10, 10, 10],
        filename: `Case-${patientName.replace(/\s+/g, "-")}-${new Date().toISOString().split("T")[0]}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      }).from(container).save();
      toast.success("PDF downloaded successfully!");
    } catch (err) {
      console.error("PDF generation error:", err);
      toast.error("Failed to generate PDF. Try the Print option instead.");
    } finally {
      document.body.removeChild(container);
    }
  };

  if (isLoading) return <div className="flex justify-center py-20"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-0 animate-fade-in">
      <PageHeader
        title="Case Management"
        description="Track patient cases and treatment progress"
        actions={<Button variant="hero" size="sm" asChild><Link to="/admin/cases/new"><Plus className="w-4 h-4 mr-1" /> New Case</Link></Button>}
      />
      <DataTable
        data={cases || []}
        searchPlaceholder="Search cases..."
        columns={[
          { header: "Patient", accessor: (row: any) => row.patients?.name || "Unknown" },
          { header: "Symptoms", accessor: (row: any) => row.symptoms?.substring(0, 50) || "—" },
          { header: "Date", accessor: (row: any) => new Date(row.created_at).toLocaleDateString() },
          {
            header: "Actions",
            accessor: (row: any) => (
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setViewCase(row)} title="View"><Eye className="w-3.5 h-3.5" /></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" asChild title="Edit"><Link to={`/admin/cases/${row.id}/edit`}><Pencil className="w-3.5 h-3.5" /></Link></Button>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(row)} title="Copy"><Copy className="w-3.5 h-3.5" /></Button>
                <ConfirmDialog
                  trigger={<Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><Trash2 className="w-3.5 h-3.5" /></Button>}
                  title="Delete Case"
                  description="Are you sure? This cannot be undone."
                  confirmLabel="Delete"
                  variant="destructive"
                  onConfirm={() => deleteCase.mutate(row.id)}
                />
              </div>
            ),
          },
        ]}
      />

      {/* Full Case View Dialog */}
      <Dialog open={!!viewCase} onOpenChange={() => setViewCase(null)}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Case: {viewCase?.patients?.name || "Unknown"}
            </DialogTitle>
            <DialogDescription>
              Created: {viewCase && new Date(viewCase.created_at).toLocaleDateString()} 
              {viewCase?.form_data ? " • Full structured data available" : " • Basic data only"}
            </DialogDescription>
          </DialogHeader>

          {viewCase?.form_data && Object.keys(viewCase.form_data).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Patient Info */}
              <SectionBlock icon={User} title="Patient Information">
                <InfoRow label="Age" value={viewCase.form_data.age ? `${viewCase.form_data.age} ${viewCase.form_data.ageUnit || ""}` : undefined} />
                <InfoRow label="Sex" value={viewCase.form_data.sex} />
                <InfoRow label="Marital" value={viewCase.form_data.maritalStatus} />
                <InfoRow label="Occupation" value={viewCase.form_data.occupation} />
                <InfoRow label="Phone" value={viewCase.form_data.phone} />
                <InfoRow label="Address" value={viewCase.form_data.address} />
              </SectionBlock>

              {/* Complaints */}
              <SectionBlock icon={MessageSquare} title="Chief Complaints" color="destructive">
                {viewCase.form_data.complaints?.map((c: any, i: number) => (
                  c.complaint ? (
                    <div key={i} className="p-2 bg-muted/30 rounded-lg text-xs space-y-0.5">
                      <p className="font-medium">{i + 1}. {c.complaint}</p>
                      <p className="text-muted-foreground">
                        {[c.duration && `Duration: ${c.duration}`, c.location && `Location: ${c.location}`, c.sensation && `Sensation: ${c.sensation}`].filter(Boolean).join(" • ")}
                      </p>
                      <p className="text-muted-foreground">
                        {[c.betterBy && `Better: ${c.betterBy}`, c.worseBy && `Worse: ${c.worseBy}`].filter(Boolean).join(" • ")}
                      </p>
                    </div>
                  ) : null
                ))}
              </SectionBlock>

              {/* Mental */}
              <SectionBlock icon={Brain} title="Mental & Emotional" color="info">
                <InfoRow label="Temperament" value={viewCase.form_data.temperament} />
                <InfoRow label="Fears" value={viewCase.form_data.fears} />
                <InfoRow label="Anger" value={viewCase.form_data.anger} />
                <InfoRow label="Memory" value={viewCase.form_data.memory} />
                <InfoRow label="Confidence" value={viewCase.form_data.confidence} />
                <InfoRow label="Stress" value={viewCase.form_data.stressHistory} />
                <InfoRow label="Company" value={viewCase.form_data.company} />
              </SectionBlock>

              {/* Physical Generals */}
              <SectionBlock icon={Activity} title="Physical Generals" color="secondary">
                <InfoRow label="Appetite" value={viewCase.form_data.appetite} />
                <InfoRow label="Thirst" value={viewCase.form_data.thirst} />
                {(() => {
                  const fd = viewCase.form_data;
                  const desires = [fd.desireSweet && "Sweet", fd.desireSalt && "Salt", fd.desireSour && "Sour", fd.desireSpicy && "Spicy", fd.desireMeat && "Meat"].filter(Boolean).join(", ");
                  return desires ? <InfoRow label="Desires" value={desires} /> : null;
                })()}
                <InfoRow label="Aversion" value={viewCase.form_data.aversion} />
                <InfoRow label="Sweat" value={viewCase.form_data.sweatQty} />
                <InfoRow label="Sleep" value={viewCase.form_data.sleep} />
                <InfoRow label="Dreams" value={viewCase.form_data.dreams} />
                <InfoRow label="Thermal" value={viewCase.form_data.thermalType} />
                <InfoRow label="Weather" value={viewCase.form_data.weatherEffect} />
              </SectionBlock>

              {/* Female/Male */}
              {viewCase.form_data.menstruation && (
                <SectionBlock icon={Venus} title="Female Section" color="destructive">
                  <InfoRow label="Menstruation" value={viewCase.form_data.menstruation} />
                  <InfoRow label="Flow" value={viewCase.form_data.flow} />
                  <InfoRow label="Pain" value={viewCase.form_data.mensPain} />
                  <InfoRow label="Leucorrhoea" value={viewCase.form_data.leucorrhoea} />
                </SectionBlock>
              )}
              {viewCase.form_data.sexualDesire && (
                <SectionBlock icon={Mars} title="Male Section" color="info">
                  <InfoRow label="Sexual Desire" value={viewCase.form_data.sexualDesire} />
                  <InfoRow label="Problems" value={viewCase.form_data.maleProblems} />
                </SectionBlock>
              )}

              {/* Past & Family History */}
              <SectionBlock icon={History} title="Past History">
                <InfoRow label="Major Illness" value={viewCase.form_data.majorIllness} />
                <InfoRow label="Surgery" value={viewCase.form_data.surgery} />
                <InfoRow label="Medications" value={viewCase.form_data.medHistory} />
              </SectionBlock>

              <SectionBlock icon={Users} title="Family History">
                <InfoRow label="Diabetes" value={viewCase.form_data.famDiabetes} />
                <InfoRow label="Hypertension" value={viewCase.form_data.famHypertension} />
                <InfoRow label="Cancer" value={viewCase.form_data.famCancer} />
                <InfoRow label="Other" value={viewCase.form_data.famOther} />
              </SectionBlock>

              {/* Physical Exam */}
              <SectionBlock icon={Stethoscope} title="Physical Examination">
                <InfoRow label="Weight" value={viewCase.form_data.weight ? `${viewCase.form_data.weight} kg` : undefined} />
                <InfoRow label="Height" value={viewCase.form_data.height} />
                <InfoRow label="Pulse" value={viewCase.form_data.pulse} />
                <InfoRow label="BP" value={viewCase.form_data.bp} />
                <InfoRow label="Tongue" value={viewCase.form_data.tongue} />
                <InfoRow label="Skin" value={viewCase.form_data.skin} />
              </SectionBlock>

              {/* Investigations */}
              {viewCase.form_data.investigations && (
                <SectionBlock icon={FlaskConical} title="Investigations">
                  <p className="text-xs text-foreground whitespace-pre-wrap">{viewCase.form_data.investigations}</p>
                </SectionBlock>
              )}

              {/* Totality */}
              {(viewCase.form_data.keyRubrics || viewCase.form_data.miasm) && (
                <SectionBlock icon={Lightbulb} title="Totality & Analysis" color="warning">
                  <InfoRow label="Key Rubrics" value={viewCase.form_data.keyRubrics} />
                  <InfoRow label="Miasm" value={viewCase.form_data.miasm} />
                </SectionBlock>
              )}

              {/* Prescription */}
              {viewCase.form_data.medicine && (
                <SectionBlock icon={Pill} title="Prescription" color="secondary">
                  <InfoRow label="Medicine" value={viewCase.form_data.medicine} />
                  <InfoRow label="Potency" value={viewCase.form_data.potency} />
                  <InfoRow label="Dose" value={viewCase.form_data.dose} />
                  <InfoRow label="Repetition" value={viewCase.form_data.repetition} />
                </SectionBlock>
              )}

              {/* Follow-ups - Timeline Style */}
              {viewCase.form_data.followUps?.length > 0 && (
                <div className="md:col-span-2">
                  <SectionBlock icon={CalendarDays} title={`Follow-Up Visits (${viewCase.form_data.followUps.length})`} color="info">
                    <div className="relative pl-4">
                      {/* Timeline line */}
                      <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-info via-info/50 to-info/20 rounded-full" />
                      
                      <div className="space-y-4">
                        {viewCase.form_data.followUps.map((fu: any, i: number) => (
                          <div key={i} className="relative flex gap-3">
                            {/* Timeline dot */}
                            <div className="relative z-10 shrink-0">
                              <div className={`w-4 h-4 rounded-full border-2 border-background shadow-sm flex items-center justify-center ${
                                fu.status === "Improved" ? "bg-green-500" :
                                fu.status === "Worse" ? "bg-red-500" :
                                fu.status === "Same" ? "bg-gray-400" :
                                fu.status === "Partially Improved" ? "bg-amber-500" :
                                fu.status === "New Symptoms" ? "bg-purple-500" :
                                "bg-info"
                              }`}>
                                <span className="text-[8px] text-white font-bold">{i + 1}</span>
                              </div>
                            </div>
                            
                            {/* Content card */}
                            <div className="flex-1 p-3 rounded-xl bg-muted/40 border border-border/60 hover:border-info/30 transition-colors">
                              {/* Header */}
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <span className="text-sm font-semibold text-foreground">{fu.date || "No date"}</span>
                                {fu.status && (
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                    fu.status === "Improved" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                    fu.status === "Worse" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                                    fu.status === "Same" ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400" :
                                    fu.status === "Partially Improved" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                                    fu.status === "New Symptoms" ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" :
                                    "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                  }`}>{fu.status}</span>
                                )}
                              </div>
                              
                              {/* Content */}
                              {fu.improvement && (
                                <div className="mb-2">
                                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Improvement/Loss:</span>
                                  <p className="text-xs text-foreground mt-0.5">{fu.improvement}</p>
                                </div>
                              )}
                              {fu.medicine && (
                                <div className="flex items-start gap-1.5 mb-1.5">
                                  <span className="text-xs">💊</span>
                                  <div>
                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Medicine:</span>
                                    <p className="text-xs text-foreground">{fu.medicine}</p>
                                  </div>
                                </div>
                              )}
                              {/* Follow-up Prescription Medicines */}
                              {(fu.medicines || []).filter((m: any) => m.name?.trim()).length > 0 && (
                                <div className="mt-2 p-2.5 rounded-lg bg-secondary/5 border border-secondary/20">
                                  <div className="flex items-center gap-1.5 mb-2">
                                    <Pill className="w-3 h-3 text-secondary" />
                                    <span className="text-[10px] uppercase tracking-wider text-secondary font-semibold">
                                      Prescription ({(fu.medicines || []).filter((m: any) => m.name?.trim()).length} medicine{(fu.medicines || []).filter((m: any) => m.name?.trim()).length !== 1 ? "s" : ""})
                                    </span>
                                  </div>
                                  <div className="space-y-1.5">
                                    {(fu.medicines || []).filter((m: any) => m.name?.trim()).map((med: any, mi: number) => (
                                      <div key={mi} className="flex items-center gap-2 text-xs">
                                        <span className="w-4 h-4 rounded-full bg-secondary/20 text-secondary text-[9px] font-bold flex items-center justify-center shrink-0">{mi + 1}</span>
                                        <span className="font-medium text-foreground">{med.name}</span>
                                        <span className="text-muted-foreground">
                                          {[med.potency, med.dose, med.frequency].filter(Boolean).join(" · ") || ""}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {fu.notes && (
                                <div className="flex items-start gap-1.5 mt-1.5">
                                  <span className="text-xs">📝</span>
                                  <div>
                                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Notes:</span>
                                    <p className="text-xs text-foreground">{fu.notes}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </SectionBlock>
                </div>
              )}
              {/* Legacy follow-up */}
              {!viewCase.form_data.followUps && (viewCase.form_data.nextVisit || viewCase.form_data.followUpNotes) && (
                <SectionBlock icon={CalendarDays} title="Follow-Up" color="info">
                  <InfoRow label="Next Visit" value={viewCase.form_data.nextVisit} />
                  <InfoRow label="Notes" value={viewCase.form_data.followUpNotes} />
                </SectionBlock>
              )}
            </div>
          ) : (
            /* Fallback: basic fields */
            <div className="space-y-3 text-sm">
              <div><span className="font-medium text-muted-foreground">Symptoms:</span><p className="mt-1 whitespace-pre-wrap">{viewCase?.symptoms || "—"}</p></div>
              <div><span className="font-medium text-muted-foreground">History:</span><p className="mt-1 whitespace-pre-wrap">{viewCase?.history || "—"}</p></div>
              <div><span className="font-medium text-muted-foreground">Notes:</span><p className="mt-1 whitespace-pre-wrap">{viewCase?.notes || "—"}</p></div>
            </div>
          )}

          {/* Bottom actions */}
          <div className="flex justify-end gap-2 pt-2 border-t border-border">
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => handleDownloadPdf(viewCase)}>
              <Download className="w-3.5 h-3.5 mr-1" /> PDF
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => handlePrint(viewCase)}>
              <Printer className="w-3.5 h-3.5 mr-1" /> Print
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => handleCopy(viewCase)}>
              <Copy className="w-3.5 h-3.5 mr-1" /> Copy
            </Button>
            <Button variant="hero" size="sm" className="rounded-xl" asChild>
              <Link to={`/admin/cases/${viewCase?.id}/edit`}><Pencil className="w-3.5 h-3.5 mr-1" /> Edit</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCases;
