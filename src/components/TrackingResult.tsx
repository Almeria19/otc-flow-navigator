import { Container, statusLabel, getClient } from "@/lib/mockData";
import { Card } from "@/components/ui/card";
import { Ship, Anchor, Package, Truck, Waves, CheckCircle2, MapPin, Clock, Box } from "lucide-react";

const steps = [
  { key: "loaded", label: "Chargement port départ", icon: Ship },
  { key: "sea", label: "En mer", icon: Waves },
  { key: "arrived", label: "Arrivée port destination", icon: Anchor },
  { key: "customs", label: "Douane", icon: Package },
  { key: "delivered", label: "Livraison finale", icon: Truck },
];

function progressFor(c: Container): number {
  if (c.status === "livre") return 5;
  if (c.status === "en_attente") return 1;
  if (c.status === "incident") return 4;
  // en_transit: rough heuristic by location text
  const l = c.location.toLowerCase();
  if (l.includes("entrepôt") || l.includes("client")) return 5;
  if (l.includes("douane")) return 4;
  if (l.includes("dakar") || l.includes("destination")) return 3;
  if (l.includes("port de") && !l.includes("dakar")) return 1;
  return 2;
}

export default function TrackingResult({ container }: { container: Container }) {
  const reached = progressFor(container);
  const client = getClient(container.clientId);
  const pct = Math.min(100, Math.max(5, ((reached - 0.5) / steps.length) * 100));

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header info */}
      <Card className="p-5 md:p-6 bg-gradient-card border-border/50">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Conteneur</p>
            <h3 className="font-mono text-xl md:text-2xl font-bold tracking-tight">{container.number}</h3>
            <div className="mt-2 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-xs font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              {statusLabel[container.status]}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Origine</p>
              <p className="font-medium mt-0.5">{container.origin}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Destination</p>
              <p className="font-medium mt-0.5">{container.destination}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">ETA</p>
              <p className="font-medium mt-0.5 text-primary">{new Date(container.arrivalDate).toLocaleDateString("fr-FR")}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Type</p>
              <p className="font-medium mt-0.5">{container.type}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Map */}
      <Card className="overflow-hidden bg-[#0a1020] border-border/50">
        <div className="relative h-[320px] md:h-[400px]">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="trkgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary) / 0.12)" strokeWidth="0.5" />
              </pattern>
              <radialGradient id="trkglow">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="800" height="400" fill="url(#trkgrid)" />
            {/* Stylized continents */}
            <path d="M 50 120 Q 120 80 220 110 T 360 130 L 380 220 Q 300 260 200 240 T 60 220 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary) / 0.25)" strokeWidth="0.6" />
            <path d="M 480 80 Q 600 60 720 100 T 780 200 L 760 300 Q 660 340 540 320 T 460 240 Z" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary) / 0.25)" strokeWidth="0.6" />

            {/* Route */}
            <path d="M 100 180 Q 280 60 440 200 T 720 160" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="6 5" fill="none" opacity="0.7">
              <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1.4s" repeatCount="indefinite" />
            </path>

            {/* Origin */}
            <g transform="translate(100,180)">
              <circle r="20" fill="url(#trkglow)" />
              <circle r="6" fill="hsl(var(--success))" />
              <text x="14" y="-8" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600">{container.origin}</text>
            </g>
            {/* Destination */}
            <g transform="translate(720,160)">
              <circle r="20" fill="url(#trkglow)" />
              <circle r="6" fill="hsl(var(--warning))" />
              <text x="-14" y="-12" textAnchor="end" fill="hsl(var(--foreground))" fontSize="11" fontWeight="600">{container.destination}</text>
            </g>
            {/* Current pos */}
            <g transform={`translate(${100 + ((720 - 100) * (reached / 5))},${reached < 3 ? 130 : 180})`}>
              <circle r="22" fill="hsl(var(--primary))" opacity="0.25">
                <animate attributeName="r" from="14" to="34" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle r="9" fill="hsl(var(--primary))" />
              <Ship className="h-3 w-3" />
            </g>
          </svg>
          <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="font-medium">{container.location}</span>
            </div>
          </div>
          <div className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg px-3 py-2 flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs">Mis à jour {container.lastUpdate}</span>
          </div>
        </div>
      </Card>

      {/* Progress bar */}
      <Card className="p-5 md:p-6 bg-gradient-card border-border/50">
        <div className="flex items-center justify-between mb-5">
          <h4 className="font-semibold">Progression logistique</h4>
          <span className="text-xs text-muted-foreground">{Math.round(pct)}%</span>
        </div>
        <div className="relative">
          <div className="absolute top-5 left-0 right-0 h-1 bg-muted rounded-full" />
          <div className="absolute top-5 left-0 h-1 bg-gradient-primary rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
          <div className="relative grid grid-cols-5 gap-2">
            {steps.map((s, i) => {
              const Active = i < reached;
              const Current = i === reached - 1;
              const Icon = s.icon;
              return (
                <div key={s.key} className="flex flex-col items-center text-center">
                  <div className={`h-11 w-11 rounded-full flex items-center justify-center border-2 transition-all ${
                    Active
                      ? "bg-primary border-primary text-primary-foreground shadow-glow"
                      : "bg-card border-border text-muted-foreground"
                  } ${Current ? "ring-4 ring-primary/30 scale-110" : ""}`}>
                    {Active && !Current ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-4 w-4" />}
                  </div>
                  <p className={`mt-2 text-[10px] md:text-xs font-medium leading-tight ${Active ? "text-foreground" : "text-muted-foreground"}`}>
                    {s.label}
                  </p>
                  <p className="text-[9px] text-muted-foreground mt-0.5">
                    {Active ? (Current ? "En cours" : "Terminé") : "—"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-card border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Box className="h-3.5 w-3.5" /> Marchandise</div>
          <p className="font-semibold mt-1">{container.type} · {container.transport}</p>
          {container.shipping && <p className="text-xs text-muted-foreground mt-1">{container.shipping}</p>}
        </Card>
        <Card className="p-4 bg-gradient-card border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><Clock className="h-3.5 w-3.5" /> Départ</div>
          <p className="font-semibold mt-1">{new Date(container.departureDate).toLocaleDateString("fr-FR")}</p>
          <p className="text-xs text-muted-foreground mt-1">{container.origin}</p>
        </Card>
        <Card className="p-4 bg-gradient-card border-border/50">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> Client</div>
          <p className="font-semibold mt-1">{client?.company ?? "—"}</p>
          <p className="text-xs text-muted-foreground mt-1">Réf. {container.clientId}</p>
        </Card>
      </div>
    </div>
  );
}
