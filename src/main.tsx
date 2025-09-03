import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/main.css'
import AuthenticationPage from './pages/auth/AuthenticationPage.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthenticationPage />
  </StrictMode>
)