import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Containers from "./pages/Containers";
import NewContainer from "./pages/NewContainer";
import ContainerDetail from "./pages/ContainerDetail";
import Clients from "./pages/Clients";
import Invoices from "./pages/Invoices";
import Notifications from "./pages/Notifications";
import Deliveries from "./pages/Deliveries";
import SettingsPage from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/conteneurs" element={<Containers />} />
            <Route path="/conteneurs/nouveau" element={<NewContainer />} />
            <Route path="/conteneurs/:id" element={<ContainerDetail />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/facturation" element={<Invoices />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/livraisons" element={<Deliveries />} />
            <Route path="/parametres" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
