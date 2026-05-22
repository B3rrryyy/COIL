// src/services/authService.js
// Servicio de autenticación para el frontend React

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

/**
 * Inicia sesión en el sistema COIL.
 * @param {string} correo
 * @param {string} password
 * @param {string} rol  - "usuario" | "administrador"
 * @returns {Promise<{ access_token, rol, nombre, correo, mensaje }>}
 */
export async function login(correo, password, rol) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, password, rol }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Error al iniciar sesión.");
  }

  // Guardar token y datos en sessionStorage
  sessionStorage.setItem("access_token", data.access_token);
  sessionStorage.setItem("rol", data.rol);
  sessionStorage.setItem("nombre", data.nombre || "");
  sessionStorage.setItem("correo", data.correo);

  return data;
}

/**
 * Cierra la sesión del usuario.
 */
export async function logout() {
  await fetch(`${API_URL}/auth/logout`, { method: "POST" });
  sessionStorage.clear();
  window.location.href = "/login";
}

/**
 * Devuelve el token guardado.
 */
export function getToken() {
  return sessionStorage.getItem("access_token");
}

/**
 * Devuelve el rol del usuario actual.
 * @returns {"usuario" | "administrador" | null}
 */
export function getRol() {
  return sessionStorage.getItem("rol");
}

/**
 * Verifica si el usuario está autenticado.
 */
export function isAuthenticated() {
  return Boolean(sessionStorage.getItem("access_token"));
}

/**
 * Retorna headers con Authorization para llamadas autenticadas.
 */
export function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}
