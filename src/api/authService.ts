import type {
  RegisterData,
  LoginCredentials,
  AuthResponse,
} from '../hooks/useAuth'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export class AuthService {
  static async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    return this.handleResponse(response)
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    return this.handleResponse(response)
  }

  private static async handleResponse(
    response: Response
  ): Promise<AuthResponse> {
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Request failed')
    }

    return data as AuthResponse
  }
}