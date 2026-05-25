import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Trophy, Target, Briefcase, BarChart3, Medal,
  Star, User, Shield, ChevronLeft, ChevronRight
} from "lucide-react";
import { useState } from "react";

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

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      "hidden md:flex flex-col h-screen sticky top-0 transition-all duration-300 border-r border-border/50",
      collapsed ? "w-16" : "w-56",
      "bg-sidebar"
    )}>
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-border/50">
        <Link to="/dashboard" className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-primary font-display font-bold text-sm">Q</span>
          </div>
          {!collapsed && <span className="font-display font-bold text-lg text-foreground">Quin<span className="text-primary">IA</span></span>}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                active
                  ? "neu-card-sm text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", active && "text-primary")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-12 flex items-center justify-center border-t border-border/50 text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
