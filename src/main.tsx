import { useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './css/main.css'
import AuthenticationPage from './pages/AuthenticationPage.tsx'
import { ToastContainer } from 'react-toastify'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.tsx'

const useSimpleAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setIsAuthenticated(!!token)
    setLoading(false)
  }, [])

  return { isAuthenticated, loading, setIsAuthenticated }
}

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useSimpleAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? children : <Navigate to="/" replace />
}

createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route path="/" element={<AuthenticationPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <ToastContainer />
  </Router>
)