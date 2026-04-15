import { useMedicines, useCreateMedicine } from "@/hooks/useLookupData";
import ComboCreate from "./ComboCreate";
import { toast } from "sonner";

interface MedicineComboProps {
  value: string;
  onChange: (name: string, defaults?: { potency?: string; dose?: string; frequency?: string }) => void;
  placeholder?: string;
  className?: string;
}

const MedicineCombo = ({ value, onChange, placeholder, className }: MedicineComboProps) => {
  const { data: medicines = [] } = useMedicines();
  const createMedicine = useCreateMedicine();

  const options = medicines.map((m: any) => ({
    label: m.name,
    value: m.id,
    extra: { potency: m.default_potency || "", dose: m.default_dose || "", frequency: m.default_frequency || "" },
  }));

  const handleChange = (name: string) => {
    const found = medicines.find((m: any) => m.name.toLowerCase() === name.toLowerCase());
    if (found) {
      onChange(found.name, {
        potency: (found as any).default_potency || undefined,
        dose: (found as any).default_dose || undefined,
        frequency: (found as any).default_frequency || undefined,
      });
    } else {
      onChange(name);
    }
  };

  const handleCreate = async (name: string) => {
    try {
      await createMedicine.mutateAsync({ name });
      toast.success(`Medicine "${name}" saved to database`);
    } catch {
      toast.error("Failed to save medicine");
    }
  };

  return (
    <ComboCreate
      value={value}
      onChange={handleChange}
      options={options}
      onCreateNew={handleCreate}
      isCreating={createMedicine.isPending}
      placeholder={placeholder || "Search or add medicine..."}
      className={className}
    />
  );
};

export default MedicineCombo;
