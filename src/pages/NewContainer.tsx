import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { clients, Client } from "@/lib/mockData";
import { toast } from "sonner";
import { Package, Users, MapPin, Ship, Wallet, Save, RotateCcw, Plus, X, UserPlus } from "lucide-react";

const Section = ({ icon: Icon, title, action, children }: any) => (
  <Card className="p-6 bg-gradient-card border-border/50">
    <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border/50">
      <div className="h-8 w-8 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="font-semibold flex-1">{title}</h3>
      {action}
    </div>
    <div className="space-y-4">{children}</div>
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
  const [clientList, setClientList] = useState<Client[]>([...clients]);
  const [assignedIds, setAssignedIds] = useState<string[]>([""]);
  const [newClientOpen, setNewClientOpen] = useState(false);
  const [targetSlot, setTargetSlot] = useState<number | null>(null);
  const [draft, setDraft] = useState({ company: "", name: "", email: "", phone: "" });

  const updateAssignment = (idx: number, val: string) => {
    setAssignedIds(prev => prev.map((v, i) => (i === idx ? val : v)));
  };
  const addClientSlot = () => setAssignedIds(prev => [...prev, ""]);
  const removeClientSlot = (idx: number) =>
    setAssignedIds(prev => (prev.length === 1 ? prev : prev.filter((_, i) => i !== idx)));

  const openNewClient = (slot: number | null) => {
    setTargetSlot(slot);
    setDraft({ company: "", name: "", email: "", phone: "" });
    setNewClientOpen(true);
  };

  const saveNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft.company.trim() || !draft.name.trim()) {
      toast.error("Le nom de l'entreprise et du contact sont requis.");
      return;
    }
    const newClient: Client = {
      id: `C-${String(clientList.length + 1).padStart(3, "0")}`,
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      company: draft.company.trim(),
      containers: 0,
    };
    setClientList(prev => [...prev, newClient]);
    if (targetSlot !== null) {
      updateAssignment(targetSlot, newClient.id);
    } else {
      setAssignedIds(prev => [...prev, newClient.id]);
    }
    toast.success("Client créé", { description: newClient.company });
    setNewClientOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = assignedIds.filter(Boolean);
    if (valid.length === 0) {
      toast.error("Assignez au moins un client au conteneur.");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Conteneur créé", { description: `${valid.length} client(s) associé(s).` });
      navigate("/admin/conteneurs/1");
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-[1200px] mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Nouveau conteneur</h1>
        <p className="text-muted-foreground mt-1">Créer une opération logistique complète.</p>
      </div>

      <Section icon={Package} title="Informations conteneur">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </Section>

      <Section
        icon={Users}
        title={`Clients associés (${assignedIds.filter(Boolean).length})`}
        action={
          <Button type="button" size="sm" variant="outline" onClick={() => openNewClient(null)}>
            <UserPlus className="h-3.5 w-3.5 mr-1" /> Ajouter un nouveau client
          </Button>
        }
      >
        <p className="text-xs text-muted-foreground -mt-1">
          Un même conteneur peut être assigné à plusieurs clients (groupage, mutualisation).
        </p>

        {assignedIds.map((id, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-2 items-stretch md:items-center p-3 rounded-xl bg-background/40 border border-border/50">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground w-16 shrink-0">Client #{idx + 1}</span>
            <div className="flex-1">
              <Select value={id} onValueChange={(v) => updateAssignment(idx, v)}>
                <SelectTrigger><SelectValue placeholder="Sélectionner un client existant..." /></SelectTrigger>
                <SelectContent>
                  {clientList
                    .filter(c => c.id === id || !assignedIds.includes(c.id))
                    .map(c => (
                      <SelectItem key={c.id} value={c.id}>{c.company} — {c.name}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-1">
              <Button type="button" size="sm" variant="ghost" onClick={() => openNewClient(idx)}>
                <UserPlus className="h-3.5 w-3.5 mr-1" /> Nouveau
              </Button>
              {assignedIds.length > 1 && (
                <Button type="button" size="icon" variant="ghost" onClick={() => removeClientSlot(idx)} aria-label="Retirer">
                  <X className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addClientSlot} className="w-full">
          <Plus className="h-4 w-4 mr-1" /> Ajouter un autre client
        </Button>
      </Section>

      <Section icon={MapPin} title="Logistique">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Port de départ"><Input placeholder="Shanghai, Chine" /></Field>
          <Field label="Port d'arrivée"><Input placeholder="Dakar, Sénégal" defaultValue="Dakar, Sénégal" /></Field>
          <Field label="Position initiale"><Input placeholder="Coordonnées ou ville" /></Field>
          <Field label="Date de départ"><Input type="date" /></Field>
          <Field label="Date estimée d'arrivée"><Input type="date" /></Field>
        </div>
      </Section>

      <Section icon={Ship} title="Transport">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </Section>

      <Section icon={Wallet} title="Facturation">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </Section>

      <div className="flex flex-wrap gap-3 justify-end sticky bottom-4 bg-card/80 backdrop-blur-xl border border-border/50 rounded-xl p-4">
        <Button type="button" variant="ghost" onClick={() => { setAssignedIds([""]); toast("Formulaire réinitialisé"); }}>
          <RotateCcw className="h-4 w-4 mr-1" />Réinitialiser
        </Button>
        <Button type="button" variant="outline" onClick={() => toast.success("Brouillon sauvegardé")}>
          <Save className="h-4 w-4 mr-1" />Sauvegarder brouillon
        </Button>
        <Button type="submit" disabled={submitting} className="bg-gradient-primary shadow-glow hover:opacity-90 min-w-[180px]">
          {submitting ? "Création..." : "Créer le conteneur"}
        </Button>
      </div>

      {/* New client modal */}
      <Dialog open={newClientOpen} onOpenChange={setNewClientOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouveau client</DialogTitle>
            <DialogDescription>Le client créé sera automatiquement associé au conteneur.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Field label="Entreprise *">
              <Input value={draft.company} onChange={e => setDraft({ ...draft, company: e.target.value })} placeholder="Nom de la société" />
            </Field>
            <Field label="Contact *">
              <Input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} placeholder="Nom et prénom" />
            </Field>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Email">
                <Input type="email" value={draft.email} onChange={e => setDraft({ ...draft, email: e.target.value })} placeholder="contact@entreprise.sn" />
              </Field>
              <Field label="Téléphone">
                <Input value={draft.phone} onChange={e => setDraft({ ...draft, phone: e.target.value })} placeholder="+221 ..." />
              </Field>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setNewClientOpen(false)}>Annuler</Button>
            <Button type="button" onClick={saveNewClient} className="bg-gradient-primary">Créer le client</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
}
