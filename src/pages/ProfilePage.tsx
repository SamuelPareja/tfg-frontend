import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, LogOut, Mail, Shield, User } from "lucide-react";
import { motion } from "framer-motion";

import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { useToast } from "@/hooks/use-toast";
import {
  AuthUser,
  UserStats,
  getCurrentUser,
  getCurrentUserStats,
  logoutUser,
} from "@/services/authService";

export default function ProfilePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { toast } = useToast();

  /**
   * Carga los datos del usuario autenticado desde el backend.
   *
   * Endpoint usado:
   * GET /api/auth/me
   */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        const currentStats = await getCurrentUserStats();

        setUser(currentUser);
        setStats(currentStats);
      } catch {
        toast({
          title: "Sesión no válida",
          description: "Inicia sesión para ver tu perfil.",
          variant: "destructive",
        });

        navigate("/auth");
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [navigate, toast]);

  /**
   * Cierra la sesión local eliminando el token JWT.
   */
  const handleLogout = () => {
    logoutUser();

    toast({
      title: "Sesión cerrada",
      description: "Has salido correctamente de Aquinielator.",
    });

    navigate("/auth");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <NeuCard className="p-8">
          <p className="text-muted-foreground">Cargando perfil...</p>
        </NeuCard>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const displayName = user.full_name || user.username;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <NeuCard glow="primary" className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="neu-inset w-24 h-24 rounded-full flex items-center justify-center shrink-0">
              <User className="w-12 h-12 text-primary" />
            </div>

            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.3em] text-primary font-display mb-2">
                Perfil de usuario
              </p>

              <h1 className="font-display text-3xl font-bold text-foreground">
                {displayName}
              </h1>

              <p className="text-muted-foreground mt-1">
                @{user.username}
              </p>

              <div className="flex flex-wrap gap-3 mt-4">
                <div className="neu-inset rounded-xl px-4 py-2 flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>{user.email}</span>
                </div>

                <div className="neu-inset rounded-xl px-4 py-2 flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-accent" />
                  <span>Rol {user.role}</span>
                </div>

                <div className="neu-inset rounded-xl px-4 py-2 flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <span>Cuenta activa</span>
                </div>
              </div>
            </div>

            <NeuButton variant="ghost" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar sesión
            </NeuButton>
          </div>
        </NeuCard>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-4">
        <NeuCard className="p-5">
          <p className="text-sm text-muted-foreground">Quinielas guardadas</p>
          <p className="font-display text-xl font-bold mt-1">
            {stats?.total_predictions ?? 0}
          </p>
        </NeuCard>

        <NeuCard className="p-5">
          <p className="text-sm text-muted-foreground">Favoritos</p>
          <p className="font-display text-xl font-bold mt-1 text-primary">
            {stats?.total_favorites ?? 0}
          </p>
        </NeuCard>

        <NeuCard className="p-5">
          <p className="text-sm text-muted-foreground">Última quiniela</p>
          <p className="font-display text-sm font-bold mt-1">
            {stats?.last_prediction_date
              ? new Date(stats.last_prediction_date).toLocaleString()
              : "Sin quinielas"}
          </p>
        </NeuCard>
      </div>

      <NeuCard className="p-6">
        <h2 className="font-display text-xl font-bold mb-3">
          Información de la cuenta
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
            <span className="text-muted-foreground">ID de usuario</span>
            <span>{user.id}</span>
          </div>

          <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Nombre completo</span>
            <span>{user.full_name || "No indicado"}</span>
          </div>

          <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
            <span className="text-muted-foreground">Email</span>
            <span>{user.email}</span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Rol</span>
            <span>{user.role}</span>
          </div>
        </div>
      </NeuCard>
    </div>
  );
}