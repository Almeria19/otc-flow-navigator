import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground mt-1">Gérez votre compte et préférences.</p>
      </div>

      <Card className="p-6 bg-gradient-card border-border/50 space-y-4">
        <h3 className="font-semibold">Profil administrateur</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5"><Label className="text-xs text-muted-foreground">Nom</Label><Input defaultValue="Admin OTC" /></div>
          <div className="space-y-1.5"><Label className="text-xs text-muted-foreground">Email</Label><Input defaultValue="admin@otc.sn" /></div>
          <div className="space-y-1.5"><Label className="text-xs text-muted-foreground">Téléphone</Label><Input defaultValue="+221 33 XXX XX XX" /></div>
          <div className="space-y-1.5"><Label className="text-xs text-muted-foreground">Rôle</Label><Input defaultValue="Administrateur" disabled /></div>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50 space-y-4">
        <h3 className="font-semibold">Préférences</h3>
        {[
          { l: "Mode sombre", d: "Activer l'apparence sombre par défaut", on: true },
          { l: "Notifications email", d: "Recevoir les alertes critiques par email", on: true },
          { l: "Notifications SMS", d: "Recevoir les retards conteneurs par SMS", on: false },
          { l: "Synchronisation temps réel", d: "Mises à jour des positions toutes les 5 minutes", on: true },
        ].map(p => (
          <div key={p.l} className="flex items-center justify-between py-2 border-b border-border/30 last:border-0">
            <div>
              <p className="text-sm font-medium">{p.l}</p>
              <p className="text-xs text-muted-foreground">{p.d}</p>
            </div>
            <Switch defaultChecked={p.on} />
          </div>
        ))}
      </Card>

      <Card className="p-6 bg-gradient-card border-border/50 space-y-4">
        <h3 className="font-semibold">Sécurité</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5"><Label className="text-xs text-muted-foreground">Mot de passe actuel</Label><Input type="password" placeholder="••••••••" /></div>
          <div className="space-y-1.5"><Label className="text-xs text-muted-foreground">Nouveau mot de passe</Label><Input type="password" placeholder="••••••••" /></div>
        </div>
        <Button className="bg-gradient-primary shadow-glow hover:opacity-90">Sauvegarder</Button>
      </Card>
    </div>
  );
}
