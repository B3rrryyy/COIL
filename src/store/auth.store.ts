import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { User, UserRole } from '../types/auth.types'
import { tokenStorage, TOKEN_KEY } from '../api/client'

interface AuthStore {
  // ── State ────────────────────────────────────────────────────────────────
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null

  // ── Actions ──────────────────────────────────────────────────────────────
  setSession: (user: User, token: string) => void
  setUser: (user: User) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearSession: () => void

  // ── Selectors ─────────────────────────────────────────────────────────────
  hasRole: (...roles: UserRole[]) => boolean
  isAdmin: () => boolean
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // ── Initial state ──────────────────────────────────────────────────
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // ── Actions ────────────────────────────────────────────────────────
      setSession: (user, token) => {
        tokenStorage.set(token) // sync to localStorage for axios interceptor
        set({ user, token, isAuthenticated: true, error: null })
      },

      setUser: (user) => set({ user }),

      setLoading: (isLoading) => set({ isLoading }),

      setError: (error) => set({ error }),

      clearSession: () => {
        tokenStorage.clear()
        set({ user: null, token: null, isAuthenticated: false, error: null })
      },

      // ── Selectors ──────────────────────────────────────────────────────
      hasRole: (...roles) => {
        const { user } = get()
        return !!user && roles.includes(user.rol)
      },

      isAdmin: () => get().user?.rol === 'admin',
    }),
    {
      name: 'vial-auth',
      storage: createJSONStorage(() => localStorage),
      // Only persist user and token — recompute isAuthenticated from token
      partialize: (state) => ({
        user:  state.user,
        token: state.token,
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          state.isAuthenticated = true
          // Sync token to the plain localStorage key used by axios
          tokenStorage.set(state.token)
        }
      },
    },
  ),
)

export default useAuthStore