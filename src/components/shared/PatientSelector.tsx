import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, Check, ChevronDown, X } from "lucide-react";
import { mockPatients } from "@/data/mockData";
import AddPatientForm from "@/components/forms/AddPatientForm";

interface PatientOption {
  id: string;
  name: string;
  age: number;
  gender: string;
  phone: string;
}

interface PatientSelectorProps {
  value: string;
  onChange: (id: string, name: string) => void;
  error?: string;
}

const PatientSelector = ({ value, onChange, error }: PatientSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showAddPatient, setShowAddPatient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const patients: PatientOption[] = mockPatients;
  const selectedPatient = patients.find((p) => p.id === value);

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.phone.includes(search)
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelect = (p: PatientOption) => {
    onChange(p.id, p.name);
    setSearch("");
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange("", "");
    setSearch("");
  };

  return (
    <div ref={containerRef} className="relative">
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between h-10 w-full rounded-xl border px-3 cursor-pointer transition-colors text-sm ${
          error ? "border-destructive" : "border-input"
        } bg-background hover:bg-accent/30`}
      >
        {selectedPatient ? (
          <div className="flex items-center justify-between w-full">
            <span className="text-foreground font-medium">{selectedPatient.name}</span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">{selectedPatient.id}</span>
              <button onClick={handleClear} className="p-0.5 hover:bg-muted rounded">
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full text-muted-foreground">
            <span>Select patient...</span>
            <ChevronDown className="w-4 h-4" />
          </div>
        )}
      </div>

      {error && <p className="text-xs text-destructive mt-1">{error}</p>}

      {isOpen && (
        <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-elevated overflow-hidden animate-fade-in">
          {/* Search input */}
          <div className="p-2 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, ID, or phone..."
                className="pl-8 h-9 rounded-lg border-muted text-sm"
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Patient list */}
          <div className="max-h-48 overflow-y-auto">
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleSelect(p)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-left hover:bg-accent/50 transition-colors ${
                    value === p.id ? "bg-accent" : ""
                  }`}
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.age}y · {p.gender} · {p.phone}</p>
                  </div>
                  {value === p.id && <Check className="w-4 h-4 text-secondary flex-shrink-0" />}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">No patients found for "{search}"</p>
              </div>
            )}
          </div>

          {/* Create new patient */}
          <div className="border-t border-border p-2">
            <AddPatientForm
              trigger={
                <Button variant="ghost" size="sm" className="w-full justify-start text-secondary hover:text-secondary rounded-lg">
                  <UserPlus className="w-4 h-4 mr-2" /> Create New Patient
                </Button>
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientSelector;
