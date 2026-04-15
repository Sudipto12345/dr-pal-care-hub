import { useState, useRef, useCallback } from "react";
import { FileText, Upload, Trash2, Download, Loader2, CloudUpload, Tag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import EmptyState from "@/components/shared/EmptyState";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB
const ACCEPTED = ".jpg,.jpeg,.png,.pdf";

const PatientReports = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { data: patient } = useQuery({
    queryKey: ["my-patient-record", user?.id],
    queryFn: async () => {
      const { data } = await supabase.from("patients").select("*").eq("user_id", user!.id).maybeSingle();
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ["my-reports", patient?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("patient_reports" as any)
        .select("*")
        .eq("patient_id", patient!.id)
        .order("created_at", { ascending: false });
      return (data || []) as any[];
    },
    enabled: !!patient?.id,
  });

  const handleFilePick = (f: File | null) => {
    if (!f) return;
    if (f.size > MAX_SIZE) {
      toast({ title: "File too large", description: "Max 5 MB allowed", variant: "destructive" });
      return;
    }
    setFile(f);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFilePick(e.dataTransfer.files?.[0] || null);
  }, []);

  const handleUpload = async () => {
    if (!file || !patient?.id) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${patient.id}/${Date.now()}.${ext}`;
      const { error: storageErr } = await supabase.storage.from("reports").upload(path, file);
      if (storageErr) throw storageErr;

      const { data: urlData } = supabase.storage.from("reports").getPublicUrl(path);

      const { error: dbErr } = await supabase.from("patient_reports" as any).insert({
        patient_id: patient.id,
        title: title || file.name.replace(/\.[^/.]+$/, ""),
        file_url: urlData.publicUrl,
        file_name: file.name,
        file_type: file.type,
        file_size: file.size,
      } as any);
      if (dbErr) throw dbErr;

      toast({ title: "Report uploaded successfully" });
      setFile(null);
      setTitle("");
      qc.invalidateQueries({ queryKey: ["my-reports"] });
    } catch (err: any) {
      toast({ title: "Upload failed", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const deleteReport = useMutation({
    mutationFn: async (report: any) => {
      // Extract storage path from URL
      const url = new URL(report.file_url);
      const pathParts = url.pathname.split("/reports/");
      if (pathParts[1]) {
        await supabase.storage.from("reports").remove([decodeURIComponent(pathParts[1])]);
      }
      const { error } = await supabase.from("patient_reports" as any).delete().eq("id", report.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ title: "Report deleted" });
      qc.invalidateQueries({ queryKey: ["my-reports"] });
    },
  });

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-primary rounded-2xl p-5 flex items-center justify-between text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold">My Medical Reports</h1>
            <p className="text-xs text-primary-foreground/70">Securely upload and access all your test reports in one place</p>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl px-4 py-2 text-center">
          <p className="text-xl font-bold">{reports.length}</p>
          <p className="text-[10px] text-primary-foreground/70">Reports</p>
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="bg-primary/5 border-b border-border px-5 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <CloudUpload className="w-4 h-4 text-primary" />
          </div>
          <div>
            <p className="text-sm font-bold">Upload New Report</p>
            <p className="text-[11px] text-muted-foreground">JPG, PNG, or PDF — max 5 MB</p>
          </div>
        </div>

        <div className="p-5 flex flex-col md:flex-row items-start md:items-end gap-4">
          {/* Title */}
          <div className="flex-1 w-full">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1.5">
              <Tag className="w-3 h-3" /> Report Title <span className="text-muted-foreground/50">(optional)</span>
            </label>
            <Input
              placeholder="e.g. Blood Test — CBC, X-Ray Chest ..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-xl"
            />
          </div>

          {/* File Drop */}
          <div className="flex-1 w-full">
            <label className="text-xs font-medium text-muted-foreground flex items-center gap-1 mb-1.5">
              📎 Select File <span className="text-destructive">*</span>
            </label>
            <div
              className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
                dragOver ? "border-primary bg-primary/5" : file ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/40"
              }`}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
            >
              {file ? (
                <p className="text-xs font-medium text-primary truncate">{file.name} ({formatSize(file.size)})</p>
              ) : (
                <>
                  <Upload className="w-5 h-5 mx-auto text-muted-foreground/40 mb-1" />
                  <p className="text-xs text-muted-foreground">Click to browse or drag & drop</p>
                </>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept={ACCEPTED}
              className="hidden"
              onChange={(e) => handleFilePick(e.target.files?.[0] || null)}
            />
          </div>

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="rounded-xl shrink-0"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Upload className="w-4 h-4 mr-1" />}
            Upload
          </Button>
        </div>
      </div>

      {/* Reports List */}
      <Card className="border-border/60 rounded-2xl">
        <CardContent className="p-5">
          {isLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>
          ) : reports.length === 0 ? (
            <div className="py-10">
              <EmptyState
                icon={FileText}
                title="No Reports Yet"
                description="Upload your blood tests, X-rays, ultrasounds, or any medical report above — they are stored securely."
                actionLabel="Upload First Report"
                onAction={() => fileRef.current?.click()}
              />
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map((r: any) => (
                <div key={r.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/40">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      {r.file_type?.includes("pdf") ? (
                        <FileText className="w-4 h-4 text-primary" />
                      ) : (
                        <Eye className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold truncate">{r.title || r.file_name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {new Date(r.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                        {r.file_size ? ` · ${formatSize(r.file_size)}` : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                      <a href={r.file_url} target="_blank" rel="noopener noreferrer"><Download className="w-4 h-4" /></a>
                    </Button>
                    <ConfirmDialog
                      title="Delete Report?"
                      description="This will permanently remove this report."
                      onConfirm={() => deleteReport.mutate(r)}
                      trigger={
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="text-center text-[10px] text-muted-foreground py-4 border-t border-border/30">
        🔒 This is your personal medical record. Please consult your doctor for any queries.
        <span className="float-right">Dr. Amit Kumar Pal © {new Date().getFullYear()}. All Rights Reserved.</span>
      </div>
    </div>
  );
};

export default PatientReports;
