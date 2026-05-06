import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Anchor, Ship, Truck, Package, Globe2, BarChart3, Shield, ArrowRight, CheckCircle2, MapPin } from "lucide-react";

const stats = [
  { v: "2.4k+", l: "Conteneurs traités" },
  { v: "98%", l: "Livraisons à temps" },
  { v: "15+", l: "Pays desservis" },
  { v: "24/7", l: "Suivi temps réel" },
];

const services = [
  { icon: Ship, title: "Transport maritime", desc: "Solutions FCL et LCL depuis tous les ports majeurs vers l'Afrique de l'Ouest." },
  { icon: Truck, title: "Transit & douane", desc: "Dédouanement rapide, conformité réglementaire et acheminement final." },
  { icon: Package, title: "Logistique conteneurs", desc: "Gestion complète : entreposage, suivi, livraison et retour." },
  { icon: Globe2, title: "Import / Export", desc: "Accompagnement commercial international, documentation et formalités." },
  { icon: BarChart3, title: "Tracking digital", desc: "Plateforme temps réel pour suivre vos opérations à chaque étape." },
  { icon: Shield, title: "Assurance fret", desc: "Couverture complète de vos marchandises sur toute la chaîne." },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, hsl(var(--primary) / 0.18), transparent 50%), radial-gradient(circle at 80% 70%, hsl(var(--primary) / 0.12), transparent 50%)`,
        }} />
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" viewBox="0 0 800 600">
          <defs>
            <pattern id="hg" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="800" height="600" fill="url(#hg)" />
        </svg>

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Basé à Dakar — opérations 24/7
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
              Votre logistique <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">import/export</span>, simplifiée.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl">
              OTC accompagne les entreprises africaines dans la gestion complète de leurs opérations de transit, de douane et de logistique conteneurs.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button asChild size="lg" className="bg-gradient-primary shadow-glow hover:opacity-90 h-12 px-6">
                <Link to="/contact">Demander un devis <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6">
                <Link to="/services">Découvrir nos services</Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-2xl">
              {stats.map(s => (
                <div key={s.l}>
                  <div className="text-3xl font-bold text-primary">{s.v}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">Nos expertises</p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Une offre logistique complète</h2>
          </div>
          <Button asChild variant="ghost"><Link to="/services">Tous les services <ArrowRight className="h-4 w-4 ml-1" /></Link></Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map(s => (
            <Card key={s.title} className="p-6 bg-gradient-card border-border/50 hover:border-primary/30 hover:shadow-glow transition-all group cursor-pointer">
              <div className="h-11 w-11 rounded-xl bg-primary/15 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-lg">{s.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Tracking preview */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Card className="overflow-hidden bg-gradient-card border-border/50">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Plateforme digitale</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Suivez vos conteneurs en temps réel.</h2>
              <p className="text-muted-foreground mt-4">
                Visibilité totale sur vos opérations : positions GPS, ETA, statut douanier, alertes intelligentes — depuis une interface unique.
              </p>
              <ul className="mt-6 space-y-2.5">
                {["Tableau de bord temps réel", "Notifications & alertes", "Facturation simplifiée", "Historique complet"].map(t => (
                  <li key={t} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success" /> {t}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-8 w-fit bg-gradient-primary shadow-glow hover:opacity-90">
                <Link to="/login">Accéder à la plateforme <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            </div>
            <div className="relative bg-[#0a1020] min-h-[360px] overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="mg" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="600" height="400" fill="url(#mg)" />
                <path d="M 60 280 Q 200 120 380 220 T 540 100" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="6 4" fill="none" opacity="0.7" />
                <circle cx="60" cy="280" r="7" fill="hsl(var(--success))" />
                <circle cx="540" cy="100" r="7" fill="hsl(var(--warning))" />
                <g>
                  <circle cx="320" cy="200" r="16" fill="hsl(var(--primary))" opacity="0.3">
                    <animate attributeName="r" from="16" to="36" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                  <circle cx="320" cy="200" r="9" fill="hsl(var(--primary))" />
                </g>
              </svg>
              <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-3">
                <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg px-4 py-2.5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Conteneur</div>
                  <div className="font-mono text-sm font-semibold">OTCU-7821934</div>
                </div>
                <div className="bg-card/90 backdrop-blur-xl border border-border/50 rounded-lg px-4 py-2.5">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">ETA</div>
                  <div className="text-sm font-semibold text-primary">18 mai 2026</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <Card className="p-10 md:p-16 text-center bg-gradient-card border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-50" />
          <div className="relative">
            <Anchor className="h-12 w-12 mx-auto text-primary mb-4" />
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Prêt à digitaliser votre logistique ?</h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Discutons de votre projet et obtenez une offre personnalisée sous 24h.
            </p>
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <Button asChild size="lg" className="bg-gradient-primary shadow-glow hover:opacity-90 h-12 px-6">
                <Link to="/contact">Nous contacter <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-6">
                <Link to="/a-propos"><MapPin className="h-4 w-4 mr-1" />En savoir plus</Link>
              </Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
