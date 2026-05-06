import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { deliveryRequests, getClient, getContainer } from "@/lib/mockData";
import { MapPin, Calendar, Check, X, CalendarClock } from "lucide-react";
import { cn } from "@/lib/utils";

const statusMap: Record<string, { label: string; cls: string }> = {
  en_attente: { label: "En attente", cls: "bg-warning/15 text-warning border-warning/30" },
  validee: { label: "Validée", cls: "bg-primary/15 text-primary border-primary/30" },
  livree: { label: "Livrée", cls: "bg-success/15 text-success border-success/30" },
  refusee: { label: "Refusée", cls: "bg-destructive/15 text-destructive border-destructive/30" },
};

export default function Deliveries() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Demandes de livraison</h1>
        <p className="text-muted-foreground mt-1">{deliveryRequests.length} demandes actives.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliveryRequests.map(d => {
          const client = getClient(d.clientId);
          const container = getContainer(d.containerId);
          const s = statusMap[d.status];
          return (
            <Card key={d.id} className="p-5 bg-gradient-card border-border/50 hover:border-primary/30 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Demande #{d.id.padStart(4, "0")}</p>
                  <h3 className="font-semibold mt-1">{client?.company}</h3>
                  <p className="text-xs text-muted-foreground">{client?.name}</p>
                </div>
                <span className={cn("inline-flex px-2.5 py-1 rounded-full text-xs font-medium border", s.cls)}>{s.label}</span>
              </div>

              <div className="space-y-2 mt-4 text-sm">
                <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>{d.destination}</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" />Demandée le {d.requestedDate}</div>
                <div className="text-xs text-muted-foreground font-mono">Conteneur: {container?.number}</div>
              </div>

              {d.status === "en_attente" && (
                <div className="flex gap-2 mt-4 pt-4 border-t border-border/50">
                  <Button size="sm" className="flex-1 bg-gradient-primary"><Check className="h-3.5 w-3.5 mr-1" />Valider</Button>
                  <Button size="sm" variant="outline" className="flex-1"><CalendarClock className="h-3.5 w-3.5 mr-1" />Planifier</Button>
                  <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive"><X className="h-3.5 w-3.5" /></Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
