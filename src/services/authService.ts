/**
 * Servicio de autenticación.
 *
 * Contiene las llamadas al backend para registrar usuarios,
 * iniciar sesión y obtener el usuario autenticado.
 */

import {
  API_ENDPOINTS,
  getAuthHeaders,
  getJsonHeaders,
  handleApiResponse,
  removeToken,
  saveToken,
} from "./api";

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  full_name?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  full_name: string | null;
  role: string;
  is_active: boolean;
}

export interface UserStats {
  total_predictions: number;
  total_favorites: number;
  last_prediction_date: string | null;
}

/**
 * Registra un usuario nuevo en el backend.
 */
export async function registerUser(data: RegisterRequest): Promise<AuthUser> {
  const response = await fetch(API_ENDPOINTS.auth.register, {
    method: "POST",
    headers: getJsonHeaders(),
    body: JSON.stringify(data),
  });

  return handleApiResponse<AuthUser>(response);
}

/**
 * Inicia sesión, guarda el token JWT y devuelve la respuesta del backend.
 */
export async function loginUser(data: LoginRequest): Promise<TokenResponse> {
  const response = await fetch(API_ENDPOINTS.auth.login, {
    method: "POST",
    headers: getJsonHeaders(),
    body: JSON.stringify(data),
  });

  const tokenData = await handleApiResponse<TokenResponse>(response);
  saveToken(tokenData.access_token);

  return tokenData;
}

/**
 * Obtiene el usuario autenticado usando el token guardado.
 */
export async function getCurrentUser(): Promise<AuthUser> {
  const response = await fetch(API_ENDPOINTS.auth.me, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleApiResponse<AuthUser>(response);
}

/**
 * Obtiene estadísticas básicas del usuario autenticado.
 */
export async function getCurrentUserStats(): Promise<UserStats> {
  const response = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8000"}/api/users/me/stats`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  return handleApiResponse<UserStats>(response);
}

/**
 * Cierra la sesión local del usuario.
 */
export function logoutUser(): void {
  removeToken();
}