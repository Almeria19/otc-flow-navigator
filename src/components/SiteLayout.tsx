import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { Anchor, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Accueil", end: true },
  { to: "/services", label: "Services" },
  { to: "/a-propos", label: "À propos" },
  { to: "/contact", label: "Contact" },
];

export default function SiteLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
              <Anchor className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-tight">OTC</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Logistics</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {nav.map(n => (
              <NavLink key={n.to} to={n.to} end={n.end}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" onClick={() => navigate("/login")}>Connexion</Button>
            <Button onClick={() => navigate("/contact")} className="bg-gradient-primary shadow-glow hover:opacity-90">
              Devis gratuit <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <button onClick={() => setOpen(o => !o)} className="md:hidden h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-border/50 px-6 py-4 space-y-2">
            {nav.map(n => (
              <NavLink key={n.to} to={n.to} end={n.end} onClick={() => setOpen(false)}
                className={({ isActive }) => `block px-3 py-2 rounded-lg text-sm font-medium ${isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:bg-muted/50"}`}>
                {n.label}
              </NavLink>
            ))}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => { setOpen(false); navigate("/login"); }}>Connexion</Button>
              <Button className="flex-1 bg-gradient-primary" onClick={() => { setOpen(false); navigate("/contact"); }}>Devis</Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border/50 bg-card/30 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-3">
              <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow">
                <Anchor className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold">OTC Logistics</span>
            </Link>
            <p className="text-sm text-muted-foreground">L'expert logistique import/export en Afrique de l'Ouest.</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Entreprise</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/a-propos" className="hover:text-primary transition-colors">À propos</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Plateforme</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-primary transition-colors">Espace client</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Admin</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Dakar, Sénégal</li>
              <li>contact@otc.sn</li>
              <li>+221 33 XXX XX XX</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/50 py-5 text-center text-xs text-muted-foreground">
          © 2026 OTC Logistics — Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
