import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Target, Eye, Heart, Users, Award, Building2, ArrowRight } from "lucide-react";

const values = [
  { icon: Target, title: "Précision", desc: "Chaque opération suivie avec rigueur et exactitude." },
  { icon: Eye, title: "Transparence", desc: "Visibilité totale sur l'état de vos marchandises." },
  { icon: Heart, title: "Engagement", desc: "Une équipe dédiée à la réussite de vos projets." },
];

const team = [
  { name: "Mamadou Diallo", role: "Directeur Général", initials: "MD" },
  { name: "Aïcha Touré", role: "Responsable Opérations", initials: "AT" },
  { name: "Ibrahima Ndiaye", role: "Chef Service Transit", initials: "IN" },
  { name: "Fatou Mbaye", role: "Responsable Commercial", initials: "FM" },
];

export default function About() {
  return (
    <div>
      <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-glow opacity-50" />
        <div className="relative max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">À propos</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">L'expertise logistique <span className="bg-gradient-primary bg-clip-text text-transparent">au service de l'Afrique</span>.</h1>
          <p className="text-muted-foreground text-lg mt-5">
            Depuis Dakar, OTC orchestre les flux internationaux de centaines d'entreprises. Notre mission : rendre la logistique plus simple, plus fiable, plus transparente.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-4">
        {values.map(v => (
          <Card key={v.title} className="p-6 bg-gradient-card border-border/50 hover:border-primary/30 transition-all">
            <div className="h-12 w-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4">
              <v.icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg">{v.title}</h3>
            <p className="text-sm text-muted-foreground mt-2">{v.desc}</p>
          </Card>
        ))}
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <Card className="p-10 md:p-14 bg-gradient-card border-border/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <Building2 className="h-10 w-10 text-primary mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Notre histoire</h2>
              <p className="text-muted-foreground mt-4">
                Fondée à Dakar, OTC s'est imposée comme un acteur de référence du transit et de la logistique en Afrique de l'Ouest. Avec une équipe expérimentée et un réseau international de partenaires, nous accompagnons aujourd'hui des PME comme des multinationales.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
          </div>
        </Card>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-center gap-3 mb-10">
          <Users className="h-6 w-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Notre équipe</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {team.map(t => (
            <Card key={t.name} className="p-6 bg-gradient-card border-border/50 hover:border-primary/30 transition-all text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-primary text-primary-foreground font-bold text-lg flex items-center justify-center mx-auto shadow-glow">
                {t.initials}
              </div>
              <h3 className="font-semibold mt-4">{t.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{t.role}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <Card className="p-10 md:p-14 text-center bg-gradient-card border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-50" />
          <div className="relative">
            <Award className="h-12 w-12 mx-auto text-primary mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Travaillons ensemble.</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">Rejoignez les entreprises qui font confiance à OTC pour leur logistique.</p>
            <Button asChild size="lg" className="mt-8 bg-gradient-primary shadow-glow hover:opacity-90">
              <Link to="/contact">Démarrer un projet <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
