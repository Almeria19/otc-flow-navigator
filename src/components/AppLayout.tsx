import { Outlet, useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { containers, getClient } from "@/lib/mockData";
import { StatusBadge } from "./StatusBadge";

export default function AppLayout() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return containers
      .filter(c => {
        const cl = getClient(c.clientId);
        return (
          c.number.toLowerCase().includes(term) ||
          cl?.company.toLowerCase().includes(term) ||
          cl?.name.toLowerCase().includes(term)
        );
      })
      .slice(0, 8);
  }, [q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results.length === 1) {
      navigate(`/admin/conteneurs/${results[0].id}`);
      setOpen(false);
      setQ("");
    } else {
      setOpen(true);
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b border-border flex items-center gap-3 px-4 sticky top-0 bg-background/80 backdrop-blur-xl z-40">
            <SidebarTrigger />
            <form onSubmit={submit} className="relative flex-1 max-w-xl flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={q}
                  onChange={(e) => { setQ(e.target.value); setOpen(true); }}
                  onFocus={() => setOpen(true)}
                  placeholder="Rechercher un conteneur ou un client..."
                  className="pl-9 h-9 bg-muted/40 border-border/50 focus-visible:ring-primary/30"
                />
              </div>
              <Button type="submit" size="sm" className="h-9 bg-gradient-primary shadow-glow hover:opacity-90">
                Rechercher
              </Button>

              {open && q && (
                <div className="absolute top-11 left-0 right-0 bg-popover border border-border rounded-xl shadow-xl overflow-hidden z-50 max-h-[420px] overflow-y-auto">
                  {results.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground text-center">Aucun résultat</div>
                  ) : (
                    <ul>
                      {results.map(c => {
                        const cl = getClient(c.clientId);
                        return (
                          <li key={c.id}>
                            <button
                              type="button"
                              onClick={() => { navigate(`/admin/conteneurs/${c.id}`); setOpen(false); setQ(""); }}
                              className="w-full text-left px-4 py-3 hover:bg-muted/60 flex items-center justify-between gap-3 border-b border-border/40 last:border-0"
                            >
                              <div className="min-w-0">
                                <div className="font-mono text-sm font-semibold">{c.number}</div>
                                <div className="text-xs text-muted-foreground truncate">{cl?.company} — {cl?.name}</div>
                                <div className="text-[11px] text-muted-foreground mt-0.5">ETA: {new Date(c.arrivalDate).toLocaleDateString("fr-FR")} · {c.origin} → {c.destination}</div>
                              </div>
                              <StatusBadge status={c.status} />
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </form>
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => navigate("/admin/notifications")}
                className="relative h-9 w-9 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
              </button>
            </div>
          </header>
          <main
            className="flex-1 p-6 overflow-x-hidden"
            onClick={() => setOpen(false)}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
