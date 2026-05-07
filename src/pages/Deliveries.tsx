import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  deliveryRequests as initial, getClient, getContainer, DeliveryRequest, formatXOF,
} from "@/lib/mockData";
import {
  MapPin, Calendar, Check, X, CalendarClock, Phone, AlertTriangle, User, Truck, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const WhatsAppIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19.11 17.31c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.65 1.12 2.83c.14.18 1.93 2.95 4.69 4.13.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16 4C9.37 4 4 9.37 4 16c0 2.11.55 4.09 1.51 5.81L4 28l6.36-1.66A11.93 11.93 0 0 0 16 28c6.63 0 12-5.37 12-12S22.63 4 16 4z" />
  </svg>
);

const statusMap: Record<DeliveryRequest["status"], { label: string; cls: string }> = {
  en_attente: { label: "En attente", cls: "bg-warning/15 text-warning border-warning/30" },
  validee:    { label: "Validée",    cls: "bg-primary/15 text-primary border-primary/30" },
  livree:     { label: "Livrée",     cls: "bg-success/15 text-success border-success/30" },
  refusee:    { label: "Refusée",    cls: "bg-destructive/15 text-destructive border-destructive/30" },
  annulee:    { label: "Annulée",    cls: "bg-muted text-muted-foreground border-border" },
  retard:     { label: "Retard de récupération", cls: "bg-destructive/15 text-destructive border-destructive/30" },
};

const PENALTY_PER_DAY = 25000; // FCFA

