
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Bell, User, Users, Circle } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}

export const Sidebar = ({ activeTab, onTabChange, className }: SidebarProps) => {
  const menuItems = [
    { id: "feed", label: "News Feed", icon: Circle },
    { id: "profile", label: "Profile", icon: User },
    { id: "friends", label: "Friends", icon: Users },
    { id: "notifications", label: "Notifications", icon: Bell }
  ];

  return (
    <aside className={cn("w-64 p-4", className)}>
      <Card className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-left",
                  activeTab === item.id && "bg-blue-600 text-white hover:bg-blue-700"
                )}
                onClick={() => onTabChange(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </Card>
    </aside>
  );
};
