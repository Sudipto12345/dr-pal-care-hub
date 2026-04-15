import { useLocation, Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface BottomNavItem {
  label: string;
  url: string;
  icon: LucideIcon;
}

interface MobileBottomNavProps {
  items: BottomNavItem[];
}

const MobileBottomNav = ({ items }: MobileBottomNavProps) => {
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-primary border-t border-white/20 safe-area-bottom">
      <div className="flex items-stretch justify-around h-14">
        {items.map((item) => {
          const active = location.pathname === item.url;
          return (
            <Link
              key={item.url}
              to={item.url}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 flex-1 transition-colors relative min-w-0",
                active ? "text-white" : "text-white/60"
              )}
            >
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-white" />
              )}
              <item.icon className={cn("w-4.5 h-4.5 transition-transform", active && "scale-110")} strokeWidth={active ? 2.5 : 1.8} />
              <span className="text-[9px] font-medium leading-none truncate max-w-[56px]">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
