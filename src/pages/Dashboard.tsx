import { Container, CheckCircle2, Clock, TrendingUp, AlertTriangle, ArrowUpRight, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { containers, notifications, getClient, activityData } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { Link } from "react-router-dom";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const KpiCard = ({ icon: Icon, label, value, change, accent }: any) => (
  <Card className="relative overflow-hidden p-5 bg-gradient-card border-border/50 hover:border-primary/30 transition-all group">
    <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-glow opacity-50 group-hover:opacity-100 transition-opacity" />
    <div className="relative flex items-start justify-between">
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
        <p className="text-3xl font-bold mt-2 tracking-tight">{value}</p>
        <div className="flex items-center gap-1 mt-2 text-xs">
          <TrendingUp className="h-3 w-3 text-success" />
          <span className="text-success font-medium">{change}</span>
          <span className="text-muted-foreground">vs semaine passée</span>
        </div>
      </div>
      <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${accent}`}>
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </Card>
);

export default function Dashboard() {
  const inTransit = containers.filter(c => c.status === "en_transit").length;
  const delivered = containers.filter(c => c.status === "livre").length;
  const pending = containers.filter(c => c.status === "en_attente").length;
  const urgent = notifications.filter(n => n.type === "urgent");

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bonjour, Admin 👋</h1>
          <p className="text-muted-foreground mt-1">Vue d'ensemble des opérations logistiques OTC.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Activity className="h-4 w-4 text-success animate-pulse" />
          Mise à jour temps réel
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={Container} label="Total conteneurs" value={containers.length} change="+12%" accent="bg-primary/15 text-primary" />
        <KpiCard icon={TrendingUp} label="En transit" value={inTransit} change="+8%" accent="bg-primary/15 text-primary" />
        <KpiCard icon={CheckCircle2} label="Livrés" value={delivered} change="+24%" accent="bg-success/15 text-success" />
        <KpiCard icon={Clock} label="En attente" value={pending} change="+3%" accent="bg-warning/15 text-warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-6 bg-gradient-card border-border/50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-semibold">Activité logistique</h3>
              <p className="text-xs text-muted-foreground mt-0.5">7 derniers jours</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" />Conteneurs</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" />Livraisons</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={activityData}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Area type="monotone" dataKey="containers" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#g1)" />
              <Area type="monotone" dataKey="deliveries" stroke="hsl(var(--success))" strokeWidth={2} fill="url(#g2)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 bg-gradient-card border-border/50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Alertes</h3>
            <Link to="/notifications" className="text-xs text-primary hover:underline">Tout voir</Link>
          </div>
          <div className="space-y-3">
            {urgent.concat(notifications.filter(n => n.type === "info").slice(0, 2)).slice(0, 4).map(n => (
              <div key={n.id} className="p-3 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex items-start gap-2">
                  <div className={`h-2 w-2 rounded-full mt-1.5 ${n.type === "urgent" ? "bg-destructive animate-pulse" : "bg-primary"}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{n.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{n.message}</p>
                    <p className="text-[10px] text-muted-foreground mt-1.5">{n.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-card border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold">Dernières opérations</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Mises à jour temps réel</p>
          </div>
          <Link to="/conteneurs" className="text-xs text-primary hover:underline flex items-center gap-1">
            Voir tous <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="overflow-x-auto -mx-6 px-6">
          <table className="w-full">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground border-b border-border/50">
                <th className="pb-3 font-medium">Conteneur</th>
                <th className="pb-3 font-medium">Client</th>
                <th className="pb-3 font-medium">Trajet</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium">MAJ</th>
              </tr>
            </thead>
            <tbody>
              {containers.slice(0, 6).map(c => (
                <tr key={c.id} className="border-b border-border/30 hover:bg-muted/30 transition-colors">
                  <td className="py-3">
                    <Link to={`/conteneurs/${c.id}`} className="font-mono text-sm font-medium hover:text-primary">{c.number}</Link>
                    <div className="text-[10px] text-muted-foreground">{c.type}</div>
                  </td>
                  <td className="py-3 text-sm">{getClient(c.clientId)?.company}</td>
                  <td className="py-3 text-sm text-muted-foreground">{c.origin} → {c.destination}</td>
                  <td className="py-3"><StatusBadge status={c.status} /></td>
                  <td className="py-3 text-xs text-muted-foreground">{c.lastUpdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
