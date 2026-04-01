import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Mail, Lock, LogIn } from 'lucide-react'

import logoLight from "../../assets/img/2.png"
import logoDark from "../../assets/img/2.png"

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, user } = useAuth()
  const navigate = useNavigate()
  const [darkMode] = useState(false)

  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error: signInError } = await signIn(email, password)

      if (signInError) {
        // Show configuration errors more prominently
        if (signInError.name === 'ConfigurationError' || signInError.name === 'NetworkError') {
          setError(signInError.message)
        } else {
          setError(signInError.message || 'Invalid email or password')
        }
      } else if (data?.user) {
        navigate('/dashboard')
      }
    } catch (err) {
      // Handle network errors
      if (err.message?.includes('Failed to fetch') || err.message?.includes('ERR_NAME_NOT_RESOLVED')) {
        setError('Cannot connect to Supabase. Please check your .env file configuration. See ENV_SETUP.md for setup instructions.')
      } else {
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative">
      <div className={`min-h-screen py-20 px-4 sm:px-6 font-sans antialiased ${darkMode ? 'bg-[#08080f]' : 'bg-slate-50'}`}>

        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-12">
            <div className="cursor-target flex items-center justify-center gap-2 mb-8 transition-transform hover:scale-105">
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl border-2 shadow-lg ${
                darkMode ? 'bg-violet-500/10 border-violet-500/30 shadow-violet-500/20' : 'bg-violet-50 border-violet-200 shadow-violet-200/50'
              }`}>
                <span className={`font-bold text-3xl ${darkMode ? 'text-violet-400' : 'text-violet-600'}`}>R</span>
              </div>
              <div className="flex flex-col leading-tight text-left">
                <span className={`text-3xl font-black tracking-tighter ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  EL-ASRI
                </span>
                <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full" />
              </div>
            </div>

            <div className="cursor-target inline-flex items-center gap-4 mb-6">
              <div className={`w-12 h-0.5 bg-gradient-to-r ${darkMode ? 'from-violet-500 to-cyan-500' : 'from-violet-500 to-cyan-500'}`}></div>
              <span className={`text-sm font-semibold tracking-widest uppercase ${darkMode ? 'text-cyan-400' : 'text-violet-600'}`}>
                Secure Login
              </span>
              <div className={`w-12 h-0.5 bg-gradient-to-r ${darkMode ? 'from-cyan-500 to-violet-500' : 'from-cyan-500 to-violet-500'}`}></div>
            </div>

            <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Welcome Back
            </h2>
          </div>

          {/* Login Form */}
          <div className={`cursor-target p-8 rounded-3xl backdrop-blur-xl border transition-all duration-500 ${darkMode
              ? 'bg-white/5 border-white/10 hover:border-violet-500/30 hover:shadow-2xl hover:shadow-violet-500/10'
              : 'bg-white/80 border-slate-200 hover:border-violet-300 hover:shadow-2xl hover:shadow-violet-500/5'
            }`}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className={`bg-red-500/20 border border-red-500/50 px-4 py-3 rounded-xl text-sm ${darkMode ? 'text-red-200' : 'text-red-700 bg-red-50 border-red-200'
                  }`}>
                  {error}
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2">
                <label className={`flex items-center gap-2 text-sm font-semibold ${darkMode ? 'text-violet-300' : 'text-violet-700'}`}>
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`cursor-target w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:scale-[1.02] focus:outline-none ${darkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-violet-400 focus:shadow-lg focus:shadow-violet-500/20'
                      : 'bg-white border-slate-200 text-gray-900 placeholder-gray-500 focus:border-violet-400 focus:shadow-lg focus:shadow-violet-500/10'
                    }`}
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className={`flex items-center gap-2 text-sm font-semibold ${darkMode ? 'text-violet-300' : 'text-violet-700'}`}>
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`cursor-target w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:scale-[1.02] focus:outline-none ${darkMode
                      ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-violet-400 focus:shadow-lg focus:shadow-violet-500/20'
                      : 'bg-white border-slate-200 text-gray-900 placeholder-gray-500 focus:border-violet-400 focus:shadow-lg focus:shadow-violet-500/10'
                    }`}
                  placeholder="Enter your password"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`cursor-target w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${darkMode
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:shadow-2xl hover:shadow-cyan-500/25'
                    : 'bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-pink-500/25'
                  }`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

