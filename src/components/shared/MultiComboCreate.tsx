import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Check, Search, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiComboCreateProps {
  values: string[];
  onChange: (values: string[]) => void;
  options: { label: string; value: string }[];
  onCreateNew: (name: string) => Promise<void> | void;
  placeholder?: string;
  isCreating?: boolean;
  className?: string;
}

const MultiComboCreate = ({
  values,
  onChange,
  options,
  onCreateNew,
  placeholder = "Search or type new...",
  isCreating,
  className,
}: MultiComboCreateProps) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = options.filter(
    (o) => o.label.toLowerCase().includes(search.toLowerCase())
  );
  const exactMatch = options.some(
    (o) => o.label.toLowerCase() === search.toLowerCase().trim()
  );

  const toggleValue = (label: string) => {
    if (values.includes(label)) {
      onChange(values.filter((v) => v !== label));
    } else {
      onChange([...values, label]);
    }
    setSearch("");
  };

  const removeValue = (label: string) => {
    onChange(values.filter((v) => v !== label));
  };

  const handleCreate = async () => {
    if (!search.trim() || exactMatch) return;
    await onCreateNew(search.trim());
    onChange([...values, search.trim()]);
    setSearch("");
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      {/* Selected tags */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {values.map((v) => (
            <span
              key={v}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium border border-primary/20"
            >
              {v}
              <button
                type="button"
                onClick={() => removeValue(v)}
                className="hover:text-destructive transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className="rounded-xl pl-9 h-10"
        />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-xl shadow-lg max-h-52 overflow-y-auto">
          {filtered.length > 0 ? (
            filtered.map((o) => {
              const isSelected = values.includes(o.label);
              return (
                <button
                  key={o.value}
                  type="button"
                  className={cn(
                    "w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors flex items-center justify-between",
                    isSelected && "bg-accent font-medium"
                  )}
                  onClick={() => toggleValue(o.label)}
                >
                  <span>{o.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                </button>
              );
            })
          ) : (
            <p className="px-3 py-2 text-sm text-muted-foreground">No results</p>
          )}
          {search.trim() && !exactMatch && (
            <button
              type="button"
              className="w-full text-left px-3 py-2 text-sm border-t border-border hover:bg-accent transition-colors flex items-center gap-2 text-primary font-medium"
              onClick={handleCreate}
              disabled={isCreating}
            >
              {isCreating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              Add "{search.trim()}"
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiComboCreate;
