import React, { createContext, useContext, useState } from 'react' // Use your shared type
import { storage } from '@/lib/storage'
import type { UserDto } from '@/lib/api/grimoire_svc' // <--- Import your new helper

interface AuthContextType {
  user: UserDto | null
  token: string | null
  save: (token: string, refreshToken: string, user: UserDto) => void
  logout: () => void
  updateUser: (user: UserDto) => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserDto | null>(() => storage.getUser())
  const [token, setToken] = useState<string | null>(() => storage.getToken())

  const login = (
    newToken: string,
    newRefreshToken: string,
    newUser: UserDto
  ) => {
    storage.setToken(newToken, newRefreshToken)
    storage.setUser(newUser)
    setToken(newToken)
    setUser(newUser)
  }

  const logout = () => {
    storage.clearAuth()

    setToken(null)
    setUser(null)
    window.location.href = '/'
  }

  const updateUser = (newUser: UserDto) => {
    storage.setUser(newUser)
    setUser(newUser)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        save: login,
        logout,
        updateUser,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
