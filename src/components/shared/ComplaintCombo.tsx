import { useChiefComplaints, useCreateChiefComplaint } from "@/hooks/useLookupData";
import ComboCreate from "./ComboCreate";
import MultiComboCreate from "./MultiComboCreate";
import { toast } from "sonner";

interface ComplaintComboSingleProps {
  value: string;
  onChange: (name: string) => void;
  multi?: false;
  placeholder?: string;
  className?: string;
}

interface ComplaintComboMultiProps {
  value: string[];
  onChange: (names: string[]) => void;
  multi: true;
  placeholder?: string;
  className?: string;
}

type ComplaintComboProps = ComplaintComboSingleProps | ComplaintComboMultiProps;

const ComplaintCombo = (props: ComplaintComboProps) => {
  const { data: complaints = [] } = useChiefComplaints();
  const createComplaint = useCreateChiefComplaint();

  const options = complaints.map((c: any) => ({ label: c.name, value: c.id }));

  const handleCreate = async (name: string) => {
    try {
      await createComplaint.mutateAsync({ name });
      toast.success(`Complaint "${name}" saved`);
    } catch {
      toast.error("Failed to save complaint");
    }
  };

  if (props.multi) {
    return (
      <MultiComboCreate
        values={props.value}
        onChange={props.onChange}
        options={options}
        onCreateNew={handleCreate}
        isCreating={createComplaint.isPending}
        placeholder={props.placeholder || "Search or add complaint..."}
        className={props.className}
      />
    );
  }

  return (
    <ComboCreate
      value={props.value}
      onChange={props.onChange}
      options={options}
      onCreateNew={handleCreate}
      isCreating={createComplaint.isPending}
      placeholder={props.placeholder || "Search or add complaint..."}
      className={props.className}
    />
  );
};

export default ComplaintCombo;
