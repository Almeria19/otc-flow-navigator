import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getContainer, getClient, formatXOF } from "@/lib/mockData";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, MapPin, Ship, Calendar, FileText, Edit, RefreshCw, Receipt, User } from "lucide-react";

const timeline = [
  { date: "12 avril 2026, 08:30", title: "Départ port d'origine", desc: "Embarquement validé", done: true },
  { date: "18 avril 2026, 14:12", title: "Passage Canal de Suez", desc: "Transit conforme", done: true },
  { date: "28 avril 2026, 09:45", title: "Détroit de Gibraltar", desc: "Position confirmée", done: true },
  { date: "06 mai 2026, 02:20", title: "Atlantique Nord", desc: "En cours — vitesse 21 nœuds", done: true, current: true },
  { date: "18 mai 2026 (estimé)", title: "Arrivée Port de Dakar", desc: "ETA confirmée", done: false },
  { date: "20 mai 2026 (estimé)", title: "Livraison client", desc: "À planifier", done: false },
];

export default function ContainerDetail() {
  const { id } = useParams();
  const c = getContainer(id || "1") || getContainer("1")!;
  const client = getClient(c.clientId)!;

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <Link to="/admin/conteneurs" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4" /> Retour aux conteneurs
      </Link>

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl font-bold tracking-tight font-mono">{c.number}</h1>
            <StatusBadge status={c.status} />
          </div>
          <p className="text-muted-foreground mt-1">{c.type} • {c.transport} • {c.shipping}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline"><Edit className="h-4 w-4 mr-1" />Modifier statut</Button>
          <Button variant="outline"><RefreshCw className="h-4 w-4 mr-1" />MAJ position</Button>
          <Button className="bg-gradient-primary shadow-glow hover:opacity-90"><Receipt className="h-4 w-4 mr-1" />Générer facture</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 p-0 overflow-hidden bg-gradient-card border-border/50">
          <div className="p-5 border-b border-border/50">
            <h3 className="font-semibold flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Localisation actuelle</h3>
            <p className="text-sm text-muted-foreground mt-1">{c.location}</p>
          </div>
          <div className="relative h-[340px] bg-[#0a1020] overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: `radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.3), transparent 40%), radial-gradient(circle at 70% 60%, hsl(var(--primary) / 0.2), transparent 50%)`,
            }} />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 340" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary) / 0.1)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="800" height="340" fill="url(#grid)" />
              <path d="M 100 200 Q 300 100 500 180 T 700 120" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.6" />
              <circle cx="100" cy="200" r="6" fill="hsl(var(--success))" />
              <circle cx="700" cy="120" r="6" fill="hsl(var(--warning))" />
              <g>
                <circle cx="450" cy="170" r="14" fill="hsl(var(--primary))" opacity="0.3">
                  <animate attributeName="r" from="14" to="28" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="450" cy="170" r="8" fill="hsl(var(--primary))" stroke="hsl(var(--background))" strokeWidth="2" />
              </g>
              <text x="100" y="225" fill="hsl(var(--muted-foreground))" fontSize="11" fontFamily="monospace">{c.origin}</text>
              <text x="660" y="145" fill="hsl(var(--muted-foreground))" fontSize="11" fontFamily="monospace">{c.destination}</text>
            </svg>
            <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg px-3 py-2 text-xs">
              <div className="font-mono text-primary font-semibold">14°N 28°W</div>
              <div className="text-muted-foreground">Vitesse: 21 nœuds</div>
            </div>
          </div>
        </Card>

        <Card className="p-5 bg-gradient-card border-border/50 space-y-4">
          <h3 className="font-semibold flex items-center gap-2"><User className="h-4 w-4 text-primary" /> Client associé</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                {client.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="font-medium text-sm">{client.name}</div>
                <div className="text-xs text-muted-foreground">{client.company}</div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Email</span><span>{client.email}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Téléphone</span><span>{client.phone}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Conteneurs actifs</span><span className="font-semibold">{client.containers}</span></div>
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/admin/clients">Voir fiche complète</Link>
            </Button>
          </div>

          <div className="border-t border-border/50 pt-4 space-y-2 text-sm">
            <h4 className="font-semibold flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> Facturation</h4>
            <div className="flex justify-between"><span className="text-muted-foreground">Montant</span><span className="font-semibold">{formatXOF(c.amount)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Devise</span><span>{c.currency}</span></div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-5 bg-gradient-card border-border/50">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Ship className="h-4 w-4 text-primary" /> Logistique</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Port départ</dt><dd className="font-medium">{c.origin}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Port arrivée</dt><dd className="font-medium">{c.destination}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Mode</dt><dd className="font-medium">{c.transport}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Compagnie</dt><dd className="font-medium">{c.shipping || "—"}</dd></div>
          </dl>
        </Card>
        <Card className="p-5 bg-gradient-card border-border/50">
          <h3 className="font-semibold mb-4 flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> Calendrier</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Départ</dt><dd className="font-medium">{c.departureDate}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Arrivée estimée</dt><dd className="font-medium">{c.arrivalDate}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Dernière MAJ</dt><dd className="font-medium">{c.lastUpdate}</dd></div>
          </dl>
        </Card>
        <Card className="p-5 bg-gradient-card border-border/50">
          <h3 className="font-semibold mb-4">Caractéristiques</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Type</dt><dd className="font-medium">{c.type}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Statut</dt><dd><StatusBadge status={c.status} /></dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">N° interne</dt><dd className="font-mono text-xs">{c.number}</dd></div>
          </dl>
        </Card>
      </div>

      <Card className="p-6 bg-gradient-card border-border/50">
        <h3 className="font-semibold mb-6">Timeline des événements</h3>
        <div className="relative space-y-6">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-border" />
          {timeline.map((e, i) => (
            <div key={i} className="relative flex gap-4">
              <div className={`relative z-10 h-6 w-6 rounded-full flex items-center justify-center shrink-0 ${e.current ? "bg-primary shadow-glow ring-4 ring-primary/20" : e.done ? "bg-success" : "bg-muted border border-border"}`}>
                {e.current && <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-40" />}
                <span className={`h-2 w-2 rounded-full ${e.done || e.current ? "bg-background" : "bg-muted-foreground"}`} />
              </div>
              <div className="flex-1 pb-2">
                <div className="flex items-baseline justify-between gap-2 flex-wrap">
                  <p className={`font-medium text-sm ${e.current ? "text-primary" : ""}`}>{e.title}</p>
                  <p className="text-xs text-muted-foreground font-mono">{e.date}</p>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
