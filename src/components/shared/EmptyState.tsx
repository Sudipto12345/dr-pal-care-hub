import { Button } from "@/components/ui/button";
import { LucideIcon, Inbox } from "lucide-react";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

const EmptyState = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in">
    <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
      <Icon className="w-7 h-7 text-muted-foreground" />
    </div>
    <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
    {description && <p className="text-sm text-muted-foreground max-w-xs">{description}</p>}
    {actionLabel && (
      <div className="mt-4">
        {actionHref ? (
          <Button asChild size="sm" className="rounded-xl">
            <Link to={actionHref}>{actionLabel}</Link>
          </Button>
        ) : (
          <Button size="sm" className="rounded-xl" onClick={onAction}>{actionLabel}</Button>
        )}
      </div>
    )}
  </div>
);

export default EmptyState;
