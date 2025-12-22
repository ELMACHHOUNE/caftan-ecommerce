'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect, ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  requireAdmin?: boolean
  redirectTo?: string
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
  redirectTo = '/login'
}) => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return // Wait for auth to initialize

    if (!isAuthenticated) {
      router.push(redirectTo)
      return
    }

    if (requireAdmin && user?.role !== 'admin') {
      router.push('/') // Redirect to home if not admin
      return
    }
  }, [isAuthenticated, isLoading, user, requireAdmin, redirectTo, router])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null
  }

  // Don't render if admin required but user is not admin
  if (requireAdmin && user?.role !== 'admin') {
    return null
  }

  return <>{children}</>
}

// Enhanced Admin Protection - Only specific admin emails allowed
interface AdminRouteProps {
  children: ReactNode
  redirectTo?: string
}

export const AdminRoute: React.FC<AdminRouteProps> = ({
  children,
  redirectTo = '/'
}) => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // List of authorized admin emails
  const authorizedAdmins = [
    'business.aguizoul@gmail.com'
  ]

  useEffect(() => {
    if (isLoading) return // Wait for auth to initialize

    if (!isAuthenticated) {
      router.push('/login')
      return
    }

    // Check if user has admin role AND is in authorized list
    const isAuthorizedAdmin = user?.role === 'admin' && 
                             user?.email && 
                             authorizedAdmins.includes(user.email)

    if (!isAuthorizedAdmin) {
      console.warn('Unauthorized admin access attempt:', user?.email)
      router.push(redirectTo)
      return
    }
  }, [isAuthenticated, isLoading, user, redirectTo, router])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return null
  }

  // Enhanced admin check
  const isAuthorizedAdmin = user?.role === 'admin' && 
                           user?.email && 
                           authorizedAdmins.includes(user.email)

  if (!isAuthorizedAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-4">You don't have permission to access this area.</p>
          <button 
            onClick={() => router.push('/')}
            className="text-primary hover:underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

interface PublicRouteProps {
  children: ReactNode
  redirectTo?: string
}

export const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = '/'
}) => {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return // Wait for auth to initialize

    if (isAuthenticated) {
      router.push(redirectTo)
      return
    }
  }, [isAuthenticated, isLoading, redirectTo, router])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Don't render children if authenticated (for login/register pages)
  if (isAuthenticated) {
    return null
  }

  return <>{children}</>
}