const buildWhatsappLink = (phone: string, message: string) => {
  const clean = phone.replace(/[^\d]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
};

const addDays = (iso: string, days: number) => {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export default function Deliveries() {
  const [list, setList] = useState<DeliveryRequest[]>(initial);
  const [planOpen, setPlanOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [active, setActive] = useState<DeliveryRequest | null>(null);

  const [draft, setDraft] = useState({
    courierName: "",
    courierWhatsapp: "",
    plannedDate: "",
    plannedTime: "",
  });

  const today = new Date().toISOString().slice(0, 10);

  const enriched = useMemo(() => list.map(d => {
    let status = d.status;
    let penaltyAmount = d.penaltyAmount;
    if (d.pickupDeadline && d.status === "validee" && d.pickupDeadline < today) {
      status = "retard";
      const days = Math.max(1, Math.ceil((new Date(today).getTime() - new Date(d.pickupDeadline).getTime()) / 86400000));
      penaltyAmount = days * PENALTY_PER_DAY;
    }
    return { ...d, status, penaltyAmount };
  }), [list, today]);

  const openPlan = (d: DeliveryRequest) => {
    setActive(d);
    setDraft({
      courierName: d.courierName ?? "",
      courierWhatsapp: d.courierWhatsapp ?? "",
      plannedDate: d.plannedDate ?? "",
      plannedTime: d.plannedTime ?? "",
    });
    setPlanOpen(true);
  };

  const openCancel = (d: DeliveryRequest) => { setActive(d); setCancelOpen(true); };

  const validate = (d: DeliveryRequest) => {
    if (d.courierWhatsapp) {
      const client = getClient(d.clientId);
      const container = getContainer(d.containerId);
      const msg = `Bonjour ${d.courierName ?? ""}, livraison ${container?.number} pour ${client?.company} à ${d.destination}. Date prévue : ${d.plannedDate ?? "à confirmer"} ${d.plannedTime ?? ""}.`;
      window.open(buildWhatsappLink(d.courierWhatsapp, msg), "_blank", "noopener,noreferrer");
      toast.success("WhatsApp livreur ouvert");
    } else {
      openPlan(d);
    }
  };

  const savePlanning = () => {
    if (!active) return;
    if (!draft.courierName.trim() || !draft.courierWhatsapp.trim() || !draft.plannedDate || !draft.plannedTime) {
      toast.error("Renseignez tous les champs de planification.");
      return;
    }
    const deadline = addDays(draft.plannedDate, 3);
    setList(prev => prev.map(d => d.id === active.id ? {
      ...d,
      status: "validee",
      courierName: draft.courierName,
      courierWhatsapp: draft.courierWhatsapp,
      plannedDate: draft.plannedDate,
      plannedTime: draft.plannedTime,
      pickupDeadline: deadline,
    } : d));
    toast.success("Livraison planifiée", {
      description: `Date limite de récupération : ${new Date(deadline).toLocaleDateString("fr-FR")}`,
    });
    setPlanOpen(false);
  };

  const confirmCancel = () => {
    if (!active) return;
    setList(prev => prev.map(d => d.id === active.id ? { ...d, status: "annulee" } : d));
    toast("Livraison annulée", { description: `Demande #${active.id.padStart(4, "0")}` });
    setCancelOpen(false);
  };

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Demandes de livraison</h1>
        <p className="text-muted-foreground mt-1">{enriched.length} demandes — gestion des livreurs et planifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {enriched.map(d => {
          const client = getClient(d.clientId);
          const container = getContainer(d.containerId);
          const s = statusMap[d.status];
          const isLate = d.status === "retard";

          return (
            <Card
              key={d.id}
              className={cn(
                "p-5 bg-gradient-card border-border/50 hover:border-primary/30 transition-all",
                isLate && "border-destructive/40"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Demande #{d.id.padStart(4, "0")}</p>
                  <h3 className="font-semibold mt-1 truncate">{client?.company}</h3>
                  <p className="text-xs text-muted-foreground truncate">{client?.name}</p>
                </div>
                <span className={cn("inline-flex px-2.5 py-1 rounded-full text-xs font-medium border whitespace-nowrap", s.cls)}>{s.label}</span>
              </div>

              <div className="space-y-2 mt-4 text-sm">
                <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" /><span>{d.destination}</span></div>
                <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" />Demandée le {d.requestedDate}</div>
                <div className="text-xs text-muted-foreground font-mono">Conteneur : {container?.number}</div>
              </div>

              {(d.courierName || d.plannedDate) && (
                <div className="mt-4 p-3 rounded-lg bg-background/40 border border-border/40 space-y-1.5 text-sm">
                  {d.courierName && (
                    <div className="flex items-center gap-2"><User className="h-3.5 w-3.5 text-primary" /> {d.courierName}</div>
                  )}
                  {d.courierWhatsapp && (
                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <Phone className="h-3.5 w-3.5" /> {d.courierWhatsapp}
                    </div>
                  )}
                  {d.plannedDate && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> Prévu : {d.plannedDate} à {d.plannedTime}
                    </div>
                  )}
                  {d.pickupDeadline && (
                    <div className={cn("flex items-center gap-2 text-xs", isLate ? "text-destructive" : "text-muted-foreground")}>
                      <CalendarClock className="h-3.5 w-3.5" /> Limite de récupération : {d.pickupDeadline}
                    </div>
                  )}
                </div>
              )}

              {isLate && d.penaltyAmount && (
                <div className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                  <div className="flex items-center gap-2 text-destructive font-semibold text-sm">
                    <AlertTriangle className="h-4 w-4" /> Pénalités de retard
                  </div>
                  <p className="text-xs text-destructive/90 mt-1">
                    Montant des frais supplémentaires : <span className="font-bold">{formatXOF(d.penaltyAmount)}</span>
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                {(d.status === "en_attente" || d.status === "validee" || d.status === "retard") && (
                  <>
                    <Button size="sm" className="flex-1 bg-gradient-primary" onClick={() => validate(d)}>
                      <Check className="h-3.5 w-3.5 mr-1" />Valider
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => openPlan(d)}>
                      <CalendarClock className="h-3.5 w-3.5 mr-1" />
                      {d.plannedDate ? "Replanifier" : "Planifier"}
                    </Button>
                    {d.courierWhatsapp && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]"
                        onClick={() => window.open(
                          buildWhatsappLink(d.courierWhatsapp!, `Bonjour ${d.courierName ?? ""}, point sur la livraison ${container?.number}.`),
                          "_blank", "noopener,noreferrer"
                        )}
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5 mr-1" />Livreur
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive" onClick={() => openCancel(d)}>
                      <X className="h-3.5 w-3.5 mr-1" />Annuler
                    </Button>
                  </>
                )}
                {d.status === "livree" && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Truck className="h-3.5 w-3.5 text-success" /> Livraison terminée
                  </span>
                )}
                {d.status === "annulee" && (
                  <span className="text-xs text-muted-foreground">Cette livraison a été annulée.</span>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Planning modal */}
      <Dialog open={planOpen} onOpenChange={setPlanOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Planification de la livraison</DialogTitle>
            <DialogDescription>
              Attribuez un livreur, choisissez la date et l'heure. Une date limite de récupération sera générée automatiquement.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Nom du livreur *</Label>
              <Input value={draft.courierName} onChange={e => setDraft({ ...draft, courierName: e.target.value })} placeholder="Nom complet du livreur" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Numéro WhatsApp du livreur *</Label>
              <Input value={draft.courierWhatsapp} onChange={e => setDraft({ ...draft, courierWhatsapp: e.target.value })} placeholder="+221 ..." />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Date *</Label>
                <Input type="date" value={draft.plannedDate} onChange={e => setDraft({ ...draft, plannedDate: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Heure *</Label>
                <Select value={draft.plannedTime} onValueChange={v => setDraft({ ...draft, plannedTime: v })}>
                  <SelectTrigger><SelectValue placeholder="Choisir..." /></SelectTrigger>
                  <SelectContent>
                    {["08:00","09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00"].map(h => (
                      <SelectItem key={h} value={h}>{h}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            {draft.plannedDate && (
              <p className="text-xs text-muted-foreground">
                Date limite de récupération générée : <span className="font-semibold text-foreground">{new Date(addDays(draft.plannedDate, 3)).toLocaleDateString("fr-FR")}</span>
              </p>
            )}
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setPlanOpen(false)}>Fermer</Button>
            <Button onClick={savePlanning} className="bg-gradient-primary">Valider la planification</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel confirmation */}
      <AlertDialog open={cancelOpen} onOpenChange={setCancelOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Annuler cette livraison ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action mettra à jour le statut en "Annulée". Vous pourrez créer une nouvelle demande si besoin.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Retour</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCancel} className="bg-destructive hover:bg-destructive/90">
              Annuler la livraison
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
