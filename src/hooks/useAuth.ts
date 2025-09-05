import { useState } from 'react'
import { AuthService } from '../api/authService.ts'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

export type User = {
  id: number | string
  email: string
  name?: string
  username?: string
}

export type RegisterData = {
  email: string
  password: string
  name?: string
  username?: string
  confirmPassword?: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type AuthResponse = {
  token: string
  user?: User
  message?: string
}

export type ApiAuthResponse<T = AuthResponse> = {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export type UseAuthReturn = {
  isLoading: boolean
  register: (userData: RegisterData) => Promise<ApiAuthResponse>
  login: (credentials: LoginCredentials) => Promise<ApiAuthResponse>
  logout: () => void
}

export const useAuth = (): UseAuthReturn => {
  const navigate = useNavigate()
  const { setAuthenticated } = useAuthContext() // Use context
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const register = async (userData: RegisterData): Promise<ApiAuthResponse> => {
    setIsLoading(true)
    try {
      const response = await AuthService.register(userData)
      if (response.token) {
        localStorage.setItem('authToken', response.token)
        setAuthenticated(true)
        navigate('/dashboard')
      }

      return {
        success: true,
        data: response,
        message: response.message,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Registration failed',
      }
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (
    credentials: LoginCredentials
  ): Promise<ApiAuthResponse> => {
    setIsLoading(true)
    try {
      const response = await AuthService.login(credentials)
      if (response.token) {
        localStorage.setItem('authToken', response.token)
        setAuthenticated(true) // Update global auth state
        navigate('/dashboard') // Auto redirect to dashboard
      }

      return {
        success: true,
        data: response,
        message: response.message,
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Login failed',
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = (): void => {
    localStorage.removeItem('authToken')
    setAuthenticated(false) // Update global auth state
    navigate('/')
  }

  return {
    isLoading,
    register,
    login,
    logout,
  }
}