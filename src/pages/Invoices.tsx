import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { invoices, getClient, formatXOF } from "@/lib/mockData";
import { Plus, Download, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const statusBadge = (s: string) => {
  const map: Record<string, { label: string; cls: string }> = {
    paye: { label: "Payée", cls: "bg-success/15 text-success border-success/30" },
    en_attente: { label: "En attente", cls: "bg-warning/15 text-warning border-warning/30" },
    retard: { label: "En retard", cls: "bg-destructive/15 text-destructive border-destructive/30" },
  };
  const v = map[s];
  return <span className={cn("inline-flex px-2.5 py-1 rounded-full text-xs font-medium border", v.cls)}>{v.label}</span>;
};

export default function Invoices() {
  const total = invoices.reduce((a, b) => a + b.amount, 0);
  const paid = invoices.filter(i => i.status === "paye").reduce((a, b) => a + b.amount, 0);
  const pending = invoices.filter(i => i.status === "en_attente").reduce((a, b) => a + b.amount, 0);
  const late = invoices.filter(i => i.status === "retard").reduce((a, b) => a + b.amount, 0);

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Facturation</h1>
          <p className="text-muted-foreground mt-1">Suivi des factures clients.</p>
        </div>
        <Button className="bg-gradient-primary shadow-glow hover:opacity-90"><Plus className="h-4 w-4 mr-1" />Nouvelle facture</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total facturé", value: total, color: "text-foreground" },
          { label: "Encaissé", value: paid, color: "text-success" },
          { label: "En attente", value: pending, color: "text-warning" },
          { label: "En retard", value: late, color: "text-destructive" },
        ].map(k => (
          <Card key={k.label} className="p-4 bg-gradient-card border-border/50">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">{k.label}</p>
            <p className={cn("text-xl font-bold mt-2 tracking-tight", k.color)}>{formatXOF(k.value)}</p>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden bg-gradient-card border-border/50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/20 border-b border-border/50">
              <tr className="text-left text-[10px] uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Facture</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Conteneur</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Montant</th>
                <th className="px-4 py-3 font-medium">Statut</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(i => (
                <tr key={i.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-4 font-mono text-sm font-semibold">{i.number}</td>
                  <td className="px-4 py-4 text-sm">{getClient(i.clientId)?.company}</td>
                  <td className="px-4 py-4 font-mono text-xs text-muted-foreground">OTCU-78219{34 + Number(i.containerId)}</td>
                  <td className="px-4 py-4 text-sm text-muted-foreground">{i.date}</td>
                  <td className="px-4 py-4 text-sm font-semibold">{formatXOF(i.amount)}</td>
                  <td className="px-4 py-4">{statusBadge(i.status)}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="inline-flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8"><FileText className="h-3.5 w-3.5" /></Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8"><Download className="h-3.5 w-3.5" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
