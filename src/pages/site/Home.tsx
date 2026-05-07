import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ship, Truck, Package, Globe2, BarChart3, Shield, ArrowRight, Radio, Activity, MapPinned } from "lucide-react";
import TrackingSearch from "@/components/TrackingSearch";

const stats = [
  { v: "2.4k+", l: "Conteneurs suivis" },
  { v: "98%", l: "Précision GPS" },
  { v: "15+", l: "Pays couverts" },
  { v: "24/7", l: "Suivi temps réel" },
];

const services = [
  { icon: Ship, title: "Transport maritime", desc: "FCL et LCL depuis tous les ports majeurs vers l'Afrique de l'Ouest." },
  { icon: Truck, title: "Transit & douane", desc: "Dédouanement rapide, conformité et acheminement final." },
  { icon: Package, title: "Logistique conteneurs", desc: "Entreposage, suivi, livraison et retour." },
  { icon: Globe2, title: "Import / Export", desc: "Documentation et formalités internationales." },
  { icon: BarChart3, title: "Tracking digital", desc: "Plateforme temps réel à chaque étape." },
  { icon: Shield, title: "Sécurité du fret", desc: "Surveillance complète sur toute la chaîne." },
];

export default function Home() {
  return (
    <div>
      {/* Hero — tracking-first */}
      <section className="relative">
        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6">
            <Radio className="h-3 w-3 animate-pulse" />
            Portail de suivi logistique en temps réel
          </div>
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Suivez vos conteneurs <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">en temps réel</span>.
          </h1>
          <p className="text-base md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
            Position GPS, étape logistique, ETA et statut douanier — toutes vos informations conteneurs en un seul endroit.
          </p>

          <div className="mt-10 max-w-3xl mx-auto text-left">
            <TrackingSearch />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {stats.map(s => (
              <div key={s.l}>
                <div className="text-2xl md:text-3xl font-bold text-primary">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Comment ça marche</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">3 étapes pour tout savoir</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: MapPinned, title: "1. Saisissez votre numéro", desc: "Format standard ISO (4 lettres + 7 chiffres)." },
            { icon: Activity, title: "2. Localisation instantanée", desc: "Carte temps réel et progression logistique." },
            { icon: Radio, title: "3. Suivi continu", desc: "Mises à jour live de l'origine à la destination." },
          ].map(s => (
            <Card key={s.title} className="p-6 bg-gradient-card border-border/50">
              <div className="h-11 w-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Services (informational, secondary) */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Nos expertises</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Au-delà du tracking</h2>
          </div>
          <Button asChild variant="ghost"><Link to="/services">Tous les services <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s => (
            <Card key={s.title} className="p-6 bg-gradient-card border-border/50 hover:border-primary/30 transition-all group">
              <div className="h-11 w-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
