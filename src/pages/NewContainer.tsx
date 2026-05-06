import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { clients } from "@/lib/mockData";
import { toast } from "sonner";
import { Package, User, MapPin, Ship, Wallet, Save, RotateCcw } from "lucide-react";

const Section = ({ icon: Icon, title, children }: any) => (
  <Card className="p-6 bg-gradient-card border-border/50">
    <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border/50">
      <div className="h-8 w-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="font-semibold">{title}</h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </Card>
);

const Field = ({ label, children }: any) => (
  <div className="space-y-1.5">
    <Label className="text-xs text-muted-foreground">{label}</Label>
    {children}
  </div>
);

export default function NewContainer() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Conteneur créé avec succès", { description: "Redirection vers le détail..." });
      navigate("/conteneurs/1");
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nouveau conteneur</h1>
        <p className="text-muted-foreground mt-1">Créer une opération logistique complète.</p>
      </div>

      <Section icon={Package} title="Informations conteneur">
        <Field label="Numéro de conteneur"><Input placeholder="Auto-généré (OTCU-XXXXXXX)" defaultValue="OTCU-7821942" /></Field>
        <Field label="Type de conteneur">
          <Select defaultValue="40ft">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="20ft">20ft Standard</SelectItem>
              <SelectItem value="40ft">40ft Standard</SelectItem>
              <SelectItem value="Reefer">Reefer (réfrigéré)</SelectItem>
              <SelectItem value="Open Top">Open Top</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Statut initial">
          <Select defaultValue="en_attente">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="en_attente">En attente</SelectItem>
              <SelectItem value="en_transit">En transit</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Référence interne"><Input placeholder="Ex: OTC-2026-042" /></Field>
      </Section>

      <Section icon={User} title="Client">
        <Field label="Sélectionner un client existant">
          <Select>
            <SelectTrigger><SelectValue placeholder="Choisir un client..." /></SelectTrigger>
            <SelectContent>
              {clients.map(c => <SelectItem key={c.id} value={c.id}>{c.company} — {c.name}</SelectItem>)}
            </SelectContent>
          </Select>
        </Field>
        <Field label="Ou ajouter rapidement">
          <Button type="button" variant="outline" className="w-full justify-start">+ Nouveau client</Button>
        </Field>
      </Section>

      <Section icon={MapPin} title="Logistique">
        <Field label="Port de départ"><Input placeholder="Shanghai, Chine" /></Field>
        <Field label="Port d'arrivée"><Input placeholder="Dakar, Sénégal" defaultValue="Dakar, Sénégal" /></Field>
        <Field label="Position initiale"><Input placeholder="Coordonnées ou ville" /></Field>
        <Field label="Date de départ"><Input type="date" /></Field>
        <Field label="Date estimée d'arrivée"><Input type="date" /></Field>
      </Section>

      <Section icon={Ship} title="Transport">
        <Field label="Mode de transport">
          <Select defaultValue="Maritime">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Maritime">Maritime</SelectItem>
              <SelectItem value="Terrestre">Terrestre</SelectItem>
              <SelectItem value="Multimodal">Multimodal</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Compagnie maritime (optionnel)">
          <Select>
            <SelectTrigger><SelectValue placeholder="Sélectionner..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="maersk">Maersk Line</SelectItem>
              <SelectItem value="cma">CMA CGM</SelectItem>
              <SelectItem value="msc">MSC</SelectItem>
              <SelectItem value="hapag">Hapag-Lloyd</SelectItem>
              <SelectItem value="evergreen">Evergreen</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </Section>

      <Section icon={Wallet} title="Facturation">
        <Field label="Montant estimé"><Input type="number" placeholder="0" /></Field>
        <Field label="Devise">
          <Select defaultValue="XOF">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="XOF">FCFA (XOF)</SelectItem>
              <SelectItem value="EUR">Euro (€)</SelectItem>
              <SelectItem value="USD">Dollar ($)</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field label="Statut facturation">
          <Select defaultValue="non_generee">
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="non_generee">Non générée</SelectItem>
              <SelectItem value="pre_creee">Pré-créée</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </Section>

      <div className="flex flex-wrap gap-3 justify-end sticky bottom-4 bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-4">
        <Button type="button" variant="ghost"><RotateCcw className="h-4 w-4 mr-1" />Réinitialiser</Button>
        <Button type="button" variant="outline"><Save className="h-4 w-4 mr-1" />Sauvegarder brouillon</Button>
        <Button type="submit" disabled={submitting} className="bg-gradient-primary shadow-glow hover:opacity-90 min-w-[180px]">
          {submitting ? "Création..." : "Créer le conteneur"}
        </Button>
      </div>
    </form>
  );
}
