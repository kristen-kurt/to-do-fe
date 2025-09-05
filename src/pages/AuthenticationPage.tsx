import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.ts'
import { toast } from 'react-toastify'
import AppLogo from '../components/AppLogo.tsx'

const InputField = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
}: {
  label: string
  type: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  error?: string
}) => (
  <fieldset className={`fieldset gap-0 ${error ? 'error' : ''}`}>
    <legend className="fieldset-legend">{label}</legend>
    <input
      type={type}
      placeholder={placeholder}
      className={`input input-bordered validator w-full bg-base-100 text-base-content placeholder:text-base-content/60 rounded-lg ${
        error ? 'input-error border-error' : ''
      }`}
      value={value}
      required
      onChange={onChange}
      onBlur={onBlur}
    />
    <p className="label text-error">{error}</p>
  </fieldset>
)

interface FormProps {
  email: string
  password: string
  confirmPassword?: string
  name?: string
  isSignup: boolean
  errors: Record<string, string>
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onConfirmPasswordChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onNameChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onEmailBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  onPasswordBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  onConfirmPasswordBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onNameBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onSubmit: (e: React.FormEvent) => void
  onToggleMode: () => void
  isLoading: boolean
}

const AuthForm = ({
  email,
  password,
  confirmPassword = '',
  name = '',
  isSignup,
  errors,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onNameChange,
  onEmailBlur,
  onPasswordBlur,
  onConfirmPasswordBlur,
  onNameBlur,
  onSubmit,
  onToggleMode,
  isLoading,
}: FormProps) => (
  <div className="lg:w-full p-8 flex flex-col justify-center bg-base-100">
    <div className="w-full max-w-sm mx-auto py-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-2">
          <AppLogo />
          <h1 className="text-xl font-semibold text-base-content ml-2">
            {isSignup ? 'Create your account' : 'Login to your account'}
          </h1>
        </div>
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        {isSignup && onNameChange && onNameBlur && (
          <InputField
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={onNameChange}
            onBlur={onNameBlur}
            error={errors.name}
          />
        )}

        <InputField
          label="Email"
          type="email"
          placeholder="email"
          value={email}
          onChange={onEmailChange}
          onBlur={onEmailBlur}
          error={errors.email}
        />

        <InputField
          label="Password"
          type="password"
          placeholder="password"
          value={password}
          onChange={onPasswordChange}
          onBlur={onPasswordBlur}
          error={errors.password}
        />

        {isSignup && onConfirmPasswordChange && onConfirmPasswordBlur && (
          <InputField
            label="Confirm Password"
            type="password"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            onBlur={onConfirmPasswordBlur}
            error={errors.confirmPassword}
          />
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`btn btn-primary w-full mt-6 text-white hover:bg-primary-content rounded-lg ${
            isLoading ? 'loading' : ''
          }`}
        >
          {isLoading ? 'Please wait...' : isSignup ? 'Create Account' : 'Login'}
        </button>
      </form>
      <div className="text-left mt-6">
        <span className="text-sm opacity-80 mr-2">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}
        </span>
        <button
          type="button"
          onClick={onToggleMode}
          className="text-sm text-primary hover:text-primary-content"
          disabled={isLoading}
        >
          {isSignup ? 'Login' : 'Signup'}
        </button>
      </div>
    </div>
  </div>
)

export default function AuthenticationPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [isSignup, setIsSignup] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const { isLoading, register, login } = useAuth()

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): boolean => {
    return password.length >= 6
  }

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2
  }

  const validateField = (fieldName: string, value: string) => {
    const newErrors = { ...errors }

    switch (fieldName) {
      case 'email':
        if (!value.trim()) {
          newErrors.email = 'Email is required'
        } else if (!validateEmail(value.trim())) {
          newErrors.email = 'Please enter a valid email address'
        } else {
          delete newErrors.email
        }
        break
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required'
        } else if (!validatePassword(value)) {
          newErrors.password = 'Password must be at least 6 characters'
        } else {
          delete newErrors.password
        }
        break
      case 'name':
        if (isSignup) {
          if (!value.trim()) {
            newErrors.name = 'Full name is required'
          } else if (!validateName(value)) {
            newErrors.name = 'Name must be at least 2 characters'
          } else {
            delete newErrors.name
          }
        }
        break
      case 'confirmPassword':
        if (isSignup) {
          if (!value) {
            newErrors.confirmPassword = 'Please confirm your password'
          } else if (password !== value) {
            newErrors.confirmPassword = 'Passwords do not match'
          } else {
            delete newErrors.confirmPassword
          }
        }
        break
    }

    setErrors(newErrors)
  }

  const validateForm = (): Record<string, string> => {
    const newErrors: Record<string, string> = {}

    if (isSignup) {
      if (!name.trim()) {
        newErrors.name = 'Full name is required'
      } else if (name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters'
      }
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email.trim())) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (!validatePassword(password)) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (isSignup) {
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    return newErrors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    try {
      if (isSignup) {
        const result = await register({
          name: name.trim(),
          email: email.trim(),
          password,
        })

        if (result?.success) {
          toast.success('Signup successful! You can now log in.')
          handleToggleMode()
        } else {
          toast.error(result?.error || 'Registration failed!')
        }
      } else {
        const result = await login({
          email: email.trim(),
          password,
        })

        if (result?.success) {
          toast.success(result?.message || 'Login successful!')
          window.location.href = '/dashboard'
        } else {
          toast.error(result?.error || 'Login failed!')
        }
      }
    } catch (error: any) {
      toast.error(error?.message || 'Login failed!')
    }
  }

  const handleToggleMode = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setName('')
    setErrors({})
    setIsSignup(!isSignup)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value)
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField('email', e.target.value)
  }

  const handlePasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField('password', e.target.value)
  }

  const handleConfirmPasswordBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField('confirmPassword', e.target.value)
  }

  const handleNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    validateField('name', e.target.value)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-1/4 bg-base-100 rounded-lg shadow-xl overflow-hidden">
        <AuthForm
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          name={name}
          isSignup={isSignup}
          errors={errors}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          onConfirmPasswordChange={handleConfirmPasswordChange}
          onNameChange={handleNameChange}
          onEmailBlur={handleEmailBlur}
          onPasswordBlur={handlePasswordBlur}
          onConfirmPasswordBlur={handleConfirmPasswordBlur}
          onNameBlur={handleNameBlur}
          onSubmit={handleSubmit}
          onToggleMode={handleToggleMode}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}