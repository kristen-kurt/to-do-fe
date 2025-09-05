import { useState, useEffect } from 'react'
import { PlusCircle, Edit3, Trash2, Check, X } from 'lucide-react'
import { useTodo, type Todo } from '../hooks/useTodo.ts'
import { toast } from 'react-toastify'
import { useAuth } from '../hooks/useAuth.ts'
import AppLogo from '../components/AppLogo.tsx'

const DashboardPage = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTask, setNewTask] = useState<string>('')
  const [editingId, setEditingId] = useState<number | string | null>(null)
  const [deletingId, setDeletingId] = useState<number | string | null>(null)
  const [editingText, setEditingText] = useState<string>('')

  const {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    isCreating,
    isFetching,
    isUpdating,
    isDeleting,
  } = useTodo()
  const { logout } = useAuth()

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async (): Promise<void> => {
    try {
      const result = await getTasks()
      if (result?.success) {
        setTodos(result?.data || [])
      } else {
        toast.error(result?.error || 'Failed to fetch.')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to fetch.')
    }
  }

  const addTask = async (): Promise<void> => {
    if (!newTask.trim()) return
    try {
      const result = await createTask({
        title: newTask.trim(),
      })
      if (result?.success) {
        toast.success('Task Added.')
        const newTodo: Todo = {
          id: result?.data?.id || Date.now(),
          title: newTask.trim(),
          completed: false,
        }
        setTodos((prev) => [...prev, newTodo])
        setNewTask('')
      } else {
        toast.error(result?.message || 'Failed to add.')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to add.')
    }
  }

  const toggleTask = async (id: number | string): Promise<void> => {
    try {
      const todo = todos.find((t) => t.id === id)
      if (!todo) return

      const result = await updateTask(id, {
        completed: !todo.completed,
      })

      if (result?.success) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        )
      } else {
        toast.error(result?.message || 'Failed to update task.')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update task.')
    }
  }

  const removeTask = async (id: number | string): Promise<void> => {
    setDeletingId(id)
    try {
      const result = await deleteTask(id)
      if (result?.success) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id))
        toast.success('Task deleted.')
      } else {
        toast.error(result?.message || 'Failed to delete task.')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to delete task.')
    }
  }

  const startEditing = (todo: Todo): void => {
    setEditingId(todo.id)
    setEditingText(todo.title)
  }

  const saveEdit = async (): Promise<void> => {
    if (!editingText.trim()) {
      cancelEdit()
      return
    }

    try {
      const result = await updateTask(editingId!, {
        title: editingText.trim(),
      })

      if (result?.success) {
        toast.success('Task updated.')
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === editingId
              ? { ...todo, title: editingText.trim() }
              : todo
          )
        )
        setEditingId(null)
        setEditingText('')
      } else {
        toast.error(result?.message || 'Failed to update task.')
      }
    } catch (error: any) {
      toast.error(error?.message || 'Failed to update task.')
    }
  }

  const cancelEdit = (): void => {
    setEditingId(null)
    setEditingText('')
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void): void => {
    if (e.key === 'Enter') {
      action()
    } else if (e.key === 'Escape' && action === cancelEdit) {
      cancelEdit()
    }
  }

  const handleLogout = async (): Promise<void> => {
    logout()
  }

  if (isFetching) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-row justify-between items-center py-10">
          <div className="flex items-center gap-3">
            <AppLogo />
            <h1 className="text-3xl font-bold text-base-content">4-ti Tasks</h1>
          </div>
          <button
            onClick={handleLogout}
            className="btn btn-secondary rounded-lg"
          >
            Logout
          </button>
        </div>

        <div className="mb-6">
          <div className="form-control">
            <div className="input-group">
              <input
                type="text"
                name="add_todo"
                placeholder="What are you doing today?"
                className="input input-bordered rounded-lg flex-1 bg-base-200 text-base-content placeholder-base-content/60 mr-2 w-100"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyUp={(e) => handleKeyPress(e, addTask)}
              />
              <button
                className="btn btn-square btn-primary"
                data-testid="add-task-button"
                onClick={addTask}
                disabled={!newTask.trim() || isCreating}
              >
                {isCreating ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <PlusCircle size={20} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* list */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-base-content/70 mb-4">
            To do List :
          </div>
          {todos.length === 0 ? (
            <div className="text-center py-8 text-base-content/60">
              You have no to do tasks yet.
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={todo.completed}
                  onChange={() => toggleTask(todo.id)}
                />
                <div className="flex-1">
                  {editingId === todo.id ? (
                    <input
                      type="text"
                      className="input input-sm input-ghost w-full"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') saveEdit()
                        if (e.key === 'Escape') cancelEdit()
                      }}
                      onBlur={saveEdit}
                      autoFocus
                      disabled={isUpdating}
                    />
                  ) : (
                    <span
                      className={`${
                        todo.completed
                          ? 'line-through text-base-content/50'
                          : 'text-base-content'
                      }`}
                    >
                      {todo.title}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {editingId === todo.id ? (
                    <>
                      <button
                        className="btn btn-xs btn-success btn-ghost"
                        onClick={saveEdit}
                        disabled={isUpdating}
                      >
                        {isUpdating ? (
                          <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                          <Check size={14} />
                        )}
                      </button>
                      <button
                        className="btn btn-xs btn-ghost"
                        onClick={cancelEdit}
                        disabled={isUpdating}
                      >
                        <X size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-xs btn-ghost text-base-content/70 hover:text-primary"
                        data-testid="edit-button"
                        onClick={() => startEditing(todo)}
                      >
                        {isUpdating && editingId === todo.id ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <Edit3 size={14} />
                        )}
                      </button>
                      <button
                        className="btn btn-xs btn-ghost text-base-content/70 hover:text-error"
                        data-testid="delete-button"
                        onClick={() => removeTask(todo.id)}
                      >
                        {isDeleting && deletingId === todo.id ? (
                          <span className="loading loading-spinner loading-sm"></span>
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        {todos.length > 0 && (
          <div className="mt-6 text-sm text-base-content/60 text-center">
            {todos.filter((t) => !t.completed).length} of {todos.length} tasks
            remaining
          </div>
        )}
      </div>
    </div>
  )
}
export default DashboardPage