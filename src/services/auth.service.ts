// src/services/auth.service.ts
import { supabase } from "../lib/supabase";

/**
 * LOGIN
 * Autentica usuario con Supabase
 */
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  const user = data.user;

  // Obtener perfil (rol) desde tabla "profiles"
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user?.id)
    .single();

  if (profileError) {
    throw new Error("No se pudo obtener el perfil del usuario");
  }

  return {
    user,
    profile,
  };
};

/**
 * LOGOUT
 */
export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

/**
 * OBTENER USUARIO ACTUAL
 */
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;

  if (!data.user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", data.user.id)
    .single();

  return {
    user: data.user,
    profile,
  };
};

/**
 * VERIFICAR SESIÓN
 */
export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
};
