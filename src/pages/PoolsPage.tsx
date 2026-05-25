import { AppLayout } from "@/components/layout/AppLayout";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuButton } from "@/components/ui/NeuButton";
import { NeuBadge } from "@/components/ui/NeuBadge";
import { useToast } from "@/hooks/use-toast";
import { getTeams, Team } from "@/services/teamService";
import {
  deletePrediction,
  generatePrediction,
  getMyPredictions,
  MatchPrediction,
  PredictionSummary,
  savePrediction,
} from "@/services/predictionService";
import { addFavorite } from "@/services/favoriteService";
import { getToken } from "@/services/api";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Calendar,
  Heart,
  Loader2,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";

type MatchFormRow = {
  id: string;
  local: string;
  visitante: string;
};

const createEmptyMatch = (): MatchFormRow => ({
  id: crypto.randomUUID(),
  local: "",
  visitante: "",
});

/**
 * Convierte una probabilidad del backend a porcentaje.
 * El backend suele devolver valores entre 0 y 1, pero la BBDD guarda 0-100.
 */
function toPercent(value: number | undefined): number | null {
  if (value === undefined || value === null) {
    return null;
  }

  return value <= 1 ? Math.round(value * 10000) / 100 : value;
}

/**
 * Obtiene la confianza de una predicción usando la probabilidad
 * de la recomendación elegida.
 */
function getPredictionConfidence(prediction: MatchPrediction): number | null {
  const probabilities = prediction.probabilidades;

  if (!probabilities) {
    return null;
  }

  const value = probabilities[prediction.recomendacion];

  return toPercent(value);
}

