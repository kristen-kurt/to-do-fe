import type { Todo, CreateTaskData, UpdateTaskData } from '../hooks/useTodo'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3004/api'

type TodoApiResponse = {
  success: boolean
  data?: Todo | Todo[]
  message?: string
}

export class TodoService {
  static async createTask(taskData: CreateTaskData): Promise<TodoApiResponse> {
    const token = localStorage.getItem('authToken')
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    })

    return this.handleResponse(response)
  }

  static async getTasks(): Promise<TodoApiResponse> {
    const token = localStorage.getItem('authToken')
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return this.handleResponse(response)
  }

  static async updateTask(
    id: number | string,
    taskData: UpdateTaskData
  ): Promise<TodoApiResponse> {
    const token = localStorage.getItem('authToken')
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    })
    return this.handleResponse(response)
  }

  static async deleteTask(id: number | string): Promise<TodoApiResponse> {
    const token = localStorage.getItem('authToken')
    const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return this.handleResponse(response)
  }

  private static async handleResponse(
    response: Response
  ): Promise<TodoApiResponse> {
    const data = await response.json()
    if (!response.ok) {
      throw new Error(data.message || 'Request failed')
    }
    return data
  }
}