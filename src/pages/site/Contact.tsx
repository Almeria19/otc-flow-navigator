import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const WHATSAPP_NUMBER = "221771234567"; // numéro pro OTC (format international sans +)
const WHATSAPP_DISPLAY = "+221 77 123 45 67";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Bonjour OTC, je souhaite obtenir des informations sur le suivi d'un conteneur."
)}`;

const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
    <path d="M19.11 17.31c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.65 1.12 2.83c.14.18 1.93 2.95 4.69 4.13.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32zM16 4C9.37 4 4 9.37 4 16c0 2.11.55 4.09 1.51 5.81L4 28l6.36-1.66A11.93 11.93 0 0 0 16 28c6.63 0 12-5.37 12-12S22.63 4 16 4z" />
  </svg>
);

export default function Contact() {
  return (
    <div>
      <section className="relative max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">Contact</p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Une question&nbsp;? Contactez-nous sur <span className="bg-gradient-primary bg-clip-text text-transparent">WhatsApp</span>.
          </h1>
          <p className="text-muted-foreground text-lg mt-5">
            Réponse rapide de notre équipe pour toute demande de suivi conteneur, transit ou logistique.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* WhatsApp CTA card */}
        <Card className="lg:col-span-2 p-8 md:p-12 bg-gradient-card border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-40" />
          <div className="relative flex flex-col items-start gap-6">
            <div className="h-16 w-16 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-glow">
              <WhatsAppIcon className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Discutons sur WhatsApp</h2>
              <p className="text-muted-foreground mt-2 max-w-lg">
                Envoyez-nous votre numéro de conteneur ou votre demande directement sur WhatsApp. Notre équipe vous répond en quelques minutes pendant les heures ouvrées.
              </p>
              <p className="font-mono text-sm mt-3 text-foreground">{WHATSAPP_DISPLAY}</p>
            </div>
            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-glow">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5 mr-2" /> Contacter via WhatsApp
              </a>
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          {[
            { icon: Phone, label: "Téléphone", value: "+221 33 XXX XX XX" },
            { icon: Mail, label: "Email", value: "contact@otc.sn" },
            { icon: MapPin, label: "Adresse", value: "Zone portuaire, Dakar, Sénégal" },
            { icon: Clock, label: "Horaires", value: "Lun - Ven : 8h - 18h" },
          ].map(c => (
            <Card key={c.label} className="p-5 bg-gradient-card border-border/50">
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
        </div>
      </section>
    </div>
  );
}
