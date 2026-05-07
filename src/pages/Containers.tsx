import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { containers, getClient, ContainerStatus, statusLabel } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Plus, Filter, MapPin } from "lucide-react";

const statusFilters: (ContainerStatus | "all")[] = ["all", "en_transit", "livre", "en_attente", "incident"];

export default function Containers() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<ContainerStatus | "all">("all");

  const filtered = containers.filter(c => {
    const okQ = !q || c.number.toLowerCase().includes(q.toLowerCase()) || getClient(c.clientId)?.company.toLowerCase().includes(q.toLowerCase());
    const okF = filter === "all" || c.status === filter;
    return okQ && okF;
  });

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conteneurs</h1>
          <p className="text-muted-foreground mt-1">Suivi en temps réel de la flotte logistique.</p>
        </div>
        <Button asChild className="bg-gradient-primary shadow-glow hover:opacity-90">
          <Link to="/admin/conteneurs/nouveau"><Plus className="h-4 w-4 mr-1" />Nouveau conteneur</Link>
        </Button>
      </div>

      <Card className="p-4 bg-gradient-card border-border/50">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Numéro de conteneur ou client..." className="pl-9 bg-background/50" />
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <Filter className="h-4 w-4 text-muted-foreground mr-1" />
            {statusFilters.map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === s ? "bg-primary text-primary-foreground shadow-glow" : "bg-muted/40 hover:bg-muted text-muted-foreground"}`}
              >
                {s === "all" ? "Tous" : statusLabel[s]}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden bg-gradient-card border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20 border-b border-border/50">
              <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Numéro</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Localisation</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium">Dernière MAJ</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors group">
                  <td className="px-4 py-4">
                    <Link to={`/admin/conteneurs/${c.id}`} className="font-mono text-sm font-semibold group-hover:text-primary transition-colors">{c.number}</Link>
                    <div className="text-[10px] text-muted-foreground mt-0.5">{c.origin} → {c.destination}</div>
                  </td>
                  <td className="px-4 py-4 text-sm">
                    <div className="font-medium">{getClient(c.clientId)?.company}</div>
                    <div className="text-xs text-muted-foreground">{getClient(c.clientId)?.name}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs px-2 py-1 rounded-md bg-muted/60 font-medium">{c.type}</span>
                  </td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 shrink-0 text-primary" />
                      <span className="truncate max-w-[200px]">{c.location}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-4 text-xs text-muted-foreground">{c.lastUpdate}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-muted-foreground text-sm">Aucun conteneur trouvé</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
