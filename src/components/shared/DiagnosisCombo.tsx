import { useDiagnoses, useCreateDiagnosis } from "@/hooks/useLookupData";
import ComboCreate from "./ComboCreate";
import { toast } from "sonner";

interface DiagnosisComboProps {
  value: string;
  onChange: (name: string) => void;
  placeholder?: string;
  className?: string;
}

const DiagnosisCombo = ({ value, onChange, placeholder, className }: DiagnosisComboProps) => {
  const { data: diagnoses = [] } = useDiagnoses();
  const createDiagnosis = useCreateDiagnosis();

  const options = diagnoses.map((d: any) => ({ label: d.name, value: d.id }));

  const handleCreate = async (name: string) => {
    try {
      await createDiagnosis.mutateAsync({ name });
      toast.success(`Diagnosis "${name}" saved`);
    } catch {
      toast.error("Failed to save diagnosis");
    }
  };

  return (
    <ComboCreate
      value={value}
      onChange={onChange}
      options={options}
      onCreateNew={handleCreate}
      isCreating={createDiagnosis.isPending}
      placeholder={placeholder || "Search or add diagnosis..."}
      className={className}
    />
  );
};

export default DiagnosisCombo;
