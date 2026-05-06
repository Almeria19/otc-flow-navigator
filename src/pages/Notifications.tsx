import { useState } from "react";
import { Card } from "@/components/ui/card";
import { notifications } from "@/lib/mockData";
import { AlertCircle, Info, Settings as Cog, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const filters = [
  { id: "all", label: "Toutes" },
  { id: "urgent", label: "Urgent" },
  { id: "info", label: "Informations" },
  { id: "system", label: "Système" },
];

const icons: Record<string, any> = {
  urgent: { Icon: AlertCircle, cls: "bg-destructive/15 text-destructive" },
  info: { Icon: Info, cls: "bg-primary/15 text-primary" },
  system: { Icon: Cog, cls: "bg-muted text-muted-foreground" },
};

export default function Notifications() {
  const [filter, setFilter] = useState("all");
  const filtered = notifications.filter(n => filter === "all" || n.type === filter);

  return (
    <div className="space-y-6 max-w-[1100px] mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications & alertes</h1>
          <p className="text-muted-foreground mt-1">Centre de communication système.</p>
        </div>
        <Button variant="outline"><CheckCheck className="h-4 w-4 mr-1" />Tout marquer lu</Button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={cn("px-4 py-2 rounded-lg text-sm font-medium transition-all",
              filter === f.id ? "bg-primary text-primary-foreground shadow-glow" : "bg-muted/40 hover:bg-muted text-muted-foreground")}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(n => {
          const { Icon, cls } = icons[n.type];
          return (
            <Card key={n.id} className={cn("p-4 bg-gradient-card border-border/50 hover:border-primary/30 transition-all flex gap-4 items-start", !n.read && "border-l-2 border-l-primary")}>
              <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center shrink-0", cls)}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm">{n.title}</h3>
                  <span className="text-xs text-muted-foreground">{n.date}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{n.message}</p>
              </div>
              {!n.read && <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
