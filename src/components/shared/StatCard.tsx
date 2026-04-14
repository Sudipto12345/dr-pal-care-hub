import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  className?: string;
}

const StatCard = ({ icon: Icon, label, value, trend, trendDirection = "up", className }: StatCardProps) => (
  <Card className={cn(
    "border-border/60 rounded-2xl hover:shadow-md transition-all duration-200 bg-card group",
    className
  )}>
    <CardContent className="p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-foreground tracking-tight">{value}</p>
          {trend && (
            <div className={cn(
              "flex items-center gap-1 text-xs font-medium",
              trendDirection === "up" ? "text-success" : trendDirection === "down" ? "text-destructive" : "text-muted-foreground"
            )}>
              {trendDirection === "up" ? <TrendingUp className="w-3 h-3" /> : trendDirection === "down" ? <TrendingDown className="w-3 h-3" /> : null}
              {trend}
            </div>
          )}
        </div>
        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
