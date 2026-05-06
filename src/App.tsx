import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import SiteLayout from "@/components/SiteLayout";
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
import Home from "./pages/site/Home";
import Services from "./pages/site/Services";
import About from "./pages/site/About";
import Contact from "./pages/site/Contact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<SiteLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/admin" element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="conteneurs" element={<Containers />} />
            <Route path="conteneurs/nouveau" element={<NewContainer />} />
            <Route path="conteneurs/:id" element={<ContainerDetail />} />
            <Route path="clients" element={<Clients />} />
            <Route path="facturation" element={<Invoices />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="livraisons" element={<Deliveries />} />
            <Route path="parametres" element={<SettingsPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
