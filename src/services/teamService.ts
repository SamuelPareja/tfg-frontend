/**
 * Servicio de equipos.
 *
 * Obtiene desde el backend los equipos guardados en MySQL.
 */

import { API_ENDPOINTS, handleApiResponse } from "./api";

export interface Team {
  id: number;
  name: string;
  stats_name: string;
  csv_name: string;
  short_name: string | null;
  league: string | null;
  country: string | null;
}

export interface TeamsResponse {
  equipos: string[];
  equipos_detalle: Team[];
}

/**
 * Obtiene todos los equipos disponibles.
 */
export async function getTeams(): Promise<TeamsResponse> {
  const response = await fetch(API_ENDPOINTS.teams);

  return handleApiResponse<TeamsResponse>(response);
}