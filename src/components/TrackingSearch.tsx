import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { containers, Container } from "@/lib/mockData";
import TrackingResult from "./TrackingResult";

const FORMAT = /^[A-Z]{4}-?\d{7}$/i;

export default function TrackingSearch({ compact = false }: { compact?: boolean }) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Container | null>(null);
  const [error, setError] = useState<string | null>(null);

  const search = (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    const v = value.trim().toUpperCase();
    if (!v) { setError("Veuillez saisir un numéro de conteneur."); return; }
    if (!FORMAT.test(v)) { setError("Format attendu : 4 lettres + 7 chiffres (ex. OTCU-7821934)."); return; }
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const found = containers.find(c => c.number.toUpperCase().replace("-", "") === v.replace("-", ""));
      if (!found) setError("Conteneur introuvable. Vérifiez le numéro.");
      else setResult(found);
      setLoading(false);
    }, 800);
  };

  const suggestions = value.length >= 2 && !result
    ? containers.filter(c => c.number.toLowerCase().includes(value.toLowerCase())).slice(0, 4)
    : [];

  return (
    <div className={compact ? "" : "space-y-8"}>
      <form onSubmit={search} className="relative">
        <div className="relative bg-card/60 backdrop-blur-xl border border-border/60 rounded-2xl p-2 shadow-glow flex flex-col md:flex-row gap-2">
          <div className="relative flex-1 flex items-center">
            <Search className="absolute left-4 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input
              value={value}
              onChange={e => { setValue(e.target.value); setError(null); }}
              placeholder="Entrer votre numéro de conteneur (ex. OTCU-7821934)"
              className="pl-12 h-14 text-base bg-transparent border-0 focus-visible:ring-0 font-mono tracking-wide"
              aria-label="Numéro de conteneur"
            />
          </div>
          <Button type="submit" disabled={loading} className="h-14 px-6 bg-gradient-primary shadow-glow hover:opacity-90 text-base">
            {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Recherche…</> : <>Suivre mon conteneur</>}
          </Button>
        </div>

        {suggestions.length > 0 && (
          <div className="absolute left-2 right-2 mt-2 bg-popover border border-border rounded-xl shadow-xl overflow-hidden z-10">
            {suggestions.map(s => (
              <button key={s.id} type="button" onClick={() => { setValue(s.number); setTimeout(() => search(), 0); }}
                className="w-full text-left px-4 py-2.5 hover:bg-muted/50 flex items-center justify-between text-sm">
                <span className="font-mono">{s.number}</span>
                <span className="text-xs text-muted-foreground">{s.origin} → {s.destination}</span>
              </button>
            ))}
          </div>
        )}
      </form>

      {error && (
        <div className="mt-3 flex items-center gap-2 text-sm text-destructive bg-destructive/10 border border-destructive/30 rounded-lg px-4 py-3">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}

      {!result && !loading && !compact && (
        <p className="text-xs text-muted-foreground text-center">
          Essayez : <button type="button" onClick={() => setValue("OTCU-7821934")} className="underline hover:text-primary font-mono">OTCU-7821934</button>
          {" · "}
          <button type="button" onClick={() => setValue("OTCU-7821937")} className="underline hover:text-primary font-mono">OTCU-7821937</button>
        </p>
      )}

      {loading && (
        <div className="mt-8 flex flex-col items-center justify-center py-12 gap-3">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground">Connexion au réseau logistique…</p>
        </div>
      )}

      {result && (
        <div className="mt-8">
          <TrackingResult container={result} />
        </div>
      )}
    </div>
  );
}
