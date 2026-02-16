import type { UserDto } from '@/lib/api/grimoire_svc'
import { jwtDecode } from 'jwt-decode'
const STORAGE_PREFIX = 'grimoire_'

type JwtPayload = {
  exp: number
}

// Define keys to prevent typos
const KEYS = {
  TOKEN: `${STORAGE_PREFIX}access_token`,
  REFRESH_TOKEN: `${STORAGE_PREFIX}refresh_token`,
  USER: `${STORAGE_PREFIX}user`,
  TOKEN_EXP_TIME: `${STORAGE_PREFIX}access_token_exp_time`,
  TOKEN_EXP_TIME_STR: `${STORAGE_PREFIX}access_token_exp_time_str`,
} as const

export const storage = {
  // --- Token Operations ---
  getToken: (): string | null => {
    return localStorage.getItem(KEYS.TOKEN)
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(KEYS.REFRESH_TOKEN)
  },

  getTokenExpireTime: (): number | null => {
    const exp = localStorage.getItem(KEYS.TOKEN_EXP_TIME)
    return exp ? Number(exp) : null
  },

  setToken: (token: string, refreshToken: string) => {
    localStorage.setItem(KEYS.TOKEN, token)
    const decoded = jwtDecode<JwtPayload>(token)
    localStorage.setItem(KEYS.TOKEN_EXP_TIME, decoded.exp.toString())
    localStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken)
    localStorage.setItem(
      KEYS.TOKEN_EXP_TIME_STR,
      new Date(decoded.exp * 1000).toString()
    )
  },

  removeToken: () => {
    localStorage.removeItem(KEYS.TOKEN)
    localStorage.removeItem(KEYS.TOKEN_EXP_TIME)
    localStorage.removeItem(KEYS.REFRESH_TOKEN)
  },

  // --- User Operations ---
  getUser: (): UserDto | null => {
    const userStr = localStorage.getItem(KEYS.USER)
    if (!userStr) return null
    try {
      return JSON.parse(userStr) as UserDto
    } catch (e) {
      console.error('Error parsing user from storage', e)
      return null
    }
  },

  setUser: (user: UserDto) => {
    localStorage.setItem(KEYS.USER, JSON.stringify(user))
  },

  removeUser: () => {
    localStorage.removeItem(KEYS.USER)
  },

  // --- Global ---
  clearAuth: () => {
    storage.removeToken()
    storage.removeUser()
  },
}
