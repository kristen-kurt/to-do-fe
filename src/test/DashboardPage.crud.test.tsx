import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import DashboardPage from '../pages/DashboardPage'

interface TestTodo {
  id: number | string
  title: string
  completed: boolean
}

const mockNavigate = vi.fn()
const mockSetAuthenticated = vi.fn()
const mockCreateTask = vi.fn()
const mockGetTasks = vi.fn()
const mockUpdateTask = vi.fn()
const mockDeleteTask = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.mock('../hooks/useAuth.ts', () => ({
  useAuth: () => ({
    logout: vi.fn(() => {
      mockSetAuthenticated(false)
      mockNavigate('/')
    }),
  }),
}))

vi.mock('../contexts/AuthContext', () => ({
  useAuthContext: () => ({
    setAuthenticated: mockSetAuthenticated,
    isAuthenticated: true,
  }),
}))

vi.mock('../hooks/useTodo.ts', () => ({
  useTodo: () => ({
    createTask: mockCreateTask,
    getTasks: mockGetTasks,
    updateTask: mockUpdateTask,
    deleteTask: mockDeleteTask,
    isCreating: false,
    isFetching: false,
    isUpdating: false,
    isDeleting: false,
  }),
}))

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
    <ToastContainer />
  </BrowserRouter>
)

describe('DashboardPage CRUD Operations', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
    vi.clearAllMocks()

    mockGetTasks.mockResolvedValue({
      success: true,
      data: [],
    })
  })

  const renderDashboard = (initialTodos: TestTodo[] = []) => {
    mockGetTasks.mockResolvedValueOnce({
      success: true,
      data: initialTodos,
    })

    return render(
      <TestWrapper>
        <DashboardPage />
      </TestWrapper>
    )
  }

  const addTask = async (taskTitle: string) => {
    const input = screen.getByPlaceholderText('What are you doing today?')
    await user.type(input, taskTitle)

    const addButton = screen.getByTestId('add-task-button')
    await user.click(addButton)
  }

  describe('Initial Load and Display', () => {
    it('should render dashboard with empty state', async () => {
      renderDashboard()

      await waitFor(() => {
        expect(screen.getByText('4-ti Tasks')).toBeInTheDocument()
      })

      expect(
        screen.getByText('You have no to do tasks yet.')
      ).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('What are you doing today?')
      ).toBeInTheDocument()
    })

    it('should display existing todos on load', async () => {
      const existingTodos: TestTodo[] = [
        { id: 1, title: 'Existing Task 1', completed: false },
        { id: 2, title: 'Existing Task 2', completed: true },
      ]

      renderDashboard(existingTodos)

      await waitFor(() => {
        expect(screen.getByText('Existing Task 1')).toBeInTheDocument()
        expect(screen.getByText('Existing Task 2')).toBeInTheDocument()
      })
    })
  })

  describe('CREATE - Adding Tasks', () => {
    it('should create a new task successfully', async () => {
      mockCreateTask.mockResolvedValue({
        success: true,
        data: { id: 1 },
      })

      renderDashboard()

      await waitFor(() => {
        expect(screen.getByText('4-ti Tasks')).toBeInTheDocument()
      })

      await addTask('New task')

      expect(mockCreateTask).toHaveBeenCalledWith({
        title: 'New task',
      })

      await waitFor(() => {
        expect(screen.getByText('New task')).toBeInTheDocument()
      })
    })

    it('should clear input after successful task creation', async () => {
      mockCreateTask.mockResolvedValue({
        success: true,
        data: { id: 1 },
      })

      renderDashboard()

      await waitFor(() => {
        expect(screen.getByText('4-ti Tasks')).toBeInTheDocument()
      })

      const input = screen.getByPlaceholderText(
        'What are you doing today?'
      ) as HTMLInputElement
      await addTask('Task to clear input')

      await waitFor(() => {
        expect(input.value).toBe('')
      })
    })
  })

  describe('READ - Displaying Tasks', () => {
    it('should show task count correctly', async () => {
      const todos: TestTodo[] = [
        { id: 1, title: 'Task 1', completed: false },
        { id: 2, title: 'Task 2', completed: true },
        { id: 3, title: 'Task 3', completed: false },
      ]

      renderDashboard(todos)

      await waitFor(() => {
        expect(screen.getByText('2 of 3 tasks remaining')).toBeInTheDocument()
      })
    })
  })

  describe('UPDATE - Editing Tasks', () => {
    it('should toggle task completion status', async () => {
      const todos: TestTodo[] = [
        { id: 1, title: 'Task to make complete', completed: false },
      ]

      mockUpdateTask.mockResolvedValue({ success: true })

      renderDashboard(todos)

      await waitFor(() => {
        expect(screen.getByText('Task to make complete')).toBeInTheDocument()
      })

      const checkbox = screen.getByRole('checkbox') as HTMLInputElement
      await user.click(checkbox)

      expect(mockUpdateTask).toHaveBeenCalledWith(1, {
        completed: true,
      })
    })

    it('should edit task title successfully', async () => {
      const todos: TestTodo[] = [
        { id: 1, title: 'Original title', completed: false },
      ]

      mockUpdateTask.mockResolvedValue({ success: true })

      renderDashboard(todos)

      await waitFor(() => {
        expect(screen.getByText('Original title')).toBeInTheDocument()
      })

      const editButton = screen.getByTestId('edit-button')

      if (editButton) {
        await user.click(editButton)

        const editInput = screen.getByDisplayValue(
          'Original title'
        ) as HTMLInputElement

        await user.clear(editInput)
        await user.type(editInput, 'Updated title')

        await user.keyboard('{Enter}')

        expect(mockUpdateTask).toHaveBeenCalledWith(1, {
          title: 'Updated title',
        })
      }
    })
  })

  describe('DELETE - Removing Tasks', () => {
    it('should delete a task successfully', async () => {
      const todos: TestTodo[] = [
        { id: 1, title: 'Task to delete', completed: false },
        { id: 2, title: 'Task to keep', completed: false },
      ]

      mockDeleteTask.mockResolvedValue({ success: true })

      renderDashboard(todos)

      await waitFor(() => {
        expect(screen.getByText('Task to delete')).toBeInTheDocument()
        expect(screen.getByText('Task to keep')).toBeInTheDocument()
      })

      const deleteButtons = screen.getAllByTestId('delete-button')
      await user.click(deleteButtons[0])

      expect(mockDeleteTask).toHaveBeenCalledWith(1)
      await waitFor(() => {
        expect(screen.queryByText('Task to delete')).not.toBeInTheDocument()
        expect(screen.getByText('Task to keep')).toBeInTheDocument()
      })
    })
  })
})