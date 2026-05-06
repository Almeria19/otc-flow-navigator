import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ship, Truck, Package, Globe2, BarChart3, Shield, FileCheck, Warehouse, Plane, ArrowRight, CheckCircle2 } from "lucide-react";

const services = [
  { icon: Ship, title: "Transport maritime", desc: "FCL/LCL depuis l'Asie, l'Europe et les Amériques.", features: ["Conteneurs 20ft, 40ft, Reefer", "Compagnies majeures", "Routes optimisées"] },
  { icon: Plane, title: "Transport aérien", desc: "Solutions express pour fret urgent ou sensible.", features: ["Express 24/72h", "Suivi vol", "Marchandises sensibles"] },
  { icon: Truck, title: "Transport terrestre", desc: "Acheminement régional Sénégal, Mali, Mauritanie.", features: ["Flotte dédiée", "Couverture sous-régionale", "Camions sécurisés"] },
  { icon: FileCheck, title: "Dédouanement", desc: "Formalités douanières à l'import comme à l'export.", features: ["Déclarations", "Conformité réglementaire", "Représentation"] },
  { icon: Warehouse, title: "Entreposage", desc: "Stockage sécurisé court et long terme à Dakar.", features: ["Entrepôts surveillés", "Gestion de stock", "Cross-docking"] },
  { icon: Package, title: "Empotage / Dépotage", desc: "Manutention professionnelle de vos conteneurs.", features: ["Opérations port", "Inventaire", "Photos & rapports"] },
  { icon: Globe2, title: "Conseil import/export", desc: "Accompagnement commercial international.", features: ["Sourcing", "Négociation", "Documentation"] },
  { icon: BarChart3, title: "Plateforme digitale", desc: "Suivi temps réel via interface dédiée.", features: ["Dashboard live", "API", "Notifications"] },
  { icon: Shield, title: "Assurance & sécurité", desc: "Protection complète de vos marchandises.", features: ["Couverture totale", "Indemnisation rapide", "Audits"] },
];

export default function Services() {
  return (
    <div>
      <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-glow opacity-50" />
        <div className="relative max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Nos services</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Tout pour votre <span className="bg-gradient-primary bg-clip-text text-transparent">chaîne logistique</span>.</h1>
          <p className="text-muted-foreground text-lg mt-5">
            De l'origine à la livraison finale, OTC opère chaque étape de votre logistique internationale avec rigueur et transparence.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s => (
            <Card key={s.title} className="p-6 bg-gradient-card border-border/50 hover:border-primary/30 transition-all group">
              <div className="h-12 w-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
              <ul className="mt-4 space-y-1.5">
                {s.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-success" /> {f}
                  </li>
                ))}
              </ul>
              <Button asChild variant="ghost" size="sm" className="mt-4 -ml-3"><Link to="/contact">En savoir plus →</Link></Button>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <Card className="p-10 md:p-14 text-center bg-gradient-card border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-50" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Suivez votre conteneur</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Accédez au tracking temps réel depuis la page d'accueil.</p>
            <Button asChild size="lg" className="mt-8 bg-gradient-primary shadow-glow hover:opacity-90">
              <Link to="/">Suivre un conteneur <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
