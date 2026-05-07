import { Card } from "@/components/ui/card";
import { Target, Eye, Heart, Building2, Compass, Globe2 } from "lucide-react";

const values = [
  { icon: Target, title: "Précision", desc: "Chaque opération suivie avec rigueur et exactitude." },
  { icon: Eye, title: "Transparence", desc: "Visibilité totale sur l'état de vos marchandises." },
  { icon: Heart, title: "Engagement", desc: "Une équipe dédiée à la réussite de vos projets." },
];

const expertise = [
  { icon: Globe2, title: "Import / Export", desc: "Gestion complète des flux internationaux depuis et vers l'Afrique de l'Ouest." },
  { icon: Compass, title: "Transit & Douane", desc: "Dédouanement maîtrisé et conformité réglementaire à chaque étape." },
  { icon: Building2, title: "Logistique conteneurs", desc: "Suivi GPS, entreposage, livraison finale jusqu'au client." },
];

export default function About() {
  return (
    <div>
      <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">À propos</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            L'expertise logistique <span className="bg-gradient-primary bg-clip-text text-transparent">au service de l'Afrique</span>.
          </h1>
          <p className="text-muted-foreground text-lg mt-5">
            Depuis Dakar, OTC orchestre les flux internationaux de centaines d'entreprises. Notre engagement&nbsp;: rendre la logistique plus simple, plus fiable, plus transparente.
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="max-w-7xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-8 bg-gradient-card border-border/50">
          <Target className="h-8 w-8 text-primary mb-4" />
          <h2 className="text-2xl font-bold tracking-tight">Notre mission</h2>
          <p className="text-muted-foreground mt-3">
            Faciliter le commerce international en offrant à chaque entreprise une chaîne logistique fluide, sécurisée et entièrement traçable.
          </p>
        </Card>
        <Card className="p-8 bg-gradient-card border-border/50">
          <Eye className="h-8 w-8 text-primary mb-4" />
          <h2 className="text-2xl font-bold tracking-tight">Notre vision</h2>
          <p className="text-muted-foreground mt-3">
            Devenir la plateforme de référence du transit et de l'import/export en Afrique de l'Ouest grâce à la technologie et l'excellence opérationnelle.
          </p>
        </Card>
      </section>

      {/* Valeurs */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Nos valeurs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {values.map(v => (
            <Card key={v.title} className="p-6 bg-gradient-card border-border/50">
              <div className="h-12 w-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">{v.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{v.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Expertise */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold tracking-tight mb-6">Notre expertise logistique</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {expertise.map(e => (
            <Card key={e.title} className="p-6 bg-gradient-card border-border/50">
              <div className="h-12 w-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
                <e.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">{e.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{e.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <Card className="p-10 md:p-14 bg-gradient-card border-border/50">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8">OTC en chiffres</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: "10+", l: "Années d'expérience" },
              { v: "500+", l: "Clients actifs" },
              { v: "2.4k+", l: "Conteneurs/an" },
              { v: "15+", l: "Pays partenaires" },
            ].map(s => (
              <div key={s.l} className="bg-background/50 rounded-xl p-5 border border-border/50">
                <div className="text-3xl font-bold text-primary">{s.v}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
