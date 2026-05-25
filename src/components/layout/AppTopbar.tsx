import { Bell, Search, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Trophy, Target, Briefcase, BarChart3, Medal,
  Star, User, Shield
} from "lucide-react";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Partidos", path: "/matches", icon: Trophy },
  { title: "Quinielas", path: "/pools", icon: Target },
  { title: "Cartera IA", path: "/portfolio", icon: Briefcase },
  { title: "Estadísticas", path: "/stats", icon: BarChart3 },
  { title: "Ranking", path: "/ranking", icon: Medal },
  { title: "Favoritos", path: "/favorites", icon: Star },
  { title: "Perfil", path: "/profile", icon: User },
  { title: "Admin", path: "/admin", icon: Shield },
];

export function AppTopbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button className="md:hidden text-muted-foreground" onClick={() => setMobileOpen(true)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="md:hidden">
            <span className="font-display font-bold text-lg text-foreground">Quin<span className="text-primary">IA</span></span>
          </div>
          <div className="hidden md:flex items-center neu-inset rounded-lg px-3 py-2 w-72">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full" placeholder="Buscar equipos, partidos..." />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="neu-button p-2.5 rounded-lg relative">
            <Bell className="w-4 h-4 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full text-[8px] font-bold flex items-center justify-center text-primary-foreground">3</span>
          </button>
          <Link to="/profile" className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center text-sm font-display font-bold text-primary">
            U
          </Link>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-sidebar border-r border-border/50 p-4 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <span className="font-display font-bold text-lg">Quin<span className="text-primary">IA</span></span>
              <button onClick={() => setMobileOpen(false)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
