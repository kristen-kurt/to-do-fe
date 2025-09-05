import { useState } from 'react'
import { TodoService } from '../api/todoService.js'

export type Todo = {
  id: number | string
  title: string
  completed: boolean
  createdAt?: string
  updatedAt?: string
}

export type CreateTaskData = {
  title: string
}

export type UpdateTaskData = {
  title?: string
  completed?: boolean
}

export type ApiResponse<T = any> = {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export type UseTodoReturn = {
  createTask: (taskData: CreateTaskData) => Promise<ApiResponse<Todo>>
  getTasks: () => Promise<ApiResponse<Todo[]>>
  updateTask: (
    id: number | string,
    taskData: UpdateTaskData
  ) => Promise<ApiResponse<Todo>>
  deleteTask: (id: number | string) => Promise<ApiResponse<any>>
  isCreating: boolean
  isFetching: boolean
  isUpdating: boolean
  isDeleting: boolean
}

export const useTodo = (): UseTodoReturn => {
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const [isFetching, setIsFetching] = useState<boolean>(false)
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const createTask = async (
    taskData: CreateTaskData
  ): Promise<ApiResponse<Todo>> => {
    setIsCreating(true)
    try {
      const response = await TodoService.createTask(taskData)
      if (response.success) {
        return {
          success: response.success,
          data: response.data as Todo,
          message: response.message,
        }
      }
      return {
        success: false,
        error: 'Invalid response format',
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'An error occurred',
      }
    } finally {
      setIsCreating(false)
    }
  }

  const getTasks = async (): Promise<ApiResponse<Todo[]>> => {
    setIsFetching(true)
    try {
      const response = await TodoService.getTasks()
      if (response.success) {
        return {
          success: response.success,
          data: response.data as Todo[],
          message: response.message,
        }
      }
      return {
        success: false,
        error: 'Invalid response format',
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'An error occurred',
      }
    } finally {
      setIsFetching(false)
    }
  }

  const updateTask = async (
    id: number | string,
    taskData: UpdateTaskData
  ): Promise<ApiResponse<Todo>> => {
    setIsUpdating(true)
    try {
      const response = await TodoService.updateTask(id, taskData)
      if (response.success) {
        return {
          success: response.success,
          data: response.data as Todo,
          message: response.message,
        }
      }
      return {
        success: false,
        error: 'Invalid response format',
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'An error occurred',
      }
    } finally {
      setIsUpdating(false)
    }
  }

  const deleteTask = async (id: number | string): Promise<ApiResponse<any>> => {
    setIsDeleting(true)
    try {
      const response = await TodoService.deleteTask(id)
      if (response.success) {
        return {
          success: response.success,
          data: response.data,
          message: response.message,
        }
      }
      return {
        success: false,
        error: 'Invalid response format',
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'An error occurred',
      }
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    isCreating,
    isFetching,
    isUpdating,
    isDeleting,
  }
}