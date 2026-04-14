import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: string;
}

const StatCard = ({ icon: Icon, label, value, trend }: StatCardProps) => (
  <Card className="border-border rounded-2xl hover:shadow-card transition-all duration-300">
    <CardContent className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="font-heading text-2xl font-bold text-foreground">{value}</p>
          {trend && <p className="text-xs text-secondary mt-1">{trend}</p>}
        </div>
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default StatCard;
