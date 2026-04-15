import { useChiefComplaints, useCreateChiefComplaint } from "@/hooks/useLookupData";
import ComboCreate from "./ComboCreate";
import { toast } from "sonner";

interface ComplaintComboProps {
  value: string;
  onChange: (name: string) => void;
  placeholder?: string;
  className?: string;
}

const ComplaintCombo = ({ value, onChange, placeholder, className }: ComplaintComboProps) => {
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

  return (
    <ComboCreate
      value={value}
      onChange={onChange}
      options={options}
      onCreateNew={handleCreate}
      isCreating={createComplaint.isPending}
      placeholder={placeholder || "Search or add complaint..."}
      className={className}
    />
  );
};

export default ComplaintCombo;