function PoolBuilder({
  teams,
  onPredictionSaved,
}: {
  teams: Team[];
  onPredictionSaved: () => void;
}) {
  const [title, setTitle] = useState("Quiniela generada con IA");
  const [matches, setMatches] = useState<MatchFormRow[]>([
    createEmptyMatch(),
  ]);
  const [results, setResults] = useState<MatchPrediction[]>([]);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { toast } = useToast();

  const selectedMatches = useMemo(
    () =>
      matches.filter(
        (match) =>
          match.local.trim() !== "" &&
          match.visitante.trim() !== "" &&
          match.local !== match.visitante
      ),
    [matches]
  );

  const averageConfidence = useMemo(() => {
    if (results.length === 0) {
      return null;
    }

    const confidences = results
      .map((prediction) => getPredictionConfidence(prediction))
      .filter((value): value is number => value !== null);

    if (confidences.length === 0) {
      return null;
    }

    const total = confidences.reduce((acc, value) => acc + value, 0);

    return Math.round((total / confidences.length) * 100) / 100;
  }, [results]);

  /**
   * Añade una nueva fila para que el usuario pueda crear otro partido.
   */
  const addMatchRow = () => {
    setMatches((current) => [...current, createEmptyMatch()]);
  };

  /**
   * Elimina una fila de partido del formulario.
   */
  const removeMatchRow = (id: string) => {
    setMatches((current) => {
      if (current.length === 1) {
        return current;
      }

      return current.filter((match) => match.id !== id);
    });
  };

  /**
   * Actualiza el equipo local o visitante de una fila.
   */
  const updateMatch = (
    id: string,
    field: "local" | "visitante",
    value: string
  ) => {
    setMatches((current) =>
      current.map((match) =>
        match.id === id ? { ...match, [field]: value } : match
      )
    );

    setResults([]);
  };

  /**
   * Llama al backend para generar la predicción real.
   *
   * Endpoint usado:
   * POST /api/predict?mode=ensemble
   */
  const handleGeneratePrediction = async () => {
    if (selectedMatches.length === 0) {
      toast({
        title: "Añade partidos válidos",
        description:
          "Selecciona al menos un equipo local y visitante distinto.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsPredicting(true);

      const response = await generatePrediction(
        {
          partidos: selectedMatches.map((match) => ({
            local: match.local,
            visitante: match.visitante,
          })),
        },
        "ensemble"
      );

      setResults(response.resultado || response.predictions || []);

      toast({
        title: "Predicción generada",
        description: "La IA ha calculado la quiniela correctamente.",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo generar la predicción.";

      toast({
        title: "Error generando predicción",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsPredicting(false);
    }
  };

  /**
   * Guarda la quiniela generada en MySQL asociada al usuario autenticado.
   *
   * Endpoint usado:
   * POST /api/predictions
   */
  const handleSavePrediction = async () => {
    if (!getToken()) {
      toast({
        title: "Inicia sesión",
        description: "Debes iniciar sesión para guardar la quiniela.",
        variant: "destructive",
      });
      return;
    }

    if (results.length === 0) {
      toast({
        title: "Primero genera una predicción",
        description:
          "No hay resultados para guardar todavía.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSaving(true);

      await savePrediction({
        title,
        model_used: "ensemble",
        global_confidence: averageConfidence,
        ai_explanation:
          "Predicción generada desde el frontend con equipos seleccionados por el usuario.",
        matches: results.map((prediction) => ({
          home_team: prediction.local,
          away_team: prediction.visitante,
          predicted_result: prediction.recomendacion as "1" | "X" | "2",
          home_win_probability: toPercent(prediction.probabilidades?.["1"]),
          draw_probability: toPercent(prediction.probabilidades?.["X"]),
          away_win_probability: toPercent(prediction.probabilidades?.["2"]),
          confidence: getPredictionConfidence(prediction),
        })),
      });

      toast({
        title: "Quiniela guardada",
        description: "La predicción se ha guardado en tu historial.",
      });

      onPredictionSaved();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo guardar la quiniela.";

      toast({
        title: "Error guardando quiniela",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <NeuCard glow="primary" className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-display font-bold text-lg">
              Constructor de quiniela real
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Selecciona partidos con los 20 equipos cargados desde MySQL.
            </p>
          </div>

          <NeuBadge variant="info">
            {teams.length} equipos disponibles
          </NeuBadge>
        </div>

        <div>
          <label className="text-xs text-muted-foreground">
            Nombre de la quiniela
          </label>
          <input
            className="neu-inset w-full mt-2 px-4 py-3 rounded-xl bg-background text-sm outline-none"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Ej: Quiniela jornada 1"
          />
        </div>
      </NeuCard>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {matches.map((match, index) => (
            <NeuCard key={match.id} className="p-4">
              <div className="flex items-center justify-between gap-3 mb-4">
                <h3 className="font-display font-semibold">
                  Partido {index + 1}
                </h3>

                <NeuButton
                  variant="ghost"
                  size="sm"
                  onClick={() => removeMatchRow(match.id)}
                  disabled={matches.length === 1}
                >
                  <X className="w-4 h-4 mr-1 inline" />
                  Quitar
                </NeuButton>
              </div>

              <div className="grid md:grid-cols-[1fr_auto_1fr] gap-3 items-center">
                <select
                  className="neu-inset w-full px-4 py-3 rounded-xl bg-background text-sm outline-none"
                  value={match.local}
                  onChange={(event) =>
                    updateMatch(match.id, "local", event.target.value)
                  }
                >
                  <option value="">Equipo local</option>
                  {teams.map((team) => (
                    <option key={`local-${team.id}`} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>

                <span className="text-xs text-muted-foreground text-center">
                  VS
                </span>

                <select
                  className="neu-inset w-full px-4 py-3 rounded-xl bg-background text-sm outline-none"
                  value={match.visitante}
                  onChange={(event) =>
                    updateMatch(match.id, "visitante", event.target.value)
                  }
                >
                  <option value="">Equipo visitante</option>
                  {teams.map((team) => (
                    <option key={`away-${team.id}`} value={team.name}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              {match.local && match.visitante && match.local === match.visitante && (
                <p className="text-xs text-destructive mt-3">
                  El equipo local y visitante no pueden ser el mismo.
                </p>
              )}
            </NeuCard>
          ))}

          <NeuButton variant="default" onClick={addMatchRow}>
            <Plus className="w-4 h-4 mr-2 inline" />
            Añadir partido
          </NeuButton>
        </div>

        <div className="lg:sticky lg:top-24 self-start">
          <NeuCard glow="primary" className="p-5 space-y-4">
            <h3 className="font-display font-bold text-foreground">
              Resumen
            </h3>

            <div className="space-y-3">
              <div className="neu-inset p-3 rounded-lg flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Partidos válidos
                </span>
                <span className="font-display font-bold">
                  {selectedMatches.length}
                </span>
              </div>

              <div className="neu-inset p-3 rounded-lg flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Modelo
                </span>
                <NeuBadge variant="info">Ensemble</NeuBadge>
              </div>

              <div className="neu-inset p-3 rounded-lg flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  Confianza media
                </span>
                <span className="font-display font-bold text-primary">
                  {averageConfidence !== null
                    ? `${averageConfidence}%`
                    : "Pendiente"}
                </span>
              </div>
            </div>

            <NeuButton
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleGeneratePrediction}
              disabled={isPredicting || selectedMatches.length === 0}
            >
              {isPredicting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />
                  Calculando...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4 mr-2 inline" />
                  Generar predicción
                </>
              )}
            </NeuButton>

            <NeuButton
              variant="default"
              size="lg"
              className="w-full"
              onClick={handleSavePrediction}
              disabled={isSaving || results.length === 0}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 inline animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2 inline" />
                  Guardar quiniela
                </>
              )}
            </NeuButton>
          </NeuCard>
        </div>
      </div>

      {results.length > 0 && (
        <NeuCard className="p-5 space-y-4">
          <div>
            <h2 className="font-display font-bold text-lg">
              Resultado de la predicción
            </h2>
            <p className="text-xs text-muted-foreground">
              Resultados devueltos por POST /api/predict
            </p>
          </div>

          <div className="grid gap-3">
            {results.map((prediction, index) => (
              <div
                key={`${prediction.local}-${prediction.visitante}-${index}`}
                className="neu-inset p-4 rounded-xl"
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <p className="font-display font-semibold">
                      {prediction.local} vs {prediction.visitante}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {prediction.explicacion}
                    </p>
                  </div>

                  <NeuBadge variant="success">
                    Recomendación: {prediction.recomendacion}
                  </NeuBadge>
                </div>

                {prediction.probabilidades && (
                  <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                    <div className="neu-inset p-2 rounded-lg">
                      <div className="font-display font-bold">
                        {toPercent(prediction.probabilidades["1"])}%
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        1
                      </div>
                    </div>

                    <div className="neu-inset p-2 rounded-lg">
                      <div className="font-display font-bold">
                        {toPercent(prediction.probabilidades["X"])}%
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        X
                      </div>
                    </div>

                    <div className="neu-inset p-2 rounded-lg">
                      <div className="font-display font-bold">
                        {toPercent(prediction.probabilidades["2"])}%
                      </div>
                      <div className="text-[10px] text-muted-foreground">
                        2
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </NeuCard>
      )}
    </div>
  );
}

export default function PoolsPage() {
  const [building, setBuilding] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);
  const [savedPredictions, setSavedPredictions] = useState<PredictionSummary[]>(
    []
  );
  const [isLoadingTeams, setIsLoadingTeams] = useState(true);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);

  const { toast } = useToast();

  /**
   * Carga los equipos reales desde MySQL.
   *
   * Endpoint usado:
   * GET /api/teams
   */
  const loadTeams = async () => {
    try {
      setIsLoadingTeams(true);
      const response = await getTeams();
      setTeams(response.equipos_detalle);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudieron cargar los equipos.";

      toast({
        title: "Error cargando equipos",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoadingTeams(false);
    }
  };

  /**
   * Carga el historial real del usuario autenticado.
   *
   * Endpoint usado:
   * GET /api/predictions/me
   */
  const loadHistory = async () => {
    if (!getToken()) {
      setSavedPredictions([]);
      setIsLoadingHistory(false);
      return;
    }

    try {
      setIsLoadingHistory(true);
      const predictions = await getMyPredictions();
      setSavedPredictions(predictions);
    } catch {
      setSavedPredictions([]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  useEffect(() => {
    loadTeams();
    loadHistory();
  }, []);

  /**
   * Elimina una quiniela guardada del historial.
   */
  const handleDeletePrediction = async (predictionId: number) => {
    try {
      await deletePrediction(predictionId);

      toast({
        title: "Quiniela eliminada",
        description: "La predicción se ha eliminado del historial.",
      });

      loadHistory();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo eliminar la quiniela.";

      toast({
        title: "Error eliminando quiniela",
        description: message,
        variant: "destructive",
      });
    }
  };

  /**
   * Marca una quiniela guardada como favorita.
   */
  const handleAddFavorite = async (predictionId: number) => {
    try {
      await addFavorite(predictionId);

      toast({
        title: "Añadida a favoritos",
        description: "La quiniela ya aparece en tu sección de favoritos.",
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo añadir a favoritos.";

      toast({
        title: "No se pudo añadir",
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
            <h1 className="text-2xl font-display font-bold">Quinielas</h1>
            <p className="text-sm text-muted-foreground">
              Construye predicciones con equipos reales de LaLiga
            </p>
          </div>

          <NeuButton
            variant={building ? "ghost" : "primary"}
            onClick={() => setBuilding((current) => !current)}
          >
            {building ? (
              <>
                <X className="w-4 h-4 mr-2 inline" />
                Cerrar constructor
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2 inline" />
                Nueva quiniela
              </>
            )}
          </NeuButton>
        </div>

        <NeuCard className="p-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h2 className="font-display font-bold">
                Equipos disponibles
              </h2>
              <p className="text-xs text-muted-foreground">
                Cargados desde MySQL mediante GET /api/teams
              </p>
            </div>

            <NeuBadge variant="info">
              {isLoadingTeams ? "Cargando..." : `${teams.length} equipos`}
            </NeuBadge>
          </div>
        </NeuCard>

        {building && (
          <PoolBuilder teams={teams} onPredictionSaved={loadHistory} />
        )}

        <div>
          <div className="flex items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="font-display font-bold text-lg">
                Historial de quinielas
              </h2>
              <p className="text-xs text-muted-foreground">
                Predicciones guardadas en MySQL con tu usuario
              </p>
            </div>

            <NeuBadge variant="default">
              {savedPredictions.length} guardadas
            </NeuBadge>
          </div>

          {isLoadingHistory ? (
            <NeuCard className="p-5">
              <p className="text-sm text-muted-foreground">
                Cargando historial...
              </p>
            </NeuCard>
          ) : savedPredictions.length === 0 ? (
            <NeuCard className="p-5">
              <p className="text-sm text-muted-foreground">
                Todavía no tienes quinielas guardadas. Crea una nueva
                predicción y pulsa “Guardar quiniela”.
              </p>
            </NeuCard>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedPredictions.map((prediction, index) => (
                <motion.div
                  key={prediction.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <NeuCard className="p-5 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display font-semibold">
                        {prediction.title}
                      </span>

                      <NeuBadge variant="success">Guardada</NeuBadge>
                    </div>

                    <div className="text-xs text-muted-foreground flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(prediction.created_at).toLocaleString()}
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="neu-inset p-2 rounded-lg">
                        <div className="font-display font-bold text-foreground">
                          {prediction.total_matches}
                        </div>
                        <div className="text-[8px] text-muted-foreground">
                          Partidos
                        </div>
                      </div>

                      <div className="neu-inset p-2 rounded-lg">
                        <div className="font-display font-bold text-primary">
                          {prediction.global_confidence
                            ? `${prediction.global_confidence}%`
                            : "-"}
                        </div>
                        <div className="text-[8px] text-muted-foreground">
                          Confianza
                        </div>
                      </div>

                      <div className="neu-inset p-2 rounded-lg">
                        <NeuBadge variant="info" className="text-[8px]">
                          {prediction.model_used}
                        </NeuBadge>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => handleAddFavorite(prediction.id)}
                        className="neu-button p-2 rounded-lg text-muted-foreground hover:text-primary"
                        title="Añadir a favoritos"
                      >
                        <Heart className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeletePrediction(prediction.id)}
                        className="neu-button p-2 rounded-lg text-muted-foreground hover:text-destructive"
                        title="Eliminar quiniela"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </NeuCard>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}