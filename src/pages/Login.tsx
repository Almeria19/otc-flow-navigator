import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Anchor, Mail, Lock, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Connexion réussie");
      navigate("/");
    }, 600);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gradient-card">
        <div className="absolute inset-0 bg-gradient-glow" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.25), transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--primary) / 0.15), transparent 50%)`,
        }} />
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 800">
          <defs>
            <pattern id="g" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="800" height="800" fill="url(#g)" />
        </svg>
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Anchor className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <div className="font-bold tracking-tight">OTC Admin</div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Logistics Platform</div>
            </div>
          </div>
          <div className="space-y-4 max-w-md">
            <h2 className="text-4xl font-bold tracking-tight leading-tight">
              Pilotez votre logistique <span className="bg-gradient-primary bg-clip-text text-transparent">en temps réel</span>.
            </h2>
            <p className="text-muted-foreground">
              Centralisez vos conteneurs, clients et factures sur une plateforme conçue pour les opérations import/export modernes.
            </p>
            <div className="flex gap-6 pt-4 text-sm">
              <div><div className="text-2xl font-bold text-primary">2.4k+</div><div className="text-xs text-muted-foreground">Conteneurs traités</div></div>
              <div><div className="text-2xl font-bold text-primary">98%</div><div className="text-xs text-muted-foreground">Livraisons à temps</div></div>
              <div><div className="text-2xl font-bold text-primary">24/7</div><div className="text-xs text-muted-foreground">Suivi temps réel</div></div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 OTC — Dakar, Sénégal</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm space-y-8">
          <div className="lg:hidden flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
              <Anchor className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="font-bold">OTC Admin</div>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bon retour 👋</h1>
            <p className="text-muted-foreground mt-2">Connectez-vous à votre espace admin.</p>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input defaultValue="admin@otc.sn" className="pl-9 h-11" placeholder="vous@otc.sn" />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="password" defaultValue="••••••••" className="pl-9 h-11" placeholder="••••••••" />
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground"><input type="checkbox" className="accent-primary" /> Se souvenir</label>
              <a className="text-primary hover:underline cursor-pointer">Mot de passe oublié ?</a>
            </div>
            <Button type="submit" disabled={loading} className="w-full h-11 bg-gradient-primary shadow-glow hover:opacity-90">
              {loading ? "Connexion..." : <>Se connecter <ArrowRight className="h-4 w-4 ml-1" /></>}
            </Button>
          </form>
          <p className="text-xs text-center text-muted-foreground">
            Plateforme interne OTC — accès restreint.
          </p>
        </div>
      </div>
    </div>
  );
}
