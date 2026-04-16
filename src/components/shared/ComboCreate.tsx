import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Check, Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComboCreateProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string; extra?: Record<string, string> }[];
  onCreateNew: (name: string) => Promise<void> | void;
  placeholder?: string;
  isCreating?: boolean;
  className?: string;
}

const ComboCreate = ({ value, onChange, options, onCreateNew, placeholder = "Search or type new...", isCreating, className }: ComboCreateProps) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const updatePosition = useCallback(() => {
    if (!inputRef.current) return;
    const rect = inputRef.current.getBoundingClientRect();
    setDropdownStyle({
      position: "fixed",
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onScroll = () => updatePosition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (ref.current?.contains(target)) return;
      // Check if click is inside the portal dropdown
      const portal = document.getElementById("combo-portal");
      if (portal?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));
  const exactMatch = options.some((o) => o.label.toLowerCase() === search.toLowerCase().trim());

  const handleCreate = async () => {
    if (!search.trim() || exactMatch) return;
    await onCreateNew(search.trim());
    onChange(search.trim());
    setSearch("");
    setOpen(false);
  };

  const dropdown = open ? (
    <div
      style={dropdownStyle}
      className="bg-popover border border-border rounded-xl shadow-lg max-h-52 overflow-y-auto"
      onMouseDown={(e) => e.stopPropagation()}
    >
      {filtered.length > 0 ? (
        filtered.map((o) => (
          <button
            key={o.value}
            type="button"
            className={cn(
              "w-full text-left px-3 py-2 text-sm hover:bg-accent transition-colors flex items-center justify-between",
              value === o.label && "bg-accent font-medium"
            )}
            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onClick={() => { onChange(o.label); setSearch(""); setOpen(false); }}
          >
            <span>{o.label}</span>
            {value === o.label && <Check className="w-3.5 h-3.5 text-primary" />}
          </button>
        ))
      ) : (
        <p className="px-3 py-2 text-sm text-muted-foreground">No results</p>
      )}
      {search.trim() && !exactMatch && (
        <button
          type="button"
          className="w-full text-left px-3 py-2 text-sm border-t border-border hover:bg-accent transition-colors flex items-center gap-2 text-primary font-medium"
          onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }}
          onClick={handleCreate}
          disabled={isCreating}
        >
          {isCreating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
          Add "{search.trim()}"
        </button>
      )}
    </div>
  ) : null;

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
        <Input
          ref={inputRef}
          value={open ? search : value || search}
          onChange={(e) => { setSearch(e.target.value); if (!open) setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          className={cn("rounded-xl pl-9 h-10", className)}
        />
      </div>
      {dropdown && createPortal(dropdown, document.body)}
    </div>
  );
};

export default ComboCreate;
