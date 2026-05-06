import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { clients, containers } from "@/lib/mockData";
import { Mail, Phone, Building2, Container as ContainerIcon, Plus } from "lucide-react";

export default function Clients() {
  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
          <p className="text-muted-foreground mt-1">{clients.length} clients enregistrés.</p>
        </div>
        <Button className="bg-gradient-primary shadow-glow hover:opacity-90"><Plus className="h-4 w-4 mr-1" />Nouveau client</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map(c => {
          const active = containers.filter(k => k.clientId === c.id).length;
          return (
            <Card key={c.id} className="p-5 bg-gradient-card border-border/50 hover:border-primary/30 hover:shadow-card transition-all group">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground shadow-glow">
                  {c.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{c.name}</h3>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><Building2 className="h-3 w-3" />{c.company}</p>
                </div>
              </div>
              <div className="space-y-2 mt-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-3.5 w-3.5" /><span className="truncate">{c.email}</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-3.5 w-3.5" />{c.phone}</div>
              </div>
              <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs">
                  <ContainerIcon className="h-3.5 w-3.5 text-primary" />
                  <span className="font-semibold">{active}</span>
                  <span className="text-muted-foreground">conteneurs actifs</span>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">Voir détail →</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
