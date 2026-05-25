/**
 * Configuración base para llamadas al backend de Aquinielator.
 *
 * Este archivo centraliza la URL de la API y funciones comunes
 * para hacer peticiones HTTP con fetch.
 */

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const API_ENDPOINTS = {
  root: `${API_URL}/`,
  health: `${API_URL}/health`,
  info: `${API_URL}/api/info`,

  auth: {
    register: `${API_URL}/api/auth/register`,
    login: `${API_URL}/api/auth/login`,
    me: `${API_URL}/api/auth/me`,
  },

  teams: `${API_URL}/api/teams`,
  predict: `${API_URL}/api/predict`,

  predictions: {
    base: `${API_URL}/api/predictions`,
    me: `${API_URL}/api/predictions/me`,
    detail: (id: number) => `${API_URL}/api/predictions/${id}`,
  },

  favorites: {
    me: `${API_URL}/api/favorites/me`,
    byPrediction: (predictionId: number) =>
      `${API_URL}/api/favorites/${predictionId}`,
  },
};

/**
 * Guarda el token JWT en localStorage.
 */
export function saveToken(token: string): void {
  localStorage.setItem("aquinielator_token", token);
}

/**
 * Obtiene el token JWT guardado en localStorage.
 */
export function getToken(): string | null {
  return localStorage.getItem("aquinielator_token");
}

/**
 * Elimina el token JWT guardado.
 */
export function removeToken(): void {
  localStorage.removeItem("aquinielator_token");
}

/**
 * Devuelve las cabeceras comunes para peticiones JSON.
 */
export function getJsonHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
  };
}

/**
 * Devuelve las cabeceras para endpoints protegidos con JWT.
 */
export function getAuthHeaders(): HeadersInit {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

/**
 * Procesa una respuesta fetch y lanza error si la API devuelve error.
 */
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = "Error en la petición al servidor.";

    try {
      const errorData = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}