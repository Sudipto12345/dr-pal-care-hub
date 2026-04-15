import { useDiagnoses, useCreateDiagnosis } from "@/hooks/useLookupData";
import ComboCreate from "./ComboCreate";
import MultiComboCreate from "./MultiComboCreate";
import { toast } from "sonner";

interface DiagnosisComboSingleProps {
  value: string;
  onChange: (name: string) => void;
  multi?: false;
  placeholder?: string;
  className?: string;
}

interface DiagnosisComboMultiProps {
  value: string[];
  onChange: (names: string[]) => void;
  multi: true;
  placeholder?: string;
  className?: string;
}

type DiagnosisComboProps = DiagnosisComboSingleProps | DiagnosisComboMultiProps;

const DiagnosisCombo = (props: DiagnosisComboProps) => {
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

  if (props.multi) {
    return (
      <MultiComboCreate
        values={props.value}
        onChange={props.onChange}
        options={options}
        onCreateNew={handleCreate}
        isCreating={createDiagnosis.isPending}
        placeholder={props.placeholder || "Search or add diagnosis..."}
        className={props.className}
      />
    );
  }

  return (
    <ComboCreate
      value={props.value as string}
      onChange={props.onChange as (v: string) => void}
      options={options}
      onCreateNew={handleCreate}
      isCreating={createDiagnosis.isPending}
      placeholder={props.placeholder || "Search or add diagnosis..."}
      className={props.className}
    />
  );
};

export default DiagnosisCombo;
