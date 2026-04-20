import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const TermsOfService = () => {
  const [data, setData] = useState<{ title: string; content: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Terms of Service | Dr. Amit Kumar Pal";
    supabase
      .from("site_settings")
      .select("title, content")
      .eq("key", "terms_of_service")
      .maybeSingle()
      .then(({ data }) => {
        setData(data as any);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">{data?.title || "Terms of Service"}</h1>
      <article className="prose prose-neutral max-w-none whitespace-pre-wrap text-foreground/90 leading-relaxed">
        {data?.content}
      </article>
    </div>
  );
};

export default TermsOfService;
