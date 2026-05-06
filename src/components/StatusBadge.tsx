import { cn } from "@/lib/utils";
import { ContainerStatus, statusLabel } from "@/lib/mockData";

const styles: Record<ContainerStatus, string> = {
  en_transit: "bg-primary/15 text-primary border-primary/30",
  livre: "bg-success/15 text-success border-success/30",
  en_attente: "bg-warning/15 text-warning border-warning/30",
  incident: "bg-destructive/15 text-destructive border-destructive/30",
};

const dotStyles: Record<ContainerStatus, string> = {
  en_transit: "bg-primary",
  livre: "bg-success",
  en_attente: "bg-warning",
  incident: "bg-destructive animate-pulse",
};

export const StatusBadge = ({ status }: { status: ContainerStatus }) => (
  <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border", styles[status])}>
    <span className={cn("h-1.5 w-1.5 rounded-full", dotStyles[status])} />
    {statusLabel[status]}
  </span>
);
