import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/main.css'
import Login from './pages/auth/Login.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login />
  </StrictMode>
)