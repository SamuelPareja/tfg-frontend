/**
 * Servicio de favoritos.
 *
 * Gestiona las predicciones favoritas del usuario autenticado.
 */

import { API_ENDPOINTS, getAuthHeaders, handleApiResponse } from "./api";

export interface FavoritePrediction {
  favorite_id: number;
  prediction_id: number;
  title: string;
  model_used: string;
  global_confidence: string | number | null;
  created_at: string;
  favorite_created_at: string;
  total_matches: number;
}

/**
 * Marca una predicción como favorita.
 */
export async function addFavorite(
  predictionId: number
): Promise<FavoritePrediction> {
  const response = await fetch(API_ENDPOINTS.favorites.byPrediction(predictionId), {
    method: "POST",
    headers: getAuthHeaders(),
  });

  return handleApiResponse<FavoritePrediction>(response);
}

/**
 * Obtiene las predicciones favoritas del usuario.
 */
export async function getMyFavorites(): Promise<FavoritePrediction[]> {
  const response = await fetch(API_ENDPOINTS.favorites.me, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleApiResponse<FavoritePrediction[]>(response);
}

/**
 * Elimina una predicción de favoritos.
 */
export async function removeFavorite(
  predictionId: number
): Promise<{ message: string }> {
  const response = await fetch(API_ENDPOINTS.favorites.byPrediction(predictionId), {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return handleApiResponse<{ message: string }>(response);
}