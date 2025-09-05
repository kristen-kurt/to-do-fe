import {
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  loading: boolean
  setAuthenticated: (value: boolean) => void
}

const AuthContext = createContext<AuthContextType | null>(null)

// Auth Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setIsAuthenticated(!!token)
    setLoading(false)
  }, [])

  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value)
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider')
  }
  return context
}