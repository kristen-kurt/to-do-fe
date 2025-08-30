import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt:', { email, password, rememberMe })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-base-100 rounded-lg shadow-xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/*Left Side*/}
          <div className="lg:w-1/2 bg-primary p-8 lg:p-12 flex flex-col justify-center min-h-[300px] lg:min-h-[500px]">
            <div className="text-center text-white">
              <div className="mb-8">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    fill="#ffffff"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#003052"
                    stroke-width="0.00032"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke="#CCCCCC"
                      stroke-width="1.216"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {' '}
                      <path d="M31,0H1A1,1,0,0,0,0,1V7.67a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V1A1,1,0,0,0,31,0ZM28.67,3.67H30V5H28.67ZM2,2H26.93a1,1,0,0,0-.26.67V6a1,1,0,0,0,.26.67H2Z"></path>{' '}
                      <path d="M31,11.67H1a1,1,0,0,0-1,1v6.66a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V12.67A1,1,0,0,0,31,11.67ZM18.67,15.33H30v1.34H18.67ZM2,13.67H16.93a1,1,0,0,0-.26.66v3.34a1,1,0,0,0,.26.66H2Z"></path>{' '}
                      <path d="M31,23.33H1a1,1,0,0,0-1,1V31a1,1,0,0,0,1,1H31a1,1,0,0,0,1-1V24.33A1,1,0,0,0,31,23.33ZM28.67,27H30v1.33H28.67ZM2,25.33H26.93a1,1,0,0,0-.26.67v3.33a1,1,0,0,0,.26.67H2Z"></path>{' '}
                    </g>
                  </svg>
                </div>
                <h1 className="text-3xl font-bold mb-2 primary-content/80">
                  TODO
                </h1>
                <p className="text-primary-content/80 text-lg">
                  Make your day productive
                </p>
              </div>
              <div className="space-y-6 max-w-sm mx-auto">
                <div className="flex items-start text-left">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg
                      fill="#ece8e3"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z"></path>
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-primary-content/90">
                      Easy to Use
                    </h3>
                    <p className="text-sm text-primary-content/60">
                      Intuitive and responsive designed for everyone
                    </p>
                  </div>
                </div>

                <div className="flex items-start text-left">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg
                      fill="#ece8e3"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z"></path>
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-primary-content/90">
                      Secure & Reliable
                    </h3>
                    <p className="text-sm text-primary-content/60">
                      Secure login with trusted performance
                    </p>
                  </div>
                </div>

                <div className="flex items-start text-left">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg
                      fill="#ece8e3"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z"></path>
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-primary-content/90">
                      Lightning Fast
                    </h3>
                    <p className="text-sm text-primary-content/60">
                      Optimized performance for maximum productivity
                    </p>
                  </div>
                </div>

                <div className="flex items-start text-left">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                    <svg
                      fill="#ece8e3"
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z"></path>
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 text-primary-content/90">
                      Cross-Platform Access
                    </h3>
                    <p className="text-sm text-primary-content/60">
                      Available as android and ios app
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-base-100">
            <div className="w-full max-w-sm mx-auto">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-2">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                  <h1 className="text-xl font-semibold text-base-content">
                    Login to your account
                  </h1>
                </div>
              </div>
              <div className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered w-full bg-base-100 text-base-content placeholder:text-base-content/60"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-content">
                      Password
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered w-full bg-base-100 text-base-content placeholder:text-base-content/60"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="form-control">
                    <label className="cursor-pointer label">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm mr-2"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <span className="label-text text-sm text-base-content">
                        Remember me
                      </span>
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-secondary underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary w-full mt-6 text-white hover:bg-secondary"
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-outline w-full mt-3 border-base-300 hover:border-secondary hover:bg-secondary"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="#4285f4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34a853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#fbbc05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#ea4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Login with Google
                </button>
                <div className="text-center mt-6">
                  <button
                    type="button"
                    className="text-sm text-primary hover:text-secondary underline"
                  >
                    Create new account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}