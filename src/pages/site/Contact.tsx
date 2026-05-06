import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Send, MessageCircle, Clock } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message envoyé !", { description: "Notre équipe vous répond sous 24h." });
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <div>
      <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="absolute inset-0 bg-gradient-glow opacity-50" />
        <div className="relative max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Contact</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Parlons de votre <span className="bg-gradient-primary bg-clip-text text-transparent">projet</span>.</h1>
          <p className="text-muted-foreground text-lg mt-5">
            Notre équipe est à votre écoute pour répondre à vos questions et préparer une offre sur mesure.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "contact@otc.sn" },
            { icon: Phone, label: "Téléphone", value: "+221 33 XXX XX XX" },
            { icon: MapPin, label: "Adresse", value: "Zone portuaire, Dakar, Sénégal" },
            { icon: Clock, label: "Horaires", value: "Lun - Ven : 8h - 18h" },
          ].map(c => (
            <Card key={c.label} className="p-5 bg-gradient-card border-border/50 hover:border-primary/30 transition-all">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
                  <c.icon className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</p>
                  <p className="font-medium mt-1">{c.value}</p>
                </div>
              </div>
            </Card>
          ))}
          <Card className="p-5 bg-gradient-card border-border/50 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-glow opacity-40" />
            <div className="relative">
              <MessageCircle className="h-6 w-6 text-primary mb-2" />
              <p className="font-semibold">Réponse sous 24h</p>
              <p className="text-xs text-muted-foreground mt-1">Notre équipe vous recontacte rapidement.</p>
            </div>
          </Card>
        </div>

        <Card className="lg:col-span-2 p-6 md:p-8 bg-gradient-card border-border/50">
          <h2 className="text-2xl font-bold tracking-tight">Envoyez-nous un message</h2>
          <p className="text-sm text-muted-foreground mt-1">Tous les champs marqués * sont obligatoires.</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Nom complet *</Label>
                <Input required placeholder="Votre nom" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Entreprise</Label>
                <Input placeholder="Nom de société" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Email *</Label>
                <Input required type="email" placeholder="vous@email.com" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Téléphone</Label>
                <Input type="tel" placeholder="+221 ..." />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Type de demande *</Label>
              <Select defaultValue="devis">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="devis">Demande de devis</SelectItem>
                  <SelectItem value="info">Demande d'information</SelectItem>
                  <SelectItem value="partenariat">Partenariat</SelectItem>
                  <SelectItem value="support">Support client</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Votre message *</Label>
              <Textarea required rows={5} placeholder="Décrivez votre besoin logistique..." />
            </div>
            <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
              <p className="text-xs text-muted-foreground">En envoyant, vous acceptez notre politique de confidentialité.</p>
              <Button type="submit" disabled={loading} className="bg-gradient-primary shadow-glow hover:opacity-90 min-w-[160px]">
                {loading ? "Envoi..." : <>Envoyer <Send className="h-4 w-4 ml-1" /></>}
              </Button>
            </div>
          </form>
        </Card>
      </section>
    </div>
  );
}
