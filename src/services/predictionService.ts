/**
 * Servicio de predicciones.
 *
 * Contiene llamadas al backend para generar predicciones con IA/ML
 * y para gestionar el historial de predicciones guardadas.
 */

import {
  API_ENDPOINTS,
  getAuthHeaders,
  getJsonHeaders,
  handleApiResponse,
} from "./api";

export interface MatchRequest {
  local: string;
  visitante: string;
}

export interface PredictRequest {
  partidos: MatchRequest[];
}

export interface MatchPrediction {
  local: string;
  visitante: string;
  recomendacion: string;
  explicacion?: string;
  probabilidades?: Record<string, number>;
  confianza?: number;
}

export interface PredictResponse {
  resultado?: MatchPrediction[];
  predictions?: MatchPrediction[];
  explicacion_general?: string;
  model_used?: string;
}

export interface PredictionMatchCreate {
  home_team: string;
  away_team: string;
  predicted_result: "1" | "X" | "2";
  home_win_probability?: number | null;
  draw_probability?: number | null;
  away_win_probability?: number | null;
  confidence?: number | null;
}

export interface PredictionCreateRequest {
  title: string;
  model_used: string;
  global_confidence?: number | null;
  ai_explanation?: string | null;
  matches: PredictionMatchCreate[];
}

export interface PredictionMatchResponse {
  id: number;
  home_team: string;
  away_team: string;
  predicted_result: string;
  home_win_probability: string | number | null;
  draw_probability: string | number | null;
  away_win_probability: string | number | null;
  confidence: string | number | null;
  created_at: string;
}

export interface PredictionResponse {
  id: number;
  title: string;
  model_used: string;
  global_confidence: string | number | null;
  ai_explanation: string | null;
  created_at: string;
  updated_at: string;
  matches: PredictionMatchResponse[];
}

export interface PredictionSummary {
  id: number;
  title: string;
  model_used: string;
  global_confidence: string | number | null;
  created_at: string;
  total_matches: number;
}

/**
 * Genera una predicción de quiniela.
 *
 * El parámetro mode permite elegir el modelo del backend:
 * classic, ml, rf, poisson o ensemble.
 */
export async function generatePrediction(
  data: PredictRequest,
  mode: "classic" | "ml" | "rf" | "poisson" | "ensemble" = "ensemble"
): Promise<PredictResponse> {
  const response = await fetch(`${API_ENDPOINTS.predict}?mode=${mode}`, {
    method: "POST",
    headers: getJsonHeaders(),
    body: JSON.stringify(data),
  });

  return handleApiResponse<PredictResponse>(response);
}

/**
 * Guarda una predicción en el historial del usuario autenticado.
 */
export async function savePrediction(
  data: PredictionCreateRequest
): Promise<PredictionResponse> {
  const response = await fetch(API_ENDPOINTS.predictions.base, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  return handleApiResponse<PredictionResponse>(response);
}

/**
 * Obtiene el historial de predicciones del usuario autenticado.
 */
export async function getMyPredictions(): Promise<PredictionSummary[]> {
  const response = await fetch(API_ENDPOINTS.predictions.me, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleApiResponse<PredictionSummary[]>(response);
}

/**
 * Obtiene el detalle de una predicción guardada.
 */
export async function getPredictionDetail(
  predictionId: number
): Promise<PredictionResponse> {
  const response = await fetch(API_ENDPOINTS.predictions.detail(predictionId), {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleApiResponse<PredictionResponse>(response);
}

/**
 * Elimina una predicción guardada.
 */
export async function deletePrediction(
  predictionId: number
): Promise<{ message: string }> {
  const response = await fetch(API_ENDPOINTS.predictions.detail(predictionId), {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleApiResponse<{ message: string }>(response);
}