'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { getCurrentUser, verifyToken, logout as apiLogout, type User } from '@/lib/api/auth'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (user: User) => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  refetchUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if token exists and is valid
        const isTokenValid = await verifyToken()
        
        if (isTokenValid) {
          // Fetch user data
          const userData = await getCurrentUser()
          setUser(userData)
        } else {
          // Token is invalid, clear it
          apiLogout()
          setUser(null)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
        // Clear invalid token
        apiLogout()
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = () => {
    apiLogout()
    setUser(null)
    // Optional: redirect to home page
    if (typeof window !== 'undefined') {
      window.location.href = '/'
    }
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const refetchUser = async () => {
    try {
      const userData = await getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error('Failed to refetch user:', error)
      // If fetching user fails, user might be logged out
      logout()
    }
  }

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    updateUser,
    refetchUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}