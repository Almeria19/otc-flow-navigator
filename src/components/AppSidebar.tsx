import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Container, Plus, Users, Receipt, Bell, Truck, Settings, Anchor,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, SidebarFooter, useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Conteneurs", url: "/admin/conteneurs", icon: Container },
  { title: "Nouveau conteneur", url: "/admin/conteneurs/nouveau", icon: Plus, accent: true },
  { title: "Clients", url: "/admin/clients", icon: Users },
  { title: "Facturation", url: "/admin/facturation", icon: Receipt },
  { title: "Notifications", url: "/admin/notifications", icon: Bell, badge: 3 },
  { title: "Demandes de livraison", url: "/admin/livraisons", icon: Truck },
];

const bottomItems = [
  { title: "Paramètres", url: "/admin/parametres", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const isActive = (path: string) => path === "/admin" ? pathname === "/admin" : pathname.startsWith(path);

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2.5 px-2 py-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow shrink-0">
            <Anchor className="h-5 w-5 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-sidebar-foreground">OTC Admin</span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Logistics Platform</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                    <NavLink to={item.url} end={item.url === "/admin"}>
                      <item.icon className={item.accent ? "text-primary" : ""} />
                      <span className={item.accent ? "text-primary font-medium" : ""}>{item.title}</span>
                      {item.badge && !collapsed && (
                        <span className="ml-auto h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                          {item.badge}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          {bottomItems.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton asChild isActive={isActive(item.url)} tooltip={item.title}>
                <NavLink to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        {!collapsed && (
          <div className="px-2 py-2 mt-1 flex items-center gap-2 rounded-lg hover:bg-sidebar-accent transition-colors cursor-pointer">
            <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
              AD
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-sidebar-foreground truncate">Admin OTC</span>
              <span className="text-[10px] text-muted-foreground truncate">admin@otc.sn</span>
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
