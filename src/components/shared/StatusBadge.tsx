import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  // Success / positive
  Active: "bg-success/10 text-success border-success/20",
  Confirmed: "bg-success/10 text-success border-success/20",
  Published: "bg-success/10 text-success border-success/20",
  Delivered: "bg-success/10 text-success border-success/20",
  "In Stock": "bg-success/10 text-success border-success/20",
  Improving: "bg-success/10 text-success border-success/20",
  Resolved: "bg-success/10 text-success border-success/20",
  Completed: "bg-success/10 text-success border-success/20",

  // Warning / in-progress
  Pending: "bg-warning/10 text-warning border-warning/20",
  Processing: "bg-warning/10 text-warning border-warning/20",
  Shipped: "bg-info/10 text-info border-info/20",
  Ongoing: "bg-info/10 text-info border-info/20",
  "Low Stock": "bg-warning/10 text-warning border-warning/20",

  // Neutral
  Draft: "bg-muted text-muted-foreground border-border",
  Inactive: "bg-muted text-muted-foreground border-border",

  // Destructive
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
  "Out of Stock": "bg-destructive/10 text-destructive border-destructive/20",
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => (
  <Badge
    variant="outline"
    className={cn(
      "text-[11px] font-semibold rounded-full px-2.5 py-0.5 border",
      statusStyles[status] || "bg-muted text-muted-foreground border-border",
      className
    )}
  >
    <span className={cn(
      "w-1.5 h-1.5 rounded-full mr-1.5 inline-block",
      status in statusStyles && statusStyles[status]?.includes("success") ? "bg-success" :
      statusStyles[status]?.includes("warning") ? "bg-warning" :
      statusStyles[status]?.includes("info") ? "bg-info" :
      statusStyles[status]?.includes("destructive") ? "bg-destructive" :
      "bg-muted-foreground"
    )} />
    {status}
  </Badge>
);

export default StatusBadge;
