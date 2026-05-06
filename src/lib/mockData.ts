export type ContainerStatus = "en_transit" | "livre" | "en_attente" | "incident";
export type ContainerType = "20ft" | "40ft" | "Reefer" | "Open Top";
export type TransportMode = "Maritime" | "Terrestre" | "Multimodal";

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  containers: number;
}

export interface Container {
  id: string;
  number: string;
  clientId: string;
  type: ContainerType;
  status: ContainerStatus;
  location: string;
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
  transport: TransportMode;
  shipping?: string;
  amount: number;
  currency: string;
  lastUpdate: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  containerId: string;
  amount: number;
  currency: string;
  status: "paye" | "en_attente" | "retard";
  date: string;
}

export interface DeliveryRequest {
  id: string;
  clientId: string;
  containerId: string;
  destination: string;
  status: "en_attente" | "validee" | "livree" | "refusee";
  requestedDate: string;
}

export interface Notification {
  id: string;
  type: "urgent" | "info" | "system";
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export const clients: Client[] = [
  { id: "C-001", name: "Mamadou Diop", email: "m.diop@senatrade.sn", phone: "+221 77 123 45 67", company: "Sénatrade SARL", containers: 12 },
  { id: "C-002", name: "Aïssatou Ndiaye", email: "a.ndiaye@dakarimport.com", phone: "+221 76 234 56 78", company: "Dakar Import Group", containers: 8 },
  { id: "C-003", name: "Ibrahima Sarr", email: "i.sarr@westafrica-log.com", phone: "+221 78 345 67 89", company: "West Africa Logistics", containers: 23 },
  { id: "C-004", name: "Fatou Bâ", email: "fatou.ba@atlanticshipping.sn", phone: "+221 77 456 78 90", company: "Atlantic Shipping", containers: 5 },
  { id: "C-005", name: "Ousmane Fall", email: "o.fall@globaltrade.sn", phone: "+221 70 567 89 01", company: "Global Trade Sénégal", containers: 17 },
  { id: "C-006", name: "Awa Sow", email: "a.sow@cargolinks.com", phone: "+221 76 678 90 12", company: "CargoLinks", containers: 9 },
];

export const containers: Container[] = [
  { id: "1", number: "OTCU-7821934", clientId: "C-001", type: "40ft", status: "en_transit", location: "Atlantique Nord — 14°N 28°W", origin: "Shanghai", destination: "Dakar", departureDate: "2026-04-12", arrivalDate: "2026-05-18", transport: "Maritime", shipping: "Maersk Line", amount: 4850000, currency: "XOF", lastUpdate: "il y a 2h" },
  { id: "2", number: "OTCU-7821935", clientId: "C-003", type: "20ft", status: "livre", location: "Entrepôt Dakar — Port", origin: "Rotterdam", destination: "Dakar", departureDate: "2026-03-20", arrivalDate: "2026-04-28", transport: "Maritime", shipping: "CMA CGM", amount: 2300000, currency: "XOF", lastUpdate: "il y a 1j" },
  { id: "3", number: "OTCU-7821936", clientId: "C-002", type: "Reefer", status: "en_attente", location: "Port de Shanghai", origin: "Shanghai", destination: "Dakar", departureDate: "2026-05-08", arrivalDate: "2026-06-15", transport: "Maritime", shipping: "MSC", amount: 6200000, currency: "XOF", lastUpdate: "il y a 5h" },
  { id: "4", number: "OTCU-7821937", clientId: "C-005", type: "40ft", status: "en_transit", location: "Détroit de Gibraltar", origin: "Hambourg", destination: "Dakar", departureDate: "2026-04-25", arrivalDate: "2026-05-12", transport: "Maritime", shipping: "Hapag-Lloyd", amount: 3950000, currency: "XOF", lastUpdate: "il y a 30 min" },
  { id: "5", number: "OTCU-7821938", clientId: "C-004", type: "Open Top", status: "incident", location: "Casablanca — Douane", origin: "Anvers", destination: "Dakar", departureDate: "2026-04-01", arrivalDate: "2026-05-05", transport: "Multimodal", shipping: "Maersk Line", amount: 5400000, currency: "XOF", lastUpdate: "il y a 12 min" },
  { id: "6", number: "OTCU-7821939", clientId: "C-006", type: "20ft", status: "livre", location: "Bamako — Client", origin: "Marseille", destination: "Bamako", departureDate: "2026-03-15", arrivalDate: "2026-04-22", transport: "Multimodal", amount: 2850000, currency: "XOF", lastUpdate: "il y a 3j" },
  { id: "7", number: "OTCU-7821940", clientId: "C-001", type: "40ft", status: "en_transit", location: "Côte ouest-africaine", origin: "Singapour", destination: "Dakar", departureDate: "2026-04-18", arrivalDate: "2026-05-22", transport: "Maritime", shipping: "Evergreen", amount: 5100000, currency: "XOF", lastUpdate: "il y a 1h" },
  { id: "8", number: "OTCU-7821941", clientId: "C-003", type: "Reefer", status: "en_attente", location: "Port de Casablanca", origin: "Valence", destination: "Dakar", departureDate: "2026-05-10", arrivalDate: "2026-05-25", transport: "Maritime", amount: 3200000, currency: "XOF", lastUpdate: "il y a 4h" },
];

export const invoices: Invoice[] = [
  { id: "1", number: "INV-2026-0142", clientId: "C-001", containerId: "1", amount: 4850000, currency: "XOF", status: "paye", date: "2026-04-15" },
  { id: "2", number: "INV-2026-0143", clientId: "C-003", containerId: "2", amount: 2300000, currency: "XOF", status: "paye", date: "2026-04-02" },
  { id: "3", number: "INV-2026-0144", clientId: "C-002", containerId: "3", amount: 6200000, currency: "XOF", status: "en_attente", date: "2026-04-28" },
  { id: "4", number: "INV-2026-0145", clientId: "C-005", containerId: "4", amount: 3950000, currency: "XOF", status: "en_attente", date: "2026-04-30" },
  { id: "5", number: "INV-2026-0146", clientId: "C-004", containerId: "5", amount: 5400000, currency: "XOF", status: "retard", date: "2026-04-10" },
  { id: "6", number: "INV-2026-0147", clientId: "C-006", containerId: "6", amount: 2850000, currency: "XOF", status: "paye", date: "2026-03-28" },
];

export const deliveryRequests: DeliveryRequest[] = [
  { id: "1", clientId: "C-001", containerId: "1", destination: "Zone Industrielle de Pikine, Dakar", status: "validee", requestedDate: "2026-05-02" },
  { id: "2", clientId: "C-003", containerId: "2", destination: "Entrepôt Rufisque", status: "livree", requestedDate: "2026-04-28" },
  { id: "3", clientId: "C-002", containerId: "3", destination: "Thiès — Site Client", status: "en_attente", requestedDate: "2026-05-04" },
  { id: "4", clientId: "C-005", containerId: "4", destination: "Saint-Louis — Dépôt", status: "en_attente", requestedDate: "2026-05-05" },
  { id: "5", clientId: "C-006", containerId: "6", destination: "Bamako — Mali", status: "livree", requestedDate: "2026-04-20" },
];

export const notifications: Notification[] = [
  { id: "1", type: "urgent", title: "Retard douane détecté", message: "Le conteneur OTCU-7821938 est bloqué en douane à Casablanca depuis 12h.", date: "il y a 12 min", read: false },
  { id: "2", type: "info", title: "Arrivée prévue dans 3 jours", message: "OTCU-7821937 arrive à Dakar le 12/05/2026.", date: "il y a 1h", read: false },
  { id: "3", type: "info", title: "Nouvelle demande de livraison", message: "Mamadou Diop a soumis une demande pour OTCU-7821934.", date: "il y a 2h", read: false },
  { id: "4", type: "system", title: "Sauvegarde terminée", message: "Sauvegarde quotidienne réalisée avec succès.", date: "il y a 6h", read: true },
  { id: "5", type: "urgent", title: "Facture en retard", message: "INV-2026-0146 est en retard de paiement (15 jours).", date: "il y a 1j", read: true },
];

export const activityData = [
  { day: "Lun", containers: 12, deliveries: 8 },
  { day: "Mar", containers: 18, deliveries: 11 },
  { day: "Mer", containers: 15, deliveries: 14 },
  { day: "Jeu", containers: 22, deliveries: 17 },
  { day: "Ven", containers: 28, deliveries: 21 },
  { day: "Sam", containers: 14, deliveries: 9 },
  { day: "Dim", containers: 8, deliveries: 5 },
];

export const formatXOF = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

export const statusLabel: Record<ContainerStatus, string> = {
  en_transit: "En transit",
  livre: "Livré",
  en_attente: "En attente",
  incident: "Incident",
};

export const getClient = (id: string) => clients.find(c => c.id === id);
export const getContainer = (id: string) => containers.find(c => c.id === id);
