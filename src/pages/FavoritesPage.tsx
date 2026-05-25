import { AppLayout } from "@/components/layout/AppLayout";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuBadge } from "@/components/ui/NeuBadge";
import { NeuButton } from "@/components/ui/NeuButton";
import { useToast } from "@/hooks/use-toast";
import {
  FavoritePrediction,
  getMyFavorites,
  removeFavorite,
} from "@/services/favoriteService";
import { getToken } from "@/services/api";
import { Calendar, Heart, LogIn, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoritePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { toast } = useToast();

  /**
   * Carga desde el backend las quinielas favoritas del usuario autenticado.
   *
   * Endpoint usado:
   * GET /api/favorites/me
   */
  const loadFavorites = async () => {
    if (!getToken()) {
      setFavorites([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await getMyFavorites();
      setFavorites(response);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudieron cargar los favoritos.";

      toast({
        title: "Error cargando favoritos",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

    /**
   * Al entrar en la página, carga los favoritos reales del usuario.
   */
  useEffect(() => {
    loadFavorites();
  }, []);

  /**
   * Elimina una quiniela de favoritos sin borrar la predicción original.
   *
   * Endpoint usado:
   * DELETE /api/favorites/{prediction_id}
   */
  const handleRemoveFavorite = async (predictionId: number) => {
    try {
      await removeFavorite(predictionId);

      toast({
        title: "Favorito eliminado",
        description: "La quiniela se ha quitado de favoritos.",
      });

      loadFavorites();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo eliminar el favorito.";

      toast({
        title: "Error eliminando favorito",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-display font-bold">Favoritos</h1>
            <p className="text-sm text-muted-foreground">
              Quinielas guardadas como favoritas desde tu historial
            </p>
          </div>

          <NeuBadge variant="info">
            {isLoading ? "Cargando..." : `${favorites.length} favoritas`}
          </NeuBadge>
        </div>

        {!getToken() && (
          <NeuCard glow="primary" className="p-6 text-center">
            <div className="neu-inset w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4">
              <LogIn className="w-7 h-7 text-primary" />
            </div>

            <h2 className="font-display font-bold text-lg">
              Inicia sesión para ver tus favoritos
            </h2>

            <p className="text-sm text-muted-foreground mt-2 mb-4">
              Tus quinielas favoritas se guardan asociadas a tu cuenta.
            </p>

            <Link to="/auth">
              <NeuButton variant="primary">Ir a login</NeuButton>
            </Link>
          </NeuCard>
        )}

        {getToken() && isLoading && (
          <NeuCard className="p-5">
            <p className="text-sm text-muted-foreground">
              Cargando favoritos...
            </p>
          </NeuCard>
        )}

        {getToken() && !isLoading && favorites.length === 0 && (
          <NeuCard glow="primary" className="p-6 text-center">
            <div className="neu-inset w-14 h-14 mx-auto rounded-full flex items-center justify-center mb-4">
              <Heart className="w-7 h-7 text-primary" />
            </div>

            <h2 className="font-display font-bold text-lg">
              Todavía no tienes favoritos
            </h2>

            <p className="text-sm text-muted-foreground mt-2 mb-4">
              Crea una quiniela en la sección Quinielas y pulsa el corazón
              para guardarla aquí.
            </p>

            <Link to="/pools">
              <NeuButton variant="primary">Crear quiniela</NeuButton>
            </Link>
          </NeuCard>
        )}

        {getToken() && !isLoading && favorites.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((favorite, index) => (
              <motion.div
                key={favorite.favorite_id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NeuCard glow="primary" className="p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display font-bold text-lg">
                        {favorite.title}
                      </h2>

                      <p className="text-xs text-muted-foreground mt-1">
                        Predicción #{favorite.prediction_id}
                      </p>
                    </div>

                    <NeuBadge variant="success">Favorita</NeuBadge>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="neu-inset p-3 rounded-lg">
                      <p className="font-display font-bold text-lg">
                        {favorite.total_matches}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Partidos
                      </p>
                    </div>

                    <div className="neu-inset p-3 rounded-lg">
                      <p className="font-display font-bold text-lg text-primary">
                        {favorite.global_confidence
                          ? `${favorite.global_confidence}%`
                          : "-"}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Confianza
                      </p>
                    </div>

                    <div className="neu-inset p-3 rounded-lg">
                      <p className="font-display font-bold text-xs">
                        {favorite.model_used}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Modelo
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      Creada:{" "}
                      {new Date(favorite.created_at).toLocaleString()}
                    </div>

                    <div className="flex items-center gap-2">
                      <Heart className="w-3.5 h-3.5 text-primary" />
                      Favorita desde:{" "}
                      {new Date(
                        favorite.favorite_created_at
                      ).toLocaleString()}
                    </div>
                  </div>

                  <NeuButton
                    variant="ghost"
                    className="w-full"
                    onClick={() =>
                      handleRemoveFavorite(favorite.prediction_id)
                    }
                  >
                    <Trash2 className="w-4 h-4 mr-2 inline" />
                    Quitar de favoritos
                  </NeuButton>
                </NeuCard>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}