import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  Active: "bg-accent text-accent-foreground",
  Confirmed: "bg-accent text-accent-foreground",
  Published: "bg-accent text-accent-foreground",
  Delivered: "bg-accent text-accent-foreground",
  "In Stock": "bg-accent text-accent-foreground",
  Improving: "bg-accent text-accent-foreground",
  Resolved: "bg-accent text-accent-foreground",
  Completed: "bg-muted text-muted-foreground",
  Pending: "bg-secondary/20 text-secondary",
  Processing: "bg-secondary/20 text-secondary",
  Shipped: "bg-secondary/20 text-secondary",
  Ongoing: "bg-secondary/20 text-secondary",
  Draft: "bg-muted text-muted-foreground",
  Inactive: "bg-muted text-muted-foreground",
  Cancelled: "bg-destructive/10 text-destructive",
  "Out of Stock": "bg-destructive/10 text-destructive",
  "Low Stock": "bg-secondary/20 text-secondary",
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => (
  <Badge variant="secondary" className={cn("text-xs font-medium rounded-full", statusStyles[status] || "bg-muted text-muted-foreground", className)}>
    {status}
  </Badge>
);

export default StatusBadge;
