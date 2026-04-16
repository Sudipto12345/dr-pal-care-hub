import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Check, ChevronDown, X } from "lucide-react";
import { usePatients } from "@/hooks/useSupabaseData";
import AddPatientForm from "@/components/forms/AddPatientForm";

interface PatientSelectorProps {
  value: string;
  onChange: (id: string, name: string) => void;
  error?: string;
}

const PatientSelector = ({ value, onChange, error }: PatientSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const { data: patients = [] } = usePatients();
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  const selectedPatient = patients.find((p: any) => p.id === value);

  const filtered = patients.filter((p: any) =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.phone?.includes(search)
  );

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setDropdownStyle({
      position: "fixed",
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
      zIndex: 9999,
    });
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const onScroll = () => updatePosition();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onScroll);
    };
  }, [isOpen, updatePosition]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (containerRef.current?.contains(target)) return;
      const el = e.target as HTMLElement;
      if (el.closest?.("[data-patient-dropdown]")) return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (p: any) => {
    onChange(p.id, p.name);
    setSearch("");
    setIsOpen(false);
  };

  const dropdown = isOpen ? (
    <div
      style={dropdownStyle}
      data-patient-dropdown
      className="bg-card border border-border rounded-xl shadow-elevated overflow-hidden animate-fade-in"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="p-2 border-b border-border">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or phone..." className="pl-8 h-9 rounded-lg border-muted text-sm" autoFocus onMouseDown={(e) => e.stopPropagation()} />
        </div>
      </div>
      <div className="max-h-48 overflow-y-auto">
        {filtered.length > 0 ? filtered.map((p: any) => (
          <button key={p.id} onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }} onClick={() => handleSelect(p)} className={`w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-accent/50 transition-colors ${value === p.id ? "bg-accent" : ""}`}>
            <div>
              <p className="text-sm font-medium text-foreground">{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.age ? `${p.age}y` : ""} · {p.gender || ""} · {p.phone || ""}</p>
            </div>
            {value === p.id && <Check className="w-4 h-4 text-secondary flex-shrink-0" />}
          </button>
        )) : (
          <div className="px-3 py-4 text-center"><p className="text-sm text-muted-foreground">No patients found</p></div>
        )}
      </div>
      <div className="border-t border-border p-2">
        <AddPatientForm trigger={<Button variant="ghost" size="sm" className="w-full justify-start text-secondary hover:text-secondary rounded-lg"><UserPlus className="w-4 h-4 mr-2" /> Create New Patient</Button>} />
      </div>
    </div>
  ) : null;

  return (
    <div ref={containerRef} className="relative">
      <div ref={triggerRef} onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between h-10 w-full rounded-xl border px-3 cursor-pointer transition-colors text-sm ${error ? "border-destructive" : "border-input"} bg-background hover:bg-accent/30`}>
        {selectedPatient ? (
          <div className="flex items-center justify-between w-full">
            <span className="text-foreground font-medium">{selectedPatient.name}</span>
            <button onClick={(e) => { e.stopPropagation(); onChange("", ""); }} className="p-0.5 hover:bg-muted rounded"><X className="w-3.5 h-3.5 text-muted-foreground" /></button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full text-muted-foreground">
            <span>Select patient...</span><ChevronDown className="w-4 h-4" />
          </div>
        )}
      </div>
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      {dropdown && createPortal(dropdown, document.body)}
    </div>
  );
};

export default PatientSelector;
