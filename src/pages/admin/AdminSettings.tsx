import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

type Setting = { key: string; title: string; content: string };

const KEYS = [
  { key: "privacy_policy", label: "Privacy Policy" },
  { key: "terms_of_service", label: "Terms of Service" },
];

const AdminSettings = () => {
  const [settings, setSettings] = useState<Record<string, Setting>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, title, content")
        .in("key", KEYS.map((k) => k.key));
      if (error) {
        toast.error(error.message);
      } else {
        const map: Record<string, Setting> = {};
        (data || []).forEach((row: any) => {
          map[row.key] = { key: row.key, title: row.title || "", content: row.content || "" };
        });
        KEYS.forEach((k) => {
          if (!map[k.key]) map[k.key] = { key: k.key, title: k.label, content: "" };
        });
        setSettings(map);
      }
      setLoading(false);
    })();
  }, []);

  const update = (key: string, field: "title" | "content", value: string) => {
    setSettings((s) => ({ ...s, [key]: { ...s[key], [field]: value } }));
  };

  const save = async (key: string) => {
    setSaving(key);
    const s = settings[key];
    const { error } = await supabase
      .from("site_settings")
      .upsert({ key, title: s.title, content: s.content }, { onConflict: "key" });
    setSaving(null);
    if (error) toast.error(error.message);
    else toast.success("Saved");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage site content shown to visitors.</p>
      </div>

      <Tabs defaultValue={KEYS[0].key}>
        <TabsList>
          {KEYS.map((k) => (
            <TabsTrigger key={k.key} value={k.key}>{k.label}</TabsTrigger>
          ))}
        </TabsList>

        {KEYS.map((k) => {
          const s = settings[k.key];
          return (
            <TabsContent key={k.key} value={k.key}>
              <Card className="p-6 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`${k.key}-title`}>Title</Label>
                  <Input
                    id={`${k.key}-title`}
                    value={s.title}
                    onChange={(e) => update(k.key, "title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${k.key}-content`}>Content (Markdown supported)</Label>
                  <Textarea
                    id={`${k.key}-content`}
                    value={s.content}
                    onChange={(e) => update(k.key, "content", e.target.value)}
                    rows={20}
                    className="font-mono text-sm"
                  />
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => save(k.key)} disabled={saving === k.key} variant="hero">
                    {saving === k.key ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save
                  </Button>
                </div>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};

export default AdminSettings;
